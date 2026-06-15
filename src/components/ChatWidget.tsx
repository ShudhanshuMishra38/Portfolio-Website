/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles, CornerDownLeft } from 'lucide-react';
import { ChatMessage } from '../types';
import { botAnswers } from '../data/portfolioData';

interface ChatWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  darkMode: boolean;
}

export default function ChatWidget({ isOpen, setIsOpen, darkMode }: ChatWidgetProps) {
  if (!isOpen) return null;

  return (
    <div
      id="floating-ai-chat-console"
      className={`fixed bottom-6 right-6 w-[340px] xs:w-[380px] h-[380px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.30)] flex flex-col z-50 overflow-hidden border transition-all duration-300 animate-in fade-in zoom-in-95 duration-200 ${
        darkMode
          ? 'bg-neutral-900 border-neutral-800 text-neutral-100 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)]'
          : 'bg-white border-neutral-200 text-neutral-800'
      }`}
    >
      {/* Console Header */}
      <div
        id="chat-header-banner"
        className={`px-4 h-14 flex items-center justify-between border-b ${
          darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50/50 border-neutral-200'
        }`}
      >
        <div className="flex items-center gap-2.5 font-sans">
          <div className="relative">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${
              darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-250'
            }`}>
              <Bot size={18} className="text-stone-400 dark:text-neutral-500" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse border-2 border-white dark:border-neutral-900" />
          </div>

          <div id="ai-agent-title-block">
            <div className="flex items-center gap-1">
              <span className="font-display text-xs font-bold tracking-wide">
                Chat Widget
              </span>
              <Sparkles size={11} className="text-red-500" />
            </div>
            <span className="text-[10px] text-red-500 font-mono tracking-wider block font-bold">
              Coming soon...
            </span>
          </div>
        </div>

        <button
          id="close-chat-widget-btn"
          onClick={() => setIsOpen(false)}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            darkMode ? 'hover:bg-neutral-950 text-neutral-405' : 'hover:bg-stone-200 text-stone-600'
          }`}
        >
          <X size={15} />
        </button>
      </div>

      {/* Modern, elegant placeholder workspace */}
      <div
        id="chat-messages-container"
        className={`flex-1 p-6 flex flex-col items-center justify-center text-center gap-4 select-none ${
          darkMode ? 'bg-neutral-950/45' : 'bg-stone-50/50'
        }`}
      >
        <div className={`p-4 rounded-full border ${
          darkMode ? 'bg-neutral-900/60 border-neutral-800/80 text-red-500' : 'bg-white border-neutral-100 text-red-500'
        } shadow-sm animate-pulse`}>
          <Bot size={32} />
        </div>

        <div className="space-y-1.5 max-w-[250px] font-sans">
          <h4 className="font-display text-sm font-bold tracking-wide">
            Interactive Chat Widget
          </h4>
          <p className={`text-[12px] leading-relaxed ${
            darkMode ? 'text-neutral-400' : 'text-stone-500'
          }`}>
            We are preparing a conversational companion interface. Please look forward to advanced AI assistance in the next major deployment.
          </p>
        </div>

        <div className="mt-2">
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full font-mono text-[9px] font-bold tracking-wider uppercase border border-red-500/25 bg-red-500/10 text-red-500`}>
            ● Status: Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}
