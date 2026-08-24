import React, { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MYTHS_AND_FACTS } from '../../data/learningData';

export const MythFact = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const currentItem = MYTHS_AND_FACTS[currentIndex];
  const total = MYTHS_AND_FACTS.length;

  useEffect(() => {
    if (revealed) {
      // Small timeout to allow React to mount the element before applying opacity/transform for smooth CSS transition
      const timer = setTimeout(() => setShowAnimation(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowAnimation(false);
    }
  }, [revealed]);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setRevealed(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/learn');
    }
  };

  const renderProgressDots = () => {
    const dots = [];
    const windowSize = 5;
    let start = Math.max(0, currentIndex - Math.floor(windowSize / 2));
    let end = Math.min(total - 1, start + windowSize - 1);
    
    if (end - start + 1 < windowSize) {
      start = Math.max(0, end - windowSize + 1);
    }

    for (let i = start; i <= end; i++) {
      dots.push(
        <div 
          key={i} 
          className={`h-2 rounded-full mx-1 transition-all duration-300 ${i === currentIndex ? 'w-6 bg-[#00f2fe]' : 'w-2 bg-slate-700'}`}
        />
      );
    }

    return (
      <div className="flex items-center justify-center mt-2">
        {start > 0 && <span className="text-slate-500 text-xs mr-2">...</span>}
        {dots}
        {end < total - 1 && <span className="text-slate-500 text-xs ml-2">...</span>}
      </div>
    );
  };

  if (!currentItem) {
    return (
      <div className="text-center py-20 text-clinical-slate">
        No Myth vs Fact information available.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-32 flex flex-col min-h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-clinical-slate hover:text-white transition-colors p-2 -ml-2 mr-4 rounded-full hover:bg-white/5"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Myth vs Fact</h1>
      </div>
      
      {/* Progress */}
      <div className="mb-6 flex flex-col items-center">
        <span className="text-clinical-slate font-medium text-sm mb-1 uppercase tracking-widest">
          Fact {currentIndex + 1} of {total}
        </span>
        {renderProgressDots()}
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        {/* Main Card */}
        <div className="bg-[#0a1220] border border-clinical-border/40 rounded-[32px] overflow-hidden shadow-2xl relative">
          
          {/* Card Header */}
          <div className="bg-slate-800/40 border-b border-clinical-border/40 py-4 flex justify-center items-center">
            <div className="flex items-center">
              <Lightbulb className="text-[#00f2fe] w-5 h-5 mr-2" />
              <span className="text-white font-bold tracking-widest uppercase text-sm">Did you know?</span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Myth Section */}
            <div className="mb-2">
              <div className="flex items-center mb-3">
                <AlertTriangle className="text-red-400 w-5 h-5 mr-2" />
                <span className="text-red-400 font-bold tracking-widest uppercase text-sm">Myth</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                "{currentItem.myth}"
              </h2>
            </div>

            {/* Revealed Fact Section */}
            {revealed && (
              <div 
                className={`mt-8 transition-all duration-400 ease-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                <div className="h-px bg-slate-700/50 w-full mb-8" />
                
                <div className="flex items-center mb-3">
                  <CheckCircle2 className="text-green-400 w-5 h-5 mr-2" />
                  <span className="text-green-400 font-bold tracking-widest uppercase text-sm">Fact</span>
                </div>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
                  {currentItem.fact}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-[#050B14]/90 backdrop-blur-md border-t border-clinical-border/30 z-10 flex justify-center">
        <div className="w-full max-w-2xl">
          {!revealed ? (
            <button
              onClick={handleReveal}
              className="w-full bg-clinical-teal hover:bg-[#00d2df] transition-colors py-4 rounded-2xl flex items-center justify-center shadow-lg shadow-clinical-teal/20"
            >
              <span className="font-bold text-[#050B14] text-lg">Reveal the Fact</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full bg-slate-800/80 hover:bg-slate-700/80 transition-colors border border-clinical-teal py-4 rounded-2xl flex items-center justify-center"
            >
              <span className="font-bold text-clinical-teal text-lg mr-2">
                {currentIndex < total - 1 ? "Next Fact" : "Finish"}
              </span>
              {currentIndex < total - 1 && <ArrowRight className="text-[#00f2fe] w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
