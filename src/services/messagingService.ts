import { mockUsers } from './mockData';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  avatar: string;
  name: string;
  category: string;
  lastMessageTime: string;
}

class MessagingService {
  private conversations: Map<string, Conversation> = new Map();
  private messages: Map<string, Message[]> = new Map();

  constructor() {
    // Initialize with some mock conversations
    this.initializeMockData();
  }

  private initializeMockData() {
    // Create some mock conversations between users
    mockUsers.forEach(user => {
      if (user.type === 'business') {
        // Create conversations with influencers
        mockUsers
          .filter(u => u.type === 'influencer')
          .forEach(influencer => {
            const conversationId = `${user.id}-${influencer.id}`;
            
            // Create initial message from business
            const businessMessage: Message = {
              id: `msg-${conversationId}-1`,
              senderId: user.id,
              receiverId: influencer.id,
              content: `Hi ${influencer.name}, I'm interested in collaborating with you.`,
              timestamp: new Date(),
              read: false
            };

            // Create response from influencer
            const influencerMessage: Message = {
              id: `msg-${conversationId}-2`,
              senderId: influencer.id,
              receiverId: user.id,
              content: `Hello! Thank you for reaching out. I'd love to hear more about your project.`,
              timestamp: new Date(),
              read: false
            };

            this.conversations.set(conversationId, {
              id: conversationId,
              participants: [user.id, influencer.id],
              lastMessage: influencerMessage,
              unreadCount: 1,
              avatar: influencer.avatar,
              name: influencer.name,
              category: influencer.categories?.[0] || 'General',
              lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            this.messages.set(conversationId, [businessMessage, influencerMessage]);
          });
      }
    });
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(conv => conv.participants.includes(userId))
      .sort((a, b) => b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime());
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return this.messages.get(conversationId) || [];
  }

  async sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const receiverId = conversation.participants.find(id => id !== senderId);
    if (!receiverId) {
      throw new Error('Receiver not found');
    }

    // Check if the message already exists to prevent duplicates
    const existingMessages = this.messages.get(conversationId) || [];
    const isDuplicate = existingMessages.some(msg => 
      msg.senderId === senderId && 
      msg.content === content && 
      Date.now() - msg.timestamp.getTime() < 1000 // Within 1 second
    );

    if (isDuplicate) {
      return existingMessages[existingMessages.length - 1];
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId,
      receiverId,
      content,
      timestamp: new Date(),
      read: false
    };

    existingMessages.push(newMessage);
    this.messages.set(conversationId, existingMessages);

    // Update conversation
    conversation.lastMessage = newMessage;
    conversation.unreadCount += 1;
    this.conversations.set(conversationId, conversation);

    return newMessage;
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return;

    const messages = this.messages.get(conversationId) || [];
    messages.forEach(message => {
      if (message.receiverId === userId && !message.read) {
        message.read = true;
      }
    });

    conversation.unreadCount = messages.filter(
      msg => msg.receiverId === userId && !msg.read
    ).length;

    this.messages.set(conversationId, messages);
    this.conversations.set(conversationId, conversation);
  }
}

export const messagingService = new MessagingService(); 