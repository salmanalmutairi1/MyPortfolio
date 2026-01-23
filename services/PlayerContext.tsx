import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { PlayerContextType, PropsWithChildren } from '../types';
import { useLanguage } from './LanguageContext';

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { language, t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{ title: string; src: string; fallbackSrc?: string; fallbackTried?: boolean; projectId: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [audioLanguage, setAudioLanguage] = useState<'en' | 'ar'>(language === 'ar' ? 'ar' : 'en');
  const trackRef = useRef<typeof currentTrack>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    trackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "metadata";

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handlePause = () => {
      // Sync isPlaying state when audio is paused (e.g., by load() or external factors)
      setIsPlaying(false);
    };

    const handlePlay = () => {
      // Sync isPlaying state when audio starts playing
      setIsPlaying(true);
    };

    const handleError = () => {
      const activeTrack = trackRef.current;
      if (!activeTrack || !audioRef.current) return;
      if (activeTrack.fallbackSrc && !activeTrack.fallbackTried) {
        const nextSrc = activeTrack.fallbackSrc;
        setCurrentTrack(prev => prev ? { ...prev, src: nextSrc, fallbackTried: true } : prev);
        audio.src = nextSrc;
        audio.load();
        if (playingRef.current) {
          audio.play().catch(e => console.log("Playback interrupted", e));
        }
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.pause();
    };
  }, []);

  // Update playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Handle language switch logic
  // If the user switches language, we need to check if we are currently playing a project
  // and try to switch to the new language audio file for that project.
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      const projects = t.projects.items;
      const currentProject = projects.find(p => p.id === currentTrack.projectId);
      
      if (currentProject) {
         const newSrc = language === 'ar' ? currentProject.audio.ar : currentProject.audio.en;
         const fallbackSrc = language === 'ar' ? currentProject.audio.en : currentProject.audio.ar;
         
         if (newSrc && newSrc !== currentTrack.src) {
            const wasPlaying = isPlaying;
            const currentTime = audioRef.current.currentTime;
            setCurrentTrack(prev => prev ? { ...prev, src: newSrc, fallbackSrc, fallbackTried: false } : null);
            audioRef.current.src = newSrc;
            audioRef.current.currentTime = currentTime;
            if (wasPlaying) {
              audioRef.current.play().catch(e => console.log("Playback interrupted", e));
            }
         }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]); // Depend on language change

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      // isPlaying will be set to false by the 'pause' event listener
    } else {
      audioRef.current.play().catch(err => {
        console.error("Audio playback error:", err);
      });
      // isPlaying will be set to true by the 'play' event listener
    }
  };

  const playTrack = (track: { title: string; src: string; fallbackSrc?: string; projectId: string }) => {
    if (!audioRef.current) return;

    if (currentTrack?.projectId === track.projectId) {
      // Same project - just play (don't reload)
      audioRef.current.play().then(() => {
        setIsMinimized(false);
        // isPlaying will be set by 'play' event listener
      }).catch(err => console.error("Audio playback error:", err));
      return;
    }

    // New track
    setCurrentTrack({ ...track, fallbackTried: false });
    audioRef.current.src = track.src;
    audioRef.current.load();
    audioRef.current.play().then(() => {
      setIsMinimized(false); // Auto expand if playing new
      // isPlaying will be set by 'play' event listener
    }).catch(err => {
      console.error("Audio playback error:", err);
    });
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      const nextTime = Math.max(0, Math.min(time, audioRef.current.duration || time));
      audioRef.current.currentTime = nextTime;
      setProgress(nextTime);
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      const nextTime = audioRef.current.currentTime + seconds;
      const clamped = Math.max(0, Math.min(nextTime, audioRef.current.duration || nextTime));
      audioRef.current.currentTime = clamped;
    }
  };

  const setRate = (rate: number) => {
    setPlaybackRate(rate);
  };

  const loadTrack = (track: { title: string; src: string; fallbackSrc?: string; projectId: string }) => {
    if (!audioRef.current) return;

    // Same project already loaded - don't interrupt playback at all
    if (currentTrack?.projectId === track.projectId) {
      setIsMinimized(false);
      return;
    }

    // Different project - stop current and load new
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
    setIsPlaying(false);
    setCurrentTrack({ ...track, fallbackTried: false });
    audioRef.current.src = track.src;
    audioRef.current.load();
    setIsMinimized(false);
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const switchAudioLanguage = () => {
    if (!currentTrack || !audioRef.current) return;
    
    const projects = t.projects.items;
    const currentProject = projects.find(p => p.id === currentTrack.projectId);
    
    if (currentProject) {
      const newLang = audioLanguage === 'ar' ? 'en' : 'ar';
      const newSrc = newLang === 'ar' ? currentProject.audio.ar : currentProject.audio.en;
      const fallbackSrc = newLang === 'ar' ? currentProject.audio.en : currentProject.audio.ar;
      
      const wasPlaying = isPlaying;
      const currentTime = audioRef.current.currentTime;
      
      setAudioLanguage(newLang);
      setCurrentTrack(prev => prev ? { ...prev, src: newSrc, fallbackSrc, fallbackTried: false } : null);
      audioRef.current.src = newSrc;
      audioRef.current.currentTime = currentTime;
      
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.log("Playback interrupted", e));
      }
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  }

  const value: PlayerContextType = {
    isPlaying,
    currentTrack,
    progress,
    duration,
    playbackRate,
    togglePlay,
    playTrack,
    loadTrack,
    seek,
    skip,
    setRate,
    closePlayer,
    isMinimized,
    toggleMinimize,
    switchAudioLanguage,
    audioLanguage
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
