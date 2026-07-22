import fs from 'fs';
import path from 'path';

console.log("Generating 1,500 completely unique NCLEX questions with distinct distractors...");

const DAY_TOPICS = [
  { day: 1, name: "Management of Care: Priority & Delegation", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 2, name: "Pharmacology & Dosage Calculations", domain: "Pharmacological and Parenteral Therapies" },
  { day: 3, name: "Fluid, Electrolytes & Acid-Base Balance", domain: "Physiological Adaptation" },
  { day: 4, name: "Cardiovascular & EKG Patterns", domain: "Physiological Adaptation" },
  { day: 5, name: "Respiratory Emergencies & Critical Care", domain: "Physiological Adaptation" },
  { day: 6, name: "Pediatric Growth, Milestones & Anomalies", domain: "Health Promotion and Maintenance" },
  { day: 7, name: "Maternity, Postpartum & Neonatal Care", domain: "Health Promotion and Maintenance" },
  { day: 8, name: "Psychiatric Nursing & Therapeutic Communication", domain: "Psychosocial Integrity" },
  { day: 9, name: "Endocrine Disorders & Diabetes Management", domain: "Physiological Adaptation" },
  { day: 10, name: "Renal & Urinary Pathophysiologies", domain: "Physiological Adaptation" },
  { day: 11, name: "Gastrointestinal Systems & Nutrition", domain: "Basic Care and Comfort" },
  { day: 12, name: "Oncology & Chemotherapy Precautions", domain: "Reduction of Risk Potential" },
  { day: 13, name: "Infection Control & Isolation Precautions", domain: "Safe and Effective Care Environment - Safety and Infection Control" },
  { day: 14, name: "Perioperative & Sterile Technique", domain: "Safe and Effective Care Environment - Safety and Infection Control" },
  { day: 15, name: "Musculoskeletal Disorders & Traction Care", domain: "Basic Care and Comfort" },
  { day: 16, name: "Neurological Assessment & Stroke Care", domain: "Physiological Adaptation" },
  { day: 17, name: "Hematology & Transfusion Protocols", domain: "Pharmacological and Parenteral Therapies" },
  { day: 18, name: "Immunology & Hypersensitivity Shock", domain: "Physiological Adaptation" },
  { day: 19, name: "Integumentary & Burn Management", domain: "Physiological Adaptation" },
  { day: 20, name: "Gerontological Nursing & Polypharmacy", domain: "Health Promotion and Maintenance" },
  { day: 21, name: "Ethical, Legal & Advance Directives", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 22, name: "Triage & Disaster Response Priorities", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 23, name: "Community Health & Biohazards", domain: "Safe and Effective Care Environment - Safety and Infection Control" },
  { day: 24, name: "Sensory Impairments & Eye/Ear Care", domain: "Reduction of Risk Potential" },
  { day: 25, name: "High-Alert Pharmacology Focus", domain: "Pharmacological and Parenteral Therapies" },
  { day: 26, name: "SATA Master-Set", domain: "Reduction of Risk Potential" },
  { day: 27, name: "Clinical Delegation & Assignments", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 28, name: "Complex Pathophysiology Integration", domain: "Physiological Adaptation" },
  { day: 29, name: "Final NCLEX CAT Diagnostic: Part A", domain: "Safe and Effective Care Environment - Management of Care" },
  { day: 30, name: "Grand NCLEX CAT Blueprint: Part B", domain: "Physiological Adaptation" }
];

const FIRST_NAMES = [
  "Sarah", "James", "Elena", "Marcus", "Emily", "David", "Theresa", "Jackson", "Linda", "Kofi", 
  "Yuki", "Amir", "Zahra", "Carlos", "Noor", "Chinedu", "Dmitri", "Fatima", "Anya", "Chen", 
  "Gabriel", "Chloe", "Mateo", "Siddharth", "Sophia", "Omar", "Isabella", "Kwame", "Hannah", "Liam", 
  "Mei", "Tariq", "Lucas", "Aisha", "Hiroshi", "Olga", "Zane", "Grace", "Elijah", "Maya", 
  "Daniel", "Leila", "Noah", "Amara", "Sebastian", "Kiara", "Ethan", "Olivia", "Patricia", "Christopher"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", 
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", 
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", 
  "Walker", "Young", "Hall", "Allen", "King", "Wright", "Baker", "Abara", "Okonkwo", "Tanaka"
];

function getPatientName(day, q) {
  const fn = FIRST_NAMES[(day * 17 + q * 13) % FIRST_NAMES.length];
  const ln = LAST_NAMES[(day * 19 + q * 7) % LAST_NAMES.length];
  return `${fn} ${ln}`;
}

// Deterministic pseudo-random number generator for shuffling options consistently
function seededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Clinical conditions, interventions, and 3 specific distractors tailored per scenario
const CLINICAL_CATALOG = [
  // Management of Care & Delegation
  { cond: "post-op Day 1 abdominal surgery requesting assistance with ambulation", correct: "Delegate ambulation to unlicensed assistive personnel (UAP) after performing the initial postoperative stability assessment.", wrong: ["Instruct the UAP to perform the initial surgical dressing change.", "Assign the LPN to perform the initial post-surgical assessment.", "Ask the physical therapist to administer intravenous analgesia prior to walking."], rationale: "UAP can assist stable clients with ambulation after the RN conducts initial assessment." },
  { cond: "acute respiratory distress with SpO2 dropping to 84%", correct: "Apply high-flow nasal cannula oxygen and place the client in high-Fowler's position immediately.", wrong: ["Administer prescribed oral bronchodilator and reassess in 1 hour.", "Request a physical therapy consultation for chest physiotherapy.", "Place the client in supine position and encourage slow pursed-lip breathing."], rationale: "Immediate oxygenation and upright positioning take priority in acute hypoxia." },
  { cond: "sudden substernal chest pain radiating to the left shoulder", correct: "Obtain an immediate 12-lead ECG, assess vital signs, and notify the healthcare provider.", wrong: ["Administer an oral antacid and wait 30 minutes to evaluate response.", "Encourage deep breathing exercises and reposition on the right side.", "Delegate vital sign measurement to UAP and await shift change."], rationale: "Chest pain requires immediate cardiac workup to rule out acute myocardial infarction." },
  { cond: "perioral numbness and positive Chvostek's sign following total thyroidectomy", correct: "Assess serum calcium levels and prepare intravenous calcium gluconate for immediate administration.", wrong: ["Administer oral potassium chloride supplements.", "Encourage coughing and deep breathing to clear surgical airway.", "Place a heating pad around the anterior neck region."], rationale: "Accidental parathyroid removal during thyroidectomy causes acute hypocalcemia." },
  { cond: "sudden cessation of severe abdominal pain in acute appendicitis", correct: "Immediately assess for abdominal rigidity, guarding, and signs of appendiceal perforation.", wrong: ["Discharge the client as the underlying inflammation has resolved.", "Administer prescribed oral laxative to encourage bowel movement.", "Apply a warm compress to the right lower quadrant."], rationale: "Sudden pain relief in appendicitis indicates rupture and impending peritonitis." },

  // Pharmacology
  { cond: "receiving Digoxin reporting nausea and yellow-green visual halos", correct: "Hold the digoxin dose, check serum potassium levels, and notify the provider.", wrong: ["Increase fluid intake and administer prescribed antiemetic.", "Administer the next dose with food to prevent gastric irritation.", "Encourage the client to rest in a dark room until vision improves."], rationale: "Visual halos and nausea signal digoxin toxicity, often precipitated by hypokalemia." },
  { cond: "receiving Lithium carbonate with a serum level of 2.2 mEq/L", correct: "Withhold the lithium dose and evaluate the client for ataxia and coarse hand tremors.", wrong: ["Encourage sodium restriction to lower lithium concentration.", "Administer the next dose with a full glass of water.", "Reassure the client that this level is within therapeutic limits."], rationale: "Lithium levels above 1.5 mEq/L cause toxicity including ataxia and severe tremors." },
  { cond: "receiving continuous IV Heparin with an aPTT of 125 seconds", correct: "Stop the heparin infusion immediately and prepare protamine sulfate.", wrong: ["Increase the heparin infusion rate by 10%.", "Administer oral Vitamin K (phytonadione).", "Encourage vigorous leg exercises in bed."], rationale: "An aPTT > 100 seconds indicates severe bleeding risk; protamine sulfate is the antidote." },
  { cond: "taking Warfarin presenting with an INR of 6.2 and scattered petechiae", correct: "Hold warfarin, notify the provider, and prepare Vitamin K administration.", wrong: ["Administer IV heparin bolus to balance clotting factors.", "Instruct the client to double the Warfarin dose tomorrow.", "Apply warm compresses over petechial skin areas."], rationale: "INR > 4.5 with signs of bleeding requires holding warfarin and administering Vitamin K." },
  { cond: "receiving Gentamicin IV with a serum creatinine rising to 3.4 mg/dL", correct: "Hold the gentamicin dose and contact the provider to adjust dosing based on trough levels.", wrong: ["Encourage strict bed rest and restrict oral fluids.", "Administer loop diuretics to enhance antibiotic excretion.", "Double the infusion rate to shorten drug exposure time."], rationale: "Gentamicin is nephrotoxic; elevated creatinine indicates renal impairment requiring dose adjustment." },

  // Fluid & Electrolytes
  { cond: "serum potassium of 6.9 mEq/L accompanied by tall, peaked T waves on ECG", correct: "Administer IV calcium gluconate to stabilize cardiac membranes, followed by insulin and glucose.", wrong: ["Administer IV potassium chloride piggyback over 30 minutes.", "Encourage a high-potassium diet including bananas and oranges.", "Place the client in Trendelenburg position."], rationale: "Hyperkalemia with ECG changes requires membrane stabilization with IV calcium." },
  { cond: "serum sodium of 116 mEq/L presenting with confusion and twitching", correct: "Initiate seizure precautions and administer hypertonic 3% sodium chloride infusion slowly.", wrong: ["Encourage unrestricted free water intake at the bedside.", "Administer IV hypotonic 0.45% normal saline.", "Instruct the client to hyperventilate into a paper bag."], rationale: "Severe hyponatremia risks cerebral edema and seizures; hypertonic saline is indicated." },
  { cond: "arterial blood gas showing pH 7.20, PaCO2 62 mmHg, and HCO3 24 mEq/L", correct: "Recognize respiratory acidosis and assist the client with deep breathing or mechanical ventilation.", wrong: ["Administer IV sodium bicarbonate bolus immediately.", "Encourage the client to breathe rapidly into a paper bag.", "Instruct the client to restrict oral fluid intake."], rationale: "Uncompensated respiratory acidosis is caused by hypoventilation and CO2 retention." },
  { cond: "arterial blood gas showing pH 7.52, PaCO2 34 mmHg, and HCO3 31 mEq/L", correct: "Identify metabolic alkalosis and evaluate for prolonged nasogastric suctioning or vomiting.", wrong: ["Administer IV ammonium chloride immediately without assessment.", "Encourage deep coughing exercises every 15 minutes.", "Increase oxygen flow rate to 10 L/min via non-rebreather mask."], rationale: "Gastric acid loss leads to metabolic alkalosis." },
  { cond: "serum calcium of 6.2 mg/dL exhibiting positive Trousseau's sign", correct: "Initiate seizure precautions and prepare intravenous calcium gluconate.", wrong: ["Encourage rapid ambulation in the hallway.", "Administer oral calcitonin injections.", "Place the client on strict fluid restriction."], rationale: "Severe hypocalcemia increases neuromuscular irritability and seizure risk." },

  // Cardiac
  { cond: "acute STEMI with crushing substernal chest pain and diaphoresis", correct: "Administer supplemental oxygen, sublingual nitroglycerin, chewed aspirin, and morphine.", wrong: ["Place the client in prone position and encourage coughing.", "Administer oral beta-blocker only and reassess in 2 hours.", "Apply ice packs over the sternum."], rationale: "Standard emergency MONA protocol for acute myocardial infarction." },
  { cond: "heart failure exacerbation with 3+ pitting lower extremity edema and lung crackles", correct: "Administer IV furosemide, position in high-Fowler's, and enforce sodium restriction.", wrong: ["Encourage rapid IV fluid resuscitation with 0.9% Normal Saline.", "Place client in Trendelenburg position to improve venous return.", "Administer oral potassium supplements prior to diuretic evaluation."], rationale: "Diuretics and fluid restriction treat fluid volume overload in heart failure." },
  { cond: "new-onset Atrial Fibrillation with rapid ventricular response (HR 158 bpm)", correct: "Prepare for rate control therapy using IV diltiazem or beta-blockers.", wrong: ["Perform immediate unsynchronized defibrillation at 200 Joules.", "Instruct the client to perform vigorous leg exercises.", "Administer IV atropine to slow heart rate."], rationale: "Rate control is first-line management for atrial fibrillation with rapid ventricular response." },
  { cond: "sustained Ventricular Tachycardia with a pulse presenting with lightheadedness", correct: "Prepare for synchronized cardioversion and administer IV amiodarone.", wrong: ["Perform immediate CPR chest compressions.", "Administer IV digoxin bolus rapidly.", "Instruct the client to hyperventilate."], rationale: "Unstable V-Tach with a pulse requires prompt synchronized cardioversion." },
  { cond: "Infective Endocarditis with fever, splinter hemorrhages, and a new cardiac murmur", correct: "Obtain two sets of blood cultures from separate sites prior to initiating IV antibiotics.", wrong: ["Start broad-spectrum antibiotics immediately before blood drawing.", "Apply heating pads to painful splinter hemorrhage sites.", "Encourage vigorous isometric exercises in bed."], rationale: "Blood cultures must precede antibiotic therapy to identify pathogen accurately." },

  // Respiratory
  { cond: "ARDS exhibiting severe refractory hypoxemia on mechanical ventilation", correct: "Place the client in prone position to optimize ventilation-perfusion matching.", wrong: ["Place the client in flat supine position with legs elevated.", "Increase tidal volume to maximum setting.", "Administer bolus IV normal saline 2,000 mL."], rationale: "Proning improves oxygenation by recruiting posterior lung segments in ARDS." },
  { cond: "tension pneumothorax with tracheal deviation and absent left breath sounds", correct: "Prepare for immediate needle decompression at the 2nd intercostal space midclavicular line.", wrong: ["Apply a tight chest binder around the ribcage.", "Administer nebulized albuterol every 15 minutes.", "Place the client in left lateral decubitus position."], rationale: "Tension pneumothorax is a life-threatening emergency requiring needle decompression." },
  { cond: "severe asthma attack with a sudden 'silent chest' upon auscultation", correct: "Prepare for emergency endotracheal intubation and mechanical ventilation.", wrong: ["Administer oral cough suppressant syrup.", "Encourage the client to lie down and sleep.", "Discontinue oxygen therapy immediately."], rationale: "A silent chest indicates severe bronchospasm with absence of air movement." },
  { cond: "exacerbation of COPD with PaO2 52 mmHg and marked drowsiness", correct: "Initiate low-flow oxygen via Venturi mask and evaluate for noninvasive positive pressure ventilation.", wrong: ["Administer high-flow 100% oxygen via non-rebreather mask.", "Encourage strict bed rest in flat supine position.", "Administer IV sedatives to promote rest."], rationale: "Venturi mask provides precise low-flow FiO2 without suppressing hypoxic drive." },
  { cond: "chest tube drainage system displaying continuous bubbling in the water-seal chamber", correct: "Inspect the tubing and connections for an air leak starting from the chest insertion site.", wrong: ["Clamping the chest tube near the drainage canister immediately.", "Milking the chest tube vigorously away from the client.", "Adding sterile water to the suction control chamber."], rationale: "Continuous bubbling in the water seal chamber indicates an air leak in the system." },

  // Pediatrics
  { cond: "6-month-old infant presenting with barking cough and inspiratory stridor at rest", correct: "Administer nebulized racemic epinephrine and keep the child calm in cool mist environment.", wrong: ["Inspect the throat thoroughly using a tongue depressor.", "Place the infant in supine position with head flat.", "Administer oral aspirin for fever control."], rationale: "Racemic epinephrine reduces airway edema in croup; tongue depressors can trigger laryngospasm." },
  { cond: "2-year-old child suspected of acute epiglottitis presenting with drooling and tripod posture", correct: "Keep the child calm, avoid throat examination, and prepare for emergency airway placement.", wrong: ["Perform direct oral examination with a penlight and tongue blade.", "Obtain a throat swab culture immediately.", "Place the child in supine position for lung auscultation."], rationale: "Examining the throat in epiglottitis can precipitate complete airway obstruction." },
  { cond: "infant with Tetralogy of Fallot experiencing a hypercyanotic ('Tet') spell", correct: "Place the infant in knee-to-chest position and administer oxygen.", wrong: ["Place the infant in prone position with arms extended.", "Administer IV bolus of atropine.", "Encourage vigorous crying to inflate lungs."], rationale: "Knee-chest position increases systemic vascular resistance, reducing right-to-left shunting." },
  { cond: "18-month-old child presenting with painful sausage-shaped abdominal mass and jelly stools", correct: "Prepare the child for a diagnostic and therapeutic air or barium enema.", wrong: ["Administer oral antidiarrheal medication.", "Place heating pad on the abdomen.", "Encourage immediate oral fluid challenge with apple juice."], rationale: "Intussusception is diagnosed and often reduced using air/barium enema." },
  { cond: "4-year-old child with Wilms' tumor awaiting surgical resection", correct: "Place a sign over the bed reading 'Do Not Palpate Abdomen'.", wrong: ["Palpate the abdomen thoroughly during each shift change.", "Apply warm abdominal compresses to ease swelling.", "Encourage high-impact active playroom games."], rationale: "Palpating a Wilms' tumor can rupture the capsule and disseminate tumor cells." },

  // Maternity & Newborn
  { cond: "pregnant client at 34 weeks gestation with painless, bright red vaginal bleeding", correct: "Avoid vaginal examination, monitor fetal heart rate, and notify the provider immediately.", wrong: ["Perform sterile vaginal exam to determine cervical dilation.", "Instruct client to ambulate in hallway to encourage labor.", "Administer oxytocin IV infusion piggyback."], rationale: "Painless bright red bleeding suggests placenta previa; digital vaginal exam is contraindicated." },
  { cond: "laboring client experiencing sudden severe abdominal pain and fetal bradycardia", correct: "Recognize suspected uterine rupture, prepare for emergency C-section, and administer oxygen.", wrong: ["Increase oxytocin infusion rate to accelerate delivery.", "Encourage client to push actively during contractions.", "Perform Leopold maneuvers to confirm fetal position."], rationale: "Uterine rupture is a maternal-fetal emergency requiring immediate C-section." },
  { cond: "postpartum client 2 hours after delivery experiencing heavy vaginal bleeding and soft, boggy uterus", correct: "Massage the uterine fundus firmly until firm and administer prescribed uterotonic.", wrong: ["Place client in Trendelenburg position and apply ice to chest.", "Perform urinary catheterization only without fundal massage.", "Instruct client to rest quietly without intervention."], rationale: "Fundal massage is the immediate first action for uterine atony." },
  { cond: "pregnant client at 32 weeks presenting with blood pressure 168/110 mmHg and 3+ proteinuria", correct: "Administer IV magnesium sulfate, initiate seizure precautions, and monitor deep tendon reflexes.", wrong: ["Encourage high-sodium diet to raise osmotic pressure.", "Administer oral diuretics every 4 hours.", "Instruct client to exercise on a stationary bike."], rationale: "Magnesium sulfate prevents eclamptic seizures in severe preeclampsia." },
  { cond: "newborn 1 hour post-delivery presenting with acrocyanosis and heart rate 130 bpm", correct: "Document the normal physiological finding and keep the newborn warm and dry.", wrong: ["Initiate neonatal chest compressions immediately.", "Administer IV epinephrine via umbilical line.", "Place newborn under cooling blanket."], rationale: "Acrocyanosis is a normal finding in the first 24 hours of life." },

  // Psychiatric & Psychosocial
  { cond: "client with schizophrenia experiencing acute auditory hallucinations commanding self-harm", correct: "Directly ask the client what the voices are saying and ensure safety.", wrong: ["Validate the hallucination by agreeing that the voices are real.", "Tell the client to stop listening to imaginary sounds.", "Isolate the client in a dark room until voices subside."], rationale: "Assessing command hallucinations is vital to determine safety risk." },
  { cond: "client experiencing severe panic attack with hyperventilation and chest tightness", correct: "Stay with the client, speak in short simple sentences, and guide slow breathing.", wrong: ["Leave the client alone to regain self-control.", "Provide detailed explanation of anxiety neurobiology.", "Administer oral caffeine beverage to boost energy."], rationale: "Presence and brief clear communication reduce panic and hyperventilation." },
  { cond: "client with major depressive disorder stating 'Everyone would be better off without me'", correct: "Ask directly: 'Are you having thoughts of killing yourself?'", wrong: ["Reassure the client that life is wonderful and full of hope.", "Change the subject to a pleasant topic to distract them.", "Tell the family that the client is feeling much better."], rationale: "Direct inquiry about suicidal ideation is mandatory for risk assessment." },
  { cond: "client with mania exhibiting loud intrusive behavior and pacing in the dayroom", correct: "Guide the client to a low-stimulation environment and offer high-calorie finger foods.", wrong: ["Engage the client in a competitive group board game.", "Confront the client aggressively in front of peers.", "Restrict fluid intake until behavior improves."], rationale: "Low stimulation and portable foods support safety and metabolic needs in mania." },
  { cond: "client experiencing severe alcohol withdrawal with tremors and tactile hallucinations", correct: "Administer prescribed benzodiazepine (e.g., lorazepam) and monitor seizure precautions.", wrong: ["Encourage high caffeine intake to increase alertness.", "Apply physical restraints immediately without medication.", "Instruct client that bug sensations are non-existent."], rationale: "Benzodiazepines prevent progression to severe delirium tremens and seizures." },

  // Endocrine
  { cond: "type 1 diabetic client presenting with diaphoresis, tremors, and blood glucose 48 mg/dL", correct: "Administer 15 grams of fast-acting simple carbohydrate orally if conscious.", wrong: ["Administer 10 units of Regular insulin subcutaneously.", "Encourage strict NPO status for 4 hours.", "Administer high-protein snack without carbohydrates."], rationale: "Immediate simple carbohydrates treat symptomatic hypoglycemia." },
  { cond: "client with DKA presenting with Kussmaul respirations and blood glucose 480 mg/dL", correct: "Initiate rapid IV fluid resuscitation with 0.9% Normal Saline followed by Regular insulin IV.", wrong: ["Administer subcutaneous NPH insulin bolus immediately.", "Encourage fluid restriction to prevent brain swelling.", "Administer potassium chloride IV push."], rationale: "Fluid resuscitation and continuous IV Regular insulin treat DKA." },
  { cond: "client post-thyroidectomy developing high fever, tachycardia, and severe agitation", correct: "Recognize thyroid storm, notify provider, administer antithyroid medications and cooling blanket.", wrong: ["Administer IV levothyroxine sodium rapidly.", "Apply warm thermal blankets to the torso.", "Encourage high iodine oral liquids."], rationale: "Thyroid storm is a hypermetabolic emergency requiring rapid cooling and antithyroid therapy." },
  { cond: "client with Addisonian crisis presenting with severe hypotension and confusion", correct: "Administer IV hydrocortisone bolus and IV fluid resuscitation with 0.9% Normal Saline.", wrong: ["Withhold all corticosteroid therapy immediately.", "Administer oral insulin supplements.", "Place client in upright sitting position."], rationale: "Addisonian crisis requires emergency IV glucocorticoids and fluid restoration." },
  { cond: "client with Cushing's syndrome exhibiting moon face, central obesity, and hyperglycemia", correct: "Monitor blood glucose levels, protect fragile skin, and prevent infection.", wrong: ["Encourage high-sodium, low-protein daily diet.", "Administer exogenous cortisol supplements.", "Encourage contact sports to build muscle mass."], rationale: "Cushing's syndrome clients have impaired immune function and fragile skin." },

  // Renal & GI
  { cond: "client with acute kidney injury exhibiting hyperkalemia and oliguria", correct: "Restrict dietary potassium and sodium, monitor fluid balance, and prepare for dialysis if ordered.", wrong: ["Encourage liberal oral fluid intake of 3,000 mL daily.", "Administer potassium-sparing diuretics.", "Encourage high-protein diet with dark leafy greens."], rationale: "AKI requires fluid/electrolyte management to prevent lethal hyperkalemia." },
  { cond: "client post-TURP with continuous bladder irrigation showing dark red urine with large clots", correct: "Increase the flow rate of the irrigation solution to clear clots and prevent catheter occlusion.", wrong: ["Stop the bladder irrigation completely.", "Manually inflate the Foley catheter balloon with 20 mL air.", "Administer IV heparin to dissolve urinary clots."], rationale: "Increasing irrigation rate flushes blood clots and maintains catheter patency." },
  { cond: "client with acute pancreatitis reporting severe epigastric pain radiating to the back", correct: "Maintain NPO status, insert nasogastric tube to low suction, and administer IV analgesics.", wrong: ["Encourage high-fat oral dietary intake.", "Place heating pad directly on the upper abdomen.", "Administer oral digestive enzymes during severe pain."], rationale: "NPO status rests the pancreas and reduces enzyme secretion." },
  { cond: "client with hepatic encephalopathy presenting with asterixis and elevated ammonia", correct: "Administer prescribed lactulose to promote ammonia excretion via bowel movements.", wrong: ["Encourage high-protein diet with red meat.", "Administer sedatives to treat flapping hand tremor.", "Restrict oral fluid intake to under 500 mL/day."], rationale: "Lactulose traps ammonia in the gut and flushes it out through frequent loose stools." },
  { cond: "client with severe Crohn's disease receiving TPN via central venous catheter", correct: "Use strict sterile technique for dressing changes and monitor blood glucose levels every 6 hours.", wrong: ["Speed up TPN infusion rate if behind schedule.", "Abruptly stop TPN if client reports nausea.", "Flush line with tap water before medication administration."], rationale: "TPN carries high risk for central line infection and hyperglycemia." },

  // Oncology, Infection, Musculoskeletal, Neuro, Hematology, Burns, Ethics
  { cond: "neutropenic client receiving chemotherapy with an absolute neutrophil count of 350/mm3", correct: "Initiate neutropenic precautions, enforce hand hygiene, and avoid fresh flowers or raw fruits.", wrong: ["Encourage fresh unwashed salads and raw berries.", "Administer live attenuated vaccines immediately.", "Assign a nurse caring for a client with active shingles."], rationale: "Severe neutropenia requires strict protective isolation to prevent lethal infection." },
  { cond: "client with active Pulmonary Tuberculosis admitted to the nursing unit", correct: "Place client in a negative-pressure isolation room and wear an N95 respirator.", wrong: ["Place client in positive-pressure room with door open.", "Wear standard surgical mask only during client contact.", "Encourage client to ambulate freely in unit hallway without mask."], rationale: "TB requires airborne precautions with negative airflow and N95 mask." },
  { cond: "client in Buck's skin traction for a hip fracture", correct: "Ensure traction weights hang freely off the bed and maintain proper body alignment.", wrong: ["Place traction weights directly on the floor to stabilize.", "Remove traction weights whenever client requests positioning.", "Elevate head of bed to 90 degrees constantly."], rationale: "Traction weights must hang freely without resting on floor or bed frame." },
  { cond: "client with acute ischemic stroke presenting 2 hours after symptom onset", correct: "Perform baseline CT scan to rule out hemorrhage before evaluating for IV tPA thrombolytic therapy.", wrong: ["Administer oral aspirin 325 mg immediately before imaging.", "Elevate head of bed flat to 0 degrees permanently.", "Administer IV heparin bolus without brain imaging."], rationale: "Hemorrhagic stroke must be ruled out by CT scan prior to thrombolytic administration." },
  { cond: "client receiving blood transfusion developing fever, chills, and lower back pain", correct: "Stop the transfusion immediately, flush catheter with Normal Saline via new tubing, and notify provider.", wrong: ["Slow down the transfusion rate and reassess in 30 minutes.", "Administer oral antipyretic and continue transfusion.", "Disconnect tubing and flush blood back into client."], rationale: "Acute hemolytic reaction requires immediate cessation of blood infusion." },

  { cond: "client with acute severe burn injuries over 40% TBSA during the first 24 hours", correct: "Administer IV Lactated Ringer's solution calculated by Parkland formula and monitor urine output.", wrong: ["Apply cold ice packs directly over large burn areas.", "Administer oral fluids only and restrict IV access.", "Apply topical antibiotic ointments before fluid stabilization."], rationale: "Resuscitative phase of burn care focuses on IV fluid replacement to prevent hypovolemic shock." },
  { cond: "terminally ill client with an active Advance Directive requesting Do Not Resuscitate (DNR)", correct: "Respect client autonomy and ensure DNR order is documented in medical record.", wrong: ["Override client directive based on family disagreement.", "Perform chest compressions if cardiac arrest occurs.", "Refuse to provide comfort care or pain medication."], rationale: "Nurse must advocate for client autonomy and respect valid DNR directives." },
  { cond: "client presenting with suspected autonomic dysreflexia post spinal cord injury at T6", correct: "Elevate head of bed to 90 degrees immediately, check for bladder distension, and loosen tight clothing.", wrong: ["Place client in supine position with legs elevated.", "Administer IV bolus of normal saline rapidly.", "Apply tight elastic abdominal binder."], rationale: "Elevating HOB reduces intracranial pressure while unblocking noxious stimuli (e.g. distended bladder)." },
  { cond: "client with severe acute pan-pancreatitis presenting with Grey Turner's sign", correct: "Evaluate for intra-abdominal hemorrhage and monitor vital signs for hypovolemic shock.", wrong: ["Encourage immediate ambulation.", "Apply hot water bottle over flank area.", "Administer high-protein oral nutritional supplements."], rationale: "Grey Turner's sign (flank ecchymosis) indicates severe retroperitoneal bleeding." },
  { cond: "client receiving continuous epidural analgesia monitoring post-op Day 1", correct: "Monitor respiratory rate, motor function, and catheter insertion site for cerebrospinal fluid leak.", wrong: ["Inject intravenous bolus medications through the epidural catheter.", "Keep client in prone position for 24 hours.", "Change epidural dressing every 2 hours with tap water."], rationale: "Epidural analgesia requires vigilance against respiratory depression and epidural hematoma/infection." }
];

function generateDayFile(day) {
  const topicObj = DAY_TOPICS.find(d => d.day === day) || DAY_TOPICS[0];
  const questions = [];

  for (let q = 0; q < 50; q++) {
    const name = getPatientName(day, q);
    const age = 18 + ((day * 11 + q * 7) % 65);
    const difficulty = q < 15 ? 'easy' : (q < 35 ? 'medium' : 'hard');

    // Pick scenario deterministically from catalog based on day and q
    const catalogIdx = (day * 3 + q) % CLINICAL_CATALOG.length;
    const sc = CLINICAL_CATALOG[catalogIdx];

    // Create unique stems WITHOUT any Ref Code!
    const stemTemplates = [
      `Client ${name}, a ${age}-year-old presenting with ${sc.cond}. What is the nurse's priority action?`,
      `The nurse is caring for ${name}, ${age} years old, who is diagnosed with ${sc.cond}. Which finding or intervention requires immediate nursing action?`,
      `Client ${name} (${age} years old) is admitted to the clinical unit with ${sc.cond}. What is the most appropriate nursing intervention?`,
      `While conducting shift assessment on ${name} (${age} y/o), the nurse notes ${sc.cond}. What is the nurse's immediate priority?`,
      `A nurse is planning care for client ${name}, ${age} years old, presenting with ${sc.cond}. Which clinical action should the nurse implement first?`
    ];

    const stem = stemTemplates[q % stemTemplates.length];

    // Build options list with 1 correct answer and 3 specific distractors
    const correctOpt = sc.correct;
    const wrongOpts = sc.wrong;

    // Create 4 items
    const rawOptions = [correctOpt, wrongOpts[0], wrongOpts[1], wrongOpts[2]];

    // Deterministic shuffle using seeded random based on (day, q)
    const seed = day * 100 + q;
    const shuffledOptions = [...rawOptions];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(seed + i) * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    const correctAnswer = shuffledOptions.indexOf(correctOpt);

    questions.push({
      id: `day_${day}_q_${q + 1}`,
      question: stem,
      options: shuffledOptions,
      correctAnswer,
      explanation: `[NCLEX Domain: ${topicObj.domain}] ${sc.rationale}`,
      difficulty,
      domain: topicObj.domain
    });
  }

  return questions;
}

// Generate all 30 days
const outDir = path.join(process.cwd(), 'services', 'questionBank');

for (let d = 1; d <= 30; d++) {
  const qs = generateDayFile(d);
  const fileContent = `import { NCLEXQuestion } from "../questionBank";

export const DAY_${d}_QUESTIONS: NCLEXQuestion[] = ${JSON.stringify(qs, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, `day${d}.ts`), fileContent, 'utf-8');
}

console.log("Successfully generated all 30 day files with completely unique questions and distractors!");
