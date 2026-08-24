import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Activity, 
  History, 
  User, 
  Info, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  BookOpen
} from 'lucide-react';


export const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Analyze Skin', path: '/analyze', icon: Activity },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Scan History', path: '/history', icon: History },
    { name: 'Profile Settings', path: '/profile', icon: User },
    { name: 'How It Works', path: '/about', icon: Info },
  ];

  return (
    <aside 
      className={`glass-panel border-r border-clinical-border bg-[#0a0f1d] flex flex-col justify-between transition-all duration-300 z-30 relative ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-clinical-border h-16">
          <div className="flex items-center gap-3 overflow-hidden">
            <Shield className="text-clinical-teal w-8 h-8 shrink-0 animate-pulse" />
            {!collapsed && (
              <span className="font-extrabold text-lg bg-gradient-to-r from-white to-clinical-teal bg-clip-text text-transparent tracking-wide">
                DermoraSense
              </span>
            )}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="text-clinical-slate hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-clinical-blue/20 to-clinical-teal/10 text-clinical-teal border border-clinical-teal/20 shadow-md shadow-clinical-teal/5'
                      : 'text-clinical-slate hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer (User info & Logout) */}
      <div className="p-3 border-t border-clinical-border space-y-3">
        {user && !collapsed && (
          <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
            <div className="w-9 h-9 rounded-full bg-clinical-blue/30 border border-clinical-blue/50 flex items-center justify-center font-bold text-clinical-teal">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-clinical-slate truncate">{user.email}</p>
            </div>
          </div>
        )}

        {collapsed && user && (
          <div className="w-10 h-10 mx-auto rounded-full bg-clinical-blue/30 border border-clinical-blue/50 flex items-center justify-center font-bold text-clinical-teal" title={user.name}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
