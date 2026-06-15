/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill, Experience, Project } from '../types';

export const developerInfo = {
  name: 'Sudhanshu Shekhar Mishra',
  titles: [
    'Data Analyst',
    'Python Developer',
    'Web Developer',
    'Blogger'
  ],
  bio: "A detail-oriented, generalist Computer Science enthusiast heavily inclined towards nurturing innovative ideas and putting them to action. My biggest strength lies in my dynamicity and adaptiveness.\n\nLooking to work with others and learn more...",
  email: 'definiteeternity10@gmail.com',
  github: 'https://github.com', // Placeholder Github
  linkedin: 'https://linkedin.com', // Placeholder LinkedIn
  x: 'https://x.com/GatewayToGate26',
  resumeUrl: '#', // Placeholder resume trigger
};

export const skillsList: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'languages', level: 'Expert', accentColor: '#3776AB' },
  { name: 'Java', category: 'languages', level: 'Proficient', accentColor: '#007396' },
  { name: 'Js', category: 'languages', level: 'Expert', accentColor: '#F7DF1E' },
  
  // Frontend Web Development
  { name: 'HTML', category: 'frontend', level: 'Expert', accentColor: '#E34F26' },
  { name: 'CSS', category: 'frontend', level: 'Expert', accentColor: '#1572B6' },
  { name: 'Tailwind', category: 'frontend', level: 'Expert', accentColor: '#06B6D4' },
  
  // Backend & Databases
  { name: 'PostgreSQL', category: 'backend', level: 'Expert', accentColor: '#4169E1' },
  { name: 'Firebase', category: 'backend', level: 'Proficient', accentColor: '#FFCA28' },
  
  // Data Science Stack
  { name: 'Numpy', category: 'data', level: 'Expert', accentColor: '#013243' },
  { name: 'Pandas', category: 'data', level: 'Expert', accentColor: '#150458' },
  { name: 'MatplotLib', category: 'data', level: 'Proficient', accentColor: '#11557c' },
  { name: 'BeautifulSoup', category: 'data', level: 'Expert', accentColor: '#8E44AD' },
  
  // Tools & Hosting
  { name: 'Github', category: 'tools', level: 'Expert', accentColor: '#181717' },
  { name: 'NPM', category: 'tools', level: 'Proficient', accentColor: '#CB3837' },
  { name: 'Vercel', category: 'tools', level: 'Proficient', accentColor: '#000000' },
  { name: 'Wordpress', category: 'tools', level: 'Proficient', accentColor: '#21759B' }
];

export const experienceList: Experience[] = [
  {
    id: 'exp1',
    role: 'Software Engineering Intern',
    company: 'Kashiv BioSciences',
    duration: 'Feb 2026 - Mar 2026',
    description: [
      'Maintenance and Testing: Applied responsive web development principles to update and optimise the internal resource site.',
      'Maintenance and Testing: Performed rigorous testing to ensure web-based IT tools functioned correctly on different platforms.',
      'Database Management: Performed routine data cleaning and validation checks in the departmental database to prevent duplicate entries and maintain data quality.',
      'Database Management: Assisted in basic administration of a SQL-based inventory tracking system.'
    ],
    skillsUsed: ['HTML', 'CSS', 'Tailwind', 'PostgreSQL', 'Github', 'Vercel']
  }
];

export const projectsList: Project[] = [
  {
    id: 'proj1',
    name: 'Ecommerce Data Scraper',
    tagline: 'Python Product Scraping & Catalog Extract System',
    description: 'A professional-grade web scraper developed in Python to harvest product titles, current prices, customer ratings, and active stock statuses from ecommerce targets. Configured with rotative browser headers and clean DataFrame output structures.',
    githubUrl: 'https://github.com/ShudhanshuMishra38/ecommerce-data-scraper',
    placeholderImage: 'https://picsum.photos/seed/scraper/800/600',
    techStack: ['Python', 'Pandas', 'BeautifulSoup', 'Numpy', 'Github']
  },
  {
    id: 'proj2',
    name: 'Automated Emailing System',
    tagline: 'Secure SMTP Custom Email Transmission Engine',
    description: 'An automated email dispatch workflow built in Python using secure SMTP protocols. Facilitates HTML body styling, multi-recipient lists, secure connection handling, file attachments, and automated script notifications.',
    githubUrl: 'https://github.com/ShudhanshuMishra38/Automated-Emailing-System',
    placeholderImage: 'https://picsum.photos/seed/email/800/600',
    techStack: ['Python', 'SMTP', 'HTML', 'Github', 'NPM']
  }
];

// Conversational responses for our smart custom chat widget
export const botAnswers: Record<string, string> = {
  default: `I am happy to assist! Ask me about Sudhanshu's:
1. **Technical Skills** (e.g., Python, PostgreSQL, Pandas, Web)
2. **Professional Internships & Experience**
3. **Recent Software Projects**
4. **How to Get in Touch or Hire Him**`,

  greeting: `Hello! I am Sudhanshu's AI Ambassador. 🌸 I am here to help you navigate his portfolio, tech stack, and background. What would you like to know about him?`,

  skills: `Sudhanshu has a robust technical toolkit arranged on his interactive 3D tablet! He possesses high proficiency in:
- **Core Languages**: Python (Expert), Java, and JavaScript
- **Frontend & Styling**: Tailwind CSS, HTML5, CSS3, and responsive structuring
- **Data & Engineering**: Pandas, Numpy, BeautifulSoup, and Matplotlib
- **Databases & Serverless**: PostgreSQL database engineering and Google Firebase Integration
- **Publishing & Tools**: Git/Github, NPM, Vercel, and WordPress CMS`,

  experience: `Sudhanshu completed a Software Engineering Internship at Kashiv BioSciences (Feb 2026 - Mar 2026). His work included:
- **Maintenance & Testing**: Applying responsive web dev principles to optimize the internal resource site and verifying cross-platform IT tools.
- **Database Management**: Doing routine data cleaning and integrity checks in departmental databases and maintaining a SQL inventory tracker system.`,

  projects: `Sudhanshu has built two excellent open-source Python projects:
- **Ecommerce Data Scraper**: A web product catalog harvester extracting title, ratings, pricing, and stock status using rotative request headers and BeautifulSoup/Pandas.
- **Automated Emailing System**: A pythonic SMTP message dispatcher engine supporting HTML styling, secure auth, bulk delivery lists, and automated attachments.`,

  contact: `You can reach out to Sudhanshu Shekhar Mishra directly:
- ✉️ **Email**: definiteeternity10@gmail.com
- 💼 **LinkedIn**: linkedin.com (or click the button in header/contact page)
- 🖥️ **Github**: github.com (or use the links on the cards)
You can also fill out the **Contact form** in the final section of this page! He typically responds within 24 hours.`,

  blog: `Yes! Sudhanshu is a passionate tech blogger. He writes about Python scripting, automation, web design patterns, database architecture, and developer workflows. He enjoys sharing knowledge with the global open-source community.`
};
