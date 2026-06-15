/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { developerInfo } from '../data/portfolioData';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  scrollIndex: number;
  scrollToPage: (page: number) => void;
}

export default function Header({
  darkMode,
  setDarkMode,
  chatOpen,
  setChatOpen,
  scrollIndex,
  scrollToPage,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { name: 'Landing', page: 0 },
    { name: 'Tech Stack', page: 1 },
    { name: 'Experience', page: 2 },
    { name: 'Projects', page: 3 },
    { name: 'About Me', page: 4 },
    { name: 'Contact Me', page: 5 },
  ];

  // Active page integer
  const activePage = Math.round(scrollIndex);

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b ${
        darkMode
          ? 'bg-neutral-950/70 border-neutral-800 text-neutral-100'
          : 'bg-white/70 border-neutral-200 text-neutral-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          id="branding-logo-group"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToPage(0)}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm tracking-widest ${
            darkMode ? 'bg-amber-400 text-neutral-900' : 'bg-neutral-900 text-neutral-50'
          }`}>
            S
          </div>
          <span className="font-display font-semibold text-base tracking-wide hidden sm:inline-block">
            S.S. Mishra
          </span>
        </div>

        {/* Desktop Anchor Navigation removed to confine page section links strictly to hidden menu slide-out panel */}

        {/* Header Interactions (Theme, AI Assistant, Mobile Burger Menu) */}
        <div id="header-interactive-menu-container" className="flex items-center gap-3">
          {/* Theme Switcher Toggle */}
          <button
            id="theme-toggler-btn"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Sunset Night Mode'}
            className={`p-2 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 ${
              darkMode
                ? 'bg-neutral-900 border-neutral-800 text-amber-400 hover:bg-neutral-800'
                : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* AI Chat button (LLM Sparks) */}
          <button
            id="ai-spark-chat-launcher"
            onClick={() => setChatOpen(!chatOpen)}
            title="Sudhanshu's Chat Widget"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 relative group overflow-hidden ${
              chatOpen
                ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md scale-105'
                : darkMode
                ? 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-700'
                : 'bg-neutral-100 border-neutral-200 text-neutral-800 hover:bg-neutral-200 hover:border-neutral-300'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                chatOpen ? 'bg-neutral-900' : 'bg-red-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                chatOpen ? 'bg-neutral-950' : 'bg-red-500'
              }`}></span>
            </span>
            <Sparkles size={16} className={chatOpen ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform duration-300'} />
            <span className="font-display text-xs font-semibold tracking-wide">Chat Widget</span>
          </button>

          {/* Menu Button (Desktop & Mobile drawer trigger) */}
          <button
            id="mobile-menu-burger-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`p-2 rounded-full border transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800'
                : 'bg-neutral-100 border-neutral-200 text-neutral-800 hover:bg-neutral-200'
            }`}
          >
            {dropdownOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* dropdown Slide down Menu */}
      {dropdownOpen && (
        <div
          id="mobile-navigation-dropdown-overlay"
          className={`absolute top-16 left-0 w-full border-b shadow-lg transition-all duration-300 z-40 flex flex-col md:grid md:grid-cols-6 p-4 gap-2 ${
            darkMode
              ? 'bg-neutral-950/95 border-neutral-800 text-neutral-100'
              : 'bg-white/95 border-neutral-200 text-neutral-800'
          }`}
        >
          {menuItems.map((item) => (
            <button
              key={item.page}
              id={`dropdown-nav-btn-${item.page}`}
              onClick={() => {
                scrollToPage(item.page);
                setDropdownOpen(false);
              }}
              className={`p-3 rounded-xl transition-all duration-200 text-center font-display font-medium text-sm flex items-center justify-between px-6 ${
                activePage === item.page
                  ? darkMode
                    ? 'bg-amber-400 text-neutral-950 font-semibold'
                    : 'bg-neutral-950 text-neutral-50 font-semibold'
                  : darkMode
                  ? 'hover:bg-neutral-900 text-neutral-400 hover:text-white'
                  : 'hover:bg-neutral-100 text-neutral-600 hover:text-black'
              }`}
            >
              <span>{item.name}</span>
              <ArrowUpRight size={14} className="opacity-50" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
