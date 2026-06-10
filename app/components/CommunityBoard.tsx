import React, { useState } from 'react';
import { LayoutPreset, WidgetData } from '../types';
import { PRESET_LAYOUTS } from '../data';
import { Heart, Download, User, Share2, Sparkles, Check, Bookmark, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface CommunityBoardProps {
  layouts: LayoutPreset[];
  onApplyLayout: (widgets: WidgetData[]) => void;
  accentColor: string;
  darkMode: boolean;
}

export default function CommunityBoard({ layouts, onApplyLayout, accentColor, darkMode }: CommunityBoardProps) {
  const [localLayouts, setLocalLayouts] = useState<LayoutPreset[]>(layouts);
  const [starredPresetIds, setStarredPresetIds] = useState<string[]>([]);
  const [successApplyId, setSuccessApplyId] = useState<string | null>(null);

  const handleVote = (id: string) => {
    let newStarred = [...starredPresetIds];
    if (starredPresetIds.includes(id)) {
      newStarred = newStarred.filter(pId => pId !== id);
      setStarredPresetIds(newStarred);
      setLocalLayouts(localLayouts.map(l => l.id === id ? { ...l, stars: l.stars - 1 } : l));
    } else {
      newStarred.push(id);
      setStarredPresetIds(newStarred);
      setLocalLayouts(localLayouts.map(l => l.id === id ? { ...l, stars: l.stars + 1 } : l));
    }
  };

  const handleApplyClick = (preset: LayoutPreset) => {
    onApplyLayout(preset.widgets);
    setSuccessApplyId(preset.id);
    setTimeout(() => setSuccessApplyId(null), 3000);
  };

  return (
    <div className="space-y-6" id="community-deck">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5 dark:border-white/5">
        <div>
          <h3 className="text-xl font-bold font-display tracking-tight flex items-center gap-1.5">
            <span className="p-1 rounded bg-purple-500/10 text-purple-400">
              <Share2 size={18} />
            </span>
            AMX Community Layout Space
          </h3>
          <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600 dark:text-zinc-400'}`}>
            Explore, star, and instantly flash custom reskin designs published by independent Android/macOS UI craftsmen.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-zinc-500/10 dark:bg-white/10 px-3 py-1 rounded-full text-zinc-500 dark:text-zinc-400">
            {localLayouts.length} Active Presets
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localLayouts.map((preset) => (
          <div
            key={preset.id}
            className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
              darkMode 
                ? 'glass-gloss-dark shadow-xl hover:border-zinc-700' 
                : 'glass-gloss-light shadow-md hover:border-zinc-300'
            }`}
          >
            {/* Minimal glossy banner visualizer representing widgets */}
            <div className={`h-28 relative flex items-center justify-center p-4 overflow-hidden ${preset.thumbnailColor}`}>
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-0" />
              
              <div className="relative z-10 w-full flex items-center gap-2 overflow-x-auto justify-center scrollbar-none">
                {preset.widgets.map((w, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-[9px] text-white font-semibold font-mono truncate max-w-[90px]"
                  >
                    🎨 {w.title.replace('macOS ', '').replace('Glossy ', '')}
                  </div>
                ))}
              </div>

              {/* Float author tag */}
              <div className="absolute bottom-2 left-3 z-10 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md text-[9px] text-zinc-300 font-mono">
                <User size={10} />
                <span>@{preset.author}</span>
              </div>
            </div>

            {/* Layout details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5 mb-4">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold font-display text-sm leading-tight lg:text-base">
                    {preset.name}
                  </h4>
                </div>
                <p className={`text-xs line-clamp-2 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {preset.description}
                </p>
              </div>

              {/* Quick statistics and launch buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleVote(preset.id)}
                    className={`flex items-center gap-1 text-[11px] font-mono transition-colors cursor-pointer ${
                      starredPresetIds.includes(preset.id)
                        ? 'text-pink-500 font-bold'
                        : 'text-zinc-500 hover:text-pink-400'
                    }`}
                  >
                    <Heart size={12} fill={starredPresetIds.includes(preset.id) ? 'currentColor' : 'none'} />
                    <span>{preset.stars}</span>
                  </button>

                  <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                    <Download size={11} />
                    <span>{preset.downloads}</span>
                  </span>
                </div>

                <button
                  onClick={() => handleApplyClick(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-display flex items-center gap-1.5 transition-all duration-305 hover:scale-105 active:scale-95 cursor-pointer ${
                    successApplyId === preset.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm'
                  }`}
                >
                  {successApplyId === preset.id ? (
                    <>
                      <Check size={11} /> Copied!
                    </>
                  ) : (
                    <>
                      <Play size={10} className="fill-current" /> Push to device
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
