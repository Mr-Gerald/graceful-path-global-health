import React, { useState, useEffect } from 'react';
import { 
  Lock, ChevronLeft, Zap, ShieldCheck, PlayCircle, Clock, CheckCircle2, 
  AlertTriangle, RefreshCw, Star, Info, ChevronRight, Award, Trash2, 
  ArrowRight, Eye, CheckCircle, HelpCircle, BookOpen, AlertCircle, Sparkles
} from 'lucide-react';
import { User, QuizQuestion } from '../types';
import { geminiService } from '../services/geminiService';
import confetti from 'canvas-confetti';

interface PassPointMockProps {
  user: User;
  onClose: () => void;
  onUpgrade: () => void;
}

interface AttemptResult {
  day: number;
  theta: number;
  maxQuestions: number;
  totalAnswered: number;
  status: 'passed' | 'failed' | 'in_progress';
  date: string;
  answers: Record<string, {
    question: string;
    options: string[];
    userAnswer: number;
    correctAnswer: number;
    explanation: string;
    difficulty: string;
  }>;
}

const PASSPOINT_DAYS = [
  { day: 1, topic: "Safe & Effective Care: Priorities & Delegation", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 2, topic: "Pharmacological Principles & Dosage Calcs", domain: "Pharmacological and Parenteral Therapies" },
  { day: 3, topic: "Fluid, Electrolyte & Acid-Base Imbalances", domain: "Physiological Adaptation" },
  { day: 4, topic: "Cardiovascular Disorders & EKG Patterns", domain: "Physiological Adaptation" },
  { day: 5, topic: "Critical Care & Respiratory Emergencies", domain: "Physiological Adaptation" },
  { day: 6, topic: "Pediatric Milestones & Congenital Anomalies", domain: "Health Promotion and Maintenance" },
  { day: 7, topic: "Maternity Nursing: Postpartum & Neonatal Care", domain: "Health Promotion and Maintenance" },
  { day: 8, topic: "Psychiatric Nursing: Crisis & Therapeutic Comms", domain: "Psychosocial Integrity" },
  { day: 9, topic: "Endocrinology & Diabetes Management", domain: "Physiological Adaptation" },
  { day: 10, topic: "Renal & Urinary Pathophysiologies", domain: "Physiological Adaptation" },
  { day: 11, topic: "Gastrointestinal & Nutritional Therapies", domain: "Basic Care and Comfort" },
  { day: 12, topic: "Oncology Nursing & Chemotherapy Precautions", domain: "Reduction of Risk Potential" },
  { day: 13, topic: "Infectious Diseases & Standard Isolation Precautions", domain: "Safe and Effective Care Environment - Safety and Infection Control" },
  { day: 14, topic: "Perioperative Care & Sterile Technique", domain: "Safe and Effective Care Environment - Safety and Infection Control" },
  { day: 15, topic: "Musculoskeletal Disorders & Traction Care", domain: "Basic Care and Comfort" },
  { day: 16, topic: "Neurological Assessments & Stroke Interventions", domain: "Physiological Adaptation" },
  { day: 17, topic: "Hematology & Blood Transfusion Protocols", domain: "Pharmacological and Parenteral Therapies" },
  { day: 18, topic: "Immunology & Hypersensitivity Shock", domain: "Physiological Adaptation" },
  { day: 19, topic: "Integumentary Nursing: Burn Management", domain: "Physiological Adaptation" },
  { day: 20, topic: "Gerontological Considerations: Polypharmacy & Safety", domain: "Health Promotion and Maintenance" },
  { day: 21, topic: "Ethical Legal Nursing: Advance Directives & Consent", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 22, topic: "Triage & Disaster Response Priorities", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 23, topic: "Community Health: Epidemiology & Biohazards", domain: "Safe and Effective Care Environment - Safety and Infection Control" },
  { day: 24, topic: "Sensory Impairments: Glaucoma & Vision Safety", domain: "Reduction of Risk Potential" },
  { day: 25, topic: "Comprehensive Pharmacology Focus: High-Alert Medications", domain: "Pharmacological and Parenteral Therapies" },
  { day: 26, topic: "Select All That Apply (SATA) Master-Set", domain: "Reduction of Risk Potential" },
  { day: 27, topic: "Clinical Delegation & Delegation to LPN/UAP", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 28, topic: "Complex Pathophysiology Integration", domain: "Physiological Adaptation" },
  { day: 29, topic: "Final NCLEX-RN CAT Diagnostic: Part A", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 30, topic: "Grand NCLEX-RN CAT Blueprint Diagnostic: Part B", domain: "Physiological Adaptation" },
];

export const PassPointMock: React.FC<PassPointMockProps> = ({ user, onClose, onUpgrade }) => {
  const [stage, setStage] = useState<'dashboard' | 'introduction' | 'simulator' | 'result' | 'review_answers'>('dashboard');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<Record<number, AttemptResult>>({});
  const [activeSession, setActiveSession] = useState<any | null>(null);
  
  // Simulator states
  const [questions, setQuestions] = useState<any[]>([]);
  const [currQNum, setCurrQNum] = useState<number>(1);
  const [currDifficulty, setCurrDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [abilityTheta, setAbilityTheta] = useState<number>(0);
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [timerVal, setTimerVal] = useState<number>(9000); // 2 hours 30 mins (in seconds)
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [confirmConfig, setConfirmConfig] = useState<{ message: string; onConfirm: () => void } | null>(null);

  // Stats or Review states
  const [viewingResultDay, setViewingResultDay] = useState<number | null>(null);

  // Load persistence states
  useEffect(() => {
    const key = `passpoint_mock_v1_${user.id}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        setAttempts(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse cached PassPoint attempts", e);
      }
    }

    // Check for unfinished active CAT sessions
    const activeKey = `passpoint_active_session_v1_${user.id}`;
    const savedActive = localStorage.getItem(activeKey);
    if (savedActive) {
      try {
        setActiveSession(JSON.parse(savedActive));
      } catch (e) {
        console.error("Failed to parse saved active session", e);
      }
    }
  }, [user.id]);

  const saveAttempts = (updated: Record<number, AttemptResult>) => {
    setAttempts(updated);
    const key = `passpoint_mock_v1_${user.id}`;
    localStorage.setItem(key, JSON.stringify(updated));
  };

  // Timer counter effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timerVal > 0) {
      interval = setInterval(() => {
        setTimerVal(prev => prev - 1);
      }, 1000);
    } else if (timerVal === 0 && isTimerActive) {
      handleCompleteExam(true);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerVal]);

  // Auto-save active simulation progress to prevent refresh loss
  useEffect(() => {
    if (stage === 'simulator' && selectedDay !== null) {
      const activeKey = `passpoint_active_session_v1_${user.id}`;
      const targetDay = PASSPOINT_DAYS.find(d => d.day === selectedDay);
      const session = {
        selectedDay,
        topic: targetDay?.topic || "Comprehensive NCLEX Practice",
        questions,
        currQNum,
        currDifficulty,
        userAnswers,
        abilityTheta,
        timerVal
      };
      localStorage.setItem(activeKey, JSON.stringify(session));
    }
  }, [stage, selectedDay, questions, currQNum, currDifficulty, userAnswers, abilityTheta, timerVal, user.id]);

  const resetSimulatorState = () => {
    setQuestions([]);
    setCurrQNum(1);
    setCurrDifficulty('medium');
    setUserAnswers({});
    setSelectedOpt(null);
    setAbilityTheta(0);
    setTimerVal(9000);
    setIsTimerActive(false);
    setErrorText(null);
  };

  const handleRestartCurrentExam = () => {
    if (!selectedDay) return;
    const activeKey = `passpoint_active_v1_${user.id}_day_${selectedDay}`;
    localStorage.removeItem(activeKey);
    localStorage.removeItem(`passpoint_active_session_v1_${user.id}`);
    setActiveSession(null);
    setQuestions([]);
    setCurrQNum(1);
    setCurrDifficulty('medium');
    setUserAnswers({});
    setSelectedOpt(null);
    setAbilityTheta(0);
    setTimerVal(9000);
    setIsTimerActive(true);
    setLoadingQuestion(true);
    setErrorText(null);
    
    setTimeout(() => {
      const targetDay = PASSPOINT_DAYS.find(d => d.day === selectedDay);
      const topic = targetDay?.topic || "Comprehensive NCLEX Practice";
      const domain = targetDay?.domain || "Physiological Adaptation";
      geminiService.generatePassPointQuestion(
        selectedDay,
        topic,
        'medium',
        domain,
        []
      ).then(nextQ => {
        setQuestions([nextQ]);
        setLoadingQuestion(false);
      }).catch(err => {
        console.error("Restart question generation failed:", err);
        setErrorText("Failed to initialize clean restart. Please check internet connection.");
        setLoadingQuestion(false);
      });
    }, 50);
  };

  const startDayExam = async (dayNum: number) => {
    setSelectedDay(dayNum);
    resetSimulatorState();
    setStage('introduction');
  };

  const launchCATSimulator = async () => {
    if (!selectedDay) return;
    setStage('simulator');
    setIsTimerActive(true);
    setLoadingQuestion(true);
    setErrorText(null);

    try {
      const targetDay = PASSPOINT_DAYS.find(d => d.day === selectedDay);
      const topic = targetDay?.topic || "Comprehensive NCLEX Practice";
      const domain = targetDay?.domain || "Physiological Adaptation";

      // Fetch first question
      const firstQ = await geminiService.generatePassPointQuestion(
        selectedDay,
        topic,
        'medium', // start at intermediate
        domain,
        [] // avoid empty initial
      );

      setQuestions([firstQ]);
      setLoadingQuestion(false);
    } catch (err: any) {
      console.error(err);
      setErrorText("Our high-tier NCLEX CAT engine encountered a workspace network hiccup. Let's retry launching your adaptive component.");
      setLoadingQuestion(false);
    }
  };

  const handleNextAdaptiveQuestion = async () => {
    if (selectedOpt === null || !selectedDay) return;

    const currentQ = questions[questions.length - 1];
    const isCorrect = selectedOpt === currentQ.correctAnswer;
    
    // 1. Calculate next Theta and Adjust Difficulty
    let newTheta = abilityTheta;
    let nextDifficulty: 'easy' | 'medium' | 'hard' = currDifficulty;

    if (isCorrect) {
      newTheta += 1;
      if (currDifficulty === 'easy') nextDifficulty = 'medium';
      else if (currDifficulty === 'medium') nextDifficulty = 'hard';
      else nextDifficulty = 'hard';
    } else {
      newTheta -= 1;
      if (currDifficulty === 'hard') nextDifficulty = 'medium';
      else if (currDifficulty === 'medium') nextDifficulty = 'easy';
      else nextDifficulty = 'easy';
    }

    // Save user's answer
    const nextAnswers = {
      ...userAnswers,
      [currentQ.id]: selectedOpt
    };
    setUserAnswers(nextAnswers);
    setAbilityTheta(newTheta);
    setSelectedOpt(null);

    // Save progression count to global analytics counter
    try {
      const currentCount = parseInt(localStorage.getItem('questions_solved_v1_count') || '0', 10);
      localStorage.setItem('questions_solved_v1_count', (currentCount + 1).toString());
    } catch (err) {
      console.warn("Could not write solved question progression counter:", err);
    }

    // 2. Check clinical ending rules of CAT!
    // NCLEX style CAT ends dynamically:
    // Minimum check limit: 15 questions for standard diagnostic, or 85 questions for full state.
    // Let's implement an adaptive, beautiful ending:
    // If they reach 15 questions, we allow voluntary submissions, but we also can automatically end if competency is extremely clear!
    // Let's set the automatic threshold:
    // Automatic pass: theta >= 4 (Highly consistent competence)
    // Automatic fail: theta <= -4 (Consistent correction required)
    // Absolute limit: 150 questions
    
    const nextQNum = currQNum + 1;
    const shouldEndExamAuto = (nextQNum > 85 && (newTheta >= 4 || newTheta <= -4)) || (nextQNum > 150);

    if (shouldEndExamAuto) {
      handleCompleteExam(false, nextAnswers, newTheta);
      return;
    }

    setCurrQNum(nextQNum);
    setCurrDifficulty(nextDifficulty);
    setLoadingQuestion(true);
    setErrorText(null);

    // Auto scroll the window and container to the very top to focus on the next question
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollContainer = document.querySelector('main');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    try {
      // Collect target day parameters
      const targetDay = PASSPOINT_DAYS.find(d => d.day === selectedDay);
      const topic = targetDay?.topic || "Comprehensive NCLEX Practice";
      const domain = targetDay?.domain || "Physiological Adaptation";

      // Collect existing concepts to deny repeats
      const topicsToAvoid = questions.map(q => q.id || q.question);

      const nextQ = await geminiService.generatePassPointQuestion(
        selectedDay,
        topic,
        nextDifficulty,
        domain,
        topicsToAvoid
      );

      setQuestions(prev => [...prev, nextQ]);
      setLoadingQuestion(false);
    } catch (e) {
      // Recoverable error: retry generating at current difficulty
      try {
        const targetDay = PASSPOINT_DAYS.find(d => d.day === selectedDay);
        const topic = targetDay?.topic || "Comprehensive NCLEX Practice";
        const domain = targetDay?.domain || "Physiological Adaptation";
        const topicsToAvoid = questions.map(q => q.id || q.question);
        const nextQ = await geminiService.generatePassPointQuestion(
          selectedDay,
          topic,
          nextDifficulty,
          domain,
          topicsToAvoid
        );
        setQuestions(prev => [...prev, nextQ]);
        setLoadingQuestion(false);
      } catch (err: any) {
        console.error("Secondary failure", err);
        setErrorText("Adaptive evaluation channel is congested. Please click the button below to resume your CAT cycle safely.");
        setLoadingQuestion(false);
      }
    }
  };

  const handleCompleteExam = (
    timeOut = false, 
    forcedAnswers?: Record<string, number>, 
    forcedTheta?: number
  ) => {
    setIsTimerActive(false);
    if (!selectedDay) return;

    const finalAnswers = forcedAnswers || userAnswers;
    const finalTheta = forcedTheta !== undefined ? forcedTheta : abilityTheta;
    
    // Determine Pass vs Fail status based on Ability Level (Theta)
    // If Theta is positive or above standard, they pass!
    // This represents high NCLEX-RN probability.
    const isPass = finalTheta >= 0;

    let finalStatus: 'passed' | 'failed' = isPass ? 'passed' : 'failed';

    // Map answer items for the review module
    const answersMapped: Record<string, any> = {};
    questions.forEach(q => {
      const uAns = finalAnswers[q.id];
      if (uAns !== undefined) {
        answersMapped[q.id] = {
          question: q.question,
          options: q.options,
          userAnswer: uAns,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty || 'medium'
        };
      }
    });

    const newResult: AttemptResult = {
      day: selectedDay,
      theta: finalTheta,
      maxQuestions: 150,
      totalAnswered: Object.keys(finalAnswers).length,
      status: finalStatus,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      answers: answersMapped
    };

    const updatedAttempts = {
      ...attempts,
      [selectedDay]: newResult
    };

    saveAttempts(updatedAttempts);
    setViewingResultDay(selectedDay);
    localStorage.removeItem(`passpoint_active_session_v1_${user.id}`);
    setActiveSession(null);
    setStage('result');

    if (isPass) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTimerValue = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Lock logic
  const isPaid = user.hasPaidLive;

  if (!isPaid) {
    return (
      <div className="animate-in fade-in duration-500 max-w-4xl mx-auto py-12 px-4">
        {/* Sleek Golden-themed locked page */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden text-center text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-amber-500/20 text-amber-500 animate-pulse">
              <Lock className="w-10 h-10" />
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
              PassPoint Mock <span className="text-amber-500 font-sans text-xs md:text-sm font-black uppercase bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 inline-block align-middle ml-2">Premium Live Exclusive</span>
            </h2>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light">
              Elevate your preparations with our 30-Day adaptive testing simulator. Gain a verified certificate approved by clinical assessors to unlock global hiring opportunities.
            </p>

            {/* Feature Bento Grid in Premium Unlock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mb-12">
              <div className="bg-slate-800/40 border border-slate-800/80 p-6 rounded-2xl flex items-start gap-4">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl mt-1">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Adaptive CAT Engine</h4>
                  <p className="text-sm text-slate-400 mt-1">Difficulty auto-calibrates between 85 and 150 items as you log responses, mirroring the actual NCLEX-RN.</p>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800/80 p-6 rounded-2xl flex items-start gap-4">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl mt-1">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">30-Day Complete Grid</h4>
                  <p className="text-sm text-slate-400 mt-1">Systematic sequence mapping 30 critical care competencies so higher authorities confidently verify your mastership.</p>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800/80 p-6 rounded-2xl flex items-start gap-4">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Zero Question Repetition</h4>
                  <p className="text-sm text-slate-400 mt-1">Calibrated under rigorous NCSBN item validation guidelines to ensure every practice item is clinically precise, unique, and certified standard.</p>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800/80 p-6 rounded-2xl flex items-start gap-4">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Detailed Educational Rationales</h4>
                  <p className="text-sm text-slate-400 mt-1">Explains cognitive priorities—using Airway/Breathing/Circulation, delegation metrics, and ADPIE processes.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onUpgrade}
                className="bg-amber-500 text-slate-950 font-black text-xs md:text-sm uppercase tracking-widest py-5 px-10 rounded-2xl shadow-2xl hover:bg-amber-400 transition"
              >
                Unlock PassPoint & Live Program
              </button>
              <button 
                onClick={onClose}
                className="bg-transparent text-slate-300 border border-slate-700 py-5 px-10 font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto py-4 px-2">
      
      {/* 1. DASHBOARD VIEW (Grid of 30 Days) */}
      {stage === 'dashboard' && (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">PassPoint Mock (Adaptive CAT)</h2>
              <p className="text-slate-500 font-medium mt-1">Daily NCLEX Computer Adaptive Testing Simulation program for licensure success.</p>
            </div>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900 py-3 px-6 bg-white rounded-xl border border-slate-200 transition shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Exit Mock Hub
            </button>
          </div>

          {activeSession && (
            <div className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white p-8 rounded-[2.5rem] shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-2 border-white/20 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex-1">
                <span className="bg-white/20 text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">
                  Incomplete Test Detected
                </span>
                <h3 className="font-serif font-bold text-2xl mt-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Day {activeSession.selectedDay}: {activeSession.topic}
                </h3>
                <p className="text-sm text-teal-50 ml-0.5 mt-2 max-w-xl leading-relaxed font-semibold">
                  You completed <span className="font-black text-white underline decoration-wavy decoration-emerald-300">{activeSession.currQNum} questions</span> before leaving. We have saved your active clinical judgment score (Theta: {activeSession.abilityTheta.toFixed(2)}) and remaining duration!
                </p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                <button 
                  onClick={() => {
                    // Restore state
                    setSelectedDay(activeSession.selectedDay);
                    setQuestions(activeSession.questions);
                    setCurrQNum(activeSession.currQNum);
                    setCurrDifficulty(activeSession.currDifficulty);
                    setUserAnswers(activeSession.userAnswers);
                    setAbilityTheta(activeSession.abilityTheta);
                    setTimerVal(activeSession.timerVal);
                    setStage('simulator');
                    setIsTimerActive(true);
                  }}
                  className="flex-1 md:flex-none py-4 px-8 bg-white hover:bg-emerald-50 text-indigo-700 font-extrabold text-xs uppercase tracking-widest shadow-lg rounded-2xl transition transform hover:scale-105"
                >
                  Resume Attempt
                </button>
                <button 
                  onClick={() => {
                    if (confirm("Are you sure you want to discard your saved session progress? This cannot be undone.")) {
                      localStorage.removeItem(`passpoint_active_session_v1_${user.id}`);
                      setActiveSession(null);
                    }
                  }}
                  className="py-4 px-5 bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-widest rounded-2xl transition"
                >
                  Discard
                </button>
              </div>
            </div>
          )}

          {/* Quick instructions panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4 mb-10">
            <div className="p-3 bg-brand-50 text-brand-600 rounded-2xl">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">NCSBN-Style Licensure Simulators</h3>
              <p className="text-sm text-slate-500 leading-relaxed mt-1">
                Every Day challenges you with an adaptive mock program. The algorithm monitors your clinical judgment level. Complete at least <b>15 items</b> to trigger voluntary completion, or continue to let the examiner diagnose your clinical readiness.
              </p>
            </div>
          </div>

          {/* 30 Day Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PASSPOINT_DAYS.map((dayItem) => {
              const attempt = attempts[dayItem.day];
              let statusLabel = 'NOT ATTEMPTED';
              let statusBg = 'bg-slate-100 text-slate-500';
              let isDone = false;

              if (attempt) {
                isDone = true;
                if (attempt.status === 'passed') {
                  statusLabel = 'PASSED (High Competence)';
                  statusBg = 'bg-green-500 text-white shadow-md shadow-green-100';
                } else {
                  statusLabel = 'NEEDS ADAPTION';
                  statusBg = 'bg-red-500 text-white shadow-md shadow-red-100';
                }
              }

              return (
                <div 
                  key={dayItem.day}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-brand-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black tracking-widest bg-slate-100 text-slate-900 py-1.5 px-3 rounded-full">
                        DAY {dayItem.day} of 30
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${statusBg}`}>
                        {statusLabel}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-slate-900 text-lg leading-snug mb-2">
                      {dayItem.topic}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono tracking-tight flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> {dayItem.domain}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
                    {attempt ? (
                      <>
                        <button 
                          onClick={() => {
                            setViewingResultDay(dayItem.day);
                            setStage('result');
                          }}
                          className="flex-1 py-3 px-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition flex items-center justify-center gap-2"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Report
                        </button>
                        <button 
                          onClick={() => startDayExam(dayItem.day)}
                          className="py-3 px-4 bg-slate-50 hover:bg-brand-50 hover:text-brand-600 rounded-xl text-slate-400 transition"
                          title="Re-take Practice"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => startDayExam(dayItem.day)}
                        className="w-full py-3 px-5 bg-brand-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-brand-700 transition flex items-center justify-center gap-2 group"
                      >
                        Start Simulator <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. INTRODUCTION VIEW (Explaining adaptive CAT testing rules) */}
      {stage === 'introduction' && selectedDay && (
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">
              Day {selectedDay}: PassPoint Simulator
            </h3>
            <p className="text-brand-600 font-black uppercase tracking-widest text-[10px] mb-8">
              PRE-FLIGHT NCLEX-RN INSTRUCTIONS
            </p>

            <div className="space-y-6 text-slate-600 text-sm leading-relaxed mb-10">
              <p>
                Welcome to active adaptive testing. Rather than answering a set of simple static mock assessments, the <b>PassPoint Adaptive CAT Engine</b> assesses your licensure probability based on professional nursing parameters:
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4">
                  <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg h-fit">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p>
                    <b>Clinical Calibrator:</b> Answering correctly steps up the cognitive level (to Hard questions). Answering incorrectly lowers it to easier scenarios to evaluate your clinical boundary.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg h-fit">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p>
                    <b>Stamina Constraint:</b> Plan for 85-150 items. The test completes automatically once we have determined your standard licensure probability with 95% confidence bounds.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg h-fit">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <p>
                    <b>Unique Integrity:</b> Every question is freshly structured with full explanations, helping clinical authorities approve training certificates based on true excellence.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={launchCATSimulator}
                className="flex-1 py-4 bg-brand-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-700 transition shadow-lg shadow-brand-100"
              >
                Launch Exam Engine
              </button>
              <button 
                onClick={() => setStage('dashboard')}
                className="py-4 px-6 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CAT SIMULATOR INTERACTIVE WORKSPACE (NCSBN UI elements) */}
      {stage === 'simulator' && (
        <div className="max-w-4xl mx-auto py-2">
          {/* NCSBN styled blue board exam bar */}
          <header className="bg-slate-950 text-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800 shadow-md">
            <div>
              <p className="text-[10px] font-mono tracking-wider uppercase text-amber-500 font-semibold mb-1">
                Graceful Path • PassPoint CAT Simulator
              </p>
              <h3 className="font-serif font-bold text-lg md:text-xl text-slate-50 flex items-center gap-2">
                Candidate Assessment • Day {selectedDay}
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 py-2 px-3 rounded-xl">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-sm tracking-widest font-bold">
                  {formatTimerValue(timerVal)}
                </span>
              </div>
              <button 
                onClick={() => {
                  setConfirmConfig({
                    message: "Are you sure you want to restart this exam from scratch? Your current answers for Day " + selectedDay + " will be reset.",
                    onConfirm: handleRestartCurrentExam
                  });
                }}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-black text-[10px] uppercase tracking-widest rounded-xl flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3 h-3" /> Restart Exam
              </button>
              <button 
                onClick={() => {
                  setConfirmConfig({
                    message: "Are you sure you want to end this exam early? If you've answered at least 15 items, your progress will save & generate diagnostic rationales.",
                    onConfirm: () => handleCompleteExam(false)
                  });
                }}
                className="py-2.5 px-3 bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-600/20 text-red-400 font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition"
              >
                Close Exam
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Interactive CAT Question Column */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl relative min-h-[400px] flex flex-col justify-between">
                
                {/* Question Info Header */}
                <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="bg-slate-900 text-white font-mono text-xs font-bold py-1.5 px-3 rounded-lg">
                      Question {currQNum}
                    </span>
                    <span className="text-slate-400 font-mono text-xs">
                      Difficulty: <b className="uppercase font-sans font-black text-slate-700">{currDifficulty}</b>
                    </span>
                  </div>

                  <span className="text-slate-400 font-mono text-xs flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" /> True adaptive feedback
                  </span>
                </div>

                {loadingQuestion ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-6"></div>
                    <p className="font-serif font-semibold text-lg text-slate-900 animate-pulse">Evaluating Clinical Performance...</p>
                    <p className="text-xs text-slate-400 mt-2 font-mono">Calibrating next NCLEX item parameters...</p>
                  </div>
                ) : errorText ? (
                  <div className="py-12 text-center max-w-md mx-auto">
                    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-bounce" />
                    <p className="font-bold text-slate-900 mb-6">{errorText}</p>
                    <button 
                      onClick={launchCATSimulator}
                      className="px-6 py-3 bg-brand-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-700 transition"
                    >
                      Retry Connection Channel
                    </button>
                  </div>
                ) : questions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-6"></div>
                    <p className="font-serif font-semibold text-lg text-slate-900 animate-pulse">Initializing Simulator...</p>
                    <p className="text-xs text-slate-400 mt-2 font-mono">Calibrating first adaptive question...</p>
                  </div>
                ) : (
                  <div>
                    {/* Stem text */}
                    <div className="mb-10">
                      <p className="text-slate-900 font-serif font-bold text-lg md:text-xl leading-relaxed">
                        {questions[questions.length - 1]?.question}
                      </p>
                    </div>

                    {/* MC Options */}
                    <div className="space-y-4 mb-10">
                      {questions[questions.length - 1]?.options?.map((opt: string, idx: number) => {
                        const isSelected = selectedOpt === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedOpt(idx)}
                            className={`w-full text-left p-5 rounded-2xl border-2 font-semibold text-slate-800 text-base flex justify-between items-center transition-all duration-200 ${
                              isSelected 
                                ? 'border-brand-600 bg-brand-50/50 shadow-inner translate-x-1 font-bold' 
                                : 'border-slate-100 bg-slate-50/40 hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex gap-4 items-start">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                                isSelected ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom buttons panel */}
                    <div className="flex justify-between items-center border-t border-slate-50 pt-6">
                      <span className="text-xs text-slate-400 font-mono">
                        Select a response, then submit to adapt
                      </span>

                      <button
                        onClick={handleNextAdaptiveQuestion}
                        disabled={selectedOpt === null}
                        className="py-4 px-10 bg-brand-600 disabled:opacity-45 disabled:pointer-events-none text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-700 transition-all shadow-md shadow-brand-100 flex items-center gap-2"
                      >
                        Confirm & Next <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar telemetry and guidelines side-car */}
            <div className="space-y-6">
              {/* Clinical Competence Indicator Widget */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-md">
                <h4 className="font-serif font-bold text-slate-900 mb-4 text-base flex items-center gap-2">
                  <Zap className="text-brand-500 w-5 h-5 fill-current" /> Live CAT telemetry
                </h4>

                <div className="space-y-6 text-sm">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                      <span>Client Needs Competence</span>
                      <span>Level: {abilityTheta > 0 ? `+${abilityTheta}` : abilityTheta}</span>
                    </div>

                    {/* Gauge meter bar representing distance to passing standard */}
                    <div className="w-full bg-slate-100 h-3 rounded-full relative overflow-visible">
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-400 z-10" title="NCLEX Minimum boundary"></div>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          abilityTheta >= 2 ? 'bg-green-500' : abilityTheta >= 0 ? 'bg-brand-500' : 'bg-amber-400'
                        }`} 
                        style={{ 
                          width: `${Math.min(100, Math.max(0, 50 + (abilityTheta * 10)))}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-mono uppercase tracking-wider">
                      <span>Low Readiness</span>
                      <span>Licensure Boundary</span>
                      <span>Safe / High</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      In a computerized adaptive test, the examiner dynamically matches your knowledge. Keep responding above the Licensure standard!
                    </p>
                  </div>

                  {currQNum >= 15 && (
                    <button
                      onClick={() => {
                        setConfirmConfig({
                          message: "Would you like to finish and submit this mock exam diagnostic early? Your cumulative capability rating will be evaluated based on entries recorded.",
                          onConfirm: () => handleCompleteExam(false)
                        });
                      }}
                      className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition"
                    >
                      Finish Diagnostic Early
                    </button>
                  )}
                </div>
              </div>

              {/* NCLEX priorities helper cards */}
              <div className="bg-brand-50/70 p-6 rounded-[2rem] border border-brand-100/50">
                <h5 className="font-bold text-brand-900 text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-600" /> Educator Assist
                </h5>
                <ul className="space-y-2.5 text-xs text-brand-800 font-medium">
                  <li>• Airway/Breathing/Circulation comes first.</li>
                  <li>• Look for client safety parameters.</li>
                  <li>• Priorities target unexpected complications, not stable findings.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. EXAM RESULT SCORE REPORT (CAT Diagnostic outcome overview) */}
      {stage === 'result' && viewingResultDay && (
        <div className="max-w-3xl mx-auto py-4">
          {attempts[viewingResultDay] && (
            <div className="bg-white p-8 md:p-16 rounded-[4.5rem] border-2 border-brand-50 shadow-2xl relative text-center">
              
              {/* Badge representing outcome status */}
              {attempts[viewingResultDay].status === 'passed' ? (
                <div>
                  <div className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-green-500 shadow-inner">
                    <Award className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-1">
                    Licensure Pass Probability: HIGH
                  </h3>
                  <div className="inline-flex px-4 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-black uppercase tracking-wider mb-8">
                    NCLEX-RN METRIC EXCEEDED
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-amber-500 shadow-inner">
                    <AlertCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-1">
                    Development Recommended
                  </h3>
                  <div className="inline-flex px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider mb-8">
                    BELOW PASSING STANDARD
                  </div>
                </div>
              )}

              <p className="text-slate-500 max-w-lg mx-auto text-base mb-10 leading-relaxed font-medium">
                Day {viewingResultDay} diagnostic assessment completed. The adaptive CAT analyzer finished with {attempts[viewingResultDay].totalAnswered} items logged. Re-reviewing rationale ensures nursing mistakes turn into verified successes.
              </p>

              {/* Performance indicators list */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-6 bg-slate-50 rounded-3xl border border-slate-100 mb-10 text-left">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Day</p>
                  <p className="text-base font-bold text-slate-800">Day {viewingResultDay}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Items Evaluated</p>
                  <p className="text-base font-bold text-slate-800">{attempts[viewingResultDay].totalAnswered} questions</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Final Ability Score</p>
                  <p className="text-base font-bold text-slate-800">{attempts[viewingResultDay].theta > 0 ? `+${attempts[viewingResultDay].theta}` : attempts[viewingResultDay].theta}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Completed On</p>
                  <p className="text-base font-bold text-slate-800">{attempts[viewingResultDay].date}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setStage('review_answers')}
                  className="flex-1 py-4 bg-brand-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-700 transition"
                >
                  Verify Rationales & Answers
                </button>
                <button 
                  onClick={() => setStage('dashboard')}
                  className="py-4 px-8 bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-widest rounded-xl transition"
                >
                  Return to Grid
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. ANSWERS REVIEW VIEW (Shows user answers, correct answers and detailed rationales) */}
      {stage === 'review_answers' && viewingResultDay && attempts[viewingResultDay] && (
        <div className="max-w-3xl mx-auto py-2">
          <div className="flex justify-between items-center mb-8">
            <div>
              <button 
                onClick={() => setStage('result')}
                className="flex items-center gap-1.5 text-xs text-brand-600 font-bold uppercase tracking-wider hover:underline"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Score Report
              </button>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mt-2">
                Clinical Corrections Review
              </h3>
            </div>
            <span className="text-slate-400 font-mono text-xs">
              Day {viewingResultDay}
            </span>
          </div>

          <div className="space-y-8 pb-12">
            {Object.keys(attempts[viewingResultDay].answers).map((qId, index) => {
              const qAttempt = attempts[viewingResultDay].answers[qId];
              const isUserCorrect = qAttempt.userAnswer === qAttempt.correctAnswer;
              
              return (
                <div key={qId} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-md">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="w-10 h-10 shrink-0 bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center rounded-xl">
                      Q{index + 1}
                    </span>
                    <div>
                      <p className="font-serif font-bold text-slate-900 text-lg leading-snug">
                        {qAttempt.question}
                      </p>
                      <span className="inline-block mt-2 font-mono text-[10px] text-slate-400 uppercase">
                        Calibrated level: {qAttempt.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Options display with correct/incorrect indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {qAttempt.options.map((opt, oIdx) => {
                      const isUserSelection = qAttempt.userAnswer === oIdx;
                      const isOptionCorrect = qAttempt.correctAnswer === oIdx;

                      let cellStyle = "border-slate-50 bg-slate-50/40 text-slate-500";
                      
                      if (isOptionCorrect) {
                        cellStyle = "border-green-200 bg-green-50/50 text-green-700 font-bold";
                      } else if (isUserSelection && !isOptionCorrect) {
                        cellStyle = "border-red-200 bg-red-50/50 text-red-700 font-bold";
                      }

                      return (
                        <div key={oIdx} className={`p-4 rounded-xl border-2 text-sm flex justify-between items-center ${cellStyle}`}>
                          <span className="flex items-center gap-2.5">
                            <span className={`w-5 h-5 rounded text-[10px] font-black flex items-center justify-center ${
                              isOptionCorrect ? 'bg-green-600 text-white' : isUserSelection ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            {opt}
                          </span>
                          {isOptionCorrect && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {isUserSelection && !isOptionCorrect && <AlertCircle className="w-4 h-4 text-red-600" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Clinical Rationale */}
                  <div className="p-6 bg-brand-50/60 border border-brand-100 rounded-2xl">
                    <h5 className="font-black text-[10px] uppercase text-brand-700 tracking-wider mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Clinical Educator's Decision Rationale:
                    </h5>
                    <p className="text-slate-700 text-sm italic font-medium leading-relaxed">
                      "{qAttempt.explanation}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {confirmConfig && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-slate-950 mb-3">Please Confirm</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
              {confirmConfig.message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmConfig(null)}
                className="flex-grow py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  const cb = confirmConfig.onConfirm;
                  setConfirmConfig(null);
                  cb();
                }}
                className="flex-grow py-3 px-4 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition shadow-lg shadow-slate-950/10"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
