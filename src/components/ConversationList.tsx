
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare } from 'lucide-react';
import { getConversations } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

interface User {
  id: number;
  name: string;
  avatar?: string;
  type: 'influencer' | 'business';
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  sent_at: string;
  read: boolean;
  sender_type: 'influencer' | 'business';
}

interface ConversationListProps {
  currentUser: User;
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUserId?: number;
}

const ConversationList: React.FC<ConversationListProps> = ({
  currentUser,
  users,
  onSelectUser,
  selectedUserId,
}) => {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations(currentUser.id, currentUser.type);
        setConversations(data || {});
        
        // Calculate unread counts
        const counts: Record<number, number> = {};
        Object.entries(data || {}).forEach(([key, messages]) => {
          const otherUserId = parseInt(key.split('-')[1]);
          counts[otherUserId] = (messages as Message[]).filter(
            msg => msg.sender_id !== currentUser.id && !msg.read
          ).length;
        });
        setUnreadCounts(counts);
        
        // Set up realtime subscription for new messages
        const channel = supabase
          .channel('messages-channel')
          .on('postgres_changes', 
            { 
              event: 'INSERT', 
              schema: 'public', 
              table: 'messages',
              filter: `receiver_id=eq.${currentUser.id}`,
            }, 
            (payload) => {
              const senderId = payload.new.sender_id;
              
              // Update unread count
              setUnreadCounts(prev => ({
                ...prev,
                [senderId]: (prev[senderId] || 0) + 1
              }));
              
              // Update conversations
              setConversations(prev => {
                const convoKey = `${currentUser.type}-${senderId}`;
                const prevMsgs = prev[convoKey] || [];
                return {
                  ...prev,
                  [convoKey]: [...prevMsgs, payload.new as Message]
                };
              });
            }
          )
          .subscribe();
        
        return () => {
          channel.unsubscribe();
        };
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    
    fetchConversations();
  }, [currentUser.id, currentUser.type]);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.id !== currentUser.id && 
    (searchQuery === '' || user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Sort users with conversations at the top
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aHasConvo = conversations[`${currentUser.type}-${a.id}`] !== undefined;
    const bHasConvo = conversations[`${currentUser.type}-${b.id}`] !== undefined;
    
    if (aHasConvo && !bHasConvo) return -1;
    if (!aHasConvo && bHasConvo) return 1;
    return 0;
  });
  
  const getLastMessage = (userId: number) => {
    const convoKey = `${currentUser.type}-${userId}`;
    const convo = conversations[convoKey];
    if (!convo || convo.length === 0) return null;
    
    return convo[convo.length - 1];
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="h-full bg-zinc-900 border-r border-zinc-800">
      <div className="p-3 border-b border-zinc-800">
        <h2 className="text-lg font-semibold mb-3 text-gray-200">Messages</h2>
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-9 bg-zinc-800 border-zinc-700 text-gray-200 placeholder:text-gray-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
        </div>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {sortedUsers.length > 0 ? (
          sortedUsers.map((user) => {
            const lastMessage = getLastMessage(user.id);
            const unreadCount = unreadCounts[user.id] || 0;
            
            return (
              <motion.div
                key={user.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={`p-3 cursor-pointer border-b border-zinc-800/50 ${
                  selectedUserId === user.id ? 'bg-zinc-800/50' : ''
                }`}
                onClick={() => {
                  onSelectUser(user);
                  // Reset unread count when selecting user
                  if (unreadCount > 0) {
                    setUnreadCounts(prev => ({ ...prev, [user.id]: 0 }));
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate text-gray-200">{user.name}</h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-400">
                          {formatTime(lastMessage.sent_at)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm truncate text-gray-400 max-w-[180px]">
                        {lastMessage 
                          ? lastMessage.content 
                          : `Start chatting with ${user.name}`}
                      </p>
                      
                      {unreadCount > 0 && (
                        <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="p-4 text-center text-gray-400">
            <MessageSquare className="mx-auto mb-2 text-gray-500" size={32} />
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
