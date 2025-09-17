import React, { useEffect, useRef } from 'react';
// Fix: Corrected import path for UserProfile type.
import type { UserProfile } from '../types';

// Fix for 'google' is not defined error by declaring the global 'google' object provided by the Google Identity Services script.
declare const google: any;

interface LoginPageProps {
  onLogin: (profile: UserProfile) => void;
}

// Helper to decode JWT
function jwt_decode(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
}


const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  // FIX: Removed 'process.env' which causes a runtime error in the browser.
  // Replace the placeholder with your actual Google Client ID.
  const GOOGLE_CLIENT_ID = '714614936726-d6iptcpk0v940e5qf74edmptvqi8lva8.apps.googleusercontent.com';

  useEffect(() => {
    if (typeof google === 'undefined' || !googleButtonRef.current) {
        return;
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        const userObject = jwt_decode(response.credential);
        if (userObject) {
          const profile: UserProfile = {
            name: userObject.name,
            email: userObject.email,
            picture: userObject.picture,
          };
          onLogin(profile);
        } else {
          console.error("Could not decode credential from Google.");
        }
      },
    });

    google.accounts.id.renderButton(
      googleButtonRef.current,
      { theme: "outline", size: "large", type: "standard", shape: "pill", text: "signin_with" }
    );

    // Optional: Prompt for login automatically without a click
    // google.accounts.id.prompt();

    return () => {
      google.accounts.id.cancel();
    }

  }, [onLogin, GOOGLE_CLIENT_ID]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg text-center">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">AI Multi-Session</h1>
            <p className="mt-2 text-gray-400">Sign in to broadcast your prompts.</p>
        </div>
        <div className="flex justify-center pt-4">
            <div ref={googleButtonRef}></div>
        </div>
         <p className="text-xs text-gray-500 pt-4">
            By signing in, you agree to our terms of service.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;