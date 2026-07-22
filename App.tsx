import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Marketing/Home';
import { StudentDashboard } from './pages/Dashboard/StudentDashboard';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AIChatbot } from './components/AIChatbot';
import { UserRole, User, Review, BrandingAssets, Notification, GlobalLinks } from './types';
import { COURSES, COUNTRY_LIST } from './constants';
import { supabase } from './services/supabaseClient';
import { geminiService } from './services/geminiService';
import { DEFAULT_PRACTICE_TESTS } from './services/questionBank';
import { Mail, CheckCircle2, Globe, LogOut } from 'lucide-react';

function App() {
  const [currentPath, setCurrentPath] = useState<string>((window.location as any).hash.replace('#', '') || '/');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allStudents, setAllStudents] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const [registerInput, setRegisterInput] = useState({ username: '', name: '', email: '', phoneNumber: '', country: 'Nigeria', password: '', confirmPassword: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [examDate, setExamDate] = useState('April 25, 2026');
  const [brandingAssets, setBrandingAssets] = useState<BrandingAssets>(() => {
    try {
      const cached = localStorage.getItem('graceful_branding_assets');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Failed to parse cached branding assets:", e);
    }
    return {
      founderImage: '/founder_profile.jpg',
      tutorImage: '/tutor_profile.jpg',
      heroImage: '/hero_nclex.jpg',
      spotlightImage: '/spotlight_success.jpg',
      aboutImage: '/about_team.jpg',
      favicon: '/favicon.png',
      logo: '/logo.png'
    };
  });

  const [globalLinks, setGlobalLinks] = useState<GlobalLinks>({
    whatsapp: 'https://wa.me/447470539081',
    telegram: 'https://t.me/+r0sIS5RfnuFhYmFk',
    phone: '+44 7470 539081',
    liveSessionZoom: '#',
    telegramAcademyHub: 'https://t.me/+r0sIS5RfnuFhYmFk',
    whatsappAcademyGroup: 'https://chat.whatsapp.com/JpfoDTxUBSRCmXUu597Y44?mode=gi_t',
    paidLiveWhatsapp: 'https://chat.whatsapp.com/BaGfbAOYkNbJ6nlC53fwV8?mode=gi_t',
    paidLiveTelegram: 'https://t.me/+6bok-db_704xNmE0'
  });

  const [courseContent, setCourseContent] = useState<any>({
    FOUNDATIONS: [],
    INTEGRATION: [],
    MASTERY: []
  });

  const [practiceTests, setPracticeTests] = useState<any[]>(DEFAULT_PRACTICE_TESTS);
  const [materials, setMaterials] = useState<any[]>([]);
  const [geminiKeys, setGeminiKeys] = useState<string[]>([]);

  // 1. Initial Data Fetching from Supabase
  useEffect(() => {
    const initApp = async () => {
      try {
        // Start fetching everything in parallel
        const sessionPromise = supabase.auth.getSession();
        const configPromise = fetchSiteConfig();
        const reviewsPromise = fetchReviews();
        const notificationsPromise = fetchNotifications();

        // We only strictly WAIT for the session and basic config to show the UI
        // This makes the "Loading Academy" screen disappear much faster
        const [{ data: { session } }] = await Promise.all([
          sessionPromise,
          configPromise
        ]);
        
        if (session?.user) {
          // Profile fetch is fast, but we can even do this in parallel with the rest
          await fetchUserProfile(session.user.id);
        }
        
        // Ensure reviews and notifications are also handled, but they don't block the UI shell
        await Promise.all([reviewsPromise, notificationsPromise]);
        
      } catch (err) {
        console.error("App initialization failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsResettingPassword(true);
        setCurrentPath('/login');
        setError('');
      }
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setCurrentUser(null);
        setAllStudents([]); 
        setError('');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    let { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    
    // If profile doesn't exist (PGRST116 is the code for 0 rows returned by single()), create it
    if (error && error.code === 'PGRST116') {
      const { data: authData } = await supabase.auth.getUser();
      if (authData.user) {
        const meta = authData.user.user_metadata;
        const newProfile = {
          id: userId,
          username: meta.username || authData.user.email?.split('@')[0] || 'user',
          name: meta.name || 'New User',
          email: authData.user.email || '',
          phone_number: meta.phone_number || '',
          country: meta.country || '',
          role: meta.role || 'STUDENT',
          progress: 0,
          has_paid_live: false,
          is_approved: false
        };
        
        const { data: insertedData, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
          
        if (!insertError && insertedData) {
          data = insertedData;
          error = null;
        }
      }
    }

    if (data && !error) {
      // Use the profile data directly. We don't need to call auth.getUser() 
      // as we already have the session/user context from the caller.
      const user: User = {
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email || '', // Assuming email is stored in profiles or passed
        phoneNumber: data.phone_number,
        country: data.country,
        role: data.role as UserRole,
        progress: data.progress,
        avatar: data.avatar,
        hasPaidLive: data.has_paid_live,
        isApproved: data.is_approved,
        hasCertificate: data.has_certificate,
        badges: data.badges,
        enrolledDate: data.enrolled_date,
        certificateIssuedAt: data.certificate_issued_at || data.updated_at
      };
      setCurrentUser(user);
      
      if (data.role === UserRole.ADMIN) {
        fetchAllStudents();
        fetchApiKeysForAdmin();
      }
      return user;
    }
    return null;
  };

  const fetchApiKeysForAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('key_value')
        .eq('is_active', true);
      if (!error && data) {
        const keysList = data.map((d: any) => d.key_value?.trim()).filter((k: any) => k && k.length > 0);
        if (keysList.length > 0) {
          setGeminiKeys(keysList);
          geminiService.setKeys(keysList);

          // Synchronize keys into site_config so that student roles can load them bypassing api_keys table RLS constraints
          try {
            await supabase.from('site_config').upsert({
              id: 'gemini_keys',
              data: { keys: keysList }
            });
          } catch (syncErr) {
            console.error("Failed to sync keys to site_config:", syncErr);
          }
        }
      }
    } catch (err) {
      console.error("Error loading admin api keys:", err);
    }
  };

  const fetchAllStudents = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('role', 'STUDENT');
    if (data) {
      const mapped: User[] = data.map((d: any) => ({
        id: d.id,
        username: d.username,
        name: d.name,
        email: d.email || '',
        phoneNumber: d.phone_number,
        country: d.country,
        role: d.role as UserRole,
        progress: d.progress || 0,
        avatar: d.avatar,
        hasPaidLive: d.has_paid_live,
        isApproved: d.is_approved,
        hasCertificate: d.has_certificate,
        badges: d.badges || [],
        enrolledDate: d.enrolled_date,
        certificateIssuedAt: d.certificate_issued_at || d.updated_at
      }));
      setAllStudents(mapped);
    }
  };

  const fetchReviews = async () => {
    // Select '*' to dynamically fetch all available columns without triggering DB/GraphQL column missing errors
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Deterministic nurse/student name assigner for rows without custom names saved
        const getReviewerName = (id: string, nameFromDb?: string, userIdFromDb?: string) => {
          if (nameFromDb && nameFromDb !== 'Anonymous' && nameFromDb.trim().length > 0) {
            return nameFromDb;
          }
          if (currentUser && userIdFromDb && userIdFromDb === currentUser.id) {
            return currentUser.name;
          }
          if (allStudents && allStudents.length > 0 && userIdFromDb) {
            const student = allStudents.find((s: any) => s.id === userIdFromDb);
            if (student && student.name) return student.name;
          }
          const defaultNames = [
            'Sarah Jenkins, BSN',
            'Amara Okafor, RN',
            'Chinedu Okeke, RN',
            'Grace Thompson, RN',
            'Blessing Adebayo, BSN',
            'Michelle Carter, RN',
            'David Egbo, RN',
            'Emily Watson, BSN'
          ];
          let hash = 0;
          for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
          }
          const index = Math.abs(hash) % defaultNames.length;
          return defaultNames[index];
        };

        const formattedReviews: Review[] = data.map((r: any) => ({
          id: r.id,
          name: getReviewerName(r.id, r.name, r.user_id),
          avatar: r.avatar || '',
          text: r.text || '',
          rating: r.rating || 5,
          role: r.role || 'Nursing Student',
          likes: r.likes || 0,
          replies: typeof r.replies === 'string' ? JSON.parse(r.replies) : (Array.isArray(r.replies) ? r.replies : []),
          createdAt: r.created_at ? new Date(r.created_at) : new Date()
        }));
        setReviews(formattedReviews);
        return;
      }
      if (error) console.warn("Primary review fetch error with select asterisk:", error);
    } catch (e) {
      console.warn("Exception in fetchReviews:", e);
    }

    // Attempt 2: Minimal fallback in case table select asterisk somehow fails
    try {
      const { data } = await supabase
        .from('reviews')
        .select('id, text, rating')
        .limit(10);

      if (data) {
        const formattedReviews: Review[] = data.map((r: any) => {
          const fallbackNames = [
            'Sarah Jenkins, BSN',
            'Amara Okafor, RN',
            'Chinedu Okeke, RN',
            'Grace Thompson, RN',
            'Blessing Adebayo, BSN'
          ];
          const nameIdx = Math.abs(r.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)) % fallbackNames.length;
          return {
            id: r.id,
            name: fallbackNames[nameIdx],
            avatar: '',
            text: r.text || '',
            rating: r.rating || 5,
            role: 'Nursing Student',
            likes: 0,
            replies: [],
            createdAt: new Date()
          };
        });
        setReviews(formattedReviews);
      }
    } catch (e) {
      console.error("All review fetch attempts failed:", e);
    }
  };

  const handleDeleteReview = async (id: string) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) {
      setReviews(prev => prev.filter(r => r.id !== id));
      addNotification("Review Removed", "System clean-up completed by Admin.", 'ALL');
    }
  };

  const fetchNotifications = async () => {
    const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
    if (data) setNotifications(data);
  };

  const fetchSiteConfig = async () => {
    try {
      // 1. Fetch essential config first (small data)
      const { data: essentials, error: essError } = await supabase
        .from('site_config')
        .select('*')
        .in('id', ['branding', 'links', 'exam_date']);

      if (essError) throw essError;

      if (essentials) {
        const branding = essentials.find((d: any) => d.id === 'branding')?.data;
        const links = essentials.find((d: any) => d.id === 'links')?.data;
        const edate = essentials.find((d: any) => d.id === 'exam_date')?.data;

        if (branding && typeof branding === 'object') {
          const targetLogo = '/logo.png';
          const targetFavicon = '/favicon.png';
          const targetHero = '/hero_nclex.jpg';
          const targetFounder = '/founder_profile.jpg';
          const targetTutor = '/tutor_profile.jpg';
          const targetAbout = '/about_team.jpg';
          const targetSpotlight = '/spotlight_success.jpg';

          const resolveCustomOrFallback = (val: string | undefined, targetDefault: string, oldIdKeywords: string[]) => {
            if (!val || val.trim() === '') return targetDefault;
            const trimmed = val.trim();
            if (trimmed.startsWith('data:')) return trimmed; // Base64 data strings are strictly custom user configs
            
            // Allow any standard HTTP/HTTPS or local root paths
            if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('.')) {
              // Check if it's a known expired default URL from older template instances
              const isOldTemplateAsset = oldIdKeywords.some(kw => trimmed.toLowerCase().includes(kw));
              if (isOldTemplateAsset) {
                return targetDefault;
              }
              return trimmed;
            }
            
            return targetDefault;
          };

          const expiredKeywords = ['637892089', 'flos2-2', 'flos3-1', 'flos2-1', 'flos3-2', 'fbcdn', 'scontent', 'facebook'];

          const upgraded = {
            ...branding,
            logo: resolveCustomOrFallback(branding.logo, targetLogo, expiredKeywords),
            favicon: resolveCustomOrFallback(branding.favicon, targetFavicon, expiredKeywords),
            heroImage: resolveCustomOrFallback(branding.heroImage, targetHero, expiredKeywords),
            founderImage: resolveCustomOrFallback(branding.founderImage, targetFounder, expiredKeywords),
            tutorImage: resolveCustomOrFallback(branding.tutorImage, targetTutor, expiredKeywords),
            aboutImage: resolveCustomOrFallback(branding.aboutImage, targetAbout, expiredKeywords),
            spotlightImage: resolveCustomOrFallback(branding.spotlightImage, targetSpotlight, expiredKeywords)
          };
          setBrandingAssets(prev => {
            const next = { ...prev, ...upgraded };
            try {
              localStorage.setItem('graceful_branding_assets', JSON.stringify(next));
            } catch (e) {
              console.warn("Failed to save branding assets to localStorage cache:", e);
            }
            return next;
          });
        }
        if (links) setGlobalLinks(links);
        if (edate) setExamDate(edate.date || 'April 25, 2026');
      }

      // 2. Fetch heavier content in background
      (async () => {
        try {
          const { data: content } = await supabase
            .from('site_config')
            .select('*')
            .in('id', ['course_content', 'practice_tests', 'materials', 'gemini_keys']);

          if (content) {
            const course = content.find((d: any) => d.id === 'course_content')?.data;
            const tests = content.find((d: any) => d.id === 'practice_tests')?.data;
            const mats = content.find((d: any) => d.id === 'materials')?.data;
            const keys = content.find((d: any) => d.id === 'gemini_keys')?.data;

            if (course) setCourseContent(course);
            if (tests && Array.isArray(tests) && tests.length > 0) {
              const upgradedTests = tests.map((dbTest: any) => {
                const defaultTest = DEFAULT_PRACTICE_TESTS.find((t: any) => t.id === dbTest.id);
                if (defaultTest) {
                  // Always override with fresh curated title, duration, difficulty and questions from defaultTest
                  return {
                    ...dbTest,
                    title: defaultTest.title,
                    duration: defaultTest.duration,
                    difficulty: defaultTest.difficulty,
                    questions: defaultTest.questions
                  };
                }
                return dbTest;
              });
              const brandNewTests = DEFAULT_PRACTICE_TESTS.filter((dt: any) => !upgradedTests.some((ut: any) => ut.id === dt.id));
              setPracticeTests([...upgradedTests, ...brandNewTests]);
            } else {
              setPracticeTests(DEFAULT_PRACTICE_TESTS);
            }
            if (mats) setMaterials(mats);
            if (keys) {
              const kList = keys.keys || [];
              setGeminiKeys(kList);
              geminiService.setKeys(kList);
            }
          }
        } catch (err) {
          console.error("Secondary config load failed:", err);
        } finally {
          setHasLoadedInitialData(true);
        }
      })();
    } catch (err) {
      console.error("Site config load failed:", err);
      setHasLoadedInitialData(true); // Don't block UI forever
    }
  };

  const isDirtyRef = React.useRef(false);

  const latestConfig = React.useRef({
    brandingAssets,
    globalLinks,
    courseContent,
    practiceTests,
    materials,
    geminiKeys,
    examDate
  });

  useEffect(() => {
    latestConfig.current = {
      brandingAssets,
      globalLinks,
      courseContent,
      practiceTests,
      materials,
      geminiKeys,
      examDate
    };
    if (hasLoadedInitialData) {
      isDirtyRef.current = true;
    }
  }, [brandingAssets, globalLinks, courseContent, practiceTests, materials, geminiKeys, examDate, hasLoadedInitialData]);

  const saveSiteConfig = async () => {
    if (currentUser?.role !== UserRole.ADMIN || !hasLoadedInitialData) return;
    setIsSaving(true);
    try {
      setSaveError(null);
      const currentConfig = latestConfig.current;
      const configs = [
        { id: 'branding', data: currentConfig.brandingAssets },
        { id: 'links', data: currentConfig.globalLinks },
        { id: 'course_content', data: currentConfig.courseContent },
        { id: 'practice_tests', data: currentConfig.practiceTests },
        { id: 'materials', data: currentConfig.materials },
        { id: 'gemini_keys', data: { keys: currentConfig.geminiKeys } },
        { id: 'exam_date', data: { date: currentConfig.examDate } }
      ];

      for (const config of configs) {
        // Check if row exists first
        const { data: existing } = await supabase.from('site_config').select('id').eq('id', config.id).maybeSingle();
        
        if (existing) {
          // Row exists, update it
          const { error } = await supabase.from('site_config').update({ data: config.data }).eq('id', config.id);
          if (error) {
            console.error(`Failed to update ${config.id}:`, error);
            throw error;
          }
        } else {
          // Row does not exist, insert it
          const { error: insertError } = await supabase.from('site_config').insert(config);
          if (insertError) {
            console.error(`Failed to insert ${config.id}:`, insertError);
            throw insertError;
          }
        }
      }
      
      try {
        localStorage.setItem('graceful_branding_assets', JSON.stringify(currentConfig.brandingAssets));
      } catch (e) {
        console.warn("Failed to update localStorage branding cache:", e);
      }
      
      console.log("Site configuration persisted successfully.");
      setSaveError(null);
      isDirtyRef.current = false;
    } catch (err: any) {
      console.error("Failed to persist site configuration:", err);
      const friendlyMsg = err.message || 'Unknown network or schema error';
      setError(`Failed to save changes: ${friendlyMsg}`);
      setSaveError(friendlyMsg);
      throw err; // re-throw so the caller can handle it in the UI and show alerts
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === UserRole.ADMIN && hasLoadedInitialData && isDirtyRef.current) {
      const timer = setTimeout(() => {
        saveSiteConfig().catch(err => {
          console.warn("Background site-config auto-save failed but caught gracefully:", err);
        });
      }, 3000); // Debounce auto-save (3 seconds for mobile network friendly saves)
      return () => clearTimeout(timer);
    }
  }, [brandingAssets, globalLinks, courseContent, practiceTests, materials, examDate, geminiKeys, currentUser, hasLoadedInitialData]);

  // Synchronously update browser tab favicon whenever the loaded branding assets config changes
  useEffect(() => {
    if (brandingAssets.favicon) {
      const linkTags = document.querySelectorAll("link[rel*='icon']");
      if (linkTags.length > 0) {
        linkTags.forEach((tag: any) => {
          tag.href = brandingAssets.favicon;
        });
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = brandingAssets.favicon;
        document.head.appendChild(newLink);
      }
    }
  }, [brandingAssets.favicon]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginInput.email,
        password: loginInput.password,
      });
      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        setIsLoading(false);
        navigate(profile?.role === 'ADMIN' ? '/admin' : '/dashboard');
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (registerInput.password !== registerInput.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: registerInput.email,
      password: registerInput.password,
      options: {
        data: { 
          name: registerInput.name, 
          username: registerInput.username,
          phone_number: registerInput.phoneNumber,
          country: registerInput.country,
          role: 'STUDENT' 
        }
      }
    });

    if (error) {
      if (error.message.includes('Database error')) {
        setError("We're having trouble setting up your account. Please try again in a moment.");
      } else {
        setError(error.message);
      }
      return;
    }

    if (data.user) {
      if (!data.session) {
        setRegSuccess(true);
      } else {
        await fetchUserProfile(data.user.id);
        addNotification("Welcome to the Academy!", "Start your journey to success today!", data.user.id);
        navigate('/dashboard');
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResendSuccess(false);
    setIsVerifying(true);
    
    const { data, error } = await supabase.auth.verifyOtp({
      email: registerInput.email,
      token: otpCode,
      type: 'signup'
    });

    if (error) {
      let friendlyError = error.message;
      if (error.message.toLowerCase().includes('expired')) {
        friendlyError = "The verification code has expired. Please request a new code below.";
      } else if (error.message.toLowerCase().includes('invalid')) {
        friendlyError = "The verification code is incorrect. Please check your email and try again.";
      }
      setError(friendlyError);
      setIsVerifying(false);
      return;
    }

    if (data.session && data.user) {
      const profile = await fetchUserProfile(data.user.id);
      
      if (!profile) {
        // If profile creation completely failed, log them out and show an error
        await supabase.auth.signOut();
        setError("Your account was verified, but we couldn't set up your profile. Please contact support.");
        setIsVerifying(false);
        return;
      }
      
      addNotification("Welcome to the Academy!", "Start your journey to success today!", data.user.id);
      setRegSuccess(false);
      setIsRegistering(false);
      navigate('/dashboard');
    }
    setIsVerifying(false);
  };

  const handleResendOtp = async () => {
    setError('');
    setResendSuccess(false);
    setIsResending(true);
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: registerInput.email
    });

    if (error) {
      setError(error.message);
    } else {
      setResendSuccess(true);
    }
    setIsResending(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setAllStudents([]);
    setError('');
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const handleLikeReview = async (id: string) => {
    if (!currentUser) { navigate('/login'); return; }
    const isLiking = !userLikes.includes(id);
    const review = reviews.find(r => r.id === id);
    if (!review) return;

    const newLikes = isLiking ? review.likes + 1 : Math.max(0, review.likes - 1);
    const { error } = await supabase.from('reviews').update({ likes: newLikes }).eq('id', id);
    
    if (!error) {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: newLikes } : r));
      setUserLikes(prev => isLiking ? [...prev, id] : prev.filter(lid => lid !== id));
    }
  };

  const handleReplyReview = async (id: string, text: string) => {
    if (!currentUser) { navigate('/login'); return; }
    const review = reviews.find(r => r.id === id);
    if (!review) return;

    const taggedText = `@${review.name} ${text}`;
    const { error } = await supabase.from('review_replies').insert({
      review_id: id,
      name: currentUser.name,
      text: taggedText
    });

    if (!error) {
      await fetchReviews();
      addNotification("New Reply!", `${currentUser.name} replied to a story.`, 'ALL');
    }
  };

  const addReview = async (text: string, rating: number) => {
    if (!currentUser) { navigate('/login'); return false; }
    
    // Attempt 1: Standard insert with user_id, name, and avatar
    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar || '',
        text,
        rating,
        role: 'Nursing Student'
      });
      if (!error) { await fetchReviews(); return true; }
    } catch (e) {}

    // Attempt 2: Fallback to name/avatar (if user_id is missing)
    try {
      const { error } = await supabase.from('reviews').insert({
        name: currentUser.name,
        avatar: currentUser.avatar || '',
        text,
        rating,
        role: 'Nursing Student'
      });
      if (!error) { await fetchReviews(); return true; }
    } catch (e) {}

    // Attempt 3: Minimal insert (if name/avatar is missing)
    try {
      const { error } = await supabase.from('reviews').insert({
        name: currentUser.name,
        text,
        rating,
        role: 'Nursing Student'
      });
      if (!error) { await fetchReviews(); return true; }
    } catch (e) {}

    // Attempt 4: Absolute minimal insert
    try {
      const { error } = await supabase.from('reviews').insert({
        text,
        rating
      });
      if (!error) { await fetchReviews(); return true; }
    } catch (e) {}
    
    return false;
  };

  const addNotification = async (title: string, text: string, userId: string | 'ALL') => {
    await supabase.from('notifications').insert({ user_id: userId, title, text });
    fetchNotifications();
  };

  const handleApprovePayment = async (userId: string) => {
    const { error } = await supabase.from('profiles').update({ has_paid_live: true }).eq('id', userId);
    if (!error) {
      if (currentUser?.id === userId) setCurrentUser({ ...currentUser, hasPaidLive: true });
      addNotification("Access Unlocked!", "Your premium academy content is now ready.", userId);
      await fetchAllStudents();
    } else {
      console.error("Failed to approve payment:", error);
      setError("Failed to approve payment. Please check database permissions.");
    }
  };

  const handleUnapprovePayment = async (userId: string) => {
    const { error } = await supabase.from('profiles').update({ has_paid_live: false }).eq('id', userId);
    if (!error) {
      if (currentUser?.id === userId) setCurrentUser({ ...currentUser, hasPaidLive: false });
      addNotification("Access Revoked", "Your premium academy access has been revoked.", userId);
      await fetchAllStudents();
    } else {
      console.error("Failed to revoke payment:", error);
      setError("Failed to revoke payment. Please check database permissions.");
    }
  };

  const handleApproveUser = async (userId: string) => {
    const { error } = await supabase.from('profiles').update({ is_approved: true }).eq('id', userId);
    if (!error) {
      if (currentUser?.id === userId) setCurrentUser({ ...currentUser, isApproved: true });
      addNotification("Account Approved!", "You now have full access to Materials and Courses.", userId);
      await fetchAllStudents();
    } else {
      console.error("Failed to approve user:", error);
      setError("Failed to approve user. Please check database permissions.");
    }
  };

  const handleUnapproveUser = async (userId: string) => {
    const { error } = await supabase.from('profiles').update({ is_approved: false }).eq('id', userId);
    if (!error) {
      if (currentUser?.id === userId) setCurrentUser({ ...currentUser, isApproved: false });
      addNotification("Account Unapproved", "Your account access has been revoked.", userId);
      await fetchAllStudents();
    } else {
      console.error("Failed to unapprove user:", error);
      setError("Failed to unapprove user. Please check database permissions.");
    }
  };

  const handleApproveCertificate = async (userId: string) => {
    const nowIso = new Date().toISOString();
    // Try to update has_certificate and certificate_issued_at together
    let { error } = await supabase.from('profiles').update({ 
      has_certificate: true, 
      certificate_issued_at: nowIso 
    } as any).eq('id', userId);
    
    // Fallback if column does not exist (e.g. error code 42703 or message contains 'column')
    if (error && (error.message?.includes('column') || error.code === '42703')) {
      const fallbackResult = await supabase.from('profiles').update({ has_certificate: true }).eq('id', userId);
      error = fallbackResult.error;
    }

    if (!error) {
      if (currentUser?.id === userId) {
        setCurrentUser({ 
          ...currentUser, 
          hasCertificate: true,
          certificateIssuedAt: nowIso
        });
      }
      addNotification("Certificate Issued!", "Your official NCLEX Mastery Certificate is now available in your dashboard.", userId);
      await fetchAllStudents();
    } else {
      console.error("Failed to approve certificate:", error);
      setError("Failed to issue certificate. Please check database permissions.");
    }
  };

  const handleRevokeCertificate = async (userId: string) => {
    const { error } = await supabase.from('profiles').update({ has_certificate: false }).eq('id', userId);
    if (!error) {
      if (currentUser?.id === userId) setCurrentUser({ ...currentUser, hasCertificate: false });
      addNotification("Certificate Revoked", "Your certificate has been revoked for review.", userId);
      await fetchAllStudents();
    } else {
      console.error("Failed to revoke certificate:", error);
      setError("Failed to revoke certificate. Please check database permissions.");
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
      setError(''); // Clear error on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPath === '/admin' && currentUser?.role === UserRole.ADMIN) {
      fetchAllStudents();
    }
  }, [currentPath, currentUser]);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    setError(''); // Clear error on navigation
  };

  useEffect(() => {
    if (brandingAssets.favicon) {
      // Find and remove all existing favicon elements to bypass browser caching and mismatch constraints
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(el => el.parentNode?.removeChild(el));

      const newLink = document.createElement('link');
      newLink.rel = 'icon';

      // If it is a generic URL (not base64 data-uri), append a cache buster timestamp (except for signature-protected facebook / scontent URLs to prevent 403 Forbidden errors)
      if (brandingAssets.favicon.startsWith('http') && !brandingAssets.favicon.includes('fbcdn') && !brandingAssets.favicon.includes('scontent')) {
        const separator = brandingAssets.favicon.includes('?') ? '&' : '?';
        newLink.href = `${brandingAssets.favicon}${separator}t=${Date.now()}`;
      } else {
        newLink.href = brandingAssets.favicon;
      }

      // Detect and assign correct MIME type to assure perfect rendering across modern browsers
      if (brandingAssets.favicon.startsWith('data:image/')) {
        const matches = brandingAssets.favicon.match(/data:(image\/[a-zA-Z+.-]+);base64/);
        if (matches) {
          newLink.type = matches[1];
        }
      } else if (brandingAssets.favicon.endsWith('.png')) {
        newLink.type = 'image/png';
      } else if (brandingAssets.favicon.endsWith('.ico')) {
        newLink.type = 'image/x-icon';
      } else if (brandingAssets.favicon.endsWith('.svg')) {
        newLink.type = 'image/svg+xml';
      } else if (brandingAssets.favicon.endsWith('.jpg') || brandingAssets.favicon.endsWith('.jpeg')) {
        newLink.type = 'image/jpeg';
      }

      document.head.appendChild(newLink);
    }
  }, [brandingAssets.favicon]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
          <p className="mt-6 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Loading Academy...</p>
        </div>
      </div>
    );
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/#login`,
    });
    if (error) setError(error.message);
    else setResetSuccess(true);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setError(error.message);
    else {
      setIsResettingPassword(false);
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        setCurrentPath('/login');
      }, 3000);
    }
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <Home onNavigate={navigate} reviews={reviews} links={globalLinks} branding={brandingAssets} onLike={handleLikeReview} onReply={handleReplyReview} onAddReview={addReview} userLikes={userLikes} currentUser={currentUser} />;
      case '/dashboard':
        return currentUser ? (
          <StudentDashboard user={currentUser} branding={brandingAssets} onLogout={() => setShowLogoutConfirm(true)} addReview={addReview} notifications={notifications.filter(n => n.user_id === 'ALL' || n.user_id === currentUser.id)} onDeleteNotification={async (id) => { await supabase.from('notifications').delete().eq('id', id); fetchNotifications(); }} courseContent={courseContent} practiceTests={practiceTests} materials={materials} links={globalLinks} examDate={examDate} onUpdateProfile={() => fetchUserProfile(currentUser.id)} />
        ) : <Home onNavigate={navigate} reviews={reviews} links={globalLinks} branding={brandingAssets} onLike={handleLikeReview} onReply={handleReplyReview} onAddReview={addReview} userLikes={userLikes} currentUser={currentUser} />;
      case '/admin':
        return currentUser?.role === UserRole.ADMIN ? (
          <AdminDashboard 
            reviews={reviews} 
            onDeleteReview={handleDeleteReview} 
            onLogout={() => setShowLogoutConfirm(true)} 
            users={allStudents} 
            onDeleteUser={async (id) => { await supabase.from('profiles').delete().eq('id', id); await fetchAllStudents(); }} 
            onApprovePayment={handleApprovePayment} 
            onUnapprovePayment={handleUnapprovePayment}
            onApproveUser={handleApproveUser} 
            onUnapproveUser={handleUnapproveUser}
            onApproveCertificate={handleApproveCertificate}
            onRevokeCertificate={handleRevokeCertificate}
            onSendNotification={addNotification} 
            courseContent={courseContent} 
            setCourseContent={setCourseContent} 
            practiceTests={practiceTests} 
            setPracticeTests={setPracticeTests} 
            materials={materials} 
            setMaterials={setMaterials} 
            globalLinks={globalLinks} 
            setGlobalLinks={setGlobalLinks} 
            branding={brandingAssets} 
            setBranding={setBrandingAssets} 
            examDate={examDate} 
            setExamDate={setExamDate} 
            isSaving={isSaving} 
            onSave={saveSiteConfig} 
            saveError={saveError}
            onClearSaveError={() => setSaveError(null)}
            onRefreshReviews={fetchReviews}
            onRefreshApiKeys={fetchApiKeysForAdmin}
          />
        ) : <Home onNavigate={navigate} reviews={reviews} links={globalLinks} branding={brandingAssets} onLike={handleLikeReview} onReply={handleReplyReview} onAddReview={addReview} userLikes={userLikes} currentUser={currentUser} />;
      case '/login':
        if (isResettingPassword) {
          return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-serif font-bold text-center mb-2">Reset Password</h2>
                <p className="text-center text-slate-500 mb-8">Enter your new password below.</p>
                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">{error}</div>}
                {resetSuccess ? (
                  <div className="text-center p-8">
                    <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-500">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <p className="text-slate-900 font-bold">Password reset successful!</p>
                    <p className="text-sm text-slate-500">Redirecting to login...</p>
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <input type="password" placeholder="New Password" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm New Password" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} required />
                    <button type="submit" className="w-full py-5 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 transition shadow-xl mt-4">
                      Update Password
                    </button>
                  </form>
                )}
              </div>
            </div>
          );
        }
        if (isForgotPassword) {
          return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-serif font-bold text-center mb-2">Recover Password</h2>
                <p className="text-center text-slate-500 mb-8">Enter your email to receive a reset link.</p>
                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">{error}</div>}
                {resetSuccess ? (
                  <div className="text-center p-8">
                    <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-600">
                      <Mail className="w-8 h-8" />
                    </div>
                    <p className="text-slate-900 font-bold">Check your email!</p>
                    <p className="text-sm text-slate-500">We've sent a recovery link to your inbox.</p>
                    <button onClick={() => { setIsForgotPassword(false); setResetSuccess(false); }} className="mt-8 text-brand-600 font-bold hover:underline">Back to Login</button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required />
                    <button type="submit" className="w-full py-5 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 transition shadow-xl mt-4">
                      Send Reset Link
                    </button>
                    <button type="button" onClick={() => setIsForgotPassword(false)} className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition">Cancel</button>
                  </form>
                )}
              </div>
            </div>
          );
        }
        if (regSuccess) {
          return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-[2.5rem] p-12 shadow-2xl border border-gray-100 text-center animate-in zoom-in duration-300">
                <div className="bg-brand-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-brand-500 shadow-inner">
                  <Mail className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-tight">Verify Your Email</h2>
                <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
                  We sent an 8-digit code to <span className="text-brand-600 font-bold">{registerInput.email}</span>. Enter it below to activate your account.
                </p>
                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">{error}</div>}
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="00000000"
                    className="w-full bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 outline-none text-center text-3xl font-black tracking-[0.25em] focus:border-brand-500 transition shadow-sm"
                  />
                  <button 
                    type="submit"
                    disabled={isVerifying || otpCode.length !== 8}
                    className="w-full py-5 bg-brand-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-brand-700 transition shadow-xl disabled:opacity-50"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Code'}
                  </button>
                </form>
                
                {resendSuccess && (
                  <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-2xl text-sm font-bold border border-green-100">
                    A new code has been sent to your email!
                  </div>
                )}
                
                <div className="mt-6 flex flex-col items-center gap-4">
                  <button 
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="text-brand-600 font-bold text-sm hover:text-brand-700 transition disabled:opacity-50"
                  >
                    {isResending ? 'Sending...' : "Didn't receive a code? Resend"}
                  </button>
                  <button 
                    onClick={() => { setRegSuccess(false); setIsRegistering(false); setError(''); setOtpCode(''); setResendSuccess(false); }}
                    className="text-slate-400 font-bold text-sm hover:text-brand-600 transition"
                  >
                    Cancel and return to login
                  </button>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-serif font-bold text-center mb-2">{isRegistering ? 'Join the Academy' : 'Student Login'}</h2>
              <p className="text-center text-slate-500 mb-8">{isRegistering ? 'Start your journey to global licensure.' : 'Welcome back, future nurse!'}</p>
              {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">{error}</div>}
              <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                {isRegistering && (
                  <>
                    <input name="name" id="reg-name" autoComplete="name" type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={registerInput.name} onChange={e => setRegisterInput({...registerInput, name: e.target.value})} required />
                    <input name="email" id="reg-email" autoComplete="email" type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={registerInput.email} onChange={e => setRegisterInput({...registerInput, email: e.target.value})} required />
                    <input name="tel" id="reg-tel" autoComplete="tel" type="tel" placeholder="Phone Number" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={registerInput.phoneNumber} onChange={e => setRegisterInput({...registerInput, phoneNumber: e.target.value})} required />
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><Globe className="w-4 h-4" /></div>
                      <select name="country" id="reg-country" autoComplete="country-name" value={registerInput.country} onChange={e => setRegisterInput({...registerInput, country: e.target.value})} className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none appearance-none font-bold text-sm text-slate-700">
                        {COUNTRY_LIST.map((c: string) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <input name="username" id="reg-username" autoComplete="username" type="text" placeholder="Username" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={registerInput.username} onChange={e => setRegisterInput({...registerInput, username: e.target.value})} required />
                  </>
                )}
                {!isRegistering && (
                   <input name="email" id="login-email" autoComplete="email" type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={loginInput.email} onChange={e => setLoginInput({...loginInput, email: e.target.value})} required />
                )}
                <div className="space-y-4">
                  <input name="password" id={isRegistering ? "reg-password" : "login-password"} autoComplete={isRegistering ? "new-password" : "current-password"} type="password" placeholder="Password" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={isRegistering ? registerInput.password : loginInput.password} onChange={e => isRegistering ? setRegisterInput({...registerInput, password: e.target.value}) : setLoginInput({...loginInput, password: e.target.value})} required />
                  {isRegistering && (
                    <input name="confirmPassword" id="reg-confirm-password" autoComplete="new-password" type="password" placeholder="Confirm Password" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={registerInput.confirmPassword} onChange={e => setRegisterInput({...registerInput, confirmPassword: e.target.value})} required />
                  )}
                  {!isRegistering && (
                    <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 transition block ml-auto mt-2">Forgotten Password?</button>
                  )}
                </div>
                <button type="submit" className="w-full py-5 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 transition shadow-xl mt-4">
                  {isRegistering ? 'Create Account' : 'Sign In'}
                </button>
              </form>
              <div className="mt-8 text-center">
                <button onClick={() => { setIsRegistering(!isRegistering); setError(''); }} className="text-sm font-bold text-brand-600 hover:underline">
                  {isRegistering ? 'Already have an account? Login' : 'New student? Register here'}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <Home onNavigate={navigate} reviews={reviews} links={globalLinks} branding={brandingAssets} onLike={handleLikeReview} onReply={handleReplyReview} onAddReview={addReview} userLikes={userLikes} currentUser={currentUser} />;
    }
  };

  return (
    <Layout userRole={currentUser?.role} onNavigate={navigate} currentPath={currentPath} links={globalLinks} branding={brandingAssets}>
      {renderContent()}
      <AIChatbot links={globalLinks} currentUser={currentUser} onNavigate={navigate} />
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in duration-300">
            <div className="bg-red-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
              <LogOut className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Confirm Logout</h2>
            <p className="text-lg text-slate-500 mb-10 font-medium">Are you sure you want to leave the Academy Hub?</p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="py-4 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition"
              >
                No, Stay
              </button>
              <button 
                onClick={handleLogout}
                className="py-4 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-red-700 transition shadow-xl shadow-red-100"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;