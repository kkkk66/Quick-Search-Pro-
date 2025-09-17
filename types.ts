export interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

export interface Session {
  id: string;
  name: string;
  url: string;
  provider: 'gemini' | 'openai' | 'perplexity' | 'custom';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
}
