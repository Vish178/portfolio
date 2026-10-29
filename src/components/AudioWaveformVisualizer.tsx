import React, { useEffect, useRef, useState } from 'react';
import { Activity, Radio, Cpu, Layers } from 'lucide-react';

export const AudioWaveformVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeInspector, setActiveInspector] = useState<'spectrogram' | 'pitch' | 'vad'>('spectrogram');
  const [lufsValue, setLufsValue] = useState(-23.1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Fine oscilloscope horizontal grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let y = 16; y < height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (activeInspector === 'spectrogram') {
        // Mel-Spectrogram: High-density monochrome/steel frequency bars
        const colCount = 52;
        const colWidth = width / colCount;

        for (let i = 0; i < colCount; i++) {
          const x = i * colWidth;
          const energy = Math.sin(time * 2 + i * 0.28) * 0.35 + Math.cos(time * 2.8 + i * 0.14) * 0.25 + 0.38;
          const barHeight = Math.max(8, energy * (height * 0.82));
          const y = height - barHeight;

          const grad = ctx.createLinearGradient(0, y, 0, height);
          grad.addColorStop(0, '#E2E8F0');
          grad.addColorStop(0.35, '#94A3B8');
          grad.addColorStop(1, '#1E232E');

          ctx.fillStyle = grad;
          ctx.fillRect(x + 1, y, colWidth - 2, barHeight);
        }
      } else if (activeInspector === 'pitch') {
        // Fundamental Frequency F0 Tracking: Clean surgical line
        ctx.strokeStyle = '#F1F5F9';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < width; x += 3) {
          const normX = x / width;
          const f0Y = (height / 2) + Math.sin(normX * 8 + time * 3) * 24 + Math.sin(normX * 16 + time * 4.5) * 10;
          if (x === 0) ctx.moveTo(x, f0Y);
          else ctx.lineTo(x, f0Y);
        }
        ctx.stroke();

        // Target F0 baseline
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Silero VAD Temporal Speech Blocks
        const segments = 8;
        const segWidth = width / segments;

        for (let s = 0; s < segments; s++) {
          const isSpeech = (s % 3 !== 0);
          const x = s * segWidth;
          const blockH = isSpeech ? height * 0.65 : height * 0.12;
          const y = (height - blockH) / 2;

          ctx.fillStyle = isSpeech ? 'rgba(241, 245, 249, 0.15)' : 'rgba(255, 255, 255, 0.02)';
          ctx.fillRect(x + 2, y, segWidth - 4, blockH);

          if (isSpeech) {
            ctx.strokeStyle = 'rgba(241, 245, 249, 0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 2, y, segWidth - 4, blockH);
          }
        }
      }

      time += 0.035;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const interval = setInterval(() => {
      setLufsValue(-23.0 + (Math.random() * 0.3 - 0.15));
    }, 2500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [activeInspector]);

  return (
    <div className="panel-card-elevated rounded-xl p-4 sm:p-5 relative overflow-hidden">
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-white/[0.08] font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-slate-200 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-slate-400" /> Audio Signal Telemetry
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span>EBU R128: <strong className="text-slate-200 font-normal">{lufsValue.toFixed(1)} LUFS</strong></span>
          <span className="hidden sm:inline">Stream: <strong className="text-slate-400 font-normal">48kHz / 24-bit</strong></span>
        </div>
      </div>

      {/* Oscilloscope Canvas */}
      <div className="relative w-full h-32 sm:h-36 bg-canvas-950 rounded-lg overflow-hidden border border-white/[0.06] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={580}
          height={144}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-2.5 left-2.5 flex items-center gap-2 px-2.5 py-1 rounded bg-canvas-900/90 border border-white/[0.08] text-[10px] font-mono">
          <Activity className="w-3 h-3 text-slate-400" />
          <span className="text-slate-300 uppercase tracking-wider">
            {activeInspector === 'spectrogram' ? 'Mel-Filterbank Energies' : activeInspector === 'pitch' ? 'F0 Pitch Trajectory (142 Hz)' : 'Silero VAD Voice Segments'}
          </span>
        </div>
      </div>

      {/* Hardware Mode Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-white/[0.06] font-mono text-xs">
        <div className="flex items-center gap-1 p-0.5 bg-canvas-900 rounded-lg border border-white/[0.08]">
          {(
            [
              { id: 'spectrogram', label: 'Spectrogram', icon: Layers },
              { id: 'pitch', label: 'F0 Contour', icon: Activity },
              { id: 'vad', label: 'VAD Blocks', icon: Cpu }
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveInspector(item.id)}
              className={`px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1.5 ${
                activeInspector === item.id
                  ? 'bg-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
          Budget: &lt; 500ms WebRTC
        </div>
      </div>
    </div>
  );
};
