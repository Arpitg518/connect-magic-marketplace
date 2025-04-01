import { v4 as uuidv4 } from 'uuid';
import { User, mockUsers } from './mockData';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  sent_at: string;
  read: boolean;
  sender_type: 'influencer' | 'business';
}

class MockMessagingService {
  private messages: Message[] = [];
  private users: User[] = mockUsers;
  private messageListeners: ((message: Message) => void)[] = [];
  private typingListeners: ((data: { userId: string; isTyping: boolean }) => void)[] = [];
  private onlineStatusListeners: ((data: { userId: string; isOnline: boolean }) => void)[] = [];

  constructor() {
    // Simulate online status changes
    setInterval(() => {
      this.users.forEach(user => {
        const isOnline = Math.random() > 0.5;
        this.notifyOnlineStatus(user.id, isOnline);
      });
    }, 10000);
  }

  async getUsers(currentUserId: string): Promise<User[]> {
    return this.users.filter(user => user.id !== currentUserId);
  }

  async getMessages(userId1: string, userId2: string): Promise<Message[]> {
    return this.messages.filter(
      msg =>
        (msg.sender_id === userId1 && msg.receiver_id === userId2) ||
        (msg.sender_id === userId2 && msg.receiver_id === userId1)
    );
  }

  async sendMessage(
    senderId: string,
    receiverId: string,
    content: string,
    senderType: 'influencer' | 'business'
  ): Promise<Message> {
    const message: Message = {
      id: uuidv4(),
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      sent_at: new Date().toISOString(),
      read: false,
      sender_type: senderType
    };

    this.messages.push(message);
    this.notifyMessageListeners(message);

    // Simulate receiver typing and response
    setTimeout(() => {
      this.notifyTypingStatus(receiverId, true);
      setTimeout(() => {
        this.notifyTypingStatus(receiverId, false);
        const response: Message = {
          id: uuidv4(),
          sender_id: receiverId,
          receiver_id: senderId,
          content: `Thanks for your message! This is an automated response.`,
          sent_at: new Date().toISOString(),
          read: false,
          sender_type: senderType === 'influencer' ? 'business' : 'influencer'
        };
        this.messages.push(response);
        this.notifyMessageListeners(response);
      }, 2000);
    }, 1000);

    return message;
  }

  async markMessagesAsRead(userId1: string, userId2: string): Promise<void> {
    this.messages.forEach(msg => {
      if (
        msg.receiver_id === userId1 &&
        msg.sender_id === userId2 &&
        !msg.read
      ) {
        msg.read = true;
      }
    });
  }

  subscribeToMessages(callback: (message: Message) => void): () => void {
    this.messageListeners.push(callback);
    return () => {
      this.messageListeners = this.messageListeners.filter(cb => cb !== callback);
    };
  }

  subscribeToTypingStatus(
    callback: (data: { userId: string; isTyping: boolean }) => void
  ): () => void {
    this.typingListeners.push(callback);
    return () => {
      this.typingListeners = this.typingListeners.filter(cb => cb !== callback);
    };
  }

  subscribeToOnlineStatus(
    callback: (data: { userId: string; isOnline: boolean }) => void
  ): () => void {
    this.onlineStatusListeners.push(callback);
    return () => {
      this.onlineStatusListeners = this.onlineStatusListeners.filter(
        cb => cb !== callback
      );
    };
  }

  private notifyMessageListeners(message: Message): void {
    this.messageListeners.forEach(callback => callback(message));
  }

  private notifyTypingStatus(userId: string, isTyping: boolean): void {
    this.typingListeners.forEach(callback => callback({ userId, isTyping }));
  }

  private notifyOnlineStatus(userId: string, isOnline: boolean): void {
    this.onlineStatusListeners.forEach(callback => callback({ userId, isOnline }));
  }
}

export const mockMessagingService = new MockMessagingService(); 