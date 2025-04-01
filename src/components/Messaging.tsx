import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, UserCircle2, Phone, Video, MoreVertical, ChevronLeft, Paperclip, Image as ImageIcon, File } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockMessagingService } from '@/services/mockMessaging';
import { User, Message } from '@/services/mockData';

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
  const [isTyping, setIsTyping] = useState(false);
  const [isReceiverTyping, setIsReceiverTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    // Get initial messages
    const initialMessages = mockMessagingService.getMessages(currentUser.id, receiver.id);
    setMessages(initialMessages);
    
    // Mark received messages as read
    mockMessagingService.markMessagesAsRead(currentUser.id, receiver.id);
    
    // Subscribe to new messages
    const unsubscribeMessages = mockMessagingService.subscribeToMessages((message) => {
      if (message.sender_id === receiver.id || message.receiver_id === receiver.id) {
        setMessages(prev => [...prev, message]);
        if (message.sender_id === receiver.id) {
          mockMessagingService.markMessagesAsRead(currentUser.id, receiver.id);
        }
      }
    });

    // Subscribe to typing status
    const unsubscribeTyping = mockMessagingService.subscribeToTypingStatus((userId, isTyping) => {
      if (userId === receiver.id) {
        setIsReceiverTyping(isTyping);
      }
    });
    
    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
    };
  }, [currentUser.id, receiver.id]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      mockMessagingService.subscribeToTypingStatus((userId, isTyping) => {
        if (userId === currentUser.id) {
          setIsTyping(isTyping);
        }
      });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      mockMessagingService.subscribeToTypingStatus((userId, isTyping) => {
        if (userId === currentUser.id) {
          setIsTyping(isTyping);
        }
      });
    }, 1000);
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() && !selectedFile) return;
    
    setLoading(true);
    
    try {
      let fileUrl = null;
      if (selectedFile) {
        // In a real app, this would upload to a storage service
        fileUrl = URL.createObjectURL(selectedFile);
      }
      
      const message = mockMessagingService.sendMessage(
        currentUser.id,
        receiver.id,
        newMessage.trim(),
        currentUser.type,
        fileUrl,
        selectedFile?.type
      );
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message: Message) => {
    if (message.file_url) {
      if (message.file_type?.startsWith('image/')) {
        return (
          <div className="relative group">
            <img 
              src={message.file_url}
              alt="Shared image"
              className="max-w-[300px] rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <a 
                href={message.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                <ImageIcon size={24} />
              </a>
            </div>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2 p-2 bg-zinc-800 rounded-lg">
          <File size={24} className="text-primary" />
          <a 
            href={message.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Download File
          </a>
        </div>
      );
    }
    return <p>{message.content}</p>;
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
            <p className="text-xs text-gray-400 capitalize">
              {receiver.type}
              {receiver.isOnline && (
                <span className="ml-1 text-green-500">• Online</span>
              )}
            </p>
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
                  {renderMessageContent(message)}
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
          {isReceiverTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 rounded-lg px-4 py-2 text-sm text-gray-400">
                Typing...
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </ScrollArea>
      
      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-400 hover:text-primary"
          >
            <Paperclip size={20} />
          </Button>
          {selectedFile && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <File size={16} />
              <span>{selectedFile.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </Button>
            </div>
          )}
          <Input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-grow bg-zinc-800 border-zinc-700 text-gray-200 placeholder:text-gray-500"
            disabled={loading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={loading || (!newMessage.trim() && !selectedFile)}
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
