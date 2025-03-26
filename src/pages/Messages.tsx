
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MessageManager from '@/components/MessageManager';
import PageTransition from '@/components/layout/PageTransition';
import { indianInfluencers, indianBusinesses } from '@/data/indianInfluencers';

// For demo purposes - in a real app, this would come from authentication
const dummyUser = {
  id: 1001,
  name: "You (Demo User)",
  avatar: "/placeholder.svg",
  type: "business" as const
};

const MessagesPage = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  
  // Parse URL parameters to get user and type
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('user');
    const userType = searchParams.get('type');
    
    // You can use these parameters to initialize the chat with a specific user
    if (userId && userType) {
      console.log(`Initializing chat with ${userType} ID: ${userId}`);
      // In a real app, this would initialize the chat with the specified user
    }
    
    setInitialized(true);
  }, [location.search]);
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-zinc-900">
        <Header />
        
        <main className="flex-grow pt-20 pb-0">
          <div className="container mx-auto h-[calc(100vh-80px)]">
            <div className="h-full flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 md:p-6"
              >
                <h1 className="text-2xl font-bold mb-2 text-gray-200">Messages</h1>
                <p className="text-gray-400">Connect with influencers and businesses</p>
              </motion.div>
              
              <div className="flex-grow overflow-hidden rounded-xl border border-zinc-700/30 bg-zinc-900">
                {initialized && (
                  <MessageManager currentUser={dummyUser} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default MessagesPage;
