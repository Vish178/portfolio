import React, { useState } from 'react';
import { ExternalLink, Layers, CheckCircle2, ChevronRight, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'speech' | 'platform' | 'agents'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-tech-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Codebases & Platforms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Production AI Systems
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              End-to-end applications designed, built, and deployed with real users, live traffic, and resilient cloud architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-canvas-900 rounded-xl border border-white/[0.08] font-mono text-xs self-start lg:self-auto">
            {(
              [
                { id: 'all', label: 'All Systems' },
                { id: 'speech', label: 'Speech & Audio AI' },
                { id: 'platform', label: 'Platforms & Cloud' },
                { id: 'agents', label: 'Autonomous Agents' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFilter === tab.id
                    ? 'bg-white/10 text-white font-medium border border-white/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="panel-card rounded-xl p-6 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header Tag & Links */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas-850 text-slate-300 border border-white/[0.08] uppercase tracking-wider">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all flex items-center gap-1 text-xs font-mono"
                        title="Live Platform"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-white group-hover:text-slate-100 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-2 gap-2 my-4">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-canvas-950 border border-white/[0.06] flex flex-col"
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{m.label}</span>
                      <span className="text-xs font-semibold font-mono text-slate-200 mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Bullet Highlights */}
                <ul className="space-y-2 mb-5">
                  {project.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer: Architecture Stack & Deep Dive CTA */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.architecture.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-canvas-950 text-slate-400 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.architecture.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-canvas-950 text-slate-500">
                      +{project.architecture.length - 4}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-canvas-850 hover:bg-canvas-800 border border-white/[0.08] hover:border-white/20 text-xs font-mono text-slate-300 hover:text-white transition-all"
                >
                  <span>System Architecture Spec</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Spec Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas-950/85 backdrop-blur-md">
          <div className="panel-card-elevated w-full max-w-2xl rounded-2xl p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-canvas-850 border border-white/[0.08] text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-canvas-850 text-slate-300 border border-white/[0.08] text-xs font-mono uppercase">
                {selectedProject.category}
              </span>
              {selectedProject.liveUrl && (
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                  Production Live
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
            <p className="text-sm text-slate-400 font-mono mb-4">{selectedProject.tagline}</p>

            <div className="border-t border-white/[0.08] pt-4 mb-4">
              <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-2">System Overview</h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">{selectedProject.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-canvas-950 border border-white/[0.06]">
                  <div className="text-[10px] uppercase font-mono text-slate-400">{m.label}</div>
                  <div className="text-sm font-semibold font-mono text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-2">Engineering Capabilities</h4>
              <ul className="space-y-2">
                {selectedProject.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-2">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.architecture.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded bg-canvas-850 text-slate-300 border border-white/[0.08]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-canvas-950 font-bold text-xs"
                >
                  <span>Launch Live Platform</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-canvas-850 border border-white/[0.08] text-white hover:border-white/20 text-xs font-mono"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
