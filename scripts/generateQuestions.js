import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";
import path from "path";

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY environment variable is missing!");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const getDomainForDay = (day) => {
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
  return "Physiological Adaptation";
};

// Helper for retrying API calls with progressive backoff and 429 quota waiting
async function callWithRetry(fn, retries = 5, delay = 15000) {
  try {
    return await fn();
  } catch (error) {
    const errorStr = error.message || String(error);
    const isRateLimit = errorStr.includes("429") || errorStr.toLowerCase().includes("quota") || errorStr.toLowerCase().includes("resource_exhausted");
    
    if (retries <= 0) throw error;
    
    const waitTime = isRateLimit ? 65000 : delay; // Wait a full minute on 429 rate limit
    console.warn(`[API Warning] ${isRateLimit ? 'Rate limit (429) hit' : 'Error occurred'}. Retrying in ${waitTime / 1000}s... (Retries left: ${retries})`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return callWithRetry(fn, retries - 1, delay * 1.5);
  }
}

async function generateDayQuestions(day, domain) {
  const prompt = `Generate exactly 50 highly realistic, clinical-grade NCLEX-RN style multiple-choice questions for Curriculum Day ${day}.
The subject domain is: "${domain}".
These must be totally custom, realistic clinical scenarios with NO placeholder names or generic texts. Include high-quality options, a 0-indexed correctAnswer (0, 1, 2, or 3), and a thorough nursing rationale (explanation) explaining the correct option and why the others are wrong.

Ensure:
- Difficulty distribution: 15 easy, 20 medium, 15 hard.
- Questions are labeled as 'easy', 'medium', or 'hard' exactly.
- Each question has a unique ID following: "day_${day}_q_X" (where X goes from 1 to 50).
- High clinical accuracy: use realistic vitals, lab values, and safety priorities (airway/breathing/circulation, Maslow's, safety/risk reduction).
- NO duplicates. Let's make every single question unique, detailed, and rich.`;

  console.log(`Generating all 50 questions for Day ${day} (Domain: ${domain})...`);

  const response = await callWithRetry(() => ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER, description: "0-indexed index of correct answer in the options array" },
            explanation: { type: Type.STRING },
            difficulty: { type: Type.STRING, description: "easy, medium, or hard" },
            domain: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswer", "explanation", "difficulty", "domain"]
        }
      }
    }
  }));

  try {
    const questions = JSON.parse(response.text.trim());
    if (!Array.isArray(questions) || questions.length !== 50) {
      throw new Error(`Expected exactly 50 questions, but got ${questions ? questions.length : 0}`);
    }
    return questions;
  } catch (err) {
    console.error("Failed to parse or validate JSON response:", err);
    console.log("Raw Response was length:", response.text ? response.text.length : 0);
    throw err;
  }
}

async function main() {
  const outputDir = path.resolve("services/questionBank");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Starting static question bank generation for all 30 days (1,500 questions)...");

  for (let day = 1; day <= 30; day++) {
    const filePath = path.join(outputDir, `day${day}.ts`);
    if (fs.existsSync(filePath)) {
      console.log(`Day ${day} questions file already exists. Skipping.`);
      continue;
    }

    const domain = getDomainForDay(day);
    try {
      const questions = await generateDayQuestions(day, domain);

      const fileContent = `import { NCLEXQuestion } from "../questionBank";

export const DAY_${day}_QUESTIONS: NCLEXQuestion[] = ${JSON.stringify(questions, null, 2)};
`;

      fs.writeFileSync(filePath, fileContent, "utf-8");
      console.log(`Successfully wrote Day ${day} questions static file (${questions.length} questions).`);

      // Sleep 15 seconds to stay strictly below the 5 RPM rate limit
      console.log("Sleeping 15 seconds to respect rate limits...");
      await new Promise(resolve => setTimeout(resolve, 15000));
    } catch (error) {
      console.error(`Fatal error on Day ${day}:`, error);
      process.exit(1);
    }
  }

  // Create registry file
  console.log("Creating services/questionBank/registry.ts...");
  let imports = "";
  let exportsList = "";
  for (let d = 1; d <= 30; d++) {
    imports += `import { DAY_${d}_QUESTIONS } from "./day${d}";\n`;
    exportsList += `  ...DAY_${d}_QUESTIONS,\n`;
  }

  const registryContent = `import { NCLEXQuestion } from "../questionBank";
${imports}
export const ALL_STATIC_DAY_QUESTIONS: NCLEXQuestion[] = [
${exportsList}];
`;

  fs.writeFileSync(path.join(outputDir, "registry.ts"), registryContent, "utf-8");
  console.log("Registry created successfully!");
  console.log("Static question generation complete!");
}

main();
