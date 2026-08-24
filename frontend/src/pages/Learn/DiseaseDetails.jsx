import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, AlertTriangle, Stethoscope, CheckCircle, Info, MapPin
} from 'lucide-react';
import { apiFetch, SERVER_URL } from '../../services/apiService';

export const DiseaseDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchDiseaseDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch static disease text lookup data to mimic mobile implementation
        const res = await apiFetch(`/scans/disease/${encodeURIComponent(name)}`);
        setDetails(res);
      } catch (err) {
        setError('Unable to load the Disease Library. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (name) {
      fetchDiseaseDetails();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto pb-20 flex flex-col items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-clinical-teal/30 border-t-clinical-teal rounded-full animate-spin mb-4"></div>
        <p className="text-clinical-slate animate-pulse">Loading disease information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto pb-20 pt-20 px-4">
        <button 
          onClick={() => navigate('/learn/library')}
          className="flex items-center text-clinical-slate hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Library
        </button>
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex flex-col items-center text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Failed to Load</h2>
          <p className="text-red-300">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-clinical-card border border-red-500/30 text-white rounded-xl hover:bg-red-500/20 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="max-w-4xl mx-auto pb-20 text-center pt-20">
        <button 
          onClick={() => navigate('/learn/library')}
          className="flex items-center text-clinical-slate hover:text-white mb-6 transition-colors mx-auto"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Library
        </button>
        <p className="text-clinical-slate">No disease data found.</p>
      </div>
    );
  }

  // Construct image URL properly
  const imageUrl = details.image_url 
    ? (details.image_url.startsWith('http') ? encodeURI(details.image_url) : encodeURI(`${SERVER_URL}${details.image_url}`))
    : null;

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 sm:px-0">
      <button 
        onClick={() => navigate('/learn/library')}
        className="flex items-center text-clinical-slate hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Library
      </button>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>

        {imageUrl && (
          <div className="w-full aspect-video md:max-h-[400px] rounded-2xl overflow-hidden border border-clinical-border bg-clinical-card mb-6 relative flex items-center justify-center">
            {!imageError ? (
              <img 
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8">
                <AlertTriangle className="w-12 h-12 text-clinical-slate mb-3 opacity-50" />
                <p className="text-clinical-slate font-medium text-center">Image unavailable</p>
              </div>
            )}
          </div>
        )}

        {details.description && (
          <div className="glass-panel border border-clinical-border rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-3">What is it?</h2>
            <p className="text-clinical-slate leading-relaxed">{details.description}</p>
          </div>
        )}

        {details.affectedAreas && (
          <div className="glass-panel border border-clinical-border rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-3">Where can it affect the body?</h2>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-clinical-teal shrink-0 mt-0.5" />
              <p className="text-clinical-slate leading-relaxed">{details.affectedAreas}</p>
            </div>
          </div>
        )}

        {details.symptoms && details.symptoms.length > 0 && (
          <div className="glass-panel border border-clinical-border rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Common Symptoms</h2>
            <ul className="space-y-3">
              {details.symptoms.map((symptom, index) => (
                <li key={`sym-${index}`} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-clinical-teal shrink-0 mt-2" />
                  <span className="text-clinical-slate leading-relaxed">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {((details.first_aid && details.first_aid.length > 0) || (details.do && details.do.length > 0)) && (
          <div className="glass-panel border border-clinical-border rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Basic Skin Care</h2>
            <ul className="space-y-3">
              {details.first_aid?.map((item, index) => (
                <li key={`fa-${index}`} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-clinical-slate leading-relaxed">{item}</span>
                </li>
              ))}
              {details.do?.map((item, index) => (
                <li key={`do-${index}`} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-clinical-slate leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {details.see_doctor && (
          <div className="glass-panel border border-clinical-border rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="w-6 h-6 text-clinical-teal" />
              <h2 className="text-xl font-bold text-white">When to See a Doctor</h2>
            </div>
            <p className="text-clinical-slate leading-relaxed">{details.see_doctor}</p>
          </div>
        )}

        <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">Important Note</span>
          </div>
          <p className="text-sm text-clinical-slate leading-relaxed">
            This information is for educational purposes only and does not replace professional medical advice or diagnosis. Always consult a healthcare provider for medical concerns.
          </p>
        </div>

      </div>
    </div>
  );
};
