
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public URL and anon key
// Replace these with your actual Supabase project details
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to subscribe to real-time changes in a table
export const subscribeToTable = (
  tableName: string,
  callback: (payload: any) => void,
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*'
) => {
  // Create a channel for real-time events
  const channel = supabase
    .channel(`public-${tableName}`)
    .on(
      'postgres_changes',
      {
        event: event,
        schema: 'public',
        table: tableName,
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  // Return the channel so it can be unsubscribed later
  return channel;
};

// Functions for influencer data
export const getInfluencersRealtime = async () => {
  const { data, error } = await supabase
    .from('influencers')
    .select('*')
    .order('followers', { ascending: false });
  
  if (error) {
    console.error('Error fetching influencers:', error);
    throw error;
  }
  
  return data;
};

export const getInfluencersByCity = async (city: string) => {
  const { data, error } = await supabase
    .from('influencers')
    .select('*')
    .eq('city', city)
    .order('followers', { ascending: false });
  
  if (error) {
    console.error('Error fetching influencers by city:', error);
    throw error;
  }
  
  return data;
};

// Functions for business data
export const getBusinessesRealtime = async () => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*');
  
  if (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
  
  return data;
};

// Function to save matchmaking results
export const saveMatchResult = async (
  influencerId: number, 
  businessId: number, 
  matchScore: number, 
  notes: string
) => {
  const { data, error } = await supabase
    .from('matches')
    .insert([
      { 
        influencer_id: influencerId, 
        business_id: businessId, 
        match_score: matchScore, 
        notes,
        created_at: new Date().toISOString() 
      }
    ]);
  
  if (error) {
    console.error('Error saving match result:', error);
    throw error;
  }
  
  return data;
};

// Messaging functions
export const sendMessage = async (
  senderId: number,
  receiverId: number,
  content: string,
  senderType: 'influencer' | 'business'
) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        sender_type: senderType,
        sent_at: new Date().toISOString(),
        read: false
      }
    ]);

  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }

  return data;
};

export const getConversations = async (userId: number, userType: 'influencer' | 'business') => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('sent_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }

  // Group messages by conversation
  const conversations = data.reduce((acc: any, message: any) => {
    const conversationId = message.sender_id === userId 
      ? `${userType}-${message.receiver_id}` 
      : `${userType}-${message.sender_id}`;
    
    if (!acc[conversationId]) {
      acc[conversationId] = [];
    }
    
    acc[conversationId].push(message);
    return acc;
  }, {});

  return conversations;
};

export const getMessagesBetweenUsers = async (user1Id: number, user2Id: number) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`and(sender_id.eq.${user1Id},receiver_id.eq.${user2Id}),and(sender_id.eq.${user2Id},receiver_id.eq.${user1Id})`)
    .order('sent_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  return data;
};

export const markMessagesAsRead = async (userId: number, senderId: number) => {
  const { data, error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('receiver_id', userId)
    .eq('sender_id', senderId)
    .eq('read', false);

  if (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }

  return data;
};
