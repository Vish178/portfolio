import React, { useState } from 'react';
import { Cpu, Mic2, Sparkles, Check, ChevronRight } from 'lucide-react';
import { S2ST_PIPELINE } from '../data/portfolioData';

export const S2STPipelineLab: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStage = S2ST_PIPELINE[activeStepIndex];

  return (
    <section id="speech-lab" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas-950 border-y border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest mb-1.5">
              <Mic2 className="w-3.5 h-3.5" />
              <span>Speech AI Research & Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Emotion-Aware S2ST Pipeline
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Cross-lingual Speech-to-Speech Translation (English $\leftrightarrow$ Chinese/Hindi) preserving vocal timbre, micro-prosody, and emotional intensity.
            </p>
          </div>
          
          <div className="px-3 py-1.5 rounded-lg bg-canvas-900 border border-white/[0.08] text-slate-300 font-mono text-xs flex items-center gap-2 self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
                    ? 'bg-canvas-850 border-white/30 shadow-sm'
                    : 'bg-canvas-900/60 border-white/[0.06] hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    STAGE {stage.step}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
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

        {/* Neural Stage Monitor Console */}
        <div className="panel-card-elevated rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Console: Parameters & Model Specs */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded bg-canvas-900 border border-white/[0.08] text-slate-200 text-xs font-mono">
                STAGE {activeStage.step} // {activeStage.status}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Converged
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {activeStage.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {activeStage.description}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="p-3 rounded-xl bg-canvas-950 border border-white/[0.06]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Core Neural Architecture</div>
                <div className="text-xs font-semibold font-mono text-white mt-1">{activeStage.model}</div>
              </div>
              <div className="p-3 rounded-xl bg-canvas-950 border border-white/[0.06]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Validation Metric</div>
                <div className="text-xs font-semibold font-mono text-emerald-400 mt-1">{activeStage.metric}</div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-3">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                className="px-3.5 py-1.5 rounded-lg bg-canvas-850 border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white disabled:opacity-30"
              >
                ← Previous Stage
              </button>
              <button
                disabled={activeStepIndex === S2ST_PIPELINE.length - 1}
                onClick={() => setActiveStepIndex(Math.min(S2ST_PIPELINE.length - 1, activeStepIndex + 1))}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono text-white disabled:opacity-30 flex items-center gap-1.5"
              >
                <span>Advance Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Console: Diagnostic Signal Visualizer */}
          <div className="lg:col-span-5 bg-canvas-950 rounded-xl p-5 border border-white/[0.08] font-mono text-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Cpu className="w-3.5 h-3.5 text-slate-400" /> Latent Tensor State
              </span>
              <span className="text-[11px] text-emerald-400">LOSS: 0.041</span>
            </div>

            <div className="space-y-2 py-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Pipeline Node:</span>
                <span className="text-slate-200">s2st_v2_stage_{activeStage.step}.py</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sampling Rate:</span>
                <span className="text-slate-200">48,000 Hz (Float32)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lossless Master:</span>
                <span className="text-slate-200">FLAC (Lossless)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Evaluation Method:</span>
                <span className="text-slate-200">DTW Pitch/Energy Contour</span>
              </div>
            </div>

            {/* Diagnostic Alignment Bar */}
            <div className="pt-2 border-t border-white/[0.08]">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                <span>Emotion Alignment Index</span>
                <span className="text-white font-bold">96.4%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-canvas-900 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${88 + (activeStepIndex * 2)}%` }}
                />
              </div>
            </div>

            <div className="text-[10px] text-slate-400 italic mt-1">
              * Research conducted at Rikaian Technology evaluating emotion transfer fidelity across MOSS-TTS 8B and ElevenLabs.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
