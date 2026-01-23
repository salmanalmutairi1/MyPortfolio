import React from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying }) => {
  return (
    <div className="flex items-end gap-0.5 h-4">
      <div className={`w-1 bg-brand-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_0.8s_ease-in-out_infinite]' : 'h-1.5'}`} style={{ animationDelay: '0s' }} />
      <div className={`w-1 bg-brand-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_1.1s_ease-in-out_infinite]' : 'h-3'}`} style={{ animationDelay: '0.2s' }} />
      <div className={`w-1 bg-brand-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_1.3s_ease-in-out_infinite]' : 'h-2'}`} style={{ animationDelay: '0.4s' }} />
      <div className={`w-1 bg-brand-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_0.9s_ease-in-out_infinite]' : 'h-2.5'}`} style={{ animationDelay: '0.1s' }} />
      
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </div>
  );
};

export default AudioVisualizer;