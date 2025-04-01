import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare } from 'lucide-react';
import { mockMessagingService } from '@/services/mockMessaging';
import { Message } from '@/services/mockData';

interface User {
  id: number;
  name: string;
  avatar: string;
  type: 'influencer' | 'business';
  isOnline?: boolean;
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
    // Get messages for each user
    const fetchConversations = () => {
      const newConversations: Record<string, Message[]> = {};
      const newUnreadCounts: Record<number, number> = {};

      users.forEach(user => {
        const messages = mockMessagingService.getMessages(currentUser.id, user.id);
        const convoKey = `${currentUser.type}-${user.id}`;
        newConversations[convoKey] = messages;
        
        // Calculate unread count
        newUnreadCounts[user.id] = messages.filter(
          msg => msg.sender_id !== currentUser.id && !msg.read
        ).length;
      });

      setConversations(newConversations);
      setUnreadCounts(newUnreadCounts);
    };

    fetchConversations();

    // Subscribe to new messages
    const unsubscribe = mockMessagingService.subscribeToMessages((message) => {
      if (message.sender_id === currentUser.id || message.receiver_id === currentUser.id) {
        const otherUserId = message.sender_id === currentUser.id ? message.receiver_id : message.sender_id;
        const convoKey = `${currentUser.type}-${otherUserId}`;
        
        setConversations(prev => ({
          ...prev,
          [convoKey]: [...(prev[convoKey] || []), message]
        }));

        if (message.sender_id !== currentUser.id && !message.read) {
          setUnreadCounts(prev => ({
            ...prev,
            [message.sender_id]: (prev[message.sender_id] || 0) + 1
          }));
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.id, currentUser.type, users]);

  const getLastMessage = (userId: number) => {
    const convoKey = `${currentUser.type}-${userId}`;
    const messages = conversations[convoKey] || [];
    return messages[messages.length - 1];
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      return date.toLocaleDateString();
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-zinc-900">
      <div className="p-4 border-b border-zinc-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => {
          const lastMessage = getLastMessage(user.id);
          const unreadCount = unreadCounts[user.id] || 0;

          return (
            <motion.button
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-zinc-800 transition-colors ${
                selectedUserId === user.id ? 'bg-zinc-800' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{user.name}</h3>
                  {lastMessage && (
                    <span className="text-xs text-gray-400">
                      {formatTime(lastMessage.sent_at)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {lastMessage ? (
                    <>
                      <p className="text-sm text-gray-400 truncate">
                        {lastMessage.content}
                      </p>
                      {unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-400">No messages yet</p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;
