import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
// @ts-ignore
import html2canvas from 'html2canvas';
import { 
  LayoutDashboard, BookOpen, Video, FileText, Calendar, Award, BarChart3, ChevronRight, 
  PlayCircle, Clock, ChevronLeft, Sparkles, ExternalLink, LogOut, Bell, CheckCircle2, 
  Lock, Download, Star, MessageCircle, X, Menu, Trash2, Heart, ShieldCheck, Zap, Globe, CreditCard,
  User as UserIcon, Camera, Key, Mail, Phone, AtSign, Edit2, Upload as UploadIcon, ChevronDown, CheckCircle, AlertCircle, Info, RefreshCw
} from 'lucide-react';
import { User, PracticeTest, QuizQuestion, Notification, Module, Lesson, NavLink, GlobalLinks, BrandingAssets } from '../../types';
import { Logo } from '../../components/Layout';
import { StudyCalendar } from '../../components/StudyCalender';
import { PassPointMock } from '../../components/PassPointMock';
import { supabase } from '../../services/supabaseClient';
import { COUNTRY_LIST } from '../../constants';
import { DIRECTOR_SIGNATURE } from '../../services/signature';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  addReview: (text: string, rating: number) => Promise<boolean>;
  notifications: Notification[];
  onDeleteNotification: (id: string) => void;
  courseContent: Record<string, Lesson[]>;
  practiceTests: PracticeTest[];
  materials: Lesson[];
  links: GlobalLinks;
  examDate: string;
  onUpdateProfile: () => void;
  branding?: BrandingAssets;
}

const DAILY_CHALLENGE_POOL = [
  {
    prefix: "Clinical Case Study: Transmissions",
    question: "A client with suspected acute bacterial meningitis of respiratory transmission is being admitted. Which transmission precaution should the nurse initiate immediately?",
    options: [
      "Droplet precautions with private room placement",
      "Airborne precautions with negative air pressure venting",
      "Standard client contact precaution and gloves only",
      "Protective isolation with HEPA filtration mask"
    ],
    correctAnswer: 0,
    explanation: "Meningitis caused by Neisseria meningitidis or Haemophilus influenzae is transmitted via large respiratory droplets. The nurse must implement droplet precautions immediately, requiring surgical masks upon entering the room and private room placement. Airborne precautions are reserved for pathogens like tuberculosis (TB), which are carried on small nuclei."
  },
  {
    prefix: "Pharmacology & IV Safety",
    question: "The nurse is reviewing orders for a client admitted with acute decompensated heart failure and severe peripheral edema. Which prescription should the nurse clarify with the primary care provider?",
    options: [
      "Intravenous Furosemide 40 mg twice daily",
      "Continuous bedside cardiac rhythm telemetry monitoring",
      "Continuous infusion of 0.9% Normal Saline at 125 mL/hour",
      "Daily mornings weights prior to breakfast with strict charting"
    ],
    correctAnswer: 2,
    explanation: "Administering a continuous infusion of 0.9% Normal Saline (isotonic fluid) at a rapid rate of 125 mL/hour to a client experiencing acute decompensated heart failure will cause severe volume overload, worsening pulmonary congestion. Loop diuretics and fluid restrictions are standard treatments instead."
  },
  {
    prefix: "Clinical Chemistry Indicators",
    question: "The nurse reviews laboratory values for an adult client receiving oral lithium carbonate for bipolar disorder and notices a serum lithium level of 2.2 mEq/L. Which symptom should the nurse expect to find?",
    options: [
      "Mild fine hand tremors and occasional dry mouth",
      "Severe coarse muscle tremors, abdominal pain, diarrhea, and slurred speech",
      "Sudden severe hypotension, rapid weight gain, and lower leg hematoma",
      "Profuse generalized sweating, acute fever, and lead-pipe rigidity"
    ],
    correctAnswer: 1,
    explanation: "A lithium level of 2.2 mEq/L indicates severe lithium toxicity (therapeutic range is 0.6 to 1.2 mEq/L). Signs of toxic levels include severe coarse tremors, persistent vomiting, severe watery diarrhea, ataxia, and slurred speech. Mild hand tremors are normal side effects within the therapeutic range."
  },
  {
    prefix: "Orthopedic Care Management",
    question: "A nurse is caring for a client who underwent a total hip arthroplasty (posterior approach) 12 hours ago. Which positioning intervention is essential to prevent prosthetic dislocation?",
    options: [
      "Keep the affected leg in a position of adduction using a foam pillow",
      "Maintain the affected leg in abduction using an abductor wedge or pillow between the legs",
      "Ensure the head of the bed is elevated to a full 90-degree angle during meals",
      "Encourage the client to cross their legs at the ankles for comfortable positioning"
    ],
    correctAnswer: 1,
    explanation: "Following total hip arthroplasty via a posterior approach, the leg must be kept in abduction to keep the femoral head securely within the acetabular cup. Adduction, leg-crossing, and flexing the hip past 90 degrees are strictly contraindicated as they heavily increase dislocation risk."
  },
  {
    prefix: "Endocrine Bedside Risks",
    question: "The nurse is preparing to care for a client returning to the surgical floor after a total thyroidectomy. Which bedside monitoring equipment is the absolute priority for the nurse to verify?",
    options: [
      "A sterile abdominal paracentesis tray",
      "An emergency tracheostomy set and a functioning calcium gluconate vial",
      "An automated external cardiac defibrillator (AED)",
      "An incentive spirometer and high-flow reservoir oxygen mask"
    ],
    correctAnswer: 1,
    explanation: "Following a thyroidectomy, major clinical risks include acute respiratory distress from tracheal compression (from surgical hemorrhage) and hypocalcemic tetany (spasm) due to accidental trauma or removal of the parathyroid glands. Bedside safety requires a tracheostomy set for emergency airway access, and IV calcium gluconate to immediately reverse tetany."
  },
  {
    prefix: "Maternal Health & Safety",
    question: "A pregnant client at 34 weeks gestation is admitted with severe preeclampsia. The nurse is administering an intravenous infusion of magnesium sulfate. Which assessment finding requires immediate halting of the infusion?",
    options: [
      "A deep tendon reflex score of 1+ (hyporeflexia) or absent reflexes",
      "A respiratory rate of 14 breaths/minute and mild facial flushing",
      "A serum magnesium level of 5.5 mEq/L",
      "Urine output totaling 120 mL over the last 4 hours"
    ],
    correctAnswer: 0,
    explanation: "Magnesium sulfate is a central nervous system depressant used to prevent seizures in preeclampsia. Loss of deep tendon reflexes (hyporeflexia) is the earliest cardinal sign of magnesium toxicity, which can quickly lead to respiratory depression and cardiac arrest. If reflexes are diminished/absent, the infusion must be stopped."
  },
  {
    prefix: "Pediatric Triage Management",
    question: "A child diagnosed with acute spasmodic croup is brought to the clinic. Which non-pharmacological caregiver advice should the nurse reinforce to manage acute stridor episodes at home?",
    options: [
      "Place the child in a room with a hot, humid steam-filled shower, or expose them to cool night air",
      "Administer warm honey water immediately to coat the laryngeal structures",
      "Encourage rapid fluid intake of acidic citrus juices",
      "Have the child lie in a completely flat, prone position to expand respiratory muscles"
    ],
    correctAnswer: 0,
    explanation: "Spasmodic croup involves sudden laryngeal spasms. Breathing in warm, moist steam (e.g. from a running shower) or exposure to cold, crisp ambient air helps rapidly relax laryngeal spasms and reduce mucosal edema. Honey is contraindicated in children under 1 year of age due to botulism risks."
  }
];

const getRelativeTime = (dateInput: string | Date) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Recently';
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 84400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch (e) {
    return 'Recently';
  }
};

const getIssueDate = (user: User, notifications: any[]) => {
  try {
    // Layer 1: Look for a "Certificate Issued!" notification to get the precise real-world db timestamp
    if (notifications && notifications.length > 0) {
      const certNotification = notifications.find(n => 
        n.title === "Certificate Issued!" || 
        n.title?.toLowerCase().includes("certificate issued")
      );
      if (certNotification && certNotification.created_at) {
        const date = new Date(certNotification.created_at);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
        }
      }
    }

    // Layer 2: Check if there is a certificateIssuedAt property on the user object
    if (user.certificateIssuedAt) {
      const date = new Date(user.certificateIssuedAt);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
    }

    // Layer 3: Check localStorage as a browser-persistent fallback to prevent changing on page reloads
    const localKey = `certificate_issued_date_v1_${user.id}`;
    const savedDate = localStorage.getItem(localKey);
    if (savedDate) {
      const date = new Date(savedDate);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
    }

    // Layer 4: Fall back to deterministic date based on user.id to keep it completely stable across sessions
    let date: Date;
    let hash = 0;
    const userId = user.id || 'default';
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const dayOffset = Math.abs(hash) % 28 + 1; // 1 to 28
    date = new Date(2026, 3, dayOffset); // April 2026 hash

    if (isNaN(date.getTime())) {
      date = new Date();
    }
    
    // Save to localStorage to guarantee stability
    localStorage.setItem(localKey, date.toISOString());

    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
};

const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-500">
    <div className="bg-brand-50 p-12 rounded-[3rem] border border-brand-100 shadow-xl shadow-brand-100/10 max-w-md">
      <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
        <Sparkles className="w-8 h-8 text-brand-500" />
      </div>
      <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-brand-600 font-black uppercase tracking-[0.3em] text-[10px]">Experience Coming Soon</p>
    </div>
  </div>
);

const NCLEX_INSIGHTS = [
  "Assess the patient first, never the equipment. Safety is your top NCLEX priority.",
  "When in doubt, choose the answer that keeps the patient safe and stable.",
  "Maslow's Hierarchy: Physiological needs (Airway, Breathing, Circulation) always come first.",
  "ADPIE: Assessment is the first step of the nursing process. Don't jump to intervention.",
  "Acute vs. Chronic: Always prioritize the patient with an acute condition over a stable chronic one.",
  "Expected vs. Unexpected: Focus on findings that are NOT typical for the patient's diagnosis.",
  "Therapeutic Communication: Avoid 'Why' questions and focus on the patient's feelings.",
  "Delegation: Don't delegate what you can EAT (Evaluate, Assess, Teach).",
  "Infection Control: Standard precautions apply to all patients, regardless of diagnosis.",
  "Pharmacology: Always check for allergies and verify the 6 rights of medication administration."
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  user, onLogout, addReview, notifications, onDeleteNotification, 
  courseContent, practiceTests, materials, links, examDate, onUpdateProfile, branding
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [zoomedAvatar, setZoomedAvatar] = useState<string | null>(null);
  const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const correctionsRef = useRef<HTMLDivElement>(null);

  const scrollToCorrections = () => {
    if (!correctionsRef.current) return;
    const element = correctionsRef.current;
    const container = document.getElementById('student-main-content');
    
    // Safety offset: 110px so it sits beautifully below the mobile sticky topbar (approx 64-80px tall)
    const offset = 110;
    
    // Check if screen is mobile (lg: scale in Tailwind is 1024px)
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      let offsetTop = 0;
      let curr: HTMLElement | null = element;
      while (curr) {
        offsetTop += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
      });
    } else if (container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const relativeTop = elementRect.top - containerRect.top;
      
      container.scrollTo({
        top: container.scrollTop + relativeTop - offset,
        behavior: 'smooth'
      });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Quiz State
  const [activeTest, setActiveTest] = useState<PracticeTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [isTestsLoading, setIsTestsLoading] = useState(true);
  const [activePracticeSession, setActivePracticeSession] = useState<any | null>(null);

  // Daily Challenge State
  const [dailyChallengeSelected, setDailyChallengeSelected] = useState<number | null>(null);
  const [dailyChallengeFeedback, setDailyChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState<boolean>(() => {
    const currentUTCDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const storedCompletedDay = localStorage.getItem(`daily_completed_day_v1_${user.id}`);
    return storedCompletedDay === String(currentUTCDay);
  });

  useEffect(() => {
    const currentUTCDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const storedCompletedDay = localStorage.getItem(`daily_completed_day_v1_${user.id}`);
    if (storedCompletedDay !== String(currentUTCDay)) {
      setDailyChallengeCompleted(false);
      setDailyChallengeSelected(null);
      setDailyChallengeFeedback(null);
    } else {
      setDailyChallengeCompleted(true);
      const challengeIdx = currentUTCDay % DAILY_CHALLENGE_POOL.length;
      const challenge = DAILY_CHALLENGE_POOL[challengeIdx];
      setDailyChallengeSelected(challenge.correctAnswer);
      setDailyChallengeFeedback({
        isCorrect: true,
        text: `Correct! ${challenge.explanation}`
      });
    }
  }, [user.id]);

  // Mobile Tabs for responsive Practice Hub layout
  const [practiceTab, setPracticeTab] = useState<'exams' | 'arena'>('exams');
  const [leaderboardUsers, setLeaderboardUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudentsForRank = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, username, progress, badges')
          .eq('role', 'STUDENT');
        if (data) {
          setLeaderboardUsers(data);
        }
      } catch (err) {
        console.error("Failed to load students for live leaderboard:", err);
      }
    };
    fetchStudentsForRank();
  }, [user.progress, user.badges]);

  useEffect(() => {
    const activeKey = `practice_active_session_v1_${user.id}`;
    const savedActive = localStorage.getItem(activeKey);
    if (savedActive) {
      try {
        const parsed = JSON.parse(savedActive);
        if (parsed && parsed.activeTest) {
          const freshTest = practiceTests.find(t => t.id === parsed.activeTest.id);
          if (freshTest) {
            parsed.activeTest = freshTest;
          }
        }
        setActivePracticeSession(parsed);
      } catch (e) {
        console.error("Failed to parse saved active practice session", e);
      }
    }
  }, [user.id, practiceTests]);

  useEffect(() => {
    if (activeTest && !quizFinished) {
      const activeKey = `practice_active_session_v1_${user.id}`;
      const session = {
        activeTest,
        currentQuestionIndex,
        userAnswers
      };
      localStorage.setItem(activeKey, JSON.stringify(session));
      setActivePracticeSession(session);
    }
  }, [activeTest, currentQuestionIndex, userAnswers, quizFinished, user.id]);

  // Profile Edit States
  const [editName, setEditName] = useState(user.name);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editPhone, setEditPhone] = useState(user.phoneNumber || '');
  const [editAvatar, setEditAvatar] = useState(user.avatar || '');
  const [editEmail, setEditEmail] = useState(user.email);
  const [editCountry, setEditCountry] = useState(user.country || 'Nigeria');
  const [newPassword, setNewPassword] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });
  const [customNotification, setCustomNotification] = useState<{ title: string; message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const DASHBOARD_LINKS = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'My Courses', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Live Classes', icon: <Video className="w-5 h-5" /> },
    { label: 'Practice Tests', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'PassPoint Mock', icon: <Zap className="w-5 h-5 text-amber-500 fill-amber-500/20 animate-pulse" /> },
    { label: 'Materials', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', icon: <UserIcon className="w-5 h-5" /> },
    { label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { label: 'Certificates', icon: <Award className="w-5 h-5" /> },
  ];

  useEffect(() => {
    if (practiceTests.length > 0 || courseContent.FOUNDATIONS.length > 0) {
      setIsTestsLoading(false);
    }
    // Set a timeout to stop loading even if empty
    const timer = setTimeout(() => setIsTestsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [practiceTests, courseContent]);

  const handleStartTest = (test: PracticeTest) => {
    const activeKey = `practice_active_session_v1_${user.id}`;
    const savedActive = localStorage.getItem(activeKey);
    if (savedActive) {
      try {
        const parsed = JSON.parse(savedActive);
        if (parsed && parsed.activeTest?.id === test.id) {
          // ALWAYS use the upgraded/freshest test from the dashboard state rather than relying on cached older questions length
          setActiveTest(test);
          setCurrentQuestionIndex(parsed.currentQuestionIndex);
          setUserAnswers(parsed.userAnswers);
          setQuizFinished(false);
          setShowCorrections(false);
          setShowPaywall(false);
          return;
        }
      } catch (e) {
        console.error("Failed to parse saved active practice session on start", e);
      }
    }

    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizFinished(false);
    setShowCorrections(false);
    setShowPaywall(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!activeTest) return;
    const q = activeTest.questions[currentQuestionIndex];
    setUserAnswers({ ...userAnswers, [q.id]: optionIndex });
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    const isPassing = score >= 75;
    if (isPassing) {
      handleBadgeEarned(activeTest?.difficulty || 'easy');
    }
    setQuizFinished(true);
    localStorage.removeItem(`practice_active_session_v1_${user.id}`);
    setActivePracticeSession(null);

    // Save test performance progression directly to Supabase cloud database
    try {
      let targetProgress = user.progress || 0;
      if (isPassing) {
        if (activeTest?.difficulty === 'easy') {
          targetProgress = Math.max(targetProgress, 40);
        } else if (activeTest?.difficulty === 'medium') {
          targetProgress = Math.max(targetProgress, 75);
        } else if (activeTest?.difficulty === 'hard') {
          targetProgress = Math.max(targetProgress, 100);
        }
      } else {
        // Give a minor effort-based bump for finishing a practice test
        targetProgress = Math.min(100, targetProgress + 5);
      }
      
      const { error } = await supabase.from('profiles').update({ progress: targetProgress }).eq('id', user.id);
      if (!error) {
        onUpdateProfile();
      }
    } catch (dbErr) {
      console.error("Failed to commit progress to DB on quiz completion:", dbErr);
    }
  };

  const handleNextQuestion = () => {
    if (!activeTest) return;
    
    // Save question progression to user total item analytics count
    const currentCount = parseInt(localStorage.getItem('questions_solved_v1_count') || '0', 10);
    localStorage.setItem('questions_solved_v1_count', (currentCount + 1).toString());

    // Auto scroll the window to the very top so the user can easily focus on the next clinical question
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainDashboardContainer = document.querySelector('main');
    if (mainDashboardContainer) {
      mainDashboardContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Freemium Paywall Logic: Free users hit a wall after 15 questions
    if (!user.hasPaidLive && currentQuestionIndex === 14) {
      setShowPaywall(true);
      return;
    }

    if (currentQuestionIndex < activeTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handleBadgeEarned = async (difficulty: string) => {
    const badgeName = difficulty.charAt(0).toUpperCase() + difficulty.slice(1) + " Mastery Badge";
    setEarnedBadge(badgeName);
    
    // Save badge to database
    try {
      const currentBadges = user.badges || [];
      if (!currentBadges.includes(badgeName)) {
        const newBadges = [...currentBadges, badgeName];
        const { error } = await supabase.from('profiles').update({ badges: newBadges }).eq('id', user.id);
        if (!error) {
          onUpdateProfile();
        } else {
          console.error("Failed to save badge to database:", error);
        }
      }
    } catch (err) {
      console.error("Error saving badge:", err);
    }
    
    // Realistic confetti popper effect
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const downloadCertificate = async (format: 'png' | 'pdf' = 'png') => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await (html2canvas as any)(certificateRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      const image = canvas.toDataURL("image/png", 1.0);
      
      if (format === 'pdf') {
        const { jsPDF } = await import('jspdf');
        // Match the certificate visual dimensions exactly for a perfect high-res landscape page output
        const width = canvas.width / 2;
        const height = canvas.height / 2;
        
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [width, height]
        });
        
        pdf.addImage(image, 'PNG', 0, 0, width, height, undefined, 'FAST');
        pdf.save(`NCLEX-Mastery-Certificate-${user.name.replace(/\s+/g, '-')}.pdf`);
      } else {
        const link = document.createElement('a');
        link.download = `NCLEX-Mastery-Certificate-${user.name.replace(/\s+/g, '-')}.png`;
        link.href = image;
        link.click();
      }
    } catch (err) {
      console.error("Download failed:", err);
      setCustomNotification({
        title: "Download Issue",
        message: "Failed to download certificate. Please try again or use the Print Certificate option.",
        type: "error"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUpgradeToPremium = () => {
    window.open(`https://wa.me/447470539081`, '_blank');
  };

  const calculateScore = () => {
    if (!activeTest) return 0;
    let correct = 0;
    const totalAllowed = !user.hasPaidLive ? Math.min(15, activeTest.questions.length) : activeTest.questions.length;
    
    activeTest.questions.slice(0, totalAllowed).forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / totalAllowed) * 100);
  };

  const openAsset = (data: string, title: string) => {
    if (!data) return;

    try {
      if (data.startsWith('data:')) {
        const arr = data.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const url = URL.createObjectURL(blob);
        
        // Use a hidden link for better browser compatibility
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        // For PDFs, we want to view, not download, if possible
        if (mime !== 'application/pdf') {
          link.download = title || 'download';
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Revoke after a longer delay to ensure the browser has opened it
        setTimeout(() => URL.revokeObjectURL(url), 120000);
      } else {
        const link = document.createElement('a');
        link.href = data;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.error("Error opening asset:", e);
      // Ultimate fallback
      const link = document.createElement('a');
      link.href = data;
      link.download = title || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ text: '', type: '' });

    try {
      // We build the update object dynamically
      const updateData: Partial<User> = {
        name: editName,
        username: editUsername,
      };

      // Only add these if they are supported by your schema
      // The try/catch block below will handle the "missing column" error gracefully
      if (editPhone) (updateData as any).phone_number = editPhone;
      if (editCountry) updateData.country = editCountry;
      if (editAvatar !== undefined) updateData.avatar = editAvatar === '' ? undefined : editAvatar;

      const { error: profileError } = await supabase.from('profiles').update(updateData as any).eq('id', user.id);

      if (profileError) {
        // If any column is missing, we fall back to a basic update of just name/username
        if (profileError.message.includes('column') || profileError.code === '42703') {
          const { error: retryError } = await supabase.from('profiles').update({
            name: editName,
            username: editUsername,
          }).eq('id', user.id);
          
          if (retryError) throw retryError;
          setProfileMessage({ 
            text: 'Profile updated. (Note: Some fields like Country/Phone/Avatar require adding columns to your Supabase table).', 
            type: 'success' 
          });
        } else {
          throw profileError;
        }
      } else {
        if (editEmail !== user.email) {
          const { error: emailError } = await supabase.auth.updateUser({ email: editEmail });
          if (emailError) throw emailError;
          setProfileMessage({ text: 'Profile updated. Check your new email for a verification link.', type: 'success' });
        } else {
          setProfileMessage({ text: 'Profile updated successfully!', type: 'success' });
        }
      }

      onUpdateProfile();
    } catch (err) {
      setProfileMessage({ text: (err as any).message, type: 'error' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setProfileLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setNewPassword('');
      setProfileMessage({ text: 'Password changed successfully!', type: 'success' });
    } catch (err) {
      setProfileMessage({ text: (err as any).message, type: 'error' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (reviewLoading || !reviewText.trim()) return;
    setReviewLoading(true);
    const success = await addReview(reviewText, rating);
    if (success) {
      setReviewSubmitted(true);
      setReviewText('');
    } else {
      setCustomNotification({
        title: "Review Submission Failed",
        message: "Failed to submit review. Please try again later or check your network.",
        type: "error"
      });
    }
    setReviewLoading(false);
  };

  const handleContactAdminPayment = (platform: 'whatsapp' | 'telegram') => {
    const msg = encodeURIComponent(`Hi Admin, I'm ${user.name} and I want to inquire about the enrollment fee to unlock Live Classes in the Graceful Path dashboard.`);
    const url = platform === 'whatsapp' 
      ? `https://wa.me/447470539081`
      : `https://t.me/+r0sIS5RfnuFhYmFk?text=${msg}`;
    window.open(url, '_blank');
  };

  const renderLiveClasses = () => {
    if (!user.hasPaidLive) {
      return (
        <div className="animate-in fade-in duration-700 max-w-4xl mx-auto">
          <div className="bg-white p-6 sm:p-20 rounded-[3rem] sm:rounded-[4rem] border-2 border-brand-50 shadow-2xl shadow-brand-100/20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 hidden sm:block">
               <div className="bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Premium Content</div>
             </div>
             <div className="bg-brand-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
               <Lock className="w-10 h-10 text-brand-600" />
             </div>
             <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-slate-900">Unlock Live Professional Coaching</h2>
             <p className="text-base sm:text-xl text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed font-medium">Join our interactive clinical preparation sessions with licensed educators. Transform your study routine into licensure victory.</p>
             
             <div className="bg-slate-50 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 mb-12 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8 mx-auto">Flexible Enrollment Options</p>
                <div className="flex justify-center">
                  <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100 inline-block min-w-[300px]">
                    <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Pricing & Billing</p>
                    <p className="text-2xl sm:text-3xl font-black text-brand-600 tracking-tight leading-tight">Please Contact Admin for Enrollment Fee</p>
                    <p className="mt-4 text-xs font-medium text-slate-500 italic max-w-xs mx-auto">Fees are tailored based on your region and target NCLEX attempt cycle.</p>
                  </div>
                </div>
             </div>

             <div className="space-y-4">
                <p className="text-xs sm:text-sm font-bold text-slate-400 mb-4 italic">Proceed to secure your spot via official verification:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <button 
                    onClick={() => handleContactAdminPayment('whatsapp')}
                    className="flex-1 max-w-xs mx-auto sm:mx-0 bg-green-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-green-700 transition flex items-center justify-center"
                   >
                     <MessageCircle className="w-5 h-5 mr-3" /> WhatsApp Admin
                   </button>
                   <button 
                    onClick={() => handleContactAdminPayment('telegram')}
                    className="flex-1 max-w-xs mx-auto sm:mx-0 bg-brand-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-brand-700 transition flex items-center justify-center"
                   >
                     <Globe className="w-5 h-5 mr-3" /> Telegram Admin
                   </button>
                </div>
                <p className="mt-8 text-[10px] sm:text-xs font-medium text-slate-400 max-w-sm mx-auto">After payment confirmation, your academy access will be unlocked instantly by the administrator.</p>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in slide-in-from-right-5 duration-500 max-w-4xl">
        <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900 uppercase">Virtual Learning Hub</h2>
        <div className="bg-white p-10 sm:p-16 rounded-[3rem] border-2 border-brand-50 shadow-xl shadow-brand-100/20 text-center">
           <div className="bg-brand-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
             <Video className="w-10 h-10 text-brand-600" />
           </div>
           <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900">Next Professional Session</h3>
           <p className="text-slate-500 mb-10 text-base max-w-md mx-auto">Prepare your workspace and join our interactive clinical preparation group.</p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button onClick={() => window.open(links?.liveSessionZoom || '#', '_blank')} className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand-200 hover:bg-brand-700 transition">
               <Video className="w-5 h-5 mr-3 inline" /> Join Session
             </button>
             <button onClick={() => window.open(links?.paidLiveWhatsapp || '#', '_blank')} className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-green-200 hover:bg-green-700 transition">
               <MessageCircle className="w-5 h-5 mr-3 inline" /> WhatsApp Team
             </button>
             <a href={links?.paidLiveTelegram || '#'} target="_blank" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition flex items-center justify-center">
               <Globe className="w-5 h-5 mr-3" /> Telegram Hub
             </a>
           </div>
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch (currentView) {
      case 'Calendar': return <StudyCalendar />;
      case 'PassPoint Mock':
        return (
          <PassPointMock 
            user={user} 
            onClose={() => setCurrentView('Dashboard')} 
            onUpgrade={handleUpgradeToPremium} 
          />
        );
      case 'Certificates': 
        return (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Your Professional Achievements</h2>
              <p className="text-lg text-slate-500 font-medium">Official recognition of your clinical mastery.</p>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
              {user.hasCertificate ? (
                <div className="space-y-12">
                  <div 
                    id="print-certificate-area"
                    ref={certificateRef}
                    className="bg-white p-4 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-2xl relative flex flex-col justify-center w-full mx-auto overflow-visible"
                  >
                    <div className="absolute inset-0 bg-brand-50/10 rounded-[1.5rem] md:rounded-[2.5rem]"></div>
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 left-0 w-12 h-12 md:w-32 md:h-32 border-t-4 md:border-t-8 border-l-4 md:border-l-8 border-brand-200 m-2 md:m-8 rounded-tl-xl md:rounded-tl-[2rem]"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 md:w-32 md:h-32 border-t-4 md:border-t-8 border-r-4 md:border-r-8 border-brand-200 m-2 md:m-8 rounded-tr-xl md:rounded-tr-[2rem]"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 md:w-32 md:h-32 border-b-4 md:border-b-8 border-l-4 md:border-l-8 border-brand-200 m-2 md:m-8 rounded-bl-xl md:rounded-bl-[2rem]"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 md:w-32 md:h-32 border-b-4 md:border-b-8 border-r-4 md:border-r-8 border-brand-200 m-2 md:m-8 rounded-br-xl md:rounded-br-[2rem]"></div>

                    <div className="relative z-10 border-2 md:border-[4px] border-brand-100 p-4 md:p-12 rounded-xl md:rounded-[2rem] text-center flex flex-col justify-between min-h-[350px] md:min-h-[600px]">
                      <div className="flex justify-between items-start mb-6 md:mb-10">
                        <div className="transform scale-75 md:scale-110 origin-top-left">
                          <Logo src={branding?.logo} />
                        </div>
                        <div className="text-right">
                          <p className="text-[7px] md:text-xs font-black text-brand-600 uppercase tracking-widest">Certificate ID</p>
                          <p className="text-[9px] md:text-sm font-bold text-slate-400">GP-{user.id.slice(0,8).toUpperCase()}</p>
                        </div>
                      </div>
                      
                      <div className="py-2 md:py-6">
                        <h3 className="text-xl md:text-6xl font-serif font-bold text-slate-900 mb-1 md:mb-6 leading-tight">Certificate of Mastery</h3>
                        <p className="text-[10px] md:text-2xl text-slate-500 font-medium mb-1 md:mb-8">This is to certify that</p>
                        <h4 className="text-lg md:text-7xl font-serif font-bold text-brand-600 mb-2 md:mb-10 border-b-2 md:border-b-4 border-brand-100 inline-block px-4 md:px-16 pb-1 md:pb-4">{user.name}</h4>
                        <p className="text-[9px] md:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto px-2 md:px-4">
                          Has successfully completed the comprehensive NCLEX Mastery Program at Graceful Path Global Health Academy, 
                          demonstrating exceptional clinical reasoning and professional nursing competence.
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end mt-6 md:mt-12">
                        <div className="text-left relative">
                          {/* Director's Signature Image */}
                          <div className="absolute -top-6 md:-top-16 left-2 md:left-8 w-16 md:w-44 h-10 md:h-20 pointer-events-none select-none">
                            <img 
                              src={DIRECTOR_SIGNATURE} 
                              alt="Academy Director Signature" 
                              className="w-full h-full object-contain mix-blend-multiply"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="w-20 md:w-64 h-px bg-slate-300 mb-1 md:mb-4"></div>
                          <p className="text-[10px] md:text-xl font-bold text-slate-900">Academy Director</p>
                          <p className="text-[7px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Graceful Path Global Health</p>
                        </div>
                        <div className="text-center pb-1 md:pb-4">
                          <p className="text-[7px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-3 font-sans">Date of Issue</p>
                          <p className="text-[10px] md:text-lg font-serif font-bold text-brand-700">{getIssueDate(user, notifications)}</p>
                        </div>
                        <div className="bg-brand-50 p-1.5 md:p-6 rounded-lg md:rounded-2xl border border-brand-100 flex items-center justify-center shadow-inner">
                          <ShieldCheck className="w-5 h-5 md:w-16 md:h-16 text-brand-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 relative">
                    <div 
                      className="flex-1 relative"
                      onMouseLeave={() => setShowDownloadMenu(false)}
                    >
                      <button 
                        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                        disabled={isDownloading}
                        className="w-full py-4 md:py-6 bg-brand-600 text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl hover:bg-brand-700 transition shadow-xl flex items-center justify-center group disabled:opacity-50"
                      >
                        {isDownloading ? (
                          <span className="flex items-center">
                            <Clock className="w-5 h-5 mr-3 animate-spin" /> Generating...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Download className="w-5 h-5 mr-3 group-hover:animate-bounce" /> Download Certificate <ChevronDown className="w-4 h-4 ml-2" />
                          </span>
                        )}
                      </button>
                      
                      {showDownloadMenu && !isDownloading && (
                        <div className="absolute left-0 right-0 bottom-full mb-3 bg-white rounded-2xl border border-slate-100 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                          <button
                            onClick={() => {
                              setShowDownloadMenu(false);
                              downloadCertificate('pdf');
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition"
                          >
                            <div className="bg-rose-50 p-2.5 rounded-xl text-rose-500">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs md:text-sm font-bold text-slate-800">Save as PDF Document (.pdf)</p>
                              <p className="text-[10px] text-slate-400">Official document format for printing & sharing</p>
                            </div>
                          </button>
                          
                          <button
                            onClick={() => {
                              setShowDownloadMenu(false);
                              downloadCertificate('png');
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition mt-1"
                          >
                            <div className="bg-brand-50 p-2.5 rounded-xl text-brand-600">
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs md:text-sm font-bold text-slate-800">Save as PNG Image (.png)</p>
                              <p className="text-[10px] text-slate-400">High-resolution image for portfolios & devices</p>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => window.print()}
                      className="flex-1 py-4 md:py-6 bg-slate-900 text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl hover:bg-black transition shadow-xl flex items-center justify-center group"
                    >
                      <FileText className="w-5 h-5 mr-3" /> Print Certificate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-16 rounded-[3rem] border border-gray-100 shadow-sm text-center">
                  <div className="bg-slate-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-300">
                    <Award className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">Certificate Pending</h3>
                  <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto font-medium leading-relaxed">
                    Your official certificate is issued manually by the Academy Admin after a final review of your mastery badges and progress.
                  </p>
                  <div className="inline-flex items-center px-6 py-3 bg-brand-50 text-brand-600 rounded-full text-xs font-black uppercase tracking-widest">
                    <Clock className="w-4 h-4 mr-2" /> Under Review
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'Practice Tests':
        if (activeTest) {
          if (quizFinished) {
            const score = calculateScore();
            return (
              <div className="animate-in zoom-in duration-300 max-w-3xl mx-auto py-10">
                <div className="bg-white p-12 rounded-[4rem] text-center border-2 border-brand-50 shadow-2xl">
                  <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner ${score >= 75 ? 'bg-green-50 text-green-500' : 'bg-brand-50 text-brand-600'}`}>
                    <CheckCircle className="w-16 h-16" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Exam Result</h2>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">{activeTest.title}</p>
                  
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 mb-10">
                    <p className="text-7xl font-black text-slate-900 mb-2">{score}%</p>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest">{score >= 75 ? 'Clinical Readiness Confirmed' : 'Needs Further Review'}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                        setShowCorrections(true);
                        setTimeout(() => {
                          scrollToCorrections();
                        }, 150);
                      }} 
                      className="flex-1 bg-brand-600 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-brand-700 transition"
                    >
                      View Corrections
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setUserAnswers({});
                        setQuizFinished(false);
                        setShowCorrections(false);
                        localStorage.removeItem(`practice_active_session_v1_${user.id}`);
                      }} 
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-md transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5 inline-block mr-1.5" /> Retake / Restart
                    </button>
                    <button onClick={() => setActiveTest(null)} className="flex-grow-0 sm:flex-1 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition">Back to Hub</button>
                  </div>
                </div>

                {showCorrections && (
                  <div ref={correctionsRef} className="mt-12 space-y-8 animate-in slide-in-from-bottom-5 duration-500">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 px-4">Detailed Correction Review</h3>
                    {activeTest.questions.slice(0, !user.hasPaidLive ? 15 : activeTest.questions.length).map((q, i) => (
                      <div key={q.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                           <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">Q{i+1}</span>
                           <p className="font-bold text-slate-900 text-lg">{q.question}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                           {q.options.map((opt, idx) => {
                             const isUserAnswer = userAnswers[q.id] === idx;
                             const isCorrectAnswer = q.correctAnswer === idx;
                             let colorClass = 'bg-slate-50 text-slate-500 border-slate-100';
                             if (isCorrectAnswer) colorClass = 'bg-green-50 text-green-700 border-green-200';
                             if (isUserAnswer && !isCorrectAnswer) colorClass = 'bg-red-50 text-red-700 border-red-200';
                             
                             return (
                               <div key={idx} className={`p-5 rounded-2xl border-2 font-bold text-sm flex items-center justify-between ${colorClass}`}>
                                 {opt}
                                 {isCorrectAnswer && <CheckCircle className="w-4 h-4" />}
                                 {isUserAnswer && !isCorrectAnswer && <X className="w-4 h-4" />}
                               </div>
                             );
                           })}
                        </div>
                        <div className="bg-brand-50 p-6 rounded-3xl border border-brand-100">
                           <p className="text-[10px] font-black uppercase text-brand-600 tracking-widest mb-2 flex items-center gap-2">
                             <Zap className="w-3 h-3" /> Clinical Educator's Note:
                           </p>
                           <p className="text-slate-700 font-medium leading-relaxed italic">"{q.explanation}"</p>
                        </div>
                      </div>
                    ))}
                    
                    {!user.hasPaidLive && (
                      <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden mt-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                        <div className="relative z-10">
                          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                            <Lock className="w-10 h-10 text-brand-100" />
                          </div>
                          <h3 className="text-3xl font-serif font-bold text-white mb-4">Unlock 105 More Questions</h3>
                          <p className="text-brand-100 mb-8 max-w-xl mx-auto text-lg">
                            Imagine having this level of detailed breakdown for all 120 questions. Don't leave your NCLEX success to chance.
                          </p>
                          <button 
                            onClick={handleUpgradeToPremium}
                            className="bg-white text-brand-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-brand-50 transition transform hover:scale-105"
                          >
                            Upgrade to Premium Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          }

          if (showPaywall) {
            return (
              <div className="animate-in zoom-in duration-300 max-w-3xl mx-auto py-10">
                <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-12 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20">
                      <Lock className="w-12 h-12 text-brand-100" />
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-white mb-4">Great start! Ready to master the rest?</h2>
                    <p className="text-brand-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                      You have successfully completed the foundational question set. To ensure you are fully prepared for the NCLEX, you need exposure to complex, high-level passing standard questions.
                      <br/><br/>
                      Join our Premium Cohort today to instantly unlock the remaining 105 questions, advanced difficulty modes, and comprehensive rationales.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={handleUpgradeToPremium}
                        className="flex-1 bg-white text-brand-900 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-brand-50 transition transform hover:scale-105"
                      >
                        👑 Upgrade to Premium (Contact Admin)
                      </button>
                      <button 
                        onClick={() => { setShowPaywall(false); finishQuiz(); }}
                        className="flex-1 bg-transparent border-2 border-brand-400 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-700/50 transition"
                      >
                        See Results of Answered Questions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (!activeTest.questions || activeTest.questions.length === 0) {
            return (
              <div className="animate-in fade-in duration-500 max-w-4xl mx-auto py-20 text-center">
                <div className="bg-white p-12 rounded-[4rem] border-2 border-brand-50 shadow-2xl">
                  <div className="bg-brand-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-600">
                    <BookOpen className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">No Questions Found</h2>
                  <p className="text-slate-500 mb-10 font-medium">This assessment doesn't have any questions yet. Please contact the administrator.</p>
                  <button onClick={() => setActiveTest(null)} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition">Back to Hub</button>
                </div>
              </div>
            );
          }

          const q = activeTest.questions[currentQuestionIndex];
          return (
            <div className="animate-in fade-in duration-500 max-w-4xl mx-auto py-2 sm:py-6">
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-10 bg-slate-100/50 sm:bg-transparent p-2.5 sm:p-0 rounded-2xl sm:rounded-none">
                <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                  <div className="flex items-center gap-1.5 animate-in fade-in duration-300">
                    <button 
                      onClick={() => setActiveTest(null)} 
                      className="p-2 sm:p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm" 
                      title="Close"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm("Are you sure you want to restart this practice exam from question 1? All current answers will be reset.")) {
                          setCurrentQuestionIndex(0);
                          setUserAnswers({});
                          setQuizFinished(false);
                          localStorage.removeItem(`practice_active_session_v1_${user.id}`);
                        }
                      }}
                      className="flex items-center gap-1 p-2 sm:p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-[10px] sm:text-xs uppercase tracking-wider transition shadow-sm"
                    >
                      <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Restart
                    </button>
                  </div>
                  <div className="p-2 sm:p-3 bg-slate-900 text-white rounded-xl font-mono text-[10px] sm:text-xs flex items-center shadow-sm">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-brand-400" /> {activeTest.duration}
                  </div>
                </div>

                <div className="flex-1 text-center w-full">
                  <p className="text-[9px] sm:text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1 truncate max-w-full px-2">{activeTest.title}</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1 sm:h-1.5 w-full sm:w-48 max-w-[185px] bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / (!user.hasPaidLive ? Math.min(15, activeTest.questions.length) : activeTest.questions.length)) * 100}%`}}></div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black text-slate-400 flex-shrink-0">{currentQuestionIndex + 1} / {!user.hasPaidLive ? Math.min(15, activeTest.questions.length) : activeTest.questions.length}</span>
                  </div>
                </div>
              </header>

              <div className="bg-white p-4 sm:p-10 md:p-16 rounded-3xl sm:rounded-[3rem] border-2 border-brand-50 shadow-xl relative">
                <div className="mb-4 sm:mb-10">
                  <span className="bg-brand-100 text-brand-600 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2 sm:mb-6 inline-block">Clinical Case Scenario</span>
                  <h2 className="text-base sm:text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-snug">{q.question}</h2>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:gap-4 mb-4 sm:mb-10">
                  {(q.options || []).map((opt, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full py-2.5 px-3 sm:p-6 text-left rounded-xl sm:rounded-[1.5rem] border-2 transition-all duration-300 flex items-center group ${userAnswers[q.id] === idx ? 'bg-brand-600 border-brand-600 text-white shadow-xl shadow-brand-100' : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-brand-300'}`}
                    >
                      <span className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xs sm:text-sm mr-2.5 sm:mr-6 transition flex-shrink-0 ${userAnswers[q.id] === idx ? 'bg-white/20' : 'bg-white shadow-sm group-hover:bg-brand-50'}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-base font-bold leading-snug break-words flex-grow">{opt}</span>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleNextQuestion}
                  disabled={userAnswers[q.id] === undefined}
                  className="w-full py-3.5 sm:py-6 bg-slate-900 text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] rounded-xl sm:rounded-2xl hover:bg-black transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {currentQuestionIndex === activeTest.questions.length - 1 ? 'Finish Exam' : 'Confirm & Next Question'}
                </button>
              </div>
            </div>
          );
        }

        const hasEasy = user.badges?.includes("Easy Mastery Badge");
        const hasMedium = user.badges?.includes("Medium Mastery Badge");
        const hasHard = user.badges?.includes("Hard Mastery Badge");
        const completedCount = [hasEasy, hasMedium, hasHard].filter(Boolean).length;
        const readinessPercent = Math.round((completedCount / 3) * 100);

        return (
          <div className="animate-in fade-in duration-500 max-w-7xl mx-auto py-2 px-1">
            {/* Elegant Notice Banner for Daily Challenge */}
            <div className="bg-gradient-to-r from-teal-500/10 via-brand-500/5 to-indigo-500/10 border-2 border-brand-100 p-6 rounded-[2rem] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm animate-in slide-in-from-top duration-500">
              <div className="flex items-center gap-4">
                <div className="bg-brand-500 text-white p-3 rounded-2xl hidden sm:block shadow-md">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                    💡 Streak Booster Available
                    <span className="text-[9px] bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full uppercase tracking-widest font-black animate-pulse">Bonus</span>
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Maintain your active learning streak and earn <b className="text-slate-800">+50 XP</b> by answering today's <b className="text-brand-600">Clinical Skillbuilder</b> in the right-side Arena!
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setPracticeTab('arena');
                  setTimeout(() => {
                    const arenaCard = document.querySelector('.Daily-Challenge-Arena');
                    if (arenaCard) {
                      arenaCard.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                  }, 150);
                }}
                className="bg-slate-900 hover:bg-black text-white text-[10px] uppercase tracking-widest font-black px-5 py-3.5 rounded-xl transition shadow-md shrink-0 w-full md:w-auto text-center"
              >
                Go to Arena &rarr;
              </button>
            </div>

            {/* Mobile Tab Switcher */}
            <div className="flex lg:hidden bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200/50">
              <button
                onClick={() => setPracticeTab('exams')}
                className={`flex-1 py-3 text-center rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${practiceTab === 'exams' ? 'bg-white text-slate-900 shadow-md scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                📝 Exams & Stats
              </button>
              <button
                onClick={() => setPracticeTab('arena')}
                className={`flex-1 py-3 text-center rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 relative ${practiceTab === 'arena' ? 'bg-white text-slate-900 shadow-md scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                🔥 Arena & Live Rank
                {!dailyChallengeCompleted && (
                  <span className="absolute top-2.5 right-4 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Readiness Assessments and Badges */}
              <div className={`lg:col-span-8 space-y-8 ${practiceTab === 'exams' ? 'block' : 'hidden lg:block'}`}>
                
                {/* NCLEX Board Eligibility Scorecard Tracker */}
                <div className="bg-white p-7 sm:p-8 rounded-[3rem] border border-slate-100 shadow-sm mb-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] bg-brand-50 text-brand-600 border border-brand-100 px-3.5 py-1.5 rounded-full uppercase tracking-widest font-black inline-block">
                         Official NCLEX Board Readiness Status
                      </span>
                      <h3 className="font-serif font-bold text-2xl text-slate-900 mt-2">NCSBN Exam Scorecard</h3>
                      <p className="text-slate-400 text-xs font-semibold mt-0.5">Complete and pass all three mock examinations to certify your NCLEX credentials.</p>
                    </div>
                    
                    <div className="text-left md:text-right shrink-0">
                      <div className="text-4xl font-serif font-black text-brand-600">{readinessPercent}%</div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1">Ready Level</p>
                    </div>
                  </div>

                  {/* Steps Progress Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    
                    {/* 1. FOUNDATION STEP */}
                    <div className={`p-4 rounded-2xl border-2 transition ${hasEasy ? 'bg-emerald-500/[0.02] border-emerald-500/20 text-emerald-900' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Stage 1: Foundation</span>
                        {hasEasy ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-black uppercase text-slate-400">1</span>
                        )}
                      </div>
                      <h5 className="font-bold text-sm text-slate-800">Foundation Mock</h5>
                      <p className="text-[10px] mt-1 leading-relaxed font-semibold">
                        {hasEasy ? '✅ Complete (75%+)' : '⏳ Score 75%+ to unlock'}
                      </p>
                    </div>

                    {/* 2. INTERDISCIPLINARY STEP */}
                    <div className={`p-4 rounded-2xl border-2 transition ${hasMedium ? 'bg-emerald-500/[0.02] border-emerald-500/20 text-emerald-900' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Stage 2: Core Matrix</span>
                        {hasMedium ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-black uppercase text-slate-400">2</span>
                        )}
                      </div>
                      <h5 className="font-bold text-sm text-slate-800">Interdisciplinary Mock</h5>
                      <p className="text-[10px] mt-1 leading-relaxed font-semibold">
                        {hasMedium ? '✅ Complete (75%+)' : '⏳ Score 75%+ to unlock'}
                      </p>
                    </div>

                    {/* 3. MASTERY STEP */}
                    <div className={`p-4 rounded-2xl border-2 transition ${hasHard ? 'bg-emerald-500/[0.02] border-emerald-500/20 text-emerald-900' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Stage 3: Board Mastery</span>
                        {hasHard ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-black uppercase text-slate-400">3</span>
                        )}
                      </div>
                      <h5 className="font-bold text-sm text-slate-800">Clinical Mastery Mock</h5>
                      <p className="text-[10px] mt-1 leading-relaxed font-semibold">
                        {hasHard ? '✅ Complete (75%+)' : '⏳ Score 75%+ to unlock'}
                      </p>
                    </div>

                  </div>

                  {/* Readiness Status Notification line */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-[11px] text-slate-500 font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-500" />
                      {completedCount === 3 ? (
                        <span className="text-emerald-600 font-black">🎓 CONGRATULATIONS! You are 100% preparation ready. Click My Credentials tab to request review!</span>
                      ) : (
                        <span>Progress to 100% readiness to qualify for your official Board Academy Certificate.</span>
                      )}
                    </p>
                    
                    {completedCount === 3 && (
                      <div className="text-[9px] bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full uppercase tracking-widest font-black animate-pulse">
                         Certificate Earned
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900 uppercase tracking-tight">Readiness Assessments</h2>

                {activePracticeSession && (
              <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-7 rounded-[2rem] mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl border-2 border-white/10 animate-in fade-in duration-300">
                <div className="flex-1">
                  <span className="bg-white/20 text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">
                    Resume Active Quiz Progress
                  </span>
                  <h4 className="font-serif font-bold text-xl mt-3">{activePracticeSession.activeTest.title}</h4>
                  <p className="text-xs text-sky-100 font-semibold mt-1">
                    You answered <span className="font-black text-white">{Object.keys(activePracticeSession.userAnswers).length} questions</span>. Click below to resume your assessment instantly!
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <button 
                    onClick={() => {
                      const freshTest = practiceTests.find(t => t.id === activePracticeSession.activeTest.id) || activePracticeSession.activeTest;
                      setActiveTest(freshTest);
                      setCurrentQuestionIndex(activePracticeSession.currentQuestionIndex);
                      setUserAnswers(activePracticeSession.userAnswers);
                      setQuizFinished(false);
                      setShowCorrections(false);
                      setShowPaywall(false);
                    }}
                    className="flex-1 sm:flex-none py-3.5 px-6 bg-white hover:bg-sky-50 text-indigo-700 font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition transform hover:scale-105 shadow-md shadow-indigo-700/10"
                  >
                    Resume Quiz
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm("Are you sure you want to discard your saved practice quiz progress? It cannot be retrieved.")) {
                        localStorage.removeItem(`practice_active_session_v1_${user.id}`);
                        setActivePracticeSession(null);
                      }
                    }}
                    className="py-3.5 px-4 bg-transparent border border-white/25 text-white hover:bg-white/10 font-bold text-[10px] uppercase tracking-widest rounded-xl transition"
                  >
                    Discard
                  </button>
                </div>
              </div>
            )}
            
            {user.badges && user.badges.length > 0 && (
              <div className="mb-10 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-500" /> My Clinical Mastery Badges
                </p>
                <div className="flex flex-wrap gap-3">
                  {user.badges.map((badge, idx) => (
                    <div key={idx} className="bg-brand-50 text-brand-600 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border border-brand-100 flex items-center gap-2 shadow-sm animate-in zoom-in duration-300">
                      <CheckCircle2 className="w-4 h-4" /> {badge}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-10">
              <p className="text-sm font-black uppercase tracking-widest text-slate-500">Filter by Difficulty:</p>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as 'all' | 'easy' | 'medium' | 'hard')}
                className="p-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 outline-none focus:border-brand-500"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            {!user.hasPaidLive && (
              <div className="bg-brand-50 border border-brand-100 p-6 rounded-[2rem] mb-8 flex items-start sm:items-center gap-4 shadow-sm">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <Award className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 text-sm sm:text-base">Free Tier: Foundational NCLEX Review (15 Questions)</h4>
                  <p className="text-brand-700 text-xs sm:text-sm mt-1">Upgrade to Premium to unlock the complete 120-question mastery bank across all difficulty levels.</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {isTestsLoading ? (
                <div className="bg-white p-20 rounded-[3rem] border border-slate-100 text-center animate-pulse">
                  <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-4"></div>
                  <p className="text-slate-400 font-bold italic">Loading Professional Exams...</p>
                </div>
              ) : practiceTests.filter(test => selectedDifficulty === 'all' || test.difficulty === selectedDifficulty).length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] border border-slate-100 text-center">
                  <p className="text-slate-400 font-bold italic">No exams available for this cohort yet.</p>
                </div>
              ) : practiceTests.filter(test => selectedDifficulty === 'all' || test.difficulty === selectedDifficulty).map((test, i) => {
                const isLocked = !user.hasPaidLive && (test.difficulty === 'medium' || test.difficulty === 'hard');
                return (
                  <div key={i} className={`bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 flex flex-col xl:flex-row items-stretch xl:items-center justify-between group hover:border-brand-500 transition-all duration-300 gap-6 shadow-sm ${isLocked ? 'opacity-80' : ''}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
                      <div className="bg-slate-50 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-inner relative shrink-0">
                        <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-brand-400 group-hover:text-brand-600 transition" />
                        {isLocked && (
                          <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-600 p-1.5 rounded-full shadow-sm">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2 leading-tight">
                          {test.title}
                          {isLocked && <span className="text-[9px] bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full uppercase tracking-widest font-black inline-block">Premium</span>}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 font-black uppercase tracking-widest mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>{test.questions?.length || 0} Professional Questions</span>
                          <span className="hidden sm:inline w-1 h-1 bg-slate-200 rounded-full"></span>
                          <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 shrink-0" /> {test.duration} Limit</span>
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => isLocked ? handleUpgradeToPremium() : handleStartTest(test)} 
                      className={`${isLocked ? 'bg-amber-500 hover:bg-amber-600' : 'bg-brand-600 hover:bg-brand-700'} text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition w-full xl:w-auto transform hover:scale-[1.02] shrink-0`}
                    >
                      {isLocked ? 'Unlock Premium' : 'Start Professional Exam'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Gamified Streak and Excellence Leaderboard */}
          <div className={`lg:col-span-4 space-y-8 lg:sticky lg:top-8 ${practiceTab === 'arena' ? 'block' : 'hidden lg:block'}`}>
            
            {/* Active Learning Streak Status Card */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-7 rounded-[2rem] border border-orange-200/10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20 animate-bounce">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg">Active Streak: 4 Days!</h4>
                  <p className="text-xs text-amber-50 font-semibold mt-0.5">Solve daily challenges to increase your streak level!</p>
                </div>
              </div>
            </div>

            {/* Daily NCLEX Trivia Challenge Card */}
            {(() => {
              const currentUTCDayValue = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
              const challenge = DAILY_CHALLENGE_POOL[currentUTCDayValue % DAILY_CHALLENGE_POOL.length];
              return (
                <div className="Daily-Challenge-Arena bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-7 rounded-[2rem] border border-indigo-500/10 shadow-lg relative overflow-hidden" id="daily_challenge_arena_container">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <span className="bg-indigo-500/30 text-indigo-300 text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full border border-indigo-500/20">
                      {challenge.prefix || "Daily Challenge Arena"}
                    </span>
                    <h4 className="font-serif font-bold text-xl mt-4 leading-tight">Today&apos;s Clinical Skillbuilder</h4>
                    <p className="text-xs text-indigo-300 mt-2 leading-relaxed font-semibold">
                      Solve this clinical case to maintain your active streak and gain <b className="text-white">+50 XP</b>!
                    </p>
                    
                    {/* Scenario */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4 text-[11px] leading-relaxed text-indigo-100 font-medium font-mono">
                      &quot;{challenge.question}&quot;
                    </div>
                    
                    {/* Interactive Options */}
                    {dailyChallengeCompleted ? (
                      <div className="bg-emerald-500/15 border border-emerald-500/30 p-5 rounded-2xl mt-4 text-center">
                        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-pulse" />
                        <p className="text-xs text-emerald-200 font-bold">Excellent work! Daily Clinical Challenge Solved.</p>
                        <p className="text-[10px] text-emerald-300 mt-1 font-semibold">{challenge.explanation}</p>
                        <p className="text-[9px] text-emerald-400/90 mt-2 font-black uppercase tracking-widest">+50 XP & Streak Saved to Profile</p>
                        <button 
                          onClick={() => {
                            if (confirm("Would you like to reset today's challenge and try answering it again?")) {
                              setDailyChallengeCompleted(false);
                              setDailyChallengeSelected(null);
                              setDailyChallengeFeedback(null);
                              localStorage.removeItem(`daily_completed_day_v1_${user.id}`);
                            }
                          }}
                          className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-[9px] uppercase tracking-widest transition flex items-center gap-1 mx-auto"
                        >
                          <RefreshCw className="w-2.5 h-2.5" /> Restart Challenge
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-2">
                        {challenge.options.map((opt, oIdx) => {
                          const isSelected = dailyChallengeSelected === oIdx;
                          return (
                            <button
                              key={oIdx}
                              disabled={dailyChallengeFeedback?.isCorrect}
                              onClick={async () => {
                                setDailyChallengeSelected(oIdx);
                                const isCorrect = oIdx === challenge.correctAnswer;
                                if (isCorrect) {
                                  setDailyChallengeFeedback({
                                    isCorrect: true,
                                    text: `Correct! ${challenge.explanation}`
                                  });
                                  setDailyChallengeCompleted(true);
                                  localStorage.setItem(`daily_completed_day_v1_${user.id}`, String(currentUTCDayValue));
                                  
                                  // Persist Daily Challenge Completion in the cloud database by giving dynamic progress bonus!
                                  try {
                                    const targetProgress = Math.min(100, (user.progress || 0) + 5);
                                    await supabase.from('profiles').update({ progress: targetProgress }).eq('id', user.id);
                                    onUpdateProfile();
                                  } catch (dbErr) {
                                    console.error("Failed to update daily progress to Supabase:", dbErr);
                                  }

                                  // Confetti reward
                                  confetti({
                                    particleCount: 80,
                                    spread: 60,
                                    origin: { y: 0.85 }
                                  });
                                  
                                  try {
                                    const currentSolved = parseInt(localStorage.getItem('questions_solved_v1_count') || '0', 10);
                                    localStorage.setItem('questions_solved_v1_count', (currentSolved + 10).toString());
                                    window.dispatchEvent(new Event('storage'));
                                  } catch (err) {}
                                } else {
                                  setDailyChallengeFeedback({
                                    isCorrect: false,
                                    text: "Not quite. That answer option is not the ideal clinical protocol. Review the rationales and try again!"
                                  });
                                }
                              }}
                              className={`w-full p-4 text-left text-[11px] rounded-xl transition font-semibold leading-snug flex items-center gap-3 border ${isSelected ? (dailyChallengeFeedback?.isCorrect ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200' : 'bg-red-500/10 border-red-500 text-red-200') : 'bg-white/[0.04] hover:bg-white/[0.1] border-white/15 text-slate-300'}`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] uppercase font-black shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'}`}>
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="flex-grow">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    
                    {dailyChallengeFeedback && !dailyChallengeFeedback.isCorrect && (
                      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mt-3 text-[10px] text-red-200 font-semibold leading-relaxed flex justify-between items-center">
                        <span>{dailyChallengeFeedback.text}</span>
                        <button 
                          onClick={() => {
                            setDailyChallengeSelected(null);
                            setDailyChallengeFeedback(null);
                          }}
                          className="px-2 py-1 bg-red-500/20 text-red-200 hover:bg-red-500/40 rounded text-[9px] uppercase tracking-wider font-bold shrink-0 ml-2"
                        >
                          Retry
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Cohort Leaders of Clinical Excellence */}
            <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-serif font-bold text-slate-900 text-lg">Cohort Leaderboard</h4>
                <span className="text-[10px] font-black uppercase tracking-widest bg-brand-50 text-brand-600 px-3 py-1 rounded-full animate-pulse">
                  Live Rank
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mb-4">Compare progress and motivate each other. Who answered more items correctly today?</p>
              
              <div className="space-y-4">
                {(() => {
                  // Dynamically pull solved item count
                  let userSolvedCount = 0;
                  try {
                    userSolvedCount = parseInt(localStorage.getItem('questions_solved_v1_count') || '0', 10);
                  } catch (e) {}
                  
                  // Mix real students who have "participated" (progress > 0 or badges length > 0)
                  const realActivePeers = leaderboardUsers
                    .filter(u => u.id !== user.id && ((u.progress || 0) > 0 || (u.badges?.length || 0) > 0))
                    .map(u => {
                      const estItems = Math.max(10, Math.round((u.progress || 0) * 1.8) + (u.badges?.length || 0) * 12);
                      const estStreak = Math.max(1, Math.round((u.progress || 0) / 12) + (u.badges?.length || 0) * 2);
                      return {
                        name: u.name || u.username || "Candidate Student",
                        items: estItems,
                        streak: estStreak,
                        isMe: false
                      };
                    });

                  // Default cohort peers as baseline
                  const defaultPeers = [
                    { name: "Nurse Fatima A.", items: 250, streak: 12, isMe: false },
                    { name: "Nurse Daniel E.", items: 175, streak: 8, isMe: false },
                    { name: "Nurse Chioma O.", items: 110, streak: 5, isMe: false },
                    { name: "Nurse Adeola Y.", items: 65, streak: 2, isMe: false },
                    { name: "Nurse Chukwuma K.", items: 20, streak: 1, isMe: false },
                  ];
                  
                  const combinedPeers = [
                    { name: `${user.name || user.username} (You)`, items: userSolvedCount, streak: Math.max(1, Math.round((user.progress || 0) / 12) + (user.badges?.length || 0) * 2), isMe: true },
                    ...realActivePeers,
                    ...defaultPeers
                  ];
                  
                  // Sort by items answered descending
                  const sortedPeers = [...combinedPeers].sort((a,b) => b.items - a.items);
                  
                  return sortedPeers.map((peer, idx) => {
                    const isCurrentUser = peer.isMe;
                    return (
                      <div 
                        key={idx} 
                        className={`p-3.5 rounded-2xl flex items-center justify-between border transition duration-200 ${isCurrentUser ? 'bg-brand-50/70 border-brand-200 ring-2 ring-brand-50' : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${idx === 0 ? 'bg-amber-400 text-white' : idx === 1 ? 'bg-slate-300 text-slate-700' : idx === 2 ? 'bg-orange-300 text-orange-950' : 'bg-slate-100 text-slate-500'}`}>
                            {idx + 1}
                          </span>
                          <div>
                            <p className={`text-xs font-bold ${isCurrentUser ? 'text-brand-900' : 'text-slate-800'}`}>
                              {peer.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                              🔥 {peer.streak} Days Streak
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-black font-mono px-3 py-1 rounded-lg ${isCurrentUser ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-100'}`}>
                          {peer.items} Items
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

          </div>

        </div>
      </div>
    );
      case 'My Profile':
        return (
          <div className="animate-in fade-in duration-500 pb-12">
            <h2 className="text-3xl font-serif font-bold mb-2 text-slate-900 uppercase tracking-tight">Account Settings</h2>
            <p className="text-lg text-slate-500 mb-10 font-medium">Manage your clinical profile and security details.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-center">
                  <div className="relative inline-block mb-6 group">
                    <div 
                      className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-50 shadow-inner bg-slate-50 cursor-pointer relative"
                      onClick={() => setZoomedAvatar(editAvatar || null)}
                    >
                      {editAvatar ? (
                        <img src={editAvatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <UserIcon className="w-full h-full p-8 text-slate-200" />
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <Sparkles className="text-white w-6 h-6" />
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      className="absolute bottom-0 right-0 bg-brand-600 text-white p-2.5 rounded-full shadow-lg hover:bg-brand-700 transition"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                    {editAvatar && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setEditAvatar(''); }}
                        className="absolute bottom-0 left-0 bg-red-500 text-white p-2.5 rounded-full shadow-lg hover:bg-red-600 transition"
                        title="Remove Profile Picture"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
                  <p className="text-brand-600 font-black uppercase tracking-widest text-[10px] mt-1">{user.role}</p>
                  
                  {user.badges && user.badges.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-slate-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">My Achievements</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {user.badges.map((badge, idx) => (
                          <div key={idx} className="bg-brand-50 text-brand-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-100 flex items-center gap-1.5">
                            <Award className="w-3 h-3" /> {badge}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 p-4 rounded-xl">
                      <Mail className="w-4 h-4 mr-3 text-brand-400" /> {user.email}
                    </div>
                    <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 p-4 rounded-xl">
                      <Phone className="w-4 h-4 mr-3 text-brand-400" /> {user.phoneNumber || 'No phone set'}
                    </div>
                    <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 p-4 rounded-xl">
                      <Globe className="w-4 h-4 mr-3 text-brand-400" /> {user.country || 'No country set'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-10">
                <form onSubmit={handleUpdateProfile} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                  <h4 className="text-lg font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-brand-500" /> Personal Details
                  </h4>
                  {profileMessage.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${profileMessage.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                      {profileMessage.text}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-500 transition font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Username</label>
                      <input type="text" value={editUsername} onChange={e => setEditUsername(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-500 transition font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-500 transition font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                      <input type="tel" value={editPhone} onChange={e => setEditPhone(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-500 transition font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country of Residence</label>
                      <select value={editCountry} onChange={e => setEditCountry(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-500 transition font-bold text-sm">
                        {COUNTRY_LIST.map((c: string) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={profileLoading} className="bg-brand-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-brand-700 transition disabled:opacity-50">
                    {profileLoading ? 'Saving...' : 'Update Profile'}
                  </button>
                </form>

                <form onSubmit={handleChangePassword} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                  <h4 className="text-lg font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                    <Key className="w-4 h-4 text-brand-500" /> Security
                  </h4>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-500 transition font-bold text-sm" />
                  </div>
                  <button type="submit" disabled={profileLoading || !newPassword} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition disabled:opacity-50">
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case 'My Courses':
        if (!user.isApproved) {
          return (
            <div className="animate-in fade-in duration-700 max-w-4xl mx-auto">
              <div className="bg-white p-6 sm:p-20 rounded-[3rem] sm:rounded-[4rem] border-2 border-brand-50 shadow-2xl shadow-brand-100/20 text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 hidden sm:block">
                   <div className="bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Restricted Access</div>
                 </div>
                 <div className="bg-brand-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                   <Lock className="w-10 h-10 text-brand-600" />
                 </div>
                 <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-slate-900">Program Enrollment Required</h2>
                 <p className="text-base sm:text-xl text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed font-medium">Your account is currently awaiting administrative approval. Once approved, you will have full access to our structured clinical modules.</p>
                 
                 <div className="space-y-4">
                    <p className="text-xs sm:text-sm font-bold text-slate-400 mb-4 italic">Need immediate assistance? Contact our support team:</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <button 
                        onClick={() => handleContactAdminPayment('whatsapp')}
                        className="flex-1 max-w-xs mx-auto sm:mx-0 bg-green-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-green-700 transition flex items-center justify-center"
                       >
                         <MessageCircle className="w-5 h-5 mr-3" /> WhatsApp Support
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          );
        }
        return (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900 uppercase tracking-tight">Preparation Program</h2>
            <p className="text-lg text-slate-500 mb-10 font-medium">Access your structured clinical modules for global licensure.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['FOUNDATIONS', 'INTEGRATION', 'MASTERY'].map((stage, i) => {
                const isActive = (stage === 'FOUNDATIONS') || (stage === 'INTEGRATION' && user.progress >= 60);
                const items = courseContent[stage] || [];
                return (
                  <div key={stage} className={`p-10 rounded-[3rem] border-2 flex flex-col transition-all duration-500 ${isActive ? 'bg-white border-brand-50 shadow-xl shadow-brand-100/20' : 'bg-slate-100 border-slate-100 opacity-60'}`}>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black tracking-tight">{stage}</h3>
                      {!isActive && <Lock className="w-5 h-5 text-slate-300" />}
                    </div>
                    <div className="space-y-3 mb-10 flex-grow">
                      {items.map((item: Lesson, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 group">
                          <div 
                            className="flex items-center cursor-pointer hover:text-brand-600 transition flex-grow"
                            onClick={() => {
                              if (item.assetData) {
                                openAsset(item.assetData, item.title);
                              }
                            }}
                          >
                            {item.type === 'video' ? <Video className="w-4 h-4 mr-3 text-brand-500" /> : <FileText className="w-4 h-4 mr-3 text-brand-500" />}
                            {item.title}
                            {item.assetData && <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition" />}
                          </div>
                          {item.assetData && (
                            <button onClick={(e) => {
                              e.stopPropagation();
                              const link = document.createElement('a');
                              link.href = item.assetData as string;
                              link.download = item.title;
                              link.click();
                            }} className="p-2 opacity-0 group-hover:opacity-100 transition text-brand-600 hover:bg-brand-100 rounded-lg">
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button 
                      disabled={!isActive} 
                      onClick={() => {
                        if (isActive && items.length > 0) {
                          const firstItem = items[0];
                          if (firstItem.assetData) {
                            openAsset(firstItem.assetData, firstItem.title);
                          } else if (firstItem.contentUrl) {
                            openAsset(firstItem.contentUrl, firstItem.title);
                          }
                        }
                      }}
                      className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 hover:bg-brand-700' : 'bg-slate-200 text-slate-400'}`}
                    >
                      {isActive ? (user.progress === 0 ? 'Start Module' : 'Continue Module') : 'Locked'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'Live Classes':
        return renderLiveClasses();
      case 'Materials':
        if (!user.isApproved) {
          return (
            <div className="animate-in fade-in duration-700 max-w-4xl mx-auto">
              <div className="bg-white p-6 sm:p-20 rounded-[3rem] sm:rounded-[4rem] border-2 border-brand-50 shadow-2xl shadow-brand-100/20 text-center relative overflow-hidden">
                 <div className="bg-brand-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                   <Lock className="w-10 h-10 text-brand-600" />
                 </div>
                 <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-slate-900">Study Materials Locked</h2>
                 <p className="text-base sm:text-xl text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed font-medium">Access to premium study resources and PDF materials requires administrative approval.</p>
                 <button 
                  onClick={() => handleContactAdminPayment('whatsapp')}
                  className="bg-brand-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-brand-700 transition"
                 >
                   Request Access
                 </button>
              </div>
            </div>
          );
        }
        return (
          <div className="animate-in fade-in duration-500">
             <h2 className="text-3xl font-serif font-bold mb-8 text-slate-900">Study Resources</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
               {materials.map((doc, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center group hover:border-brand-500 transition-all duration-300 cursor-pointer shadow-sm hover:-translate-y-1">
                   <div className="bg-slate-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                     <FileText className="w-10 h-10 text-slate-300 group-hover:text-brand-600 transition" />
                   </div>
                   <p className="font-bold text-slate-800 mb-6 text-base">{doc.title}</p>
                   <div className="w-full grid grid-cols-2 gap-3">
                     <button 
                       onClick={() => {
                         if (doc.assetData) {
                           openAsset(doc.assetData, doc.title);
                         } else {
                           setCustomNotification({
                              title: "No Attachment",
                              message: "No document file has been uploaded or attached for this material yet. Please contact the administrator.",
                              type: "info"
                            });
                         }
                       }} 
                       className="py-4 bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200 transition font-black text-[10px] uppercase tracking-widest flex items-center justify-center"
                     >
                       <ExternalLink className="w-4 h-4 mr-2" /> Open
                     </button>
                     <button 
                       onClick={() => {
                         if (doc.assetData) {
                           const link = document.createElement('a');
                           link.href = doc.assetData;
                           link.download = doc.title;
                           link.click();
                         }
                       }} 
                       className="py-4 bg-brand-600 text-white rounded-2xl shadow-xl shadow-brand-100 hover:bg-brand-700 transition font-black text-[10px] uppercase tracking-widest flex items-center justify-center"
                     >
                       <Download className="w-4 h-4 mr-2" /> Save
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        );
      default:
        return (
          <div className="animate-in fade-in duration-500">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Welcome back, Nurse {user.name}! 👋</h1>
                <p className="text-lg text-slate-500 mt-2 font-medium">Achieve your licensure by <span className="text-brand-600 font-bold">{examDate}</span>.</p>
              </div>
              <div className="flex items-center gap-4 relative">
                <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-4 bg-white border border-gray-200 rounded-2xl text-slate-400 hover:text-brand-600 transition shadow-sm relative group">
                  <Bell className="w-6 h-6" />
                  {notifications.length > 0 && <span className="absolute top-3.5 right-3.5 w-3 h-3 bg-brand-500 rounded-full border-2 border-white"></span>}
                </button>
                {isNotificationsOpen && (
                  <div className="absolute top-16 right-0 w-80 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl z-[60] overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-800">Alert Center</h3>
                      <button onClick={() => setIsNotificationsOpen(false)} className="p-1 hover:bg-white rounded-lg transition"><X className="w-4 h-4 text-slate-400" /></button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? <p className="p-10 text-center text-slate-400 text-sm italic">No new alerts</p> :
                        notifications.map(n => (
                          <div key={n.id} className="p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition relative group/notif">
                            <p className="font-bold text-base text-slate-900 mb-1">{n.title}</p>
                            <p className="text-sm text-slate-500 mb-3 font-medium">{n.text}</p>
                            <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest">{getRelativeTime(n.created_at)}</p>
                            <button onClick={() => onDeleteNotification(n.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition opacity-0 group-hover/notif:opacity-100"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm flex items-center">
                  <Calendar className="w-5 h-5 text-brand-500 mr-3" />
                  <span className="font-black text-[10px] uppercase tracking-widest text-slate-700">Exam: {examDate}</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-brand-600 p-10 rounded-[3rem] text-white shadow-xl shadow-brand-100 flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-4">Clinical Readiness</p>
                <p className="text-5xl font-black mb-6">{user.progress}%</p>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full" style={{ width: `${user.progress}%` }}></div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Daily Insight</p>
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                  <p className="text-lg text-slate-700 font-serif font-bold italic leading-relaxed">
                    "{NCLEX_INSIGHTS[new Date().getDate() % NCLEX_INSIGHTS.length]}"
                  </p>
                </div>
              </div>
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-lg">
                <p className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-4">Recent Activity</p>
                <div className="space-y-4">
                   <div className="flex items-center text-sm font-bold opacity-90">
                     <CheckCircle2 className="w-4 h-4 mr-3 text-brand-500" /> Logged in successfully
                   </div>
                   <div className="flex items-center text-sm font-bold opacity-90">
                     <ShieldCheck className="w-4 h-4 mr-3 text-brand-500" /> System Hub Synced
                   </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                 <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm group cursor-pointer hover:border-brand-500 transition-all duration-300">
                    <div className="flex items-center mb-8">
                      <div className="bg-brand-50 p-5 rounded-2xl mr-6 text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition shadow-sm"><PlayCircle className="w-10 h-10" /></div>
                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Clinical Reasoning Mastery</h4>
                        <p className="text-lg text-slate-500 font-medium mt-1">{user.progress === 0 ? 'Start your journey now.' : 'Pick up where you left off.'}</p>
                      </div>
                    </div>
                    <button onClick={() => setCurrentView('My Courses')} className="w-full py-6 bg-brand-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl animate-soft-pulse shadow-lg shadow-brand-100">
                      {user.progress === 0 ? 'Start Program' : 'Continue Program'}
                    </button>
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm text-center flex flex-col justify-center">
                 <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 shadow-sm">
                   <Heart className="w-8 h-8 fill-current" />
                 </div>
                 <h4 className="text-xl font-bold mb-3">How are we doing?</h4>
                 <p className="text-base text-slate-500 mb-8 font-medium">Your feedback helps us empower more nurses globally.</p>
                 <button onClick={() => setIsReviewModalOpen(true)} className="w-full py-4 bg-slate-50 text-brand-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-600 hover:text-white transition-all">Leave Academy Review</button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row transition-all duration-300">
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Logo src={branding?.logo} />
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 bg-slate-50 rounded-xl"><Menu className="w-6 h-6 text-slate-700" /></button>
      </div>

      <aside className={`${isCollapsed ? 'lg:w-24' : 'lg:w-80'} ${isMobileMenuOpen ? 'fixed inset-0 z-50 bg-white flex' : 'hidden lg:flex'} border-r border-gray-100 flex-col transition-all duration-300 bg-white`}>
        <div className="hidden lg:block border-b border-slate-50 mb-6"><Logo src={branding?.logo} /></div>
        <nav className="flex-grow px-6 space-y-2 mt-4 overflow-y-auto">
          {DASHBOARD_LINKS.map(l => (
            <button key={l.label} onClick={() => { setCurrentView(l.label); setIsMobileMenuOpen(false); setActiveTest(null); }} className={`w-full flex items-center px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${currentView === l.label ? 'bg-brand-600 text-white shadow-xl shadow-brand-100' : 'text-slate-400 hover:bg-brand-50 hover:text-brand-600'}`}>
              <span className={isCollapsed && !isMobileMenuOpen ? '' : 'mr-5'}>{l.icon}</span>
              {(!isCollapsed || isMobileMenuOpen) && l.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-50">
          <button onClick={onLogout} className="w-full flex items-center justify-center p-5 bg-red-50 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm">
            <LogOut className="w-4 h-4 mr-3" /> Log Out Platform
          </button>
        </div>
      </aside>

      <main id="student-main-content" className={`flex-grow transition-all duration-500 lg:overflow-y-auto lg:h-screen ${
        activeTest 
          ? 'pt-2 sm:pt-10 px-2 sm:px-12 pb-6 sm:pb-24 lg:pt-6' 
          : 'pt-6 sm:pt-10 px-4 sm:px-12 pb-24'
      }`}>
        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>

      {/* Profile Picture Zoom Modal */}
      {zoomedAvatar && (
        <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
          <button 
            onClick={() => setZoomedAvatar(null)}
            className="absolute top-8 right-8 text-white/60 hover:text-white transition p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-2xl w-full aspect-square animate-in zoom-in-95 duration-300">
            <img 
              src={zoomedAvatar} 
              alt="Zoomed Profile" 
              className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white/20"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 text-center relative shadow-2xl animate-in zoom-in duration-300">
            {!reviewSubmitted ? (
              <>
                <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition"><X className="w-6 h-6" /></button>
                <div className="bg-brand-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm"><Star className="w-10 h-10 text-yellow-400 fill-current" /></div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Share Your Victory</h2>
                <p className="text-lg text-slate-500 mb-8 font-medium">How has Graceful Path empowered your journey?</p>
                <div className="flex justify-center gap-3 mb-8">
                  {[1,2,3,4,5].map(s => <button key={s} onClick={() => setRating(s)} className="transition hover:scale-110"><Star className={`w-8 h-8 ${s <= rating ? 'text-yellow-400 fill-current' : 'text-slate-100'}`} /></button>)}
                </div>
                <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Tell your success story..." className="w-full p-6 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 mb-8 border-2 border-slate-100 font-medium text-base resize-none" rows={4} />
                <button onClick={handleSubmitReview} disabled={!reviewText.trim()} className="w-full py-5 bg-brand-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-brand-100">Submit Academy Review</button>
              </>
            ) : (
              <div className="py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle2 className="w-12 h-12" /></div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Review Received!</h2>
                <p className="text-lg text-slate-500 mb-12 leading-relaxed max-w-sm mx-auto font-medium">Thank you for your kind words! Your feedback will now inspire hundreds of future nursing professionals.</p>
                <button onClick={() => { setIsReviewModalOpen(false); setReviewSubmitted(false); }} className="w-full py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl">Back to Dashboard</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Badge Earned Modal */}
      {earnedBadge && (
        <div className="fixed inset-0 z-[300] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] p-12 text-center shadow-2xl animate-in zoom-in duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-32 h-32 bg-brand-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-200 animate-bounce">
                <Award className="w-16 h-16" />
              </div>
              <p className="text-brand-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">New Achievement Unlocked</p>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight">Hurry! Congratulations!</h2>
              <p className="text-xl text-slate-500 mb-10 font-medium leading-relaxed">
                You've just earned the <span className="text-brand-600 font-bold">{earnedBadge}</span> for your exceptional performance!
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10">
                <p className="text-sm text-slate-600 font-bold italic leading-relaxed">
                  "Your dedication to clinical excellence is inspiring. Keep pushing towards your global nursing goals!"
                </p>
              </div>
              <button 
                onClick={() => setEarnedBadge(null)}
                className="w-full py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-brand-600 transition shadow-xl"
              >
                Continue My Journey
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom styled in-app Notification modal aligned with the system */}
      {customNotification && (
        <div className="fixed inset-0 z-[999] bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] border border-slate-100 p-8 text-center relative shadow-2xl animate-in zoom-in duration-300">
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm border ${
              customNotification.type === 'success' ? 'bg-green-50 border-green-100 text-green-600' :
              customNotification.type === 'error' ? 'bg-red-50 border-red-100 text-red-500' :
              'bg-blue-50 border-blue-100 text-blue-500'
            }`}>
              {customNotification.type === 'success' && <CheckCircle className="w-10 h-10" />}
              {customNotification.type === 'error' && <AlertCircle className="w-10 h-10" />}
              {customNotification.type === 'info' && <Info className="w-10 h-10" />}
            </div>
            <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">{customNotification.title}</h3>
            <p className="text-slate-500 text-base mb-8 leading-relaxed font-semibold">
              {customNotification.message}
            </p>
            <button 
              onClick={() => setCustomNotification(null)}
              className="w-full py-4 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-slate-950/10"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

    </div>
  );
};