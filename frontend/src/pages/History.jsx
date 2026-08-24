import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Search, AlertCircle, Calendar, ShieldCheck, Eye, RefreshCw, FileText, Trash2 } from 'lucide-react';
import { TableSkeleton } from '../components/SkeletonLoader';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/scans/history', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setScans(data);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScan = async (scanId) => {
    if (!window.confirm("Are you sure you want to delete this scan from your history? This action cannot be undone.")) {
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:8000/api/scans/${scanId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setScans(prev => prev.filter(s => s.id !== scanId));
      } else {
        const data = await res.json();
        alert(data.detail || "Failed to delete the scan.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getSeverityBadge = (sev) => {
    if (sev === 'high') {
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
    if (sev === 'moderate') {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  };

  // Filter items
  const filteredScans = scans.filter((s) => {
    const matchesSearch = s.prediction.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || s.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6 page-enter page-enter-active">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <History className="text-clinical-teal w-6 h-6" />
          <div>
            <h1 className="text-2xl font-bold text-white">Scan Records</h1>
            <p className="text-xs text-clinical-slate mt-0.5">Browse past diagnostic evaluations</p>
          </div>
        </div>

        <button
          onClick={fetchHistory}
          className="self-start flex items-center gap-2 px-4 py-2 bg-clinical-card border border-clinical-border text-clinical-slate hover:text-white rounded-xl text-xs font-semibold transition-all active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh List
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3 top-3 text-clinical-slate w-4 h-4" />
          <input
            type="text"
            placeholder="Search by predicted condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white placeholder-clinical-slate/60 focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all"
          />
        </div>

        {/* Severity filter */}
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-4 py-2.5 bg-[#090e1c] border border-clinical-border rounded-xl text-white focus:outline-none focus:border-clinical-teal focus:ring-1 focus:ring-clinical-teal/30 text-sm transition-all cursor-pointer"
        >
          <option value="all">All Severities</option>
          <option value="high">High Concern</option>
          <option value="moderate">Moderate Concern</option>
          <option value="low">Low Concern / Healthy</option>
        </select>
      </div>

      {/* Main List */}
      {loading ? (
        <TableSkeleton />
      ) : filteredScans.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl border border-dashed border-clinical-border flex flex-col items-center justify-center">
          <AlertCircle className="w-8 h-8 text-clinical-slate/40 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No scan records match</h3>
          <p className="text-xs text-clinical-slate max-w-sm">
            {scans.length === 0 
              ? "You haven't run any analyses yet." 
              : "Try altering your keyword query or severity filter definitions."}
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden border border-clinical-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-clinical-border bg-[#0d1423]/50 text-clinical-slate font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Lesion Photo</th>
                  <th className="p-4">Predicted Condition</th>
                  <th className="p-4">Confidence</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Analysis Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clinical-border">
                {filteredScans.map((scan) => (
                  <tr 
                    key={scan.id}
                    className="hover:bg-[#111a2f]/40 transition-colors group cursor-pointer"
                    onClick={() => navigate('/analyze', { state: { scanId: scan.id } })}
                  >
                    <td className="p-4 shrink-0">
                      <img
                        src={`http://localhost:8000${scan.image_url}`}
                        alt={scan.prediction}
                        className="w-12 h-12 rounded-lg object-cover border border-clinical-border group-hover:border-clinical-teal/30 transition-all"
                      />
                    </td>
                    <td className="p-4 font-bold text-white group-hover:text-clinical-teal transition-all">
                      {scan.prediction}
                    </td>
                    <td className="p-4 font-medium text-white">
                      {(scan.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide ${getSeverityBadge(scan.severity)}`}>
                        {scan.severity}
                      </span>
                    </td>
                    <td className="p-4 text-clinical-slate flex items-center gap-1.5 mt-4">
                      <Calendar className="w-3.5 h-3.5 text-clinical-slate/60" />
                      {scan.timestamp}
                    </td>
                    <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => navigate('/analyze', { state: { scanId: scan.id } })}
                          className="flex items-center gap-1 text-xs text-clinical-teal hover:underline"
                          title="Open Case File"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                        <a
                          href={`http://localhost:8000/api/scans/${scan.id}/report`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-clinical-blue hover:underline"
                          title="Download PDF"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF Report</span>
                        </a>
                        <button
                          onClick={() => handleDeleteScan(scan.id)}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 hover:underline"
                          title="Delete Scan Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
