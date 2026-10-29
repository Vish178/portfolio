import React, { useEffect, useRef, useState } from 'react';
import { Square, Activity, Radio, Volume2 } from 'lucide-react';

export const AudioWaveformVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [preset, setPreset] = useState<'speech' | 'synth' | 'whisper'>('speech');
  const [activeF0, setActiveF0] = useState(142); // Simulated pitch F0 in Hz
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 20; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw middle zero-line
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const barCount = 48;
      const barWidth = (width / barCount) * 0.7;
      const gap = (width / barCount) * 0.3;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + gap) + gap / 2;
        const normalizedIndex = i / barCount;

        // Formant simulation based on preset
        let amplitude = 0.2;
        if (preset === 'speech') {
          // Double formant peak simulation (vocal tract resonance)
          const f1 = Math.exp(-Math.pow((normalizedIndex - 0.25) * 6, 2));
          const f2 = Math.exp(-Math.pow((normalizedIndex - 0.65) * 8, 2));
          amplitude = (f1 * 0.7 + f2 * 0.5) * (isPlaying ? 1.0 : 0.6);
        } else if (preset === 'synth') {
          amplitude = Math.sin(normalizedIndex * Math.PI * 4 + phase * 2) * 0.4 + 0.5;
        } else {
          amplitude = Math.random() * 0.5 + 0.2;
        }

        const dynamicFactor = isPlaying ? 0.35 * Math.sin(phase * 4 + i * 0.5) : 0.1 * Math.sin(phase * 1.5 + i * 0.2);
        const barHeight = Math.max(6, (amplitude + dynamicFactor) * (height * 0.75));
        const y = (height - barHeight) / 2;

        // Gradient colors: Cyan to Emerald to Blue
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isPlaying) {
          gradient.addColorStop(0, '#00F0FF');
          gradient.addColorStop(0.5, '#10B981');
          gradient.addColorStop(1, '#0284C7');
        } else {
          gradient.addColorStop(0, 'rgba(0, 240, 255, 0.5)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.2)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        // Rounded bar cap
        ctx.roundRect(x, y, barWidth, barHeight, 3);
        ctx.fill();

        // Little highlight glow peak
        if (isPlaying && i % 4 === 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(x + barWidth / 2, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      phase += isPlaying ? 0.08 : 0.025;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, preset]);

  // Audio synthesis trigger
  const togglePlayAudio = () => {
    if (isPlaying) {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      setIsPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm harmonic tone
        osc.type = preset === 'synth' ? 'triangle' : 'sine';
        const targetFreq = preset === 'speech' ? 145 : preset === 'whisper' ? 220 : 196;
        osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);
        setActiveF0(targetFreq);

        // Soft, safe non-jarring volume envelope
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlaying(true);
      } catch (err) {
        console.warn("AudioContext init prevented:", err);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" /> Neural Acoustic Synthesizer
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="text-slate-600">F0:</span> <strong className="text-cyan-300">{activeF0} Hz</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-slate-600">Sample:</span> <strong className="text-emerald-400">48 kHz</strong>
          </span>
          <span className="flex items-center gap-1 hidden sm:inline-flex">
            <span className="text-slate-600">Target:</span> <strong className="text-slate-200">-23 LUFS</strong>
          </span>
        </div>
      </div>

      {/* Canvas container */}
      <div className="relative w-full h-32 sm:h-40 bg-carbon-950/80 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={160}
          className="w-full h-full object-cover"
        />

        {/* Dynamic status pill inside canvas */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-carbon-900/90 border border-white/10 text-[11px] font-mono">
          <Activity className={`w-3 h-3 ${isPlaying ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
          <span className="text-slate-300">
            {isPlaying ? 'Live Stream Active (PCM 16-bit)' : 'Signal Monitor Standby'}
          </span>
        </div>
      </div>

      {/* Control console */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3.5 pt-3 border-t border-white/5">
        {/* Presets */}
        <div className="flex items-center gap-1.5 p-1 bg-carbon-900/90 rounded-lg border border-white/5 text-xs font-mono">
          {(['speech', 'synth', 'whisper'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPreset(p);
                if (p === 'speech') setActiveF0(145);
                if (p === 'whisper') setActiveF0(220);
                if (p === 'synth') setActiveF0(196);
              }}
              className={`px-2.5 py-1 rounded capitalize transition-all ${
                preset === p
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Audio test button */}
        <button
          onClick={togglePlayAudio}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-all ${
            isPlaying
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-glow-emerald'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" /> Stop Audio Signal
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" /> Play Tone Preview
            </>
          )}
        </button>
      </div>
    </div>
  );
};
