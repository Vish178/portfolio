import React from 'react';
import { ArrowDownRight, Terminal, ShieldCheck, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-tech-grid">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Thesis & Biography */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Status & Location Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-canvas-900 border border-white/10 text-xs font-mono text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>R&D Engineer @ Rikaian Technology</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-canvas-900/60 border border-white/[0.06] text-xs font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Headline: Clean, Confident Solid White */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Applied AI & Systems Engineering for Speech.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed font-normal max-w-2xl">
                I am <strong className="text-slate-100 font-semibold">{PERSONAL_INFO.name}</strong>. I architect low-latency audio pipelines, speech-to-speech translation systems, and resilient cloud backends that operate under strict memory and latency constraints.
              </p>
            </div>

            {/* Micro proof points: Architectural Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-canvas-900 border border-white/[0.08] flex flex-col">
                <span className="text-white font-mono font-bold text-lg">74% RAM Cut</span>
                <span className="text-xs text-slate-400 mt-0.5">Streamed audio chunks (1.9GB → 0.49GB)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-canvas-900 border border-white/[0.08] flex flex-col">
                <span className="text-white font-mono font-bold text-lg">&lt; 500ms</span>
                <span className="text-xs text-slate-400 mt-0.5">Full-duplex WebRTC voice loop</span>
              </div>
              <div className="p-3.5 rounded-xl bg-canvas-900 border border-white/[0.08] flex flex-col">
                <span className="text-white font-mono font-bold text-lg">12 Loops</span>
                <span className="text-xs text-slate-400 mt-0.5">Autonomous lead worker pipeline</span>
              </div>
            </div>

            {/* CTA action group */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-canvas-950 font-semibold text-xs uppercase tracking-wider font-mono hover:bg-slate-200 transition-all"
              >
                <span>Production Systems</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#case-studies"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-canvas-900 hover:bg-canvas-850 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-mono text-xs transition-all"
              >
                <span>Architecture Case Studies</span>
              </a>

              <a
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-canvas-900 hover:bg-canvas-850 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-mono text-xs transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Production verified tag */}
            <div className="flex items-center gap-2.5 pt-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Production verified: AWS ECS Fargate · App Runner · PostgreSQL · Docker · WebRTC</span>
            </div>
          </div>

          {/* Right Column: Avatar & Hardware-grade Signal Inspector */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Minimalist Profile Identity Card */}
            <div className="panel-card p-4 rounded-xl flex items-center gap-4">
              <div className="relative">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-14 h-14 rounded-lg object-cover border border-white/10"
                />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-canvas-950" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-sm">{PERSONAL_INFO.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                    B.E. Computer Engineering
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Applied AI & Speech Systems
                </p>
                <span className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live production engineering contributor
                </span>
              </div>
            </div>

            {/* Audio Telemetry Hardware Monitor */}
            <AudioWaveformVisualizer />
          </div>

        </div>
      </div>
    </section>
  );
};
