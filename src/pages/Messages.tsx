
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PhoneCall, Mail, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MessageManager from '@/components/MessageManager';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { indianInfluencers, indianBusinesses } from '@/data/indianInfluencers';
import { toast } from 'sonner';

// For demo purposes - in a real app, this would come from authentication
const dummyUser = {
  id: 1001,
  name: "You (Demo User)",
  avatar: "/placeholder.svg",
  type: "business" as const
};

const MessagesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  
  // Parse URL parameters to get user and type
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('user');
    const userType = searchParams.get('type');
    
    // You can use these parameters to initialize the chat with a specific user
    if (userId && userType) {
      console.log(`Initializing chat with ${userType} ID: ${userId}`);
      // In a real app, this would initialize the chat with the specified user
      toast.success("Chat initialized with user");
    }
    
    setInitialized(true);
  }, [location.search]);

  const handleContactAction = (type: 'phone' | 'email') => {
    if (type === 'phone') {
      window.location.href = 'tel:+919876543210';
    } else {
      window.location.href = 'mailto:contact@influencerhub.in';
    }
  };
  
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
                className="p-4 md:p-6 flex justify-between items-center"
              >
                <div>
                  <h1 className="text-2xl font-bold mb-2 text-gray-200">Messages</h1>
                  <p className="text-gray-400">Connect with influencers and businesses</p>
                </div>
                
                <div>
                  <Button 
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800 text-gray-200"
                    onClick={() => setContactVisible(!contactVisible)}
                  >
                    {contactVisible ? 'Hide Contact Info' : 'Contact Us'}
                  </Button>
                </div>
              </motion.div>
              
              {contactVisible && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="px-4 md:px-6 mb-4"
                >
                  <Card className="bg-zinc-800 border-zinc-700 p-4 text-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className="flex items-center gap-3 cursor-pointer hover:bg-zinc-700/30 p-2 rounded-md transition-colors" 
                        onClick={() => handleContactAction('phone')}
                      >
                        <PhoneCall className="text-primary" />
                        <div>
                          <p className="text-sm text-gray-400">Phone Number</p>
                          <p className="font-medium">+91 98765 43210</p>
                        </div>
                      </div>
                      <div 
                        className="flex items-center gap-3 cursor-pointer hover:bg-zinc-700/30 p-2 rounded-md transition-colors"
                        onClick={() => handleContactAction('email')}
                      >
                        <Mail className="text-primary" />
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="font-medium">contact@influencerhub.in</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ExternalLink className="text-primary" />
                        <div>
                          <p className="text-sm text-gray-400">Working Hours</p>
                          <p className="font-medium">Mon-Fri: 9AM - 6PM IST</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
              
              <div className="flex-grow overflow-hidden rounded-xl border border-zinc-700/30 bg-zinc-900">
                {initialized && (
                  <MessageManager currentUser={dummyUser} />
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default MessagesPage;
