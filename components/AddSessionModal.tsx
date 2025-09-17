import React, { useState } from 'react';
// Fix: Corrected import path for Session type.
import type { Session } from '../types';
// Fix: Corrected import path for XMarkIcon.
import { XMarkIcon } from './icons/GenericIcons';

interface AddSessionModalProps {
  onClose: () => void;
  onAddSession: (session: Omit<Session, 'id' | 'provider'>) => void;
}

const AddSessionModal: React.FC<AddSessionModalProps> = ({ onClose, onAddSession }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && url.trim()) {
      onAddSession({ name, url });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Add Custom AI Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="session-name" className="block text-sm font-medium text-gray-300 mb-2">
              Session Name
            </label>
            <input
              type="text"
              id="session-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., My Gemini Session"
              required
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
              Session URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., https://gemini.google.com/app"
              required
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              Add Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSessionModal;
