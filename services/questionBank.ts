import { ALL_STATIC_DAY_QUESTIONS } from "./questionBank/registry";

export interface NCLEXQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  domain: string;
}

// 100% static, pre-compiled, offline-safe database of 1,500 questions (50 distinct questions per day for 30 days)
export const PERMANENT_QUESTION_BANK: NCLEXQuestion[] = ALL_STATIC_DAY_QUESTIONS;

export function getDomainForDay(day: number): string {
  if ([1, 21, 22, 27, 29].includes(day)) {
    return "Safe and Effective Care Environment - Management of Care";
  }
  if ([2, 17, 25].includes(day)) {
    return "Pharmacological and Parenteral Therapies";
  }
  if ([6, 7, 20].includes(day)) {
    return "Health Promotion and Maintenance";
  }
  if ([8].includes(day)) {
    return "Psychosocial Integrity";
  }
  if ([11, 15].includes(day)) {
    return "Basic Care and Comfort";
  }
  if ([13, 14, 23].includes(day)) {
    return "Safe and Effective Care Environment - Safety and Infection Control";
  }
  if ([12, 24, 26].includes(day)) {
    return "Reduction of Risk Potential";
  }
  // Default to Physiological Adaptation for other days
  return "Physiological Adaptation";
}

// Offline-safe fallback in the extreme edge case of pool exhaustion (e.g., student attempting more than 50 questions in a day)
export function isHighlySimilar(str1: string, str2: string): boolean {
  const clean1 = str1.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
  const clean2 = str2.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
  
  const words1 = clean1.split(/\s+/).filter(w => w.length > 2);
  const words2 = clean2.split(/\s+/).filter(w => w.length > 2);
  
  if (words1.length === 0 || words2.length === 0) return false;
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  let intersectCount = 0;
  for (const w of set1) {
    if (set2.has(w)) {
      intersectCount++;
    }
  }
  
  const similarity = intersectCount / Math.min(set1.size, set2.size);
  return similarity > 0.65;
}

export function getDiverseStaticQuestions(
  count: number,
  options?: { difficulty?: 'easy' | 'medium' | 'hard'; domain?: string }
): NCLEXQuestion[] {
  const candidates = [...ALL_STATIC_DAY_QUESTIONS];
  
  // Deterministic pseudo-random seed shuffle to guarantee stable but highly diverse order without performance jitter
  let seed = 42;
  const randomSeed = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(randomSeed() * (i + 1));
    const temp = candidates[i];
    candidates[i] = candidates[j];
    candidates[j] = temp;
  }

  const selected: NCLEXQuestion[] = [];

  for (const q of candidates) {
    if (selected.length >= count) break;

    if (options?.difficulty && q.difficulty !== options.difficulty) {
      continue;
    }

    if (options?.domain && q.domain !== options.domain) {
      continue;
    }

    // Check high similarity
    const isSimilarToAnySelected = selected.some(sel => 
      isHighlySimilar(sel.question, q.question)
    );

    if (!isSimilarToAnySelected) {
      selected.push(q);
    }
  }

  // Fallback to fill up if strict diversity filter is too selective
  if (selected.length < count) {
    for (const q of candidates) {
      if (selected.length >= count) break;
      if (options?.difficulty && q.difficulty !== options.difficulty) continue;
      if (options?.domain && q.domain !== options.domain) continue;
      
      if (!selected.some(sel => sel.id === q.id)) {
        selected.push(q);
      }
    }
  }

  return selected;
}

export function generateDynamicQuestion(day: number, difficulty: 'easy' | 'medium' | 'hard', avoidConcepts: string[] = []): NCLEXQuestion {
  const isAttempted = (q: any) => {
    if (!avoidConcepts || avoidConcepts.length === 0) return false;
    return avoidConcepts.some(avoid => {
      if (!avoid) return false;
      const cleanAvoid = avoid.trim().toLowerCase();
      const cleanQId = q.id.trim().toLowerCase();
      const cleanQText = q.question.trim().toLowerCase();
      
      if (cleanAvoid === cleanQId || cleanAvoid === cleanQText) return true;
      if (cleanAvoid.length >= 15 && (cleanQText.includes(cleanAvoid) || cleanAvoid.includes(cleanQText))) return true;
      
      // Also prevent similarity matching
      return isHighlySimilar(cleanAvoid, cleanQText);
    });
  };

  const filtered = PERMANENT_QUESTION_BANK.filter(q => q.difficulty === difficulty && !isAttempted(q));
  const candidates = filtered.length > 0 ? filtered : PERMANENT_QUESTION_BANK.filter(q => !isAttempted(q));
  const activeCandidates = candidates.length > 0 ? candidates : PERMANENT_QUESTION_BANK;
  const randomIndex = Math.floor(Math.random() * activeCandidates.length);
  return activeCandidates[randomIndex];
}

// Pre-defined static NCLEX practice exams preloaded with curated questions from our static question bank
export const DEFAULT_PRACTICE_TESTS = [
  {
    id: "comprehensive_diagnostic",
    title: "NCLEX-RN Comprehensive Diagnostic Exam",
    duration: 120, // 2 hours
    difficulty: "medium",
    questions: getDiverseStaticQuestions(50)
  },
  {
    id: "pharmacology_sprint",
    title: "Pharmacological & Parenteral Therapies Sprint",
    duration: 60, // 1 hour
    difficulty: "hard",
    questions: getDiverseStaticQuestions(30, { difficulty: 'hard', domain: 'Pharmacological and Parenteral Therapies' })
  },
  {
    id: "management_of_care",
    title: "Safe & Effective Care: Management of Care Challenge",
    duration: 45, // 45 minutes
    difficulty: "easy",
    questions: getDiverseStaticQuestions(25, { difficulty: 'easy', domain: 'Safe and Effective Care Environment - Management of Care' })
  }
];

