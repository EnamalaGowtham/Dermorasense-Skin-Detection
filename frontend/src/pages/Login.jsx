import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ShieldAlert, CheckCircle2, Shield, Eye, EyeOff } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  // Check if redirecting from verification link
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get('verified');
    if (verified === 'true') {
      setVerificationStatus('success');
      // Trigger a confetti pop on successful verification!
      canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (verified === 'false') {
      setVerificationStatus('error');
    }
  }, [location]);

  // Client-side validations
  const validateForm = () => {
    if (!email) {
      setError("Email address is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    const emailLower = email.toLowerCase();
    if (!emailLower.endsWith('@gmail.com') && !emailLower.endsWith('@email.com')) {
      setError("Email address must end with @gmail.com or @email.com.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVerificationStatus(null);

    if (!validateForm()) return;

    setLoading(true);
    const res = await login(email, password);
    if (res.success) {
      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
      } else {
        localStorage.removeItem('remembered_email');
      }
      navigate('/');
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  // Populate remembered email on mount
  useEffect(() => {
    const remembered = localStorage.getItem('remembered_email');
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#080a0f] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-clinical-blue/5 to-clinical-teal/5 opacity-50 z-0"></div>
      
      <div className="relative max-w-md w-full glass-panel p-8 rounded-3xl z-10 border border-clinical-border space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Shield className="text-clinical-teal w-12 h-12 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            DermoraSense
          </h2>
          <p className="text-xs text-clinical-slate">
            Clinical AI Dermatology Screening Portal
          </p>
        </div>

        {/* Email Verification Alerts */}
        {verificationStatus === 'success' && (
          <div className="flex items-start gap-2.5 text-xs text-emerald-400 bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Email Verified</strong>
              <span className="opacity-90">Your account is active. You can now log in below.</span>
            </div>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="flex items-start gap-2.5 text-xs text-red-400 bg-red-500/10 p-3.5 rounded-xl border border-red-500/20">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Verification Failed</strong>
              <span className="opacity-90">The verification token was invalid or expired.</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-3.5 rounded-xl border border-red-500/20">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Password</label>
              <Link 
                to="/forgot-password" 
                className="text-[11px] font-semibold text-clinical-teal hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-clinical-slate hover:text-clinical-teal transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-clinical-border bg-[#090e1c] text-clinical-teal focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 text-xs text-clinical-slate cursor-pointer select-none">
              Remember my email address
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white font-bold rounded-xl text-sm tracking-wide shadow-lg shadow-clinical-teal/10 hover:shadow-clinical-teal/20 transition-all active:scale-98 disabled:opacity-50"
          >
            {loading ? 'Verifying Session...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-clinical-slate">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-clinical-teal hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
