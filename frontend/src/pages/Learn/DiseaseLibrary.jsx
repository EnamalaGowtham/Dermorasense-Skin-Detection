import React, { useState } from 'react';
import { Search, ChevronLeft, ArrowRight, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DISEASES } from '../../data/learningData';

export const DiseaseLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiseases = DISEASES.filter(d => 
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-white mb-2">Disease Library</h1>
        <p className="text-clinical-slate">Explore information about the 23 skin conditions our AI is trained to recognize.</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3 mb-8">
        <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-200">
          <strong>Educational Purposes Only:</strong> This library provides general information. It does not replace professional medical diagnosis or treatment.
        </p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-clinical-slate" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-clinical-border rounded-xl leading-5 bg-[#111a2f] text-white placeholder-clinical-slate focus:outline-none focus:ring-1 focus:ring-clinical-teal focus:border-clinical-teal sm:text-sm transition-all"
          placeholder="Search conditions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDiseases.length > 0 ? (
          filteredDiseases.map((disease) => (
            <div 
              key={disease}
              onClick={() => navigate(`/learn/disease/${encodeURIComponent(disease)}`)}
              className="glass-panel p-5 rounded-xl border border-clinical-border flex items-center justify-between group hover:border-clinical-teal/30 cursor-pointer transition-all hover:bg-white/5"
            >
              <h3 className="text-white font-medium group-hover:text-clinical-teal transition-colors">{disease}</h3>
              <ArrowRight className="w-4 h-4 text-clinical-slate group-hover:text-clinical-teal transition-colors" />
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-clinical-slate">
            No conditions found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};
