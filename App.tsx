import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
// Fix: Corrected import paths to resolve module errors.
import DashboardPage from './components/DashboardPage.tsx';
import type { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check for a saved user session in localStorage
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (profile: UserProfile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setUser(profile);
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {user ? (
        <DashboardPage user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;