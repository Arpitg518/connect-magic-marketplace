import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import MessagingInterface from '@/components/MessagingInterface';
import { mockUsers } from '@/services/mockData';

const Messages: React.FC = () => {
  // For demo purposes, we'll use the first business user as the current user
  const currentUser = mockUsers.find(user => user.type === 'business');

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-purple-400">Please log in to access messages</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-2 bg-purple-900/30 rounded-lg">
          <MessageSquare className="text-purple-400" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-purple-300">Connect and collaborate with influencers</p>
        </div>
      </motion.div>

      <MessagingInterface currentUserId={currentUser.id} />
    </div>
  );
};

export default Messages;
