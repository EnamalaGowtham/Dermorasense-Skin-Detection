import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserCheck } from 'lucide-react';

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="glass-panel border-b border-clinical-border bg-[#0a0f1d]/50 flex items-center justify-between px-6 h-16 w-full shrink-0">
      <div>
        <h2 className="text-sm font-semibold text-clinical-slate flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-clinical-teal" />
          Clinical AI Diagnostic Environment
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-semibold text-clinical-slate">
              Active Session:
            </span>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg">
              <UserCheck className="w-3.5 h-3.5 text-clinical-teal" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {user.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
