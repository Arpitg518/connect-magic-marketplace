
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SupabaseSetupProps {
  onSetup: (url: string, anonKey: string) => void;
  isConfigured: boolean;
}

const SupabaseSetup: React.FC<SupabaseSetupProps> = ({ onSetup, isConfigured }) => {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSetup = async () => {
    if (!supabaseUrl || !supabaseKey) {
      toast({
        variant: "destructive",
        title: "Missing credentials",
        description: "Please enter both the Supabase URL and anon key.",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Store credentials in localStorage for persistence
      localStorage.setItem('supabaseUrl', supabaseUrl);
      localStorage.setItem('supabaseAnonKey', supabaseKey);
      
      // Call the setup callback
      onSetup(supabaseUrl, supabaseKey);
      
      toast({
        title: "Supabase connected!",
        description: "Your application is now connected to Supabase.",
      });
    } catch (error) {
      console.error('Error setting up Supabase:', error);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Could not connect to Supabase. Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfigured) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-700">Supabase Connected</CardTitle>
          <CardDescription>
            Your application is connected to Supabase and ready for real-time data!
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem('supabaseUrl');
              localStorage.removeItem('supabaseAnonKey');
              window.location.reload();
            }}
          >
            Reconfigure
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect to Supabase</CardTitle>
        <CardDescription>
          Enter your Supabase project URL and anon key to enable real-time data and authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="supabaseUrl">Supabase URL</Label>
          <Input
            id="supabaseUrl"
            placeholder="https://your-project.supabase.co"
            value={supabaseUrl}
            onChange={(e) => setSupabaseUrl(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supabaseKey">Supabase Anon Key</Label>
          <Input
            id="supabaseKey"
            type="password"
            placeholder="your-anon-key"
            value={supabaseKey}
            onChange={(e) => setSupabaseKey(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSetup} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
              Connecting...
            </>
          ) : (
            "Connect to Supabase"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseSetup;
