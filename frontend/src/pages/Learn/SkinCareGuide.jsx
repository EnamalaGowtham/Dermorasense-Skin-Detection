import React from 'react';
import { 
  ChevronLeft, Droplets, Feather, Sun, Shield, Moon, Bath, Heart, Stethoscope 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SKIN_CARE_GUIDES } from '../../data/learningData';

const IconMap = {
  Droplets: Droplets,
  Feather: Feather,
  Sun: Sun,
  Shield: Shield,
  Moon: Moon,
  Bath: Bath,
  Heart: Heart,
  Stethoscope: Stethoscope
};

export const SkinCareGuide = () => {
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold text-white mb-2">Skin Care Guide</h1>
        <p className="text-clinical-slate">Best practices for maintaining a healthy skin barrier.</p>
      </div>

      <div className="space-y-6">
        {SKIN_CARE_GUIDES.map((guide) => {
          const Icon = IconMap[guide.icon] || Droplets;
          return (
            <div key={guide.id} className="bg-[#0f172a] p-6 rounded-2xl border border-clinical-border shadow-lg">
              <div className="flex items-center gap-4 mb-6 border-b border-clinical-border pb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center border border-slate-700">
                  <Icon className="w-6 h-6 text-clinical-teal" />
                </div>
                <div>
                  <p className="text-xs font-bold text-clinical-teal uppercase tracking-wider mb-1">{guide.category}</p>
                  <h3 className="text-xl font-bold text-white">{guide.title}</h3>
                </div>
              </div>

              {guide.whatIsIt && (
                <div className="mb-5">
                  <h4 className="text-white font-bold mb-2">What is it?</h4>
                  <p className="text-clinical-slate leading-relaxed text-sm">{guide.whatIsIt}</p>
                </div>
              )}

              {guide.whyImportant && (
                <div className="mb-5">
                  <h4 className="text-white font-bold mb-2">Why is it important?</h4>
                  <p className="text-clinical-slate leading-relaxed text-sm">{guide.whyImportant}</p>
                </div>
              )}

              {guide.whatToDo && guide.whatToDo.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-white font-bold mb-3">What should I do?</h4>
                  <ul className="space-y-2">
                    {guide.whatToDo.map((step, idx) => (
                      <li key={idx} className="flex items-start text-clinical-slate text-sm">
                        <span className="text-clinical-teal font-bold mr-2 mt-0.5">•</span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {guide.howOften && (
                <div className="mb-5">
                  <h4 className="text-white font-bold mb-2">How often should I do it?</h4>
                  <p className="text-clinical-slate leading-relaxed text-sm">{guide.howOften}</p>
                </div>
              )}

              {guide.tips && guide.tips.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-white font-bold mb-3">Simple Tips</h4>
                  <ul className="space-y-2">
                    {guide.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start text-clinical-slate text-sm">
                        <span className="text-clinical-teal font-bold mr-2 mt-0.5">•</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {guide.dos && guide.dos.length > 0 && (
                <div className="mb-4 bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                  <h4 className="text-green-400 font-bold mb-3">✅ Do</h4>
                  <ul className="space-y-2">
                    {guide.dos.map((item, idx) => (
                      <li key={idx} className="flex items-start text-green-100 text-sm">
                        <span className="text-green-400 font-bold mr-2 mt-0.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {guide.avoids && guide.avoids.length > 0 && (
                <div className="mb-5 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                  <h4 className="text-red-400 font-bold mb-3">❌ Avoid</h4>
                  <ul className="space-y-2">
                    {guide.avoids.map((item, idx) => (
                      <li key={idx} className="flex items-start text-red-100 text-sm">
                        <span className="text-red-400 font-bold mr-2 mt-0.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {guide.whenToSeeDoctor && (
                <div className="mb-5 bg-[#0f172a] p-4 rounded-xl border border-clinical-border">
                  <h4 className="text-[#00f2fe] font-bold mb-3">👨‍⚕️ When should I see a doctor?</h4>
                  {/* Since whenToSeeDoctor contains newlines for bullets, we should render them nicely */}
                  <div className="text-clinical-slate leading-relaxed text-sm whitespace-pre-line">
                    {guide.whenToSeeDoctor}
                  </div>
                </div>
              )}

              {guide.disclaimer && (
                <div className="mt-4 bg-clinical-teal/5 p-3 rounded-lg border border-clinical-teal/10">
                  <p className="text-clinical-slate text-xs italic leading-relaxed text-center">
                    {guide.disclaimer}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};
