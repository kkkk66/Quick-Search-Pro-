import React, { useState, useEffect } from 'react';
import type { UserProfile, Session, LogEntry } from '../types';
import Header from './Header';
import PromptInput from './PromptInput';
import AiSessionPanel from './AiSessionPanel';
import AddSessionModal from './AddSessionModal';
import LogPanel from './LogPanel';

interface DashboardPageProps {
  user: UserProfile;
  onLogout: () => void;
}

const DEFAULT_SESSIONS: Session[] = [
    { id: 'gemini-default', name: 'Google Gemini', url: 'https://gemini.google.com/app', provider: 'gemini' },
    { id: 'openai-default', name: 'OpenAI ChatGPT', url: 'https://chat.openai.com/', provider: 'openai' },
    { id: 'perplexity-default', name: 'Perplexity AI', url: 'https://www.perplexity.ai/', provider: 'perplexity' },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout }) => {
  const [sessions, setSessions] = useState<Session[]>(() => {
    const savedSessions = localStorage.getItem('aiSessions');
    return savedSessions ? JSON.parse(savedSessions) : DEFAULT_SESSIONS;
  });
  const [selectedSessions, setSelectedSessions] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    localStorage.setItem('aiSessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleSessionToggle = (sessionId: string) => {
    setSelectedSessions(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(sessionId)) {
        newSelection.delete(sessionId);
      } else {
        newSelection.add(sessionId);
      }
      return newSelection;
    });
  };

  const handleAddSession = (session: Omit<Session, 'id' | 'provider'>) => {
    const newSession: Session = { 
        ...session, 
        id: `custom-${Date.now()}`,
        provider: 'custom' // Simplified logic for custom provider icon
    };
    setSessions(prev => [...prev, newSession]);
    setIsModalOpen(false);
  };
  
  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    setSelectedSessions(prev => {
      const newSelection = new Set(prev);
      newSelection.delete(sessionId);
      return newSelection;
    });
  };

  const handleBroadcast = (prompt: string) => {
    if (selectedSessions.size === 0 || !prompt.trim()) return;

    const newLog: LogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        message: `Broadcast to ${selectedSessions.size} session(s): "${prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt}"`
    };
    setLogs(prev => [newLog, ...prev]);

    // This is where you would implement the actual broadcast logic
    // (e.g., using window.postMessage to iframes, or other methods).
    // For this example, we just log the action.
    console.log(`Broadcasting prompt: "${prompt}" to sessions:`, Array.from(selectedSessions));
  };


  return (
    <div className="flex flex-col h-screen">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-grow p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto">
        <div className="flex flex-col space-y-6">
          <PromptInput 
            onBroadcast={handleBroadcast} 
            selectedSessionCount={selectedSessions.size} 
          />
          <AiSessionPanel 
            sessions={sessions}
            selectedSessions={selectedSessions}
            onSessionToggle={handleSessionToggle}
            onAddSession={() => setIsModalOpen(true)}
            onDeleteSession={handleDeleteSession}
          />
        </div>
        <LogPanel logs={logs} />
      </main>
      {isModalOpen && (
        <AddSessionModal
          onClose={() => setIsModalOpen(false)}
          onAddSession={handleAddSession}
        />
      )}
    </div>
  );
};

export default DashboardPage;
