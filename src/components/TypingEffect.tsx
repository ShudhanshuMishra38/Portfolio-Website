/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingEffect({
  phrases,
  typingSpeed = 90,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypingEffectProps) {
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activePhrase = phrases[currentPhraseIdx];

    if (isDeleting) {
      // Deleting behavior
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing behavior
      timer = setTimeout(() => {
        setDisplayText((prev) => activePhrase.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Phase transition checks
    if (!isDeleting && displayText === activePhrase) {
      // Finished typing phrase, hold before deletion
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayText === '') {
      // Finished deleting, trigger next phrase indexes
      setIsDeleting(false);
      setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIdx, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="font-mono text-sm sm:text-base font-bold text-amber-500 flex items-center gap-0.5 tracking-wide bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20 max-w-fit mt-2">
      {displayText}
      <span className="w-1.5 h-4 bg-amber-500 animate-pulse inline-block" />
    </span>
  );
}
