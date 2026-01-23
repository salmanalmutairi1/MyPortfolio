import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, RotateCcw, RotateCw, ChevronDown, ChevronUp, Gauge, Globe } from 'lucide-react';
import { usePlayer } from '../services/PlayerContext';
import { useLanguage } from '../services/LanguageContext';
import { Language } from '../types';
import AudioVisualizer from './ui/AudioVisualizer';

// Project logos
import HalahLogo from '../Assets/halah.png';
import YASLogo from '../Assets/YAS.png';
import KSUMarketLogo from '../Assets/LogoDark.png';

const projectLogos: Record<string, string> = {
  ksumarket: KSUMarketLogo,
  halah: HalahLogo,
  'yas-ai': YASLogo
};

const MiniPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
    skip,
    playbackRate,
    setRate,
    closePlayer,
    isMinimized,
    toggleMinimize,
    switchAudioLanguage,
    audioLanguage
  } = usePlayer();

  const { t, language } = useLanguage();
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  if (!currentTrack) return null;

  const projectLogo = currentTrack.projectId ? projectLogos[currentTrack.projectId] : null;
  const isRTL = language === Language.AR;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seek(newTime);
  };

  const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        dir={isRTL ? 'rtl' : 'ltr'}
        className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center pb-2 sm:pb-4 px-2 sm:px-4"
      >
        <div className="w-full max-w-3xl rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-visible backdrop-blur-xl bg-[#0a0a0f]/95 relative">
          
          {/* Expanded View */}
          {!isMinimized ? (
            <div className="p-3 sm:p-4">
              {/* Top Row: Track Info + Close */}
              <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  {/* Project Logo */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-brand-900/50 to-brand-950/50 flex items-center justify-center border border-brand-500/20 shrink-0 overflow-hidden">
                    {projectLogo ? (
                      <img src={projectLogo} alt={currentTrack.title} className="w-full h-full object-contain p-1.5 sm:p-2" />
                    ) : (
                      <AudioVisualizer isPlaying={isPlaying} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[8px] sm:text-[10px] text-brand-400 font-bold uppercase tracking-wider block truncate">
                      {t.player.nowPlaying}
                    </span>
                    <span className="text-white font-semibold text-xs sm:text-sm block truncate">
                      {currentTrack.title}
                    </span>
                  </div>
                </div>
                
                {/* Minimize & Close */}
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <button
                    onClick={toggleMinimize}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                    aria-label={t.player.minimize}
                  >
                    <ChevronDown size={16} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={closePlayer}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all"
                    aria-label={t.player.close}
                  >
                    <X size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div 
                className="w-full h-2 sm:h-2.5 bg-white/10 rounded-full cursor-pointer relative group mb-1.5 sm:mb-2"
                onClick={handleSeekClick}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all"
                  style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={progress}
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label={t.player.seek}
                />
                <div
                  className="absolute top-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${duration ? (progress / duration) * 100 : 0}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>

              {/* Time Display */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-gray-500 mb-3 sm:mb-4">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                {/* Left: Language Switch */}
                <button
                  onClick={switchAudioLanguage}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  aria-label={t.player.switchLang}
                  title={t.player.switchLang}
                >
                  <Globe size={12} className="sm:w-4 sm:h-4 text-brand-400" />
                  <span className="text-[10px] sm:text-xs font-bold text-gray-200">
                    {audioLanguage === 'ar' ? 'عربي' : 'EN'}
                  </span>
                </button>

                {/* Center: Main Controls */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                  {/* Skip Back 5s */}
                  <button
                    onClick={() => skip(-5)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex flex-col items-center justify-center"
                    aria-label={t.player.rewind}
                    title={t.player.rewind}
                  >
                    <RotateCcw size={14} className="sm:w-5 sm:h-5" />
                    <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 -mt-0.5">5s</span>
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-white to-gray-200 text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/20"
                    aria-label={isPlaying ? t.player.pause : t.player.play}
                  >
                    {isPlaying ? (
                      <Pause size={18} className="sm:w-6 sm:h-6" fill="black" />
                    ) : (
                      <Play size={18} className="sm:w-6 sm:h-6" fill="black" style={{ marginLeft: '2px' }} />
                    )}
                  </button>

                  {/* Skip Forward 5s */}
                  <button
                    onClick={() => skip(5)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex flex-col items-center justify-center"
                    aria-label={t.player.forward}
                    title={t.player.forward}
                  >
                    <RotateCw size={14} className="sm:w-5 sm:h-5" />
                    <span className="text-[7px] sm:text-[8px] font-bold text-gray-500 -mt-0.5">5s</span>
                  </button>
                </div>

                {/* Right: Speed Control */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    aria-label={t.player.speed}
                  >
                    <Gauge size={12} className="sm:w-4 sm:h-4 text-brand-400" />
                    <span className="text-[10px] sm:text-xs font-mono font-semibold text-gray-200">
                      {playbackRate}x
                    </span>
                  </button>

                  <AnimatePresence>
                    {showSpeedMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-2 w-20 sm:w-24 bg-[#0a0a0f] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                      >
                        <div className="p-1 space-y-0.5">
                          {rates.map(rate => (
                            <button
                              key={rate}
                              onClick={() => { setRate(rate); setShowSpeedMenu(false); }}
                              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-mono transition-all ${
                                playbackRate === rate
                                  ? 'bg-brand-600 text-white font-bold'
                                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            /* Minimized View */
            <div className="flex items-center justify-between p-2 sm:p-3 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-brand-900/50 to-brand-950/50 flex items-center justify-center border border-brand-500/20 shrink-0 overflow-hidden">
                  {projectLogo ? (
                    <img src={projectLogo} alt={currentTrack.title} className="w-full h-full object-contain p-1 sm:p-1.5" />
                  ) : (
                    <AudioVisualizer isPlaying={isPlaying} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-white font-semibold text-xs sm:text-sm block truncate">
                    {currentTrack.title}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-mono">
                    {formatTime(progress)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block flex-1 max-w-[100px]">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
                  aria-label={isPlaying ? t.player.pause : t.player.play}
                >
                  {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" style={{ marginLeft: '2px' }} />}
                </button>
                <button onClick={toggleMinimize} className="p-1.5 sm:p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white" aria-label={t.player.expand}>
                  <ChevronUp size={16} />
                </button>
                <button onClick={closePlayer} className="p-1.5 sm:p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400" aria-label={t.player.close}>
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MiniPlayer;
