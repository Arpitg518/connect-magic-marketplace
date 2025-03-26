
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ConversationList from './ConversationList';
import Messaging from './Messaging';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { indianInfluencers, indianBusinesses } from '@/data/indianInfluencers';
import { MessageSquare, ChevronLeft } from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar?: string;
  type: 'influencer' | 'business';
}

interface MessageManagerProps {
  currentUser: User;
  className?: string;
}

const MessageManager: React.FC<MessageManagerProps> = ({ currentUser, className }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showConversations, setShowConversations] = useState(true);
  const navigate = useNavigate();

  // Combine influencers and businesses for the user list
  const allUsers: User[] = [
    ...indianInfluencers.map(inf => ({
      id: inf.id,
      name: inf.name,
      avatar: inf.profileImage,
      type: 'influencer' as const
    })),
    ...indianBusinesses.map(bus => ({
      id: bus.id,
      name: bus.name,
      avatar: bus.logo,
      type: 'business' as const
    }))
  ];
  
  // Filter out the current user from the list
  const availableUsers = allUsers.filter(user => 
    !(user.id === currentUser.id && user.type === currentUser.type)
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setShowConversations(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check URL parameters for initialization
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('user');
    const userType = searchParams.get('type');
    
    if (userId && userType) {
      const user = allUsers.find(u => 
        u.id === parseInt(userId) && u.type === userType
      );
      
      if (user) {
        setSelectedUser(user);
        if (isMobileView) {
          setShowConversations(false);
        }
      }
    }
  }, [allUsers]);
  
  // Handle selecting a user
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    if (isMobileView) {
      setShowConversations(false);
    }
  };
  
  // Handle back button on mobile
  const handleBack = () => {
    setShowConversations(true);
  };
  
  return (
    <div className={`flex h-full ${className || ''}`}>
      {/* Mobile view: Show either conversations or messages */}
      {isMobileView ? (
        <>
          {showConversations ? (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-full h-full"
            >
              <ConversationList
                currentUser={currentUser}
                users={availableUsers}
                onSelectUser={handleSelectUser}
                selectedUserId={selectedUser?.id}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-full h-full"
            >
              {selectedUser ? (
                <Messaging
                  currentUser={currentUser}
                  receiver={selectedUser}
                  onBack={handleBack}
                />
              ) : (
                <div className="h-full flex items-center justify-center p-4 bg-zinc-900 text-gray-400">
                  <div className="text-center">
                    <MessageSquare className="mx-auto mb-3" size={48} />
                    <h3 className="text-xl font-medium mb-2 text-gray-300">No conversation selected</h3>
                    <p>Select a conversation to start messaging</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={handleBack}
                    >
                      <ChevronLeft size={16} className="mr-2" />
                      Back to conversations
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </>
      ) : (
        // Desktop view: Show both conversations and messages
        <>
          <div className="w-1/3 h-full">
            <ConversationList
              currentUser={currentUser}
              users={availableUsers}
              onSelectUser={handleSelectUser}
              selectedUserId={selectedUser?.id}
            />
          </div>
          
          <div className="w-2/3 h-full">
            {selectedUser ? (
              <Messaging
                currentUser={currentUser}
                receiver={selectedUser}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-4 bg-zinc-900 text-gray-400 border-l border-zinc-800">
                <div className="text-center max-w-md">
                  <MessageSquare className="mx-auto mb-3" size={48} />
                  <h3 className="text-xl font-medium mb-2 text-gray-300">Select a conversation</h3>
                  <p>Choose a contact from the list to start messaging</p>
                  <p className="mt-4 text-sm">
                    Can't find who you're looking for? 
                    <Button 
                      variant="link" 
                      className="text-primary p-0 h-auto mx-1"
                      onClick={() => navigate('/influencers')}
                    >
                      Browse influencers
                    </Button>
                    or
                    <Button 
                      variant="link" 
                      className="text-primary p-0 h-auto mx-1"
                      onClick={() => navigate('/businesses')}
                    >
                      Browse businesses
                    </Button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MessageManager;
