import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, ShieldAlert, CheckCircle2, Shield } from 'lucide-react';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [verificationToken, setVerificationToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Verification states
  const [showVerification, setShowVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);

  // Password Strength Calculator
  const getPasswordStrength = (pw) => {
    let score = 0;
    if (!pw) return { score, label: "None", color: "bg-gray-700" };
    
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    switch (score) {
      case 1:
        return { score, label: "Weak", color: "bg-red-500", text: "text-red-400" };
      case 2:
        return { score, label: "Fair", color: "bg-amber-500", text: "text-amber-400" };
      case 3:
        return { score, label: "Good", color: "bg-yellow-500", text: "text-yellow-400" };
      case 4:
        return { score, label: "Strong", color: "bg-emerald-500", text: "text-emerald-400" };
      default:
        return { score: 0, label: "Very Weak", color: "bg-red-500/50", text: "text-red-500/80" };
    }
  };

  const strength = getPasswordStrength(password);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (!email) {
      setError("Please enter an email address.");
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
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!validateForm()) return;

    setLoading(true);
    const targetEmail = email;
    const res = await register(name, email, password);
    if (res.success) {
      setSuccessMsg(res.message);
      setVerificationToken(res.token);
      setRegisteredEmail(targetEmail);
      setShowVerification(true);
      // Clear forms
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!otp.trim() || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setVerificationLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail, otp: otp.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Verification successful! Redirecting to login page...");
        setTimeout(() => {
          navigate('/login?verified=true');
        }, 1500);
      } else {
        setError(data.detail || "Verification failed.");
      }
    } catch (err) {
      setError("Failed to connect to the verification server.");
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch('http://localhost:8000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message);
      } else {
        setError(data.detail || "Resend failed.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-clinical-blue/5 to-clinical-teal/5 opacity-50 z-0"></div>
      
      <div className="relative max-w-md w-full glass-panel p-8 rounded-3xl z-10 border border-clinical-border space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Shield className="text-clinical-teal w-12 h-12 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            Create Case File
          </h2>
          <p className="text-xs text-clinical-slate">
            Register a patient credentials on DermoraSense
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="flex flex-col gap-3 text-xs text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Registration Successful</strong>
                <span className="opacity-90">{successMsg}</span>
              </div>
            </div>
            {verificationToken && (
              <div className="pt-2.5 border-t border-emerald-500/15 mt-1">
                <p className="text-[11px] text-clinical-slate mb-1">
                  <strong>PROTOTYPE MODE:</strong> Simulated OTP is:
                </p>
                <code className="text-emerald-400 font-mono font-bold bg-black/40 px-2 py-1 rounded border border-emerald-500/20 block text-center text-sm tracking-wider">
                  {verificationToken}
                </code>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-3.5 rounded-xl border border-red-500/20">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        {showVerification ? (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Verification Code</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={verificationLoading}
              className="w-full py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal disabled:from-clinical-blue/50 disabled:to-clinical-teal/50 text-white rounded-xl text-xs font-bold shadow-lg hover:shadow-clinical-teal/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-1.5"
            >
              {verificationLoading ? 'Verifying Code...' : 'Verify OTP Code'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-xs text-clinical-teal hover:underline font-semibold"
              >
                Resend OTP Code
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Patient Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
                <input
                  type="text"
                  placeholder="Gowtham Enamala"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
                <input
                  type="email"
                  placeholder="patient@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                  required
                />
              </div>
              
              {/* Strength Meter indicator */}
              {password && (
                <div className="space-y-1.5 pt-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-clinical-slate font-medium">Password Strength:</span>
                    <span className={`font-bold uppercase ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${strength.color}`} 
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white font-bold rounded-xl text-sm tracking-wide shadow-lg shadow-clinical-teal/10 hover:shadow-clinical-teal/20 transition-all active:scale-98 disabled:opacity-50"
            >
              {loading ? 'Initializing Record...' : 'Register Patient'}
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <p className="text-xs text-clinical-slate">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-clinical-teal hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
