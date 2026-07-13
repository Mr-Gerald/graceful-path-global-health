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
export function generateDynamicQuestion(day: number, difficulty: 'easy' | 'medium' | 'hard', avoidConcepts: string[] = []): NCLEXQuestion {
  const filtered = PERMANENT_QUESTION_BANK.filter(q => q.difficulty === difficulty);
  const candidates = filtered.length > 0 ? filtered : PERMANENT_QUESTION_BANK;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

// Pre-defined static NCLEX practice exams preloaded with curated questions from our static question bank
export const DEFAULT_PRACTICE_TESTS = [
  {
    id: "comprehensive_diagnostic",
    title: "NCLEX-RN Comprehensive Diagnostic Exam",
    duration: 120, // 2 hours
    difficulty: "medium",
    questions: ALL_STATIC_DAY_QUESTIONS.slice(0, 50)
  },
  {
    id: "pharmacology_sprint",
    title: "Pharmacological & Parenteral Therapies Sprint",
    duration: 60, // 1 hour
    difficulty: "hard",
    questions: ALL_STATIC_DAY_QUESTIONS.filter(q => q.domain.includes("Pharmacological")).slice(0, 30)
  },
  {
    id: "management_of_care",
    title: "Safe & Effective Care: Management of Care Challenge",
    duration: 45, // 45 minutes
    difficulty: "easy",
    questions: ALL_STATIC_DAY_QUESTIONS.filter(q => q.domain.includes("Management")).slice(0, 25)
  }
];

