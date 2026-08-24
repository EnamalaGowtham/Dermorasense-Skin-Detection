import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ShieldAlert, CheckCircle2, Shield, Key } from 'lucide-react';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const emailLower = email.toLowerCase();
    if (!emailLower.endsWith('@gmail.com') && !emailLower.endsWith('@email.com')) {
      setError("Email address must end with @gmail.com or @email.com.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || "A 6-digit verification code has been sent.");
        setStep('otp');
      } else {
        let errMsg = data.detail || 'Request failed';
        if (errMsg.includes("SMTP credentials missing")) {
          errMsg = "SMTP Configuration Missing: Please configure your backend .env file.";
        } else if (errMsg.includes("Invalid App Password") || errMsg.includes("SMTP Authentication Error")) {
          errMsg = "Invalid SMTP Credentials: Check your Google App Password.";
        } else if (errMsg.includes("Connection refused") || errMsg.includes("Timeout")) {
          errMsg = "Network Error: Could not connect to SMTP server.";
        }
        setError(errMsg);
      }
    } catch (err) {
      setError('Connection to backend failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/auth/verify-reset-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("OTP verified! Redirecting to password reset...");
        setTimeout(() => {
            navigate(`/reset-password?token=${encodeURIComponent(data.reset_token)}`);
        }, 1500);
      } else {
        setError(data.detail || 'OTP Verification failed');
      }
    } catch (err) {
      setError('Connection to backend failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-clinical-blue/5 to-clinical-teal/5 opacity-50 z-0"></div>
      
      <div className="relative max-w-md w-full glass-panel p-8 rounded-3xl z-10 border border-clinical-border space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Shield className="text-clinical-teal w-12 h-12 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            Forgot Password
          </h2>
          <p className="text-xs text-clinical-slate">
            {step === 'email' ? 'Enter your email to obtain a security reset link' : 'Enter the 6-digit OTP sent to your email'}
          </p>
        </div>

        {success && (
          <div className="flex items-start gap-2.5 text-xs text-emerald-400 bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20 leading-relaxed">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Success</strong>
              <span className="opacity-90">{success}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-3.5 rounded-xl border border-red-500/20">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white font-bold rounded-xl text-sm tracking-wide shadow-lg shadow-clinical-teal/10 hover:shadow-clinical-teal/20 transition-all active:scale-98 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">6-Digit OTP</label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all text-center tracking-widest font-bold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white font-bold rounded-xl text-sm tracking-wide shadow-lg shadow-clinical-teal/10 hover:shadow-clinical-teal/20 transition-all active:scale-98 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <p className="text-xs text-clinical-slate">
            Remembered your credentials?{' '}
            <Link to="/login" className="font-bold text-clinical-teal hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
