import React, { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useResumeGate } from '../context/ResumeContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openResumeModal } = useResumeGate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Metrics', href: '#metrics' },
    { name: 'Systems', href: '#projects' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'S2ST Lab', href: '#speech-lab' },
    { name: 'Experience', href: '#experience' },
    { name: 'Stack', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-canvas-950/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-sm'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-canvas-850 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-slate-100 group-hover:border-white/30 transition-all">
              VK
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white group-hover:text-slate-200 transition-colors">
                vishal.kaushal
              </span>
              <span className="font-mono text-[10px] text-slate-400 tracking-normal">
                Applied AI & Speech Systems
              </span>
            </div>
          </a>

          {/* Desktop Nav: Clean Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-canvas-900/80 border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-canvas-850 border border-white/[0.08] text-[11px] font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for Roles</span>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-canvas-900 border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-canvas-900 border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={openResumeModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.08] border border-white/15 text-slate-100 hover:bg-white/[0.14] hover:border-white/30 text-xs font-mono font-medium transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={openResumeModal}
              className="px-2.5 py-1 rounded bg-white/[0.08] border border-white/15 text-slate-100 text-xs font-mono font-medium"
            >
              Resume
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-canvas-900 border border-white/[0.08] text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 panel-card-elevated rounded-2xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Open for engineering roles</span>
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-canvas-850 border border-white/10 text-slate-300"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-canvas-850 border border-white/10 text-slate-300"
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
