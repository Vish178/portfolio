import React from 'react';
import { BookOpen, ExternalLink, Award } from 'lucide-react';
import { PUBLICATION } from '../data/portfolioData';

export const PublicationCard: React.FC = () => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative bg-canvas-950">
      <div className="max-w-7xl mx-auto">
        <div className="panel-card-elevated rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-canvas-900 border border-white/[0.08] text-slate-300 flex-shrink-0 mt-1">
              <BookOpen className="w-5 h-5" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-canvas-900 border border-white/[0.08] text-slate-300 font-mono text-xs font-medium">
                  Peer-Reviewed Publication
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {PUBLICATION.journal} · {PUBLICATION.year}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                "{PUBLICATION.title}"
              </h3>

              <p className="text-xs font-mono text-slate-400 mt-1">
                {PUBLICATION.authors}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
                {PUBLICATION.summary}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 self-start md:self-center">
            <a
              href={PUBLICATION.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-canvas-900 hover:bg-canvas-850 border border-white/10 hover:border-white/20 text-white font-mono text-xs font-semibold transition-all group"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Read Manuscript</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
