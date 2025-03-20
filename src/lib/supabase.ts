
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
  const subscription = supabase
    .channel(`public:${tableName}`)
    .on(
      'postgres_changes',
      { event, schema: 'public', table: tableName },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  // Return the subscription so it can be unsubscribed later
  return subscription;
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
