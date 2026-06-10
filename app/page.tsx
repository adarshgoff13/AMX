'use client';

import React, { useState, useEffect } from 'react';
import { BrandConfig, WidgetData, LayoutPreset } from './types';
import { INITIAL_BRAND_CONFIG, PRESET_LAYOUTS } from './data';
import ThemeToggle from './components/ThemeToggle';
import InstallWizard from './components/InstallWizard';
import WidgetStudio from './components/WidgetStudio';
import CommunityBoard from './components/CommunityBoard';
import { 
  Terminal, Sparkles, Code, ShieldCheck, Heart, Moon, Sun, Monitor, Laptop, 
  Smartphone, Cpu, Battery, Layers, ArrowUpRight, ExternalLink, HelpCircle,
  FolderSync, Layout, Compass, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [brandConfig] = useState<BrandConfig>(INITIAL_BRAND_CONFIG);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [dynamicLayouts, setDynamicLayouts] = useState<LayoutPreset[]>(PRESET_LAYOUTS);
  const [activePage, setActivePage] = useState<'showcase' | 'widgets' | 'community' | 'install' | 'dev'>('showcase');
  
  // Custom developer corner code tabs
  const [activeCodeTab, setActiveCodeTab] = useState<'widget' | 'layout' | 'sdk'>('widget');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Community share dynamic addition
  const handleShareLayout = (newPreset: Omit<LayoutPreset, 'id' | 'downloads' | 'stars'>) => {
    const fullPreset: LayoutPreset = {
      ...newPreset,
      id: `preset-user-${Date.now()}`,
      downloads: Math.floor(Math.random() * 20) + 1,
      stars: 1,
    };
    setDynamicLayouts([fullPreset, ...dynamicLayouts]);
  };

  // Developer corner raw content code strings
  const codeSnippets = {
    widget: `{
  "id": "my-custom-weather",
  "title": "Frosty Weather Hud",
  "version": "1.0.0",
  "size": "small",
  "components": [
    {
      "type": "blur-panel",
      "glossFactor": 0.9,
      "radius": "24px"
    },
    {
      "type": "weather-spark",
      "refreshMs": 600000
    }
  ]
}`,
    layout: `{
  "presetName": "macOS Pro Setup",
  "grid": { "cols": 4, "rows": "auto" },
  "theme": "glass-dark",
  "widgets": [
    {
      "widgetId": "clock-small-v1",
      "position": { "x": 0, "y": 0, "w": 1, "h": 1 }
    },
    {
      "widgetId": "notes-pad-v1",
      "position": { "x": 1, "y": 0, "w": 3, "h": 1 }
    }
  ]
}`,
    sdk: `import { AMXWidgetSDK } from "@amx/widget-sdk";

export default function GlassMusicWidget() {
  const [currentTrack, setTrack] = AMXWidgetSDK.useProperty("media.currentTrack");

  return (
    <div className="p-4 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10">
      <div className="flex items-center gap-2">
        <span className="text-zinc-400 font-mono text-xs truncate">{currentTrack}</span>
      </div>
    </div>
  );
}`
  };

  return (
    <div 
      className={`min-h-screen theme-fluid-transition transition-colors duration-700 flex flex-col justify-between ${
        darkMode ? 'bg-[#0a0a0c] text-zinc-100' : 'bg-[#fdfbf7] text-zinc-900'
      }`}
    >
      
      {/* 1. SEAMLESS TOP NAVIGATION BAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-500 ${
        darkMode 
          ? 'bg-[#0a0a0c]/55 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]' 
          : 'bg-[#fdfbf7]/55 border-black/10 shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand Identity / Logo & macOS window dots */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="h-4 w-[1px] bg-zinc-500/20" />
            <button 
              onClick={() => {
                setActivePage('showcase');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center text-left focus:outline-none cursor-pointer hover:scale-102 active:scale-98 transition-all duration-300"
              title="Return to Showcase"
            >
              <span className="font-montserrat font-extrabold text-xl tracking-tight text-zinc-950 dark:text-white hover:text-zinc-700 dark:hover:text-zinc-200">
                AMX <span className="font-light font-sans text-xs tracking-wide bg-black/10 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded-md ml-1 inline-block uppercase font-semibold">OS</span>
              </span>
              <span className="hidden sm:inline-block ml-3 text-[10px] font-mono opacity-50 border border-black/10 dark:border-white/10 px-1.5 py-0.5 rounded uppercase font-bold text-zinc-700 dark:text-zinc-300">
                {brandConfig.downloadVersion}
              </span>
            </button>
          </div>

          {/* Nav quick links acting as page triggers */}
          <nav className="hidden md:flex items-center gap-1.5 font-montserrat">
            <button 
              onClick={() => setActivePage('showcase')}
              className={`transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer px-4 py-2 rounded-xl text-xs font-bold font-montserrat ${
                activePage === 'showcase' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-950 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              Showcase
            </button>
            <button 
              onClick={() => setActivePage('widgets')}
              className={`transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer px-4 py-2 rounded-xl text-xs font-bold font-montserrat ${
                activePage === 'widgets' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-950 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              Widget Studio
            </button>
            <button 
              onClick={() => setActivePage('community')}
              className={`transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer px-4 py-2 rounded-xl text-xs font-bold font-montserrat ${
                activePage === 'community' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-950 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              Community Share
            </button>
            <button 
              onClick={() => setActivePage('install')}
              className={`transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer px-4 py-2 rounded-xl text-xs font-bold font-montserrat ${
                activePage === 'install' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-950 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              Download OS
            </button>
            <button 
              onClick={() => setActivePage('dev')}
              className={`transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer px-4 py-2 rounded-xl text-xs font-bold font-montserrat ${
                activePage === 'dev' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-950 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              Developer Core
            </button>
          </nav>

          {/* Theme switcher + GitHub call-to-actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            
            <a 
              href={brandConfig.githubUrl}
              target="_blank" 
              rel="noreferrer"
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                darkMode 
                  ? 'border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white bg-white/5' 
                  : 'border-black/10 hover:bg-black/10 text-zinc-700 hover:text-zinc-950 bg-black/5'
              }`}
              title="Visit Git repository"
            >
              <svg 
  className="w-4 h-4 fill-current" 
  viewBox="0 0 24 24" 
  aria-hidden="true"
>
  <path 
    fillRule="evenodd" 
    clipRule="evenodd" 
    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" 
  />
</svg>
            </a>
          </div>

        </div>
      </header>

      {/* 2. MAIN CORE PAGE WORKSPACE */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        <AnimatePresence mode="wait">
          {activePage === 'showcase' && (
            <motion.div
              key="showcase"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* HERO SECTION - PRESENTING THE ANDROID RESKIN OS */}
              <section 
                className={`relative overflow-hidden py-12 md:py-20 rounded-[2rem] border transition-all duration-500 shadow-2xl ${
                  darkMode 
                    ? 'bg-[#0f0f12]/80 border-white/15' 
                    : 'bg-white border-black/10'
                }`}
                id="hero-showcase"
              >
                {/* Elegant ambient backdrop blur effects */}
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] pointer-events-none" />

                <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto px-4">
                  <div className="flex justify-center items-center gap-1.5 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border mb-2 font-mono ${
                      darkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black font-semibold'
                    }`}
                  >
                    V2.4 Release • Fluidity
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Experience <br />
                    <span className="font-montserrat font-extrabold tracking-tight italic text-blue-500 dark:text-blue-400">
                      Fluidity
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
                      darkMode ? 'text-white/60' : 'text-zinc-800/80'
                    }`}
                  >
                    {brandConfig.slogan}. The premium macOS-inspired Android reskin with seamless glossy transitions and high performance. Build state-of-the-art interactive lockscreens, widgets and custom desk shells.
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex justify-center gap-4 pt-4"
                  >
                    <button
                      onClick={() => setActivePage('widgets')}
                      className={`px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transform active:scale-95 transition cursor-pointer text-center ${
                        darkMode ? 'bg-white text-black' : 'bg-zinc-950 text-white'
                      }`}
                    >
                      Get Started
                    </button>
                    <button
                      onClick={() => setActivePage('install')}
                      className={`px-8 py-3 rounded-full font-medium text-sm border backdrop-blur-md cursor-pointer text-center hover:scale-105 transform active:scale-95 transition ${
                        darkMode 
                          ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' 
                          : 'bg-black/5 text-zinc-800 border-black/15 hover:bg-black/10'
                      }`}
                    >
                      Install Guide
                    </button>
                  </motion.div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              </section>

              {/* ABOUT SECTION - BENTO GRID FEATURE HIGHLIGHTS */}
              <section id="about-bento" className="space-y-6 pt-4">
                <div className="text-center md:text-left">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5 justify-center md:justify-start">
                    <Info size={14} /> Material Architecture High Performance
                  </h3>
                  <h2 className="text-2xl font-bold font-display tracking-tight mt-1 text-zinc-900 dark:text-white">
                    Refined fluid aesthetics inside out
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Bento Card 1: 120Hz Rendering Engine */}
                  <div className={`md:col-span-8 p-8 rounded-[2rem] border flex flex-col justify-between relative overflow-hidden transition ${
                    darkMode ? 'bg-[#121215] border-white/15' : 'bg-white border-black/10'
                  }`}>
                    <div className="space-y-2 mb-8">
                      <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 inline-block">
                        <Cpu size={16} />
                      </span>
                      <h4 className="font-bold text-lg font-display">60FPS Material Gloss Engine</h4>
                      <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        We completely replaced Android's standard rendering canvas with an interactive high-gloss glass layer compiling to native graphics pipeline. This guarantees silky smooth dragging, resizing, and transition fluidity.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[10px] text-zinc-500">
                      <span className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">Vulkan APIs</span>
                      <span className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">OpenGL ES 3.2</span>
                      <span className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">Zero Jitter Layers</span>
                    </div>
                  </div>

                  {/* Bento Card 2: Thermal & Battery */}
                  <div className={`md:col-span-4 p-8 rounded-[2rem] border flex flex-col justify-between relative overflow-hidden transition ${
                    darkMode ? 'bg-[#121215] border-white/15' : 'bg-white border-black/10'
                  }`}>
                    <div className="absolute top-6 right-6 flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] animate-pulse"></div>
                    </div>
                    <div className="space-y-2 mb-8">
                      <span className="p-1.5 rounded-lg bg-green-500/10 text-green-500 inline-block">
                        <Battery size={16} />
                      </span>
                      <h4 className="font-bold text-lg font-display">Thermal Control</h4>
                      <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Smart background suspension freezes widget ticks when the device screen is off, reducing standby battery exhaustion by up to 22%.
                      </p>
                    </div>

                    <span className="text-[10px] uppercase font-mono text-green-500 dark:text-green-400 tracking-wider font-semibold">
                      ● Battery safe verified
                    </span>
                  </div>

                  {/* Bento Card 3: Deep Custom Widgets */}
                  <div className={`md:col-span-4 p-8 rounded-[2rem] border flex flex-col justify-between relative overflow-hidden transition ${
                    darkMode ? 'bg-[#121215] border-white/15' : 'bg-white border-black/10'
                  }`}>
                    <div className="space-y-2 mb-8">
                      <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 inline-block">
                        <Layers size={16} />
                      </span>
                      <h4 className="font-bold text-lg font-display">Modular Layer Sandboxing</h4>
                      <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Each widget is ran in a secure, isolated sandboxed container. Write HTML layouts without risking target OS kernel integrity or application crashes.
                      </p>
                    </div>

                    <span className="text-[10px] uppercase font-mono text-amber-500 dark:text-amber-500 tracking-wider font-semibold">
                      ● Sandboxed runtime
                    </span>
                  </div>

                  {/* Bento Card 4: Dark & Light adaptive transitions */}
                  <div className={`md:col-span-8 p-8 rounded-[2rem] border flex flex-col justify-between relative overflow-hidden transition ${
                    darkMode ? 'bg-[#121215] border-white/15' : 'bg-white border-black/10'
                  }`}>
                    <div className="absolute top-6 right-6 flex gap-1">
                      <div className="w-2 h-2 rounded-sm bg-black/10 dark:bg-white/20"></div>
                      <div className="w-2 h-2 rounded-sm bg-black/20 dark:bg-white/45"></div>
                      <div className="w-2 h-2 rounded-sm bg-black/5 dark:bg-white/10"></div>
                    </div>
                    <div className="space-y-2 mb-8">
                      <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500 inline-block">
                        <Compass size={16} />
                      </span>
                      <h4 className="font-bold text-lg font-display">Cream & Slate Theme-Fluidity</h4>
                      <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        A seamless organic liquid wave transition replaces standard harsh light switches. Moving from slight yellowish warm white (`#fdfbf7`) to precise glossy dark onyx (`#0a0a0c`) feels organic and soothing.
                      </p>
                    </div>

                    <div className="flex gap-2 font-mono text-[10px] text-zinc-500 pt-3 border-t border-black/5 dark:border-white/5">
                      <span className="text-zinc-800 dark:text-zinc-300">Warm White: Cream #fdfbf7</span>
                      <span>•</span>
                      <span className="text-zinc-800 dark:text-zinc-300">Space Onyx: Slate #0a0a0c</span>
                    </div>
                  </div>

                </div>
              </section>
            </motion.div>
          )}

          {activePage === 'widgets' && (
            <motion.div
              key="widgets"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white">Interactive Widget Studio</h2>
                <p className={`text-sm mt-1 mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Double click on widgets to manage, write content, customize layout, or edit mock screen configs. Tweak parameters and sync!
                </p>
              </div>
              <WidgetStudio
                darkMode={darkMode}
                accentColor={brandConfig.accentColor}
                onShareLayout={handleShareLayout}
                brandName={brandConfig.name}
              />
            </motion.div>
          )}

          {activePage === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <CommunityBoard
                layouts={dynamicLayouts}
                onApplyLayout={(widgets) => {
                  setActivePage('widgets');
                }}
                accentColor={brandConfig.accentColor}
                darkMode={darkMode}
              />
            </motion.div>
          )}

          {activePage === 'install' && (
            <motion.div
              key="install"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white">Flash Installation Wizard</h2>
                <p className={`text-sm mt-1 mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Inspired by the open-source custom builds framework. Input your phone specifications for direct files & mirrors.
                </p>
              </div>
              <InstallWizard darkMode={darkMode} accentColor={brandConfig.accentColor} />
            </motion.div>
          )}

          {activePage === 'dev' && (
            <motion.div
              key="dev"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* DEVELOPER CORNER REFERENCE CODE-VIEWER */}
              <section className={`p-8 rounded-[2rem] border relative overflow-hidden transition-all duration-500 shadow-xl ${
                darkMode 
                  ? 'bg-[#121215] border-white/12 shadow-zinc-950/40' 
                  : 'bg-white border-black/10 shadow-zinc-200/50'
              }`} id="dev-corner">
                <div className="absolute top-4 right-10 flex gap-1 items-center z-10">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/5 dark:border-white/5">
                  <div>
                    <h2 className="text-lg font-bold font-display tracking-tight flex items-center gap-1.5 text-zinc-900 dark:text-white">
                      <Code size={16} /> Developer Corner SDK Sandbox
                    </h2>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Learn JSON structures and programmatic APIs to compile advanced system widgets for the AMX ecosystem.
                    </p>
                  </div>

                  <div className="flex gap-1 bg-black/10 dark:bg-white/5 p-1 rounded-xl">
                    {(['widget', 'layout', 'sdk'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveCodeTab(tab)}
                        className={`px-3 py-1 text-xs font-mono rounded-lg capitalize transition-all cursor-pointer ${
                          activeCodeTab === tab
                            ? darkMode 
                              ? 'bg-zinc-800 text-white border border-white/10 font-bold' 
                              : 'bg-white text-black shadow font-bold'
                            : 'text-zinc-500 hover:text-zinc-400'
                        }`}
                      >
                        {tab === 'widget' && 'widget.json'}
                        {tab === 'layout' && 'layout.json'}
                        {tab === 'sdk' && 'VolumeWidget.tsx'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-zinc-950 p-4 border border-zinc-800">
                  <div className="flex items-center justify-between text-xs text-zinc-600 mb-3 border-b border-zinc-900 pb-2">
                    <span>NATIVE AMX COMPILED ENVIRONMENT</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(codeSnippets[activeCodeTab])}
                      className="hover:text-zinc-350 transition-colors cursor-pointer text-zinc-500"
                    >
                      Copy Snippet
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {codeSnippets[activeCodeTab]}
                  </pre>
                </div>

              </section>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* 3. PLATFORM FOOTER */}
      <footer className={`border-t transition-colors duration-500 py-12 ${
        darkMode ? 'bg-[#050507] border-white/5 text-zinc-500' : 'bg-[#F2ECE1] border-black/5 text-zinc-600'
      }`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3.5">
            <span className="font-bold text-base font-display text-zinc-900 dark:text-zinc-100">
              {brandConfig.name.endsWith('OS') ? brandConfig.name : `${brandConfig.name} OS`}
            </span>
            <p className="text-xs leading-relaxed max-w-xs text-zinc-700 dark:text-zinc-400">
              A bespoke dark/light customizable open source OS reskin layout system inspired by macOS glass. Elevate your Android screen layout with elegant, glassy widgets.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-800 dark:text-zinc-350 mb-3">
              Core Navigation
            </h5>
            <ul className="text-xs space-y-2 font-medium">
              <li>
                <button onClick={() => setActivePage('showcase')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  Hero Showcase
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('widgets')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  Widget Creator
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('community')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  Community Deck
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-800 dark:text-zinc-350 mb-3">
              Developer Ecosystem
            </h5>
            <ul className="text-xs space-y-2 font-medium">
              <li>
                <button onClick={() => setActivePage('dev')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  SDK Reference
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('install')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  Terminal Flash Tool
                </button>
              </li>
              <li>
                <a href={brandConfig.githubUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                  GitHub Repository <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-800 dark:text-zinc-350 mb-3">
              Bespoke Fluidity
            </h5>
            <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-400">
              Double click elements inside our interactive widget mock system to custom-build, style, and share native presets with the AMX community instantly.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} {brandConfig.name} Project. All rights reserved.</span>
          <span className="font-mono text-[10px]">CRAFTED WITH MAC COMPILER CORE FOR HIGH-PERFORMANCE</span>
        </div>
      </footer>

    </div>
  );
}