import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle2, XCircle, Award, Trophy, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QUIZ_QUESTIONS } from '../../data/learningData';
import { apiFetch } from '../../services/apiService';

const QUIZ_LENGTH = 5;

// Utility to shuffle an array (Fisher-Yates)
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Validates the question pool and removes duplicates based on ID
const validateQuestions = (questions) => {
  if (!Array.isArray(questions)) return [];
  
  const valid = [];
  const seenIds = new Set();
  
  for (const q of questions) {
    if (
      q &&
      typeof q.id !== 'undefined' &&
      !seenIds.has(q.id) &&
      typeof q.question === 'string' &&
      Array.isArray(q.options) &&
      q.options.length > 1 &&
      typeof q.correctIndex === 'number' &&
      q.correctIndex >= 0 &&
      q.correctIndex < q.options.length
    ) {
      seenIds.add(q.id);
      valid.push(q);
    }
  }
  return valid;
};

export const Quiz = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(null);
  
  // Session State
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  
  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [isExhausted, setIsExhausted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [poolEmptyError, setPoolEmptyError] = useState(false);

  const loadQuestions = async (level) => {
    setIsLoading(true);
    setPoolEmptyError(false);
    try {
      const rawQuestions = QUIZ_QUESTIONS[level] || [];
      const validQuestions = validateQuestions(rawQuestions);
      
      if (validQuestions.length === 0) {
        setDifficulty(level);
        setPoolEmptyError(true);
        setIsLoading(false);
        return;
      }

      const seenKey = `@quiz_seen_${level}`;
      const seenData = localStorage.getItem(seenKey);
      let seenIds = seenData ? JSON.parse(seenData) : [];
      
      const unseenQuestions = validQuestions.filter(q => !seenIds.includes(q.id));
      
      if (unseenQuestions.length === 0 && validQuestions.length > 0) {
        setDifficulty(level);
        setIsExhausted(true);
        setIsLoading(false);
        return;
      }
      
      // Shuffle unseen questions
      let shuffledUnseen = shuffleArray(unseenQuestions);
      let selected = shuffledUnseen.slice(0, Math.min(QUIZ_LENGTH, unseenQuestions.length));
      let currentSequence = selected.map(q => q.id).join(',');

      // Prevent exact same sequence repetition
      const lastSeqKey = `@quiz_last_seq_${level}`;
      const lastSeq = localStorage.getItem(lastSeqKey);
      
      if (lastSeq && currentSequence === lastSeq && unseenQuestions.length > 1) {
        // Swap first two elements to guarantee variation if possible
        if (selected.length > 1) {
          const temp = selected[0];
          selected[0] = selected[1];
          selected[1] = temp;
          currentSequence = selected.map(q => q.id).join(',');
        }
      }
      
      localStorage.setItem(lastSeqKey, currentSequence);
      
      // Save seen instantly so restarting doesn't reuse them
      const newSeenIds = Array.from(new Set([...seenIds, ...selected.map(q => q.id)]));
      localStorage.setItem(seenKey, JSON.stringify(newSeenIds));

      // Prepare questions with shuffled options
      const preparedSession = selected.map(q => {
        const correctText = q.options[q.correctIndex];
        const shuffledOptions = shuffleArray(q.options);
        const newCorrectIndex = shuffledOptions.indexOf(correctText);
        
        return {
          ...q,
          shuffledOptions,
          newCorrectIndex
        };
      });
      
      setSessionQuestions(preparedSession);
      setDifficulty(level);
      setCurrentQIndex(0);
      setScore(0);
      setIsComplete(false);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsExhausted(false);
    } catch (e) {
      console.error("Failed to load questions", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = (level) => {
    loadQuestions(level);
  };

  const handleResetPool = () => {
    if (!difficulty) return;
    setIsLoading(true);
    const seenKey = `@quiz_seen_${difficulty}`;
    localStorage.removeItem(seenKey);
    const lastSeqKey = `@quiz_last_seq_${difficulty}`;
    localStorage.removeItem(lastSeqKey);
    loadQuestions(difficulty);
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !difficulty || sessionQuestions.length === 0) return;
    
    const currentQ = sessionQuestions[currentQIndex];
    if (selectedAnswer === currentQ.newCorrectIndex) {
      setScore(s => s + 1);
    }
    setIsAnswered(true);
  };

  const saveProgress = async () => {
    if (!difficulty || sessionQuestions.length === 0) return;
    setSaving(true);
    try {
      // Submit score to backend
      await apiFetch('/learning/quiz/submit', {
        method: 'POST',
        body: JSON.stringify({
          difficulty,
          score: score + (selectedAnswer === sessionQuestions[currentQIndex].newCorrectIndex ? 1 : 0),
          max_score: sessionQuestions.length
        })
      });
    } catch (error) {
      console.error("Failed to save score", error);
    } finally {
      setSaving(false);
      setIsComplete(true);
    }
  };

  const handleNext = async () => {
    if (currentQIndex < sessionQuestions.length - 1) {
      setCurrentQIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      await saveProgress();
    }
  };

  // 1. Difficulty Selection
  if (!difficulty || isLoading) {
    return (
      <div className="max-w-3xl mx-auto pb-20 text-center">
        <button 
          onClick={() => navigate('/learn')}
          className="flex items-center text-clinical-slate hover:text-white mb-8 transition-colors p-2 -ml-2 rounded-full hover:bg-white/5 w-fit"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Learning Hub
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00f2fe]"></div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">Test Your Knowledge</h1>
            <p className="text-clinical-slate mb-10">Select a difficulty to begin</p>

            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <button 
                  key={level}
                  onClick={() => handleStart(level)}
                  className="glass-panel p-6 rounded-2xl border border-clinical-border hover:border-clinical-teal hover:bg-clinical-teal/5 transition-all text-left group flex flex-col items-center"
                >
                  <span className="text-lg font-bold text-white capitalize mb-1">{level}</span>
                  <span className="text-sm text-clinical-slate text-center">
                    {level === 'beginner' && 'Basic concepts & terminology'}
                    {level === 'intermediate' && 'Prevention & general care'}
                    {level === 'advanced' && 'Medical terminology & concepts'}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // 2. Pool Empty Error
  if (poolEmptyError) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <button 
          onClick={() => setDifficulty(null)}
          className="flex items-center text-clinical-slate hover:text-white mb-8 transition-colors p-2 -ml-2 rounded-full hover:bg-white/5 w-fit"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No questions available</h1>
          <p className="text-clinical-slate text-lg mb-8">
            There are currently no valid unique questions available for the <span className="capitalize text-white font-bold">{difficulty}</span> level.
          </p>
          <button 
            onClick={() => setDifficulty(null)}
            className="w-full max-w-md bg-clinical-teal text-[#050B14] py-4 rounded-xl font-bold text-lg"
          >
            Choose Another Level
          </button>
        </div>
      </div>
    );
  }

  // 3. Pool Exhausted Screen
  if (isExhausted) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <button 
          onClick={() => setDifficulty(null)}
          className="flex items-center text-clinical-slate hover:text-white mb-8 transition-colors p-2 -ml-2 rounded-full hover:bg-white/5 w-fit"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        <div className="flex flex-col items-center justify-center text-center">
          <Trophy className="w-24 h-24 text-green-400 mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">You've answered all questions!</h1>
          <p className="text-clinical-slate text-lg mb-10 leading-relaxed max-w-lg">
            You have successfully seen every unique question in the <span className="capitalize text-white font-bold">{difficulty}</span> difficulty pool. Start a fresh cycle to play again.
          </p>

          <button 
            onClick={handleResetPool}
            className="w-full max-w-md bg-clinical-teal hover:bg-[#00d2df] text-[#050B14] py-4 rounded-xl font-bold text-lg flex items-center justify-center mb-4 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2 text-[#050B14]" />
            Start Fresh Cycle
          </button>
          
          <button 
            onClick={() => setDifficulty(null)}
            className="w-full max-w-md bg-transparent border border-clinical-border hover:bg-white/5 text-white py-4 rounded-xl font-bold text-lg transition-colors"
          >
            Change Difficulty
          </button>
        </div>
      </div>
    );
  }

  // 4. Results Screen
  if (isComplete) {
    const percentage = Math.round((score / sessionQuestions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto pb-20 text-center">
        <div className="flex flex-col items-center justify-center">
          <Trophy className="w-24 h-24 text-yellow-500 mb-6" />
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete! 🎉</h1>
          <p className="text-xl text-clinical-slate mb-8">Your Score: {score} / {sessionQuestions.length}</p>

          <div className="w-32 h-32 rounded-full border-8 border-clinical-teal flex items-center justify-center mb-10">
            <span className="text-3xl font-bold text-white">{percentage}%</span>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
            <button 
              onClick={() => loadQuestions(difficulty)}
              className="w-full py-4 bg-clinical-teal text-[#050B14] font-bold rounded-xl hover:bg-[#00d2df] transition-colors text-lg"
            >
              Next {QUIZ_LENGTH} Questions
            </button>
            <button 
              onClick={() => setDifficulty(null)}
              className="w-full py-4 bg-transparent border border-clinical-border text-white font-bold rounded-xl hover:bg-white/5 transition-colors text-lg"
            >
              Change Difficulty
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. Question Screen
  const currentQ = sessionQuestions[currentQIndex];
  if (!currentQ) {
    return (
      <div className="max-w-2xl mx-auto pb-20 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Quiz Load Error</h1>
        <p className="text-clinical-slate mb-8">An unexpected error occurred while loading the question.</p>
        <button 
          onClick={() => {
            setDifficulty(null);
            setSessionQuestions([]);
            setCurrentQIndex(0);
          }}
          className="w-full max-w-md bg-clinical-teal text-[#050B14] py-4 rounded-xl font-bold text-lg"
        >
          Return to Difficulty Selection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-20 flex flex-col min-h-[calc(100vh-100px)]">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setDifficulty(null)}
          className="flex items-center text-clinical-slate hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-clinical-slate font-bold">
          Question {currentQIndex + 1} of {sessionQuestions.length}
        </span>
        <div className="w-10"></div>
      </div>

      <div className="w-full bg-clinical-card h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-clinical-teal transition-all duration-300 ease-out" 
          style={{ width: `${(currentQIndex / sessionQuestions.length) * 100}%` }}
        />
      </div>

      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
          {currentQ?.question}
        </h2>

        <div className="space-y-3 mb-8">
          {currentQ?.shuffledOptions?.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === currentQ?.newCorrectIndex;
            
            let bgClass = "bg-clinical-card border-clinical-border text-white hover:border-clinical-teal/50 hover:bg-white/5";
            let icon = null;
            
            if (isAnswered) {
              if (isCorrect) {
                bgClass = "bg-green-500/20 border-green-500 text-green-400";
                icon = <CheckCircle2 className="w-5 h-5 text-green-400" />;
              } else if (isSelected) {
                bgClass = "bg-red-500/20 border-red-500 text-red-400";
                icon = <XCircle className="w-5 h-5 text-red-400" />;
              } else {
                bgClass = "bg-clinical-card border-clinical-border text-white opacity-50";
              }
            } else if (isSelected) {
              bgClass = "bg-clinical-teal/20 border-clinical-teal text-clinical-teal";
            }

            return (
              <button 
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${bgClass}`}
              >
                <span className="font-medium text-lg pr-4">{opt}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="bg-clinical-card/50 p-5 rounded-xl border border-clinical-border mb-8 animate-in fade-in slide-in-from-bottom-4">
            <h4 className="text-white font-bold mb-2">Explanation:</h4>
            <p className="text-clinical-slate leading-relaxed">{currentQ?.explanation}</p>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-clinical-border/50">
        {!isAnswered ? (
          <button 
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center ${selectedAnswer !== null ? 'bg-clinical-teal hover:bg-[#00d2df] text-[#050B14]' : 'bg-clinical-card text-clinical-slate cursor-not-allowed'}`}
          >
            Submit Answer
          </button>
        ) : (
          <button 
            onClick={handleNext}
            disabled={saving}
            className="w-full py-4 bg-clinical-teal hover:bg-[#00d2df] text-[#050B14] font-bold rounded-xl transition-colors text-lg flex items-center justify-center"
          >
            {saving ? "Saving..." : (currentQIndex === sessionQuestions.length - 1 ? "View Results" : "Next Question")}
          </button>
        )}
      </div>
    </div>
  );
};
