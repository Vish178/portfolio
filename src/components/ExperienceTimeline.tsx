import React from 'react';
import { Briefcase, Calendar, MapPin, GraduationCap, CheckCircle2, Terminal } from 'lucide-react';
import { EXPERIENCE, EDUCATION } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1.5">
            <Briefcase className="w-4 h-4" />
            <span>Engineering Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Background
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
            Designing resilient architectures, eliminating production bottlenecks, and deploying commercial ML systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Work Experience (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all"
              >
                {/* Active glow corner for present role */}
                {idx === 0 && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-mono text-cyan-400 mt-0.5">
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        exp.company
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mt-4 pt-4 border-t border-white/5">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column: Education & Systems Focus (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Engineering Degree</span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {EDUCATION.degree}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1 leading-relaxed">
                  {EDUCATION.institution} · {EDUCATION.period}
                </p>

                <div className="my-5 p-4 rounded-xl bg-carbon-900 border border-white/10 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Engineering Focus</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 leading-relaxed">
                    {EDUCATION.specialization}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-400">
                  <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
                    Core Coursework & Foundations
                  </div>
                  <p className="leading-relaxed font-sans text-slate-300">
                    {EDUCATION.coursework}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Verified Credentials</span>
                <span className="text-emerald-400">Accredited B.E.</span>
              </div>
            </div>

            {/* Systems Philosophy */}
            <div className="p-5 rounded-2xl bg-carbon-900/80 border border-white/5 font-mono text-xs text-slate-300 flex flex-col gap-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                Engineering Philosophy
              </span>
              <p className="text-slate-400 font-sans text-xs leading-relaxed">
                "Profile memory early, stream temporal chunks, minimize unnecessary cloud API round-trips, and validate speech outputs using objective mathematical metrics."
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
