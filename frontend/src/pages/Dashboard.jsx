import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, ShieldAlert, BarChart3, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { TableSkeleton } from '../components/SkeletonLoader';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/scans/history', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setScans(data);
        }
      } catch (err) {
        console.error('Failed to load dashboard scans:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Compute metrics
  const totalScans = scans.length;
  const highSeverityScans = scans.filter(s => s.severity === 'high').length;
  
  const avgConfidence = totalScans > 0 
    ? scans.reduce((acc, curr) => acc + curr.confidence, 0) / totalScans 
    : 0;

  const mostCommonFinding = totalScans > 0 
    ? [...scans].reduce((acc, curr) => {
        acc[curr.prediction] = (acc[curr.prediction] || 0) + 1;
        return acc;
      }, {})
    : {};

  const topFindingName = Object.keys(mostCommonFinding).length > 0 
    ? Object.keys(mostCommonFinding).reduce((a, b) => mostCommonFinding[a] > mostCommonFinding[b] ? a : b)
    : "No scans recorded";

  const getSeverityColor = (sev) => {
    if (sev === 'high') return 'text-red-400 bg-red-500/10 border-red-500/20';
    if (sev === 'moderate') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  };

  return (
    <div className="space-y-6 page-enter page-enter-active">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute inset-0 bg-gradient-to-r from-clinical-blue/10 to-clinical-teal/5 opacity-50 z-0"></div>
        <div className="space-y-2 z-10 relative">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, <span className="bg-gradient-to-r from-white to-clinical-teal bg-clip-text text-transparent">{user?.name}</span>
          </h1>
          <p className="text-sm text-clinical-slate max-w-xl">
            Analyze dermora-photographs with our advanced clinical-grade deep learning diagnostics platform.
          </p>
        </div>

      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-clinical-teal/10 border border-clinical-teal/20 rounded-xl flex items-center justify-center text-clinical-teal">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Total Scans</p>
            <h3 className="text-2xl font-black text-white mt-1">{totalScans}</h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-clinical-slate uppercase tracking-wider">High Concern</p>
            <h3 className="text-2xl font-black text-white mt-1">{highSeverityScans}</h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-clinical-blue/10 border border-clinical-blue/20 rounded-xl flex items-center justify-center text-clinical-blue">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Avg Confidence</p>
            <h3 className="text-2xl font-black text-white mt-1">
              {totalScans > 0 ? `${(avgConfidence * 100).toFixed(1)}%` : 'N/A'}
            </h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Primary Finding</p>
            <h3 className="text-sm font-black text-white mt-1.5 truncate max-w-[160px] md:max-w-none" title={topFindingName}>
              {topFindingName}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Scan History */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="text-clinical-teal w-4.5 h-4.5" />
              Recent Diagnostics History
            </h2>
            {totalScans > 3 && (
              <button 
                onClick={() => navigate('/history')}
                className="text-xs font-bold text-clinical-teal hover:underline"
              >
                View all history
              </button>
            )}
          </div>

          {loading ? (
            <TableSkeleton />
          ) : totalScans === 0 ? (
            <div className="glass-panel p-8 text-center rounded-2xl flex flex-col items-center justify-center border border-dashed border-clinical-border min-h-[250px]">
              <AlertTriangle className="w-8 h-8 text-clinical-slate/40 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No scan history found</h3>
              <p className="text-xs text-clinical-slate max-w-sm mb-4">
                You haven't run any dermatological analyses yet. Upload an image to screen for potential skin conditions.
              </p>

            </div>
          ) : (
            <div className="space-y-3">
              {scans.slice(0, 3).map((scan) => (
                <div
                  key={scan.id}
                  onClick={() => navigate('/analyze', { state: { scanId: scan.id } })}
                  className="glass-panel p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/5 border border-clinical-border hover:border-clinical-teal/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:8000${scan.image_url}`}
                      alt={scan.prediction}
                      className="w-14 h-14 rounded-lg object-cover border border-clinical-border group-hover:border-clinical-teal/30 transition-all shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-white group-hover:text-clinical-teal transition-all truncate">
                        {scan.prediction}
                      </h4>
                      <p className="text-[11px] text-clinical-slate mt-0.5">{scan.timestamp}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-bold text-white">{(scan.confidence * 100).toFixed(1)}%</span>
                      <p className="text-[9px] text-clinical-slate">Confidence</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border tracking-wide uppercase ${getSeverityColor(scan.severity)}`}>
                      {scan.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Explainer Side Panel */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h3 className="text-md font-bold text-white border-b border-clinical-border pb-2.5">
              Clinician Guidelines
            </h3>
            <ul className="space-y-3 text-xs leading-relaxed text-clinical-slate">
              <li className="flex gap-2">
                <span className="text-clinical-teal font-bold shrink-0">&bull;</span>
                <span><strong>Clear Lighting:</strong> Position the skin lesion in neutral, bright daylight. Avoid heavy shadows or yellow spotlighting.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-clinical-teal font-bold shrink-0">&bull;</span>
                <span><strong>Sharp Focus:</strong> Center the camera and focus directly on the target region. Blurry images reduce network prediction confidence.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-clinical-teal font-bold shrink-0">&bull;</span>
                <span><strong>Grad-CAM:</strong> Review the attention overlay. Ensure the model focuses on the lesion, not surrounding hair or ruler scales.</span>
              </li>
            </ul>
          </div>

          <div className="bg-clinical-teal/5 border border-clinical-teal/15 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-clinical-teal uppercase tracking-wider mb-1">Clinical Disclaimer</h4>
            <p className="text-[10px] text-clinical-slate leading-relaxed">
              This screening environment is designed for educational and informational support. It does not provide medical diagnoses or replace a qualified doctor's visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
