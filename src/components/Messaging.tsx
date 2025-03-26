
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, UserCircle2, Phone, Video, MoreVertical, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { getMessagesBetweenUsers, sendMessage, markMessagesAsRead, supabase } from '@/lib/supabase';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  sent_at: string;
  read: boolean;
  sender_type: 'influencer' | 'business';
}

interface User {
  id: number;
  name: string;
  avatar?: string;
  type: 'influencer' | 'business';
}

interface MessagingProps {
  currentUser: User;
  receiver: User;
  onBack?: () => void;
  className?: string;
}

const Messaging: React.FC<MessagingProps> = ({ currentUser, receiver, onBack, className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesBetweenUsers(currentUser.id, receiver.id);
        setMessages(data || []);
        
        // Mark received messages as read
        await markMessagesAsRead(currentUser.id, receiver.id);
        
        // Set up realtime subscription for new messages
        const channel = supabase
          .channel('messages-realtime')
          .on('postgres_changes', 
            { 
              event: 'INSERT', 
              schema: 'public', 
              table: 'messages',
              filter: `receiver_id=eq.${currentUser.id}`,
            }, 
            async (payload) => {
              if (payload.new.sender_id === receiver.id) {
                setMessages(prev => [...prev, payload.new as Message]);
                await markMessagesAsRead(currentUser.id, receiver.id);
              }
            }
          )
          .subscribe();
        
        return () => {
          channel.unsubscribe();
        };
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
  }, [currentUser.id, receiver.id]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    setLoading(true);
    
    try {
      await sendMessage(
        currentUser.id,
        receiver.id,
        newMessage.trim(),
        currentUser.type
      );
      
      // Add message to UI immediately
      const tempMessage: Message = {
        id: Date.now(),
        sender_id: currentUser.id,
        receiver_id: receiver.id,
        content: newMessage.trim(),
        sent_at: new Date().toISOString(),
        read: false,
        sender_type: currentUser.type
      };
      
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Card className={`flex flex-col h-full bg-zinc-900 border-zinc-800 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden text-gray-300">
              <ChevronLeft size={20} />
            </Button>
          )}
          <Avatar className="h-10 w-10">
            <AvatarImage src={receiver.avatar} alt={receiver.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {receiver.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-200">{receiver.name}</h3>
            <p className="text-xs text-gray-400 capitalize">{receiver.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Phone size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Video size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <MoreVertical size={18} />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-grow p-4 overflow-y-auto bg-zinc-900/50">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.sender_id === currentUser.id;
            return (
              <motion.div
                key={message.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-zinc-800 text-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{message.content}</p>
                  <div 
                    className={`text-xs mt-1 ${
                      isCurrentUser ? 'text-primary-foreground/70' : 'text-gray-400'
                    }`}
                  >
                    {formatDate(message.sent_at)}
                    {isCurrentUser && (
                      <span className="ml-1">{message.read ? '✓✓' : '✓'}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div ref={endOfMessagesRef} />
        </div>
      </ScrollArea>
      
      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-zinc-800 border-zinc-700 text-gray-200 placeholder:text-gray-500"
            disabled={loading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={loading || !newMessage.trim()}
            className="bg-primary text-white hover:bg-primary/90"
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Messaging;
