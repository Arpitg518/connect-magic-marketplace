import React, { useState, useEffect } from 'react';
import { User } from '@/services/mockData';
import { mockMessagingService } from '@/services/mockMessaging';
import Messaging from './Messaging';

interface MessageManagerProps {
  currentUser: User;
}

const MessageManager: React.FC<MessageManagerProps> = ({ currentUser }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Get available users
    const users = mockMessagingService.getUsers(currentUser.id);
    setAvailableUsers(users);

    // Subscribe to online status changes
    const unsubscribeOnlineStatus = mockMessagingService.subscribeToOnlineStatus(
      (userId, isOnline) => {
        setAvailableUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, isOnline } : user
          )
        );
      }
    );

    // Update current user's online status
    mockMessagingService.updateOnlineStatus(currentUser.id, true);

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribeOnlineStatus();
      window.removeEventListener('resize', handleResize);
      mockMessagingService.updateOnlineStatus(currentUser.id, false);
    };
  }, [currentUser.id]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-zinc-900 rounded-lg overflow-hidden">
      {/* Conversation List */}
      <div className={`w-full md:w-80 border-r border-zinc-800 flex flex-col ${isMobile && selectedUser ? 'hidden' : 'block'}`}>
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {availableUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-zinc-800 transition-colors ${
                selectedUser?.id === user.id ? 'bg-zinc-800' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                )}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-400 capitalize">{user.type}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messaging Interface */}
      <div className={`flex-1 ${isMobile && !selectedUser ? 'hidden' : 'block'}`}>
        {selectedUser ? (
          <Messaging
            currentUser={currentUser}
            receiver={selectedUser}
            onBack={isMobile ? () => setSelectedUser(null) : undefined}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageManager;
