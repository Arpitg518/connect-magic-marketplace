
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

/**
 * A hook for subscribing to real-time updates from a Supabase table
 * @param tableName The name of the table to subscribe to
 * @param initialQuery A function that returns a Supabase query to fetch initial data
 * @returns An object containing the data, loading state, error, and refresh function
 */
export function useRealtimeData<T>(
  tableName: string,
  initialQuery: () => Promise<T[]>
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  // Fetch initial data and set up real-time subscription
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const initialData = await initialQuery();
        
        if (isMounted) {
          setData(initialData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching data:', err);
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Set up real-time subscription using the Supabase channel
    const channel = supabase
      .channel(`public-${tableName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
        },
        (payload) => {
          // Check if still mounted before updating state
          if (!isMounted) return;

          console.log('Realtime update received:', payload);

          // Handle real-time updates
          if (payload.eventType === 'INSERT') {
            // Add new record to the data array
            setData(prevData => [...prevData, payload.new as T]);
          } else if (payload.eventType === 'UPDATE') {
            // Update existing record in the data array
            setData(prevData => 
              prevData.map(item => 
                // @ts-ignore
                (item as any).id === payload.new.id ? payload.new as T : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted record from the data array
            setData(prevData => 
              // @ts-ignore
              prevData.filter(item => (item as any).id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
    
    setSubscription(channel);
    
    // Cleanup function
    return () => {
      isMounted = false;
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [tableName]); // Only re-run if tableName changes

  // Function to manually refresh the data
  const refresh = async () => {
    try {
      setIsLoading(true);
      const refreshedData = await initialQuery();
      setData(refreshedData);
      setError(null);
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refresh };
}

/**
 * A simplified hook for real-time influencer data
 */
export function useRealtimeInfluencers(city?: string) {
  return useRealtimeData('influencers', async () => {
    if (city) {
      const { data, error } = await supabase
        .from('influencers')
        .select('*')
        .eq('city', city);
        
      if (error) throw error;
      return data || [];
    } else {
      const { data, error } = await supabase
        .from('influencers')
        .select('*');
        
      if (error) throw error;
      return data || [];
    }
  });
}

/**
 * A simplified hook for real-time business data
 */
export function useRealtimeBusinesses(category?: string) {
  return useRealtimeData('businesses', async () => {
    if (category) {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('category', category);
        
      if (error) throw error;
      return data || [];
    } else {
      const { data, error } = await supabase
        .from('businesses')
        .select('*');
        
      if (error) throw error;
      return data || [];
    }
  });
}

/**
 * A hook for real-time messaging
 */
export function useRealtimeMessages(userId1: number, userId2: number) {
  return useRealtimeData('messages', async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    return data || [];
  });
}
