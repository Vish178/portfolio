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
    <section id="metrics" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-white/[0.08] bg-canvas-900/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>Production Telemetry & Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Production Scalability & Memory Benchmarks
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
            Measured resource footprints and architectural optimizations verified on AWS deployments.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CORE_METRICS.map((metric) => {
            const Icon = iconMap[metric.iconName] || Activity;
            return (
              <div
                key={metric.id}
                className="panel-card p-5 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {metric.label}
                    </span>
                    <div className="p-1.5 rounded bg-canvas-850 border border-white/[0.08] text-slate-400">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
                    {metric.value}
                  </div>
                </div>
                <div className="mt-3.5 pt-3 border-t border-white/[0.06] text-xs text-slate-400 leading-relaxed font-sans">
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
