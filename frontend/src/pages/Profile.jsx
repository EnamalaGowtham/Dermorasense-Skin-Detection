import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, ShieldAlert, Lock, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  // Profile details state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileErr, setProfileErr] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passMsg, setPassMsg] = useState(null);
  const [passErr, setPassErr] = useState(null);
  const [passLoading, setPassLoading] = useState(false);

  // Deletion modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const emailLower = email.toLowerCase();
    if (!emailLower.endsWith('@gmail.com') && !emailLower.endsWith('@email.com')) {
      setProfileErr("Email address must end with @gmail.com or @email.com.");
      return;
    }

    setProfileLoading(true);
    setProfileMsg(null);
    setProfileErr(null);

    const res = await updateProfile(name, email);
    if (res.success) {
      setProfileMsg('Profile information updated successfully.');
    } else {
      setProfileErr(res.error);
    }
    setProfileLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassMsg(null);
    setPassErr(null);

    if (newPassword !== confirmPassword) {
      setPassErr("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPassErr("New password must be at least 8 characters long.");
      return;
    }

    setPassLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/profile/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setPassMsg('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPassErr(data.detail || 'Failed to change password.');
      }
    } catch (err) {
      setPassErr('Connection failed.');
    } finally {
      setPassLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.toLowerCase() !== 'delete account') {
      alert("Please enter the confirmation text correctly.");
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/profile/delete', {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        await logout();
        navigate('/login');
      } else {
        alert("Failed to delete account.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to server.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto page-enter page-enter-active">
      <div className="flex items-center gap-3">
        <User className="text-clinical-teal w-6 h-6" />
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Update Profile Details */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-md font-bold text-white flex items-center gap-2 border-b border-clinical-border pb-2.5">
            <User className="w-4 h-4 text-clinical-teal" />
            Account Details
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-clinical-slate">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-clinical-slate">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                required
              />
            </div>

            {profileMsg && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{profileMsg}</span>
              </div>
            )}

            {profileErr && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{profileErr}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full py-2.5 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-clinical-teal/20 transition-all disabled:opacity-50"
            >
              {profileLoading ? 'Saving...' : 'Save Profile Details'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-md font-bold text-white flex items-center gap-2 border-b border-clinical-border pb-2.5">
            <Lock className="w-4 h-4 text-clinical-teal" />
            Security Password Change
          </h3>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-clinical-slate">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-clinical-slate">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-clinical-slate">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
                required
              />
            </div>

            {passMsg && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passMsg}</span>
              </div>
            )}

            {passErr && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{passErr}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={passLoading}
              className="w-full py-2.5 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-clinical-teal/20 transition-all disabled:opacity-50"
            >
              {passLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/20 bg-red-950/5 space-y-4">
        <h3 className="text-md font-bold text-red-400 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-xs text-clinical-slate leading-relaxed">
          Deleting your profile is irreversible. Doing so deletes your name, email, credentials, and all recorded skin scans, including their diagnostic heatmaps and PDF reports.
        </p>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white rounded-xl text-sm font-bold transition-all active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-md w-full border border-red-500/30 bg-[#0c0d16] space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-red-400 w-5 h-5" />
              Confirm Account Deletion
            </h3>
            
            <p className="text-xs text-clinical-slate leading-relaxed">
              This action is permanent and cannot be undone. To verify, please type <strong className="text-white">"delete account"</strong> below.
            </p>

            <input
              type="text"
              placeholder='Type "delete account"...'
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#090e1c] border border-red-500/20 focus:border-red-500 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-red-500/20 text-sm transition-all"
            />

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="px-4 py-2 text-xs font-semibold text-clinical-slate hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText.toLowerCase() !== 'delete account' || deleteLoading}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl disabled:opacity-50 transition-all shadow-lg hover:shadow-red-600/30"
              >
                {deleteLoading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
