import React, { useState } from 'react';
import { Mail, Copy, Check, Send, FileText, Phone, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactTerminal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00F0FF', '#10B981', '#38BDF8']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject || 'Inquiry: AI Engineering Collaboration')}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>Direct Signal & Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Impactful
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Whether you are building next-generation Speech AI, scaling low-latency systems, or exploring engineering opportunities, my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Connect Card & Monospace Spec */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Direct Channels</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Guaranteed response within 24 hours.
                </p>
              </div>

              {/* Copy Email Box */}
              <div className="p-4 rounded-xl bg-carbon-900 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-carbon-850 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-[10px] uppercase font-mono text-slate-500">Email Address</span>
                    <span className="text-xs sm:text-sm font-mono text-white font-medium truncate">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium transition-all"
                  title="Copy to Clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone & Location Info */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-carbon-900/60 border border-white/5 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-carbon-900/60 border border-white/5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>{PERSONAL_INFO.availability}</span>
                </div>
              </div>

              {/* Social profiles & Resume */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-carbon-800 border border-white/10 text-xs font-mono text-slate-200 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-carbon-850 hover:bg-carbon-800 border border-white/10 text-xs font-mono text-cyan-300 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    confetti({ particleCount: 30, spread: 50, origin: { y: 0.9 } });
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/35 text-xs font-mono text-cyan-300 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>1-Page PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Terminal */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-slate-400 ml-2">sys_dispatch_message.sh</span>
                </div>
                <span className="font-mono text-[11px] text-cyan-400">READY</span>
              </div>

              <form onSubmit={handleSendMail} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. AI Engineering Role / Speech AI Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-carbon-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white font-mono placeholder:text-slate-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your team, challenge, or project..."
                    className="w-full px-4 py-2.5 rounded-xl bg-carbon-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white font-mono placeholder:text-slate-600 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono hover:opacity-95 transition-all shadow-glow-cyan"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Email to Vishal</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
