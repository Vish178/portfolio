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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas-900/40 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest mb-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Systems & Applied AI Toolchain
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
                className="panel-card rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-1.5 rounded bg-canvas-850 border border-white/[0.08] text-slate-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs font-mono rounded bg-canvas-950 text-slate-300 border border-white/[0.06] hover:border-white/20 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{category.skills.length} core tools</span>
                  <span className="text-emerald-400 font-medium">Production Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
