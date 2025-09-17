import React from 'react';
import type { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg sm:text-xl font-bold text-white">AI Multi-Session</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-300 hidden sm:inline">{user.email}</span>
        <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;