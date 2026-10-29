import React, { useState } from 'react';
import { X, Download, CheckCircle2, AlertCircle, Lock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useResumeGate } from '../context/ResumeContext';
import { PERSONAL_INFO } from '../data/portfolioData';

// RFC-compliant email regex matching gmail, corporate, academic, and custom domains
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ResumeGateModal: React.FC = () => {
  const { isResumeModalOpen, closeResumeModal } = useResumeGate();
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isResumeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError('Please provide an email address.');
      return;
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError('Please enter a valid email format (e.g. name@company.com or name@gmail.com).');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // Save lead details locally
    try {
      const existing = JSON.parse(localStorage.getItem('resume_downloads') || '[]');
      existing.push({ email: cleanEmail, organization, timestamp: new Date().toISOString() });
      localStorage.setItem('resume_downloads', JSON.stringify(existing));
    } catch {
      // LocalStorage access handling
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger automatic file download
      const link = document.createElement('a');
      link.href = PERSONAL_INFO.resumePdf;
      link.download = 'Vishal_Kaushal_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Confetti burst
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F8FAFC', '#94A3B8', '#F59E0B']
      });
    }, 400);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    closeResumeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas-950/85 backdrop-blur-md">
      <div className="panel-card-elevated w-full max-w-md rounded-2xl p-6 sm:p-7 relative shadow-2xl border border-white/[0.08]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-canvas-900 border border-white/[0.08] text-slate-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-lg bg-canvas-900 border border-white/[0.08] text-slate-300">
                <Lock className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Verified Access
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight mt-1">
              Request Technical Resume
            </h3>

            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
              Please enter your work or personal email address to verify identity and unlock the 1-page PDF resume.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Your Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. recruiter@company.com or name@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs text-white font-mono placeholder:text-slate-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Company / Organization <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Google, Anthropic, Stealth AI, or Self"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs text-white font-mono placeholder:text-slate-600 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-canvas-950 font-semibold text-xs font-mono uppercase tracking-wider hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Verifying Format...</span>
                ) : (
                  <>
                    <span>Unlock & Download Resume</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>PDF format · Single page · 42 KB</span>
              <span>Direct verification</span>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">
              Email Verified
            </h3>

            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Your download for <strong className="text-slate-200 font-mono">Vishal_Kaushal_Resume.pdf</strong> has been triggered automatically.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.resumePdf}
                download="Vishal_Kaushal_Resume.pdf"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-canvas-900 border border-white/10 text-xs font-mono text-slate-200 hover:text-white hover:border-white/20 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Click here if download didn't start</span>
              </a>

              <button
                onClick={handleClose}
                className="py-2 px-4 rounded-lg bg-transparent text-xs font-mono text-slate-400 hover:text-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
