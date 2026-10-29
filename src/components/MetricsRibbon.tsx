import React from 'react';
import { Cpu, HardDrive, Zap, Activity, Globe2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CORE_METRICS } from '../data/portfolioData';

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  HardDrive,
  Zap,
  Activity,
  Languages: Globe2,
};

export const MetricsRibbon: React.FC = () => {
  return (
    <section id="metrics" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-carbon-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Production Telemetry & Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineered for Production Scale
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
            Real performance benchmarks and storage optimizations derived from live commercial deployments.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CORE_METRICS.map((metric) => {
            const Icon = iconMap[metric.iconName] || Activity;
            return (
              <div
                key={metric.id}
                className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {metric.label}
                    </span>
                    <div className="p-2 rounded-lg bg-carbon-850 border border-white/5 text-cyan-400 group-hover:text-emerald-400 group-hover:border-emerald-400/30 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
                    {metric.value}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 text-xs text-slate-400 leading-relaxed font-sans">
                  {metric.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
