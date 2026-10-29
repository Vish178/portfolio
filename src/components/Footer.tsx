import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-canvas-950 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-canvas-900 border border-white/[0.08] flex items-center justify-center text-slate-400">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-300">
            {PERSONAL_INFO.name} · {PERSONAL_INFO.role}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            SYS_HEALTH: OPTIMAL
          </span>
          <span>·</span>
          <span>PUNE, IN (UTC+5:30)</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-900 hover:bg-canvas-850 border border-white/[0.08] text-slate-400 hover:text-white transition-all text-xs"
        >
          <span>Top</span>
          <ArrowUp className="w-3 h-3" />
        </button>

      </div>
    </footer>
  );
};
