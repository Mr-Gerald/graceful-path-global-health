import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  MessageCircle, 
  RefreshCw, 
  HelpCircle,
  ExternalLink,
  Bot,
  User,
  GraduationCap,
  Award,
  ShieldCheck,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../services/geminiService';

interface AIChatbotProps {
  links?: {
    whatsapp?: string;
    whatsappAcademyGroup?: string;
    paidLiveWhatsapp?: string;
    telegram?: string;
    email?: string;
    [key: string]: any;
  };
  currentUser?: any;
  onNavigate?: (path: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  showWhatsappButton?: boolean;
}

interface SuggestedQuestion {
  id: string;
  text: string;
  category: 'passpoint' | 'course' | 'account' | 'certificate' | 'nursing' | 'admin';
  icon: React.ReactNode;
}

const INITIAL_SUGGESTIONS: SuggestedQuestion[] = [
  {
    id: 's1',
    text: 'How do I navigate PassPoint Mock CAT?',
    category: 'passpoint',
    icon: <Zap className="w-3.5 h-3.5 text-amber-500" />
  },
  {
    id: 's2',
    text: 'How does the 30-Day NCLEX Course work?',
    category: 'course',
    icon: <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
  },
  {
    id: 's3',
    text: 'How do I upgrade to Premium Access?',
    category: 'account',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
  },
  {
    id: 's4',
    text: 'How do I qualify and download my Certificate?',
    category: 'certificate',
    icon: <Award className="w-3.5 h-3.5 text-purple-500" />
  },
  {
    id: 's5',
    text: 'Help with my personal account or payment',
    category: 'admin',
    icon: <MessageCircle className="w-3.5 h-3.5 text-green-500" />
  },
  {
    id: 's6',
    text: 'NCLEX High-Yield Prioritization Tips',
    category: 'nursing',
    icon: <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
  }
];

export const AIChatbot: React.FC<AIChatbotProps> = ({ links, currentUser, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: `Hello! 👋 I am **Grace**, your AI Clinical Nursing Tutor & Academy Advisor at **Graceful Path Global Health**.\n\nHow can I support your NCLEX preparation or academy navigation today? You can tap any of the suggested topics below or ask me anything directly!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const whatsappUrl = links?.whatsapp || 'https://wa.me/447470539081';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isThinking]);

  // Intelligent local fallback response generator for ultimate reliability & speed
  const generateLocalKnowledgeResponse = (userPrompt: string): { content: string; showWhatsapp: boolean } => {
    const clean = userPrompt.toLowerCase();

    // 1. PassPoint / Mock Navigation
    if (clean.includes('passpoint') || clean.includes('mock') || clean.includes('cat') || clean.includes('navigate') || clean.includes('exam')) {
      return {
        content: `**PassPoint Adaptive Mock CAT Navigation Guide** 🎓\n\n` +
          `1. **Accessing the Exam**: Navigate to **Assessments** in the sidebar menu and select **PassPoint Mock**.\n` +
          `2. **Adaptive Engine**: PassPoint mimics the real NCLEX-RN Computerized Adaptive Testing (CAT) algorithm, continuously adjusting question difficulty based on your accuracy.\n` +
          `3. **Test Format**: Contains 50 to 75 questions with a realistic timer and clinical case scenario options.\n` +
          `4. **Instant Rationales**: After every question, view detailed clinical rationale breakdowns to reinforce critical thinking.\n` +
          `5. **Performance Diagnostic**: At the end of your test, inspect your passing probability and client needs domain scores.\n\n` +
          `*Tip: Ensure you complete the exam without refreshing to preserve your full diagnostic report!*`,
        showWhatsapp: false
      };
    }

    // 2. 30-Day NCLEX Mastery Course
    if (clean.includes('30-day') || clean.includes('30 day') || clean.includes('course') || clean.includes('curriculum') || clean.includes('lesson')) {
      return {
        content: `**30-Day NCLEX Mastery Course Overview** 📚\n\n` +
          `• **Daily Structure**: 30 structured, high-yield days covering all official NCLEX client needs categories.\n` +
          `• **Core Learning Materials**: Each module includes video lectures, clinical case notes, interactive flashcards, and end-of-day practice quizzes.\n` +
          `• **Tracking**: Progress is automatically saved to your **Student Dashboard**.\n` +
          `• **How to Start**: Click **Courses** on the navigation menu to access Day 1 or resume your current module.`,
        showWhatsapp: false
      };
    }

    // 3. Premium Upgrade / Account Verification
    if (clean.includes('upgrade') || clean.includes('premium') || clean.includes('payment') || clean.includes('plan') || clean.includes('cost')) {
      return {
        content: `**Upgrading to Premium Access** 💎\n\n` +
          `• **Free Tier**: Grants access to basic sample questions and course overviews.\n` +
          `• **Premium Membership Unlocks**:\n` +
          `  - Unlimited PassPoint Adaptive Mock CAT attempts\n` +
          `  - Full 30-Day NCLEX Repository & Study Guides\n` +
          `  - Downloadable Certificates of Mastery\n` +
          `  - Direct Academy Director Support\n\n` +
          `• **How to Upgrade**: Go to your **Student Dashboard** and click **Upgrade to Premium**, or submit your proof of payment directly to our Administration team on WhatsApp for immediate account activation.`,
        showWhatsapp: true
      };
    }

    // 4. Certificates
    if (clean.includes('certificate') || clean.includes('cert') || clean.includes('completion') || clean.includes('graduate')) {
      return {
        content: `**Earning Your Certificate of Mastery** 📜\n\n` +
          `• **Requirements**: Achieve a 65%+ passing standard on the PassPoint Mock CAT or complete the 30-Day NCLEX Mastery Course.\n` +
          `• **Accessing Your Certificate**: Navigate to **Dashboard** -> **Certificates** to view, download, or share your signed Academy credential.\n` +
          `• **Verification**: Each certificate is individually signed by our Academy Director and verifiable online.`,
        showWhatsapp: false
      };
    }

    // 5. Admin / Human Contact / Personal Account Help
    if (clean.includes('admin') || clean.includes('human') || clean.includes('whatsapp') || clean.includes('contact') || clean.includes('personal account') || clean.includes('login issue') || clean.includes('password') || clean.includes('support')) {
      return {
        content: `**Graceful Path Global Health Administration Support** 📲\n\n` +
          `I am always here to assist you with nursing concepts, study plans, and platform guidance! For personal account changes, payment proof verification, or direct human support, our dedicated Academy Administrators are ready to help you on WhatsApp.\n\n` +
          `Click the button below to start a direct chat with an Admin right now:`,
        showWhatsapp: true
      };
    }

    // 6. NCLEX Clinical Concepts (Prioritization / ABCs / Meds)
    if (clean.includes('priorit') || clean.includes('abc') || clean.includes('maslow') || clean.includes('pharmacology') || clean.includes('drug') || clean.includes('math')) {
      return {
        content: `**NCLEX High-Yield Clinical Prioritization Rules** 🩺\n\n` +
          `1. **Airway, Breathing, Circulation (ABCs)**: Airway obstruction (stridor, tracheostomy displacement) takes highest priority over all other symptoms.\n` +
          `2. **Acute over Chronic**: An acute unexpected change (e.g., sudden confusion or drop in SpO2) requires immediate action over a stable chronic condition (e.g., baseline COPD dyspnea).\n` +
          `3. **Unstable over Stable**: Prioritize client needs that are unpredictable or post-procedure.\n` +
          `4. **Maslow's Hierarchy**: Address physical survival needs (oxygenation, circulation, hydration) before safety, anxiety, or pain (unless acute chest pain).`,
        showWhatsapp: false
      };
    }

    // Default general response
    return {
      content: `I am happy to assist you with that! At **Graceful Path Global Health**, we provide complete support for your NCLEX-RN exam journey.\n\n` +
        `• **Need Platform Help?** Ask about PassPoint Mock CAT, the 30-Day Course, or Certificates.\n` +
        `• **Need Clinical Review?** Ask me about pharmacology, prioritization, or nursing care concepts.\n` +
        `• **Need Personal Account / Payment Support?** You can connect directly with our Human Administrator via WhatsApp anytime!`,
      showWhatsapp: clean.includes('account') || clean.includes('help') || clean.includes('pay')
    };
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setIsThinking(true);

    // Prepare Gemini chat history
    const geminiHistory = messages.map(m => ({
      role: m.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: m.content }]
    }));

    try {
      // Call Gemini Service
      const response = await geminiService.chat(textToSend, geminiHistory);
      
      const cleanLower = textToSend.toLowerCase();
      const responseTextLower = response.text.toLowerCase();
      
      const requiresWhatsapp = cleanLower.includes('admin') || 
                               cleanLower.includes('whatsapp') || 
                               cleanLower.includes('human') || 
                               cleanLower.includes('payment') || 
                               cleanLower.includes('account') ||
                               responseTextLower.includes('whatsapp') ||
                               responseTextLower.includes('administrator');

      const assistantMsg: ChatMessage = {
        id: `msg_res_${Date.now()}`,
        role: 'assistant',
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showWhatsappButton: requiresWhatsapp
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn("Gemini API call returned error or fallback needed. Using local knowledge engine:", err);
      
      // Fallback seamlessly to local knowledge engine
      const localRes = generateLocalKnowledgeResponse(textToSend);
      
      const assistantMsg: ChatMessage = {
        id: `msg_fallback_${Date.now()}`,
        role: 'assistant',
        content: localRes.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showWhatsappButton: localRes.showWhatsapp
      };

      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'm1',
        role: 'assistant',
        content: `Chat session reset. Hello! 👋 I am **Grace**, your AI Clinical Nursing Tutor. How can I assist you right now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Simple Markdown & Action Card Parser
  const renderMessageContent = (msg: ChatMessage) => {
    const lines = msg.content.split('\n');
    return (
      <div className="space-y-2 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1.5" />;

          // Process bold text
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            return part;
          });

          if (line.startsWith('• ') || line.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-brand-500 font-bold">•</span>
                <span>{line.substring(2)}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedLine}</p>;
        })}

        {/* Action WhatsApp Button */}
        {msg.showWhatsappButton && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-2 text-emerald-800 font-medium text-xs">
              <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Need direct Human Admin support?</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-200 transition duration-200 active:scale-95"
            >
              <span>Contact Admin on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[100] ${isFullscreen ? 'inset-4 md:inset-10 bottom-4 right-4 z-[200]' : ''}`}>
      {/* Trigger Floating Button */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="chat-trigger-btn"
            initial={{ scale: 0, opacity: 0, rotate: -20, filter: 'blur(8px)' }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: 0, 
              filter: 'blur(0px)',
              y: [0, -5, 0]
            }}
            exit={{ scale: 0, opacity: 0, rotate: 20, filter: 'blur(10px)', transition: { duration: 0.2 } }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              scale: { type: 'spring', stiffness: 350, damping: 25 },
              opacity: { duration: 0.25 }
            }}
            onClick={() => setIsOpen(true)}
            className="group relative w-16 h-16 bg-gradient-to-tr from-brand-800 via-brand-600 to-sky-500 text-white rounded-full flex items-center justify-center shadow-[0_10px_35px_-5px_rgba(14,116,144,0.5)] hover:shadow-[0_15px_45px_0px_rgba(14,116,144,0.6)] hover:scale-110 transition-all duration-300 active:scale-95 border border-white/30"
            title="Open AI Tutor & Academy Support"
          >
            {/* Radiant Pulse Rings */}
            <span className="absolute inset-0 rounded-full bg-sky-400/30 animate-ping duration-1000 opacity-75 pointer-events-none" />
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-500 to-sky-400 opacity-30 group-hover:opacity-70 blur-md transition duration-300" />

            <div className="relative z-10 flex items-center justify-center">
              <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300 drop-shadow-sm" />
              <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-md z-20" />

            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold py-1.5 px-3 rounded-xl shadow-xl pointer-events-none border border-slate-700/50">
              AI Tutor & Support
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window-modal"
            initial={{ opacity: 0, scale: 0.6, y: 50, x: 20, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: 'blur(0px)' }}
            exit={{ 
              opacity: 0, 
              scale: 0.65, 
              y: 40, 
              x: 15, 
              filter: 'blur(10px)', 
              transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } 
            }}
            transition={{
              type: 'spring',
              stiffness: 320,
              damping: 26,
              mass: 0.85
            }}
            style={{ transformOrigin: 'bottom right' }}
            className={`bg-white/95 backdrop-blur-xl rounded-[2.2rem] shadow-[0_25px_70px_-15px_rgba(15,23,42,0.3)] border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300 ${
              isFullscreen 
                ? 'w-full h-full' 
                : isMinimized 
                  ? 'h-16 w-80' 
                  : 'h-[630px] w-[360px] sm:w-[420px]'
            }`}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-800 via-brand-600 to-sky-600 text-white flex items-center justify-between shadow-lg relative z-10 overflow-hidden">
              {/* Subtle ambient shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                  <Bot className="w-6 h-6 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-brand-800 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight text-white drop-shadow-sm">Grace</span>
                    <span className="px-2 py-0.5 bg-white/25 text-[9px] font-black uppercase tracking-wider rounded-md border border-white/20 backdrop-blur-sm">AI Tutor</span>
                  </div>
                  <p className="text-[11px] text-brand-100 font-medium">Graceful Path Global Health</p>
                </div>
              </div>

              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 hover:bg-white/20 rounded-xl transition text-brand-100 hover:text-white active:scale-90"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)} 
                  title={isFullscreen ? "Restore window" : "Expand window"}
                  className="p-1.5 hover:bg-white/20 rounded-xl transition text-brand-100 hover:text-white hidden sm:block active:scale-90"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)} 
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-1.5 hover:bg-white/20 rounded-xl transition text-brand-100 hover:text-white active:scale-90"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => { setIsOpen(false); setIsFullscreen(false); }} 
                  title="Close"
                  className="p-1.5 hover:bg-white/20 rounded-xl transition text-brand-100 hover:text-white active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!isMinimized && (
              <>
                {/* Message Log */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 bg-brand-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}

                      <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-brand-600 text-white rounded-tr-none' 
                          : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                      }`}>
                        {renderMessageContent(msg)}
                        <span className={`block text-[10px] mt-1.5 text-right font-medium ${
                          msg.role === 'user' ? 'text-brand-200' : 'text-slate-400'
                        }`}>
                          {msg.timestamp}
                        </span>
                      </div>

                      {msg.role === 'user' && (
                        <div className="w-7 h-7 bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Thinking Spinner */}
                  {isThinking && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium pl-2">
                      <div className="w-7 h-7 bg-brand-600/10 text-brand-600 rounded-xl flex items-center justify-center animate-pulse">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-2xl border border-slate-100 shadow-sm">
                        <span>Grace is analyzing</span>
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested / Optional Questions Chips Bar */}
                <div className="bg-white border-t border-slate-100 p-2.5">
                  <div className="flex items-center justify-between px-1 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-brand-500" />
                      Suggested Topics
                    </span>
                    <span className="text-[10px] text-slate-400">Tap to ask</span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {INITIAL_SUGGESTIONS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSendMessage(item.text)}
                        disabled={isThinking}
                        className="flex-shrink-0 px-2.5 py-1.5 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 text-xs font-medium rounded-xl transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Controls */}
                <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your question here or tap a topic above..."
                    disabled={isThinking}
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-brand-500 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isThinking}
                    className="p-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl transition-all shadow-md shadow-brand-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
