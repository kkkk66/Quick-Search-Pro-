
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const GeminiIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
        <path fill="#4285F4" d="M64 128c0 35.3 28.7 64 64 64s64-28.7 64-64-28.7-64-64-64-64 28.7-64 64z"/>
        <path fill="#34A853" d="M128 0v64c35.3 0 64 28.7 64 64s-28.7 64-64 64v64c70.7 0 128-57.3 128-128S198.7 0 128 0z"/>
    </svg>
);

export const OpenAiIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} {...props}>
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="white" strokeOpacity="0.5"/>
        <path d="M17.5 12c0 3.038-2.462 5.5-5.5 5.5S6.5 15.038 6.5 12 8.962 6.5 12 6.5s5.5 2.462 5.5 5.5z" stroke="white" strokeOpacity="0.75"/>
        <path d="M12 12l2.121-2.121" stroke="white"/>
        <path d="M12 12l-2.121-2.121" stroke="white" strokeOpacity="0.5"/>
        <path d="M12 12l2.121 2.121" stroke="white" strokeOpacity="0.5"/>
        <path d="M12 12l-2.121 2.121" stroke="white"/>
    </svg>
);

export const PerplexityIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/>
    </svg>
);
