import React, { useState } from 'react';
import { ChevronLeft, Search, BookOpen, BookA, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GLOSSARY_TERMS } from '../../data/learningData';

export const Glossary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);

  const filteredTerms = GLOSSARY_TERMS.filter(t => {
    if (!t.term || !t.definition) return false;
    return t.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
           t.definition.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => a.term.localeCompare(b.term));

  if (selectedTerm) {
    return (
      <div className="max-w-4xl mx-auto pb-20">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => setSelectedTerm(null)}
            className="flex items-center text-clinical-slate hover:text-white transition-colors p-2 -ml-2 mr-4 rounded-full hover:bg-white/5"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Term Details</h1>
        </div>

        <div className="glass-panel border border-clinical-border p-6 md:p-8 rounded-2xl mb-4 bg-[#0a1220]">
          <div className="flex items-center mb-6 border-b border-slate-700/50 pb-6">
            <BookOpen className="text-[#00f2fe] w-8 h-8 mr-4" />
            <h2 className="text-3xl font-bold text-white">{selectedTerm.term}</h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-clinical-teal font-bold mb-3 uppercase text-xs tracking-wider">Simple Definition</h3>
            <p className="text-white text-lg leading-relaxed">{selectedTerm.definition}</p>
          </div>
          
          {selectedTerm.example && (
            <div className="bg-slate-800/40 p-5 rounded-xl border border-clinical-border/50 flex items-start">
              <Info className="text-slate-400 w-5 h-5 mr-3 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-clinical-teal font-bold mb-2 uppercase text-xs tracking-wider">Example</h3>
                <p className="text-slate-300 italic leading-relaxed text-base">{selectedTerm.example}</p>
              </div>
            </div>
          )}
        </div>
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
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <BookA className="w-8 h-8 text-clinical-teal" />
          Medical Glossary
        </h1>
        <p className="text-clinical-slate text-lg">Understand complex dermatological terms.</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-clinical-slate" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 border border-clinical-border rounded-xl bg-[#111a2f] text-white placeholder-clinical-slate focus:outline-none focus:ring-1 focus:ring-clinical-teal focus:border-clinical-teal text-base transition-all"
          placeholder="Search medical terms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item) => (
            <button 
              key={item.id}
              onClick={() => setSelectedTerm(item)}
              className="w-full text-left glass-panel p-6 rounded-2xl border border-clinical-border hover:bg-slate-800/80 transition-colors flex flex-col items-start focus:outline-none focus:ring-2 focus:ring-clinical-teal"
            >
              <div className="flex items-center mb-3">
                <BookOpen className="text-[#00f2fe] w-5 h-5 mr-3" />
                <h3 className="text-xl font-bold text-white">{item.term}</h3>
              </div>
              <p className="text-clinical-slate leading-relaxed line-clamp-2 w-full pl-8">
                {item.definition}
              </p>
            </button>
          ))
        ) : (
          <div className="py-16 text-center text-clinical-slate bg-[#111a2f]/50 rounded-2xl border border-clinical-border border-dashed">
            <p className="text-lg">No medical terms found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
