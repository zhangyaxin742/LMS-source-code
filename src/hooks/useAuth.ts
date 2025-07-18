import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Profile {
  id: string;
  email: string;
  role: 'student' | 'admin';
  email_verified: boolean;
  verification_code?: string;
  verification_code_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile data
          setTimeout(async () => {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setProfile(profileData);
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (data.user) {
      await supabase
        .from('profiles')
        .update({
          verification_code: verificationCode,
          verification_code_expires_at: expiresAt.toISOString()
        })
        .eq('id', data.user.id);

      // Here you would send the verification code via email
      // For demo purposes, we'll show it in the toast
      toast({
        title: "Verification code sent",
        description: `Your verification code is: ${verificationCode}`
      });
    }

    return { data, error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }

    return { data, error: null };
  };

  const verifyEmail = async (code: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "No user found",
        variant: "destructive"
      });
      return { error: new Error("No user found") };
    }

    const { data: profileData, error: fetchError } = await supabase
      .from('profiles')
      .select('verification_code, verification_code_expires_at')
      .eq('id', user.id)
      .single();

    if (fetchError || !profileData) {
      toast({
        title: "Error",
        description: "Failed to verify code",
        variant: "destructive"
      });
      return { error: fetchError };
    }

    const now = new Date();
    const expiresAt = new Date(profileData.verification_code_expires_at);

    if (now > expiresAt) {
      toast({
        title: "Code expired",
        description: "Verification code has expired. Please request a new one.",
        variant: "destructive"
      });
      return { error: new Error("Code expired") };
    }

    if (profileData.verification_code !== code) {
      toast({
        title: "Invalid code",
        description: "The verification code is incorrect.",
        variant: "destructive"
      });
      return { error: new Error("Invalid code") };
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        email_verified: true,
        verification_code: null,
        verification_code_expires_at: null
      })
      .eq('id', user.id);

    if (updateError) {
      toast({
        title: "Error",
        description: "Failed to verify email",
        variant: "destructive"
      });
      return { error: updateError };
    }

    // Refresh profile data
    const { data: updatedProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    setProfile(updatedProfile);

    toast({
      title: "Email verified",
      description: "Your email has been successfully verified!",
      variant: "default"
    });

    return { error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      });
    }
    return { error };
  };

  return {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    verifyEmail,
    isAuthenticated: !!session && !!profile?.email_verified,
    isEmailVerified: !!profile?.email_verified
  };
}