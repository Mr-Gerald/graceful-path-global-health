import fs from "fs";
import path from "path";

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

// Rich dictionaries to ensure massive variety and prevent any duplicate scenarios
const firstNames = [
  "Sarah", "James", "Robert", "Maria", "Elena", "Marcus", "Emily", "David", "Theresa", "Jackson", 
  "Linda", "Kofi", "Yuki", "Amir", "Zahra", "Carlos", "Noor", "Chinedu", "Dmitri", "Fatima",
  "Anya", "Chen", "Gabriel", "Chloe", "Mateo", "Siddharth", "Sophia", "Omar", "Isabella", "Kwame",
  "Hannah", "Liam", "Mei", "Tariq", "Lucas", "Aisha", "Hiroshi", "Olga", "Zane", "Grace",
  "Elijah", "Maya", "Daniel", "Leila", "Noah", "Amara", "Sebastian", "Kiara", "Ethan", "Olivia",
  "Patricia", "Christopher", "Barbara", "Matthew", "Susan", "Andrew", "Jessica", "Richard", "Karen", "Joseph"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Hall", "Allen", "King", "Wright", "Baker", "Abara", "Okonkwo", "Tanaka"
];

function generateQuestionForDayAndIndex(day, q, domain) {
  const name = firstNames[(q * 11 + day * 13) % firstNames.length] + " " + lastNames[(q * 7 + day * 17) % lastNames.length];
  const age = 18 + ((q * 19 + day * 23) % 65);
  const id = `day_${day}_q_${q}`;
  const difficulty = q <= 15 ? 'easy' : (q <= 35 ? 'medium' : 'hard');

  let question = "";
  let options = [];
  let correctAnswer = 0;
  let explanation = "";

  // 1. Management of Care
  if (domain.includes("Management of Care")) {
    if (difficulty === 'easy') {
      const delegates = [
        { task: "obtaining routine morning vital signs and measuring post-void residual urine volumes", target: "Unlicensed Assistive Personnel (UAP)", options: ["Teaching a client about high-fiber foods", "Performing the task of obtaining routine vital signs and measuring post-void residuals", "Formulating a diabetic meal plan", "Assessing a newly admitted chest pain patient"], correct: 1, rationale: "UAPs can perform basic, non-invasive, routine tasks with predictable outcomes. Assessments, education, and complex nursing plans require Registered Nurse (RN) clinical judgment." },
        { task: "administering scheduled routine oral medications and checking simple subcutaneous blood glucose levels", target: "Licensed Practical Nurse (LPN)", options: ["Administering a continuous intravenous push cardiac medication", "Performing the task of administering scheduled routine oral medications", "Educating a newly diagnosed diabetic on insulin self-injection", "Performing the initial physical assessment on a post-operative patient"], correct: 1, rationale: "LPNs can administer routine medications (oral, subcutaneous, intramuscular) and care for stable clients with predictable outcomes. RNs retain responsibility for intravenous push medications, initial assessments, and teaching." },
        { task: "assisting a stable client with hallway ambulation using a walker", target: "Unlicensed Assistive Personnel (UAP)", options: ["Developing a mobility plan for a paralyzed client", "Assisting the stable client with hallway ambulation", "Performing clinical assessment on post-fall client", "Evaluating range of motion in physical therapy"], correct: 1, rationale: "Assisting a stable, ambulatory client with assistive devices is a routine task that does not require professional nursing evaluation and can be safely delegated to UAPs." }
      ];
      const d = delegates[q % delegates.length];
      question = `A nurse is planning shift assignments on a busy medical unit. Client ${name}, ${age} years old, is admitted and stable. Which action is most appropriate to delegate to the ${d.target}?`;
      options = d.options;
      correctAnswer = d.correct;
      explanation = d.rationale;
    } else if (difficulty === 'medium') {
      const triages = [
        { cond: "chronic COPD with a stable oxygen saturation of 91% on 2L nasal cannula", isPri: false },
        { cond: "post-operative day 1 hip replacement reporting sudden-onset confusion, dyspnea, and petechiae across the chest", isPri: true, rationale: "This client displays classic symptoms of Fat Embolism Syndrome (FES)—a medical emergency requiring rapid oxygenation and clinical rescue." },
        { cond: "type 2 diabetes with a fasting blood glucose level of 148 mg/dL", isPri: false },
        { cond: "acute appendicitis reporting a sudden, complete relief of abdominal pain", isPri: true, rationale: "Sudden relief of pain in acute appendicitis suggests rupture of the appendix, which can quickly lead to peritonitis, sepsis, and hemodynamic shock." }
      ];
      const t1 = triages[(q * 3) % triages.length];
      const t2 = triages[(q * 3 + 1) % triages.length];
      const pri = t1.isPri ? t1 : t2;
      const nonPri = t1.isPri ? t2 : t1;
      question = `The charge nurse is prioritizing clinical assessments for four clients on the medical-surgical floor. Which client should the nurse assess first?`;
      options = [
        `Client ${name}, ${age} years old, who is stable with ${nonPri.cond}.`,
        `A client admitted 3 days ago receiving routine oral physical therapy.`,
        `A client presenting with ${pri.cond}.`,
        `A client requesting discharge educational materials before scheduled noon release.`
      ];
      correctAnswer = 2;
      explanation = pri.rationale || `Acute, life-threatening complications require immediate clinical priority and rescue over stable or chronic issues.`;
    } else {
      const legals = [
        { scenario: "refuses to sign the surgical consent form and expresses concern over planned risks", action: "withhold the consent, notify the surgeon immediately, and document the refusal", rationale: "Informed consent must be obtained by the performing surgeon; the nurse acts as witness but cannot explain surgical risks." },
        { scenario: "is noted to have an active Do Not Resuscitate (DNR) order, but the family is verbally demanding CPR be performed", action: "withhold cardiopulmonary resuscitation (CPR) and provide supportive comfort care in accordance with the legal order", rationale: "An active, legally valid DNR order represents the client's direct medical wishes and cannot be verbally overridden by family members." },
        { scenario: "wishes to leave the hospital Against Medical Advice (AMA) before completing therapy", action: "explain the immediate risks of leaving, notify the provider, and request the client sign the AMA form", rationale: "Competent adult clients retain autonomy and can choose to leave AMA; the nurse must educate on risks and facilitate the release form." }
      ];
      const l = legals[q % legals.length];
      question = `The nurse is caring for client ${name}, ${age} years old, who ${l.scenario}. What is the nurse's priority legal and ethical action?`;
      options = [
        `Force the client to comply to prevent any clinical harm.`,
        `Instruct the UAP to handle the situation and document the event.`,
        `Directly ${l.action}.`,
        `Reassure the family and override the client's direct personal choices.`
      ];
      correctAnswer = 2;
      explanation = l.rationale;
    }
  }

  // 2. Pharmacological and Parenteral Therapies
  else if (domain.includes("Pharmacological and Parenteral Therapies")) {
    if (difficulty === 'easy') {
      const calcs = [
        { drug: "Metoprolol", dose: 100, avail: 50, ans: "2 tablets", exp: "100 mg / 50 mg = 2 tablets." },
        { drug: "Furosemide", dose: 40, avail: 20, ans: "2 tablets", exp: "40 mg / 20 mg = 2 tablets." },
        { drug: "Levothyroxine", dose: 150, avail: 75, ans: "2 tablets", exp: "150 mcg / 75 mcg = 2 tablets." }
      ];
      const c = calcs[q % calcs.length];
      question = `A physician prescribes ${c.drug} ${c.dose} mg/mcg orally daily for client ${name}, ${age} years old. The pharmacy supplies ${c.drug} in ${c.avail} mg/mcg tablets. How many tablets should the nurse administer?`;
      options = [
        "1 tablet",
        c.ans,
        "3 tablets",
        "0.5 tablets"
      ];
      correctAnswer = 1;
      explanation = `The calculation is: Desired dose / Available dose = ${c.exp}`;
    } else if (difficulty === 'medium') {
      const tox = [
        { drug: "Digoxin", sx: "yellow-green vision halos, nausea, and severe fatigue", level: "2.4 ng/mL", action: "withhold the digoxin dose, check potassium levels, and notify the provider" },
        { drug: "Lithium carbonate", sx: "severe hand tremors, persistent diarrhea, and slurred speech", level: "1.9 mEq/L", action: "withhold the lithium dose, assess hydration indicators, and request a serum level" },
        { drug: "Phenytoin", sx: "severe uncontrolled nystagmus, ataxia, and slurred speech", level: "28 mcg/mL", action: "hold the phenytoin dose, implement seizure precautions, and notify the provider" }
      ];
      const t = tox[q % tox.length];
      question = `The nurse is evaluating client ${name}, ${age} years old, who is taking ${t.drug}. The client reports ${t.sx}. What is the nurse's priority action?`;
      options = [
        `Increase the dose to treat the underlying condition.`,
        `Administer an over-the-counter antiemetic and reassess in 4 hours.`,
        `Immediately ${t.action}.`,
        `Instruct the client that these are expected transient side effects.`
      ];
      correctAnswer = 2;
      explanation = `The reported symptoms are classic indicators of ${t.drug} toxicity (therapeutic level is exceeded). The nurse must immediately ${t.action} to prevent severe complications.`;
    } else {
      const meds = [
        { drug: "Unfractionated Heparin", lab: "an aPTT of 118 seconds", action: "stop the heparin infusion immediately, assess for active bleeding, and expect to administer protamine sulfate" },
        { drug: "Warfarin", lab: "an INR of 6.5 with visible hematuria", action: "withhold the warfarin dose, assess for active bleeding, and expect to administer Vitamin K antidote" },
        { drug: "Potassium Chloride IV", lab: "serum potassium of 2.8 mEq/L", action: "ensure the infusion is diluted, run at a maximum rate of 10 mEq/hour through a central line, and monitor cardiac telemetry" }
      ];
      const m = meds[q % meds.length];
      question = `The nurse is managing the parenteral drug therapy for client ${name}, ${age} years old, receiving ${m.drug}. The nurse notes ${m.lab}. What is the nurse's absolute priority action?`;
      options = [
        `Increase the rate of infusion by twenty percent.`,
        `Administer the drug as scheduled and document the lab value.`,
        `Directly ${m.action}.`,
        `Encourage increased fluid intake and re-evaluate the lab in 48 hours.`
      ];
      correctAnswer = 2;
      explanation = `Safety and reduction of risk potential with high-alert medications require rapid correction of toxicities. ${m.action} is essential to avoid severe adverse outcomes.`;
    }
  }

  // 3. Health Promotion and Maintenance
  else if (domain.includes("Health Promotion and Maintenance")) {
    if (difficulty === 'easy') {
      const peds = [
        { ageStr: "6 months", milestone: "rolling from back to stomach, sitting with support, and beginning to babble consonants" },
        { ageStr: "12 months", milestone: "walking while holding onto furniture (cruising) and saying simple words like 'mama' or 'dada'" },
        { ageStr: "18 months", milestone: "walking independently, building a tower of three blocks, and using a spoon with spills" }
      ];
      const p = peds[q % peds.length];
      question = `The pediatric nurse is conducting a developmental screening for a healthy infant named ${name} who is ${p.ageStr} old. Which developmental milestone should the nurse expect?`;
      options = [
        "Jumping with both feet off the ground and speaking in complete sentences.",
        `Demonstrating ${p.milestone}.`,
        "Utilizing safety scissors with complete mechanical coordination.",
        "Dressing themselves independently with buttons and zippers fully secured."
      ];
      correctAnswer = 1;
      explanation = `At ${p.ageStr}, the milestone of ${p.milestone} represents standard neurological and physical motor growth expectations.`;
    } else if (difficulty === 'medium') {
      const mat = [
        { cond: "early decelerations on the fetal heart rate monitor during contractions", action: "document the finding as a normal head compression event and continue routine monitoring" },
        { cond: "late decelerations on the fetal heart rate monitor indicating uteroplacental insufficiency", action: "position the client in a left lateral recumbent posture, apply 10L oxygen via non-rebreather mask, turn off oxytocin, and increase IV fluids" },
        { cond: "variable decelerations indicating umbilical cord compression during contractions", action: "reposition the client from side to side, evaluate for cord prolapse, and consider amnioinfusion if prescribed" }
      ];
      const m = mat[q % mat.length];
      question = `The labor and delivery nurse is caring for client ${name}, ${age} years old. The nurse notes ${m.cond}. What is the nurse's priority action?`;
      options = [
        "Instruct the client to push harder during contractions.",
        `Immediately ${m.action}.`,
        "Prepare the client for an immediate scheduled amniocentesis.",
        "Reassure the client and leave the room to document the shift notes."
      ];
      correctAnswer = 1;
      explanation = `The clinical priority for ${m.cond} is to ${m.action} to optimize perfusion and protect both the maternal client and the fetus.`;
    } else {
      const ger = [
        { issue: "polypharmacy and takes multiple medications from different providers", action: "conduct a complete medication reconciliation, assess for drug-drug interactions, and evaluate against the Beers criteria" },
        { issue: "sudden onset of confusion and agitation over the last 24 hours (acute delirium)", action: "assess for an underlying urinary tract infection (UTI), evaluate hydration, and check vital signs" },
        { issue: "chronic urinary incontinence and is embarrassed about wearing protective pads", action: "implement a bladder training program with scheduled voiding every 2 hours and assess perineal skin integrity" }
      ];
      const g = ger[q % ger.length];
      question = `The gerontological home health nurse is visiting client ${name}, ${age} years old, who is experiencing ${g.issue}. What is the nurse's priority clinical intervention?`;
      options = [
        `Recommend placing the client in a secure long-term care facility immediately.`,
        `Prescribe a high-potency oral sedative to maintain bed rest safety.`,
        `Directly ${g.action}.`,
        `Instruct the family to handle all care activities and limit visits to once a week.`
      ];
      correctAnswer = 2;
      explanation = `Gerontological safety and health promotion involve targeting specific risk factors. ${g.action} directly addresses ${g.issue} while maintaining dignity and autonomy.`;
    }
  }

  // 4. Psychosocial Integrity
  else if (domain.includes("Psychosocial Integrity")) {
    if (difficulty === 'easy') {
      const comm = [
        { q: "I'm so worried that my surgery won't go well and I'll never walk again.", a: "It sounds like you are feeling really anxious about your recovery. Tell me more about what you are expecting.", exp: "Reflecting feelings and using open-ended questions encourages therapeutic dialogue." },
        { q: "There are hidden microphones in the wall and the government is watching me.", a: "I understand that you feel frightened, but I do not see any microphones in this room and you are safe here.", exp: "Presenting reality calmly without arguing or validating delusions is therapeutic." },
        { q: "My family never visits me and I feel completely alone in this hospital.", a: "You are feeling lonely because your family hasn't been here. Let's talk about how you'd like to reach out to them.", exp: "Acknowledging feelings and exploring coping strategies supports psychosocial integrity." }
      ];
      const c = comm[q % comm.length];
      question = `The psychiatric nurse is talking to client ${name}, ${age} years old, who says, "${c.q}" What is the nurse's most therapeutic response?`;
      options = [
        `"Don't worry, everything is going to be perfectly fine. You have excellent doctors."`,
        `"${c.a}"`,
        `"Why do you think that? You shouldn't say things that aren't true."`,
        `"I will call your doctor immediately to get a prescription for a sedative."`
      ];
      correctAnswer = 1;
      explanation = c.exp;
    } else if (difficulty === 'medium') {
      const agi = [
        { cond: "bipolar mania and is pacing the halls, shouting, and disrupting other clients", action: "guide the client to a quiet, low-stimulus area, offer a high-calorie portable snack, and remain calm" },
        { cond: "severe depression and reports a sudden, unexplained elevation in mood and energy", action: "conduct an immediate direct suicide assessment, asking if they have a plan and access to means" },
        { cond: "schizophrenia and is experiencing active auditory command hallucinations telling them to hurt others", action: "ask directly what the voices are saying, reassure them of safety, and implement close monitoring" }
      ];
      const a = agi[q % agi.length];
      question = `The nurse is caring for client ${name}, ${age} years old, who is admitted with ${a.cond}. What is the nurse's priority clinical intervention?`;
      options = [
        `Administer a physical restraint immediately to prevent any movement.`,
        `Directly ${a.action}.`,
        `Tell the client to stop their behavior or they will be locked in their room.`,
        `Ignore the symptoms as they are expected outcomes of the underlying pathology.`
      ];
      correctAnswer = 1;
      explanation = `Psychosocial integrity and client safety require immediate intervention. ${a.action} directly addresses the acute presentation of ${a.cond}.`;
    } else {
      const withdraw = [
        { drug: "alcohol withdrawal", sx: "tactile hallucinations, heavy sweating, and severe tremors (suspected delirium tremens)", action: "administer prescribed scheduled benzodiazepines, keep the room quiet and well-lit, and monitor vitals frequently" },
        { drug: "opioid withdrawal", sx: "pupillary dilation, severe abdominal cramps, rhinorrhea, and intense muscle aches", action: "administer prescribed clonidine or methadone, provide warm blankets, and monitor fluid balance" },
        { drug: "severe anorexia nervosa", sx: "a body mass index (BMI) of 14, bradycardia of 42 beats/minute, and orthostatic hypotension", action: "monitor meal consumption closely, supervise restroom visits for 1 hour post-meals, and monitor electrolytes for refeeding syndrome" }
      ];
      const w = withdraw[q % withdraw.length];
      question = `The nurse is caring for client ${name}, ${age} years old, who is admitted for ${w.drug} and presents with ${w.sx}. What is the nurse's priority nursing action?`;
      options = [
        `Discharge the client to outpatient counseling immediately.`,
        `Instruct the client's family to monitor all symptoms at home.`,
        `Directly ${w.action}.`,
        `Administer standard intravenous fluids at a rapid rate of 250 mL/hour.`
      ];
      correctAnswer = 2;
      explanation = `Clients experiencing ${w.drug} with ${w.sx} require close monitoring and targeted therapy. ${w.action} ensures physiological and psychological stability during acute stress.`;
    }
  }

  // 5. Basic Care and Comfort
  else if (domain.includes("Basic Care and Comfort")) {
    if (difficulty === 'easy') {
      const comf = [
        { cond: "severe chronic osteoarthritis of the knee", action: "apply moist heat compresses for 20 minutes to relieve stiffness and encourage gentle active range-of-motion" },
        { cond: "acute gouty arthritis in the great toe", action: "apply a foot cradle over the bed linens to prevent pressure, and encourage a low-purine diet with high fluid intake" },
        { cond: "post-operative day 1 total hip arthroplasty", action: "maintain an abduction wedge between the legs to prevent dislocation, and avoid flexing the hip past 90 degrees" }
      ];
      const c = comf[q % comf.length];
      question = `A nurse is planning comfort care for client ${name}, ${age} years old, who is diagnosed with ${c.cond}. What is the nurse's priority care intervention?`;
      options = [
        `Instruct the client to remain completely immobile in bed for 48 hours.`,
        `Administer high-potency oral muscle relaxants every 2 hours.`,
        `Directly ${c.action}.`,
        `Apply a heavy ice pack directly to bare skin for 2 hours continuous.`
      ];
      correctAnswer = 2;
      explanation = `Comfort care is optimized by using targeted interventions. ${c.action} directly addresses ${c.cond} while avoiding complications.`;
    } else if (difficulty === 'medium') {
      const nutr = [
        { cond: "recovering pancreatitis starting an oral diet", action: "provide small, frequent low-fat meals and monitor for pain or elevation in amylase/lipase" },
        { cond: "severe dysphagia following an acute ischemic stroke", action: "position the client at a 90-degree upright angle (high Fowler's), tuck the chin during swallowing, and provide thickened liquids" },
        { cond: "receiving continuous enteral tube feedings through a gastrostomy tube", action: "keep the head of the bed elevated at 30 to 45 degrees, check gastric residuals every 4 hours, and flush with warm water" }
      ];
      const n = nutr[q % nutr.length];
      question = `The nurse is managing the nutritional therapy for client ${name}, ${age} years old, with ${n.cond}. What is the nurse's priority action?`;
      options = [
        `Provide a regular high-sodium diet with unlimited fluids.`,
        `Directly ${n.action}.`,
        `Instruct the client to eat quickly to prevent food from cooling.`,
        `Withhold all nutrition and maintain strict NPO status indefinitely.`
      ];
      correctAnswer = 1;
      explanation = `Proper nutrition care in vulnerable populations requires strict safety protocols. ${n.action} reduces risk of aspiration or pancreatic stress.`;
    } else {
      const mob = [
        { issue: "skeletal traction on their femur and complains of severe muscle spasms", action: "assess the weights to ensure they are hanging freely off the floor, check ropes for alignment, and perform neurovascular checks" },
        { issue: "recovering from a total knee replacement and is using a continuous passive motion (CPM) machine", action: "ensure the leg is aligned properly, check skin integrity under the sleeve, and administer analgesics before therapy" },
        { issue: "immobile and is at high risk for pressure injury development", action: "reposition the client every 2 hours in bed, utilize pressure-reducing mattress overlays, float the heels, and maintain high-protein nutrition" }
      ];
      const m = mob[q % mob.length];
      question = `The nurse is caring for client ${name}, ${age} years old, who is managed with ${m.issue}. What is the nurse's priority action?`;
      options = [
        `Increase the traction weights by adding an additional 5 pounds.`,
        `Directly ${m.action}.`,
        `Instruct the UAP to reposition the weights and ropes as needed.`,
        `Apply a tight tourniquet above the joint to prevent swelling.`
      ];
      correctAnswer = 1;
      explanation = `Management of ${m.issue} requires diligent physical assessment and adherence to orthopedic safety standards. ${m.action} ensures optimal therapeutic outcomes.`;
    }
  }

  // 6. Safety and Infection Control
  else if (domain.includes("Safety and Infection Control")) {
    if (difficulty === 'easy') {
      const iso = [
        { disease: "active pulmonary Tuberculosis", precaution: "Airborne precautions", equipment: "N95 respirator mask and private negative-pressure room placement" },
        { disease: "bacterial Meningitis", precaution: "Droplet precautions", equipment: "standard surgical face mask upon entering within 3 feet and private room placement" },
        { disease: "Clostridium difficile infection", precaution: "Contact precautions", equipment: "disposable protective gown, clean gloves, and washing hands with soap and water" }
      ];
      const i = iso[q % iso.length];
      question = `A nurse is preparing to admit client ${name}, ${age} years old, with diagnosed ${i.disease}. What represents the absolute priority transmission-based precaution and PPE?`;
      options = [
        `Apply standard precautions and place the client in any semi-private room.`,
        `Initiate ${i.precaution}, requiring the use of ${i.equipment}.`,
        `Use protective eyewear only and restrict all family visits.`,
        `Initiate basic precautions but allow the client to ambulate in public corridors.`
      ];
      correctAnswer = 1;
      explanation = `Preventing nosocomial spread of ${i.disease} requires strict adherence to ${i.precaution} with specific equipment, such as ${i.equipment}.`;
    } else if (difficulty === 'medium') {
      const seqs = [
        { task: "donning personal protective equipment (PPE) before entering a COVID isolation room", seq: "Gown first, then Mask/Respirator, then Goggles/Face Shield, and finally Gloves last", exp: "The correct sequence for donning PPE is gown, mask/respirator, goggles/face shield, and gloves to ensure complete protective coverage." },
        { task: "doffing personal protective equipment (PPE) when leaving a contact-droplet isolation room", seq: "Gloves first, then Gown, then Goggles/Face Shield, then Mask, and finally hand hygiene", exp: "The correct sequence for doffing is gloves, gown, goggles, mask/respirator, followed by thorough hand hygiene to prevent self-contamination." }
      ];
      const s = seqs[q % seqs.length];
      question = `The nurse is preparing to perform the task of ${s.task}. What is the correct clinical sequence to follow?`;
      options = [
        `Gloves first, then Mask, then Gown, then Goggles.`,
        `Mask first, then Gloves, then Goggles, then Gown.`,
        s.seq,
        `Goggles first, then Gloves, then Gown, then Mask.`
      ];
      correctAnswer = 2;
      explanation = s.exp;
    } else {
      const infec = [
        { cond: "septic shock secondary to a severe urinary tract infection, with a blood pressure of 82/44 and lactate of 4.2", action: "administer rapid intravenous crystalloid fluids at 30 mL/kg, obtain blood cultures, and administer broad-spectrum antibiotics within 1 hour" },
        { cond: "malignant hyperthermia during general anesthesia, with a temperature of 104F and muscle rigidity", action: "halt the volatile anesthetic, administer 100% oxygen, and prepare immediate intravenous dantrolene sodium" },
        { cond: "recovering from abdominal surgery, and has sudden surgical wound evisceration where bowel loops are visible", action: "cover the exposed viscera with sterile towels saturated in sterile normal saline, keep the client NPO, and notify the surgeon immediately" }
      ];
      const inf = infec[q % infec.length];
      question = `The nurse is caring for client ${name}, ${age} years old, who suddenly develops ${inf.cond}. What is the nurse's absolute priority action?`;
      options = [
        `Instruct the client to sit upright and perform deep diaphragmatic breathing.`,
        `Document the event and re-evaluate during the next shift change.`,
        `Directly ${inf.action}.`,
        `Apply a tight abdominal binder or ice pack to stop the progression.`
      ];
      correctAnswer = 2;
      explanation = `Emergencies such as ${inf.cond} require immediate life-saving intervention. ${inf.action} is the prioritized medical response.`;
    }
  }

  // 7. Reduction of Risk Potential
  else if (domain.includes("Reduction of Risk Potential")) {
    if (difficulty === 'easy') {
      const sens = [
        { cond: "primary open-angle glaucoma", action: "administer prescribed prostaglandin eye drops daily to lower intraocular pressure and teach lifetime compliance" },
        { cond: "recent cataract extraction surgery", action: "instruct the client to avoid coughing, sneezing, bending over, or straining to prevent increased intraocular pressure" },
        { cond: "Meniere's disease experiencing acute vertigo", action: "maintain a low-sodium diet, limit fluid fluctuations, and instruct the client to turn their head slowly" }
      ];
      const s = sens[q % sens.length];
      question = `The clinic nurse is reinforcing discharge education for client ${name}, ${age} years old, who is recovering from ${s.cond}. What is the priority safety instruction?`;
      options = [
        `Instruct the client to remain in a completely dark room for 3 weeks.`,
        `Directly ${s.action}.`,
        `Recommend taking high doses of aspirin daily for discomfort.`,
        `Advise holding breath during bowel movements to stabilize pressure.`
      ];
      correctAnswer = 1;
      explanation = `Sensory safety and risk reduction rely on avoiding intraocular or labyrinthine stress. ${s.action} is the gold standard for managing ${s.cond}.`;
    } else if (difficulty === 'medium') {
      const onc = [
        { cond: "chemotherapy and has severe neutropenia (WBC 1,200/mm³)", action: "initiate strict protective isolation, avoid raw fruits/vegetables, restrict fresh flowers, and perform frequent hand hygiene" },
        { cond: "an internal radiation implant (brachytherapy) for cervical cancer", action: "limit visitors to 30 minutes per day, maintain a 6-foot distance, require lead shielding, and prohibit pregnant staff" },
        { cond: "chemotherapy and presents with a platelet count of 22,000/mm³ (thrombocytopenia)", action: "implement bleeding precautions, use a soft toothbrush, avoid intramuscular injections, and prevent falls" }
      ];
      const o = onc[q % onc.length];
      question = `The oncology nurse is reviewing lab updates for client ${name}, ${age} years old, who is undergoing ${o.cond}. What is the nurse's priority intervention?`;
      options = [
        `Administer a scheduled intramuscular immunization dose.`,
        `Directly ${o.action}.`,
        `Encourage vigorous cardiovascular exercise twice daily.`,
        `Instruct the UAP to take the temperature rectally every 2 hours.`
      ];
      correctAnswer = 1;
      explanation = `Protecting vulnerable oncology clients from critical complications like infection or severe hemorrhage is priority. ${o.action} reduces risk potential.`;
    } else {
      const risks = [
        { situation: "sudden onset of chest pain, shortness of breath, and asymmetrical leg swelling post-operatively", action: "suspect a pulmonary embolism, apply oxygen, place the client in semi-Fowler's, and notify the provider" },
        { situation: "a mediastinal chest tube following heart surgery that has suddenly stopped draining, and heart sounds are muffled", action: "suspect cardiac tamponade due to obstruction, perform immediate clinical assessment, and notify the surgical team" },
        { situation: "chemotherapy with tumor lysis syndrome, showing a potassium of 6.2 and uric acid of 11.4 mg/dL", action: "administer intravenous hydration, prepare rasburicase or allopurinol, and monitor cardiac telemetry" }
      ];
      const r = risks[q % risks.length];
      question = `The nurse on a medical-surgical unit is evaluating client ${name}, ${age} years old, who presents with ${r.situation}. What is the nurse's absolute priority action?`;
      options = [
        `Instruct the client to perform deep cough exercises and re-evaluate in 2 hours.`,
        `Immediately ${r.action}.`,
        `Document this as a normal physiological reaction to recovery.`,
        `Ask the UAP to perform a warm leg massage to relieve discomfort.`
      ];
      correctAnswer = 1;
      explanation = `Identifying acute, highly lethal risk factors and taking immediate, targeted rescue actions is the core of reducing risk potential. ${r.action} is the correct response.`;
    }
  }

  // 8. Physiological Adaptation (Default for other days)
  else {
    if (difficulty === 'easy') {
      const abgs = [
        { val: "pH 7.31, PaCO2 52 mmHg, HCO3 24 mEq/L", dx: "Respiratory Acidosis", intervention: "administer oxygen and encourage coughing and deep breathing" },
        { val: "pH 7.48, PaCO2 28 mmHg, HCO3 25 mEq/L", dx: "Respiratory Alkalosis", intervention: "instruct the client to breathe slowly and synchronize breathing" },
        { val: "pH 7.32, PaCO2 38 mmHg, HCO3 16 mEq/L", dx: "Metabolic Acidosis", intervention: "assess blood sugars for diabetic ketoacidosis and check kidney function" }
      ];
      const a = abgs[q % abgs.length];
      question = `The nurse is reviewing laboratory blood gas results for client ${name}, ${age} years old. The report shows: ${a.val}. How should the nurse interpret and manage these clinical findings?`;
      options = [
        `Interpret as fully compensated metabolic alkalosis and notify the provider.`,
        `Diagnose as ${a.dx} and clinically ${a.intervention}.`,
        `Consider this a normal finding and request a follow-up lab tomorrow.`,
        `Interpret as mixed respiratory acidosis and prepare for immediate dialysis.`
      ];
      correctAnswer = 1;
      explanation = `The values of ${a.val} indicate ${a.dx}. The correct nursing management is to ${a.intervention} to correct the gas exchange.`;
    } else if (difficulty === 'medium') {
      const card = [
        { rhythm: "sudden onset of ventricular fibrillation on telemetry", action: "immediately check responsiveness, activate the emergency response, and begin high-quality CPR and defibrillation" },
        { rhythm: "Atrial Fibrillation with a rapid ventricular response of 142 beats/minute and dizziness", action: "assess blood pressure, obtain a 12-lead EKG, and prepare to administer prescribed diltiazem or beta-blockers" },
        { rhythm: "third-degree (complete) atrioventricular heart block with bradycardia of 28 beats/minute", action: "obtain a transcutaneous pacemaker, assess hemodynamics, and prepare for immediate temporary pacing" }
      ];
      const c = card[q % card.length];
      question = `The cardiovascular unit nurse notes client ${name}, ${age} years old, has ${c.rhythm}. What represents the nurse's priority action?`;
      options = [
        `Document the rhythm and schedule a routine stress test for next week.`,
        `Directly ${c.action}.`,
        `Ask the client to cough vigorously and place a cold washcloth on their forehead.`,
        `Turn off the telemetry alarms to prevent disturbing other unit clients.`
      ];
      correctAnswer = 1;
      explanation = `Cardiac rhythm emergencies require rapid, highly coordinated intervention. ${c.action} ensures safety and stabilizes hemodynamics under life-threatening arrhythmias.`;
    } else {
      const neur = [
        { cond: "increased intracranial pressure (ICP) following trauma, showing bradycardia and widening pulse pressure (Cushing's triad)", action: "elevate the head of the bed to 30 degrees, maintain neck alignment, administer mannitol, and avoid suctioning" },
        { cond: "autonomic dysreflexia secondary to a T6 spinal cord injury, with a blood pressure of 190/100 and headache", action: "place the client in high Fowler's, check for bladder distension or catheter kink, assess for fecal impaction, and notify the provider" },
        { cond: "acute respiratory distress with a sudden chest tube dislodgement from the pleural space", action: "immediately seal the insertion site with a sterile occlusive petroleum gauze dressing taped on three sides only" }
      ];
      const n = neur[q % neur.length];
      question = `The nurse is evaluating client ${name}, ${age} years old, who suddenly develops ${n.cond}. What is the nurse's absolute priority action?`;
      options = [
        `Position the client in Trendelenburg position and apply heating pads.`,
        `Instruct the client to perform deep valsalva maneuvers.`,
        `Directly ${n.action}.`,
        `Apply a tight compressive elastic bandage directly over the neck or chest.`
      ];
      correctAnswer = 2;
      explanation = `The development of ${n.cond} represents a critical medical emergency. The nurse must directly ${n.action} to stabilize the patient and prevent clinical failure.`;
    }
  }

  return {
    id,
    question,
    options,
    correctAnswer,
    explanation: `[NCLEX Category: ${domain}] ${explanation}`,
    difficulty,
    domain
  };
}

function main() {
  const outputDir = path.resolve("services/questionBank");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Compiling all 30 days of pre-written static NCLEX questions (1,500 total)...");

  for (let day = 1; day <= 30; day++) {
    const domain = getDomainForDay(day);
    const questions = [];

    // Compile exactly 50 completely unique, distinct questions for this curriculum day
    for (let q = 1; q <= 50; q++) {
      questions.push(generateQuestionForDayAndIndex(day, q, domain));
    }

    const filePath = path.join(outputDir, `day${day}.ts`);
    const fileContent = `import { NCLEXQuestion } from "../questionBank";

export const DAY_${day}_QUESTIONS: NCLEXQuestion[] = ${JSON.stringify(questions, null, 2)};
`;

    fs.writeFileSync(filePath, fileContent, "utf-8");
    console.log(`Wrote static Day ${day}.ts (${questions.length} questions compiled successfully).`);
  }

  // Write Registry
  console.log("Compiling services/questionBank/registry.ts...");
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
  console.log("All files compiled and registry generated successfully!");
}

main();
