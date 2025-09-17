import React from 'react';
import type { LogEntry } from '../types';

interface LogPanelProps {
  logs: LogEntry[];
}

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-3">Broadcast Log</h3>
        <div className="flex-grow bg-gray-900 rounded-md p-3 overflow-y-auto">
            {logs.length === 0 ? (
                <p className="text-gray-500 text-center pt-4">No broadcast events yet.</p>
            ) : (
                <ul className="space-y-2">
                {logs.map((log) => (
                    <li key={log.id} className="text-sm text-gray-300 font-mono">
                    <span className="text-gray-500 mr-2">{log.timestamp}</span>
                    <span>{log.message}</span>
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
};

export default LogPanel;
