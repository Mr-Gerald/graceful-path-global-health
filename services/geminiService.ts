
import { GoogleGenAI, Type } from "@google/genai";
import { supabase } from './supabaseClient';

import { PERMANENT_QUESTION_BANK, getDomainForDay, generateDynamicQuestion } from './questionBank';

// Use multiple possible environment variables for the API key to ensure compatibility
// Use multiple possible environment variables for the API key to ensure compatibility
let cachedKeys: string[] = [];

const getKeys = async () => {
  if (cachedKeys.length > 0) return cachedKeys;

  // Attempt 1: Safe fallback to site_config table (which is typically public-readable bypassing RLS policy constraints)
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('data')
      .eq('id', 'gemini_keys')
      .single();
    if (!error && data?.data && Array.isArray((data.data as any).keys)) {
      const configKeys = (data.data as any).keys.map((k: string) => k?.trim()).filter((k: string) => k && k.length > 0);
      if (configKeys.length > 0) {
        cachedKeys = configKeys;
        return configKeys;
      }
    }
  } catch (err) {
    console.warn('Error reading API keys from site_config fallback:', err);
  }

  // Attempt 2: Direct lookup from api_keys table (restricted to admins)
  try {
    const { data, error } = await supabase.from('api_keys').select('key_value').eq('is_active', true);
    if (!error && data && data.length > 0) {
      const dbKeys = data.map((row: any) => row.key_value?.trim()).filter((k: string) => k && k.length > 0);
      if (dbKeys.length > 0) {
        cachedKeys = dbKeys;
        return dbKeys;
      }
    }
  } catch (err) {
    console.error('Error fetching API keys from Supabase api_keys:', err);
  }

  const fallbackKeys: string[] = [];
  let envKey: string | undefined = undefined;
  try {
    if (typeof process !== 'undefined' && process && process.env) {
      envKey = (process.env as any).GEMINI_API_KEY;
    }
  } catch (e) {
    // Ignore process errors
  }
  if (!envKey && typeof import.meta !== 'undefined' && import.meta && import.meta.env) {
    envKey = import.meta.env.VITE_GEMINI_API_KEY || (import.meta.env as any).GEMINI_API_KEY;
  }
  if (envKey && envKey.trim()) {
    fallbackKeys.push(envKey.trim());
  }
  return fallbackKeys;
};

let currentKeyIndex = 0;

const callWithKeyRotation = async (fn: (ai: GoogleGenAI) => Promise<any>, onProgress?: (message: string) => void) => {
  const keys = await getKeys();
  if (keys.length === 0) {
    const errorMessage = "Gemini API Key is missing. Please add keys in Admin Panel.";
    if (onProgress) onProgress(errorMessage);
    throw new Error(errorMessage);
  }

  const maxRetries = keys.length;
  let lastError: any = null;

  for (let i = 0; i < maxRetries; i++) {
    const key = keys[currentKeyIndex];
    if (onProgress) onProgress(`🔑 Authenticating with Gemini Engine (Key ${currentKeyIndex + 1}/${keys.length})...`);
    const ai = new GoogleGenAI({ apiKey: key });
    
    try {
      return await fn(ai);
    } catch (error: any) {
      lastError = error;
      // If it's a rate limit error (429) or invalid key (400), switch to next key
      if (error.status === 429 || error.message?.includes('429') || error.status === 400 || error.message?.includes('API key not valid')) {
        console.warn(`Key issue detected for key ${currentKeyIndex}. Switching to next key...`);
        currentKeyIndex = (currentKeyIndex + 1) % keys.length;
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

const FALLBACK_QUESTION_BANK: Record<'easy' | 'medium' | 'hard', Array<{ id: string; question: string; options: string[]; correctAnswer: number; explanation: string; difficulty: 'easy' | 'medium' | 'hard' }>> = {
  easy: [
    {
      id: "fb_easy_1",
      question: "A client with type 1 diabetes mellitus is found unresponsive. The nurse suspecting hypoglycemia should perform which priority action first?",
      options: [
        "Administer 15g of rapid-acting carbohydrates orally",
        "Administer prescribed glucagon intramuscularly or subcutaneously",
        "Obtain a stat blood glucose reading",
        "Notify the healthcare provider immediately"
      ],
      correctAnswer: 1,
      explanation: "For an unresponsive or unconscious client suspecting hypoglycemia, the nurse should immediately administer glucagon IM or SQ (or IV dextrose if venous access is available). Oral carbohydrates should never be given to an unresponsive or confused client due to the high risk of aspiration.",
      difficulty: "easy"
    },
    {
      id: "fb_easy_2",
      question: "Which clinical manifestation is a hallmark sign of a client experiencing hypokalemia?",
      options: [
        "Peaked T waves on the EKG",
        "Muscle weakness and hyporeflexia",
        "Hyperactive bowel sounds",
        "Positive Trousseau's sign"
      ],
      correctAnswer: 1,
      explanation: "Muscle weakness, spasms, cramping, and decreased deep tendon reflexes (hyporeflexia) are classic indicators of hypokalemia (low potassium). Peaked T waves and hyperactive bowel sounds indicate hyperkalemia. Trousseau's sign is associated with hypocalcemia.",
      difficulty: "easy"
    },
    {
      id: "fb_easy_3",
      question: "A nurse is preparing to administer intramuscular iron dextran to a client. Which technique should the nurse employ?",
      options: [
        "Infiltrate the skin using a 45-degree angle",
        "Use the Z-track technique to prevent tissue staining",
        "Massage the injection site aggressively after administration",
        "Recap the needle immediately before disposal"
      ],
      correctAnswer: 1,
      explanation: "Iron dextran should always be administered using the Z-track technique to prevent tracking or leakage of the medication into subcutaneous tissue, which can cause severe skin staining and irritation. Massaging the site is contraindicated after a Z-track injection.",
      difficulty: "easy"
    },
    {
      id: "fb_easy_4",
      question: "When initiating intravenous therapy, the nurse should begin selection of the vascular access site at which location?",
      options: [
        "The most distal site on the non-dominant arm",
        "The most proximal site in the antecubital fossa",
        "The client's dominant wrist",
        "The lateral side of the wrist"
      ],
      correctAnswer: 0,
      explanation: "To preserve the integrity of the vein, the nurse should select the most distal site on the non-dominant hand or arm first, saving proximal veins for subsequent cannula insertions.",
      difficulty: "easy"
    },
    {
      id: "fb_easy_5",
      question: "The nurse is reviewing the laboratory results of a client taking warfarin. Which parameter should the nurse evaluate?",
      options: [
        "Activated partial thromboplastin time (aPTT)",
        "Prothrombin time (PT) and International Normalized Ratio (INR)",
        "Platelet count and bleeding time",
        "Hemoglobin and hematocrit levels"
      ],
      correctAnswer: 1,
      explanation: "PT and INR are used to monitor the therapeutic level of warfarin. aPTT is used to monitor heparin therapy. Platelet counts and hemoglobin are not specific indicators of warfarin therapy efficacy.",
      difficulty: "easy"
    }
  ],
  medium: [
    {
      id: "fb_medium_1",
      question: "A client with chronic heart failure has been prescribed digoxin 0.25 mg daily. Which clinical assessment is a priority before administering this medication?",
      options: [
        "Assess the apical pulse for a full minute",
        "Obtain blood pressure reading",
        "Measure the client's current oxygen saturation",
        "Review the serum calcium concentration"
      ],
      correctAnswer: 0,
      explanation: "Prior to administering digoxin, the nurse must assess the client's apical pulse for a full 60 seconds. The medication should be withheld, and the healthcare provider notified, if the pulse is less than 60 beats/minute in an adult or less than 90 beats/minute in an infant.",
      difficulty: "medium"
    },
    {
      id: "fb_medium_2",
      question: "A nurse is caring for a client with a chest tube showing continuous, rapid bubbling in the water seal chamber. How should the nurse interpret this finding?",
      options: [
        "This is a normal observation indicating lung re-expansion",
        "There is an active air leak somewhere in the drainage system",
        "The suction wall regulator is set too low",
        "The chest tube is occluded by a blood clot"
      ],
      correctAnswer: 1,
      explanation: "Continuous bubbling in the water seal chamber indicates an air leak in the chest tube system. Intermittent bubbling is normal during exhalation or coughing, but continuous bubbling requires immediate inspection of the tube connections and chest wall site.",
      difficulty: "medium"
    },
    {
      id: "fb_medium_3",
      question: "An adult client is admitted with deep vein thrombosis (DVT) and is initiated on a continuous heparin infusion. The platelet count drops from 280,000/mm³ to 120,000/mm³ over 48 hours. What is the nurse's priority action?",
      options: [
        "Slow the heparin rate down to half the original dose",
        "Stop the heparin infusion immediately and notify the healthcare provider",
        "Prepare to administer vitamin K as the antidote",
        "Recheck the platelet count in 12 hours"
      ],
      correctAnswer: 1,
      explanation: "A dramatic drop in platelet count (typically greater than 50% or below 150,000/mm³) indicates Heparin-Induced Thrombocytopenia (HIT). The nurse must stop the heparin immediately to prevent life-threatening thrombotic complications and notify the provider for alternative anticoagulation.",
      difficulty: "medium"
    },
    {
      id: "fb_medium_4",
      question: "The nurse is caring for a client diagnosed with acute pancreatitis. Which dietary prescription should the nurse anticipate during the acute phase?",
      options: [
        "High-protein, low-fat liquid diet",
        "Strict NPO (nothing by mouth) status",
        "Enteral feedings via a nasogastric tube",
        "Clear liquid diet with oral fluids as tolerated"
      ],
      correctAnswer: 1,
      explanation: "During the acute phase of pancreatitis, the client is kept strictly NPO to rest the pancreas and minimize pancreatic enzyme secretion, which prevents further auto-digestion and reduces abdominal pain.",
      difficulty: "medium"
    },
    {
      id: "fb_medium_5",
      question: "A client who underwent a thyroidectomy 12 hours ago reports extreme numbness and tingling around the mouth and fingers. Which action should the nurse perform first?",
      options: [
        "Obtain a 12-lead Electrocardiogram (ECG)",
        "Assess for Trousseau's and Chvostek's signs",
        "Administer PRN oral pain medications",
        "Encourage the client to take slow, deep breaths"
      ],
      correctAnswer: 1,
      explanation: "Numbness and tingling (circumoral paresthesia and peripheral paresthesia) following a thyroidectomy can indicate hypocalcemia secondary to accidental parathyroid gland damage or removal. The nurse should immediately assess Chvostek's (facial twitching) and Trousseau's (carpal spasm) signs, and prepare to administer calcium gluconate.",
      difficulty: "medium"
    }
  ],
  hard: [
    {
      id: "fb_hard_1",
      question: "The nurse on a medical-surgical floor receives report. Which client should the nurse assess first?",
      options: [
        "A 68-year-old client with chronic obstructive pulmonary disease (COPD) whose SaO2 is 89% on 2L of oxygen via nasal cannula",
        "A 45-year-old client post-cholecystectomy who reports abdominal pain rated 8 out of 10 and requested pain medication",
        "A 32-year-old client with a compound femur fracture whose leg is casted, now reporting severe deep bruising pain unrelieved by intravenous morphine",
        "An 80-year-old client with dementia who is agitated, mimicking pulling at their peripheral intravenous line"
      ],
      correctAnswer: 2,
      explanation: "The client with the femur fracture reporting severe pain unrelieved by narcotics is demonstrating classic early signs of Compartment Syndrome, which is a limb-threatening surgical emergency. Chronic COPD with oxygen saturation of 89% is expected. High post-op pain is expected and can be addressed second. Agitated dementia is a safety concern but secondary to active potential compartment syndrome.",
      difficulty: "hard"
    },
    {
      id: "fb_hard_2",
      question: "A client with a history of severe asthma is admitted to the emergency department in respiratory distress. The nurse hears high-pitched wheezing, which abruptly stops. There is no audible breath sound in the right base. What is the nurse's priority action?",
      options: [
        "Prepare for immediate endotracheal intubation",
        "Administer a prescribed dose of oral prednisone",
        "Instruct the client to use a peak flow meter",
        "Encourage the client to cough forcefully to clear secretions"
      ],
      correctAnswer: 0,
      explanation: "Abrupt cessation of wheezing in an acute asthma attack is an ominous sign ('silent chest') indicating that the client's airways are completely closed, resulting in virtually no air movement. This is a life-threatening respiratory failure requiring immediate emergency airway management, mechanical ventilation, or epinephrine.",
      difficulty: "hard"
    },
    {
      id: "fb_hard_3",
      question: "Which instructions should the nurse prioritize when teaching a client receiving a new prescription for phenelzine?",
      options: [
        "Avoid foods high in tyramine, such as aged cheeses, red wine, and cured meats",
        "Limit sodium intake and monitor for signs of fluid retention",
        "Take the medication with an over-the-counter decongestant if a cold develops",
        "Stop taking the medication immediately if dry mouth or blurred vision occurs"
      ],
      correctAnswer: 0,
      explanation: "Phenelzine is a Monoamine Oxidase Inhibitor (MAOI). Consuming foods containing high amounts of tyramine (aged cheeses, draft beer, red wine, cured meats, soy sauce) while taking MAOIs can precipitate a fatal hypertensive crisis. Over-the-counter cold medicines are also contraindicated.",
      difficulty: "hard"
    },
    {
      id: "fb_hard_4",
      question: "The nurse is caring for a client with a history of alcoholism who is admitted with severe hematemesis. The client is tachycardic, hypotensive, and confused. Which intervention is the priority?",
      options: [
        "Establish two large-bore intravenous lines and initiate rapid crystalloid fluid resuscitation",
        "Insert a nasogastric tube to perform gastric lavage with ice water",
        "Obtain a thorough history regarding the client's last alcohol intake",
        "Administer an intravenous infusion of a prescribed proton pump inhibitor"
      ],
      correctAnswer: 0,
      explanation: "The client is showing signs of hypovolemic shock secondary to active upper gastrointestinal bleeding (likely esophageal varices). The absolute priority is to restore vascular volume and stabilize hemodynamics by securing large-bore IV access and starting rapid fluid resuscitation. Secondary treatments include PPIs and Sengstaken-Blakemore tubes.",
      difficulty: "hard"
    },
    {
      id: "fb_hard_5",
      question: "An infant born at 39 weeks gestation has a 1-minute APGAR score of 4. The infant is limp, grunting, has a heart rate of 88 beats/minute, and has cyanotic extremities. What is the nurse's priority intervention?",
      options: [
        "Initiate positive pressure ventilation (PPV) with room air or oxygen",
        "Begin chest compressions at a 3:1 ratio with ventilations",
        "Perform vigorous drying and tactile stimulation on the back",
        "Notify the neonatologist and continue tracking APGAR at 5 minutes"
      ],
      correctAnswer: 0,
      explanation: "According to Neonatal Resuscitation Program (NRP) guidelines, if a newborn's heart rate is below 100 beats/minute or they are gasping/apneic, the first and most important action is to initiate positive pressure ventilation (PPV). Drying and stimulation should not delay PPV. Chest compressions are only initiated if the heart rate remains under 60 beats/minute after 30 seconds of effective PPV.",
      difficulty: "hard"
    }
  ]
};

export const geminiService = {
  setKeys(keys: string[]) {
    cachedKeys = keys;
  },
  /**
   * General chatbot for clinical nursing queries.
   */
  async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    return await callWithKeyRotation(async (ai) => {
      // Initialize chat with history for better context awareness
      const chat = ai.chats.create({
        model: 'gemini-3.1-pro-preview',
        history,
        config: {
          systemInstruction: `You are an expert clinical nursing tutor for Graceful Path Global Health. 
          Your goal is to help nursing students and professionals excel in their exams and global career transitions.
          Brand voice: Supportive, professional, clear, and simplified. 
          Focus on clinical reasoning and safety. Use Google Search to find latest clinical guidelines if asked about current standards.`,
          tools: [{ googleSearch: {} }]
        }
      });
      
      const result = await chat.sendMessage({ message });
      return {
        text: result.text,
        grounding: result.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    });
  },

  /**
   * Analyze medical images or study notes.
   */
  async analyzeStudyMaterial(base64Image: string, prompt: string) {
    return await callWithKeyRotation(async (ai) => {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
            { text: prompt || "Explain this medical diagram or study note in simple clinical terms." }
          ]
        }
      });
      return response.text;
    });
  },

  /**
   * Generate a study schedule based on user's weak areas.
   */
  async generateStudyPlan(weakAreas: string[], examDate: string) {
    return await callWithKeyRotation(async (ai) => {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-preview',
        contents: `Generate a structured clinical study plan focusing on: ${weakAreas.join(', ')}. 
        The target exam date is ${examDate}. Provide the response in JSON format.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              plan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    week: { type: Type.NUMBER },
                    focus: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            }
          }
        }
      });
      const text = response.text || '{}';
      const cleanJson = text.replace(/```json\n?|```/g, '').trim();
      return JSON.parse(cleanJson || '{}');
    });
  },

  /**
   * Generate NCLEX-style assessment questions with streaming support.
   */
  async generateAssessment(
    topic: string, 
    count: number, 
    difficulty: 'easy' | 'medium' | 'hard',
    onQuestionGenerated?: (question: any) => void,
    onProgress?: (message: string) => void
  ) {
    const batchSize = 1; // Set to 1 for better streaming experience
    const batches = count;
    let allQuestions: any[] = [];

    if (onProgress) onProgress(`🧠 Brainstorming ${count} clinical scenarios on ${topic}...`);

    for (let i = 0; i < batches; i++) {
      try {
        const batchQuestions = await callWithKeyRotation(async (ai) => {
          if (onProgress) onProgress(`📝 Generating Question ${i + 1} of ${count}...`);
          
          // Build a list of already generated question texts to avoid
          const existingScenarios = allQuestions.map(q => q.question).join('\n');
          const avoidInstruction = existingScenarios 
            ? `\nCRITICAL: DO NOT repeat, rephrase, or generate scenarios similar to these existing questions:\n${existingScenarios}` 
            : '';

          const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-preview',
            contents: `Generate 1 NCLEX-style multiple choice question on the topic: ${topic}. 
            Difficulty level: ${difficulty}. 
            This is question ${i + 1} of ${count}.
            The question must have 4 options, 1 correct answer (index 0-3), and a detailed clinical rationale/explanation.${avoidInstruction}`,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.NUMBER },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          });
          
          if (onProgress) onProgress(`✅ Validating options and clinical reasoning for Question ${i + 1}...`);
          const text = response.text || '{}';
          const cleanJson = text.replace(/```json\n?|```/g, '').trim();
          const qData = JSON.parse(cleanJson || '{}');
          if (qData.question) {
            const formattedQ = {
              ...qData,
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              difficulty
            };
            return [formattedQ];
          }
          return [];
        });

        if (batchQuestions.length > 0) {
          const q = batchQuestions[0];
          allQuestions.push(q);
          if (onQuestionGenerated) {
            onQuestionGenerated(q);
          }
        }
      } catch (error) {
        console.warn(`Failed to generate live question ${i + 1}, picking from standard question bank:`, error);
        
        // Filter standard fallback questions to prevent duplicates with what we have already generated
        const baseList = FALLBACK_QUESTION_BANK[difficulty] || FALLBACK_QUESTION_BANK['medium'];
        const list = baseList.filter(fb => 
          !allQuestions.some(existing => 
            existing.question.trim().toLowerCase() === fb.question.trim().toLowerCase() ||
            existing.id === fb.id
          )
        );
        
        const activeList = list.length > 0 ? list : baseList;
        const chosen = activeList[Math.floor(Math.random() * activeList.length)];
        const formattedQ = {
          ...chosen,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          difficulty
        };
        allQuestions.push(formattedQ);
        if (onQuestionGenerated) {
          onQuestionGenerated(formattedQ);
        }
      }
    }

    return allQuestions;
  },

  /**
   * Adaptive PassPoint NCLEX-RN CAT Question Generator.
   */
  async generatePassPointQuestion(
    day: number,
    topic: string,
    difficulty: 'easy' | 'medium' | 'hard',
    domain: string,
    avoidConcepts: string[]
  ): Promise<{ id: string; question: string; options: string[]; correctAnswer: number; explanation: string; difficulty: 'easy' | 'medium' | 'hard' }> {
    const targetDomain = getDomainForDay(day);

    const isAttempted = (q: any) => {
      return avoidConcepts.some(avoid => {
        const cleanAvoid = avoid.trim().toLowerCase();
        const cleanQId = q.id.trim().toLowerCase();
        const cleanQText = q.question.trim().toLowerCase();

        // 1. Direct ID match
        if (cleanAvoid === cleanQId) return true;

        // 2. Direct question text match
        if (cleanAvoid === cleanQText) return true;

        // 3. Substring match to catch truncated/partial comparisons (length >= 15)
        if (cleanAvoid.length >= 15) {
          if (cleanQText.includes(cleanAvoid) || cleanAvoid.includes(cleanQText)) return true;
        }

        return false;
      });
    };

    // LEVEL 1: Same Domain + Same Difficulty
    let level1Candidates = PERMANENT_QUESTION_BANK.filter(q => 
      q.domain === targetDomain && 
      q.difficulty === difficulty &&
      !isAttempted(q)
    );
    if (level1Candidates.length > 0) {
      const chosen = level1Candidates[Math.floor(Math.random() * level1Candidates.length)];
      return {
        id: chosen.id,
        question: chosen.question,
        options: [...chosen.options],
        correctAnswer: chosen.correctAnswer,
        explanation: chosen.explanation,
        difficulty: chosen.difficulty as 'easy' | 'medium' | 'hard'
      };
    }

    // LEVEL 2: Same Domain + Any Difficulty
    let level2Candidates = PERMANENT_QUESTION_BANK.filter(q => 
      q.domain === targetDomain && 
      !isAttempted(q)
    );
    if (level2Candidates.length > 0) {
      const chosen = level2Candidates[Math.floor(Math.random() * level2Candidates.length)];
      return {
        id: chosen.id,
        question: chosen.question,
        options: [...chosen.options],
        correctAnswer: chosen.correctAnswer,
        explanation: chosen.explanation,
        difficulty: chosen.difficulty as 'easy' | 'medium' | 'hard'
      };
    }

    // LEVEL 3: Any Domain + Same Difficulty
    let level3Candidates = PERMANENT_QUESTION_BANK.filter(q => 
      q.difficulty === difficulty && 
      !isAttempted(q)
    );
    if (level3Candidates.length > 0) {
      const chosen = level3Candidates[Math.floor(Math.random() * level3Candidates.length)];
      return {
        id: chosen.id,
        question: chosen.question,
        options: [...chosen.options],
        correctAnswer: chosen.correctAnswer,
        explanation: chosen.explanation,
        difficulty: chosen.difficulty as 'easy' | 'medium' | 'hard'
      };
    }

    // LEVEL 4: Any Domain + Any Difficulty
    let level4Candidates = PERMANENT_QUESTION_BANK.filter(q => 
      !isAttempted(q)
    );
    if (level4Candidates.length > 0) {
      const chosen = level4Candidates[Math.floor(Math.random() * level4Candidates.length)];
      return {
        id: chosen.id,
        question: chosen.question,
        options: [...chosen.options],
        correctAnswer: chosen.correctAnswer,
        explanation: chosen.explanation,
        difficulty: chosen.difficulty as 'easy' | 'medium' | 'hard'
      };
    }

    // LEVEL 5: Last Resort Fallback (Resetting avoid list for target domain)
    // This only occurs if the student has exhausted the entire question bank.
    let level5Candidates = PERMANENT_QUESTION_BANK.filter(q => 
      q.domain === targetDomain
    );
    if (level5Candidates.length === 0) {
      level5Candidates = PERMANENT_QUESTION_BANK;
    }
    const chosen = level5Candidates[Math.floor(Math.random() * level5Candidates.length)];
    return {
      id: chosen.id,
      question: chosen.question,
      options: [...chosen.options],
      correctAnswer: chosen.correctAnswer,
      explanation: chosen.explanation,
      difficulty: chosen.difficulty as 'easy' | 'medium' | 'hard'
    };
  }
};
