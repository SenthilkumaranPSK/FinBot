import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  HelpCircle, 
  CheckCircle2, 
  Award, 
  RefreshCw, 
  ChevronRight 
} from 'lucide-react';
import { usePlacement } from '../contexts/PlacementContext';
import { MOCK_INTERVIEW_QUESTIONS } from '../data/mockData';
import { evaluateInterviewAnswer } from '../services/aiPlacementEngine';

export default function MockInterview() {
  const { recordInterview, interviewHistory } = usePlacement();
  
  const [selectedDomain, setSelectedDomain] = useState('Fullstack SDE');
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [sessionAnswers, setSessionAnswers] = useState([]);
  const [sessionFinished, setSessionFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const activeQuestions = MOCK_INTERVIEW_QUESTIONS[selectedDomain] || MOCK_INTERVIEW_QUESTIONS['Fullstack SDE'];
  const currentQ = activeQuestions[currentQuestionIndex];

  const handleStartSession = () => {
    setSessionActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setEvaluationResult(null);
    setSessionAnswers([]);
    setSessionFinished(false);
    setShowHint(false);
  };

  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your answer.');
      return;
    }
    
    // Simulate speech-to-text input toggle
    setIsListening(!isListening);
    if (!isListening) {
      setUserAnswer(prev => prev + ' To optimize latency under 10k concurrent users, I would introduce Redis distributed locks with TTL and buffer incoming write requests through an Apache Kafka message queue...');
    }
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      const evalRes = evaluateInterviewAnswer(currentQ.question, userAnswer, selectedDomain);
      setEvaluationResult(evalRes);
      setSessionAnswers(prev => [...prev, { question: currentQ.question, answer: userAnswer, eval: evalRes }]);
      setIsEvaluating(false);
    }, 600);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setEvaluationResult(null);
      setShowHint(false);
    } else {
      // Finish Session
      setSessionFinished(true);
      const totalScore = Math.round(sessionAnswers.reduce((acc, curr) => acc + curr.eval.score, 0) / (sessionAnswers.length || 1));
      recordInterview({
        id: `int-${Date.now()}`,
        domain: selectedDomain,
        date: new Date().toISOString().split('T')[0],
        score: totalScore,
        rating: totalScore >= 85 ? 'Strong Hire' : totalScore >= 70 ? 'Hire' : 'Needs Practice',
        questionsCount: activeQuestions.length,
        strengths: 'Solid system architecture fundamentals & clear articulation'
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" /> PlaceGuard AI Interviewer
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Mock Technical & HR Interview Simulator
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Simulate real pressure rounds for Google, Amazon, Microsoft, and TCS with instant STAR feedback & speech depth analytics.
          </p>
        </div>

        {!sessionActive && (
          <button 
            onClick={handleStartSession}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4" /> Start Mock Round
          </button>
        )}
      </div>

      {!sessionActive ? (
        /* Configuration & Previous Rounds View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Domain Picker */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Choose Interview Track</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setSelectedDomain('Fullstack SDE')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedDomain === 'Fullstack SDE' ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}
              >
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Product SDE-1</div>
                <div className="font-extrabold text-slate-900 dark:text-white text-base">Fullstack & Distributed Systems</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  System architecture, concurrency, API design, and behavioral STAR stories.
                </div>
              </div>

              <div 
                onClick={() => setSelectedDomain('Core DSA & CS Fundamentals')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedDomain === 'Core DSA & CS Fundamentals' ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 ring-2 ring-indigo-500/20' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}
              >
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">Campus Core</div>
                <div className="font-extrabold text-slate-900 dark:text-white text-base">Core DSA, DBMS & OS</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Trees, Graphs, ACID properties, Virtual memory, and SQL index internals.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> What you will be evaluated on:
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 pl-1">
                <li>Technical depth & Big-O algorithmic efficiency</li>
                <li>Handling edge cases and distributed scaling bottlenecks</li>
                <li>STAR framework (Situation, Task, Action, Result) in communication</li>
              </ul>
            </div>

            <button 
              onClick={handleStartSession}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-600 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Begin Round ({selectedDomain})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Previous Mock Round History */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Past Performance Scorecards</h3>
            
            <div className="space-y-3">
              {interviewHistory.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.domain}</span>
                    <span className="text-xs font-black text-emerald-500">{item.score}/100</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.date} • {item.rating}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : sessionFinished ? (
        /* End of Interview Summary Scorecard */
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Interview Session Complete</span>
            <h2 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">Overall Performance: Strong Hire</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your responses demonstrated high technical clarity and structured problem breakdown.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-400">Average Score</div>
              <div className="text-2xl font-black text-emerald-500 mt-1">86/100</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-400">Clarity</div>
              <div className="text-2xl font-black text-indigo-500 mt-1">88%</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-400">STAR Structure</div>
              <div className="text-2xl font-black text-teal-500 mt-1">84%</div>
            </div>
          </div>

          <button 
            onClick={() => setSessionActive(false)}
            className="px-8 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm hover:bg-emerald-500 dark:hover:bg-emerald-400 transition-colors"
          >
            Back to Interview Hub
          </button>
        </div>
      ) : (
        /* Active Live Interview Session */
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Question Display Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  Question {currentQuestionIndex + 1} of {activeQuestions.length}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{currentQ.category}</span>
              </div>
              
              <button 
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
              >
                <HelpCircle className="w-3.5 h-3.5" /> {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h2>

            {showHint && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300">
                <span className="font-bold">Interviewer Tip: </span> Think about distributed locks (Redis TTL) vs DB optimistic locking with versioning columns.
              </div>
            )}
          </div>

          {/* User Answer Response Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Your Answer / Articulation
              </label>
              
              <button 
                onClick={handleToggleVoice}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
              >
                {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
              </button>
            </div>

            <textarea 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={!!evaluationResult}
              rows={6}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
              placeholder="Structure your answer clearly: Explain the problem constraints, propose your architecture/algorithm, and mention edge cases..."
            />

            {!evaluationResult && (
              <button 
                onClick={handleSubmitAnswer}
                disabled={isEvaluating || !userAnswer.trim()}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Interviewer is evaluating your response...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Answer for Instant Grading</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Real-time AI Evaluation Feedback Box */}
          {evaluationResult && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    {evaluationResult.score}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg">Instant Answer Scorecard</h3>
                    <p className="text-xs text-slate-400">{evaluationResult.feedback}</p>
                  </div>
                </div>

                <div className="flex gap-2 text-xs font-bold">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">Clarity: {evaluationResult.clarity}%</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">Depth: {evaluationResult.depth}%</span>
                </div>
              </div>

              {/* Model Answer Preview */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
                <span className="font-bold text-emerald-400 block mb-1">Ideal Model Answer Key:</span>
                <p className="text-slate-300 leading-relaxed font-mono">{evaluationResult.modelAnswer}</p>
              </div>

              <button 
                onClick={handleNextQuestion}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to {currentQuestionIndex + 1 < activeQuestions.length ? 'Next Question' : 'Complete Interview'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
