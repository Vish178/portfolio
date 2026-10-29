import React from 'react';
import { ArrowDownRight, Sparkles, Terminal, ShieldCheck, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[380px] h-[380px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bio & Core Pitch */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Status & Location Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-carbon-850/90 border border-white/10 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>R&D Engineer @ Rikaian Technology</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-carbon-850/70 border border-white/5 text-xs font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Speech AI</span> & High-Throughput Systems.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                I am <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong>, an Applied AI Engineer who turns complex audio research and LLM architectures into resilient, low-latency production software.
              </p>
            </div>

            {/* Micro proof points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-carbon-900/80 border border-white/5 flex flex-col">
                <span className="text-cyan-400 font-mono font-bold text-lg">74% RAM Cut</span>
                <span className="text-xs text-slate-400 mt-0.5">Streamed audio chunks</span>
              </div>
              <div className="p-3 rounded-xl bg-carbon-900/80 border border-white/5 flex flex-col">
                <span className="text-emerald-400 font-mono font-bold text-lg">&lt; 500ms</span>
                <span className="text-xs text-slate-400 mt-0.5">Full-Duplex WebRTC voice</span>
              </div>
              <div className="p-3 rounded-xl bg-carbon-900/80 border border-white/5 flex flex-col">
                <span className="text-amber-400 font-mono font-bold text-lg">12 Loops</span>
                <span className="text-xs text-slate-400 mt-0.5">Autonomous lead worker</span>
              </div>
            </div>

            {/* CTA action group */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold text-sm hover:opacity-95 transition-all shadow-glow-cyan"
              >
                <span>Inspect Flagship Systems</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#speech-lab"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-carbon-850 hover:bg-carbon-800 border border-white/10 hover:border-white/20 text-white font-mono text-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore S2ST Lab</span>
              </a>

              <a
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white font-mono text-xs transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Live Trust Bar */}
            <div className="flex items-center gap-3 pt-3 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Production verified: AWS App Runner · ECS Fargate · PostgreSQL · Docker</span>
            </div>
          </div>

          {/* Right Column: Avatar + Audio Synthesizer Console */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Profile Avatar Card */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="relative">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-16 h-16 rounded-xl object-cover border border-cyan-400/40 shadow-glow-cyan"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-carbon-950 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">{PERSONAL_INFO.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    B.E. CompEng
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  AI & Speech Systems R&D
                </p>
                <span className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live production contributor
                </span>
              </div>
            </div>

            {/* Interactive Audio Waveform Console */}
            <AudioWaveformVisualizer />
          </div>

        </div>
      </div>
    </section>
  );
};

