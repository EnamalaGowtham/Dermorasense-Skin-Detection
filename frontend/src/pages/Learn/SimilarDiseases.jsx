import React, { useState } from 'react';
import { ChevronLeft, AlertCircle, Activity, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DISEASE_DATA } from '../../data/similarDiseasesData';
import { SERVER_URL } from '../../services/apiService';

const ValidatedImage = ({ source, alt, className, onImageError }) => {
  const [error, setError] = useState(false);

  if (!source || error) {
    if (onImageError && !error) {
      onImageError();
    }
    return (
      <div className={`flex flex-col items-center justify-center bg-[#111a2f] ${className}`}>
        <ImageIcon className="w-8 h-8 text-clinical-slate mb-2 opacity-50" />
        <p className="text-clinical-slate text-xs">Image unavailable</p>
      </div>
    );
  }

  return (
    <img 
      src={`${SERVER_URL}${source}`} 
      alt={alt} 
      className={className} 
      onError={() => {
        setError(true);
        if (onImageError) onImageError();
      }} 
    />
  );
};

const SimilarDiseaseCard = ({ similarData, baseDiseaseName, onImageError }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="glass-panel border border-clinical-border rounded-2xl overflow-hidden mb-6">
      <button 
        onClick={toggleExpand}
        className="w-full text-left p-4 hover:bg-white/5 transition-colors focus:outline-none"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Activity className="text-clinical-teal w-5 h-5 mr-2" />
            <h3 className="text-white font-bold text-lg">Similar: {similarData.name}</h3>
          </div>
          {expanded ? (
            <ChevronUp className="text-clinical-slate w-6 h-6" />
          ) : (
            <ChevronDown className="text-clinical-slate w-6 h-6" />
          )}
        </div>

        <ValidatedImage 
          source={similarData.image} 
          alt={similarData.name}
          className="w-full h-48 rounded-xl mb-4 object-cover"
          onImageError={() => onImageError(similarData.id)}
        />

        <p className="text-white font-bold mb-1">Why it may look similar:</p>
        <p className="text-clinical-slate text-sm leading-relaxed mb-1">
          {similarData.whySimilar}
        </p>
        
        {!expanded && (
          <p className="text-clinical-teal text-sm font-semibold mt-2 text-center">
            View Details & Comparison
          </p>
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-clinical-border/50 pt-4">
          <div className="mb-4">
            <h4 className="text-white font-bold mb-2">How it is different:</h4>
            <p className="text-clinical-slate text-sm leading-relaxed">
              {similarData.howDifferent}
            </p>
          </div>

          <div className="mb-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <h4 className="text-white font-bold mb-2">Common signs of {similarData.name}:</h4>
            {similarData.commonSigns.map((sign, idx) => (
              <div key={idx} className="flex items-start mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-clinical-teal mt-1.5 mr-2 flex-shrink-0" />
                <p className="text-clinical-slate text-sm">{sign}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-lg">How to Tell Them Apart</h4>
            <div className="space-y-3">
              {similarData.comparisonPoints.map((point, idx) => (
                <div key={idx} className="bg-[#0a1220] p-3 rounded-lg border border-clinical-border/30">
                  <p className="text-clinical-teal font-bold text-xs uppercase mb-2 tracking-wider">{point.feature}</p>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 md:pr-4 md:border-r border-slate-700/50">
                      <p className="text-slate-400 text-xs mb-1">{baseDiseaseName}</p>
                      <p className="text-white text-sm font-medium">{point.base}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-400 text-xs mb-1">{similarData.name}</p>
                      <p className="text-white text-sm font-medium">{point.similar}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SimilarDiseases = () => {
  const navigate = useNavigate();
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (id) => {
    setFailedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const hasValidDiseaseImage = (id, imageSource) => {
    if (!imageSource) return false;
    if (failedImages.has(id)) return false;
    return true;
  };

  // The mobile app filtered specific indices, let's keep the same logic to display relevant subset
  const ALLOWED_INDICES = [0, 1, 2, 3, 6]; 
  
  const availableData = DISEASE_DATA.map((item, index) => ({
    ...item,
    displayNumber: index + 1
  })).filter((item, index) => {
    if (!ALLOWED_INDICES.includes(index)) return false;
    return hasValidDiseaseImage(item.baseDisease.id, item.baseDisease.image);
  }).map(item => {
    const validSimilar = item.similarDiseases.filter(sim => {
      return hasValidDiseaseImage(sim.id, sim.image);
    });
    return { ...item, similarDiseases: validSimilar };
  });

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
        <h1 className="text-3xl font-bold text-white mb-2">Similar Disease Comparison</h1>
        <p className="text-clinical-slate">Visually compare conditions that are commonly mistaken for each other.</p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-start mb-10">
        <AlertCircle className="text-yellow-500 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-yellow-200 leading-relaxed">
          Many skin conditions look alike to the naked eye. This visual guide highlights the subtle differences between commonly confused conditions.
        </p>
      </div>

      {availableData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-clinical-slate">No similar disease information available at this time.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {availableData.map((item) => (
            <div key={item.id} className="mb-10">
              {/* Base Disease Section */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-clinical-teal/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-clinical-teal font-bold">{item.displayNumber}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{item.baseDisease.name}</h2>
                </div>
                
                <p className="text-clinical-slate text-sm italic mb-3">
                  Baseline Condition
                </p>

                <ValidatedImage 
                  source={item.baseDisease.image} 
                  alt={item.baseDisease.name}
                  className="w-full h-56 rounded-xl mb-4 object-cover"
                  onImageError={() => handleImageError(item.baseDisease.id)}
                />
                
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 mb-4">
                  <h4 className="text-white font-bold mb-2 text-base">What it means</h4>
                  <p className="text-clinical-slate text-sm leading-relaxed mb-4">
                    {item.baseDisease.shortDescription}
                  </p>

                  <h4 className="text-white font-bold mb-2 text-base">Common signs</h4>
                  {item.baseDisease.commonSigns.map((sign, idx) => (
                    <div key={idx} className="flex items-start mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-clinical-teal mt-1.5 mr-2 flex-shrink-0" />
                      <p className="text-clinical-slate text-sm">{sign}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Diseases Section */}
              <div className="pl-4 md:pl-11 border-l-2 border-clinical-border/50">
                {item.similarDiseases.length > 0 ? (
                  item.similarDiseases.map(similarData => (
                    <SimilarDiseaseCard 
                      key={similarData.id}
                      similarData={similarData}
                      baseDiseaseName={item.baseDisease.name}
                      onImageError={handleImageError}
                    />
                  ))
                ) : (
                  <p className="text-clinical-slate italic">No comparisons available for this condition.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
