import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { Terminal, Command, Copy, Check, CornerDownLeft, RotateCcw, Info, Play } from 'lucide-react';

const Mindset: React.FC = () => {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState(0); // Default tab (principles)
  const [copied, setCopied] = useState(false);
  
  // Interactive Terminal State
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([t.mindset.initialMessage]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Available commands mapped to logic or tabs
  const validCommands = [
    'help', 'clear', 'contact', 'about', 'social', 
    'principles', 'workflow', 'quality', 'learning'
  ];

  // Map commands to Tab Index
  const commandToTabIndex: Record<string, number> = {
    principles: 0,
    workflow: 1,
    quality: 2,
    learning: 3
  };

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    // Add to input history
    if (cleanCmd) {
        setCommandHistory(prev => [cleanCmd, ...prev]);
        setHistoryIndex(-1);
    }

    let response = '';
    
    // Check if it's a tab switch command
    if (commandToTabIndex.hasOwnProperty(cleanCmd)) {
        setActiveTab(commandToTabIndex[cleanCmd]);
        response = `Switched to /${cleanCmd}`;
    } else {
        switch (cleanCmd) {
            case 'help':
                response = t.mindset.commands.map(c => `${c.cmd}: ${c.desc}`).join('\n');
                break;
            case 'clear':
                setHistory([t.mindset.initialMessage]);
                setInputVal('');
                return;
            case 'contact':
                response = `Email: salmanmajed.sma@gmail.com\nLinkedIn: linkedin.com/in/salman-almutairi`;
                break;
            case 'about':
                response = 'Salman Almutairi | Software Engineer | KSU Student';
                break;
            case 'social':
                response = 'LinkedIn: https://linkedin.com/in/salman-almutairi';
                break;
            default:
                response = cleanCmd ? `Command not found: ${cleanCmd}. Try 'help'.` : '';
        }
    }

    setHistory(prev => [...prev, `visitor@portfolio:~$ ${cleanCmd}`, response].filter(Boolean));
    setInputVal('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInputVal(commandHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInputVal(commandHistory[newIndex]);
        } else {
            setHistoryIndex(-1);
            setInputVal('');
        }
    }
  };

  const copyContent = () => {
    const text = t.mindset.tabs[activeTab].content.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetTerminal = () => {
      setHistory([t.mindset.initialMessage]);
      setCommandHistory([]);
      setInputVal('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, activeTab]);

  // Autocomplete filtering
  const suggestions = inputVal 
    ? validCommands.filter(c => c.startsWith(inputVal.toLowerCase()) && c !== inputVal.toLowerCase())
    : [];

  return (
    <section id="mindset" className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{t.mindset.title}</h2>
                 <p className="text-gray-400">{t.mindset.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-400 bg-brand-900/10 px-3 py-1.5 rounded-full border border-brand-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                {t.mindset.status}
            </div>
        </div>

        {/* Premium Terminal Container */}
        <div className="terminal-glass rounded-xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5 flex flex-col min-h-[600px]">
            {/* Terminal Header */}
            <div className="bg-[#0f0f12] p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs text-gray-500 font-mono select-none">
                    salman-portfolio — -zsh — 80x24
                </div>
                <button onClick={resetTerminal} className="text-gray-600 hover:text-white transition-colors" title={t.mindset.reset}>
                    <RotateCcw size={14} />
                </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 bg-[#0a0a0f]/50">
                {/* Sidebar Command List (Left) */}
                <div className="md:w-64 border-r border-white/5 bg-[#050505]/50 p-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1 custom-scrollbar">
                    {t.mindset.tabs.map((tab, index) => (
                        <div key={tab.id} className="group relative">
                            <button
                                onClick={() => setActiveTab(index)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono transition-all w-full text-left whitespace-nowrap relative ${
                                    activeTab === index 
                                    ? 'bg-white/5 text-brand-300' 
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                }`}
                            >
                                <span className={`transition-opacity ${activeTab === index ? 'opacity-100' : 'opacity-50'}`}>
                                    <Command size={14} />
                                </span>
                                {tab.label}
                                {activeTab === index && (
                                    <motion.div 
                                        layoutId="terminal-tab"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-r-full"
                                    />
                                )}
                            </button>
                            
                            {/* Hover Tooltip */}
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-900 border border-white/10 px-3 py-1.5 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-20 hidden md:block shadow-xl">
                                {tab.description}
                                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-b border-white/10 rotate-45" />
                            </div>
                        </div>
                    ))}
                    
                    <div className="mt-auto pt-4 hidden md:block">
                         <div className="px-4 text-xs font-bold text-gray-600 uppercase mb-2">System</div>
                         {['help', 'clear', 'about', 'contact'].map(cmd => (
                            <button
                                key={cmd}
                                onClick={() => executeCommand(cmd)}
                                className="w-full text-left px-4 py-2 text-xs text-gray-500 hover:text-white hover:bg-white/5 rounded transition-colors font-mono"
                            >
                                {cmd}
                            </button>
                         ))}
                    </div>
                </div>

                {/* Content Output Area (Right) */}
                <div className="flex-1 flex flex-col relative font-mono text-sm md:text-base min-w-0">
                    <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar" ref={scrollRef}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="mb-12"
                            >
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                    <div>
                                        <span className="text-gray-600 text-xs block mb-1">
                                          // {t.mindset.tabs[activeTab].id}.config.ts
                                        </span>
                                        <h3 className="text-xl text-white font-bold">
                                            export const {t.mindset.tabs[activeTab].title.replace(/\s/g, '')} =
                                        </h3>
                                    </div>
                                    <button 
                                        onClick={copyContent}
                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs bg-white/5 border border-white/5"
                                        title={t.mindset.copy}
                                    >
                                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                        <span className="hidden sm:inline">{copied ? t.mindset.copied : t.mindset.copy}</span>
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div className="text-yellow-500/50 text-xs mb-2">/**</div>
                                    {t.mindset.tabs[activeTab].content.map((line, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-start gap-3 text-gray-400 hover:text-gray-200 transition-colors"
                                        >
                                            <span className="text-brand-500/30 select-none mr-2">*</span>
                                            <span>{line}</span>
                                        </motion.div>
                                    ))}
                                    <div className="text-yellow-500/50 text-xs mt-2">*/</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* History Log */}
                        <div className="mt-12 pt-6 border-t border-white/5 space-y-2">
                           {history.map((line, idx) => (
                             <div key={idx} className={`text-sm break-all ${line.startsWith('visitor') ? 'text-gray-500' : 'text-gray-300'}`}>
                                {line}
                             </div>
                           ))}
                        </div>
                    </div>
                    
                    {/* Input Area */}
                    <div className="p-4 bg-[#050505] border-t border-white/10 relative">
                        {/* Autocomplete Dropdown */}
                        <AnimatePresence>
                            {suggestions.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full left-4 mb-2 bg-[#1a1b26] border border-white/10 rounded-lg shadow-xl overflow-hidden z-20 min-w-[150px]"
                                >
                                    {suggestions.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => executeCommand(s)}
                                            className="block w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-brand-500/20 text-sm font-mono"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Suggestion Chips */}
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3 mb-1">
                            <span className="text-xs text-gray-600 font-bold uppercase tracking-wider self-center mr-2 shrink-0 select-none">
                                {t.mindset.suggestionsLabel}
                            </span>
                            {validCommands.slice(5).concat(['help']).map(cmd => (
                                <button
                                    key={cmd}
                                    onClick={() => executeCommand(cmd)}
                                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-500/30 text-xs text-gray-400 hover:text-brand-300 transition-colors shrink-0 font-mono"
                                >
                                    {cmd}
                                </button>
                            ))}
                        </div>

                        {/* Input Line */}
                        <div className="flex items-center gap-2 relative">
                            <span className="text-green-500 select-none">➜</span>
                            <span className="text-cyan-500 select-none">~</span>
                            <div className="relative flex-1">
                                <input 
                                    ref={inputRef}
                                    type="text" 
                                    value={inputVal}
                                    onChange={(e) => {
                                        setInputVal(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent border-none outline-none text-white font-mono placeholder-gray-800"
                                    placeholder={t.mindset.placeholder}
                                    autoComplete="off"
                                />
                            </div>
                            
                            {/* Run Button */}
                            <button 
                                onClick={() => executeCommand(inputVal)}
                                disabled={!inputVal}
                                className={`p-2 rounded bg-brand-600 text-white transition-opacity ${inputVal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            >
                                <CornerDownLeft size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Mindset;