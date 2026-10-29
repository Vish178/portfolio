import React from 'react';
import { BookOpen, ExternalLink, Award } from 'lucide-react';
import { PUBLICATION } from '../data/portfolioData';

export const PublicationCard: React.FC = () => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative bg-carbon-950">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-carbon-850 border border-white/10 text-cyan-400 flex-shrink-0 mt-1">
              <BookOpen className="w-6 h-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
                  Peer-Reviewed Publication
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {PUBLICATION.journal} · {PUBLICATION.year}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                "{PUBLICATION.title}"
              </h3>

              <p className="text-xs font-mono text-cyan-400 mt-1">
                {PUBLICATION.authors}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {PUBLICATION.summary}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 self-start md:self-center">
            <a
              href={PUBLICATION.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-carbon-850 hover:bg-carbon-800 border border-white/15 hover:border-cyan-400/50 text-white font-mono text-xs font-semibold transition-all shadow-sm group"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Read Manuscript</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
