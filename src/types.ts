/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools' | 'data';
  level: string; // e.g. "Expert", "Proficient"
  accentColor: string; // Styling accent
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  skillsUsed: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  githubUrl: string;
  demoUrl?: string; // Optional live link
  placeholderImage: string; // The local layout placeholder image path
  techStack: string[];
}

export interface TabletState {
  tx: number;       // transform X in vw (screen width %)
  ty: number;       // transform Y in pixels (offset)
  scale: number;    // scale factor
  rx: number;       // rotateX in degrees
  ry: number;       // rotateY in degrees
  rz: number;       // rotateZ in degrees
  opacity: number;  // opacity [0, 1]
  blur: number;     // blur filter in pixels
  zIndex: number;   // stack layer
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
