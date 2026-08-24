import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Layers, Droplets, ShieldAlert, BookA, Gamepad2, Award, ChevronRight, Activity, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { apiFetch } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

export const LearnDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greetingInfo, setGreetingInfo] = useState({ text: 'Good Morning', Icon: Sunrise, color: 'text-amber-500', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/20' });

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreetingInfo({ text: 'Good Morning', Icon: Sunrise, color: 'text-amber-500', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/20' });
      } else if (hour >= 12 && hour < 17) {
        setGreetingInfo({ text: 'Good Afternoon', Icon: Sun, color: 'text-yellow-500', bgClass: 'bg-yellow-500/10', borderClass: 'border-yellow-500/20' });
      } else if (hour >= 17 && hour < 21) {
        setGreetingInfo({ text: 'Good Evening', Icon: Sunset, color: 'text-orange-500', bgClass: 'bg-orange-500/10', borderClass: 'border-orange-500/20' });
      } else {
        setGreetingInfo({ text: 'Good Night', Icon: Moon, color: 'text-indigo-400', bgClass: 'bg-indigo-500/10', borderClass: 'border-indigo-500/20' });
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await apiFetch('/learning/progress');
        setProgress(data);
      } catch (err) {
        console.error("Failed to fetch learning progress", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const resources = [
    { title: "Learn About Your Result", icon: Activity, path: "/learn/result", desc: "Detailed breakdown of your latest AI scan", color: "from-blue-500 to-cyan-400" },
    { title: "Disease Library", icon: BookOpen, path: "/learn/library", desc: "Explore the 23 conditions our AI detects", color: "from-indigo-500 to-purple-500" },
    { title: "Similar Diseases", icon: Layers, path: "/learn/similar", desc: "Visual comparisons of similar conditions", color: "from-fuchsia-500 to-pink-500" },
    { title: "Skin Care Guide", icon: Droplets, path: "/learn/skincare", desc: "Best practices for healthy skin", color: "from-teal-400 to-emerald-500" },
    { title: "Myth vs Fact", icon: ShieldAlert, path: "/learn/myths", desc: "Common skin misconceptions debunked", color: "from-orange-400 to-red-500" },
    { title: "Medical Glossary", icon: BookA, path: "/learn/glossary", desc: "Understand dermatological terms", color: "from-blue-400 to-indigo-500" }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header / Greeting Card */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Learning Hub</h1>
        
        <div className={`p-6 sm:p-8 rounded-3xl border ${greetingInfo.bgClass} ${greetingInfo.borderClass}`}>
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-xl bg-[#050B14]/40 flex items-center justify-center">
              <greetingInfo.Icon className={`w-7 h-7 ${greetingInfo.color}`} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {greetingInfo.text}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-clinical-slate max-w-2xl">
            Ready to learn about skin health today? Explore your analysis results and our comprehensive medical library.
          </p>
        </div>
      </div>

      {!loading && progress && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="glass-panel p-5 rounded-2xl border border-clinical-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-clinical-teal/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-clinical-teal" />
            </div>
            <div>
              <p className="text-sm text-clinical-slate">Best Quiz Score</p>
              <p className="text-2xl font-bold text-white">{progress.best_score || 0}%</p>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-clinical-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-clinical-slate">Quizzes Completed</p>
              <p className="text-2xl font-bold text-white">{progress.quizzes_completed}</p>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-clinical-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-clinical-slate">Diseases Explored</p>
              <p className="text-2xl font-bold text-white">{progress.diseases_viewed?.length || 0}</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-clinical-teal" />
        Explore Skin Health
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {resources.map((res) => {
          const Icon = res.icon;
          return (
            <div 
              key={res.title}
              onClick={() => navigate(res.path)}
              className="glass-panel p-5 rounded-2xl border border-clinical-border hover:border-clinical-teal/30 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${res.color} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-clinical-teal transition-colors">{res.title}</h3>
              <p className="text-sm text-clinical-slate mb-4 line-clamp-2">{res.desc}</p>
              
              <div className="flex items-center text-xs font-semibold text-clinical-teal group-hover:translate-x-1 transition-transform w-fit">
                Explore <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-clinical-teal/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-clinical-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="w-6 h-6 text-clinical-teal" />
            <h2 className="text-2xl font-bold text-white">Test Your Knowledge</h2>
          </div>
          <p className="text-clinical-slate mb-6">Challenge yourself with our interactive dermatology quiz. Choose your difficulty level and earn achievements!</p>
          
          <button 
            onClick={() => navigate('/learn/quiz')}
            className="px-8 py-3 bg-clinical-teal text-black font-bold rounded-xl hover:bg-clinical-teal/90 transition-all active:scale-95"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
