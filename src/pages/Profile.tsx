
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Link as LinkIcon, Edit2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Demo user data
  const demoUser = {
    name: "Arjun Sharma",
    username: "@arjunsharma",
    avatar: "/placeholder.svg",
    role: "Business Owner",
    bio: "Building authentic connections between brands and influencers across India. Passionate about marketing and technology.",
    email: "arjun@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    socialLinks: {
      instagram: "instagram.com/arjunsharma",
      facebook: "facebook.com/arjunsharma",
      twitter: "twitter.com/arjunsharma",
      website: "arjunsharma.com"
    },
    interests: [
      "Digital Marketing", "Social Media", "Branding", "E-commerce", 
      "Technology", "Startups", "Fashion", "Food & Beverage"
    ]
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
        <Header />
        
        <main className="flex-grow pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Profile Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-800 rounded-xl p-6 mb-8 relative overflow-hidden border border-zinc-700/30"
              >
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/50 to-blue-600/50"></div>
                
                <div className="relative pt-12 flex flex-col md:flex-row gap-6 items-center md:items-end">
                  <Avatar className="h-24 w-24 border-4 border-zinc-800 mb-4 md:mb-0">
                    <AvatarImage src={demoUser.avatar} alt={demoUser.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                      {demoUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center md:text-left flex-grow">
                    <h1 className="text-2xl font-bold">{demoUser.name}</h1>
                    <p className="text-gray-400">{demoUser.username}</p>
                    <Badge variant="secondary" className="mt-2 bg-zinc-700 text-gray-200">
                      {demoUser.role}
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-700"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 size={16} className="mr-2" />
                    {isEditing ? "Save Profile" : "Edit Profile"}
                  </Button>
                </div>
              </motion.div>
              
              {/* Tabs Section */}
              <Tabs defaultValue="profile" className="mb-8">
                <TabsList className="bg-zinc-800 border border-zinc-700">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Messages
                  </TabsTrigger>
                  <TabsTrigger value="connections" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Connections
                  </TabsTrigger>
                  <TabsTrigger value="campaigns" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Campaigns
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bio Card */}
                    <Card className="md:col-span-2 bg-zinc-800 border-zinc-700">
                      <CardHeader>
                        <CardTitle>About</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{demoUser.bio}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <div className="flex items-center gap-3">
                            <Mail className="text-primary" size={20} />
                            <div>
                              <p className="text-sm text-gray-400">Email</p>
                              <p>{demoUser.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Phone className="text-primary" size={20} />
                            <div>
                              <p className="text-sm text-gray-400">Phone</p>
                              <p>{demoUser.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <MapPin className="text-primary" size={20} />
                            <div>
                              <p className="text-sm text-gray-400">Location</p>
                              <p>{demoUser.location}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Social Links Card */}
                    <Card className="bg-zinc-800 border-zinc-700">
                      <CardHeader>
                        <CardTitle>Social Links</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Instagram className="text-pink-500" size={20} />
                          <p className="text-gray-300 truncate">{demoUser.socialLinks.instagram}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Facebook className="text-blue-500" size={20} />
                          <p className="text-gray-300 truncate">{demoUser.socialLinks.facebook}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Twitter className="text-sky-500" size={20} />
                          <p className="text-gray-300 truncate">{demoUser.socialLinks.twitter}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <LinkIcon className="text-gray-400" size={20} />
                          <p className="text-gray-300 truncate">{demoUser.socialLinks.website}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Interests Card */}
                    <Card className="md:col-span-3 bg-zinc-800 border-zinc-700">
                      <CardHeader>
                        <CardTitle>Interests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {demoUser.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary" className="bg-zinc-700 hover:bg-zinc-600">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="messages">
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center">
                    <Mail className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                    <p className="text-gray-400 mb-6">View and respond to your conversations</p>
                    <Button asChild>
                      <a href="/messages">Go to Messages</a>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="connections">
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center">
                    <div className="mx-auto mb-4 text-gray-400 w-12 h-12 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34"></path>
                        <path d="M3 15h5"></path>
                        <path d="M9 16v-3a2 2 0 0 1 2-2h.7"></path>
                        <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                        <path d="M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                        <path d="M18 13v3"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Your Connections</h3>
                    <p className="text-gray-400 mb-6">Browse influencers and businesses you've connected with</p>
                    <div className="flex gap-4 justify-center">
                      <Button asChild variant="outline" className="border-zinc-700 hover:bg-zinc-700">
                        <a href="/influencers">Browse Influencers</a>
                      </Button>
                      <Button asChild>
                        <a href="/businesses">Browse Businesses</a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="campaigns">
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center">
                    <div className="mx-auto mb-4 text-gray-400 w-12 h-12 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
                        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
                        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Your Campaigns</h3>
                    <p className="text-gray-400 mb-6">Manage and track your marketing campaigns</p>
                    <Button>Create New Campaign</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Profile;
