import React from 'react';
import { Mic, Server, Activity, Layout, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const iconMap: Record<string, LucideIcon> = {
  Mic,
  Server,
  Activity,
  Layout
};

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-carbon-900/40 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1.5">
            <Terminal className="w-4 h-4" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Systems & Applied AI Stack
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
            A comprehensive overview of production frameworks, models, infrastructure services, and media processing toolchains.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = iconMap[category.icon] || Terminal;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 rounded-lg bg-carbon-850 border border-white/10 text-cyan-400 group-hover:text-emerald-400 group-hover:border-emerald-400/30 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-carbon-850 text-slate-300 border border-white/5 hover:border-white/15 hover:text-white transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{category.skills.length} core tools</span>
                  <span className="text-emerald-400 font-semibold">Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
