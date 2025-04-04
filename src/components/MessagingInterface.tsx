import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, MoreVertical, Check, CheckCheck, MessageSquare, Paperclip, Smile, X } from 'lucide-react';
import { mockUsers } from '@/services/mockData';
import { messagingService, Message, Conversation } from '@/services/messagingService';
import { useNotification } from '@/context/NotificationContext';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface MessagingInterfaceProps {
  currentUserId: string;
  onInitialLoad?: () => void;
}

const MessagingInterface: React.FC<MessagingInterfaceProps> = ({ currentUserId, onInitialLoad }) => {
  const { showSuccess, showInfo, showError } = useNotification();
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
  const notificationShownRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Get current user from mock data (for demo purposes)
    const user = mockUsers.find(u => u.type === 'business') || mockUsers.find(u => u.type === 'influencer');
    if (user) {
      setCurrentUser(user);
      loadConversations(user.id);
      if (onInitialLoad) {
        onInitialLoad();
      }
    }
  }, [onInitialLoad]);

  useEffect(() => {
    if (selectedConversation && isInitialLoad.current) {
      loadMessages(selectedConversation.id);
      isInitialLoad.current = false;
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add effect to check for new messages
  useEffect(() => {
    const checkNewMessages = async () => {
      if (selectedConversation) {
        const unreadCount = selectedConversation.unreadCount;
        const notificationKey = `unread-${selectedConversation.id}-${unreadCount}`;
        
        if (unreadCount > 0 && !notificationShownRef.current.has(notificationKey)) {
          showInfo(`You have ${unreadCount} new message${unreadCount > 1 ? 's' : ''} from ${selectedConversation.name}`);
          notificationShownRef.current.add(notificationKey);
        }
      }
    };

    checkNewMessages();
  }, [selectedConversation, showInfo]);

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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showError('File size exceeds 5MB limit');
        return;
      }
      setSelectedFile(file);
      showInfo(`File selected: ${file.name}`);
    }
  };

  const handleRemoveFile = () => {
    if (selectedFile) {
      showInfo(`Removed file: ${selectedFile.name}`);
    }
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
        showInfo(`Attaching file: ${selectedFile.name}`);
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
      
      // Show success notification
      showSuccess('Message sent successfully!');

      // Update messages state with the new message
      setMessages(prev => {
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
      showError('Failed to send message. Please try again.');
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
    <div className="flex h-[calc(100vh-12rem)] bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl shadow-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-purple-100 bg-white/80 backdrop-blur-sm overflow-hidden flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-purple-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 text-purple-900 placeholder-purple-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`p-4 cursor-pointer hover:bg-purple-50/50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-purple-50' : ''
              }`}
              onClick={() => handleConversationSelect(conversation)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-purple-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-purple-500">{conversation.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-purple-600 truncate">{conversation.lastMessage.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-100"
                />
                <div>
                  <h3 className="font-medium text-purple-900">{selectedConversation.name}</h3>
                  <p className="text-sm text-purple-500">{selectedConversation.category}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-purple-500 hover:text-purple-600">
                <MoreVertical size={20} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50/50 to-white">
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
                          : 'bg-white text-purple-900 rounded-bl-none border-2 border-purple-200 shadow-purple-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {!isCurrentUserMessage && (
                          <img
                            src={selectedConversation?.avatar}
                            alt="Sender"
                            className="w-6 h-6 rounded-full object-cover border border-purple-200"
                          />
                        )}
                        <p className={`text-sm font-medium ${isCurrentUserMessage ? 'text-white' : 'text-purple-900'}`}>
                          {isCurrentUserMessage ? 'You' : selectedConversation?.name}
                        </p>
                      </div>
                      <p className={`text-sm whitespace-pre-wrap break-words ${isCurrentUserMessage ? 'text-white' : 'text-purple-800'}`}>
                        {message.content}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className={`text-xs ${isCurrentUserMessage ? 'text-white/70' : 'text-purple-500'}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isCurrentUserMessage && (
                          <span className="text-xs text-white/70">
                            {message.read ? <CheckCheck size={12} /> : <Check size={12} />}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-purple-100 bg-white/80 backdrop-blur-sm">
              {selectedFile && (
                <div className="mb-2 flex items-center gap-2 bg-purple-50 p-2 rounded-lg border border-purple-200">
                  <Paperclip className="text-purple-500" size={16} />
                  <span className="text-sm text-purple-900 truncate flex-1">{selectedFile.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-purple-500 hover:text-purple-600 hover:bg-purple-100 rounded-full"
                    onClick={handleRemoveFile}
                  >
                    <X size={14} />
                  </Button>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 bottom-3 flex items-center gap-2 z-10">
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
                      className="h-8 w-8 text-purple-500 hover:text-purple-600 hover:bg-purple-100 rounded-full border border-purple-200 bg-white"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip size={18} />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-purple-500 hover:text-purple-600 hover:bg-purple-100 rounded-full border border-purple-200 bg-white"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile size={18} />
                    </Button>
                  </div>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full pl-28 pr-4 py-3 border border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-200 text-purple-900 placeholder-purple-400 resize-none min-h-[48px] max-h-32 bg-white/80 backdrop-blur-sm"
                  />
                  {showEmojiPicker && (
                    <div className="absolute bottom-full left-0 mb-2 z-50">
                      <div className="bg-white rounded-lg shadow-lg border border-purple-200 p-2">
                        <div className="flex justify-end mb-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-purple-500 hover:text-purple-600"
                            onClick={() => setShowEmojiPicker(false)}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          <Picker
                            data={data}
                            onEmojiSelect={handleEmojiSelect}
                            theme="light"
                            previewPosition="none"
                            skinTonePosition="none"
                            searchPosition="none"
                            navPosition="none"
                            perLine={8}
                            emojiSize={20}
                            emojiButtonSize={28}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white h-12 w-12 rounded-full flex items-center justify-center shadow-sm"
                >
                  <Send size={20} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-purple-900 mb-2">Select a conversation</h3>
              <p className="text-purple-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingInterface; 