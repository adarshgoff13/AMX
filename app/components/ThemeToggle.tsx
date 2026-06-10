import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ darkMode, onToggle }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      className={`relative flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-all duration-300 border ${
        darkMode 
          ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10 hover:text-amber-300' 
          : 'bg-black/5 border-black/10 text-indigo-600 hover:bg-black/10 hover:text-indigo-700'
      }`}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={darkMode ? 'dark-mode' : 'light-mode'}
          initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.6, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center animate-none"
        >
          {darkMode ? (
            <Sun size={16} className="shrink-0" />
          ) : (
            <Moon size={16} fill="currentColor" className="shrink-0" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
