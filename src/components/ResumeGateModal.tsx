import React, { useState } from 'react';
import { X, Download, CheckCircle2, AlertCircle, Lock, ArrowRight, User, Mail, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useResumeGate } from '../context/ResumeContext';
import { PERSONAL_INFO } from '../data/portfolioData';

// RFC-compliant email regex verifying format (e.g. name@gmail.com, user@domain.co)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ResumeGateModal: React.FC = () => {
  const { isResumeModalOpen, closeResumeModal } = useResumeGate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isResumeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanEmail = email.trim();

    // 1. Validate Name
    if (!cleanName || cleanName.length < 2) {
      setError('Please provide your full name (at least 2 characters).');
      return;
    }

    // 2. Validate Email Format
    if (!cleanEmail) {
      setError('Please provide your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError('Please enter a valid email address format (e.g. name@gmail.com or name@company.com).');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // Save verified lead details locally
    try {
      const existing = JSON.parse(localStorage.getItem('resume_leads') || '[]');
      existing.push({
        name: cleanName,
        email: cleanEmail,
        organization: organization.trim() || 'Not specified',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('resume_leads', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
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
        particleCount: 65,
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
                Verified Download Gate
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight mt-1">
              Download Technical Resume
            </h3>

            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
              Please enter your full name and email address below to unlock and download Vishal's verified 1-page engineering resume.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Asking for Name & Email */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              {/* Full Name Field */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-slate-400 mb-1">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Full Name</span>
                  <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. Sarah Jenkins or Alex Chen"
                  className="w-full px-3.5 py-2 rounded-lg bg-canvas-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs text-white font-mono placeholder:text-slate-600 transition-all"
                />
              </div>

              {/* Email Address Field */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-slate-400 mb-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Email Address</span>
                  <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. sarah@company.com or alex@gmail.com"
                  className="w-full px-3.5 py-2 rounded-lg bg-canvas-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs text-white font-mono placeholder:text-slate-600 transition-all"
                />
              </div>

              {/* Optional Company / Role */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-slate-400 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Company / Organization</span>
                  <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Google, Anthropic, Scale AI, or Independent"
                  className="w-full px-3.5 py-2 rounded-lg bg-canvas-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs text-white font-mono placeholder:text-slate-600 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-canvas-950 font-semibold text-xs font-mono uppercase tracking-wider hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Submit & Download Resume</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>PDF format · Single page · 42 KB</span>
              <span>Instant direct unlock</span>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">
              Access Granted, {fullName}
            </h3>

            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto font-sans">
              Your download for <strong className="text-slate-200 font-mono">Vishal_Kaushal_Resume.pdf</strong> has been initiated.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.resumePdf}
                download="Vishal_Kaushal_Resume.pdf"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-canvas-900 border border-white/10 text-xs font-mono text-slate-200 hover:text-white hover:border-white/20 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Click to re-download</span>
              </a>

              <button
                onClick={handleClose}
                className="py-2 px-4 rounded-lg bg-transparent text-xs font-mono text-slate-400 hover:text-slate-200"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
