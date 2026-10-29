import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Metrics', href: '#metrics' },
    { name: 'Projects', href: '#projects' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Speech Lab', href: '#speech-lab' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-carbon-950/85 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-carbon-850 border border-white/15 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-glow-cyan transition-all">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                vishal.kaushal
              </span>
              <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                SYS::SPEECH_AI
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-carbon-900/70 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right actions: Availability + Links + Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available</span>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-carbon-850 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-carbon-850 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-400 text-xs font-mono font-medium transition-all shadow-sm hover:shadow-glow-cyan"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium"
            >
              Resume
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-carbon-850 border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 glass-panel rounded-2xl border border-white/10 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-300"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for AI Engineering roles</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-carbon-850 border border-white/10 text-slate-300"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-carbon-850 border border-white/10 text-slate-300"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
