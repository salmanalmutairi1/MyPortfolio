import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Building2, Clock, BookOpen, Sparkles, CheckCircle2, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { CertificateItem } from '../types';
import { useLanguage } from '../services/LanguageContext';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, isOpen, onClose }) => {
  const { t, dir } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-16 xl:inset-24 z-50 overflow-hidden"
            dir={dir}
          >
            <div className="relative h-full bg-gradient-to-b from-[#0a0a0a] to-[#111] rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden">
              {/* Glow effects - hidden on mobile for performance */}
              <div className="hidden sm:block absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
              <div className="hidden sm:block absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors group"
              >
                <X size={18} className="text-gray-400 group-hover:text-white sm:w-5 sm:h-5" />
              </button>

              {/* Content */}
              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="flex flex-col lg:flex-row min-h-full">
                  {/* Image Section */}
                  <div className="lg:w-1/2 p-4 sm:p-6 lg:p-10 flex items-center justify-center bg-gradient-to-br from-brand-500/5 to-transparent">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative w-full max-w-md cursor-pointer group"
                      onClick={() => setLightboxOpen(true)}
                    >
                      <div className="hidden sm:block absolute inset-0 bg-brand-500/20 blur-3xl rounded-full" />
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="relative w-full rounded-lg sm:rounded-xl shadow-2xl border border-white/10 transition-transform group-hover:scale-[1.02]"
                      />
                      {/* Click to expand hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg sm:rounded-xl">
                        <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full flex items-center gap-2">
                          <ZoomIn size={16} />
                          {dir === 'rtl' ? 'انقر للتكبير' : 'Click to expand'}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Details Section */}
                  <div className="lg:w-1/2 p-4 sm:p-6 lg:p-10 flex flex-col">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                        {certificate.title}
                      </h2>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-sm">
                          <Building2 size={14} className="text-brand-400 sm:w-4 sm:h-4" />
                          <span>{certificate.issuer}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-sm">
                          <Calendar size={14} className="text-brand-400 sm:w-4 sm:h-4" />
                          <span>{certificate.date}</span>
                        </div>
                        {certificate.duration && (
                          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-sm">
                            <Clock size={14} className="text-brand-400 sm:w-4 sm:h-4" />
                            <span>{certificate.duration}</span>
                          </div>
                        )}
                      </div>

                      {certificate.specialization && (
                        <div className="flex items-center gap-2 mb-4 sm:mb-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 w-fit">
                          <BookOpen size={14} className="text-purple-400 sm:w-4 sm:h-4" />
                          <span className="text-purple-300 text-xs sm:text-sm">{certificate.specialization}</span>
                        </div>
                      )}
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6 sm:mb-8"
                    >
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {certificate.description}
                      </p>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-6 sm:mb-8"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                        <Sparkles size={16} className="text-brand-400 sm:w-[18px] sm:h-[18px]" />
                        {t.certificates.skillsAcquired}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {certificate.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/5 hover:bg-brand-500/20 border border-white/10 hover:border-brand-500/30 rounded-full text-xs sm:text-sm text-gray-300 hover:text-white transition-all cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Key Outcomes */}
                    {certificate.keyOutcomes && certificate.keyOutcomes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-green-400 sm:w-[18px] sm:h-[18px]" />
                          {t.certificates.keyOutcomes}
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                          {certificate.keyOutcomes.map((outcome, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="flex items-start gap-2 sm:gap-3"
                            >
                              <span className="w-1.5 h-1.5 mt-1.5 sm:mt-2 rounded-full bg-brand-400 shrink-0" />
                              <span className="text-gray-400 text-sm sm:text-base">{outcome}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Lightbox */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  src={certificate.image}
                  alt={`${certificate.title} full view`}
                  className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
