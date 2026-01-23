import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { Mail, Linkedin, Send, CheckCircle, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

// Discord icon component
const DiscordIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// Telegram icon component
const TelegramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// Telegram Bot Configuration (from environment variables)
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const Contact: React.FC = () => {
  const { t, dir } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const isRTL = dir === 'rtl';

  const sendToTelegram = async (name: string, email: string, message: string) => {
    const text = `🚀 *New Portfolio Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n\n💬 *Message:*\n${message}\n\n---\n_Sent from your portfolio_`;
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    if (!response.ok) throw new Error('Failed to send');
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      await sendToTelegram(formData.name, formData.email, formData.message);
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 4000);
    } catch (error) {
      console.error('Error sending message:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const socialLinks = [
    {
      name: isRTL ? 'البريد الإلكتروني' : 'Email',
      handle: 'salmanmajed.sma@gmail.com',
      href: 'mailto:salmanmajed.sma@gmail.com',
      icon: Mail,
      hoverBorder: 'hover:border-brand-500/50',
      iconBg: 'bg-brand-500/10',
      iconColor: 'text-brand-400',
      hoverIconBg: 'group-hover:bg-brand-500'
    },
    {
      name: 'LinkedIn',
      handle: 'Salman Almutairi',
      href: 'https://www.linkedin.com/in/salman-almutairi-9b860324b/',
      icon: Linkedin,
      hoverBorder: 'hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      hoverIconBg: 'group-hover:bg-blue-500'
    },
    {
      name: 'Discord',
      handle: '@salmanmajed29',
      href: 'https://discord.com/users/salmanmajed29',
      icon: DiscordIcon,
      hoverBorder: 'hover:border-indigo-500/50',
      iconBg: 'bg-indigo-500/10',
      iconColor: 'text-indigo-400',
      hoverIconBg: 'group-hover:bg-indigo-500'
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6"
          >
            <Sparkles size={16} />
            {isRTL ? 'متاح للفرص الجديدة' : 'Available for opportunities'}
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isRTL ? 'تواصل معي' : "Let's Connect"}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {isRTL 
              ? 'أرسل لي رسالة وستصلني فوراً على التليجرام. أرد عادةً خلال ساعات قليلة.'
              : "Send me a message and I'll receive it instantly on Telegram. I typically respond within a few hours."
            }
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Social Links */}
          <div className="lg:col-span-2 space-y-4">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6"
            >
              {isRTL ? 'تواصل مباشر' : 'Direct Channels'}
            </motion.h3>

            {socialLinks.map((link, idx) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' && !link.name.includes('البريد') ? '_blank' : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: isRTL ? -8 : 8 }}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 ${link.hoverBorder} transition-all group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${link.iconBg} flex items-center justify-center ${link.iconColor} ${link.hoverIconBg} group-hover:text-white transition-colors`}>
                    <IconComponent size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm">{link.name}</h4>
                    <p className="text-gray-400 text-sm truncate">{link.handle}</p>
                  </div>
                  <ArrowRight size={18} className={`text-gray-600 group-hover:text-white transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                </motion.a>
              );
            })}


          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <MessageCircle size={20} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">
                    {isRTL ? 'أرسل رسالة' : 'Send a Message'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isRTL ? 'ستصلني فوراً ⚡' : 'Instantly delivered to me ⚡'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      {isRTL ? 'الاسم' : 'Name'}
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={isRTL ? 'اسمك' : 'Your name'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={isRTL ? 'بريدك الإلكتروني' : 'your@email.com'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    {isRTL ? 'الرسالة' : 'Message'}
                  </label>
                  <textarea 
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={isRTL ? 'كيف أقدر أساعدك؟' : 'How can I help you?'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all resize-none"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={formState === 'submitting'}
                  whileHover={{ scale: formState === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: formState === 'idle' ? 0.98 : 1 }}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                    formState === 'success' 
                      ? 'bg-green-600 text-white' 
                      : formState === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/30'
                  }`}
                >
                  {formState === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                    </>
                  ) : formState === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      {isRTL ? 'تم الإرسال بنجاح! ✨' : 'Message Sent! ✨'}
                    </>
                  ) : formState === 'error' ? (
                    <>
                      {isRTL ? 'حدث خطأ، حاول مرة أخرى' : 'Error, please try again'}
                    </>
                  ) : (
                    <>
                      <Send size={18} className={isRTL ? 'rotate-180' : ''} />
                      {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-600 mt-4">
                  {isRTL 
                    ? '🔒 رسالتك آمنة ومشفرة وتصلني مباشرة'
                    : '🔒 Your message is secure and delivered directly to me'
                  }
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;