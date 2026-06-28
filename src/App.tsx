/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Github, 
  Linkedin, 
  FileText, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  User, 
  Mail, 
  BookOpen, 
  MessageSquare,
  HelpCircle,
  Briefcase,
  Twitter
} from 'lucide-react';

import Header from './components/Header';
import Tablet from './components/Tablet';
import ChatWidget from './components/ChatWidget';
import TypingEffect from './components/TypingEffect';

import { 
  developerInfo, 
  skillsList, 
  experienceList, 
  projectsList 
} from './data/portfolioData';

import { TabletState } from './types';

// Global 3D Tablet coordinates configuration for Desktop (screen width >= 1024px)
const desktopTabletStates: TabletState[] = [
  // Page 0: Landing (Occupies the right-hand column balanced at x: 20vw, scale: 0.95)
  { tx: 18, ty: 0, scale: 0.92, rx: 16, ry: -20, rz: 3, opacity: 1.0, blur: 0, zIndex: 10 },
  // Page 1: Tech Stack (Enlarges, glides to exact viewport center - shifted 50px upward to clear bottom instructions)
  { tx: 0, ty: 45, scale: 1.05, rx: 6, ry: -6, rz: 0, opacity: 1.0, blur: 0, zIndex: 10 },
  // Page 2: Experience (Slides underneath cards, highly tilted, blurred background element)
  { tx: -20, ty: 80, scale: 1.1, rx: 45, ry: -12, rz: 6, opacity: 0.18, blur: 4, zIndex: 0 },
  // Page 3: Projects (Slides to right background, blurred, out of the text cards' way)
  { tx: 22, ty: -50, scale: 0.95, rx: -35, ry: 18, rz: -6, opacity: 0.14, blur: 5, zIndex: 0 },
  // Page 4: About Me (Slides to bottom center background, blurred, rotated flat)
  { tx: 0, ty: 120, scale: 1.15, rx: 55, ry: 0, rz: -12, opacity: 0.16, blur: 4, zIndex: 0 },
  // Page 5: Contact Me (Seamlessly resurfaces, scales back to its original placement balanced at x: 20vw)
  { tx: 18, ty: 0, scale: 0.92, rx: 16, ry: -20, rz: 3, opacity: 1.0, blur: 0, zIndex: 10 }
];

// Responsive 3D Tablet coordinates configuration for Mobile/Tablet devices (screen width < 1024px)
// It centers the tablet on landing/contact, but positions it lower down to prevent blocking headings,
// and scales down the device to fit safely within viewport boundaries.
const mobileTabletStates: TabletState[] = [
  // Page 0: Landing (Centered, lower down, scaled 0.72)
  { tx: 0, ty: 190, scale: 0.72, rx: 12, ry: -14, rz: 2, opacity: 0.95, blur: 0, zIndex: 10 },
  // Page 1: Tech Stack (Centered, prominent focus, scaled 0.85 - shifted 50px upward to clear bottom instructions)
  { tx: 0, ty: 0, scale: 0.85, rx: 6, ry: -6, rz: 0, opacity: 1.0, blur: 0, zIndex: 10 },
  // Page 2: Experience (Underlay background, minimal opacity)
  { tx: 0, ty: 0, scale: 0.7, rx: 45, ry: -10, rz: 5, opacity: 0.08, blur: 5, zIndex: 0 },
  // Page 3: Projects (Underlay background, minimal opacity)
  { tx: 0, ty: 0, scale: 0.7, rx: -35, ry: 15, rz: -4, opacity: 0.06, blur: 6, zIndex: 0 },
  // Page 4: About Me (Underlay background, bottom center)
  { tx: 0, ty: 40, scale: 0.75, rx: 40, ry: 0, rz: -8, opacity: 0.08, blur: 5, zIndex: 0 },
  // Page 5: Contact Me (Centered, lower down, resurfaced)
  { tx: 0, ty: 190, scale: 0.72, rx: 12, ry: -14, rz: 2, opacity: 0.95, blur: 0, zIndex: 10 }
];

// Serene backgrounds with unique CSS fallback gradients (cross-faded based on active page)
const backgrounds = [
  // Section 0: Landing
  {
    light: 'radial-gradient(circle at 80% 20%, #fef3c7 0%, #fef8eb 50%, #f4eae1 100%)',
    dark: 'radial-gradient(circle at 80% 20%, #1e1b4b 0%, #0c0f17 60%, #030712 100%)',
    placeholderImg: 'images/bg-page1.jpg'
  },
  // Section 1: Tech Stack
  {
    light: 'radial-gradient(circle at 20% 80%, #f0fdf4 0%, #e8f5ed 50%, #d8e6dd 100%)',
    dark: 'radial-gradient(circle at 20% 80%, #022c22 0%, #0d1a16 60%, #010c08 100%)',
    placeholderImg: 'images/bg-page2.jpg'
  },
  // Section 2: Experience
  {
    light: 'radial-gradient(circle at 50% 50%, #f5f3ff 0%, #faf5ff 50%, #eccfe1 100%)',
    dark: 'radial-gradient(circle at 50% 50%, #1e102d 0%, #110d18 60%, #08050e 100%)',
    placeholderImg: 'images/bg-page3.jpg'
  },
  // Section 3: Projects
  {
    light: 'radial-gradient(circle at 30% 20%, #f0f9ff 0%, #e6f4fa 50%, #d5e8f0 100%)',
    dark: 'radial-gradient(circle at 30% 20%, #083344 0%, #0b1c24 60%, #030a0d 100%)',
    placeholderImg: 'images/bg-page4.jpg'
  },
  // Section 4: About Me
  {
    light: 'radial-gradient(circle at 80% 80%, #fff7ed 0%, #f9e8d4 55%, #eddac8 100%)',
    dark: 'radial-gradient(circle at 80% 80%, #311802 0%, #170f07 60%, #0d0903 100%)',
    placeholderImg: 'images/bg-page5.jpg'
  },
  // Section 5: Contact Me
  {
    light: 'radial-gradient(circle at 50% 90%, #fef3c7 0%, #faf2e6 50%, #ecd6be 100%)',
    dark: 'radial-gradient(circle at 50% 90%, #221510 0%, #150f0c 60%, #0a0604 100%)',
    placeholderImg: 'images/bg-page6.jpg'
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false); // Default to serene soft cream/pastel, support night mode
  const [chatOpen, setChatOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Contact form state fields
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sendingForm, setSendingForm] = useState(false);
  const [showFormSuccess, setShowFormSuccess] = useState(false);

  const totalSections = backgrounds.length; // 6 connected sequential sections

  // Refs for tracking momentum/scroll end and snapping
  const isScrollSnappingRef = useRef(false);
  const isCooldownRef = useRef(false);
  const touchStartYRef = useRef(0);

  // Jump smoothly to target scroll coordinates representing requested segments
  const scrollToPage = (pageIndex: number) => {
    isScrollSnappingRef.current = true;
    const targetScrollY = pageIndex * window.innerHeight;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
    setScrollIndex(pageIndex);
    // Release snap locking afterward
    setTimeout(() => {
      isScrollSnappingRef.current = false;
    }, 800);
  };

  // Scroll Spy and Resize listeners with custom inertia-safe debounce snap logic (Requirement 1)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const vh = window.innerHeight || 1;
      
      // Compute precise continuous scroll index based on current scroll position
      const rawIdx = scrollTop / vh;
      const clampedIdx = Math.min(Math.max(rawIdx, 0), totalSections - 1);
      
      // Update our scrollIndex state dynamically on scroll event (Problem 4)
      setScrollIndex(clampedIdx);
    };

    const handleWheel = (e: WheelEvent) => {
      // Passive listener check block native scrolling (Problem 1)
      e.preventDefault();

      if (isCooldownRef.current) return;

      // Filter micro-drifts/trackpad noise
      if (Math.abs(e.deltaY) < 15) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentScrollY = window.scrollY;
      const vh = window.innerHeight || 1;
      const currentIndex = Math.round(currentScrollY / vh);
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), totalSections - 1);

      if (nextIndex !== currentIndex) {
        scrollToPage(nextIndex);
        isCooldownRef.current = true;
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 700);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isCooldownRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      // 50px vertical swipe threshold (Problem 5)
      if (Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 1 : -1;
        const currentScrollY = window.scrollY;
        const vh = window.innerHeight || 1;
        const currentIndex = Math.round(currentScrollY / vh);
        const nextIndex = Math.min(Math.max(currentIndex + direction, 0), totalSections - 1);

        if (nextIndex !== currentIndex) {
          scrollToPage(nextIndex);
          isCooldownRef.current = true;
          setTimeout(() => {
            isCooldownRef.current = false;
          }, 700);
        }
      }
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight || 1);
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Initial triggers
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [totalSections]);

  const activePage = Math.round(scrollIndex);

  // Interpolation helper computing 3D properties in real-time
  const getInterpolatedTabletState = (): React.CSSProperties => {
    const statesDef = isMobile ? mobileTabletStates : desktopTabletStates;
    const baseIndex = Math.floor(scrollIndex);
    const nextIndex = Math.min(baseIndex + 1, totalSections - 1);
    const fraction = scrollIndex - baseIndex;

    const currentVal = statesDef[baseIndex];
    const nextVal = statesDef[nextIndex];

    if (!currentVal || !nextVal) {
      return {
        transform: 'perspective(1200px) rotateX(16deg) rotateY(-20deg) rotateZ(3deg) scale(0.92) translate3d(18vw, 0px, 0)',
        opacity: 1.0,
        filter: 'blur(0px)',
        zIndex: 10,
      };
    }

    const lerp = (start: number, end: number) => start + (end - start) * fraction;

    const tx = lerp(currentVal.tx, nextVal.tx);
    const ty = lerp(currentVal.ty, nextVal.ty);
    const scale = lerp(currentVal.scale, nextVal.scale);
    const rx = lerp(currentVal.rx, nextVal.rx);
    const ry = lerp(currentVal.ry, nextVal.ry);
    const rz = lerp(currentVal.rz, nextVal.rz);
    const opacity = lerp(currentVal.opacity, nextVal.opacity);
    const blur = lerp(currentVal.blur, nextVal.blur);
    // Integer assignment halfway through scroll steps
    const zIndex = fraction < 0.5 ? currentVal.zIndex : nextVal.zIndex;

    return {
      transform: `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale}) translate3d(${tx}vw, ${ty}px, 0)`,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      zIndex: zIndex,
      pointerEvents: (activePage === 0 || activePage === 1 || activePage === 5) ? 'auto' : 'none'
    };
  };

  // Form submission handling via Web3Forms
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;

    setSendingForm(true);

    try {
      const formData = new FormData();
      formData.append("access_key", "54b7439a-06bf-4110-89fd-116956e29afe");
      formData.append("name", formName.trim());
      formData.append("email", formEmail.trim());
      formData.append("subject", formSubject.trim() || "New Message from Portfolio");
      formData.append("message", formMessage.trim());

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setShowFormSuccess(true);
        // Empty input fields
        setFormName('');
        setFormEmail('');
        setFormSubject('');
        setFormMessage('');

        // Auto clear banner
        setTimeout(() => {
          setShowFormSuccess(false);
        }, 5000);
      } else {
        console.error("Web3Forms submission failed:", data);
        alert(data.message || "An error occurred while compiling your message. Please try again.");
      }
    } catch (err) {
      console.error("Network or transmission error:", err);
      alert("Could not connect to the transmission service. Please try again.");
    } finally {
      setSendingForm(false);
    }
  };

  return (
    <div
      id="root-theme-anchor"
      className={`relative min-h-screen font-sans antialiased select-none selection:bg-amber-400 selection:text-neutral-950 transition-colors duration-500 ${
        darkMode ? 'bg-neutral-950 text-neutral-100' : 'bg-stone-50 text-neutral-800'
      }`}
    >
      {/* Absolute background layers. Cross-fade seamlessly based on ScrollIndex */}
      {backgrounds.map((bg, i) => {
        // Linear fade-bounds logic
        const bgOpacity = Math.max(0, 1 - Math.abs(scrollIndex - i));
        if (bgOpacity <= 0) return null;

        return (
          <div
            key={i}
            id={`bg-gradient-plane-${i}`}
            className="fixed inset-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: bgOpacity,
              background: darkMode ? bg.dark : bg.light,
              zIndex: -2,
            }}
          >
            {/* 
              * LOCAL BACKGROUND IMAGE CUSTOM SLOT
              * ----------------------------------------------------------------------
              * If you want to use physical background images (e.g., 'images/bg-page1.jpg'),
              * uncomment the absolute block below, place your imagery assets inside 
              * your public folder directory, and adjust the mix-blend operations.
              * 
              * <div 
              *   className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
              *   style={{ backgroundImage: `url('${bg.placeholderImg}')` }} 
              * />
              */}
          </div>
        );
      })}

      {/* Subtle organic global mesh overlay to break up digital banding */}
      <div 
        id="noise-aesthetic-mask"
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-40 bg-[radial-gradient(circle_at_center,_#000000_1px,_transparent_1px)] bg-[size:16px_16px]" 
      />

      {/* Elegant floating side dots timeline indicator */}
      <nav 
        id="side-timeline-navigator"
        className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3.5 z-40 hidden md:flex"
      >
        {backgrounds.map((_, i) => {
          const names = ['Home', 'Tech OS', 'Experience', 'Projects', 'Bio', 'Contact'];
          const isSelected = activePage === i;
          return (
            <button
              key={i}
              id={`timeline-dot-${i}`}
              onClick={() => scrollToPage(i)}
              className="flex items-center justify-end gap-2 group cursor-pointer text-right outline-none"
            >
              <span className={`text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 px-2 py-0.5 rounded border ${
                darkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
                  : 'bg-white border-stone-200 text-stone-600'
              }`}>
                {names[i]}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                isSelected 
                  ? darkMode
                    ? 'bg-amber-400 border-amber-400 scale-125 shadow-[0_0_8px_#fbbf24]'
                    : 'bg-neutral-950 border-neutral-950 scale-125 shadow-[0_0_8px_rgba(0,0,0,0.2)]'
                  : darkMode
                  ? 'border-neutral-700 bg-neutral-900 group-hover:border-neutral-400'
                  : 'border-stone-300 bg-white group-hover:border-stone-500'
              }`} />
            </button>
          );
        })}
      </nav>

      {/* The Global 3D Interactive Tablet layer floating at a fixed coordinate overlay */}
      <div
        id="global-tablet-viewport"
        className={`hidden md:flex fixed inset-0 items-center justify-center pointer-events-none z-30 transition-all duration-700 ${
          (activePage === 0 || activePage === 1 || activePage === 5)
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-90 invisible'
        }`}
      >
        <Tablet 
          darkMode={darkMode} 
          transformStyle={getInterpolatedTabletState()} 
          isActive={activePage === 0 || activePage === 1 || activePage === 5}
          isTechStack={activePage === 1}
        />
      </div>

      {/* Application Master Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        scrollIndex={scrollIndex}
        scrollToPage={scrollToPage}
      />

      {/* STICKY MAIN WORKSPACE CONTENT CONTAINERS */}
      <main id="sequential-sections-stack" className="relative z-20 w-full" style={{ height: `${totalSections * 100}vh` }}>
        <div id="sticky-viewport-casing" className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          
          {/* SECTION 1: FRONT LANDING PAGE */}
          <section
            id="section-landing"
            className="absolute inset-0 w-full h-full flex items-center transition-all duration-500 overflow-hidden"
            style={{
              opacity: Math.max(0, 1 - Math.abs(scrollIndex - 0) * 1.5),
              transform: `translateY(${(scrollIndex - 0) * -40}px)`,
              pointerEvents: activePage === 0 ? 'auto' : 'none',
              zIndex: activePage === 0 ? 10 : 0
            }}
          >
            <div 
              className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center overflow-y-auto max-h-full"
              style={{
                paddingTop: 'calc(64px + 0.25rem)',
                paddingBottom: '2rem'
              }}
            >
              {/* Left Column Content */}
              <div id="landing-col-left" className="flex flex-col gap-5 text-left max-w-xl w-full">
                
                <div id="landing-hero-headings">
                  <h1 className="font-mono text-sm sm:text-base font-semibold uppercase tracking-wider text-neutral-500 mt-1">
                    Hi, I'm
                  </h1>
                  <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-none mt-1">
                    Sudhanshu Shekhar Mishra
                  </h2>
                </div>

                {/* Looping dynamic auto-typing block */}
                <div id="landing-typing-wrapper" className="flex flex-col gap-1.5 mt-1">
                  <TypingEffect phrases={developerInfo.titles} />
                </div>

                <p className={`text-sm md:text-base leading-relaxed font-sans ${
                  darkMode ? 'text-neutral-400' : 'text-stone-600'
                }`}>
                  {developerInfo.bio}
                </p>

                {/* Interactive Action Buttons */}
                <div id="landing-cta-block" className="flex flex-col sm:flex-row gap-4 mt-3">
                  {/* Resume primary trigger */}
                  <a
                    id="resume-download-link"
                    href="/sudhanshu-shekhar-mishra.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold text-sm tracking-wide transition-all shadow hover:scale-[1.02] active:scale-95 cursor-pointer ${
                      darkMode
                        ? 'bg-amber-400 text-neutral-950 hover:bg-amber-350 shadow-[0_4px_15px_rgba(251,191,36,0.25)]'
                        : 'bg-neutral-950 text-white hover:bg-neutral-850 shadow-[0_4px_15px_rgba(0,0,0,0.15)]'
                    }`}
                  >
                    <FileText size={16} />
                    <span>View Resume</span>
                  </a>

                  {/* Hire trigger and social clusters */}
                  <div className="flex items-center gap-3">
                    <button
                      id="cta-hire-me-btn"
                      onClick={() => scrollToPage(5)}
                      className={`px-5 py-3.5 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider border cursor-pointer transition-all hover:scale-[1.03] active:scale-95 ${
                        darkMode
                          ? 'border-neutral-800 bg-neutral-900/60 text-white hover:border-neutral-700'
                          : 'border-stone-200 bg-white text-stone-900 hover:border-stone-300 shadow-sm'
                      }`}
                    >
                      Hire Me
                    </button>

                    <a
                      id="head-github-icon-link"
                      href={developerInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all hover:scale-105 ${
                        darkMode
                          ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:bg-neutral-800'
                          : 'border-stone-200 bg-white text-stone-700 hover:text-black hover:bg-stone-50 shadow-sm'
                      }`}
                      title="GitHub Profile"
                    >
                      <Github size={16} />
                    </a>

                    <a
                      id="head-x-icon-link"
                      href="https://x.com/GatewayToGate26"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all hover:scale-105 ${
                        darkMode
                          ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:bg-neutral-800'
                          : 'border-stone-200 bg-white text-stone-700 hover:text-black hover:bg-stone-50 shadow-sm'
                      }`}
                      title="X Profile"
                    >
                      <Twitter size={16} />
                    </a>

                    <a
                      id="head-linkedin-icon-link"
                      href={developerInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all hover:scale-105 ${
                        darkMode
                          ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:bg-neutral-800'
                          : 'border-stone-200 bg-white text-stone-700 hover:text-black hover:bg-stone-50 shadow-sm'
                      }`}
                      title="LinkedIn Profile"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>

                {/* On mobile devices (max-width: 768px), position the 3D tablet cleanly underneath */}
                <div id="mobile-landing-tablet" className="flex md:hidden w-full items-center justify-center mt-6 z-20 pointer-events-auto">
                  <Tablet 
                    darkMode={darkMode}
                    isActive={true}
                    isMobile={true}
                    transformStyle={{
                      transform: 'perspective(1200px) rotateX(12deg) rotateY(-14deg) rotateZ(2deg)',
                      opacity: 0.95,
                      filter: 'blur(0px)',
                      zIndex: 10,
                      pointerEvents: 'auto'
                    }}
                  />
                </div>

                {/* Micro scroll indicator */}
                <div 
                  id="scroll-down-hint"
                  onClick={() => scrollToPage(1)}
                  className="flex items-center gap-2 mt-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer text-xs font-mono max-w-fit"
                >
                  <ChevronDown className="animate-bounce" size={16} />
                  <span>Scroll down to see skills mapping</span>
                </div>
              </div>

              {/* Right column placeholder for absolute Tablet spacing layout */}
              <div className="hidden lg:block h-[500px]" />
            </div>
          </section>

          {/* SECTION 2: TECH STACK (Tablet Animation Target) */}
          <section
            id="section-tech-stack"
            className="absolute inset-0 w-full h-full transition-all duration-500 overflow-hidden"
            style={{
              opacity: Math.max(0, 1 - Math.abs(scrollIndex - 1) * 1.5),
              transform: `translateY(${(scrollIndex - 1) * -40}px)`,
              pointerEvents: activePage === 1 ? 'auto' : 'none',
              zIndex: activePage === 1 ? 10 : 0
            }}
          >
            <div 
              className="max-w-7xl mx-auto w-full h-full px-6 flex flex-col justify-between overflow-y-auto max-h-full pb-20 md:pb-24"
              style={{
                paddingTop: 'calc(64px + 1.5rem)',
              }}
            >
              {/* Top informational header */}
              <div className="max-w-4xl mx-auto text-center flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="p-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Sparkles size={14} />
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-amber-500 font-bold uppercase">
                    TACTILE OS SANDBOX
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-tight">
                  Interact With My Ecosystem
                </h3>
                <p className={`text-xs md:text-sm max-w-lg mx-auto ${
                  darkMode ? 'text-neutral-400' : 'text-stone-500'
                }`}>
                  The 3D tablet compiles the languages, libraries and tools comprising my developer identity. Hover, scroll, and click on active skills tags.
                </p>
              </div>

              {/* Central spacing area occupied by scaled-up Tablet container */}
              <div className="flex-1 min-h-[120px] md:min-h-[300px] flex items-center justify-center my-4">
                <div className="flex md:hidden z-20 pointer-events-auto">
                  <Tablet 
                    darkMode={darkMode}
                    isActive={true}
                    isMobile={true}
                    isTechStack={true}
                    transformStyle={{
                      transform: 'perspective(1200px) rotateX(6deg) rotateY(-6deg) rotateZ(0deg)',
                      opacity: 1.0,
                      filter: 'blur(0px)',
                      zIndex: 10,
                      pointerEvents: 'auto'
                    }}
                  />
                </div>
              </div>

              {/* Bottom micro instructions panel */}
              <div className="max-w-md mx-auto text-center px-6">
                <div className={`text-[10px] font-mono select-none px-4 py-2 border rounded-full inline-block ${
                  darkMode
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    : 'bg-stone-50 border-stone-200 text-stone-500 shadow-sm'
                }`}>
                  ACTIVATE TACTILE FEEDBACK: HOVER OR PRESS LABELS LIVE
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: EXPERIENCE TIMES (Single Rectangular Window & Certificate Slot) */}
          <section
            id="section-experience"
            className="absolute inset-0 w-full h-full flex items-center transition-all duration-500 overflow-hidden"
            style={{
              opacity: Math.max(0, 1 - Math.abs(scrollIndex - 2) * 1.5),
              transform: `translateY(${(scrollIndex - 2) * -40}px)`,
              pointerEvents: activePage === 2 ? 'auto' : 'none',
              zIndex: activePage === 2 ? 10 : 0
            }}
          >
            <div 
              className="max-w-5xl mx-auto w-full px-6 flex flex-col gap-5 lg:gap-6 overflow-y-auto max-h-full pb-20"
              style={{
                paddingTop: 'calc(64px + 1.5rem)',
              }}
            >
              <div className="text-left flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Briefcase size={12} className="text-amber-500" />
                  <span className="font-mono text-[10px] tracking-widest text-amber-500 font-bold uppercase">
                    PROFESSIONAL CHRONOLOGY
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
                  Valuable Internships & Timeline
                </h3>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
                {/* Left Card: Internship Work Details */}
                <div
                  id="bionex-details-card"
                  className={`lg:col-span-7 p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    darkMode
                      ? 'bg-neutral-950/85 border-neutral-800'
                      : 'bg-white/95 border-stone-200 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 flex-wrap border-b border-light-divider dark:border-neutral-800/40 pb-4">
                      <div>
                        <h4 className="font-display font-extrabold text-lg md:text-xl leading-snug">
                           Software Engineering Intern
                        </h4>
                        <span className="text-xs font-mono text-amber-500 font-bold block mt-0.5">
                          Kashiv BioSciences
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded border flex items-center gap-1 ${
                        darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}>
                        <Calendar size={10} />
                        Feb 2026 - Mar 2026
                      </span>
                    </div>

                    {/* Structured Work Tasks */}
                    <div className="mt-5 space-y-4">
                      {/* Block A: Maintenance and Testing */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-stone-500 dark:text-neutral-400 uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                          Maintenance and Testing
                        </span>
                        <ul className={`space-y-1.5 text-xs leading-relaxed font-sans pl-2 ${
                          darkMode ? 'text-neutral-300' : 'text-stone-600'
                        }`}>
                          <li className="flex gap-2 items-start">
                            <span className="text-amber-500 font-mono mt-0.5 shrink-0">•</span>
                            <span>Applied responsive web development principles to update and optimise the internal resource site.</span>
                          </li>
                          <li className="flex gap-2 items-start">
                            <span className="text-amber-500 font-mono mt-0.5 shrink-0">•</span>
                            <span>Performed rigorous testing to ensure web-based IT tools functioned correctly on different platforms.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Block B: Database Management */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-stone-500 dark:text-neutral-400 uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                          Database Management
                        </span>
                        <ul className={`space-y-1.5 text-xs leading-relaxed font-sans pl-2 ${
                          darkMode ? 'text-neutral-300' : 'text-stone-600'
                        }`}>
                          <li className="flex gap-2 items-start">
                            <span className="text-amber-500 font-mono mt-0.5 shrink-0">•</span>
                            <span>Performed routine data cleaning and validation checks in the departmental database to prevent duplicate entries and maintain data quality.</span>
                          </li>
                          <li className="flex gap-2 items-start">
                            <span className="text-amber-500 font-mono mt-0.5 shrink-0">•</span>
                            <span>Assisted in basic administration of a SQL-based inventory tracking system.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Skills tags footer */}
                  <div className="mt-5 pt-4 border-t border-dashed border-neutral-800/10 dark:border-neutral-800/80 flex flex-wrap gap-1">
                    {['HTML5', 'CSS3', 'Tailwind', 'PostgreSQL', 'SQL', 'Git/Github', 'Web Platforms'].map((sk) => (
                      <span
                        key={sk}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                          darkMode
                            ? 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                            : 'bg-stone-50 border border-stone-200 text-stone-600'
                        }`}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Card: Rectangular Certificate Slot */}
                <div
                  id="bionex-certificate-slot"
                  onClick={() => setCertificateOpen(true)}
                  className={`lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 cursor-pointer group hover:scale-[1.015] ${
                    darkMode
                      ? 'bg-neutral-950/85 border-neutral-800 hover:border-amber-500/40 hover:shadow-[0_20px_40px_rgba(245,158,11,0.08)]'
                      : 'bg-white/95 border-stone-200 hover:border-amber-500/30 hover:shadow-[0_20px_40px_rgba(245,158,11,0.04)]'
                  }`}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-wider text-amber-500 font-bold uppercase">
                        VERIFIED CREDENTIAL
                      </span>
                      <ExternalLink size={12} className="text-stone-400 group-hover:text-amber-500 transition-colors shrink-0" />
                    </div>
                    <h4 className="font-display font-bold text-base leading-snug">
                      Internship Certificate Window
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-neutral-450' : 'text-stone-550'}`}>
                      Click this rectangular window panel to unlock the high-definition verified electronic certificate of completion from Kashiv BioSciences.
                    </p>
                  </div>

                  {/* Rectangular authentic certificate image thumbnail */}
                  <div
                    className="mt-4 rounded-xl border border-stone-200 dark:border-neutral-850 p-1.5 bg-white relative overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <img
                      src="/bionex-certificate.png"
                      alt="Internship Certificate of Completion"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain select-none shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-[4px]"
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-dashed border-neutral-800/10 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-amber-600 dark:text-amber-500 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Click to Expand and View</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: PROJECTS (Side-by-Side Display Windows) */}
          <section
            id="section-projects"
            className="absolute inset-0 w-full h-full flex items-center transition-all duration-500 overflow-hidden"
            style={{
              opacity: Math.max(0, 1 - Math.abs(scrollIndex - 3) * 1.5),
              transform: `translateY(${(scrollIndex - 3) * -40}px)`,
              pointerEvents: activePage === 3 ? 'auto' : 'none',
              zIndex: activePage === 3 ? 10 : 0
            }}
          >
            <div 
              className="max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col gap-6 lg:gap-8 overflow-y-auto max-h-full pb-20"
              style={{
                paddingTop: 'calc(64px + 1.5rem)',
              }}
            >
              <div className="text-left flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={12} className="text-amber-500" />
                  <span className="font-mono text-[10px] tracking-widest text-amber-500 font-bold uppercase">
                    PRACTICAL SOFTWARE SYSTEMS
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
                  Projects and their Repository Linkages
                </h3>
                <p className={`text-xs md:text-sm max-w-xl ${
                  darkMode ? 'text-neutral-400' : 'text-stone-500'
                }`}>
                  Side-by-side terminal windows displaying data aggregators and interactive canvas interfaces. Click any display area to review open-source components.
                </p>
              </div>

              {/* Side-by-Side Display Windows */}
              <div id="projects-board-grid" className="grid md:grid-cols-2 gap-6 relative z-10">
                {projectsList.map((project) => (
                  <div
                    key={project.id}
                    id={`project-window-${project.id}`}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 group cursor-pointer hover:scale-[1.015] ${
                      darkMode
                        ? 'bg-neutral-950/85 border-neutral-800 hover:border-neutral-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.65)]'
                        : 'bg-white/95 border-stone-200 hover:border-stone-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]'
                    }`}
                  >
                    {/* MacOS Style Tab Header */}
                    <div
                      className={`px-4 h-9 flex items-center justify-between border-b ${
                        darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-stone-50 border-stone-150'
                      }`}
                    >
                      {/* Interactive window command indicators */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className={`text-[9px] font-mono tracking-widest leading-none ${
                        darkMode ? 'text-neutral-500' : 'text-stone-400'
                      }`}>
                        {project.id.toUpperCase()}_CONSOLE.SH
                      </span>
                      <div className="w-5" /> {/* Balanced right element spacing */}
                    </div>

                    {/* Window Content Arena */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title & Tagline */}
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-display font-bold text-lg group-hover:text-amber-500 transition-colors leading-snug">
                            {project.name}
                          </h4>
                          <span className={`p-1.5 rounded-md border ${
                            darkMode ? 'border-neutral-800 text-neutral-400' : 'border-stone-150 text-stone-500'
                          }`}>
                            <ExternalLink size={11} />
                          </span>
                        </div>
                        <span className="text-[10px] font-mono tracking-wide text-neutral-500 block mt-0.5">
                          {project.tagline}
                        </span>

                        <p className={`text-xs mt-3 leading-relaxed font-sans ${
                          darkMode ? 'text-neutral-400' : 'text-stone-600'
                        }`}>
                          {project.description}
                        </p>
                      </div>

                      {/* 
                        * DEVELOPER INSTRUCTION: PROJECT VISUAL SLOT
                        * ------------------------------------------------------------------
                        * If you have a physical image of the project (e.g. 'images/proj-atlas.jpg'),
                        * you can swap the SVG component below with an <img> element:
                        * 
                        * <img 
                        *   src={project.placeholderImage} 
                        *   alt={project.name} 
                        *   className="w-full h-24 object-cover mt-4 rounded-lg" 
                        * />
                        */}
                      
                      {/* High-Fidelity Local Vector Graphic representation */}
                      <div
                        id={`vector-graphic-mesh-${project.id}`}
                        className={`w-full h-24 mt-4 rounded-lg overflow-hidden border flex items-center justify-center relative ${
                          darkMode
                            ? 'bg-neutral-900/60 border-neutral-800/80'
                            : 'bg-stone-50 border-stone-150 shadow-inner'
                        }`}
                      >
                        {/* Interactive geometric background grid */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,120,120,0.06)_1px,_transparent_1px)] bg-[size:12px_12px]" />
                        
                        {/* Display a simulated analytical graph or server layout */}
                        {project.id === 'proj1' ? (
                          // ECOMMERCE DATA SCRAPER (Product logs mockup)
                          <div className="flex flex-col gap-1 relative z-10 w-full px-4 text-left font-mono text-[7.5px] leading-tight">
                            <div className="text-amber-500 font-bold">{`$ python scraper.py --target="store"`}</div>
                            <div className="text-emerald-500">{`[OK] GET https://target-market.com/shop?page=1`}</div>
                            <div className="text-neutral-500/80 dark:text-neutral-400/80">{` > Parsed 48 product cards. Scraped titles, ratings, prices.`}</div>
                            <div className="text-emerald-500">{`[OK] Data cached. Dumping records into db_catalog.csv...`}</div>
                            <div className="text-amber-400/90 font-bold">{`Success: 48 items cataloged successfully.`}</div>
                          </div>
                        ) : (
                          // AUTOMATED EMAILING SYSTEM (SMTP delivery logs mockup)
                          <div className="flex flex-col gap-1 relative z-10 w-full px-4 text-left font-mono text-[7.5px] leading-tight">
                            <div className="text-amber-500 font-bold">{`$ python mailer.py --send-bulk`}</div>
                            <div className="text-sky-500">{`[SMTP] Handshake with smtp.gmail.com:587... Secured`}</div>
                            <div className="text-neutral-500/80 dark:text-neutral-400/80">{` > Building custom MIME multiparts with index_template.html...`}</div>
                            <div className="text-emerald-500">{`[OK] Dispatched: [1/150] -> recipient_1@domain.com`}</div>
                            <div className="text-emerald-500">{`[OK] Queue completed. 150 emails sent, 0 failures.`}</div>
                          </div>
                        )}
                      </div>

                      {/* Tech Pills Cluster */}
                      <div className="mt-4 pt-3 border-t border-dashed border-neutral-800/10 dark:border-neutral-800/80 flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`text-[8px] font-mono px-2 py-0.5 rounded ${
                              darkMode
                                ? 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                                : 'bg-stone-50 border border-stone-200 text-stone-600'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: ABOUT ME (Spacious Typography layout) */}
          <section
            id="section-about-me"
            className="absolute inset-0 w-full h-full flex items-center transition-all duration-500 overflow-hidden"
            style={{
              opacity: Math.max(0, 1 - Math.abs(scrollIndex - 4) * 1.5),
              transform: `translateY(${(scrollIndex - 4) * -40}px)`,
              pointerEvents: activePage === 4 ? 'auto' : 'none',
              zIndex: activePage === 4 ? 10 : 0
            }}
          >
            <div 
              className="max-w-4xl mx-auto w-full px-6 md:px-12 flex flex-col gap-6 overflow-y-auto max-h-full pb-20"
              style={{
                paddingTop: 'calc(64px + 1.5rem)',
              }}
            >
              <div className="text-left flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <User size={12} className="text-amber-500" />
                  <span className="font-mono text-[10px] tracking-widest text-amber-500 font-bold uppercase">
                    PHILOSOPHICAL FOUNDATIONS
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight leading-snug">
                  Core Principles & Vision
                </h3>
              </div>

              {/* Bio block typography layout */}
              <div
                id="about-bio-panel"
                className={`p-6 md:p-8 rounded-2xl border transition-all relative z-10 leading-relaxed text-sm md:text-base ${
                  darkMode
                    ? 'bg-neutral-950/85 border-neutral-800/80 shadow-[0_15px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-white/95 border-stone-200 shadow-sm'
                }`}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Philosophy Segment */}
                  <div className="md:col-span-2 flex flex-col gap-3.5">
                    <h4 className="font-display font-bold text-amber-500 text-sm tracking-wider uppercase">
                      MY PERSPECTIVE
                    </h4>
                    <p className={darkMode ? 'text-neutral-300' : 'text-stone-600'}>
                      My development in this field, until now, has followed a freeform pattern. Although not having a clear direction in my mind did dangle my progress, but at the same time, it allowed me to experiment and analyze a diverse set of skills that piqued my interest in this field of Science.
                    </p>
                    <p className={darkMode ? 'text-neutral-300' : 'text-stone-600'}>
                      But now I have a serious urge to create, develop and innovate. And thus, I am looking for opportunities to work with the others and as part of an organization so as to learn from the experience of my peers, gain insights to the persistent problems plaguing our world, and contribute to the advancement of Computer Science.
                    </p>
                  </div>

                  {/* Core Attributes Card */}
                  <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                    darkMode
                      ? 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
                      : 'bg-stone-50 border-stone-150 text-stone-700 shadow-inner'
                  }`}>
                    <div>
                      <h5 className="font-mono font-bold text-[10px] uppercase tracking-wider text-amber-500 mb-2">
                        Core Objectives
                      </h5>
                      <ul className="space-y-1.5 text-xs font-mono">
                        <li>• Data Harmonization</li>
                        <li>• Tactile UI Ergonomics</li>
                        <li>• PostgreSQL Indexing</li>
                        <li>• Automation Scrapes</li>
                        <li>• Systemic Stability</li>
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/10 dark:border-neutral-800 flex items-center justify-between text-[10px]">
                      <span className="flex items-center gap-1 text-emerald-500 font-bold">
                        <MapPin size={10} /> INDIA
                      </span>
                      <span className="opacity-40">UTC+5:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: CONTACT ME (Tablet Resurfaces, Form Left) */}
          <section
            id="section-contact-me"
            className="absolute inset-0 w-full h-full flex items-center transition-all duration-500 overflow-hidden"
            style={{
              opacity: Math.max(0, 1 - Math.abs(scrollIndex - 5) * 1.5),
              transform: `translateY(${(scrollIndex - 5) * -40}px)`,
              pointerEvents: activePage === 5 ? 'auto' : 'none',
              zIndex: activePage === 5 ? 10 : 0
            }}
          >
            <div 
              className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center overflow-y-auto max-h-full pb-20"
              style={{
                paddingTop: 'calc(64px + 1.5rem)',
              }}
            >
              {/* Left Column: Form Content */}
              <div id="contact-col-left" className="flex flex-col gap-6 text-left max-w-xl">
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-amber-500" />
                  <span className="font-mono text-[10px] tracking-widest text-amber-500 font-bold uppercase">
                    ESTABLISH CHANNELS
                  </span>
                </div>
                
                <div id="contact-headings-wrapper">
                  <h3 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-none">
                    Let's Build Something Serene
                  </h3>
                  <p className={`text-xs md:text-sm mt-3 ${
                    darkMode ? 'text-neutral-400' : 'text-stone-500'
                  }`}>
                    Transmit a message to me throughe form below. Alternatively, reach out via the social media profiles on the Landing page.
                  </p>
                </div>

                {/* Secure Contact Form */}
                <form
                  id="secure-contact-transmiter"
                  onSubmit={handleFormSubmit}
                  className={`p-5 md:p-6 rounded-2xl border flex flex-col gap-4 relative ${
                    darkMode
                      ? 'bg-neutral-950/85 border-neutral-800 text-neutral-100 shadow-[0_15px_30px_rgba(0,0,0,0.55)]'
                      : 'bg-white/95 border-stone-250 text-stone-800 shadow-sm'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* Name field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] tracking-wider uppercase opacity-60">
                        Sender Handle (Name) *
                      </label>
                      <input
                        id="contact-sender-name"
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="John Doe"
                        className={`px-3 py-2.5 rounded-lg text-xs outline-none border transition-colors ${
                          darkMode
                            ? 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-400'
                            : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-stone-400'
                        }`}
                      />
                    </div>

                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] tracking-wider uppercase opacity-60">
                        Email Address *
                      </label>
                      <input
                        id="contact-sender-email"
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@example.com"
                        className={`px-3 py-2.5 rounded-lg text-xs outline-none border transition-colors ${
                          darkMode
                            ? 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-400'
                            : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-stone-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] tracking-wider uppercase opacity-60">
                      Subject
                    </label>
                    <input
                      id="contact-sender-subject"
                      type="text"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="Crux of the message"
                      className={`px-3 py-2.5 rounded-lg text-xs outline-none border transition-colors ${
                        darkMode
                          ? 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-400'
                          : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-stone-400'
                        }`}
                    />
                  </div>

                  {/* Message editor */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] tracking-wider uppercase opacity-60">
                      Message *
                    </label>
                    <textarea
                      id="contact-sender-message"
                      required
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Type your message here"
                      className={`px-3 py-2.5 rounded-lg text-xs outline-none border transition-colors resize-none ${
                        darkMode
                          ? 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-400'
                          : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-stone-400'
                      }`}
                    />
                  </div>

                  {/* Submit buttons */}
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={sendingForm}
                    className={`flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      sendingForm
                        ? 'bg-neutral-350 dark:bg-neutral-800 text-neutral-400 cursor-wait'
                        : darkMode
                        ? 'bg-amber-400 hover:bg-amber-350 text-neutral-950 shadow-[0_4px_15px_rgba(251,191,36,0.15)]'
                        : 'bg-neutral-950 hover:bg-neutral-850 text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <span>{sendingForm ? 'TRANSMITTING...' : 'SEND SECURE TRANSMISSION'}</span>
                    <ArrowRight size={13} />
                  </button>

                  {/* Success notification banner */}
                  {showFormSuccess && (
                    <div
                      id="form-success-banner"
                      className="absolute inset-0 bg-neutral-950/95 dark:bg-neutral-950 rounded-2xl flex flex-col items-center justify-center gap-3 text-center p-6 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <CheckCircle2 className="text-emerald-500 animate-bounce" size={40} />
                      <div className="flex flex-col gap-1">
                        <span className="font-display font-extrabold text-white text-base">
                          Transmission Successful!
                        </span>
                        <span className="text-neutral-400 font-mono text-[10px] max-w-[280px]">
                          Thank you. Your request is compiled. Sudhanshu will respond shortly to {formEmail}.
                        </span>
                      </div>
                      <button
                        id="dismiss-success-banner"
                        type="button"
                        onClick={() => setShowFormSuccess(false)}
                        className="mt-2 text-[10px] font-mono text-amber-500 hover:underline border border-amber-500/20 px-3 py-1 rounded bg-amber-500/10"
                      >
                        [ Dismiss Banner ]
                      </button>
                    </div>
                  )}
                </form>

                {/* On mobile, render tablet inline below form */}
                <div id="mobile-contact-tablet" className="flex md:hidden w-full items-center justify-center mt-6 z-20 pointer-events-auto">
                  <Tablet 
                    darkMode={darkMode}
                    isActive={true}
                    isMobile={true}
                    transformStyle={{
                      transform: 'perspective(1200px) rotateX(12deg) rotateY(-14deg) rotateZ(2deg)',
                      opacity: 0.95,
                      filter: 'blur(0px)',
                      zIndex: 10,
                      pointerEvents: 'auto'
                    }}
                  />
                </div>
              </div>

              {/* Right column spacing for Tablet overlay positioning */}
              <div className="hidden lg:block h-[500px]" />
            </div>
          </section>

        </div>
      </main>

      {/* GHOST HOVER-DEPTH INDICATOR PANEL FOR NATURAL SCROLL TRACKING */}
      {/* 
        This is a beautiful and highly reliable full-page scrolling engine. 
        As the user scrolls naturally down the page, we capture scroll progress 
        inside useEffect and smoothly morph our layouts, backgrounds, and the 3D tablet!
      */}
      <div 
        id="scroll-depth-driver"
        className="absolute top-0 left-0 w-full pointer-events-none" 
        style={{ height: `${totalSections * 100}vh` }} 
      />

      {/* Immersive Software Engineering Completed Internship Certificate Modal */}
      {certificateOpen && (
        <div
          id="cert-immersive-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-300 pointer-events-auto"
          onClick={() => setCertificateOpen(false)}
        >
          <div
            id="cert-window-viewport"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white text-stone-900 rounded-2xl border border-stone-200/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300 animate-out fade-out"
          >
            {/* Window bar */}
            <div className="bg-stone-100 border-b border-stone-200 h-10 px-4 flex items-center justify-between selection:bg-transparent">
              <div className="flex items-center gap-1.5 selection:bg-transparent">
                <button
                  onClick={() => setCertificateOpen(false)}
                  className="w-3 h-3 rounded-full bg-rose-500/85 hover:bg-rose-500 transition-colors flex items-center justify-center text-[8px] text-rose-950 font-bold"
                >
                  ✕
                </button>
                <div className="w-3 h-3 rounded-full bg-amber-400/80 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[9px] tracking-widest text-stone-500 font-bold uppercase selection:bg-transparent">
                INTERNSHIP_CERTIFICATE_COMPLETED.PDF
              </span>
              <button
                onClick={() => setCertificateOpen(false)}
                className="text-stone-400 hover:text-stone-700 transition-colors p-1"
              >
                ✕
              </button>
            </div>

            {/* Certificate Canvas Frame (Pristine Corporate White Document Sheet Layout) */}
            <div className="flex-1 bg-stone-50 flex items-center justify-center p-3 sm:p-6 shadow-inner overflow-y-auto select-none">
              <div className="w-full max-w-[560px] bg-white drop-shadow-md rounded-sm border border-stone-200/60 overflow-hidden relative aspect-[800/820] flex items-center justify-center">
                <img
                  src="/bionex-certificate.png"
                  alt="Kashiv BioSciences Verified Internship Certificate of Completion"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain pointer-events-auto"
                />
              </div>
            </div>

            {/* Modal Controls */}
            <div className="bg-stone-100 border-t border-stone-200 p-3 px-4 flex items-center justify-between select-none">
              <span className="text-[9px] font-mono text-stone-500">
                Press [ESCAPE] or click backdrop to close certificate.
              </span>
              <button
                onClick={() => setCertificateOpen(false)}
                className="bg-stone-900 hover:bg-stone-850 text-white font-mono text-[10px] font-bold px-3.5 py-1.5 rounded-lg border border-stone-800 transition-all cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating conversational AI chat screen assistant */}
      <ChatWidget 
        isOpen={chatOpen} 
        setIsOpen={setChatOpen} 
        darkMode={darkMode} 
      />

      {/* Serene Elegant micro footer */}
      <footer
        id="serene-app-footer"
        className={`fixed bottom-0 left-0 w-full z-10 transition-colors duration-300 pointer-events-none py-4 text-center text-[9px] font-mono tracking-widest ${
          darkMode ? 'text-neutral-600' : 'text-stone-400'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span>India (UTC+5:30)</span>
          <span className="hidden xs:inline">CRAFTED ELEGANTLY BY S.S.MISHRA @ 2026</span>
          <span className="flex items-center gap-1">
            STATUS: <span className="text-emerald-500 font-bold animate-pulse">STABLE</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
