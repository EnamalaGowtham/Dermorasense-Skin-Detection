import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, CheckCircle2, Shield } from 'lucide-react';

export const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tok = params.get('token'); 
    if (tok) {
      setToken(tok);
    } else {
      setError("Reset token is missing in URL parameters. Please restart the forgot password flow.");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reset_token: token, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Password updated successfully. Redirecting to login page...");
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.detail || 'Reset failed');
      }
    } catch (err) {
      setError('Connection to backend failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-clinical-blue/5 to-clinical-teal/5 opacity-50 z-0"></div>
      
      <div className="relative max-w-md w-full glass-panel p-8 rounded-3xl z-10 border border-clinical-border space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Shield className="text-clinical-teal w-12 h-12 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            Reset Password
          </h2>
          <p className="text-xs text-clinical-slate">
            Provide a new password for your account
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
              <input
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                required
                disabled={!token || success}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-clinical-slate w-4 h-4" />
              <input
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/40 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                required
                disabled={!token || success}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !token || success}
            className="w-full py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white font-bold rounded-xl text-sm tracking-wide shadow-lg shadow-clinical-teal/10 hover:shadow-clinical-teal/20 transition-all active:scale-98 disabled:opacity-50"
          >
            {loading ? 'Saving new password...' : 'Update Password'}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/login" className="font-bold text-clinical-teal hover:underline text-xs">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
