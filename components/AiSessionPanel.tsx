import React from 'react';
import type { Session } from '../types';
import { GeminiIcon, OpenAiIcon, PerplexityIcon } from './icons/ProviderIcons';
import { PlusCircleIcon, TrashIcon } from './icons/GenericIcons';

interface AiSessionPanelProps {
  sessions: Session[];
  selectedSessions: Set<string>;
  onSessionToggle: (sessionId: string) => void;
  onAddSession: () => void;
  onDeleteSession: (sessionId:string) => void;
}

const ProviderIcon: React.FC<{ provider: Session['provider'] }> = ({ provider }) => {
    switch (provider) {
        case 'gemini':
            return <GeminiIcon className="w-6 h-6" />;
        case 'openai':
            return <OpenAiIcon className="w-6 h-6" />;
        case 'perplexity':
            return <PerplexityIcon className="w-6 h-6" />;
        default:
            return <div className="w-6 h-6 bg-gray-600 rounded-full" />;
    }
}

const AiSessionPanel: React.FC<AiSessionPanelProps> = ({ 
    sessions, 
    selectedSessions, 
    onSessionToggle, 
    onAddSession,
    onDeleteSession 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">AI Sessions</h3>
        <button
            onClick={onAddSession}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>Add Session</span>
        </button>
      </div>
      <div className="space-y-3">
        {sessions.length > 0 ? (
            sessions.map((session) => (
            <div
              key={session.id}
              className={`flex items-center justify-between p-3 rounded-md transition-colors cursor-pointer ${
                selectedSessions.has(session.id) ? 'bg-indigo-900/50' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => onSessionToggle(session.id)}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selectedSessions.has(session.id)}
                  onChange={() => onSessionToggle(session.id)}
                  className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
                  onClick={(e) => e.stopPropagation()} // Prevent parent onClick from firing twice
                />
                <ProviderIcon provider={session.provider} />
                <div className="flex flex-col min-w-0">
                    <span className="font-medium text-white truncate">{session.name}</span>
                    <a 
                        href={session.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-gray-400 hover:text-indigo-400 hover:underline truncate"
                    >
                        {session.url}
                    </a>
                </div>
              </div>
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                }}
                className="p-1 text-gray-400 hover:text-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 ml-2 flex-shrink-0"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
            <p className="text-center text-gray-500 py-4">No sessions added yet. Click 'Add Session' to get started.</p>
        )}
      </div>
    </div>
  );
};

export default AiSessionPanel;