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

      // Subtle horizontal frequency grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let y = 15; y < height; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (activeInspector === 'spectrogram') {
        // Mel-Spectrogram Frequency Heatmap Simulation
        const colCount = 56;
        const colWidth = width / colCount;

        for (let i = 0; i < colCount; i++) {
          const x = i * colWidth;
          const energy = Math.sin(time * 2 + i * 0.3) * 0.35 + Math.cos(time * 3 + i * 0.15) * 0.25 + 0.4;
          const barHeight = Math.max(10, energy * (height * 0.85));
          const y = height - barHeight;

          const grad = ctx.createLinearGradient(0, y, 0, height);
          grad.addColorStop(0, '#00F0FF');
          grad.addColorStop(0.4, '#10B981');
          grad.addColorStop(1, '#0B0F17');

          ctx.fillStyle = grad;
          ctx.fillRect(x + 1, y, colWidth - 2, barHeight);
        }
      } else if (activeInspector === 'pitch') {
        // Pitch F0 Tracking Contour
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        for (let x = 0; x < width; x += 4) {
          const normX = x / width;
          const f0Y = (height / 2) + Math.sin(normX * 8 + time * 3) * 28 + Math.sin(normX * 18 + time * 5) * 12;
          if (x === 0) ctx.moveTo(x, f0Y);
          else ctx.lineTo(x, f0Y);
        }
        ctx.stroke();

        // Baseline reference
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Voice Activity Detection (VAD) Temporal Blocks
        const segments = 8;
        const segWidth = width / segments;

        for (let s = 0; s < segments; s++) {
          const isSpeech = (s % 3 !== 0);
          const x = s * segWidth;
          const blockH = isSpeech ? height * 0.7 : height * 0.15;
          const y = (height - blockH) / 2;

          ctx.fillStyle = isSpeech ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)';
          ctx.fillRect(x + 2, y, segWidth - 4, blockH);

          if (isSpeech) {
            ctx.strokeStyle = '#00F0FF';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 2, y, segWidth - 4, blockH);
          }
        }
      }

      time += 0.035;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Subtle drift in LUFS meter
    const interval = setInterval(() => {
      setLufsValue(-23.0 + (Math.random() * 0.4 - 0.2));
    }, 2000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [activeInspector]);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-white/5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" /> Audio Signal Telemetry
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span>EBU R128: <strong className="text-emerald-400">{lufsValue.toFixed(1)} LUFS</strong></span>
          <span className="hidden sm:inline">Stream: <strong className="text-slate-200">48kHz / 24-bit</strong></span>
        </div>
      </div>

      {/* Canvas Monitor Area */}
      <div className="relative w-full h-32 sm:h-36 bg-carbon-950 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={580}
          height={144}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-2.5 left-2.5 flex items-center gap-2 px-2.5 py-1 rounded bg-carbon-900/90 border border-white/10 text-[10px] font-mono">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span className="text-slate-300 uppercase tracking-wider">
            {activeInspector === 'spectrogram' ? 'Mel-Filterbank Energies' : activeInspector === 'pitch' ? 'F0 Pitch Trajectory (Hz)' : 'Silero VAD Voice Segments'}
          </span>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 pt-3 border-t border-white/5 font-mono text-xs">
        <div className="flex items-center gap-1 p-1 bg-carbon-900/90 rounded-lg border border-white/5">
          {(
            [
              { id: 'spectrogram', label: 'Spectrogram', icon: Layers },
              { id: 'pitch', label: 'F0 Pitch', icon: Activity },
              { id: 'vad', label: 'VAD Detection', icon: Cpu }
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveInspector(item.id)}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                activeInspector === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          Latency: &lt; 500ms WebRTC
        </div>
      </div>
    </div>
  );
};
