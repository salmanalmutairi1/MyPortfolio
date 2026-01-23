import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Play, Headphones, ChevronLeft, ChevronRight,
  Target, Clock, Smartphone, Layers, Users, Brain, BarChart3, Volume2, Compass,
  MessageCircle, Sparkles, LayoutGrid, Search, Route, Workflow, ListChecks, Database, Globe, Cpu,
  CheckCircle2, Lightbulb, ArrowRight, Zap
} from 'lucide-react';
import { Language, Project } from '../types';
import { useLanguage } from '../services/LanguageContext';
import { usePlayer } from '../services/PlayerContext';
import AudioVisualizer from './ui/AudioVisualizer';
import TechIcon from './ui/TechIcon';

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Target, Clock, Smartphone, Layers, Users, Brain, BarChart3, Volume2, Compass,
  MessageCircle, Sparkles, LayoutGrid, Search, Route, Workflow, ListChecks, Database, Globe, Cpu,
  CheckCircle2, Lightbulb, Zap
};

// Import project images
import K1 from '../Assets/K1.png';
import K2 from '../Assets/K2.png';
import K3 from '../Assets/K3.png';
import K4 from '../Assets/K4.png';
import K5 from '../Assets/K5.png';
import H1 from '../Assets/H1.png';
import H2 from '../Assets/H2.png';
import H3 from '../Assets/H3.png';
import H4 from '../Assets/H4.png';
import H5 from '../Assets/H5.png';
import YAS1 from '../Assets/YAS1.png';
import YAS2 from '../Assets/YAS2.png';
import YAS3 from '../Assets/YAS3.png';
import YAS4 from '../Assets/YAS4.png';
import YAS5 from '../Assets/YAS5.png';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNarrationPrompt, setShowNarrationPrompt] = useState(true);
  const [hasStartedListening, setHasStartedListening] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const projectImages = useMemo(() => {
    if (!project) return [];
    const imagesMap: Record<string, string[]> = {
      'ksumarket': [K1, K2, K3, K4, K5],
      'halah': [H1, H2, H3, H4, H5],
      'yas-ai': [YAS1, YAS2, YAS3, YAS4, YAS5]
    };
    return imagesMap[project.id] || [];
  }, [project]);

  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = 'hidden';
      // Don't show narration prompt if audio for this project is already playing
      const isAlreadyPlaying = currentTrack?.projectId === project.id && isPlaying;
      setShowNarrationPrompt(!isAlreadyPlaying);
      setHasStartedListening(isAlreadyPlaying);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, project?.id]);

  // Removed loadTrack useEffect - audio should only start when user clicks play
  // This prevents interrupting currently playing audio when opening project details

  useEffect(() => {
    if (!isOpen || projectImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % projectImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen, projectImages.length]);

  if (!project) return null;

  const handlePlayNarration = () => {
    setHasStartedListening(true);
    setShowNarrationPrompt(false);

    // If this project's audio is already playing, just toggle (pause)
    if (currentTrack?.projectId === project.id && isPlaying) {
      togglePlay();
      return;
    }

    // If this project's audio is loaded but paused, just resume
    if (currentTrack?.projectId === project.id && !isPlaying) {
      togglePlay();
      return;
    }

    // Otherwise, start playing new track
    const src = language === Language.AR ? project.audio.ar : project.audio.en;
    const fallbackSrc = language === Language.AR ? project.audio.en : project.audio.ar;

    playTrack({
      title: project.title,
      src,
      fallbackSrc,
      projectId: project.id
    });
  };

  const isCurrentProjectPlaying = currentTrack?.projectId === project.id && isPlaying;
  const isRTL = language === Language.AR;

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const goPrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const goNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % projectImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/98 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative w-full max-w-6xl h-[95vh] sm:h-[90vh] bg-[#0a0a0f] border border-white/10 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur-md sticky top-0 z-30 gap-2">
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight truncate">{project.title}</h2>
                <span className="text-[10px] sm:text-xs font-mono text-brand-400 block truncate">{project.role}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] sm:text-xs flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white transition-colors"
                  >
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">{isRTL ? 'تجربة' : 'Demo'}</span>
                    <ExternalLink size={10} className="sm:w-3 sm:h-3" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label={t.projects.closeBtn}
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
              {/* Desktop Sidebar */}
              <div className="hidden lg:flex flex-col w-72 p-8 border-r border-white/5 overflow-y-auto bg-[#0a0a0f]/50">
                {/* Narration Box - Only show if audio is playing or user has started listening */}
                {(hasStartedListening || isCurrentProjectPlaying) && (
                  <div className="mb-10 p-5 rounded-xl bg-gradient-to-br from-brand-900/20 to-black border border-brand-500/20 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Headphones size={40} className="text-brand-500 rotate-12" />
                    </div>

                    <h3 className="text-white font-bold text-sm mb-1 relative z-10">{t.projects.narration.title}</h3>
                    <p className="text-xs text-gray-400 mb-4 relative z-10">{t.projects.narration.subtitle}</p>

                    <button
                      onClick={handlePlayNarration}
                      className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all relative z-10 ${
                        isCurrentProjectPlaying
                          ? 'bg-white text-black'
                          : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                      }`}
                      aria-label={t.projects.labels.playNarration}
                    >
                      {isCurrentProjectPlaying ? (
                        <>
                          <AudioVisualizer isPlaying={true} />
                          <span>{t.projects.narration.playing}</span>
                        </>
                      ) : (
                        <>
                          <Play size={12} fill="currentColor" />
                          <span>{t.projects.narration.play}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{t.projects.labels.techStack}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(stackItem => (
                      <span key={stackItem} className="text-xs text-gray-400 border border-white/5 px-2 py-1 rounded-full flex items-center gap-1.5">
                        <TechIcon name={stackItem} className="w-3.5 h-3.5 opacity-80" />
                        {stackItem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 lg:p-12 custom-scrollbar scroll-smooth" ref={contentRef}>
                {/* Mobile Narration Box - Only show if audio is playing or user has started listening */}
                {(hasStartedListening || isCurrentProjectPlaying) && (
                  <div className="lg:hidden mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <Headphones size={12} className="sm:w-4 sm:h-4 text-brand-400 shrink-0" />
                        {t.projects.narration.title}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{t.projects.narration.subtitle}</div>
                    </div>
                    <button
                      onClick={handlePlayNarration}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isCurrentProjectPlaying ? 'bg-white text-black' : 'bg-brand-600 text-white'
                      }`}
                      aria-label={t.projects.labels.playNarration}
                    >
                      {isCurrentProjectPlaying ? <AudioVisualizer isPlaying={true} /> : <Play size={14} fill="white" className="ml-0.5 sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                )}

                {/* ============ ENHANCED PROJECT OVERVIEW ============ */}
                
                {/* Overview Section with Extended Description */}
                {project.overview && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 sm:mb-8"
                  >
                    <p className={`text-sm sm:text-base text-gray-300 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                      {project.overview}
                    </p>
                  </motion.div>
                )}

                {/* Context Badge Row (Program/Duration/Cohort) */}
                {project.context && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
                  >
                    {project.context.program && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs sm:text-sm font-medium">
                        <Sparkles size={14} className="text-brand-400" />
                        {project.context.program}
                      </span>
                    )}
                    {project.context.duration && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm">
                        <Clock size={14} />
                        {project.context.duration}
                      </span>
                    )}
                    {project.context.cohort && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm">
                        <Users size={14} />
                        {project.context.cohort}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Metrics Dashboard */}
                {project.metrics && project.metrics.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8"
                  >
                    {project.metrics.map((metric, idx) => {
                      const IconComponent = iconMap[metric.icon] || Target;
                      return (
                        <div 
                          key={idx}
                          className="relative p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center overflow-hidden group hover:border-brand-500/30 transition-colors"
                        >
                          <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                            <IconComponent size={32} className="text-brand-500" />
                          </div>
                          <div className="text-lg sm:text-2xl font-bold text-white mb-0.5">{metric.value}</div>
                          <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">{metric.label}</div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {/* Goals Card */}
                {project.goals && project.goals.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-brand-900/20 to-transparent border border-brand-500/20"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
                      <Lightbulb size={18} className="text-brand-400" />
                      {isRTL ? 'الأهداف' : 'Goals'}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {project.goals.map((goal, idx) => (
                        <li key={idx} className={`flex items-start gap-2 sm:gap-3 text-gray-300 text-sm ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                          <CheckCircle2 size={16} className="text-brand-400 mt-0.5 shrink-0" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Quick Facts Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 sm:mb-8 p-3 sm:p-4 md:p-6 rounded-xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="w-6 sm:w-8 h-px bg-brand-500" />
                    {isRTL ? 'نبذة سريعة' : 'Quick Overview'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] sm:text-xs text-gray-500 uppercase mb-1">{t.projects.labels.platform}</span>
                      <span className="text-xs sm:text-sm text-gray-200 font-medium">{project.projectType}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] sm:text-xs text-gray-500 uppercase mb-1">{t.projects.labels.role}</span>
                      <span className="text-xs sm:text-sm text-gray-200 font-medium">{project.roleDetailed || project.role}</span>
                    </div>
                  </div>
                  {/* Tech Stack */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
                    <span className="block text-[10px] sm:text-xs text-gray-500 uppercase mb-2">{t.projects.labels.techStack}</span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tech.map(techItem => (
                        <span key={techItem} className="text-[10px] sm:text-xs text-gray-400 border border-white/10 bg-white/5 px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
                          <TechIcon name={techItem} className="w-3 h-3 opacity-80" />
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Hero Image Carousel */}
                {projectImages.length > 0 && (
                  <div 
                    className="w-full aspect-[4/3] sm:aspect-video rounded-lg sm:rounded-xl bg-[#111] border border-white/10 mb-6 sm:mb-8 md:mb-12 relative overflow-hidden group cursor-pointer"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={projectImages[currentImageIndex]}
                        alt={`${project.title} preview ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                      {/* Click to expand hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full">
                          {isRTL ? 'انقر للتكبير' : 'Click to expand'}
                        </span>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    {projectImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); goPrevImage(); }}
                          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); goNextImage(); }}
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-black/50 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
                          {projectImages.map((_, idx) => (
                            <button
                              key={`dot-${idx}`}
                              onClick={(e) => { e.stopPropagation(); goToImage(idx); }}
                              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                                idx === currentImageIndex ? 'w-4 sm:w-6 bg-brand-500' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                              }`}
                              aria-label={`Go to image ${idx + 1}`}
                            />
                          ))}
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 backdrop-blur-sm border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          <span className="text-[10px] sm:text-xs font-mono text-white">
                            {currentImageIndex + 1} / {projectImages.length}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* ============ FEATURE CARDS GRID ============ */}
                {project.keyFeaturesDetailed && project.keyFeaturesDetailed.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mb-8 sm:mb-12"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                      <span className="w-6 sm:w-8 h-px bg-brand-500" />
                      {isRTL ? 'أهم الميزات' : 'Key Features'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {project.keyFeaturesDetailed.map((feature, idx) => {
                        const IconComponent = iconMap[feature.icon] || Zap;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.05 }}
                            className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-500/30 transition-all group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-brand-600/20 border border-brand-500/30 flex items-center justify-center shrink-0 group-hover:bg-brand-600/30 transition-colors">
                                <IconComponent size={20} className="text-brand-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm sm:text-base font-bold text-white mb-1">{feature.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ============ CHALLENGE → SOLUTION VISUAL ============ */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 sm:mb-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Challenge Card */}
                    <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-transparent border border-red-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                          <Zap size={16} className="text-red-400" />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white">{isRTL ? 'أكبر تحدٍ' : 'Biggest Challenge'}</h4>
                      </div>
                      <p className={`text-sm text-gray-300 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                        {project.biggestChallenge}
                      </p>
                    </div>

                    {/* Arrow connector (desktop only) */}
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-10">
                      <ArrowRight size={24} className="text-brand-500" />
                    </div>

                    {/* Solution Card */}
                    <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle2 size={16} className="text-green-400" />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white">{isRTL ? 'الحل' : 'Solution'}</h4>
                      </div>
                      <p className={`text-sm text-gray-300 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Impact Highlight */}
                  <div className="mt-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-brand-900/30 via-brand-800/20 to-brand-900/30 border border-brand-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                        <Target size={20} className="text-brand-400" />
                      </div>
                      <div>
                        <span className="block text-[10px] sm:text-xs text-brand-400 uppercase tracking-wide mb-0.5">{isRTL ? 'الأثر' : 'Impact'}</span>
                        <p className={`text-sm sm:text-base text-white font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom padding */}
                <div className="pb-12 sm:pb-20" />
              </div>
            </div>
          </motion.div>

          {/* Image Lightbox */}
          <AnimatePresence>
            {lightboxOpen && projectImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center"
                onClick={() => setLightboxOpen(false)}
              >
                {/* Close button */}
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>

                {/* Main image */}
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  src={projectImages[currentImageIndex]}
                  alt={`${project.title} full view ${currentImageIndex + 1}`}
                  className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Navigation arrows */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); goPrevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); goNextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-mono">
                    {currentImageIndex + 1} / {projectImages.length}
                  </span>
                </div>

                {/* Thumbnail strip */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-black/60 rounded-xl backdrop-blur-sm">
                  {projectImages.map((img, idx) => (
                    <button
                      key={`thumb-${idx}`}
                      onClick={(e) => { e.stopPropagation(); goToImage(idx); }}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex ? 'border-brand-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
