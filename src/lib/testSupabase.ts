import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
  try {
    // Test database connection
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);

    if (messagesError) {
      console.error('Database connection error:', messagesError);
      return false;
    }

    // Test storage connection
    const { data: storage, error: storageError } = await supabase
      .storage
      .from('chat-files')
      .list();

    if (storageError) {
      console.error('Storage connection error:', storageError);
      return false;
    }

    // Test real-time connection
    const channel = supabase
      .channel('test-channel')
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Real-time connection successful');
          channel.unsubscribe();
        }
      });

    return true;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
}; 