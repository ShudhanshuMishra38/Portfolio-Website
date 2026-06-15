/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, MonitorPlay, Zap, HardDrive } from 'lucide-react';
import { skillsList } from '../data/portfolioData';
import { Skill } from '../types';

interface TabletProps {
  darkMode: boolean;
  transformStyle: React.CSSProperties;
  isActive: boolean; // Interactive only in landing and contact pages (or active viewports)
  isMobile?: boolean;
  isTechStack?: boolean;
}

export default function Tablet({ darkMode, transformStyle, isActive, isMobile = false, isTechStack = false }: TabletProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [clickedSkill, setClickedSkill] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false); // Default to off for browser compliance, user-enabled is great UX
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play a crisp, high-fidelity synthesizer click fallback using Web Audio API so it plays flawlessly
  // EVEN if local audio assets are missing initially, plus comments/placeholders for physical file routes
  const playTactileClick = () => {
    if (!soundEnabled) return;

    try {
      /* 
       * CUSTOM AUDIO FILE OVERRIDE INSTRUCTION:
       * ----------------------------------------------------
       * If you want to use your own physical audio file (e.g., 'audio/click.mp3'),
       * uncomment the block below and replace the URL:
       * 
       * const customAudio = new Audio('audio/click.mp3');
       * customAudio.volume = 0.25;
       * customAudio.play().catch(e => console.log("Sound blocked:", e));
       * return;
       */

      // Fallback: Elegant Web Audio API synth beep/click (crystal clear, instant, 100% reliable)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Extremely quick, high-end click frequency
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (err) {
      console.warn("AudioContext failed or blocked by autoplay constraints:", err);
    }
  };

  const handleSkillHover = (skillName: string) => {
    if (!isActive) return;
    setHoveredSkill(skillName);
    playTactileClick();
  };

  const handleSkillClick = (skillName: string) => {
    if (!isActive) return;
    setClickedSkill(skillName);
    playTactileClick();
    setTimeout(() => setClickedSkill(null), 150);
  };

  // Group skills by category to render structured widgets inside the Tablet OS dashboard!
  const frontendSkills = skillsList.filter(s => s.category === 'frontend' || s.category === 'languages');
  const backendDataSkills = skillsList.filter(s => s.category === 'backend' || s.category === 'data' || s.category === 'tools');

  return (
    <div
      id="tablet-container-3d"
      className="transition-all duration-500 ease-out select-none"
      style={transformStyle}
    >
      {/* Outer physical tablet border frame (Skeuomorphic bezel design) */}
      <div
        id="physical-tablet-frame"
        className={`rounded-[36px] p-4 relative transition-colors duration-300 ${
          darkMode
            ? 'bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 border-[3px] border-neutral-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_3px_6px_rgba(255,255,255,0.1)]'
            : 'bg-gradient-to-br from-neutral-300 via-stone-200 to-neutral-400 border-[3px] border-neutral-100 shadow-[0_25px_60px_-15px_rgba(27,27,27,0.25),inset_0_3px_5px_rgba(255,255,255,0.7)]'
        }`}
        style={{
          width: isTechStack ? 'auto' : (isMobile ? '88vw' : 'min(400px, 45vw)'),
          height: isTechStack ? 'min(400px, 45vh)' : (isMobile ? '38vh' : 'min(550px, 75vh)'),
          aspectRatio: isTechStack ? '400 / 550' : undefined,
          maxWidth: '100%',
          maxHeight: isTechStack ? '50vh' : '100%',
        }}
      >
        {/* Sleek metallic chamfer / highlight border glow */}
        <div className="absolute inset-[1px] rounded-[34px] border border-white/5 pointer-events-none" />

        {/* Ambient Glossy Refraction Glare Sheet */}
        <div 
          id="tablet-glare-effect"
          className="absolute inset-0 rounded-[34px] bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60 pointer-events-none z-20" 
        />

        {/* Top Camera Sensor Notch */}
        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-1.5 z-30">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-950 border border-neutral-800" />
          <div className="w-1 h-1 rounded-full bg-blue-900 animate-pulse" />
        </div>

        {/* Side Volume Buttons visual element (Left rail) */}
        <div className="absolute top-16 -left-1 w-[3px] h-10 rounded-r bg-neutral-700 pointer-events-none" />
        <div className="absolute top-28 -left-1 w-[3px] h-14 rounded-r bg-neutral-700 pointer-events-none" />

        {/* Screen/Bezel interface wrapper */}
        <div
          id="tablet-screen-bezel"
          className={`w-full h-full rounded-[24px] overflow-hidden flex flex-col relative transition-colors duration-300 border ${
            darkMode
              ? 'bg-neutral-950 border-neutral-900'
              : 'bg-stone-50 border-stone-200/50'
          }`}
        >
          {/* Simulated operating system Status Bar */}
          <div
            id="tablet-status-bar"
            className={`h-7 px-4 flex items-center justify-between border-b text-[9px] font-mono tracking-wider ${
              darkMode
                ? 'bg-neutral-900/90 border-neutral-800 text-neutral-400'
                : 'bg-stone-100/95 border-stone-200 text-stone-600'
            }`}
          >
            <div className="flex items-center gap-1">
              <Zap id="tablet-battery" size={10} className="text-amber-500 fill-amber-500/20" />
              <span>SUDHANSHU-OS 1.1</span>
            </div>

            {/* Display hovered skill stats live */}
            <div className="max-w-[140px] truncate animate-pulse font-medium text-emerald-500">
              {hoveredSkill ? `> HOVER: ${hoveredSkill.toUpperCase()}` : `SYS: ACTIVE`}
            </div>

            <div className="flex items-center gap-2">
              {/* Speaker sound toggle widget */}
              <button
                id="tablet-sound-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setSoundEnabled(!soundEnabled);
                }}
                title={soundEnabled ? 'Mute Interface Sounds' : 'Unmute Tactile Clicks'}
                className={`flex items-center gap-1 p-0.5 px-1.5 rounded-md border transition-all ${
                  soundEnabled
                    ? darkMode
                      ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    : darkMode
                    ? 'bg-neutral-950 border-neutral-800 text-neutral-500'
                    : 'bg-stone-200/50 border-stone-300 text-stone-400'
                }`}
              >
                {soundEnabled ? <Volume2 size={10} /> : <VolumeX size={10} />}
                <span className="text-[8px] font-semibold">{soundEnabled ? 'ON' : 'MUTED'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Screen Content Workspace */}
          <div
            id="tablet-screen-workspace"
            className={`flex-1 p-4 flex flex-col justify-between overflow-y-auto overflow-x-hidden ${
              darkMode
                ? 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100'
                : 'bg-gradient-to-b from-stone-50 via-stone-100/40 to-stone-100 text-stone-900'
            }`}
          >
            {/* Skeuomorphic app header inside the OS */}
            <div className="mt-1 flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-amber-400 text-neutral-950 flex items-center justify-center">
                  <HardDrive size={12} className="stroke-[2.5]" />
                </span>
                <h4 className="font-display font-bold text-xs tracking-wider uppercase">
                  Skills Dashboard
                </h4>
              </div>
              <p className={`text-[9px] mt-1 text-center font-mono max-w-[240px] select-none ${
                darkMode ? 'text-neutral-500' : 'text-stone-500'
              }`}>
                {isActive 
                  ? 'TACTILE MATRIX: HOVER & CLICK BUTTONS FOR HAPTIC BEATS'
                  : 'SCROLL TO CORE PHASES TO READ OR SHIFT DEPTH'}
              </p>
            </div>

            {/* Clay-Design Skill Blocks Board */}
            <div className="my-auto py-2 flex flex-col gap-3">
              {/* Row category: Languages / Frontend */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[8px] font-mono tracking-widest uppercase ml-1 ${
                  darkMode ? 'text-neutral-500' : 'text-stone-400'
                }`}>
                  Core Lang & Frontend
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {frontendSkills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    const isClicked = clickedSkill === skill.name;

                    // Light/Dark Skeuomorphic Box-Shadow formulations
                    const shadowStyle = isClicked
                      ? darkMode
                        ? 'shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),inset_-2px_-2px_4px_rgba(255,255,255,0.05),0_0_8px_rgba(245,158,11,0.2)]'
                        : 'shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]'
                      : isHovered
                      ? darkMode
                        ? 'shadow-[5px_5px_12px_rgba(0,0,0,0.6),-3px_-3px_8px_rgba(255,255,255,0.08)] border-neutral-700 bg-neutral-800'
                        : 'shadow-[5px_5px_12px_rgba(100,100,100,0.15),-4px_-4px_8px_rgba(255,255,255,0.9)] border-amber-400/50 bg-amber-50/20'
                      : darkMode
                      ? 'shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_4px_rgba(255,255,255,0.03)] border-neutral-800'
                      : 'shadow-[3px_3px_7px_rgba(40,40,40,0.08),-3px_-3px_6px_rgba(255,255,255,0.8)] border-slate-200/50';

                    return (
                      <button
                        key={skill.name}
                        id={`skill-${skill.name.toLowerCase()}`}
                        onMouseEnter={() => handleSkillHover(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() => handleSkillClick(skill.name)}
                        style={{ perspective: '300px' }}
                        className={`py-2 px-1 rounded-xl text-center select-none cursor-pointer transition-all duration-200 border flex flex-col items-center justify-center gap-1 overflow-hidden ${shadowStyle} ${
                          isClicked ? 'translate-y-[2px]' : isHovered ? 'translate-y-[-1px] scale-[1.03]' : ''
                        }`}
                        disabled={!isActive}
                      >
                        <span 
                          className="font-mono text-[9px] font-extrabold"
                          style={{ color: isHovered ? skill.accentColor : '' }}
                        >
                          {skill.name}
                        </span>
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{
                            backgroundColor: isHovered ? skill.accentColor : darkMode ? '#404040' : '#d6d3d1',
                            boxShadow: isHovered ? `0 0 6px ${skill.accentColor}` : 'none'
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row Category: Tooling / Databases & Data Science */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[8px] font-mono tracking-widest uppercase ml-1 ${
                  darkMode ? 'text-neutral-500' : 'text-stone-400'
                }`}>
                  Eng, Databases & tooling
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {backendDataSkills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    const isClicked = clickedSkill === skill.name;

                    // Skeuomorphic design logic
                    const shadowStyle = isClicked
                      ? darkMode
                        ? 'shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),inset_-2px_-2px_4px_rgba(255,255,255,0.05),0_0_8px_rgba(245,158,11,0.2)]'
                        : 'shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]'
                      : isHovered
                      ? darkMode
                        ? 'shadow-[5px_5px_12px_rgba(0,0,0,0.6),-3px_-3px_8px_rgba(255,255,255,0.08)] border-neutral-700 bg-neutral-800'
                        : 'shadow-[5px_5px_12px_rgba(100,100,100,0.15),-4px_-4px_8px_rgba(255,255,255,0.9)] border-amber-400/50 bg-amber-50/20'
                      : darkMode
                      ? 'shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_4px_rgba(255,255,255,0.03)] border-neutral-800'
                      : 'shadow-[3px_3px_7px_rgba(40,40,40,0.08),-3px_-3px_6px_rgba(255,255,255,0.8)] border-slate-200/50';

                    return (
                      <button
                        key={skill.name}
                        id={`skill-${skill.name.toLowerCase()}`}
                        onMouseEnter={() => handleSkillHover(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() => handleSkillClick(skill.name)}
                        className={`py-2 px-1 rounded-xl text-center select-none cursor-pointer transition-all duration-200 border flex flex-col items-center justify-center gap-1 overflow-hidden ${shadowStyle} ${
                          isClicked ? 'translate-y-[2px]' : isHovered ? 'translate-y-[-1px] scale-[1.03]' : ''
                        }`}
                        disabled={!isActive}
                      >
                        <span 
                          className="font-mono text-[9px] font-extrabold truncate max-w-full"
                          style={{ color: isHovered ? skill.accentColor : '' }}
                        >
                          {skill.name}
                        </span>
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{
                            backgroundColor: isHovered ? skill.accentColor : darkMode ? '#404040' : '#d6d3d1',
                            boxShadow: isHovered ? `0 0 6px ${skill.accentColor}` : 'none'
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom mini-dashboard layout widget */}
            <div
              id="tablet-os-specs"
              className={`border rounded-xl p-2.5 text-[9px] font-mono leading-relaxed transition-colors duration-300 ${
                darkMode
                  ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
                  : 'bg-stone-100 border-stone-200/50 text-stone-600'
              }`}
            >
              <div className="flex justify-between items-center mb-1 pb-1 border-b border-neutral-800/20">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <MonitorPlay size={9} /> SYSTEM METRICS
                </span>
                <span className="text-emerald-500">ONLINE</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[8px]">
                <div>USER: S.S.Mishra</div>
                <div className="text-right">DB: PostgreSQL</div>
                <div>STATE: INTERACTIVE</div>
                <div className="text-right">OS: Responsive v1</div>
              </div>
            </div>
          </div>

          {/* Physical Bottom Home Action Indicator on the Bezel rim */}
          <div
            id="tablet-bezel-home"
            className={`h-9 flex items-center justify-center border-t transition-colors duration-300 ${
              darkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-stone-100 border-stone-200'
            }`}
          >
            <div className={`w-14 h-1.5 rounded-full transition-colors duration-300 ${
              darkMode ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-stone-300 hover:bg-stone-400'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
}
