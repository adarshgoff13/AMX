import React, { useState, useEffect } from 'react';
import { WidgetData, LayoutPreset } from '../types';
import { INITIAL_WIDGETS } from '../data';
import { Clock, CloudSun, Music, Edit3, Sliders, Play, Pause, Plus, Code, ArrowUpRight, Sparkles, LayoutGrid, Heart, Trash2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WidgetStudioProps {
  darkMode: boolean;
  accentColor: string;
  onShareLayout: (preset: Omit<LayoutPreset, 'id' | 'downloads' | 'stars'>) => void;
  brandName: string;
}

export default function WidgetStudio({ darkMode, accentColor, onShareLayout, brandName }: WidgetStudioProps) {
  const [widgets, setWidgets] = useState<WidgetData[]>(INITIAL_WIDGETS);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [islandState, setIslandState] = useState<'collapsed' | 'expanded' | 'music'>('collapsed');
  
  // Custom Widget Creator Form
  const [creatorTitle, setCreatorTitle] = useState<string>('My Custom Widget');
  const [creatorType, setCreatorType] = useState<'clock' | 'weather' | 'notes' | 'music'>('notes');
  const [creatorSize, setCreatorSize] = useState<'small' | 'medium'>('small');
  const [creatorNotes, setCreatorNotes] = useState<string>('Tap to edit custom lockscreen content...');
  const [creatorLoc, setCreatorLoc] = useState<string>('New York City');
  const [creatorTrack, setCreatorTrack] = useState<string>('Ethereal Glissando');

  const [sharedToast, setSharedToast] = useState<string | null>(null);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddWidget = () => {
    const newWidget: WidgetData = {
      id: `custom-${Date.now()}`,
      title: creatorTitle,
      type: creatorType,
      size: creatorSize,
      config: {
        notesContent: creatorNotes,
        locationText: creatorLoc,
        musicTrack: creatorTrack,
        musicArtist: 'Custom Dev',
        showSeconds: true,
      },
      author: 'You (Creator Mode)',
      stars: 1,
    };
    
    setWidgets([...widgets, newWidget]);
    
    // Show quick toast
    setSharedToast('Widget added successfully to local launcher mockup!');
    setTimeout(() => setSharedToast(null), 3000);
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const handleShareClick = () => {
    onShareLayout({
      name: `Custom ${brandName} Workspace`,
      description: `A custom user-defined layout comprising ${widgets.length} bespoke widgets with glass textures.`,
      author: 'Independent Designer',
      widgets: [...widgets],
      thumbnailColor: 'bg-gradient-to-br from-zinc-800 to-zinc-950',
    });
    setSharedToast('Stunning Layout successfully shared with the community below!');
    setTimeout(() => setSharedToast(null), 4000);
  };

  return (
    <div className="space-y-8" id="widget-customizer">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {sharedToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-green-500 text-white font-semibold font-display shadow-2xl flex items-center gap-3 border border-green-400"
          >
            <Check size={18} />
            <span>{sharedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* WIDGET CREATOR FORM */}
        <div className={`lg:col-span-4 p-8 rounded-[2rem] border relative overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between ${
          darkMode 
            ? 'bento-card-dark border-white/12 shadow-zinc-950/40' 
            : 'bento-card-light border-black/10 shadow-zinc-200/50'
        }`}>
          <div className="absolute top-4 right-10 flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1 rounded bg-orange-500/10 text-orange-400 shrink-0">
                <Sliders size={16} />
              </span>
              <h3 className="text-lg font-bold font-display tracking-tight">Widget Architect</h3>
            </div>
            
            <p className={`text-xs mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              AMX OS renders widgets in native code via JSON templates. Build, customize, and push them to the active phone frame.
            </p>

            <div className="space-y-4">
              {/* Title input */}
              <div>
                <label className="block text-[10px] font-mono mb-1.5 uppercase tracking-wider text-zinc-500">
                  Widget Metadata Name
                </label>
                <input
                  type="text"
                  value={creatorTitle}
                  onChange={(e) => setCreatorTitle(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 ${
                    darkMode 
                      ? 'bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-blue-400' 
                      : 'bg-black/5 border-black/10 text-black focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
              </div>

              {/* Type selector */}
              <div>
                <label className="block text-[10px] font-mono mb-1.5 uppercase tracking-wider text-zinc-500">
                  Core Module Type
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['notes', 'clock', 'weather', 'music'].map(type => (
                    <button
                      key={type}
                      onClick={() => setCreatorType(type as any)}
                      className={`py-1.5 text-[10px] font-mono rounded-lg capitalize border transition-all hover:scale-105 active:scale-95 duration-200 cursor-pointer ${
                        creatorType === type
                          ? darkMode 
                            ? 'bg-white text-black border-white font-bold' 
                            : 'bg-black text-white border-black font-bold'
                          : darkMode 
                            ? 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300' 
                            : 'bg-black/5 border-black/5 hover:bg-black/10 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div>
                <label className="block text-[10px] font-mono mb-1.5 uppercase tracking-wider text-zinc-500">
                  Grid Dimension factor
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'small', label: 'Small (2x2 Grid)' },
                    { id: 'medium', label: 'Medium (4x2 Grid)' }
                  ].map(sz => (
                    <button
                      key={sz.id}
                      onClick={() => setCreatorSize(sz.id as any)}
                      className={`py-2 text-[11px] rounded-lg border transition-all cursor-pointer ${
                        creatorSize === sz.id
                          ? darkMode 
                            ? 'bg-zinc-800 border-white/20 ring-1 ring-blue-400' 
                            : 'bg-white border-black/10 shadow ring-1 ring-blue-500'
                          : darkMode 
                            ? 'bg-white/5 border-white/5 hover:bg-white/8' 
                            : 'bg-black/5 border-black/5 hover:bg-black/8'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Config fields based on type */}
              <div>
                <label className="block text-[10px] font-mono mb-1.5 uppercase tracking-wider text-zinc-500">
                  Custom Properties Configuration
                </label>
                
                {creatorType === 'notes' && (
                  <textarea
                    rows={2}
                    value={creatorNotes}
                    onChange={(e) => setCreatorNotes(e.target.value)}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 ${
                      darkMode 
                        ? 'bg-white/5 border-white/10 text-white focus:border-blue-400' 
                        : 'bg-black/5 border-black/10 text-black focus:border-blue-500'
                    }`}
                  />
                )}

                {creatorType === 'clock' && (
                  <div className={`p-2.5 rounded-lg border text-xs font-mono ${darkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                    - Show Milliseconds: False<br/>
                    - Core font: Space Grotesk Bold
                  </div>
                )}

                {creatorType === 'weather' && (
                  <input
                    type="text"
                    value={creatorLoc}
                    onChange={(e) => setCreatorLoc(e.target.value)}
                    placeholder="E.g., Tokyo, Japan"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                      darkMode 
                        ? 'bg-white/5 border-white/10 text-white focus:border-blue-400' 
                        : 'bg-black/5 border-black/10 text-black focus:border-blue-500'
                    }`}
                  />
                )}

                {creatorType === 'music' && (
                  <input
                    type="text"
                    value={creatorTrack}
                    onChange={(e) => setCreatorTrack(e.target.value)}
                    placeholder="Audio Track Name"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                      darkMode 
                        ? 'bg-white/5 border-white/10 text-white focus:border-blue-400' 
                        : 'bg-black/5 border-black/10 text-black focus:border-blue-500'
                    }`}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-2 mt-6">
            <button
              onClick={handleAddWidget}
              className="w-full py-2.5 rounded-xl font-bold font-display text-white text-xs inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow hover:shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              <Plus size={14} /> Inject to Active Phone Grid
            </button>
            <button
              onClick={handleShareClick}
              disabled={widgets.length === 0}
              className={`w-full py-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${
                widgets.length === 0 
                  ? 'opacity-40 cursor-not-allowed'
                  : darkMode 
                    ? 'border-white/10 hover:bg-white/10 text-white bg-white/5' 
                    : 'border-black/10 hover:bg-black/10 text-black bg-black/5'
              }`}
            >
              <LayoutGrid size={14} /> Publish Design Template
            </button>
          </div>
        </div>

        {/* SIMULATED AMX PHONE GRID AREA */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          <div className="text-center mb-4">
            <h4 className="text-sm font-semibold font-display tracking-wide uppercase text-zinc-500 flex items-center gap-1.5 justify-center">
              Active AMX Frame Simulator
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Test dynamic widget interactions: play audio, edit notes, click the Dynamic Island!
            </p>
          </div>

          {/* Realistic glass shell phone wrap */}
          <div className={`w-full max-w-[370px] aspect-[9/19] rounded-[48px] p-3.5 border-4 relative overflow-hidden transition-all duration-700 shadow-2xl flex flex-col justify-between ${
            darkMode 
              ? 'bg-neutral-950 border-neutral-800 shadow-black/80' 
              : 'bg-[#FAF8F5] border-zinc-200 shadow-zinc-400/40'
          }`}>
            
            {/* Dynamic Island / Camera cutout slot with interaction */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500">
              <motion.div
                animate={{
                  width: islandState === 'collapsed' ? 100 : islandState === 'expanded' ? 240 : 280,
                  height: islandState === 'collapsed' ? 24 : islandState === 'expanded' ? 44 : 56,
                  borderRadius: 24,
                }}
                onClick={() => {
                  if (islandState === 'collapsed') setIslandState('expanded');
                  else if (islandState === 'expanded') setIslandState('music');
                  else setIslandState('collapsed');
                }}
                className="bg-black text-white flex items-center justify-between px-3 overflow-hidden cursor-pointer shadow-[0_12px_24px_rgba(0,0,0,0.5)] border border-white/5"
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              >
                {islandState === 'collapsed' && (
                  <div className="w-full flex items-center justify-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] font-mono tracking-widest text-[#9cb1c9] uppercase">AMX LINK</span>
                  </div>
                )}

                {islandState === 'expanded' && (
                  <div className="w-full flex items-center justify-between font-mono py-1">
                    <span className="text-[10px] text-green-400 uppercase tracking-widest">System OK</span>
                    <span className="text-[9px] text-zinc-400">AMX Reskin Engine</span>
                    <button className="text-[9px] bg-white/20 px-2 py-0.5 rounded text-white hover:bg-white/30 transition-colors">
                      Logs
                    </button>
                  </div>
                )}

                {islandState === 'music' && (
                  <div className="w-full flex items-center gap-3 py-1.5">
                    <div className="p-1 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                      <Music size={12} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold truncate">Stargazing</div>
                      <div className="text-[8px] text-zinc-400 truncate">Satie Room Ambient</div>
                    </div>
                    <div className="flex items-center gap-2 py-0.5 px-1.5 bg-white/10 rounded-full">
                      <Play size={10} className="fill-current text-white cursor-pointer" />
                      <div className="flex gap-0.5">
                        <div className="w-[1.5px] h-2 bg-green-400 animate-pulse" />
                        <div className="w-[1.5px] h-3.5 bg-green-400 animate-pulse delay-75" />
                        <div className="w-[1.5px] h-2.5 bg-green-400 animate-pulse delay-150" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Simulated Desktop Wallpaper Background */}
            <div className="absolute inset-0 z-0">
              <div className={`w-full h-full opacity-60 aurora-bg ${
                darkMode
                  ? 'bg-gradient-to-tr from-[#020202] via-[#0b1016] to-[#040404]'
                  : 'bg-gradient-to-tr from-[#FAF8F5] via-[#EAE5D9] to-[#F1ECE1]'
              }`} />
            </div>

            {/* Main scrollable phone screen canvas */}
            <div className="relative z-10 w-full h-full pt-12 pb-16 flex flex-col justify-start overflow-y-auto overflow-x-hidden space-y-3.5 px-1 scrollbar-none">
              
              <AnimatePresence mode="popLayout">
                {widgets.length === 0 ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-6 text-center text-xs text-zinc-400 font-mono rounded-2xl flex flex-col items-center justify-center h-full ${
                      darkMode ? 'bg-white/5 border border-white/5' : 'bg-black/5 border border-black/5'
                    }`}
                  >
                    <Sliders className="mb-2 animate-bounce opacity-40" />
                    No Active Widgets.<br/>Launch components from the Architect panel!
                  </motion.div>
                ) : (
                  widgets.map((widget) => {
                    const isSmall = widget.size === 'small';
                    return (
                      <motion.div
                        key={widget.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        className={`rounded-2xl overflow-hidden transition-all p-3.5 group relative ${
                          darkMode ? 'glass-gloss-dark text-white' : 'glass-gloss-light text-black'
                        } ${isSmall ? 'w-[48%] inline-block mr-[4%] last:mr-0' : 'w-full block'}`}
                      >
                        {/* Control actions */}
                        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-20">
                          <button
                            onClick={() => handleDeleteWidget(widget.id)}
                            className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                            title="Remove widget"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>

                        {/* WIDGET CONTENT RENDERING BASED ON TYPE */}
                        {widget.type === 'clock' && (
                          <div className="flex flex-col items-start gap-1">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-[#a19e99]">
                              {widget.config?.titleText || 'CLOCK'}
                            </span>
                            <div className="text-xl font-bold font-display font-mono">
                              {currentTime.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: widget.config?.showSeconds ? '2-digit' : undefined,
                              })}
                            </div>
                            <span className="text-[9px] text-[#a5a19c]">
                              {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        )}

                        {widget.type === 'weather' && (
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-[9px] uppercase font-mono tracking-widest text-[#a19e99] truncate max-w-[70%]">
                                {widget.config?.locationText || 'LOCATION'}
                              </span>
                              <CloudSun size={13} className="text-amber-500 animate-pulse" />
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-bold">72°</span>
                              <span className="text-[8px] text-zinc-500 uppercase">Partly Sunny</span>
                            </div>
                            <div className="text-[7px] text-zinc-400 font-mono flex gap-1.5">
                              <span>H: 78°</span>
                              <span>L: 58°</span>
                            </div>
                          </div>
                        )}

                        {widget.type === 'notes' && (
                          <div className="flex flex-col gap-1.5 h-full">
                            <div className="flex items-center justify-between w-full pb-1 border-b border-white/10 dark:border-zinc-800">
                              <span className="text-[9px] uppercase font-mono tracking-wider font-semibold text-orange-400/90 flex items-center gap-1">
                                <Edit3 size={9} /> Notepad
                              </span>
                            </div>
                            <p className="text-[10px] leading-snug italic line-clamp-3">
                              "{widget.config?.notesContent || 'Custom notes'}"
                            </p>
                          </div>
                        )}

                        {widget.type === 'music' && (
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[8px] font-mono tracking-widest uppercase text-purple-400">AMX Media Layer</span>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
                                💿
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[11px] font-bold truncate">{widget.config?.musicTrack || 'Stargazing'}</div>
                                <div className="text-[8px] text-zinc-400 truncate">{widget.config?.musicArtist || 'VinylLover'}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-black/5 dark:border-white/5">
                              <button 
                                onClick={() => setIsPlaying(!isPlaying)} 
                                className="p-1 rounded bg-[#0a0a0c]/10 dark:bg-white/10 hover:bg-[#0a0a0c]/20 transition-all cursor-pointer text-[9px]"
                              >
                                {isPlaying ? <Pause size={10} className="text-blue-500" /> : <Play size={10} className="text-green-500 fill-current" />}
                              </button>
                              
                              {/* Glowing equalizer simulator */}
                              {isPlaying && (
                                <div className="flex items-end gap-0.5 justify-end h-3">
                                  <div className="w-[1.5px] h-1.5 bg-blue-500 animate-pulse" />
                                  <div className="w-[1.5px] h-3 bg-blue-500 animate-pulse delay-75" />
                                  <div className="w-[1.5px] h-2 bg-blue-500 animate-pulse delay-150" />
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {widget.type === 'system' && (
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] uppercase font-mono tracking-widest text-[#a19e99]">
                              {widget.config?.titleText || 'CONTROLLER'}
                            </span>
                            <div className="text-xs font-mono">
                              <div className="flex justify-between py-0.5">
                                <span className="text-zinc-500">CPU</span>
                                <span className="font-semibold text-green-400">22%</span>
                              </div>
                              <div className="flex justify-between py-0.5">
                                <span className="text-zinc-500">RAM</span>
                                <span className="font-semibold text-blue-400">4.1 GB</span>
                              </div>
                              <div className="flex justify-between py-0.5">
                                <span className="text-zinc-500">TEMP</span>
                                <span className="font-semibold text-orange-400">38°C</span>
                              </div>
                            </div>
                          </div>
                        )}

                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>

            </div>

            {/* Bottom macOS Inspired launcher Dock */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 w-[90%] pointer-events-auto">
              <div className="rounded-2xl px-3 py-2 flex items-center justify-between backdrop-blur-xl border border-white/15 bg-white/10 dark:bg-black/20 shadow-lg">
                <button 
                  onClick={() => setIslandState('collapsed')}
                  className="dock-bounce p-1.5 rounded-lg bg-neutral-900 text-white cursor-pointer"
                  title="Phone App"
                >
                  📞
                </button>
                <button 
                  onClick={() => setIslandState('expanded')}
                  className="dock-bounce p-1.5 rounded-lg bg-blue-500 text-white cursor-pointer"
                  title="Messages Application"
                >
                  💬
                </button>
                <button 
                  onClick={() => setIslandState('music')}
                  className="dock-bounce p-1.5 rounded-lg bg-emerald-500 text-white cursor-pointer"
                  title="AMX Store"
                >
                  🛍️
                </button>
                <button 
                  onClick={() => {
                    setWidgets(INITIAL_WIDGETS);
                    setSharedToast('Launcher layout restored to pre-loaded defaults!');
                    setTimeout(() => setSharedToast(null), 3000);
                  }}
                  className="dock-bounce p-1.5 rounded-lg bg-amber-500 text-white cursor-pointer font-mono text-[9px] font-bold"
                  title="Reset Layout"
                >
                  RESET
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
