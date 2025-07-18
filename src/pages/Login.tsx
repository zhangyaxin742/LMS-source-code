import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { EmailVerificationForm } from "@/components/auth/EmailVerificationForm";
import { useAuth } from "@/hooks/useAuth";
type AuthState = 'signIn' | 'signUp' | 'verification';

const Login: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('signIn');
  const [verificationEmail, setVerificationEmail] = useState('');
  const { isAuthenticated, loading, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (profile?.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, loading, profile, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">57</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSignUpSuccess = (email: string) => {
    setVerificationEmail(email);
    setAuthState('verification');
  };

  const handleNeedVerification = (email: string) => {
    setVerificationEmail(email);
    setAuthState('verification');
  };

  const getAuthContent = () => {
    switch (authState) {
      case 'signUp':
        return (
          <AuthLayout
            title="Join Project 57"
            subtitle="Start your financial literacy journey today"
          >
            <SignUpForm
              onSwitchToSignIn={() => setAuthState('signIn')}
              onSignUpSuccess={handleSignUpSuccess}
            />
          </AuthLayout>
        );
      case 'verification':
        return (
          <AuthLayout
            title="Verify Your Email"
            subtitle="Enter the verification code we sent you"
          >
            <EmailVerificationForm
              email={verificationEmail}
              onBack={() => setAuthState('signIn')}
            />
          </AuthLayout>
        );
      default:
        return (
          <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your Project 57 account"
          >
            <SignInForm
              onSwitchToSignUp={() => setAuthState('signUp')}
              onNeedVerification={handleNeedVerification}
            />
          </AuthLayout>
        );
    }
  };

  return getAuthContent();
};
export default Login;