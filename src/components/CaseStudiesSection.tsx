import React, { useState } from 'react';
import { GitCompare, CheckCircle2, ChevronRight, X, AlertCircle } from 'lucide-react';
import { CASE_STUDIES } from '../data/portfolioData';
import type { CaseStudy } from '../data/portfolioData';

export const CaseStudiesSection: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-carbon-900/50 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1.5">
              <GitCompare className="w-4 h-4" />
              <span>Production Trade-offs & Deep-Dives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Systems Architecture Case Studies
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Concrete architectural decisions, technical trade-offs, and empirical benchmarks from production audio & LLM deployments.
            </p>
          </div>
          
          <span className="text-xs font-mono text-slate-400 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-carbon-850 border border-white/5">
            Documented Production Failures & Fixes
          </span>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border border-white/10"
            >
              <div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-carbon-850 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                  {study.tag}
                </span>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-4">
                  {study.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                  {study.summary}
                </p>

                {/* Micro Impact Preview */}
                <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-500">Key Outcome</div>
                  <div className="flex items-start gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{study.impact[0]}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudy(study)}
                className="mt-6 w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-carbon-850 hover:bg-carbon-800 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-slate-200 hover:text-cyan-300 transition-all"
              >
                <span>Read Full Technical Architecture</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-3xl rounded-2xl border border-white/15 p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedStudy(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-carbon-850 border border-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              {selectedStudy.tag}
            </span>

            <h3 className="text-2xl font-bold text-white mt-1 mb-4">
              {selectedStudy.title}
            </h3>

            {/* Problem Statement */}
            <div className="p-4 rounded-xl bg-carbon-900 border border-white/5 mb-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-semibold mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Production Problem</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {selectedStudy.problem}
              </p>
            </div>

            {/* Constraints */}
            <div className="mb-5">
              <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-2">Hard Constraints</h4>
              <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                {selectedStudy.constraints.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Tradeoffs */}
            <div className="mb-5 space-y-3">
              <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-1">Engineering Trade-offs & Decisions</h4>
              {selectedStudy.tradeoffs.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-carbon-950 border border-white/5 text-xs">
                  <div className="text-cyan-300 font-mono font-bold text-sm mb-1">
                    Choice: {t.choice}
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans mb-2">
                    {t.why}
                  </p>
                  <div className="text-[11px] font-mono text-rose-400/90 border-t border-white/5 pt-1.5">
                    <strong>Alternative Rejected:</strong> {t.rejectedAlternative}
                  </div>
                </div>
              ))}
            </div>

            {/* Measured Impact */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs uppercase font-mono text-emerald-400 tracking-wider mb-2">Measured Production Impact</h4>
              <ul className="space-y-2">
                {selectedStudy.impact.map((im, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-200 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{im}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
