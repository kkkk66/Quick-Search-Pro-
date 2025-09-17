import React, { useState } from 'react';
// Fix: Corrected import path for GenericIcons.
import { ClipboardIcon, PaperAirplaneIcon } from './icons/GenericIcons';

interface PromptInputProps {
  onBroadcast: (prompt: string) => void;
  selectedSessionCount: number;
}

const PromptInput: React.FC<PromptInputProps> = ({ onBroadcast, selectedSessionCount }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if(!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBroadcast = () => {
    onBroadcast(prompt);
  };
  
  const isBroadcastDisabled = selectedSessionCount === 0;

  return (
    <div className="bg-gray-800 rounded-lg p-3 shadow-lg">
      <label htmlFor="prompt" className="sr-only">Your Prompt</label>
      <div className="relative">
        <textarea
          id="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your command once..."
          className="block w-full bg-gray-900 border border-gray-700 rounded-md p-3 pr-24 text-gray-200 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        />
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button onClick={handleCopy} className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors">
                <span className="sr-only">Copy</span>
                <ClipboardIcon className="h-5 w-5 text-gray-300" />
            </button>
            <button 
                onClick={handleBroadcast} 
                disabled={isBroadcastDisabled}
                className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
                    isBroadcastDisabled 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
                aria-disabled={isBroadcastDisabled}
            >
                <span className="sr-only">Broadcast</span>
                <PaperAirplaneIcon className={`h-5 w-5 ${isBroadcastDisabled ? 'text-gray-400' : 'text-white'}`} />
            </button>
        </div>
      </div>
      {copied && <p className="text-xs text-green-400 mt-2 text-center">Copied to clipboard!</p>}
      <p className="text-xs text-gray-500 mt-2 text-center">
        {selectedSessionCount > 0 
          ? `Broadcasting to ${selectedSessionCount} selected session(s).`
          : 'Select one or more sessions below to enable broadcast.'
        }
      </p>
    </div>
  );
};

export default PromptInput;
