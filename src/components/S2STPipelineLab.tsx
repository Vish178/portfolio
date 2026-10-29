import React, { useState } from 'react';
import { Cpu, Mic2, Sparkles, Check, ChevronRight } from 'lucide-react';
import { S2ST_PIPELINE } from '../data/portfolioData';

export const S2STPipelineLab: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStage = S2ST_PIPELINE[activeStepIndex];

  return (
    <section id="speech-lab" className="py-20 px-4 sm:px-6 lg:px-8 bg-carbon-900/60 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1.5">
              <Mic2 className="w-4 h-4" />
              <span>Speech AI Research & Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Emotion-Aware S2ST Pipeline
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Custom Speech-to-Speech Translation (English $\leftrightarrow$ Chinese/Hindi) preserving vocal timbre, micro-prosody, and emotional intensity.
            </p>
          </div>
          
          <div className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center gap-2 self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Colab A100 · 322-clip LoRA Dataset</span>
          </div>
        </div>

        {/* Pipeline Stage Tabs / Timeline Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {S2ST_PIPELINE.map((stage, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-carbon-800/90 border-cyan-400/50 shadow-glow-cyan'
                    : 'bg-carbon-900/60 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                    STEP {stage.step}
                  </span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {stage.title}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1 line-clamp-1">
                  {stage.model}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Neural Stage Monitor Console */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Console: Parameters & Model Specs */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded bg-carbon-800 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                STAGE {activeStage.step} // {activeStage.status}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Synchronized
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {activeStage.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeStage.description}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="p-3 rounded-xl bg-carbon-950/80 border border-white/5">
                <div className="text-[10px] uppercase font-mono text-slate-500">Core Neural Architecture</div>
                <div className="text-xs font-bold font-mono text-cyan-300 mt-1">{activeStage.model}</div>
              </div>
              <div className="p-3 rounded-xl bg-carbon-950/80 border border-white/5">
                <div className="text-[10px] uppercase font-mono text-slate-500">Validation Metric</div>
                <div className="text-xs font-bold font-mono text-emerald-400 mt-1">{activeStage.metric}</div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-3">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                className="px-3.5 py-1.5 rounded-lg bg-carbon-850 border border-white/10 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-40"
              >
                ← Previous Stage
              </button>
              <button
                disabled={activeStepIndex === S2ST_PIPELINE.length - 1}
                onClick={() => setActiveStepIndex(Math.min(S2ST_PIPELINE.length - 1, activeStepIndex + 1))}
                className="px-4 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:bg-cyan-500/30 disabled:opacity-40 flex items-center gap-1.5"
              >
                <span>Advance Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Console: Diagnostic Signal Visualizer */}
          <div className="lg:col-span-5 bg-carbon-950/90 rounded-xl p-5 border border-white/10 font-mono text-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Cpu className="w-3.5 h-3.5" /> Latent Tensor State
              </span>
              <span className="text-[11px] text-emerald-400">STATUS: CONVERGED</span>
            </div>

            <div className="space-y-2 py-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Pipeline Node:</span>
                <span className="text-slate-200">s2st_v2_stage_{activeStage.step}.py</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sampling Rate:</span>
                <span className="text-cyan-300">48,000 Hz (Float32)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lossless Master:</span>
                <span className="text-emerald-300">FLAC (Lossless)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Evaluation Method:</span>
                <span className="text-amber-300">DTW Pitch/Energy Contour</span>
              </div>
            </div>

            {/* Simulated Live Tensor Signal Bar */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Emotion Alignment Index</span>
                <span className="text-cyan-400 font-bold">96.4%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-carbon-850 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${85 + (activeStepIndex * 3)}%` }}
                />
              </div>
            </div>

            <div className="text-[10px] text-slate-500 italic mt-1">
              * Research implemented at Rikaian Technology Pvt. Ltd. comparing ElevenLabs and fine-tuned MOSS-TTS 8B models.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
