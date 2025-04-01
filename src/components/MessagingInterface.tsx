import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, MoreVertical, Check, CheckCheck, MessageSquare, Paperclip, Smile, X, File } from 'lucide-react';
import { mockUsers } from '@/services/mockData';
import { messagingService, Message, Conversation } from '@/services/messagingService';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface MessagingInterfaceProps {
  currentUserId: string;
}

const MessagingInterface: React.FC<MessagingInterfaceProps> = ({ currentUserId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get current user from mock data (for demo purposes)
    const user = mockUsers.find(u => u.type === 'business') || mockUsers.find(u => u.type === 'influencer');
    if (user) {
      setCurrentUser(user);
      loadConversations(user.id);
    }
  }, []);

  useEffect(() => {
    if (selectedConversation && isInitialLoad.current) {
      loadMessages(selectedConversation.id);
      isInitialLoad.current = false;
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = async (conversationId: string) => {
    const convs = await messagingService.getConversations(conversationId);
    setConversations(convs);
  };

  const loadMessages = async (conversationId: string) => {
    const msgs = await messagingService.getMessages(conversationId);
    setMessages(msgs);
    await messagingService.markAsRead(conversationId, currentUserId);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || !selectedConversation) return;

    try {
      let messageContent = newMessage.trim();
      if (selectedFile) {
        messageContent += `\n[Attached file: ${selectedFile.name}]`;
      }

      // Clear input and file first to prevent duplicate sends
      setNewMessage('');
      setSelectedFile(null);

      // Send message and get the response
      const message = await messagingService.sendMessage(
        selectedConversation.id,
        currentUserId,
        messageContent
      );
      
      // Update messages state with the new message
      setMessages(prev => {
        // Check if the message already exists to prevent duplicates
        const isDuplicate = prev.some(msg => 
          msg.id === message.id || 
          (msg.content === message.content && 
           msg.senderId === message.senderId && 
           Date.now() - msg.timestamp.getTime() < 1000)
        );
        
        if (isDuplicate) {
          return prev;
        }
        
        return [...prev, message];
      });

      // Update conversations list without reloading messages
      const updatedConversations = await messagingService.getConversations(currentUserId);
      setConversations(updatedConversations);

      // Mark the message as read immediately
      await messagingService.markAsRead(selectedConversation.id, currentUserId);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Update the form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    isInitialLoad.current = true;
    loadMessages(conversation.id);
  };

  const getParticipantName = (participantId: string) => {
    const user = mockUsers.find(u => u.id === participantId);
    return user?.name || 'Unknown User';
  };

  const filteredConversations = conversations.filter(conv => {
    return conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           conv.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Helper function to check if a user is a business
  const isBusiness = (userId: string): boolean => {
    const user = mockUsers.find(u => u.id === userId);
    return user?.type === 'business';
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-zinc-900 rounded-xl shadow-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-zinc-800 text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 py-3 border-b border-zinc-800">
          <Select value={selectedCategory || ''} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {Array.from(new Set(conversations.map(conv => conv.category))).map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`p-4 cursor-pointer hover:bg-zinc-800 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-zinc-800' : ''
              }`}
              onClick={() => handleConversationSelect(conversation)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-400">{conversation.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{conversation.lastMessage.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-zinc-900">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700"
                />
                <div>
                  <h3 className="font-medium text-white">{selectedConversation.name}</h3>
                  <p className="text-sm text-gray-400">{selectedConversation.category}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <MoreVertical size={20} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900">
              {messages.map((message) => {
                const isCurrentUserMessage = message.senderId === currentUserId;
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${isCurrentUserMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 shadow-md ${
                        isCurrentUserMessage
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-zinc-800 text-white rounded-bl-none border border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {!isCurrentUserMessage && (
                          <img
                            src={selectedConversation?.avatar}
                            alt="Sender"
                            className="w-6 h-6 rounded-full object-cover border border-zinc-700"
                          />
                        )}
                        <p className={`text-sm font-medium ${isCurrentUserMessage ? 'text-white' : 'text-white'}`}>
                          {isCurrentUserMessage ? 'You' : selectedConversation?.name}
                        </p>
                      </div>
                      <p className={`text-sm whitespace-pre-wrap break-words ${isCurrentUserMessage ? 'text-white' : 'text-gray-300'}`}>
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-zinc-800">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip size={20} />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile size={20} />
                </Button>
                <div className="relative flex-1">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-zinc-800 border-zinc-700 text-white placeholder-gray-400"
                  />
                  {selectedFile && (
                    <div className="absolute -top-8 left-0 right-0 flex items-center gap-2 bg-zinc-800 p-2 rounded-lg border border-zinc-700">
                      <File size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-300">{selectedFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-white"
                        onClick={handleRemoveFile}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  )}
                </div>
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                  <Send size={20} className="text-white" />
                </Button>
              </form>
              {showEmojiPicker && (
                <div className="absolute bottom-20 right-4">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Select a conversation</h3>
              <p className="text-gray-400">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingInterface; 