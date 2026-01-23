import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { usePlayer } from '../services/PlayerContext';
import { ExternalLink, Github, Book, ArrowUpRight, Smartphone, Globe, Code2, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, Project } from '../types';
import ProjectModal from './ProjectModal';
import AudioVisualizer from './ui/AudioVisualizer';
import TechIcon from './ui/TechIcon';
import H1 from '../Assets/H1.png';
import H2 from '../Assets/H2.png';
import H3 from '../Assets/H3.png';
import H4 from '../Assets/H4.png';
import H5 from '../Assets/H5.png';
import K1 from '../Assets/K1.png';
import K2 from '../Assets/K2.png';
import K3 from '../Assets/K3.png';
import K4 from '../Assets/K4.png';
import K5 from '../Assets/K5.png';
import YAS1 from '../Assets/YAS1.png';
import YAS2 from '../Assets/YAS2.png';
import YAS3 from '../Assets/YAS3.png';
import YAS4 from '../Assets/YAS4.png';
import YAS5 from '../Assets/YAS5.png';
import HalahLogo from '../Assets/halah.png';
import YASLogo from '../Assets/YAS.png';
import KSUMarketLogo from '../Assets/LogoDark.png';

// Project logos mapping
const projectLogos: Record<string, string> = {
  ksumarket: KSUMarketLogo,
  halah: HalahLogo,
  'yas-ai': YASLogo
};

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const { playTrack, loadTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projectImages = useMemo(() => ({
    ksumarket: [K1, K2, K3, K4, K5],
    halah: [H1, H2, H3, H4, H5],
    'yas-ai': [YAS1, YAS2, YAS3, YAS4, YAS5]
  }), []);

  const getAudioSources = (project: Project) => {
    const src = language === Language.AR ? project.audio.ar : project.audio.en;
    const fallbackSrc = language === Language.AR ? project.audio.en : project.audio.ar;
    return { src, fallbackSrc };
  };

  const handleOpenProject = (project: Project) => {
    // Only load track if it's NOT the currently playing/loaded project
    // This prevents interrupting audio when viewing details of currently playing project
    if (currentTrack?.projectId !== project.id) {
      const { src, fallbackSrc } = getAudioSources(project);
      loadTrack({ title: project.title, src, fallbackSrc, projectId: project.id });
    }
    setSelectedProject(project);
  };

  const handlePlayNarration = (project: Project) => {
    const { src, fallbackSrc } = getAudioSources(project);
    if (currentTrack?.projectId === project.id && isPlaying) {
      togglePlay();
      return;
    }
    playTrack({ title: project.title, src, fallbackSrc, projectId: project.id });
  };

  return (
    <section id="projects" className="py-24 bg-black relative">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
          >
            {t.projects.title}
          </motion.h2>
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: '100px' }}
             viewport={{ once: true }}
             className="h-1 bg-brand-500 mb-6"
          />
          <p className="text-xl text-gray-400 max-w-xl leading-relaxed">{t.projects.subtitle}</p>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {t.projects.items.map((project, index) => (
            <FeaturedProject 
              key={project.id} 
              project={project} 
              index={index} 
              onSelect={() => handleOpenProject(project)}
              onPlay={() => handlePlayNarration(project)}
              isPlaying={currentTrack?.projectId === project.id && isPlaying}
              images={projectImages[project.id] || []}
              logo={projectLogos[project.id]}
              t={t}
              language={language}
            />
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

const FeaturedProject: React.FC<{ 
  project: Project; 
  index: number; 
  onSelect: () => void;
  onPlay: () => void;
  isPlaying: boolean;
  images: string[];
  logo?: string;
  t: any;
  language: Language;
}> = ({ project, index, onSelect, onPlay, isPlaying, images, logo, t, language }) => {
  const isEven = index % 2 === 0;
  const isRTL = language === Language.AR;
  // Only Halah gets the phone mockup (has SwiftUI and is specifically the Halah app)
  const isMobileApp = project.id === 'halah';
  
  // Determine icon based on tech
  const TypeIcon = project.tech.some(tech => ['Swift', 'SwiftUI', 'SwiftData', 'Flutter'].includes(tech)) ? Smartphone : Globe;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-12 lg:gap-16 items-center`}
    >
      {/* Project Image Area */}
      <div
        className="w-full lg:w-3/5 cursor-pointer"
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={t.projects.caseStudyBtn}
      >
        <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl ${isMobileApp ? 'aspect-[16/12]' : 'aspect-video'} hover:border-brand-500/30 transition-all duration-300`}>
          {images.length > 0 ? (
            isMobileApp ? (
              <PhoneMockupCarousel images={images} title={project.title} />
            ) : (
              <ProjectCarousel images={images} title={project.title} />
            )
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]">
                 <div className="text-[80px] sm:text-[120px] font-bold text-white/5 font-mono select-none">
                    {project.title.substring(0, 2).toUpperCase()}
                 </div>
              </div>
              <div className="absolute inset-4 sm:inset-8 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
                 <TypeIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600" strokeWidth={1} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="w-full lg:w-2/5 flex flex-col items-start text-start">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
           <span className="font-mono text-xs sm:text-sm text-brand-400 bg-brand-500/10 px-2 sm:px-3 py-1 rounded border border-brand-500/10">
              0{index + 1}
           </span>
           <div className="h-px flex-1 bg-white/10 w-12 sm:w-20" />
           {project.isPrivate && (
              <span className="text-[10px] uppercase tracking-widest text-red-400 border border-red-500/20 px-2 py-0.5 rounded">
                NDA / Private
              </span>
           )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          {logo && (
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 p-1.5 sm:p-2 flex items-center justify-center shrink-0">
              <img src={logo} alt={`${project.title} logo`} className="w-full h-full object-contain" />
            </div>
          )}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">{project.title}</h3>
        </div>
        
        {/* Role Block */}
        <div className={`mb-4 sm:mb-6 ${isRTL ? 'pr-3 sm:pr-4 border-r-2' : 'pl-3 sm:pl-4 border-l-2'} border-brand-500`}>
           <span className="block text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">{t.projects.labels.role}</span>
           <span className="text-base sm:text-lg font-medium text-gray-200">{project.role}</span>
        </div>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
          {project.description}
        </p>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-4 sm:gap-x-8 w-full mb-6 sm:mb-8 py-4 sm:py-6 border-y border-white/5">
            <div>
               <span className="block text-[10px] sm:text-xs text-gray-500 uppercase mb-1">{t.projects.labels.platform}</span>
               <div className="flex items-center gap-2 text-gray-300">
                  <TypeIcon size={14} className="shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{project.projectType}</span>
               </div>
            </div>
            <div>
               <span className="block text-[10px] sm:text-xs text-gray-500 uppercase mb-1">{t.projects.labels.focus}</span>
               <div className="flex items-center gap-2 text-gray-300">
                  <Code2 size={14} className="shrink-0" />
                  <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-[160px]">{project.keyFeatures[0]}</span>
               </div>
            </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
           {project.tech.map(techItem => (
             <span key={techItem} className="text-[10px] sm:text-xs font-mono text-gray-400 bg-white/5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 border border-white/5">
               <TechIcon name={techItem} className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80" />
               {techItem}
             </span>
           ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
           <button 
              onClick={onPlay}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                isPlaying
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-white border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
              aria-label={t.projects.labels.playNarration}
           >
              {isPlaying ? (
                <>
                  <AudioVisualizer isPlaying={true} />
                  <span className="hidden sm:inline">{t.projects.labels.playingNarration}</span>
                  <span className="sm:hidden">{isRTL ? 'يشتغل' : 'Playing'}</span>
                </>
              ) : (
                <>
                  <Play size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{t.projects.labels.playNarration}</span>
                  <span className="sm:hidden">{isRTL ? 'اسمع' : 'Listen'}</span>
                </>
              )}
           </button>
           <button 
              onClick={onSelect}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-xs sm:text-sm"
           >
              <Book size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.projects.caseStudyBtn}</span>
              <span className="sm:hidden">{isRTL ? 'التفاصيل' : 'Details'}</span>
           </button>
           {project.links.demo && (
             <a href={project.links.demo} target="_blank" rel="noreferrer" className="p-2 sm:p-2.5 text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all">
                <ExternalLink size={16} className="sm:w-5 sm:h-5" />
             </a>
           )}
           {!project.isPrivate && project.links.github && (
             <a href={project.links.github} target="_blank" rel="noreferrer" className="p-2 sm:p-2.5 text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all">
                <Github size={16} className="sm:w-5 sm:h-5" />
             </a>
           )}
        </div>
      </div>
    </motion.div>
  );
}

const ProjectCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (total <= 1) return;
    const interval = window.setInterval(() => {
      setIndex(prev => (prev + 1) % total);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [total]);

  const goPrev = () => setIndex(prev => (prev - 1 + total) % total);
  const goNext = () => setIndex(prev => (prev + 1) % total);
  const goTo = (value: number) => setIndex(value);

  return (
    <div className="absolute inset-0 z-0" dir="ltr">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt={`${title} preview ${idx + 1}`}
              className="w-full h-full object-cover shrink-0"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-full">
            {images.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={() => goTo(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// iPhone Mockup Carousel for mobile apps (vertical screenshots)
const PhoneMockupCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (total <= 1) return;
    const interval = window.setInterval(() => {
      setIndex(prev => (prev + 1) % total);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [total]);

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex(prev => (prev - 1 + total) % total);
  };
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex(prev => (prev + 1) % total);
  };
  const goTo = (value: number) => setIndex(value);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#111] to-[#0a0a0f]" dir="ltr">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-brand-500/20 rounded-full blur-[60px] sm:blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-24 sm:w-48 h-24 sm:h-48 bg-purple-500/20 rounded-full blur-[50px] sm:blur-[80px]" />
      </div>

      {/* iPhone Frame - More responsive sizing */}
      <div className="relative h-[75%] sm:h-[80%] md:h-[85%] aspect-[9/19.5] mx-auto max-h-[400px] sm:max-h-none">
        {/* Phone outer frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-700">
          {/* Side buttons - hidden on very small screens */}
          <div className="hidden sm:block absolute -left-0.5 sm:-left-1 top-16 sm:top-24 w-0.5 sm:w-1 h-6 sm:h-8 bg-gray-700 rounded-l-sm" />
          <div className="hidden sm:block absolute -left-0.5 sm:-left-1 top-28 sm:top-36 w-0.5 sm:w-1 h-8 sm:h-12 bg-gray-700 rounded-l-sm" />
          <div className="hidden sm:block absolute -right-0.5 sm:-right-1 top-24 sm:top-32 w-0.5 sm:w-1 h-10 sm:h-16 bg-gray-700 rounded-r-sm" />
        </div>
        
        {/* Screen area */}
        <div className="absolute inset-[2px] sm:inset-[3px] bg-black rounded-[1.4rem] sm:rounded-[1.9rem] md:rounded-[2.8rem] overflow-hidden">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 w-[30%] sm:w-[35%] h-4 sm:h-5 md:h-7 bg-black rounded-full z-20" />
          
          {/* Screen content */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.4rem] sm:rounded-[1.9rem] md:rounded-[2.8rem]">
            <motion.div
              className="flex h-full"
              animate={{ x: `-${index * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {images.map((src, idx) => (
                <img
                  key={`phone-${idx}`}
                  src={src}
                  alt={`${title} screenshot ${idx + 1}`}
                  className="w-full h-full object-cover shrink-0"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </motion.div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-[30%] sm:w-[35%] h-0.5 sm:h-1 bg-white/50 rounded-full z-20" />
        </div>
      </div>

      {/* Navigation - Smaller on mobile */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
            aria-label="Next screenshot"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
          </button>

          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-black/40 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full z-10">
            {images.map((_, idx) => (
              <button
                key={`phone-dot-${idx}`}
                type="button"
                onClick={(e) => { e.stopPropagation(); goTo(idx); }}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  idx === index ? 'w-4 sm:w-6 bg-white' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to screenshot ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
