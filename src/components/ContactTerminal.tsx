import React, { useState } from 'react';
import { Mail, Copy, Check, Send, FileText, Terminal, Shield, MessageSquare, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useResumeGate } from '../context/ResumeContext';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ContactTerminal: React.FC = () => {
  const { openResumeModal } = useResumeGate();
  const [copied, setCopied] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F8FAFC', '#94A3B8', '#F59E0B']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSender = senderEmail.trim();

    if (!cleanSender || !EMAIL_REGEX.test(cleanSender)) {
      setEmailError('Please enter a valid email format (e.g. name@company.com or name@gmail.com).');
      return;
    }

    setEmailError(null);
    setSentSuccess(true);

    // Prepare mailto link with sender's contact details included in body
    const bodyContent = `From: ${cleanSender}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject || 'Inquiry: AI Engineering Collaboration')}&body=${encodeURIComponent(bodyContent)}`;
    
    // Trigger transmission
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSentSuccess(false);
      setSenderEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-tech-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-canvas-900 border border-white/[0.08]">
            <Terminal className="w-3.5 h-3.5" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Connect & Collaborate
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Open to senior applied AI engineering opportunities, speech systems advisory, and technical collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Channels & Verified Badges */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="panel-card-elevated rounded-2xl p-6 sm:p-7 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Direct Communication</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Guaranteed response within 24 hours.
                </p>
              </div>

              {/* Copy Email Box with Privacy Protection */}
              <div className="p-4 rounded-xl bg-canvas-950 border border-white/[0.08] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-canvas-900 text-slate-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Verified Email</span>
                    <span className="text-xs sm:text-sm font-mono text-white font-medium truncate">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-900 hover:bg-canvas-850 border border-white/[0.08] hover:border-white/20 text-slate-300 hover:text-white text-xs font-mono font-medium transition-all"
                  title="Copy verified email"
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

              {/* Status Signals */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-canvas-950/80 border border-white/[0.06] text-slate-400">
                  <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Privacy-hardened direct communication channel</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-canvas-950/80 border border-white/[0.06] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{PERSONAL_INFO.availability}</span>
                </div>
              </div>

              {/* Social profiles & Resume Gate */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06]">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-canvas-900 hover:bg-canvas-850 border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-canvas-900 hover:bg-canvas-850 border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <button
                  onClick={openResumeModal}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs font-mono text-white transition-all"
                >
                  <FileText className="w-4 h-4 text-slate-300" />
                  <span>Request Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Dispatch Terminal with Validation */}
          <div className="lg:col-span-7">
            <div className="panel-card-elevated rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <span className="font-mono text-xs text-slate-400 ml-2">direct_dispatch.sh</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> SECURE DISPATCH
                </span>
              </div>

              {emailError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2 font-mono">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{emailError}</span>
                </div>
              )}

              {sentSuccess && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-2 font-mono">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Message dispatched to email client with validated sender address.</span>
                </div>
              )}

              <form onSubmit={handleSendMail} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Your Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => {
                      setSenderEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="e.g. yourname@company.com or name@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-canvas-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs text-white font-mono placeholder:text-slate-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Subject / Discussion Scope
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. AI Engineering Opportunity / Speech AI Advisory"
                    className="w-full px-4 py-2.5 rounded-xl bg-canvas-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs text-white font-mono placeholder:text-slate-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your team, technical problem, or role scope..."
                    className="w-full px-4 py-2.5 rounded-xl bg-canvas-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs text-white font-mono placeholder:text-slate-600 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-canvas-950 font-bold text-xs uppercase tracking-wider font-mono hover:bg-slate-200 transition-all"
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
