import React, { useState, useEffect } from 'react';
import { ChevronLeft, Activity, Image as ImageIcon, ShieldAlert, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiFetch, SERVER_URL } from '../../services/apiService';

export const LearnResult = () => {
  const navigate = useNavigate();
  const [latestScan, setLatestScan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestScan = async () => {
      try {
        const data = await apiFetch('/scans/history');
        if (data && data.length > 0) {
          setLatestScan(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch latest scan", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestScan();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto pb-20 flex flex-col items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-clinical-teal/30 border-t-clinical-teal rounded-full animate-spin mb-4"></div>
        <p className="text-clinical-slate animate-pulse">Loading latest scan data...</p>
      </div>
    );
  }

  if (!latestScan) {
    return (
      <div className="max-w-4xl mx-auto pb-20 text-center pt-20">
        <button 
          onClick={() => navigate('/learn')}
          className="flex items-center text-clinical-slate hover:text-white mb-6 transition-colors mx-auto"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Learning Hub
        </button>
        <Activity className="w-16 h-16 text-clinical-slate mx-auto mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-white mb-2">No Analysis Found</h2>
        <p className="text-clinical-slate mb-8">You haven't run any dermatological analyses yet.</p>
        <button 
          onClick={() => navigate('/analyze')}
          className="px-6 py-3 bg-clinical-teal text-black font-bold rounded-xl hover:bg-clinical-teal/90 transition-all"
        >
          Analyze Your Skin
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => navigate('/learn')}
        className="flex items-center text-clinical-slate hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Learning Hub
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learn About Your Result</h1>
        <p className="text-clinical-slate">AI Explainability for your latest analysis: <span className="text-clinical-teal font-semibold">{latestScan.prediction}</span></p>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex items-start gap-3 mb-8">
        <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
        <p className="text-sm text-orange-200">
          <strong>AI Explainability Disclaimer:</strong> Grad-CAM highlights the regions of the image that the AI focused on to make its prediction. This is an exploratory tool and <em>not</em> a medical diagnostic explanation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Original Image */}
        <div className="glass-panel p-4 rounded-2xl border border-clinical-border">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-clinical-slate" />
            <h3 className="font-bold text-white">Original Image</h3>
          </div>
          <div className="aspect-square rounded-xl overflow-hidden bg-[#111a2f]">
            {latestScan.image_url ? (
              <img 
                src={`${SERVER_URL}${latestScan.image_url}`} 
                alt="Original scan" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <ImageIcon className="w-12 h-12 text-clinical-slate mb-4 opacity-50" />
                <p className="text-clinical-slate">Original image is unavailable.</p>
              </div>
            )}
          </div>
        </div>

        {/* Grad-CAM Image */}
        <div className="glass-panel p-4 rounded-2xl border border-clinical-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-clinical-teal/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <Cpu className="w-5 h-5 text-clinical-teal" />
            <h3 className="font-bold text-white">Grad-CAM Visualization</h3>
          </div>
          
          <div className="aspect-square rounded-xl overflow-hidden bg-[#111a2f] relative z-10">
            {latestScan.gradcam_url ? (
              <img 
                src={`${SERVER_URL}${latestScan.gradcam_url}`} 
                alt="Grad-CAM Visualization" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <ShieldAlert className="w-12 h-12 text-clinical-slate mb-4 opacity-50" />
                <p className="text-clinical-slate">Grad-CAM visualization is unavailable for this scan.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-clinical-border">
        <h3 className="text-xl font-bold text-white mb-4">What does this mean?</h3>
        <p className="text-clinical-slate leading-relaxed mb-4">
          The <strong>Grad-CAM (Gradient-weighted Class Activation Mapping)</strong> visualization on the right uses a heat map to show which areas of your image most strongly influenced the AI's prediction of <strong className="text-white">{latestScan.prediction}</strong>.
        </p>
        <ul className="space-y-3 text-clinical-slate list-disc pl-5">
          <li><strong className="text-red-400">Red/Yellow areas:</strong> High importance. The AI focused heavily on these regions.</li>
          <li><strong className="text-blue-400">Blue/Green areas:</strong> Low importance. These regions had minimal impact on the prediction.</li>
        </ul>
      </div>
    </div>
  );
};
