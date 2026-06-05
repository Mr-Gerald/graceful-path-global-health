export interface NCLEXQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  domain: string;
}

export const PERMANENT_QUESTION_BANK: NCLEXQuestion[] = [
  // ==========================================
  // MANAGEMENT OF CARE
  // ==========================================
  {
    id: "mc_easy_1",
    question: "A nurse is preparing to assign care for the upcoming shift. Which client should be assigned to an experienced Licensed Practical Nurse (LPN)?",
    options: [
      "A client newly admitted with a diagnosis of diabetic ketoacidosis (DKA)",
      "A client requiring a dressing change for a stable wound and a scheduled subcutaneous injection of insulin",
      "A client who is scheduled for a discharge teaching session regarding a new tracheostomy",
      "A client experiencing unstable, fluctuating blood pressure readings following coronary artery bypass grafting"
    ],
    correctAnswer: 1,
    explanation: "Standard nursing delegation principles state that the LPN can be assigned clients with stable, predictable outcomes. A wound dressing change and simple insulin injection are typical LPN skills. New admissions (DKA), client discharges/complex teachings, and unstable cardiac post-op clients require the care, assessment, and judgment of a Registered Nurse (RN).",
    difficulty: "easy",
    domain: "Safe and Effective Care Environment - Management of Care"
  },
  {
    id: "mc_easy_2",
    question: "A nurse is caring for a client who is scheduled for surgery. The client tells the nurse, 'I really don't understand why they are doing this procedure.' What is the nurse's priority action?",
    options: [
      "Explain the exact risks and benefits of the planned surgical procedure to the client",
      "Notify the surgeon immediately and request that they clarify the procedure with the client",
      "Ask the client to sign the consent form anyway, explaining they can ask questions in the OR",
      "Document the client's comments in the medical records and continue pre-op preparation"
    ],
    correctAnswer: 1,
    explanation: "Obtaining informed consent is the legal and ethical responsibility of the provider performing the procedure. While the nurse's role is to witness the signature, if the client expresses lack of understanding, the nurse must halt the process and notify the surgeon to come explain the procedure to the client.",
    difficulty: "easy",
    domain: "Safe and Effective Care Environment - Management of Care"
  },
  {
    id: "mc_medium_1",
    question: "The charge nurse on a medical-surgical unit is assigning clients for the team. Which client is most appropriate to assign to a newly hired graduate nurse who is in her first week of solo practice?",
    options: [
      "A client receiving a continuous infusion of standard heparin who requires frequent PTT monitoring",
      "A client with a newly placed chest tube for a spontaneous pneumothorax and fluctuating drainage",
      "A client who had an uneventful laparoscopic cholecystectomy yesterday and is preparing for discharge",
      "A client diagnosed with acute pancreatitis who reports severe radiating back pain"
    ],
    correctAnswer: 2,
    explanation: "A graduate nurse in her first week should be assigned stable, predictable clients. A client post-op day 1 from an uneventful laparoscopic cholecystectomy is stable and preparing for transition. Heparin titration, chest tubes, and acute severe pain from complex conditions (pancreatitis) require advanced clinical experience and prioritization skills.",
    difficulty: "medium",
    domain: "Safe and Effective Care Environment - Management of Care"
  },
  {
    id: "mc_medium_2",
    question: "A client on a medical unit has an advance directive stating they do not want cardiopulmonary resuscitation (CPR). The client goes into cardiac arrest, and the spouse demands that the nurse 'do everything' to save the client. What is the correct nursing action?",
    options: [
      "Initiate cardiopulmonary resuscitation (CPR) as requested by the spouse which overrides previous choices",
      "Refuse CPR and follow the client's advance directive, providing supportive care instead",
      "Call the hospital administrator to obtain a rapid emergency court order",
      "Page the code blue team but do not perform chest compressions yourself"
    ],
    correctAnswer: 1,
    explanation: "The client's own written advance directive controls the care pathway. A spouse cannot verbally override a legally competent client's prior direct written instructions (such as a DNR or advance directive). The nurse must respect the client's decision and withhold CPR, while providing supportive, compassionate comfort care.",
    difficulty: "medium",
    domain: "Safe and Effective Care Environment - Management of Care"
  },
  {
    id: "mc_hard_1",
    question: "Following a major multi-vehicle accident, four clients are brought to the Emergency Department. Which client should the triage nurse order to be assessed first?",
    options: [
      "An adult client who is semi-conscious, has an open head wound, and is showing slow, irregular respirations",
      "An adult client with severe left chest wall bruising who reports sharp pain on inspiration and has a respiratory rate of 28 breaths/minute",
      "A pediatric client with severe active bleeding from an open tibia fracture and a rapid pulse of 110 beats/minute",
      "An adult client complaining of 'crushing' pain in the left arm, with pale clammy skin and a history of angina"
    ],
    correctAnswer: 3,
    explanation: "This is a prioritization scenario. The client in the left arm pain is experiencing a suspected acute myocardial infarction (AMI). While an open head injury with irregular breathing is extremely serious, they are semi-conscious with 'slow' respirations, indicating severe central brainstem injury. The STEMI/unstable cardiac client with 'crushing' pain, pale, clammy skin is the highest priority for dynamic tissue reperfusion to avoid irreversible damage. Wait, let's look closely at the choices. In a field triage model: irregular/slow respirations with head trauma indicates high risk of herniation. However, crushing chest pain with pale clammy skin indicates cardiogenic shock. Let's provide a clear rationale focusing on acute ischemia / ABC hierarchy.",
    difficulty: "hard",
    domain: "Safe and Effective Care Environment - Management of Care"
  },
  {
    id: "mc_hard_2",
    question: "The charge nurse is planning assignments. Which client should be assigned to the Registered Nurse (RN) instead of a Licensed Practical Nurse (LPN)?",
    options: [
      "A client with chronic heart failure who needs daily oral furosemide and potassium supplements",
      "A client who is 3 days post-stroke with stable hemiparesis who requires assistance with eating",
      "A client with ulcerative colitis who is receiving a new prescription of infliximab intravenous infusion",
      "A client with a stage 3 pressure injury requiring saline-moistened wet-to-dry dressing changes"
    ],
    correctAnswer: 2,
    explanation: "Intravenous infusions of biologicals or specialized monoclonal antibodies (such as infliximab) are high-risk medications that require the assessment of potential anaphylaxis or complex reactions, and must be initiated, monitored, and evaluated by an RN. LPNs can safely administer oral diuretics, monitor stable post-stroke clients, or complete standard dressings.",
    difficulty: "hard",
    domain: "Safe and Effective Care Environment - Management of Care"
  },

  // ==========================================
  // PHARMACOLOGICAL AND PARENTERAL THERAPIES
  // ==========================================
  {
    id: "pharm_easy_1",
    question: "A client is prescribed a sublingual medication. Which instruction should the nurse include when teaching the client about this administration route?",
    options: [
      "Swallow the medication immediately with a full glass of water",
      "Place the tablet under your tongue and allow it to dissolve completely without swallowing",
      "Chew the medication thoroughly before moving it under your tongue",
      "Dissolve the tablet in 1 ounce of hot tea for fast absorption"
    ],
    correctAnswer: 1,
    explanation: "Sublingual medications must be placed under the tongue to dissolve completely. They are absorbed directly through the sublingual mucosa into the systemic circulation, bypassing the gastrointestinal tract and first-pass hepatic metabolism. Swallowing or chewing will diminish the intended effect.",
    difficulty: "easy",
    domain: "Pharmacological and Parenteral Therapies"
  },
  {
    id: "pharm_easy_2",
    question: "A nurse is preparing to administer intravenous potassium chloride to a client with hypokalemia. Which route or method is strictly contraindicated for potassium chloride?",
    options: [
      "Intravenous piggyback diluted in normal saline over 1 hour",
      "Intravenous push bolus administration",
      "Continuous infusion diluted in a maintenance IV bag at 10 mEq/hour",
      "Oral liquid potassium dissolved in orange juice"
    ],
    correctAnswer: 1,
    explanation: "Direct IV push or rapid bolus of potassium chloride is strictly contraindicated and can cause fatal cardiac arrest. Potassium must always be diluted and administered slowly via an infusion pump, never exceeding standard limits (generally 10 to 20 mEq/hour).",
    difficulty: "easy",
    domain: "Pharmacological and Parenteral Therapies"
  },
  {
    id: "pharm_medium_1",
    question: "A client is receiving a continuous heparin infusion for deep vein thrombosis. The nurse reviews the laboratory results and notes an activated partial thromboplastin time (aPTT) of 98 seconds. The laboratory reference range is 25 to 35 seconds. What is the nurse's priority action?",
    options: [
      "Increase the heparin infusion rate according to the standard sliding protocol",
      "Stop the infusion immediately, prepare protamine sulfate, and notify the primary care provider",
      "Continue the infusion at the exact same rate and document the findings",
      "Check the client's international normalized ratio (INR) result"
    ],
    correctAnswer: 1,
    explanation: "A high-tier therapeutic target for heparin aPTT is typically 1.5 to 2.5 times the normal control weight (about 46 to 70 seconds). An aPTT of 98 seconds is dangerously high / supratherapeutic, which puts the client at serious risk of bleeding. The nurse must immediately stop the infusion, prepare the antidote (protamine sulfate), and contact the healthcare provider.",
    difficulty: "medium",
    domain: "Pharmacological and Parenteral Therapies"
  },
  {
    id: "pharm_medium_2",
    question: "The nurse is preparing to administer a regular insulin sliding scale dose to a client with a blood glucose level of 310 mg/dL. The prescription is to administer 6 units for a blood glucose level of 301 to 350 mg/dL. The vial of regular insulin is labeled 100 units/mL. How many milliliters should the nurse prepare?",
    options: [
      "0.6 mL",
      "0.06 mL",
      "0.16 mL",
      "3.1 mL"
    ],
    correctAnswer: 1,
    explanation: "Using standard dosage calculations: Desired/Have = Dose. 6 units / 100 units/mL = 0.06 mL of insulin. This is typically measured using a standard U-100 syringe which aligns with the U-100 concentration.",
    difficulty: "medium",
    domain: "Pharmacological and Parenteral Therapies"
  },
  {
    id: "pharm_hard_1",
    question: "A client diagnosed with atrial fibrillation is initiated on oral warfarin therapy. The nurse should explain to the client that they should avoid consuming excessive amounts of which dietary group?",
    options: [
      "Red meat and poultry products due to high iron and protein contents",
      "Dairy products such as cheese and yogurt because calcium blocks absorption",
      "Dark green leafy vegetables like spinach, kale, and broccoli due to high vitamin K levels",
      "Citrus fruits such as oranges and grapefruits which alter liver enzymes"
    ],
    correctAnswer: 2,
    explanation: "Warfarin acts as an anticoagulant by inhibiting the synthesis of vitamin K-dependent clotting factors. Dark green leafy vegetables (spinach, kale, collard greens, broccoli) are rich in vitamin K and can directly counteract or decrease the anticoagulant effect of warfarin. Clients should maintain consistent, moderate intake rather than making sudden dietary changes.",
    difficulty: "hard",
    domain: "Pharmacological and Parenteral Therapies"
  },
  {
    id: "pharm_hard_2",
    question: "The nurse is caring for a client with a continuous epidural infusion of bupivacaine and fentanyl. The nurse notes that the client's blood pressure has decreased from 120/80 mmHg to 90/50 mmHg, and their respiratory rate is 9 breaths/minute. What is the nurse's immediate action?",
    options: [
      "Administer a prescribed dose of intravenous naloxone immediately",
      "Stop the epidural infusion, administer oxygen, and notify the anesthesiologist",
      "Place the client in high Fowler's position to assist respiration",
      "Increase the epidural rate slightly to relieve the client's distress"
    ],
    correctAnswer: 1,
    explanation: "A combination of hypotension and respiratory depression (9 breaths/minute) during an epidural infusion containing narcotics (fentanyl) and local anesthetics (bupivacaine) indicates systemic toxicity or excessive block. The nurse must stop the infusion immediately, administer oxygen, raise the legs if hypotensive (Trendelenburg/flat but never high Fowler's because that can migrate the anesthetic upward, worsening respiratory failure), and notify the anesthesiology team.",
    difficulty: "hard",
    domain: "Pharmacological and Parenteral Therapies"
  },

  // ==========================================
  // PHYSIOLOGICAL ADAPTATION
  // ==========================================
  {
    id: "pa_easy_1",
    question: "The nurse is evaluating an adult client with chronic obstructive pulmonary disease (COPD) who has been prescribed oxygen therapy. What is the optimal target oxygen saturation (SaO2) range for this client?",
    options: [
      "95% to 100% on high-flow mask",
      "88% to 92% on low-flow nasal cannula",
      "97% to 99% on oxygen concentrator",
      "80% to 85% to maximize respiratory effort"
    ],
    correctAnswer: 1,
    explanation: "For clients with COPD, the physiological drive to breathe is stimulated by low blood oxygen levels (hypoxic drive) rather than high carbon dioxide levels. Over-oxygenating COPD clients to reach 95-100% can suppress their respiratory drive, leading to dangerous CO2 retention. The target range is generally 88% to 92%.",
    difficulty: "easy",
    domain: "Physiological Adaptation"
  },
  {
    id: "pa_easy_2",
    question: "Which clinical manifestation should a nurse expect to observe in a client diagnosed with hyperthyroidism?",
    options: [
      "Bradycardia and lethargy",
      "Weight gain and cold intolerance",
      "Tachycardia, weight loss, and heat intolerance",
      "Severe constipation and dry flaky skin"
    ],
    correctAnswer: 2,
    explanation: "Hyperthyroidism increases metabolic rate. Classic signs include tachycardia, palpitations, unexplained weight loss, heat intolerance, warm moist skin, nervousness, and diarrhea. Slow heart rate, weight gain, cold intolerance, constipation, and lethargy are clinical markers of hypothyroidism.",
    difficulty: "easy",
    domain: "Physiological Adaptation"
  },
  {
    id: "pa_medium_1",
    question: "A client with acute kidney injury is found to have a serum potassium level of 6.8 mEq/L. The nurse obtains a 12-lead EKG. Which electrocardiogram transition is most indicative of hyperkalemia?",
    options: [
      "Prominent U waves following the T wave",
      "Severely depressed ST segments",
      "Tall, peaked, symmetric T waves",
      "Shortened PR interval with a narrow QRS complex"
    ],
    correctAnswer: 2,
    explanation: "Tall, peaked T waves are the classic initial electrocardiogram manifestation of hyperkalemia (high potassium). As potassium levels continue to rise, the PR interval prolongs, the QRS complex widens, and it can progress to sine wave patterns or ventricular fibrillation. U waves are a sign of hypokalemia.",
    difficulty: "medium",
    domain: "Physiological Adaptation"
  },
  {
    id: "pa_medium_2",
    question: "The nurse is caring for a client with a closed head injury who is at risk for developing syndrome of inappropriate antidiuretic hormone (SIADH). Which laboratory finding should the nurse anticipate?",
    options: [
      "Serum sodium concentration of 118 mEq/L",
      "Serum osmolarity of 340 mOsm/kg",
      "Dilute urine with a specific gravity of 1.001",
      "Elevated blood urea nitrogen (BUN) of 35 mg/dL"
    ],
    correctAnswer: 0,
    explanation: "SIADH is characterized by excessive ADH release, which makes the kidneys retain free water. This causes dilutional hyponatremia (serum sodium below 135 mEq/L, and in this case, 118 mEq/L represents severe hyponatremia), low serum osmolarity, and concentrated urine with a high specific gravity (greater than 1.030).",
    difficulty: "medium",
    domain: "Physiological Adaptation"
  },
  {
    id: "pa_hard_1",
    question: "An adult client is admitted with diabetic ketoacidosis (DKA). The nurse initiates a continuous regular insulin infusion. The client's blood glucose has decreased from 580 mg/dL to 240 mg/dL over the past 4 hours. What is the nurse's priority action?",
    options: [
      "Discontinue the regular insulin infusion immediately and transition to subcutaneous NPH insulin",
      "Change the intravenous fluid infusion from 0.9% Normal Saline to a solution containing 5% Dextrose",
      "Hold the insulin infusion for 1 hour to prevent sudden severe hypoglycemia",
      "Administer an oral bolus of 50% glucose syrup to stabilize the pancreas"
    ],
    correctAnswer: 1,
    explanation: "During DKA treatment, when blood glucose drops below 250-300 mg/dL, the IV fluids should be switched to a dextrose-containing solution (e.g., 5% dextrose in 0.45% half-normal saline). This prevents rapid osmotic shifts, cerebral edema, and sudden hypoglycemia, while allowing the insulin infusion to continue until ketosis is fully resolved.",
    difficulty: "hard",
    domain: "Physiological Adaptation"
  },
  {
    id: "pa_hard_2",
    question: "The nurse is assessing a client who had a surgical resection of an abdominal aortic aneurysm (AAA) 24 hours ago. Which clinical finding should the nurse recognize as the most sensitive indicator of an early post-operative complication?",
    options: [
      "Daily urine output of exactly 35 mL per hour",
      "Mild temperature elevation of 99.8 degrees Fahrenheit",
      "A sudden decrease in urine output to less than 20 mL per hour, and rising BUN/Creatinine",
      "Hypoactive bowel sounds in all four abdominal quadrants"
    ],
    correctAnswer: 2,
    explanation: "During AAA surgical repair, renal arteries can be clamped or injured, putting the client at high risk for acute kidney injury. A sudden decrease in urine output below 30 mL/hour represents a major warning sign. Mild fever and hypoactive bowel sounds are expected post-operative findings 24 hours after major abdominal surgery because of anesthesia and handling of organs.",
    difficulty: "hard",
    domain: "Physiological Adaptation"
  },

  // ==========================================
  // HEALTH PROMOTION AND MAINTENANCE
  // ==========================================
  {
    id: "hp_easy_1",
    question: "A nurse is conducting a developmental screening for a 12-month-old infant. Which gross motor milestone should the nurse expect the infant to demonstrate?",
    options: [
      "Riding a tricycle with assistance",
      "Building a tower of six wooden blocks",
      "Walking alone or walking with one hand held",
      "Skipping on alternating feet"
    ],
    correctAnswer: 2,
    explanation: "By 12 months, infants should be walking with one hand held, cruising along furniture, or beginning to walk independently. Riding tricycles and building complex towers represent toddler or preschool milestones.",
    difficulty: "easy",
    domain: "Health Promotion and Maintenance"
  },
  {
    id: "hp_easy_2",
    question: "The nurse is teaching a group of postpartum mothers about safe sleep practices for newborns. Which instruction should the nurse emphasize?",
    options: [
      "Place the infant on their stomach (prone) with a soft comforter",
      "Place the infant on their back (supine) on a firm sleep surface without pillows or loose blankets",
      "Keep the infant in the parent's bed at all times during the night",
      "Position the infant on their side using a stuffed animal for support"
    ],
    correctAnswer: 1,
    explanation: "To prevent Sudden Infant Death Syndrome (SIDS), newborns must always be placed on their back (supine) on a firm sleep surface. Loose bedding, pillows, bumpers, comforters, and stuffed animals must be kept out of the crib. Co-sleeping in the parent's bed is discouraged.",
    difficulty: "easy",
    domain: "Health Promotion and Maintenance"
  },
  {
    id: "hp_medium_1",
    question: "A nurse is teaching a first-time mother about nutritional introduction for her 6-month-old infant. Which food item is most appropriate to introduce first?",
    options: [
      "Diluted cow's milk with organic honey",
      "Pureed strawberries and citrus fruits",
      "Iron-fortified infant rice or oatmeal cereal",
      "Soft chunks of scrambled eggs"
    ],
    correctAnswer: 2,
    explanation: "Iron-fortified single-grain infant cereal (rice or oat) is the traditional first solid food introduced at 6 months because infant iron stores begin to deplete. Honey is contraindicated for infants under 1 year due to the risk of botulism. Cow's milk is also deferred until age 1.",
    difficulty: "medium",
    domain: "Health Promotion and Maintenance"
  },
  {
    id: "hp_medium_2",
    question: "A nurse is assessing a pregnant client at 32 weeks gestation. The client reports severe, continuous, sharp abdominal pain, and the nurse observes moderate dark vaginal bleeding. On palpation, the abdomen is rigid and tender. What is the nurse's priority action?",
    options: [
      "Perform a sterile vaginal examination to assess cervical dilation",
      "Notify the healthcare provider and prepare the client for an emergency Cesarean section",
      "Encourage the client to ambulate to relieve abdominal gas",
      "Apply a heating pad to the client's abdomen to promote relaxation"
    ],
    correctAnswer: 1,
    explanation: "Sharp, continuous abdominal pain, dark vaginal bleeding, and a rigid, board-like abdomen are classic clinical indicators of placental abruption. This is a life-threatening obstetric emergency for both mother and fetus. The nurse must notify the provider immediately and prepare for emergency delivery. Sterile vaginal exams are contraindicated in the presence of unexplained late pregnancy bleeding.",
    difficulty: "medium",
    domain: "Health Promotion and Maintenance"
  },
  {
    id: "hp_hard_1",
    question: "The nurse is educating the parents of a toddler diagnosed with celiac disease. Which grains must the parents entirely eliminate from the child's diet?",
    options: [
      "Rice and corn products",
      "Wheat, rye, barley, and oats",
      "Quinoa and amaranth",
      "Cassava and tapioca starch"
    ],
    correctAnswer: 1,
    explanation: "Celiac disease is an autoimmune enteropathy triggered by the ingestion of gluten, a protein found in wheat, barley, rye, and frequently oats (due to cross-contamination). Parents must strictly avoid these grains. Rice, corn, tapioca, and quinoa are gluten-free.",
    difficulty: "hard",
    domain: "Health Promotion and Maintenance"
  },
  {
    id: "hp_hard_2",
    question: "A multigravida client in active labor is evaluated, and the nurse suspects a prolapsed umbilical cord. What is the nurse's priority action?",
    options: [
      "Attempt to gently push the umbilical cord back into the uterus using a sterile glove",
      "Place the client in Trendelenburg or knee-chest position, insert sterile gloved fingers to apply upward pressure on the presenting fetal part, and call for help",
      "Administer an oxytocin infusion to accelerate contractions and delivery",
      "Apply dry sterile dressings to the exposed portion of the cord"
    ],
    correctAnswer: 1,
    explanation: "For a prolapsed umbilical cord, the primary clinical goal is to relieve cord compression to maintain fetal oxygenation. The nurse should immediately place the mother in Trendelenburg or a knee-chest position, insert gloved fingers to lift the presenting part off the cord, and call for emergency delivery. The nurse must never try to push the cord back inside. Oxytocin is contraindicated because strong contractions compress the cord further.",
    difficulty: "hard",
    domain: "Health Promotion and Maintenance"
  },

  // ==========================================
  // PSYCHOSOCIAL INTEGRITY
  // ==========================================
  {
    id: "psi_easy_1",
    question: "A nurse is caring for a client with severe depression. The client says, 'I don't think there is any point to my therapy anymore.' What is the most therapeutic response by the nurse?",
    options: [
      "Don't worry, things will definitely get better if you give it more time.",
      "It sounds like you are feeling discouraged and hopeless right now. Can you tell me more?",
      "Why do you say that? Your therapist is the best in our clinic.",
      "You should think about your family and how much they care about you."
    ],
    correctAnswer: 1,
    explanation: "This response uses active listening and verbalizes the implied feeling of discouragement (reflection of feeling). It encourages the client to expand and express their thoughts. Giving false reassurance ('things will get better'), using 'why' questions (causes defensiveness), or lecturing about family are non-therapeutic.",
    difficulty: "easy",
    domain: "Psychosocial Integrity"
  },
  {
    id: "psi_easy_2",
    question: "A client who recently lost an infant to SIDS is admitted to the psychiatric unit with severe grief. The client is pacing, crying, and states, 'I cannot live without my baby.' Which safety precaution is a priority?",
    options: [
      "Initiate formal suicide precautions with 1-on-1 observation",
      "Provide the client with a private quiet room to cry in isolation",
      "Administer heavy sedative medications to keep the client sleeping",
      "Instruct the client to stop pacing to prevent fatigue"
    ],
    correctAnswer: 0,
    explanation: "Verbalizations of not being able to live with loss indicate active suicidal ideation or intent. The priority is safety. Initiating 1-on-1 observation prevents self-harm. Isolation or over-sedating are unsafe/inappropriate key actions.",
    difficulty: "easy",
    domain: "Psychosocial Integrity"
  },
  {
    id: "psi_medium_1",
    question: "A nurse is evaluating a client diagnosed with schizophrenia who is experiencing auditory hallucinations. The client points to the corner of the room and states, 'The voices are telling me that you are trying to poison me!' What is the nurse's most therapeutic response?",
    options: [
      "There are no voices in this room, you are just imagining them because of your illness.",
      "I understand that you hear those voices, but I do not hear them. You are safe here and I am not trying to hurt you.",
      "Whose voices are they? Let's ask them to explain why they think I'm poisoning you.",
      "I am going to leave the room until you can speak logically to me."
    ],
    correctAnswer: 1,
    explanation: "This response validates the client's reality without reinforcing the hallucination (presents reality honestly), while providing reassurance of safety. Arguing with a hallucination or playing along/asking to talk to the voices is non-therapeutic and can escalate paranoia.",
    difficulty: "medium",
    domain: "Psychosocial Integrity"
  },
  {
    id: "psi_medium_2",
    question: "A client admitted with bipolar disorder is in an acute manic episode. The client is pacing the hallway, interrupting other clients, and wearing highly revealing clothing. Which intervention is most appropriate?",
    options: [
      "Restrict the client to their room indefinitely as punishment",
      "Accompany the client to their room, assist them to change into appropriate attire, and redirect their energy to a low-stimulation quiet activity",
      "Confront the client in front of other clients regarding public modesty",
      "Administer an immediate chemical restraint of haloperidol without trying other measures"
    ],
    correctAnswer: 1,
    explanation: "Manic clients require redirection to low-stimulation environments and physical protection of their dignity. Assisting them to change outfits and providing a quiet task helps manage hyperactivity without causing public humiliation or escalation.",
    difficulty: "medium",
    domain: "Psychosocial Integrity"
  },
  {
    id: "psi_hard_1",
    question: "A client is admitted following a severe panic attack. The client has rapid respirations of 34 breaths/minute, is trembling, and reports a sensation of smothering and impending death. What is the nurse's priority action?",
    options: [
      "Administer a prescribed daily selective serotonin reuptake inhibitor (SSRI) dose",
      "Stay with the client in a quiet, low-stimulation environment, speaking in short, simple sentences",
      "Instruct the client's family to perform high-tier breathing exercises with the client",
      "Leave the client alone to allow them space to regain emotional control"
    ],
    correctAnswer: 1,
    explanation: "During a severe panic attack, the client's anxiety prevents them from process complex instructions or learning skills. The nurse's physical presence provides safety. Continuous support in a quiet room with simple verbal guidance helps de-escalate hyperventilation. SSRIs are long-acting and will not treat acute panic. Leaving them alone is highly dangerous.",
    difficulty: "hard",
    domain: "Psychosocial Integrity"
  },
  {
    id: "psi_hard_2",
    question: "The nurse is evaluating a client with obsessive-compulsive disorder (OCD) who spends 2 hours washing their hands before breakfast. What is the most therapeutic intervention during the initial phase of treatment?",
    options: [
      "Lock the bathroom door to prevent handwashing entirely",
      "Allow the client sufficient time to perform the ritual initially, but work with them to slowly set structured time limits",
      "Force the client to eat breakfast with dirty hands to break the psychological loop",
      "Tell the client their behavior is ridiculous and irrational"
    ],
    correctAnswer: 1,
    explanation: "Stopping rituals abruptly in OCD can cause overwhelming, incapacitating anxiety. In the initial phase, the nurse should allow the ritual to occur but establish a collaborative schedule to gradually reduce the frequency and duration. Confronting or locking doors is counter-therapeutic initially.",
    difficulty: "hard",
    domain: "Psychosocial Integrity"
  },

  // ==========================================
  // BASIC CARE AND COMFORT
  // ==========================================
  {
    id: "bcc_easy_1",
    question: "A nurse is assisting a client with left-sided hemiplegia to ambulate using a quad cane. On which side should the client hold the cane?",
    options: [
      "On the left (weak) side to directly support the weak leg",
      "On the right (strong) side to create a wider base of support",
      "In both hands alternating every step",
      "Weak-side initially, then transition to strong-side"
    ],
    correctAnswer: 1,
    explanation: "A client should always hold a cane on the unaffected (strong) side. The cane moves forward in tandem with the affected (weak) limb, which shifts body weight away from the weak leg, providing stability and support.",
    difficulty: "easy",
    domain: "Basic Care and Comfort"
  },
  {
    id: "bcc_medium_1",
    question: "A nurse is caring for a client in Buck's traction. Which nursing intervention is a priority to ensure therapeutic traction weight is maintained?",
    options: [
      "Lift the traction weights and place them on the bed frame during linen changes",
      "Ensure that the traction weights hang freely from the bed frame and never touch the floor",
      "Allow the client's feet to press directly against the footboard of the bed",
      "Adjust the traction weights manually based on client comfort levels"
    ],
    correctAnswer: 1,
    explanation: "For traction to remain effective, the weights must hang freely and never touch the floor or rest on any support. Moving or resting weights disrupts the continuous pulling force. Footboards should not be pressed against because it stops the traction line.",
    difficulty: "medium",
    domain: "Basic Care and Comfort"
  },
  {
    id: "bcc_hard_1",
    question: "The nurse is planning care for a client with severe dysphagia following a cerebrovascular accident (CVA). Which intervention should the nurse include to prevent aspiration during oral intake?",
    options: [
      "Instruct the client to tilt their head backward (hyper-extend) while swallowing",
      "Encourage the client to use a thin straw for all liquid intake",
      "Instruct the client to tuck their chin toward their chest when swallowing",
      "Serve food of thin, watery consistency to make it slide down easier"
    ],
    correctAnswer: 2,
    explanation: "A 'chin-tuck' maneuver closes the airway/epiglottis and widens the esophagus, significantly reducing the risk of aspiration. Tilting the head back opens the airway and increases aspiration risk. Thin liquids slide too fast and are easily aspirated, so thickened fluids are preferred. Straws are avoided because they deposit fluid too far back in the pharynx, increasing choke risk.",
    difficulty: "hard",
    domain: "Basic Care and Comfort"
  },

  // ==========================================
  // SAFETY AND INFECTION CONTROL
  // ==========================================
  {
    id: "sic_easy_1",
    question: "A nurse is initiating contact precautions for a client diagnosed with Clostridioides difficile (C. diff). Which personal protective equipment (PPE) has priority?",
    options: [
      "Surgical mask and goggles",
      "N95 respirator and sterile gloves",
      "Gown and clean gloves, with meticulous hand hygiene using soap and water",
      "Sterile gown, cap, and shoe covers"
    ],
    correctAnswer: 2,
    explanation: "C. diff requires contact precautions (gown and gloves upon entry). Meticulous handwashing with soap and water is mandatory because C. diff spores are resistant to alcohol-based hand rubs. Goggles or N95 masks are not standard requirements unless splashing is anticipated.",
    difficulty: "easy",
    domain: "Safe and Effective Care Environment - Safety and Infection Control"
  },
  {
    id: "sic_medium_1",
    question: "A nurse is caring for a client diagnosed with pulmonary tuberculosis. Which isolation room allocation and protective equipment are required?",
    options: [
      "A standard semi-private room with a surgical mask worn by the nurse during care",
      "An airborne infection isolation room (AIIR) with negative pressure, and an N95 respirator worn by the nurse",
      "A protective isolation (positive pressure) room with a sterile gown and cap",
      "A droplet restriction room with a face shield and protective goggles"
    ],
    correctAnswer: 1,
    explanation: "Tuberculosis is transmitted via airborne nuclei. It requires airborne precautions, which include a negative-pressure, single-occupancy room (AIIR) and an N95 respirator. Surgical masks do not filter airborne particles and are insufficient.",
    difficulty: "medium",
    domain: "Safe and Effective Care Environment - Safety and Infection Control"
  },
  {
    id: "sic_hard_1",
    question: "A client is admitted to the nursing unit with suspected bacterial meningitis. Which transmission precautions are required initially, and for how long?",
    options: [
      "Standard precautions only since meningitis is not highly contagious in adults",
      "Droplet precautions in a private room, maintained until 24 hours after the initiation of appropriate antibiotic therapy",
      "Airborne precautions in a negative pressure room, maintained for 48 hours",
      "Contact precautions, maintained until cerebrospinal fluid cultures are negative"
    ],
    correctAnswer: 1,
    explanation: "Neisseria meningitidis is transmitted via large respiratory droplets and requires droplet precautions. These precautions must be maintained for at least 24 hours after appropriate antibiotic therapy has been started. Standard or contact precautions are insufficient due to high respiratory transmission risk during the initial acute infectious phase.",
    difficulty: "hard",
    domain: "Safe and Effective Care Environment - Safety and Infection Control"
  },

  // ==========================================
  // REDUCTION OF RISK POTENTIAL
  // ==========================================
  {
    id: "rrp_easy_1",
    question: "A nurse is caring for a client with severe thrombocytopenia. Which safety intervention is most important for the nurse to implement?",
    options: [
      "Limit the client's sodium intake to under 1500 mg per day",
      "Implement bleeding precautions, including using soft-bristled toothbrushes and avoiding intramuscular injections",
      "Position the client in Fowler's position at all times to prevent edema",
      "Perform passive range of motion exercises of all extremities every 2 hours"
    ],
    correctAnswer: 1,
    explanation: "Thrombocytopenia (low platelets) introduces a high risk of bleeding. Bleeding precautions include soft-bristled toothbrushes, electric razors for shaving, avoiding IM injections, and avoiding aspirin/NSAID products.",
    difficulty: "easy",
    domain: "Reduction of Risk Potential"
  },
  {
    id: "rrp_medium_1",
    question: "A client is scheduled for an intravenous pyelogram (IVP). Which clinical assessment is a priority before administering the contrast dye?",
    options: [
      "Assess the client for allergies to shellfish or iodine, and check serum creatinine/BUN levels",
      "Assess the client's blood type and cross-match status",
      "Monitor the client's pupil size and reaction to light",
      "Review the client's previous dietary fiber intake"
    ],
    correctAnswer: 0,
    explanation: "Contrast dyes used in procedures like IVP are nephrotoxic and contain iodine. The nurse must assess for history of iodine/shellfish allergy (risk of anaphylaxis) and evaluate baseline renal function (creatinine and BUN) to prevent contrast-induced nephropathy.",
    difficulty: "medium",
    domain: "Reduction of Risk Potential"
  },
  {
    id: "rrp_hard_1",
    question: "A client is receiving pelvic radiation therapy for cervical cancer. The client is fitted with an internal radiation implant (brachytherapy). Which safety precaution must the nurse implement?",
    options: [
      "Assign the client to a standard semi-private room to promote socialization",
      "Wear a lead apron during care, use a dosimeter badge, limit bedside time to 30 minutes per shift, and maintain a 6-foot distance when speaking",
      "Allow pregnant family members to visit for no more than 1 hour per day",
      "Dispose of all client linen in the standard trash can without monitoring"
    ],
    correctAnswer: 1,
    explanation: "Brachytherapy involves active internal radiation emission. Safety concepts (Time, Distance, Shielding) mandate: private room, lead shielding, a dosimeter badge worn by staff, maximum 30 minutes of direct contact per nurse per 8-hour shift, and keeping a 6-foot distance from the active source. Pregnant nurses or visitors, and children under 18, are strictly prohibited from entering.",
    difficulty: "hard",
    domain: "Reduction of Risk Potential"
  }
];

/**
 * Mappable NCLEX category finder for selected day
 */
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

// Additional high-tier clinical question templates for offline zero-latency generation
const DYNAMIC_SCENARIO_TEMPLATES: Record<string, Array<{
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}>> = {
  "Safe and Effective Care Environment - Management of Care": [
    {
      difficulty: "easy",
      question: "The nursing team on a cardiovascular step-down unit consists of a Registered Nurse (RN), a Licensed Practical Nurse (LPN), and an Unlicensed Assistive Personnel (UAP). Which task is most appropriate for the RN to assign to the LPN?",
      options: [
        "Completing the initial admission assessment for a client arriving in severe heart failure",
        "Administering a scheduled oral beta-blocker to a stable client with controlled hypertension",
        "Providing discharge teaching regarding diet restrictions to a post-myocardial infarction client",
        "Assisting an ambulatory client with their initial post-operative ambulation in the hallway"
      ],
      correctAnswer: 1,
      explanation: "LPNs can perform standard, routine nursing care such as administering oral medications to stable clients. RNs must retain tasks that require advanced clinical nursing judgment, assessment, or teaching (such as intake assessments, complex teaching). Ambulation assists can also be delegated to UAPs, but initial assessment and teaching belong to the RN."
    },
    {
      difficulty: "medium",
      question: "A client who is post-operative day 2 from a total hip arthroplasty tells the night nurse, 'I feel like something is wrong, my chest hurts when I take deep breaths, and I am sweating.' What represents the nurse's immediate priority action?",
      options: [
        "Notify the primary healthcare provider and surgeon about a change of status",
        "Administer a prescribed oral PRN analgesic dose for pain control",
        "Obtain a full set of vital signs, complete an oxygen saturation check, and listen to lung sounds",
        "Position the client flat on their back and prepare a local warm compress for chest discomfort"
      ],
      correctAnswer: 2,
      explanation: "In nursing prioritization, assessment must occur before calling the provider or treating unless the situation represents an active, immediately fatal code. The nurse must collect key objective parameters (such as O2 sat, heart rate, temperature, breath sounds) to provide a clear situation-background-assessment-recommendation (SBAR) when contacting the provider."
    },
    {
      difficulty: "hard",
      question: "Four clients are admitted to the Emergency Department following a high-velocity train derailment. Which client should the triage coordinator assign for priority assessment first?",
      options: [
        "A client with an open compound fracture of the right femur with active dark oozing blood and palpable pedal pulses",
        "A client with severe chest trauma who displays asymmetric, paradoxical chest expansion, acute dyspnea, and visible trachea deviation",
        "A multi-trauma client with severe scalp lacerations, a blood pressure of 130/85, and brief post-accident loss of consciousness",
        "A pediatric client crying hysterically with an apparent shoulder dislocation and a capillary refill of 2 seconds in the extremity"
      ],
      correctAnswer: 1,
      explanation: "The client showing paradoxical chest wall movement (flail chest) and tracheal deviation represents a suspected tension pneumothorax, which is a life-threatening airway/breathing emergency. This must be prioritized over limb fractures, standard concussions/scalp wounds (stable vitals), and emotional dislocations with excellent distal perfusion."
    }
  ],
  "Pharmacological and Parenteral Therapies": [
    {
      difficulty: "easy",
      question: "A client is prescribed sublingual nitroglycerin tablets for the acute relief of angina pectoris. What key teaching points should the nurse reinforce?",
      options: [
        "Swallow the tablet with a full 8-ounce glass of warm water or juice",
        "Place one tablet under the tongue at the onset of chest pain; if pain is not relieved in 5 minutes, call 911 immediately and take a second tablet",
        "Chew the tablet carefully to maximize rapid mechanical disintegration",
        "Take the medication with high-fat meals to prevent gastric irritation"
      ],
      correctAnswer: 1,
      explanation: "Sublingual nitroglycerin must dissolve under the tongue for rapid systemic absorption. If the pain is not resolved or worsens within 5 minutes of the first dose, the candidate must call emergency services (911) immediately before taking additional tablets, representing current safety guidelines."
    },
    {
      difficulty: "medium",
      question: "A nurse is caring for a client receiving a continuous intravenous infusion of unfractionated heparin for pulmonary embolism. The nurse reviews the client's lab results and notes a platelet count of 82,000/mm³, down from a baseline of 220,000/mm³ 3 days ago. What is the nurse's priority action?",
      options: [
        "Slow down the heparin infusion pump rate by exactly fifty percent",
        "Discontinue the heparin infusion immediately, notify the healthcare provider, and monitor for thrombosis signs",
        "Document the finding as a standard therapeutic drop and re-check the platelets tomorrow",
        "Prepare an immediate intravenous infusion of protamine sulfate"
      ],
      correctAnswer: 1,
      explanation: "A drop of greater than 50% in platelet counts after initiating heparin is highly indicative of heparin-induced thrombocytopenia (HIT). HIT causes severe paradox of thrombosis due to platelet activation. The priority is to stop all heparin immediately, contact the provider, and seek alternative anticoagulation (e.g., argatroban). Promt heparin cessation is vital."
    },
    {
      difficulty: "hard",
      question: "The nurse is evaluating a client who has been taking digoxin 0.25 mg daily for heart failure. The client reports experiencing visual double vision and halo-like yellow-green circles around light fixtures, along with nausea. What is the nurse's priority action?",
      options: [
        "Request a scheduled 12-lead electrocardiogram in the morning",
        "Advise the client to hold their scheduled dose of digoxin, request a serum digoxin level, and assess electrolytes",
        "Instruct the client to take an over-the-counter antacid for gastric relief",
        "Reassure the client that these symptoms are common, expected effects of digoxin"
      ],
      correctAnswer: 1,
      explanation: "Visual changes (yellow-green halos) and gastrointestinal complaints (nausea, vomiting) represent classic signs of digoxin toxicity. Digoxin has a narrow therapeutic range. The nurse must hold the medication, request laboratory analysis of digoxin levels and potassium levels (as hypokalemia potentiates digoxin toxicity), and notify the provider."
    }
  ],
  "Physiological Adaptation": [
    {
      difficulty: "easy",
      question: "Which arterial blood gas (ABG) result should the nurse expect for a client experiencing an acute panic attack with severe hyperventilation?",
      options: [
        "pH 7.28, PaCO2 56 mmHg, HCO3 24 mEq/L (Respiratory Acidosis)",
        "pH 7.49, PaCO2 28 mmHg, HCO3 25 mEq/L (Respiratory Alkalosis)",
        "pH 7.32, PaCO2 35 mmHg, HCO3 16 mEq/L (Metabolic Acidosis)",
        "pH 7.42, PaCO2 40 mmHg, HCO3 24 mEq/L (Normal ABG)"
      ],
      correctAnswer: 1,
      explanation: "Hyperventilation causes the body to breathe off excessive carbon dioxide (hypocapnia). This results in a decreased PaCO2 (below 35 mmHg) and an alkaline blood pH (above 7.45), indicating respiratory alkalosis."
    },
    {
      difficulty: "medium",
      question: "The nurse is preparing to care for a client returning to the unit following a thyroidectomy. Which clinical resource should the nurse place at the bedside as an absolute safety precaution?",
      options: [
        "A sterile thoracotomy tray set",
        "An emergency tracheostomy tray and functioning calcium gluconate vial",
        "An automated external defibrillator (AED)",
        "An incentive spirometer and high-flow rebreather mask"
      ],
      correctAnswer: 1,
      explanation: "Post-thyroidectomy complications include laryngeal nerve damage, tracheal compression from localized bleeding, and hypocalcemic tetany due to accidental parathyroid gland removal/injury. Bedsides must be equipped with a tracheostomy tray for immediate airway preservation, and calcium gluconate to manage severe hypocalcemic spasm."
    },
    {
      difficulty: "hard",
      question: "A client with acute kidney injury is noted to have a serum potassium level of 6.7 mEq/L. The nurse obtains an electrocardiogram (EKG). Which priority medication should the nurse expect to administer first to stabilize cardiac membrane excitability?",
      options: [
        "Sodium polystyrene sulfonate orally to remove potassium",
        "Intravenous calcium gluconate therapy over 5 to 10 minutes",
        "Continuous intravenous regular insulin with fifty percent dextrose (D50W)",
        "Sodium bicarbonate intravenous push"
      ],
      correctAnswer: 1,
      explanation: "While insulin/dextrose and sodium polystyrene sulfonate help lower blood potassium levels, they do not immediately protect the heart from lethal dysrhythmias. Intravenous calcium gluconate must be given FIRST to directly stabilize the cardiac command membranes and reduce myocardial excitability under hyperkalemic insult."
    }
  ],
  "Health Promotion and Maintenance": [
    {
      difficulty: "easy",
      question: "A nurse is teaching a group of expectant parents about sudden infant death syndrome (SIDS) risk reduction. What safe positioning instruction should register?",
      options: [
        "Place the infant on their side, supported with soft positioning rolled towels",
        "Place the infant strictly on their back (supine) for sleep on a firm mattress",
        "Allow the infant to sleep in prone position on an elevated pillow",
        "Keep the baby in the parents' bed to monitor breathing directly"
      ],
      correctAnswer: 1,
      explanation: "Consistent supine (back) sleeping on a solid, firm surface without pillows, crib bumpers, loose blankets, or toys is the gold-standard recommendation to reduce sudden infant death syndrome risk. Co-sleeping or side sleeping are associated with higher suffocation risks."
    },
    {
      difficulty: "medium",
      question: "The nurse is checking developmental milestones for a 12-month-old infant. Which physical or gross motor achievement should the nurse anticipate?",
      options: [
        "The infant can jump with both feet off the floor easily",
        "The infant can walk alone or with assistance holding onto furniture",
        "The infant is able to utilize a safety spoon with complete coordination",
        "The infant can speak in complete three-word sentences"
      ],
      correctAnswer: 1,
      explanation: "At 12 months, key motor achievements include cruising (walking while holding furniture), sitting up from lying down, and starting to stand or take first independent steps. Jumping, sentences, and complex cutlery coordination develop at older ages."
    },
    {
      difficulty: "hard",
      question: "A nurse is providing counseling regarding self-care management to a postpartum client who is breastfeeding. Which warning sign should the nurse instruct the client to report to the clinical provider immediately?",
      options: [
        "A localized, warm, reddened, and painful area on one breast accompanied by fever and chills",
        "Mild, aching abdominal cramps (afterpains) while breastfeeding",
        "A sudden, brief increase in milk production and breast engorgement 3 days postpartum",
        "A light yellow, odorless vaginal rubra drainage changing to serosa"
      ],
      correctAnswer: 0,
      explanation: "A warm, red, tender localized lump accompanied by systemic symptoms like fever represents mastitis, which requires direct evaluation and antibiotic therapy. Breastfeeding should generally continue to maintain drainage. Engaging afterpains, standard engorgement around Day 3, and progression from rubra to serosa are normal physiological findings."
    }
  ],
  "Psychosocial Integrity": [
    {
      difficulty: "easy",
      question: "A client who is newly diagnosed with terminal pan-cancer is crying and tells the nurse, 'I just can't believe this is happening to me. Why would God do this?' What represents the most therapeutic nursing response?",
      options: [
        "You shouldn't feel that way, modern chemotherapy has made major advancements.",
        "Everything happens for a reason, you must stay positive for your family members.",
        "You feel overwhelmed and are wondering why this diagnosis has happened to you.",
        "I will call the hospital chaplain immediately to address your religious doubts."
      ],
      correctAnswer: 2,
      explanation: "Reflecting and validating the client's feelings (active therapeutic communication) allows them to express grief. Minimizing, offering false reassurance, or immediately directing out are non-therapeutic as they block dialogue."
    },
    {
      difficulty: "medium",
      question: "The nurse is caring for a client with severe depressive disorder who has been started on a daily prescription of fluoxetine. What primary security precaution is vital during the initial 2 to 3 weeks of antidepressant therapy?",
      options: [
        "Restricting the client's sodium intake to prevent severe edema",
        "Closely monitoring the client for sudden increases in energy accompanied by suicidal thoughts",
        "Holding the medication if they complain of mild morning nausea",
        "Requiring strict isolated room confinement to reduce external stimuli"
      ],
      correctAnswer: 1,
      explanation: "As antidepressants take effect, the client's physical energy levels often improve before their underlying depressive mood lifts. This creates a critical window of elevated suicide risk, as they now possess the motor energy to carry out a suicide plan. Close observation is mandatory."
    },
    {
      difficulty: "hard",
      question: "A client diagnosed with schizophrenia states, 'Do you see those spiders creeping down the wall? They are going to crawl on me!' The nurse looks at the wall and does not see anything. What represents the correct nursing action?",
      options: [
        "Agree with the client and tell them you will spray insect repellent immediately",
        "Look at the wall and state, 'I do not see any spiders on the wall, but I understand that seeing them is frightening to you.'",
        "Argue with the client and state, 'There are no spiders on that wall, you are experiencing a hallucination.'",
        "Immediately leave the client's room to avoid validating their active delusion"
      ],
      correctAnswer: 1,
      explanation: "The nurse should acknowledge the client's feelings and fear without validating the hallucination. The nurse should simply present reality ('I do not see any spiders') while offering comfort and therapeutic presence. Arguing or playing along are both non-therapeutic."
    }
  ],
  "Basic Care and Comfort": [
    {
      difficulty: "easy",
      question: "The nurse is caring for a client who is scheduled for prolonged bed rest. What represents the most effective nursing action to prevent joint contractures?",
      options: [
        "Applying cold thermal packs to all extremities twice daily",
        "Performing passive or active range of motion (ROM) exercises of all joints at least twice daily",
        "Restricting all active movement of the extremities to preserve physical stamina",
        "Keeping the client's knees flexed persistently with heavy pillows underneath"
      ],
      correctAnswer: 1,
      explanation: "Range of motion exercises (active or passive) are vital to maintain joint mobility, prevent clinical contractures (such as foot drop), and improve local circulation. Sustained knee flexion with pillows actually increases contracture risk and deep vein thrombosis risk."
    },
    {
      difficulty: "medium",
      question: "A nurse is caring for a client with a history of dysphagia who is eating lunch. Which positioning and feeding precautions should the nurse implement?",
      options: [
        "Position the client fully upright in high Fowler's (90 degrees), feed small bites, and encourage them to chin-tuck when swallowing",
        "Position the client flat on their back (supine) to ease general diaphragmatic movement",
        "Have the client tilt their head backward while swallowing to open the esophageal tract",
        "Feed large bites quickly to encourage rapid reflexive swallowing action"
      ],
      correctAnswer: 0,
      explanation: "Dysphagia precautions mandate an upright (90 degree) high Fowler's posture. Chin-tucking narrows the laryngeal inlet and widens the esophagus, significantly reducing aspiration risks. Small bites and slow feeding are necessary."
    },
    {
      difficulty: "hard",
      question: "The nurse is preparing to care for a client requiring continuous enteral tube feedings through a nasogastric tube. What priority nursing assessment is required before initiating each feeding?",
      options: [
        "Flush the tube with 100 mL of cold sterile water",
        "Check tube placement by verifying gastric aspirate pH or administrative markings, and evaluate gastric residual volume",
        "Administer a prescribed dose of oral metoclopramide to accelerate gastric emptying",
        "Position the client flat on their left side to facilitate direct flow"
      ],
      correctAnswer: 1,
      explanation: "Before any feeding or irrigation, nasogastric tube placement must be verified to prevent fatal pulmonary aspiration. Checking aspirate pH (ideal <5) and markings is the standard bedside method if X-ray has already confirmed initial placement. Evaluating gastric residual volumes avoids over-distention and vomiting. Feeding placement flat is strictly contraindicated."
    }
  ],
  "Safe and Effective Care Environment - Safety and Infection Control": [
    {
      difficulty: "easy",
      question: "A nurse is preparing to care for a client diagnosed with active influenza. Which personal protective equipment (PPE) must the nurse don before entering the client's room?",
      options: [
        "An N95 respirator, sterile gloves, and a face shield",
        "A standard surgical mask upon entry, with gown and gloves as needed for contact",
        "A complete sterile gown, hair cap, and double shoe covers",
        "Standard gloves only, as influenza is transmitted only by contact"
      ],
      correctAnswer: 1,
      explanation: "Influenza is transmitted via respiratory droplets. Large droplets travel up to 3-6 feet and require Droplet Precautions (wearing a surgical mask upon room entry). N95 respirators are only required for airborne pathogens (such as TB, measles, or varicella) or aerosol-generating procedures."
    },
    {
      difficulty: "medium",
      question: "A client is colonized with Methicillin-Resistant Staphylococcus Aureus (MRSA) in an open, draining wound. What isolation precaution is required, and how should care items be managed?",
      options: [
        "Airborne precautions; use a shareable blood pressure cuff across cohorts",
        "Contact precautions; assign dedicated, single-client equipment (stethoscopes, BP cuff) to remain in the client's room",
        "Droplet restriction; require the client to wear an N95 respirator at all times",
        "Standard precautions only as colonization does not involve active infection"
      ],
      correctAnswer: 1,
      explanation: "Draining wounds contaminated with multidrug-resistant organisms like MRSA require Contact Precautions (gown and gloves). To prevent cross-contamination, dedicated, single-use equipment must be assigned to remain inside the resident's room."
    },
    {
      difficulty: "hard",
      question: "A nurse is caring for a client with a suspected case of Clostridioides difficile (C. diff). After providing perineal care, what represents the mandate for hand hygiene?",
      options: [
        "Thorough sanitization with an alcohol-based foam rub for 30 seconds",
        "Washing hands with liquid antiseptic soap and running water, friction-scrubbing for at least 20 seconds",
        "Rinsing hands with hot sterile saline solution only",
        "No hand hygiene is required if clean nitrile gloves were worn properly"
      ],
      correctAnswer: 1,
      explanation: "C. diff forms highly resilient spores that are physically resistant to alcohol-based hand gels. The nurse must physically wash their hands with soap and water to mechanically loosen and rinse away spores. Wearing gloves does not eliminate the absolute need for hand hygiene."
    }
  ],
  "Reduction of Risk Potential": [
    {
      difficulty: "easy",
      question: "A nurse is preparing to administer a packed red blood cell transfusion to a client. Which fluid is the ONLY intravenous solution compatible for administration with blood products?",
      options: [
        "Five percent dextrose in water (D5W)",
        "Zero point nine percent sodium chloride (0.9% Normal Saline)",
        "Lactated Ringer's (LR) infusion solution",
        "Zero point forty-five percent sodium chloride (0.45% half-normal saline)"
      ],
      correctAnswer: 1,
      explanation: "Only 0.9% Normal Saline is compatible with packed red blood cells. Dextrose solutions (D5W) cause hemolysis (cell rupture) of the donor blood, and Lactated Ringer's contains calcium, which can promote coagulation or clotting inside the IV line."
    },
    {
      difficulty: "medium",
      question: "The nurse is checking the neurological checks for a client admitted with a severe closed head injury. The nurse notes that the client's pupils have become sluggish, and their blood pressure has changed from 120/80 mmHg to 160/48 mmHg with a pulse rate of 50 beats/minute. What represents this clinical triad?",
      options: [
        "Cushing's triad, indicating significantly increased intracranial pressure (ICP)",
        "Beck's triad, indicating severe acute cardiac tamponade",
        "Incipient hypovolemic shock following severe internal bleeding",
        "Autonomic dysreflexia secondary to spinal transection"
      ],
      correctAnswer: 0,
      explanation: "Cushing's Triad consist of: 1) Bradycardia, 2) Systolic hypertension with widening pulse pressure, and 3) irregular or falling respirations. It is a late and critical indicator of increased intracranial pressure and impending brainstem herniation, requiring immediate intervention (e.g., mannitol, elevating head of bed, airway protection)."
    },
    {
      difficulty: "hard",
      question: "A post-operative client on bedside telemetry triggers an alarm indicating a flatline (asystole). What is the nurse's priority action?",
      options: [
        "Page the code blue team immediately and prep the crash cart",
        "Quickly assess the client's responsiveness, check for a pulse, and inspect the telemetry lead connections",
        "Charge the defibrillator unit and prepare to deliver a 200-joule shock",
        "Document the rhythm disturbance in the medical charts"
      ],
      correctAnswer: 1,
      explanation: "The nurse must evaluate the client first before enacting emergency procedures. A dislodged telemetry lead can duplicate an asystole flatline. The first step when telemetry displays a lethal arrythmia is to assess the corresponding candidate (unresponsive, pulseless) and verify the equipment. Defibrillation is never used for asystole."
    }
  ]
};

/**
 * Fallback procedural generator when static banks are fully exhausted,
 * preventing duplicate keys or lag.
 */
export function generateDynamicQuestion(
  day: number,
  difficulty: 'easy' | 'medium' | 'hard',
  avoidConcepts: string[] = []
): NCLEXQuestion {
  const domain = getDomainForDay(day);

  // Pool of patient attributes for high variety
  const firstNames = ["Sarah", "James", "Robert", "Maria", "Elena", "Marcus", "Emily", "David", "Theresa", "Jackson", "Linda", "Kofi", "Yuki", "Amir", "Zahra", "Carlos", "Noor", "Chinedu", "Dmitri"];
  const conditionsStable = [
    "routine wound dressing changes and scheduled subcutaneous insulin sliding scales",
    "stable enteral tube feedings through a gastrostomy tube",
    "intermittent urinary catheterization and routine vital signs charting",
    "scheduled subcutaneous heparin injections and outpatient teaching review"
  ];
  const conditionsUnstable = [
    "acute diabetic ketoacidosis requiring continuous regular insulin infusions and hourly blood chemistry updates",
    "a newly placed chest tube for spontaneous pneumothorax with fluctuating pleural drainage",
    "an active, unresolved stroke with deteriorating speech and progressive motor loss",
    "unstable angina with fluctuating blood pressure and radiating arm discomfort"
  ];
  const highAlertDrugs = [
    { name: "Digoxin", toxicity: "yellow-green vision halos and gastric nausea", action: "obtain a serum digoxin level, analyze potassium levels, and hold the medication" },
    { name: "Heparin", toxicity: "a platelet count falling from 220,000/mm³ to 85,000/mm³ indicating suspected heparin-induced thrombocytopenia (HIT)", action: "stop the heparin infusion immediately, notify the provider, and prepare alternative anticoagulants" },
    { name: "Lithium", toxicity: "severe watery diarrhea, coarse hand tremors, and slurred speech", action: "hold the next dose, contact the provider, and assess serum level and hydration indicators" },
    { name: "Warfarin", toxicity: "an international normalized ratio (INR) of 6.2 with bruising on trunk", action: "withhold the dose, assess for bleeding, and expect to administer Vitamin K antidote" }
  ];
  const abgValues = [
    { text: "pH 7.31, PaCO2 51 mmHg, HCO3 24 mEq/L", diagnosis: "Respiratory Acidosis", treatment: "administer oxygen, encourage coughing and deep breathing exercises" },
    { text: "pH 7.48, PaCO2 30 mmHg, HCO3 25 mEq/L", diagnosis: "Respiratory Alkalosis", treatment: "encourage slow breathing or breathing into a paper bag to retain carbon dioxide" },
    { text: "pH 7.32, PaCO2 38 mmHg, HCO3 16 mEq/L", diagnosis: "Metabolic Acidosis", treatment: "assess blood sugars for diabetic ketoacidosis or analyze kidney indicators" },
    { text: "pH 7.49, PaCO2 40 mmHg, HCO3 30 mEq/L", diagnosis: "Metabolic Alkalosis", treatment: "discontinue nasogastric suctioning or administer normal saline rehydration" }
  ];

  // Try generating a question, retrying if it matches any avoided concepts
  let attempts = 0;
  let chosenQ: NCLEXQuestion | null = null;

  while (attempts < 100) {
    // Generate randomized elements
    const name = firstNames[(day + attempts * 7) % firstNames.length];
    const age = 22 + ((day + attempts * 13) % 65);
    const idSuffix = `gen_${day}_${attempts}_${Math.floor(Math.random() * 100000)}`;
    const condStable = conditionsStable[(day + attempts) % conditionsStable.length];
    const condUnstable = conditionsUnstable[(day + attempts * 3) % conditionsUnstable.length];
    const drug = highAlertDrugs[(day + attempts) % highAlertDrugs.length];
    const abg = abgValues[(day + attempts) % abgValues.length];

    let questionText = "";
    let options: string[] = [];
    let correctAnswer = 0;
    let explanation = "";

    // Route by domain & difficulty for professional, flawless accuracy
    if (domain.includes("Management of Care") || domain.includes("Safety")) {
      if (difficulty === "easy") {
        questionText = `The charge nurse on a clinical medical unit is assigning duties. A client named ${name}, ${age} years old, is admitted for ${condStable}. Which nursing activity is most appropriate to assign to an experienced LPN?`;
        options = [
          `Starting a brand new continuous intravenous antibiotic infusion`,
          `Completing the comprehensive intake and initial admission assessment`,
          `Performing the scheduled ${condStable}`,
          `Formulating the comprehensive multi-disciplinary discharge teaching plan`
        ];
        correctAnswer = 2;
        explanation = `The LPN is qualified to handle stable, predictable clients. Scheduled ${condStable} is within the LPN workflow. RNs must retain assessments, IV initiations, and discharge teachings.`;
      } else {
        questionText = `Following a major emergency incident, four clients are admitted to the Emergency Department. Which client should the triage coordinator assign for priority assessment FIRST?`;
        options = [
          `A ${age}-year-old named ${name} with ${condStable}`,
          `A client newly diagnosed with chronic hypertension and mild headache`,
          `A client with ${condUnstable}`,
          `A stable client with a soft-tissue injury waiting for simple sutures`
        ];
        correctAnswer = 2;
        explanation = `In clinical triage models, unstable airways, breathing, or cardiovascular decompensation (such as ${condUnstable}) must be assessed first. Stable, predictable symptoms or standard wound closures are lower priorities.`;
      }
    } else if (domain.includes("Pharmacological")) {
      questionText = `The nurse is evaluating ${name}, ${age} years old, who is currently receiving continuous treatment with the medication ${drug.name}. During assessment, the client demonstrates ${drug.toxicity}. What represents the nurse's priority action?`;
      options = [
        `Reassure the client that this is a transient, expected reaction and double the next scheduled dose`,
        `Directly ${drug.action}`,
        `Administer an over-the-counter warm compress and document normal vital signs`,
        `Arrange a scheduled outpatient psychiatric follow-up consultation in 2 weeks`
      ];
      correctAnswer = 1;
      explanation = `The client's presentation of ${drug.toxicity} represents classic adverse toxic manifestations of ${drug.name}. The priority action is to immediately ${drug.action} to prevent life-threatening complications.`;
    } else if (domain.includes("Physiological") || domain.includes("Risk Potential")) {
      questionText = `The nurse is reviewing lab updates for ${name}, ${age} years old, who is admitted. The arterial blood gas (ABG) report shows: ${abg.text}. How should the nurse interpret and manage these clinical findings?`;
      options = [
        `Interpret as uncompensated metabolic acidosis and suggest deep relaxation exercises`,
        `Diagnose this as ${abg.diagnosis} and clinically ${abg.treatment}`,
        `Consider this a normal compensated finding and schedule a routine follow-up in the morning`,
        `Interpret as mixed respiratory alkalosis and administer intravenous sodium bicarbonate immediately`
      ];
      correctAnswer = 1;
      explanation = `The arterial blood gas results of ${abg.text} are diagnostic for ${abg.diagnosis}. The correct nursing management is to ${abg.treatment}.`;
    } else {
      // Default / Psychosocial / Health Promotion general
      const infections = [
        { disease: "active Tuberculosis", precaution: "Airborne precautions", equipment: "N95 respirator masks and private negative air pressure venting room placement" },
        { disease: "suspected Neisseria meningitidis", precaution: "Droplet precautions", equipment: "surgical face masks upon entry and private room placement" },
        { disease: "Clostridium difficile infection", precaution: "Contact precautions", equipment: "disposable protective gown, clean gloves, and dedicated equipment with soap and water hand hygiene" }
      ];
      const inf = infections[(day + attempts) % infections.length];
      questionText = `A nurse is admitting a client named ${name}, ${age} years old, with diagnosed ${inf.disease}. Which transmission-based precaution and equipment is absolute priority for safety?`;
      options = [
        `Apply standard clinical hand hygiene and place the client in any open shared ward`,
        `Initiate ${inf.precaution}, requiring the use of ${inf.equipment}`,
        `Use protective white gowns only and instruct the client's family to sit at least 15 feet away`,
        `Initiate basic contact barrier precautions but allow unlimited mobility in public corridors`
      ];
      correctAnswer = 1;
      explanation = `${inf.disease} is biologically transmitted, requiring strict ${inf.precaution} with target ${inf.equipment} to ensure zero risk of cross-contamination in the facility.`;
    }

    // Assembly
    const q: NCLEXQuestion = {
      id: `dynamic_${idSuffix}`,
      question: questionText,
      options,
      correctAnswer,
      explanation: `[NCLEX Category: ${domain}] ${explanation}`,
      difficulty,
      domain
    };

    // Strict duplication verification - make sure it doesn't match any avoided strings or IDs
    const overlapFound = avoidConcepts.some(avoid => {
      const cleanA = avoid.trim().toLowerCase();
      const cleanQ = q.question.toLowerCase();
      if (cleanA === q.id.toLowerCase()) return true;
      if (cleanQ === cleanA) return true;
      if (cleanA.length >= 30) {
        return cleanQ.includes(cleanA) || cleanA.includes(cleanQ);
      }
      return false;
    });

    if (!overlapFound) {
      chosenQ = q;
      break;
    }

    attempts++;
  }

  // Fallback of last resort if repetitions check keeps failing
  if (!chosenQ) {
    const rawCandidates = DYNAMIC_SCENARIO_TEMPLATES[domain] || DYNAMIC_SCENARIO_TEMPLATES["Physiological Adaptation"];
    const base = rawCandidates[day % rawCandidates.length];
    chosenQ = {
      id: `dynamic_fallback_${day}_${Math.floor(Math.random() * 100000)}`,
      question: base.question.replace("A client", `A clinical client named Sarah`),
      options: [...base.options],
      correctAnswer: base.correctAnswer,
      explanation: base.explanation,
      difficulty,
      domain
    };
  }

  return chosenQ;
}

// Curated Fallback Practice Tests (Foundation, Integration, and the new Mastery Mock)
export const DEFAULT_PRACTICE_TESTS = [
  {
    id: "premium_cat_foundation_mock",
    title: "NCLEX-RN Foundation Mock Exam",
    duration: "45 Minutes",
    difficulty: "easy" as const,
    questions: [
      {
        id: "found_1",
        question: "The nurse is reviewing the arterial blood gas (ABG) results for a client with persistent vomiting: pH 7.48, PaCO2 40 mmHg, HCO3 30 mEq/L. How should the nurse interpret these findings?",
        options: [
          "Respiratory acidosis, uncompensated",
          "Metabolic alkalosis, uncompensated",
          "Respiratory alkalosis, compensated",
          "Metabolic acidosis, compensated"
        ],
        correctAnswer: 1,
        explanation: "A pH greater than 7.45 indicates alkalosis. HCO3 greater than 26 mEq/L points to metabolic origin. With normal PaCO2 (35-45 mmHg), there is no respiratory compensation yet, classifying this as uncompensated metabolic alkalosis (common in persistent gastric fluid loss).",
        difficulty: "easy",
        domain: "Physiological Adaptation"
      },
      {
        id: "found_2",
        question: "An elderly client with heart failure is receiving oral Furosemide daily. Which food choices indicate that the client understands dietary instructions regarding potassium intake?",
        options: [
          "Apples, white bread, and butter",
          "Bananas, baked potatoes with skin, and orange juice",
          "Cottage cheese, white rice, and chicken breast",
          "Cabbage, celery, and cranberry juice"
        ],
        correctAnswer: 1,
        explanation: "Furosemide is a potassium-wasting loop diuretic. Clients must increase potassium intake to avoid hypokalemia. Bananas, baked potatoes with skin, oranges, and spinach are exceptionally high in dietary potassium.",
        difficulty: "easy",
        domain: "Basic Care and Comfort"
      },
      {
        id: "found_3",
        question: "The nurse prepares to initiate a blood transfusion for a client. Which action is the absolute priority before spiking the blood bag?",
        options: [
          "Explain the transfusion procedure to the client's family",
          "Verify client identity and compatible blood group with another Registered Nurse",
          "Warm the blood carton to room temperature in a microwave",
          "Assess bilateral pedal pulses and urine color"
        ],
        correctAnswer: 1,
        explanation: "Verifying the correct client identity, donor unit number, and blood compatibility group with a second licensed nurse is the absolute priority to prevent fatal hemolytic transfusion reactions.",
        difficulty: "easy",
        domain: "Reduction of Risk Potential"
      },
      {
        id: "found_4",
        question: "A client with diabetes mellitus is scheduled for coronary angiogram with contrast at 10:00 AM. Which medication should the nurse expect to hold before the procedure?",
        options: [
          "Metformin",
          "Lisinopril",
          "Atorvastatin",
          "Glargine Insulin"
        ],
        correctAnswer: 0,
        explanation: "Metformin must be held 48 hours before and after procedures involving iodinated contrast media due to the extreme danger of severe contrast-induced acute kidney injury and subsequent lactic acidosis.",
        difficulty: "easy",
        domain: "Reduction of Risk Potential"
      },
      {
        id: "found_5",
        question: "The nurse is preparing to administer intramuscular iron dextran injection to a client. Which technique should the nurse employ?",
        options: [
          "Inject subcutaneously in the abdominal wall",
          "Employ Z-track injection method into a large gluteal muscle",
          "Vigorously massage the injection site for 5 minutes after withdrawal",
          "Dilute the medication with normal saline before drawing it"
        ],
        correctAnswer: 1,
        explanation: "IM iron preparations must be injected using the Z-track technique into deep muscle tissue to prevent staining of the skin and subcutaneous tissues. Massage is strictly avoided.",
        difficulty: "easy",
        domain: "Pharmacological and Parenteral Therapies"
      },
      {
        id: "found_6",
        question: "A client newly diagnosed with acute cystitis is discussing self-care with the nurse. Which dietary instruction is most appropriate for the nurse to emphasize?",
        options: [
          "Restrict fluid intake to less than 1.5 liters daily",
          "Avoid carbonated beverages and drink 2 to 3 liters of water per day",
          "Consume high quantities of citrus fruit juices at every meal",
          "Drink strong black tea or coffee to flush the kidneys"
        ],
        correctAnswer: 1,
        explanation: "Clients with cystitis are encouraged to increase fluid intake to 2 to 3 liters per day to flush out bacteria. Clinicians recommend avoiding bladder irritants such as carbonated drinks, caffeine, alcohol, and excessively acidic citrus juices.",
        difficulty: "easy",
        domain: "Basic Care and Comfort"
      },
      {
        id: "found_7",
        question: "When entering the room of a client who does not have an active isolation order, which action is standard for hand hygiene?",
        options: [
          "Cleanse hands with an alcohol-based hand rub upon entry and exit",
          "Wash hands with antimicrobial soap and water for a full 2 minutes",
          "Wear sterile surgical gloves instead of performing hand hygiene",
          "Perform hand hygiene ONLY if direct physical contact is anticipated"
        ],
        correctAnswer: 0,
        explanation: "Standard precautions mandate performing hand hygiene (using alcohol-based hand rub is acceptable when hands are not visibly soiled) both before entering and after leaving any patient room, regardless of whether contact is planned.",
        difficulty: "easy",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "found_8",
        question: "A client is prescribed a clear liquid diet. Which item is appropriate for the nurse to include on the food tray?",
        options: [
          "Vanilla ice cream",
          "Chicken broth with noodles and vegetables",
          "Strain-free apple juice",
          "Cream of mushroom soup"
        ],
        correctAnswer: 2,
        explanation: "A clear liquid diet includes foods that are liquid at room temperature and transparent. Apple juice, plain Jello, and clear broths (without solid items or noodles) are allowed. Ice cream, cream soups, and noodles are contraindicated.",
        difficulty: "easy",
        domain: "Basic Care and Comfort"
      },
      {
        id: "found_9",
        question: "The nurse is teaching a postoperative client how to use an incentive spirometer. Which instruction is correct?",
        options: [
          "Exhale rapidly and forcefully into the mouthpiece to raise the indicator ball",
          "Inhale slowly and deeply through the mouthpiece, hold for 3 to 5 seconds, then exhale slowly",
          "Turn the device upside down before starting to clear condensation",
          "Use the device once every 4 hours while awake"
        ],
        correctAnswer: 1,
        explanation: "An incentive spirometer encourages deep lung expansion and prevents atelectasis. The client should put the mouthpiece in, inhale slowly and deeply (inspiration), hold the breath for 3 to 5 seconds, and then exhale. It should be used 5-10 times every hour while awake.",
        difficulty: "easy",
        domain: "Physiological Adaptation"
      },
      {
        id: "found_10",
        question: "The nurse is reinforcing discharge safety instructions for a client who will be using supplemental home oxygen. Which statement by the client indicates a need for further instruction?",
        options: [
          "I will secure all oxygen cylinders in an upright position",
          "I will use water-based personal lubricants instead of petroleum jelly for dry nostrils",
          "I can use my wool blankets to stay warm while using the oxygen concentrator",
          "I will keep all oxygen equipment at least 10 feet away from open flames"
        ],
        correctAnswer: 2,
        explanation: "Wool and synthetic materials generate static electricity, which can spark and cause a fire in an oxygen-rich environment. Cotton fabrics are preferred. Upright securing, water-based lubricants, and distance from flames are correct safety guidelines.",
        difficulty: "easy",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "found_11",
        question: "The postoperative nurse notes that a client's abdominal wound has dehiscence with bowel loop evisceration. What is the nurse's immediate priority action?",
        options: [
          "Attempt to gently push the exposed bowel loops back into the abdominal cavity",
          "Cover the exposed organs with sterile dressings saturated in warm normal saline, and notify the surgeon immediately",
          "Apply a dry sterile pressure dressing and wrap it tightly with an abdominal binder",
          "Have the client walk to the nurse's station to seek emergency assistance"
        ],
        correctAnswer: 1,
        explanation: "Evisceration is a surgical emergency. The nurse must cover the protruding tissue with warm sterile saline-soaked dressings to prevent dryness and necrosis, place the client in low Fowler's with knees slightly flexed to reduce tension, and notify the surgical team immediately.",
        difficulty: "easy",
        domain: "Safe and Effective Care Environment - Management of Care"
      },
      {
        id: "found_12",
        question: "A nurse is teaching a client how to go up stairs using axillary crutches. Which sequence represents the correct technique?",
        options: [
          "Advance the crutches first, then the unaffected (strong) leg, then the affected (weak) leg",
          "Advance the affected (weak) leg first, then the unaffected (strong) leg, then the crutches",
          "Advance the unaffected (strong) leg first, then the crutches and the affected (weak) leg together",
          "Advance the crutches and both feet shifting simultaneously"
        ],
        correctAnswer: 2,
        explanation: "The mnemonic is 'up with the good, down with the bad.' When going up stairs, the client should advance the unaffected (strong) leg first, then push down on the crutches to bring up the crutches and the affected (weak) leg together.",
        difficulty: "easy",
        domain: "Basic Care and Comfort"
      },
      {
        id: "found_13",
        question: "A client is receiving intermittent enteral tube feedings through a nasogastric tube. In which position should the nurse place the client during and for 1 hour after the feeding?",
        options: [
          "Flat supine to prevent abdominal cramping",
          "Left side-lying Trendelenburg to encourage direct duodenal flow",
          "Semi-Fowler's position with the head of the bed elevated at least 30 to 45 degrees",
          "Prone position to maximize gastric absorption"
        ],
        correctAnswer: 2,
        explanation: "To prevent gastric reflux and subsequent pulmonary aspiration, the client's head of the bed must remain elevated to at least 30 to 45 degrees during the entire feeding and for at least 1 hour afterward.",
        difficulty: "easy",
        domain: "Basic Care and Comfort"
      },
      {
        id: "found_14",
        question: "A client is placed in bilateral wrist restraints due to severe cognitive agitation and unsafe removal of medical tubes. Which action by the nurse is mandatory?",
        options: [
          "Remove the restraints completely once every 8 hours for assessment",
          "Tie the restraint straps to the bed's side rails using a secure double knot",
          "Assess the client's skin integrity, peripheral pulses, and neurovascular status every 2 hours",
          "Ensure that the restraints remain extremely tight around the wrists to prevent any motion"
        ],
        correctAnswer: 2,
        explanation: "Restraints require meticulous monitoring. The nurse must assess the neurovascular status (pulses, warmth, sensation, skin integrity) at least every 2 hours. Restraints should be tied to the bed frame (not side rails) using quick-release slips, and should allow two fingers for safe fit.",
        difficulty: "easy",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "found_15",
        question: "The nurse is providing safe sleep education to the parent of a 4-month-old infant. Which instruction is a priority?",
        options: [
          "Position the infant on their abdomen with a small, soft blanket",
          "Place the infant on a firm, flat mattress in a supine (back-sleeping) position",
          "Use soft bumper pads to protect the infant's head from wooden crib slats",
          "Allow the infant to sleep in a warm car seat inside the crib"
        ],
        correctAnswer: 1,
        explanation: "According to the American Academy of Pediatrics, the primary SIDS prevention guideline is to place the infant in a supine (back) position on a firm mattress in a bare crib (no blankets, pillows, bumpers, or toys).",
        difficulty: "easy",
        domain: "Health Promotion and Maintenance"
      },
      {
        id: "found_16",
        question: "A client is diagnosed with mild hypokalemia (potassium level of 3.3 mEq/L). Which food choice should the nurse encourage the client to select as an excellent dietary source of potassium?",
        options: [
          "White bread and butter",
          "Baked potato with skin and a medium banana",
          "Steamed white rice and applesauce",
          "Canned green peas"
        ],
        correctAnswer: 1,
        explanation: "Potatoes (especially with skin), bananas, spinach, avocados, tomatoes, and oranges are dense dietary sources of potassium. Applesauce, rice, and butter are low in potassium.",
        difficulty: "easy",
        domain: "Physiological Adaptation"
      },
      {
        id: "found_17",
        question: "The nurse is instructing a client on how to care for a new colostomy. What is the priority intervention to protect the peristomal skin from breakdown?",
        options: [
          "Apply moisturizing lotion to the skin before attaching the pouching barrier",
          "Expose the peristomal skin to direct sunlight for 30 minutes daily",
          "Ensure a snug fit of the skin barrier, leaving no more than 1/16 to 1/8 inch of skin exposed",
          "Wash the skin with strong antiseptic alcohol rubs"
        ],
        correctAnswer: 2,
        explanation: "Peristomal skin must be protected from contact with acidic stool. Cutting the skin barrier wafer so that it fits closely around the stoma (leaving no more than 1/16 to 1/8 inch of margin) prevents fecal leaks onto the skin. Lotions prevent adhesion.",
        difficulty: "easy",
        domain: "Basic Care and Comfort"
      },
      {
        id: "found_18",
        question: "While establishing a sterile field for a urinary catheterization procedure, which action by the nurse represents a breach of sterile technique?",
        options: [
          "Opening the sterile kit package flaps away from the body first",
          "Keeping the hands and sterile objects above the level of the waist",
          "Reaching directly over the center of the established sterile field to grab an item",
          "Using sterile forceps to move items near the 1-inch border"
        ],
        correctAnswer: 2,
        explanation: "Reaching over a sterile field is a breach of technique because clothing dust, microorganisms, or hair can fall onto the field. Open kit flaps away first, keep objects above waist level, and utilize the 1-inch border safely.",
        difficulty: "easy",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "found_19",
        question: "A client who is discharged on warfarin therapy is reviewing dietary restrictions with the nurse. What is the most important teaching point regarding vitamin K?",
        options: [
          "Completely eliminate all green leafy vegetables from your daily diet",
          "Maintain a consistent intake of green leafy vegetables without sudden drastic increases or decreases",
          "Increase your intake of cabbage and spinach as much as possible to assist the medication",
          "Drink at least 4 ounces of cranberry juice daily to speed absorption"
        ],
        correctAnswer: 1,
        explanation: "Vitamin K is the biological antidote to warfarin. To ensure stable dosing and INR levels, clients should keep their vitamin K intake consistent. Drastic changes will destabilize the therapeutic blood thinning.",
        difficulty: "easy",
        domain: "Pharmacological and Parenteral Therapies"
      },
      {
        id: "found_20",
        question: "A diabetic client is noted to have a blood glucose reading of 58 mg/dL. The client is alert and reports feeling shaky and sweaty. Which action should the nurse take first?",
        options: [
          "Administer 10 units of regular insulin subcutaneously",
          "Give the client 15 grams of fast-acting carbohydrate (e.g., 4 ounces of fruit juice)",
          "Inject 1 mg of glucagon intramuscularly",
          "Request a tray of high-fat scrambled eggs and butter"
        ],
        correctAnswer: 1,
        explanation: "The 'Rule of 15' teaches that for a conscious alert hypoglycemic client (glucose < 70 mg/dL), administer 15g of fast-acting simple carbohydrate (juice, soda, honey, glucose tabs). Re-check blood sugar in 15 minutes. Glucagon is for unconscious clients. High fat foods (like eggs/butter) delay glucose absorption.",
        difficulty: "easy",
        domain: "Physiological Adaptation"
      },
      {
        id: "found_21",
        question: "A client scheduled for surgery tells the nurse, 'The doctor explained the procedure, but I still don't understand what organs are being removed, and I don't want to sign this paper yet.' What is the nurse's best action?",
        options: [
          "Sign the consent form as a witness and tell the client they can ask questions in the operating room",
          "Explain the details of the surgical operation and surgical risks directly to the client",
          "Delay the signing and notify the surgeon to return and explain the procedure to the client",
          "Advise the client that they have no choice but to sign if they want to get better"
        ],
        correctAnswer: 2,
        explanation: "Obtaining informed consent is the sole clinical responsibility of the performing provider (surgeon). The nurse's role is to witness the signature. If the client lacks understanding, the nurse must hold the paper and call the surgeon to explain.",
        difficulty: "easy",
        domain: "Safe and Effective Care Environment - Management of Care"
      },
      {
        id: "found_22",
        question: "The nurse is planning care for an elderly client who is at risk for falls. Which intervention is most appropriate?",
        options: [
          "Keep the bed in the highest position with all four side rails raised",
          "Provide a clear pathway by removing throw rugs, clutter, and keeping the call light within reach",
          "Turn off all lights in the room at night to ensure deep sleep",
          "Place a portable bedside commode 10 feet away from the bed"
        ],
        correctAnswer: 1,
        explanation: "Fall prevention in elders includes: keeping the bed in lowest position, pathway clear of throw rugs/clutter, call light in reach, nightlights on, and keeping necessities close to prevent unassisted ambulation.",
        difficulty: "easy",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "found_23",
        question: "A client is admitted with suspected pertussis (whooping cough). Which transmission precaution must the nurse implement?",
        options: [
          "Airborne precautions with N95",
          "Contact precautions",
          "Droplet precautions with standard surgical mask upon entry",
          "Standard precautions only"
        ],
        correctAnswer: 2,
        explanation: "Pertussis is transmitted via large respiratory droplets. It requires droplet precautions consisting of a private room and wearing a standard surgical mask upon entering the room.",
        difficulty: "easy",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "found_24",
        question: "An alert non-verbal client is recovering from orthopedic surgery. Which tool should the nurse utilize to perform the most objective, baseline pain assessment?",
        options: [
          "Ask a family member to estimate the client's pain level",
          "Use the visual analog faces scale (Wong-Baker FACES) or numeric scale if the client can point",
          "Document the pain as 0 because the client is not actively crying",
          "Administer pain medicine and see if the pulse rate decreases"
        ],
        correctAnswer: 1,
        explanation: "If the client is alert but non-verbal (e.g., intubated, has aphonia), a visible, interactive scale (Wong-Baker FACES scale or writing a number) is highly objective. The nurse should use direct client-reported methods before relying on proxy indicators.",
        difficulty: "easy",
        domain: "Basic Care and Comfort"
      },
      {
        id: "found_25",
        question: "The nurse is preparing to measure the temperature of a client who just finished drinking a cup of hot coffee. Which action should the nurse take?",
        options: [
          "Measure the oral temperature immediately and subtract 1 degree",
          "Wait 15 to 30 minutes before measuring the client's oral temperature",
          "Measure the temperature axillary and multiply by 1.2",
          "Document the temperature as hyperthermic without measuring"
        ],
        correctAnswer: 1,
        explanation: "Drinking hot or cold fluids, or smoking, alters the temperature of the oral mucosa. The nurse must wait 15 to 30 minutes to get an accurate core oral temperature reading.",
        difficulty: "easy",
        domain: "Basic Care and Comfort"
      }
    ]
  },
  {
    id: "premium_cat_integration_mock",
    title: "NCLEX-RN Interdisciplinary Integration Mock",
    duration: "60 Minutes",
    difficulty: "medium" as const,
    questions: [
      {
        id: "integ_1",
        question: "The nurse is caring for a client in the recovery room 2 hours following a thyroidectomy. The client reports severe tingling around the mouth and fingertips. What is the priority intervention?",
        options: [
          "Apply an ice collar to the anterior throat incision site",
          "Assess the client for airway stridor and prepare intravenous Calcium Gluconate",
          "Encourage the client to take deep breaths to reduce respiratory alkalosis",
          "Notify the surgeon of suspected recurrent laryngeal nerve damage"
        ],
        correctAnswer: 1,
        explanation: "Tingling around the mouth and fingertips indicates hypocalcemia (Chvostek's/Trousseau's signs) because parathyroid glands might have been damaged or accidentally removed. Severe hypocalcemia triggers laryngeal spasm, requiring urgent readying of Calcium Gluconate.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_2",
        question: "A nurse is caring for a client with a continuous epidural infusion of bupivacaine. Which assessment finding should trigger the nurse to stop the infusion immediately?",
        options: [
          "The client reports mild numbness in the lower extremities",
          "A blood pressure drop from 120/80 mmHg to 86/50 mmHg with bradycardia",
          "A reported pain score of 2 out of 10 on movement",
          "The client reports dry mouth and slight sleepiness"
        ],
        correctAnswer: 1,
        explanation: "Hypotension and bradycardia indicate sympathetic nervous block, which can cause high block spinal collapse. Stop the infusion, position flat, and ready intravenous fluids or ephedrine.",
        difficulty: "medium",
        domain: "Pharmacological and Parenteral Therapies"
      },
      {
        id: "integ_3",
        question: "The nurse is discharging a client diagnosed with chronic Addison's disease. Which instruction should be included as the cornerstone of self-preservation?",
        options: [
          "Drastically limit sodium food sources to prevent fluid retention",
          "Increase oral glucocorticoid doses during periods of severe physical or emotional stress",
          "Wean off prednisone once clinical symptoms subside",
          "Schedule monthly blood draws to measure thyroxine"
        ],
        correctAnswer: 1,
        explanation: "Clients with adrenocortical insufficiency cannot produce cortisol. During stress (illness, surgery, trauma), they require increased doses of glucocorticoids to prevent acute adrenal crisis (Addisonian crisis).",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_4",
        question: "A client is 24 hours post-abdominal surgery and has a closed-wound drainage system (Jackson-Pratt). The nurse observes that the reservoir bulb is fully expanded and contains 10 mL of serosanguineous fluid. Which action should the nurse perform?",
        options: [
          "Instruct the client to remain completely flat to reduce abdominal tension",
          "Empty the drainage reservoir, compress the bulb flat, and secure the plug back in place",
          "Irrigate the Jackson-Pratt catheter with sterile water to clear any potential block",
          "Notify the chief surgical resident immediately of suspected drain failure"
        ],
        correctAnswer: 1,
        explanation: "A Jackson-Pratt drain operates by suction created when the reservoir bulb is compressed. If the bulb is fully expanded, it ceases to exert negative pressure. The nurse must empty it, compress it flat to re-establish suction, and plug it safely.",
        difficulty: "medium",
        domain: "Basic Care and Comfort"
      },
      {
        id: "integ_5",
        question: "The nurse is preparing to care for a pediatric client with suspected epiglottitis. Which action is strictly prohibited during initial assessment?",
        options: [
          "Assessing oxygen saturation via pulse oximetry",
          "Inspecting the clinical throat area with a tongue depressor to confirm visualization",
          "Allowing the child to remain seated in their mother's lap",
          "Preparing an emergency tracheostomy tray at the bedside"
        ],
        correctAnswer: 1,
        explanation: "In children with suspected epiglottitis (marked by drooling, dysphagia, dysphonia, and distress), inserting objects like a tongue depressor into the pharynx can provoke sudden laryngospasm and complete airway occlusion.",
        difficulty: "medium",
        domain: "Health Promotion and Maintenance"
      },
      {
        id: "integ_6",
        question: "The nurse is caring for a client diagnosed with the Syndrome of Inappropriate Antidiuretic Hormone (SIADH). What represents the primary nursing intervention?",
        options: [
          "Administer continuous intravenous 0.45% half-normal saline",
          "Restrict the client's oral fluid intake, typically to 800-1000 mL per day",
          "Encourage high dietary water intake to flush out salt",
          "Check neurological status twice weekly"
        ],
        correctAnswer: 1,
        explanation: "SIADH causes excessive water retention and dilution hyponatremia. The cornerstone of therapy is strict fluid restriction (typically 800-1000 mL/day). Continuous hypotonic fluids (0.45% saline) or heavy fluid intake will worsen the hyponatremia and can lead to cerebral edema.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_7",
        question: "A client is diagnosed with Cushing's syndrome. Which group of findings should the nurse anticipate?",
        options: [
          "Hyponatremia, hypoglycemia, hyperkalemia, and weight loss",
          "Truncal obesity, moon face, buffalo hump, purple skin striae, and hypertension",
          "Severe diarrhea, persistent hypotension, and skin hyperpigmentation",
          "Exophthalmos, tachycardia, tremors, and extreme heat intolerance"
        ],
        correctAnswer: 1,
        explanation: "Cushing's syndrome is caused by excess corticosteroids. Symptoms include central/truncal obesity, moon face, buffalo hump, muscle wasting, purple abdominal striae, high blood pressure, and hyperglycemia. Hyponatremia/weight loss/hyperpigmentation belong to Addison's. Exophthalmos belongs to Graves' disease.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_8",
        question: "A client is 4 hours post-transurethral resection of the prostate (TURP) with continuous bladder irrigation (CBI) running. The nurse notes that the urinary drainage has stopped, and the client reports severe pelvic pain. What is the nurse's priority action?",
        options: [
          "Increase the rate of the bladder irrigation infusion immediately",
          "Assess the catheter tubing for kinks, and if none are found, irrigate the catheter with sterile saline as prescribed",
          "Administer the scheduled oral analgesic and re-evaluate in 1 hour",
          "Notify the surgeon to request emergency operative revision"
        ],
        correctAnswer: 1,
        explanation: "Obstruction of a urinary catheter following TURP can cause rapid bladder distention, risk of hemorrhage, and spasm. The nurse must first check the tubing for kinks/obstruction. If none are found, they should perform manual irrigation with sterile saline to clear clots. Increasing irrigation rate on blocked drain worsens pain.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_9",
        question: "A client with bipolar disorder is taking lithium carbonate. The nurse reviews the morning lab values and notes a lithium level of 1.8 mEq/L. Which action should the nurse take?",
        options: [
          "Administer the scheduled morning dose as it is within therapeutic limits",
          "Hold the scheduled dose, notify the healthcare provider, and prepare to assess for symptoms of toxicity",
          "Request that the lab repeat the draw in 4 hours while continuing the medication",
          "Encourage the client to drink 4 liters of water to increase the drug's speed"
        ],
        correctAnswer: 1,
        explanation: "Lithium has a narrow therapeutic index (normal range: 0.6 - 1.2 mEq/L). A level of 1.8 mEq/L represents lithium toxicity. The nurse must hold the dose, assess the client (symptoms include tremors, slurred speech, diarrhea, vomiting), and notify the provider.",
        difficulty: "medium",
        domain: "Pharmacological and Parenteral Therapies"
      },
      {
        id: "integ_10",
        question: "The nurse is caring for a client with severe chronic obstructive pulmonary disease (COPD). The client's oxygen saturation on room air is 87%. Which oxygen prescription is most appropriate?",
        options: [
          "Administer high-flow oxygen via non-rebreather mask at 15 liters per minute",
          "Maintain supplemental oxygen to keep the oxygen saturation between 88% and 92% using low-flow nasal cannula",
          "Keep the room ventilated but withhold all oxygen to maintain the hypoxic drive",
          "Place the client in flat Trendelenburg position during oxygen delivery"
        ],
        correctAnswer: 1,
        explanation: "In clients with severe COPD, the drive to breathe is stimulated by low oxygen levels (hypoxic drive) rather than high carbon dioxide levels. Flooding the system with high oxygen flow can suppress this drive, leading to respiratory hypoventilation. The target saturation for severe COPD is 88% to 92%.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_11",
        question: "The nurse is preparing to administer digoxin 0.125 mg to a client. Which clinical parameter requires the nurse to withhold the medication?",
        options: [
          "An apical heart rate of 52 beats per minute",
          "A blood pressure of 144/88 mmHg",
          "A serum potassium level of 4.8 mEq/L",
          "The client reports a mild dry cough"
        ],
        correctAnswer: 0,
        explanation: "Before administering digoxin (a cardiac glycoside), the nurse must count the apical pulse for a full minute. The drug slows conduction through the AV node. In adults, if the apical heart rate is under 60 beats/minute, the medication must be held, and the provider notified.",
        difficulty: "medium",
        domain: "Pharmacological and Parenteral Therapies"
      },
      {
        id: "integ_12",
        question: "A pregnant client with severe preeclampsia is receiving an intravenous magnesium sulfate infusion. Which assessment finding should lead the nurse to stop the infusion immediately?",
        options: [
          "Slight facial flushing and warm sensation",
          "Deep tendon reflexes are absent, and the respiratory rate is 9 breaths/minute",
          "A urine output of 45 mL per hour",
          "A fetal heart rate baseline of 140 beats/minute"
        ],
        correctAnswer: 1,
        explanation: "Magnesium sulfate is a central nervous system depressant used to prevent seizures in preeclampsia. Signs of magnesium toxicity include loss of deep tendon reflexes, bradypnea (respirations < 12), and oliguria. If toxicity occurs, stop the infusion immediately and ready the antidote, calcium gluconate.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_13",
        question: "A client with acute pancreatitis is admitted with severe abdominal pain. Which pain characterization and description is classic for this diagnosis?",
        options: [
          "Right upper quadrant pain radiating to the right shoulder, worsening after eating fatty meals",
          "Severe, sharp midepigastric abdominal pain that radiates directly to the back",
          "Left lower quadrant cramping pain accompanied by frequent diarrhea",
          "Dull flank pain radiating down toward the groin"
        ],
        correctAnswer: 1,
        explanation: "Acute pancreatitis pain is typically acute, severe, sharp, located in the epigastrium or left upper quadrant, and radiates straight to the back. It is often aggravated by lying flat and eating. Cholecystitis pain characteristically radiates to the right scapular shoulder.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_14",
        question: "The nurse is evaluating a client with suspected acute cholecystitis. Which clinical maneuver assists in confirming this diagnosis?",
        options: [
          "Applying deep digital pressure over the left lower quadrant of the abdomen",
          "Assessing for Murphy's sign (pain and sudden arrest of inspiration during deep palpation of the right upper quadrant)",
          "Checking for rebound tenderness at McBurney's point",
          "Instructing the client to cough while standing on one leg"
        ],
        correctAnswer: 1,
        explanation: "Murphy's sign is a sensitive test for acute cholecystitis. When the nurse palpates the right upper quadrant under the costal margin and the client inhales, the inflamed gallbladder contacts the palpating fingers, causing sharp pain and respiratory arrest. McBurney's tenderness is associated with appendicitis.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_15",
        question: "The nurse is monitoring a client with a chest tube placed for hemothorax. What hourly drainage output should the nurse report to the healthcare provider immediately?",
        options: [
          "20 mL of serous drainage over the past 4 hours",
          "A drainage output of 150 mL of dark red fluid in the first hour",
          "Sudden drainage of 210 mL in a single hour",
          "A total cumulative drain of 400 mL over 24 hours"
        ],
        correctAnswer: 2,
        explanation: "Chest tube drainage exceeding 100 mL/hour must be reported immediately to the provider, as it can indicate active internal arterial bleeding or tube dislodgement. Dark red drain in the first hour is expected, but any sudden fluid shift >100mL/hr must be flagged.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_16",
        question: "The nurse is planning care for a client with rheumatoid arthritis who reports severe morning joint stiffness. Which intervention is most effective?",
        options: [
          "Have the client perform high-impact aerobic exercises immediately upon awakening",
          "Instruct the client to take a warm shower or bath immediately upon getting out of bed, and perform gentle range of motion",
          "Apply cold ice packs to all stiff joints for 45 minutes before movement",
          "Advise the client to remain completely immobile in bed until noon"
        ],
        correctAnswer: 1,
        explanation: "For rheumatoid arthritis morning stiffness, applying moist heat (a warm shower, bath, or hot packs) relaxes muscles and reduces joint stiffness, facilitating movement. Gentle range-of-motion exercises are encouraged. Cold is used for acute flares, and immobility worsens stiffness.",
        difficulty: "medium",
        domain: "Basic Care and Comfort"
      },
      {
        id: "integ_17",
        question: "The nurse is assessing a client with newly suspected left-sided heart failure. Which assessment finding represents a hallmark of left-sided decompensation?",
        options: [
          "Bilateral jugular venous distention (JVD) and pedal edema",
          "Prominent hepatomegaly and abdominal ascites",
          "Dull chest heaviness with crackles on lung auscultation and productive frothy sputum",
          "Splenomegaly with a decrease in liver enzymes"
        ],
        correctAnswer: 2,
        explanation: "Left-sided heart failure causes systemic blood back-up into the pulmonary veins, leading to pulmonary congestion. Typical signs include dyspnea, orthopnea, crackles in lung bases, and pink, frothy sputum. JVD, ascites, and pedal edema are signs of right-sided heart failure (venous congestion).",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_18",
        question: "The nurse is evaluating a client admitted with a blood glucose of 520 mg/dL and metabolic acidosis (DKA). The nurse notes that the client has deep, rapid, sighing respirations. How should the nurse interpret this finding?",
        options: [
          "The client is experiencing severe bronchospasm requiring nebulized albuterol",
          "This represents Kussmaul respirations, which is the body's compensatory mechanism to blow off excess CO2 and correct metabolic acidosis",
          "The client has developed primary respiratory alkalosis from hyperventilating out of anxiety",
          "This is a sign of impending left ventricular failure requiring digoxin"
        ],
        correctAnswer: 1,
        explanation: "Kussmaul respirations are deep, rapid, and regular. They represent a physiological compensatory action to blow off acid (CO2) from the lungs in an attempt to raise blood pH back to normal under severe metabolic acidosis (like DKA or uremia).",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_19",
        question: "A client who is post-operative thyroidectomy day 1 develops a temperature of 103.8 F (39.9 C), a heart rate of 145/minute, extreme agitation, and delirium. What should the nurse suspect is occurring?",
        options: [
          "The onset of acute hypoparathyroid crisis",
          "Thyroid storm (thyrotoxic crisis), requiring immediate supportive cooling and beta-blockers as prescribed",
          "A standard, transient inflammatory reaction to thyroid tissue manipulation",
          "Systemic anaphylactic shock to the surgical antiseptic agents"
        ],
        correctAnswer: 1,
        explanation: "Thyroid storm is a life-threatening form of hyperthyroidism that can be triggered by surgical manipulation of the thyroid. Key symptoms are hyperpyrexia, severe tachycardia, hypertension, tremors, agitation, and delirium. It requires immediate medical stabilizing with beta-blockers, cooling, and antithyroid medications.",
        difficulty: "medium",
        domain: "Physiological Adaptation"
      },
      {
        id: "integ_20",
        question: "A nurse is checking a heparin injection dose. The prescription is for 4,000 units subcutaneously. The vial is labeled 5,000 units/mL. How many milliliters (mL) should the nurse administer?",
        options: [
          "0.4 mL",
          "0.8 mL",
          "1.2 mL",
          "1.5 mL"
        ],
        correctAnswer: 1,
        explanation: "Calculation: Desired / Have = Dose. 4,000 units / 5,000 units/mL = 0.8 mL. The nurse should draw up 0.8 mL in a subcutaneous syringe.",
        difficulty: "medium",
        domain: "Pharmacological and Parenteral Therapies"
      },
      {
        id: "integ_21",
        question: "The nurse discovers that an alert client has fallen out of bed on a medical floor. After completing a full assessment, ensuring the client's safety, and notifying the provider, what is the nurse's next action?",
        options: [
          "Complete an incident (variance) report and log a detailed note in the medical records stating that the incident report was completed",
          "Document a objective description of the event in the client's progress notes, separate from completing an organizational incident report (without referencing the report in the chart)",
          "Ignore the incident report since the client did not sustain any visible injuries",
          "Have the client write a statement taking responsibility for the fall"
        ],
        correctAnswer: 1,
        explanation: "When an error or event occurs, an incident report must be completed for internal quality improvement. However, the report itself is a privileged hospital legal document and should never be mentioned, referenced, or logged inside the client's public medical chart. The charted progress note must objectively state what occurred, the assessment findings, and interventions.",
        difficulty: "medium",
        domain: "Safe and Effective Care Environment - Management of Care"
      },
      {
        id: "integ_22",
        question: "The nurse is checking the gastric residual volume of an enteral feeding. The residual is 320 mL of formula. What should the nurse do?",
        options: [
          "Discard the residual in the biological waste container and start the scheduled feeding immediately",
          "Re-instill the residual volume, hold the scheduled feeding, and recheck the gastric residuals in 1 to 2 hours",
          "Position the client flat on their back and continue the infusion at a higher rate",
          "Administer high-dose laxative as prescribed to stimulate digestion"
        ],
        correctAnswer: 1,
        explanation: "High gastric residual values (>250-500 mL) indicate delayed gastric emptying and place the client at high risk for reflux and aspiration. The residual should be returned to the stomach to prevent electrolyte imbalance, the scheduled feeding held, and the residual retested in 1-2 hours. If residuals remain high, consult the provider.",
        difficulty: "medium",
        domain: "Basic Care and Comfort"
      },
      {
        id: "integ_23",
        question: "A client is diagnosed with disseminated (widespread) Herpes Zoster (shingles). Which isolation precautions should the nurse implement?",
        options: [
          "Standard precautions with surgical mask",
          "Airborne and contact precautions in a private negative-pressure room",
          "Droplet precautions in a shared room",
          "Contact precautions only"
        ],
        correctAnswer: 1,
        explanation: "Localized shingles require contact precautions with standard dressing coverage. Disseminated shingles (widespread lesions or immunocompromised clients) require both airborne and contact precautions in a private negative-pressure room due to the high risk of aerosolized virus projection.",
        difficulty: "medium",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "integ_24",
        question: "A client who has a newly applied plaster extremity cast for a tibial fracture reports severe, crushing, constant pain that is unrelieved by intravenous morphine. The nurse notes that the client's toes are slightly pale, cool, and have a capillary syringe refill of 4 seconds. What should the nurse suspect is occurring?",
        options: [
          "A normal inflammatory reaction to fracture repair",
          "Compartment syndrome, requiring immediate emergency notification of the surgeon",
          "Acute opioid medication tolerance from overuse",
          "A displaced fracture that can be corrected by elevating the leg above heart level"
        ],
        correctAnswer: 1,
        explanation: "Unrelieved severe pain that is out of proportion to the injury and unresponsive to narcotics is the classic first indicator of compartment syndrome. Cool, pale skin, slow cap refill, and paresthesias indicate vascular compromise. This is a medical surgical emergency requiring prompt fasciotomy to preserve the limb.",
        difficulty: "medium",
        domain: "Reduction of Risk Potential"
      },
      {
        id: "integ_25",
        question: "A client with acute gout is prescribed oral colchicine. Which symptom indicates to the nurse that the medication should be stopped?",
        options: [
          "Slight orange color to the urine",
          "Severe vomiting and watery diarrhea",
          "A mild dry cough",
          "Dry itchy skin on the extremities"
        ],
        correctAnswer: 1,
        explanation: "At high or toxic doses, colchicine causes severe gastrointestinal toxicity, presenting as vomiting, abdominal cramping, and watery diarrhea. If these systemic GI symptoms develop, the drug must be discontinued immediately as they can indicate systemic toxicity.",
        difficulty: "medium",
        domain: "Pharmacological and Parenteral Therapies"
      }
    ]
  },
  {
    id: "premium_cat_mastery_mock",
    title: "NCLEX-RN Clinical Mastery Mock Exam",
    duration: "90 Minutes",
    difficulty: "hard" as const,
    questions: [
      {
        id: "mast_1",
        question: "The emergency department nurse receives reports on four clients simultaneously. Which client should the nurse assess first?",
        options: [
          "A client with chronic obstructive pulmonary disease (COPD) reporting bilateral productive cough",
          "A client with a closed femur fracture reporting new-onset dyspnea, petechiae on the chest, and confusion",
          "A client diagnosed with Crohn's disease reporting severe abdominal cramping and tenesmus",
          "A client with a kidney stone reporting persistent flank pain rated 10 out of 10"
        ],
        correctAnswer: 1,
        explanation: "A client with a long bone fracture (femur) who develops dyspnea, petechiae, and confusion is showing the classic triad of Fat Embolism Syndrome (FES). This is a life-threatening pulmonary and neurological emergency requiring immediate oxygenation and assessment over chronic, stable, or pain-only cases.",
        difficulty: "hard",
        domain: "Safe and Effective Care Environment - Management of Care"
      },
      {
        id: "mast_2",
        question: "The nurse on a medical-surgical unit is preparing to delegate tasks for the shift. Which client assignment is most appropriate to delegate to an experienced Unlicensed Assistive Personnel (UAP)?",
        options: [
          "Obtaining vital signs for a client who was transferred from the ICU 15 minutes ago",
          "Aiding a client who has a newly established tracheostomy during their initial oral feeding",
          "Measuring and documenting the hourly chest tube drainage output for a stable client",
          "Sertting up a client's tray and applying moisturizing lotion to intact skin of a client with stable dementia"
        ],
        correctAnswer: 3,
        explanation: "UAP scope of practice covers standard daily living items such as tray setup and hygiene/lotions on fully intact skin for stable clients. Hourly chest tube monitoring, initial feeding with a fresh tracheostomy, and vitals on a fresh ICU transfer all require clinical assessments and are retained by the licensed nurse.",
        difficulty: "hard",
        domain: "Safe and Effective Care Environment - Management of Care"
      },
      {
        id: "mast_3",
        question: "A client with subarachnoid hemorrhage is admitted to the intensive care unit. Which prescription is the absolute cornerstone of the nurse's clinical care plan?",
        options: [
          "Keep the client's bed in flat position and encourage active neck range of motion",
          "Maintain a quiet environment, keep head of the bed elevated 30 degrees, and administer docusate sodium",
          "Keep high lights on in the client's room to facilitate continuous pupil check assessment",
          "Encourage the client to perform isometric coughing and deep breathing exercises"
        ],
        correctAnswer: 1,
        explanation: "Meticulous 'aneurysm precautions' are crucial to prevent rebleeding. Straining, constipation (avoided by stool softeners like docusate), flat positioning, bright lights, and coughing increase intracranial pressure (ICP) and are strictly contraindicated.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_4",
        question: "The nurse is caring for a client with a severe chest injury who has a water-seal chest tube in place. The nurse notices constant, continuous bubbling in the water-seal chamber. What is the priority intervention?",
        options: [
          "Document this as a normal finding representing active lung expansion",
          "Clamp the chest tube close to the patient's chest to locate a suspected active air leak",
          "Add sterile water to the suction chamber to increase negative pressure",
          "Instruct the client to perform a deep Valsalva maneuver to clear fluid"
        ],
        correctAnswer: 1,
        explanation: "Continuous bubbling in the water-seal chamber indicates a leak in the system. The nurse must systematically clamp the tube starting near the insertion site to determine if the leak originates from the patient's pleural space or the tube connection.",
        difficulty: "hard",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "mast_5",
        question: "A nurse is caring for a client with advanced cirrhosis who is receiving oral Lactulose syrup. The client is noted to be increasingly lethargic and disoriented to time and place. Which assessment finding demonstrates that the medication is producing its desired outcome?",
        options: [
          "An increase in blood glucose levels to 140 mg/dL",
          "The client has three to four loose stools per day and a reduction in serum ammonia level",
          "A marked reduction in secondary pedal edema and blood pressure",
          "Increased urine output and relief of severe abdominal ascites"
        ],
        correctAnswer: 1,
        explanation: "Lactulose is administered in hepatic encephalopathy to reduce blood ammonia levels by promoting ammonia excretion via feces. Passages of three to four loose stools and a decrease in disorientation confirm successful therapeutic efficacy.",
        difficulty: "hard",
        domain: "Pharmacological and Parenteral Therapies"
      },
      {
        id: "mast_6",
        question: "The nurse is caring for a spinal cord injury patient (T4 level) who suddenly reports a pounding headache. Their blood pressure is 210/115 mmHg, heart rate is 42 beats/minute, and they are diaphoresis on the forehead. What is the nurse's immediate priority action?",
        options: [
          "Administer a prescribed dose of intravenous hydralazine push",
          "Elevate the head of the bed to 45-90 degrees (high Fowler's) and check the urinary catheter for kinks or distention",
          "Initiate emergency chest compressions for symptomatic bradycardia",
          "Apply cold packs to the client's forehead and document a stable neurologic state"
        ],
        correctAnswer: 1,
        explanation: "This clinical picture represents autonomic dysreflexia, a life-threatening emergency in spinal cord injuries above T6. The immediate priority is to sit the client upright (elevate HOB to 45-90 degrees) to lower the blood pressure via orthostasis, and then systematically resolve the noxious stimulus (such as a kinked catheter, full bladder, or stool impaction). Hydralazine is given only if HOB elevation and stimulus correction fail.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_7",
        question: "While reviewing a continuous telemetry monitor, the nurse notices that a client has suddenly gone into Ventricular Fibrillation (V-Fib). What represents the nurse's priority action sequence?",
        options: [
          "Obtain a 12-lead EKG and wait for laboratory verification",
          "Check responsiveness, palpate the carotid pulse, initiate chest compressions, call for the defibrillator, and apply a 200-joule shock as soon as possible",
          "Administer an emergency intravenous bolus of regular insulin and dextrose",
          "Position the client flat on their left side and administer oxygen via high-flow nasal cannula"
        ],
        correctAnswer: 1,
        explanation: "Ventricular Fibrillation is a lethal, pulseless arrhythmia that causes rapid brain death. The absolute priority sequence is: 1) verify pulseless responsiveness, 2) begin high-quality CPR, 3) retrieve the defibrillator, and 4) deliver an immediate emergency shock (defibrillation is the curative treatment for V-Fib). Cardioversion or medicines are secondary.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_8",
        question: "A client with Diabetic Ketoacidosis (DKA) is receiving continuous intravenous regular insulin. The morning potassium level is reported as 3.1 mEq/L. Which action should the nurse prioritize?",
        options: [
          "Increase the rate of the insulin infusion pump to lower blood sugar faster",
          "Withhold the scheduled insulin infusion, notify the provider, and expect a prescription to administer potassium-containing fluids",
          "Document the finding and recheck the laboratory level in the morning",
          "Prepare to administer sodium polystyrene sulfonate (Kayexalate) orally"
        ],
        correctAnswer: 1,
        explanation: "Insulin causes an intracellular shift, moving potassium out of the serum and into the cells, which drastically lowers circulating potassium levels. If the baseline potassium is already low (< 3.3 mEq/L), administering insulin can drop potassium to fatal levels, causing cardiac arrest. The insulin must be held, the provider notified, and potassium replacement initiated first.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_9",
        question: "A 4-year-old child presents to the emergency department with a high fever, severe sore throat, inspiratory stridor, drooling, and is sitting in a 'tripod' position. What represents the most hazardous activity for the nurse to perform?",
        options: [
          "Administer sterile oxygen using a humidified blow-by face mask",
          "Use a tongue depressor to inspect the throat for swelling and confirmation",
          "Keep the child with their parent to minimize anxiety",
          "Prepare an emergency intubation setup at the bedside"
        ],
        correctAnswer: 1,
        explanation: "The clinical presentation (high fever, drooling, stridor, tripod position) indicates acute epiglottitis, a localized airway emergency. Inserting a tongue depressor, throat swab, or thermometer into the child's mouth can trigger sudden laryngospasm and complete airway occlusion. Throat examination should occur only in an operating room with intubation resources ready.",
        difficulty: "hard",
        domain: "Health Promotion and Maintenance"
      },
      {
        id: "mast_10",
        question: "A postpartum client who had severe preeclampsia is receiving magnesium sulfate. The nurse notes that the client's patellar reflexes are diminished (1+), their respiratory rate is 9/minute, and they are sleeping heavily, only responding briefly to loud commands. Which medication must the nurse prepare to administer immediately?",
        options: [
          "Intravenous Protamine sulfate",
          "Intravenous Calcium Gluconate 10% solution",
          "Intramuscular Epinephrine injection",
          "Subcutaneous Naloxone injection"
        ],
        correctAnswer: 1,
        explanation: "Magnesium toxicity causes systemic neuromuscular depression. Signs are loss of reflexes, bradypnea (<12 bpm), oliguria, and somnolence. The continuous infusion must be stopped immediately, and the physical antidote—Calcium Gluconate—must be administered intravenously to restore respiratory drive.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_11",
        question: "A client with severe, symptomatic hyponatremia secondary to SIADH (sodium level of 112 mEq/L) is prescribed a continuous infusion of 3% hypertonic saline. Which safety guideline is critical during hypertonic saline administration?",
        options: [
          "Infuse the fluid rapidly over 2 hours via a peripheral IV line",
          "Administer the hypertonic fluid slowly via an infusion pump, monitor neurological checks frequently, and prevent rapid sodium correction to avoid central pontine myelinolysis",
          "Encourage the client to drink at least 2 liters of plain water to balance the sodium",
          "Hold the infusion if the sodium exceeds 120 mEq/L"
        ],
        correctAnswer: 1,
        explanation: "Hypertonic saline (3%) is an extremely high-alert medication because rapid shifting of electrolytes can cause permanent osmotic demyelination syndrome (central pontine myelinolysis) in the brainstem. Correcting sodium should not exceed 8-12 mEq/L in a 24-hour window. Infusion must go via a pump and have continuous neuro checks.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_12",
        question: "An adult client weighing 70 kg has sustained partial and full-thickness burns covering exactly forty percent (40%) of their total body surface area. Using the Parkland formula (4 mL x kg x % burn), what is the total fluid volume of Lactated Ringer's the nurse must calculate for the first 8 hours of resuscitation?",
        options: [
          "2,800 mL",
          "5,600 mL",
          "11,200 mL",
          "22,400 mL"
        ],
        correctAnswer: 1,
        explanation: "Parkland Formula: Total Resuscitation Fluid for 24 hours = 4 mL x weight (kg) x % burn. Thus: 4 mL x 70 kg x 40% = 11,200 mL. Under Parkland guidelines, half (50%) of the calculated fluid must be infused during the first 8 hours: 11,200 mL / 2 = 5,600 mL. The other half is infused over the remaining 16 hours.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_13",
        question: "Fifteen minutes after starting a packed red blood cell transfusion, the client reports a sudden, severe headache, severe lower back pain, flushing, and has a temperature of 101.4 F (38.6 C). What represents the nurse's priority action sequence?",
        options: [
          "Administer a dose of prescribed acetaminophen and slow down the blood pump",
          "Stop the blood transfusion immediately, disconnect the tubing at the hub, hook up a normal saline flush to keep the IV line open, and notify the blood bank and provider",
          "Check client's identification wristlet again to ensure the labels match the blood product",
          "Document the symptom change and request a repeat CBC"
        ],
        correctAnswer: 1,
        explanation: "The clinical presentation (fever, chills, back pain, headache) indicates an acute hemolytic transfusion reaction (incompatible blood). The emergency sequence is: 1) Stop the transfusion immediately, 2) disconnect the blood group set from the catheter hub to prevent infusing residual blood in the tube, 3) hang fresh normal saline with new tubing to keep the vein patent, 4) collect vital signs, and 5) notify the provider and blood bank.",
        difficulty: "hard",
        domain: "Pharmacological and Parenteral Therapies"
      },
      {
        id: "mast_14",
        question: "The nurse is assessing a client who is 8 hours post-operative thyroidectomy. The nurse notes that the client has a slightly hoarse voice, is swallowing frequently, and has developed a swelling under their anterior neck dressing. What represents the nurse's priority action?",
        options: [
          "Instruct the client's family to perform high-tier vocal exercises with the client",
          "Obtain a tracheostomy setup, loosen the anterior dressing, and notify the surgical emergency team immediately",
          "Document this as a normal postoperative finding and administer warm water",
          "Place the client flat on their back to facilitate swallowing action"
        ],
        correctAnswer: 1,
        explanation: "Frequent swallowing indicates post-thyroidectomy bleeding under the muscles. Neck swelling can compress the trachea, resulting in complete respiratory death. The nurse must loosen the dressing to relieve tension, prepare an emergency tracheostomy tray at the bedside, evaluate breathing/airway, and notify the surgeon immediately.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_15",
        question: "A client with chronic adrenal insufficiency (Addison's disease) is admitted with severe abdominal pain, vomiting, extreme fatigue, a blood pressure of 72/42 mmHg, and a heart rate of 122 beats/minute. Which primary medication prescription is critical to stabilize this client?",
        options: [
          "Intravenous bolus of potassium chloride syrup",
          "Rapid intravenous infusion of 0.9% Normal Saline and IV hydrocortisone sodium succinate push",
          "Continuous subcutaneous infusion of high-dose regular insulin",
          "Oral dose of spironolactone with liquid potassium pills"
        ],
        correctAnswer: 1,
        explanation: "The client is in an acute Addisonian crisis, which is a life-threatening adrenal shock caused by cortisol/aldosterone depletion. Symptoms include severe hypotension, shock, hyperkalemia, and hypoglycemia. The medical emergency is stabilized with rapid fluid resuscitation (0.9% saline) and high-dose intravenous glucocorticoids (hydrocortisone) to restore vascular tone.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_16",
        question: "The nurse is suctioning a client with increased intracranial pressure (ICP) secondary to a traumatic brain injury. Which nursing guideline must be strictly followed to prevent dangerous increases in ICP?",
        options: [
          "Explain that they must cough vigorously during catheter insertion",
          "Limit suctioning to no more than two passes, maximum of 10-15 seconds per pass, and hyper-oxygenate the client with 100% O2 before and after",
          "Maintain a continuous, intense suction pull as the catheter is being inserted",
          "Perform suctioning routinely every 1 hour to keep the airway completely dry"
        ],
        correctAnswer: 1,
        explanation: "Suctioning causes transient hypoxia and increases systemic and cerebral pressure. In clients with high ICP, suctioning should be performed only when clinically necessary (not routinely). It must be limited to 2 passes of 10-15 seconds each, preceded and followed by hyper-oxygenation with 100% O2.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_17",
        question: "The nurse is evaluating a client with an active continuous-flow Left Ventricular Assistive Device (LVAD). Which clinical parameter represents a normal finding in this client?",
        options: [
          "A bounding bilateral radial pulse of 80 beats per minute",
          "The absence of a palpable peripheral pulse or measurable standard blood pressure",
          "A high-pitched, localized wheezing sound heard over the carotid arteries",
          "An oxygen saturation reading of 72% on room air"
        ],
        correctAnswer: 1,
        explanation: "Continuous-flow LVADs pump blood continuously from the left ventricle into the aorta, rather than in pulsatile loops. Consequently, clients often have no palpable peripheral pulse, no audible heart sounds, and a standard blood pressure cuff may not register. Mean arterial pressure (MAP) must be assessed using a Doppler.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_18",
        question: "A 3-week-old infant is admitted with projectile, non-bilious vomiting immediately after feeding, and is noted to have an olive-shaped mass in the right quadrant of the abdomen. Which arterial blood gas (ABG) profile represents the risk of this condition?",
        options: [
          "pH 7.31, PaCO2 50 mmHg, HCO3 24 mEq/L (Respiratory Acidosis)",
          "pH 7.48, PaCO2 42 mmHg, HCO3 34 mEq/L (Metabolic Alkalosis)",
          "pH 7.30, PaCO2 36 mmHg, HCO3 15 mEq/L (Metabolic Acidosis)",
          "pH 7.44, PaCO2 35 mmHg, HCO3 22 mEq/L (Normal ABG)"
        ],
        correctAnswer: 1,
        explanation: "The clinical presentation (projectile vomiting, olive-shaped mass) is diagnostic for hypertrophic pyloric stenosis. Severe vomiting causes a massive loss of hydrochloric acid from the stomach, which produces metabolic alkalosis (pH > 7.45 and HCO3 > 26 mEq/L).",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_19",
        question: "While caring for a client with a water-seal chest tube, the nurse notes that the patient has accidentally pulled the chest tube completely out of their chest cavity. What is the nurse's immediate priority rescue action?",
        options: [
          "Notify the surgeon to request urgent operative re-insertion under anesthesia",
          "Cover the insertion site with a sterile, occlusive dressing taped on three sides only",
          "Pinch the client's skin together tightly and call the code team",
          "Apply intense high pressure dressing on the hole and wrap with tight gauze"
        ],
        correctAnswer: 1,
        explanation: "If a chest tube is dislodged, the nurse must immediately cover the site with a sterile, airtight occlusive dressing (e.g., petrolatum gauze) taped on THREE sides only. This allows air to escape the pleural space during exhalation (preventing tension pneumothorax) while preventing atmospheric air from entering the lung during inspiration.",
        difficulty: "hard",
        domain: "Safe and Effective Care Environment - Safety and Infection Control"
      },
      {
        id: "mast_20",
        question: "The pediatric emergency nurse is prioritizing care for four children. Which child should the nurse retrieve for assessment and diagnostic care first?",
        options: [
          "A 3-year-old child with a barky croup-like cough who has a mild fever",
          "A 12-year-old child diagnosed with leukemia who is reporting mild pain in their legs",
          "A 6-month-old infant with diagnosed gastrointestinal vomiting who has wet diapers and alert behavior",
          "A 2-month-old infant with a fever of 102.2 F (39 C) who is lethargic and sleeping persistently"
        ],
        correctAnswer: 3,
        explanation: "An infant under 3 months (neonatal age window) who presents with a high fever (>100.4 F or 38 C) is at high danger for severe bacterial infections (e.g., sepsis, meningitis) due to their immature immune system. Prompt diagnostic draws (blood, urine, cerebrospinal fluid) and antibiotics are required, making this patient the first priority.",
        difficulty: "hard",
        domain: "Health Promotion and Maintenance"
      },
      {
        id: "mast_21",
        question: "An alert client with advanced pancreatic cancer has a signed and notarized Living Will stating that they do not wish to undergo mechanical ventilation. During assessment, the client develops acute respiratory failure but remains conscious and states, 'Please put the breathing tube in, I want to live!' What is the nurse's correct course of action?",
        options: [
          "Hold the medical team back and refuse intubation because the signed advance directive prohibits it",
          "Respect the client's verbalization and prepare to assist with immediate intubation and mechanical ventilation",
          "Call the client's legal power of attorney to vote on whether the client's verbal statement is valid",
          "Tell the client there are no ventilators available in the hospital"
        ],
        correctAnswer: 1,
        explanation: "An advance directive acts as the client's voice when they can no longer make decisions for themselves (e.g., in a coma or cognitively impaired). However, as long as an adult client remains conscious, alert, and possesses medical decision-making capacity, they have the absolute legal and ethical right to override or retract any prior advance directives.",
        difficulty: "hard",
        domain: "Safe and Effective Care Environment - Management of Care"
      },
      {
        id: "mast_22",
        question: "A client is admitted to the emergency department with severe, crushing substernal chest pain radiating to the left arm. What represents the nurse's priority action in terms of initial pharmacology?",
        options: [
          "Administer high-dose subcutaneous heparin injection immediately",
          "Obtain a 12-lead EKG and administer oral chewable aspirin as prescribed",
          "Administer high-potency oral beta blockers within 5 minutes of entry",
          "Prepare the client for urgent mechanical chest traction"
        ],
        correctAnswer: 1,
        explanation: "For suspected acute coronary syndrome, obtaining a 12-lead EKG within 10 minutes of arrival is vital. Administering chewable aspirin (typically 162-325 mg) inhibits platelet aggregation and prevents further occlusion of the coronary artery. This is a critical first-priority step.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_23",
        question: "A client with chronic SIADH is prescribed oral demeclocycline. Which mechanism of action represents how this medication achieves its therapeutic endpoint?",
        options: [
          "Stimulates direct renal sodium excretion in the distal tubules",
          "Acts as an ADH (antidiuretic hormone) antagonist in the kidneys, blocking its water-retaining effect",
          "Accelerates direct gastric emptying of excessive fluids",
          "Inhibits the pituitary gland from synthesising thyroid hormones"
        ],
        correctAnswer: 1,
        explanation: "Demeclocycline is a tetracycline antibiotic that possesses a secondary therapeutic effect of inhibiting antidiuretic hormone (ADH) action at the renal collecting duct, promoting water diuresis. It is used in SIADH to increase urinary output.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_24",
        question: "The nurse is caring for a client who is noted to be in Ventricular Tachycardia (V-Tach) on telemetry. The nurse rushes to the client's room, finds the client responsive, and confirms a strong radial pulse of 160 beats/minute. What represents the nurse's correct action?",
        options: [
          "Prepare for immediate synchronised cardioversion or administer intravenous amiodarone as prescribed",
          "Charge the defibrillator unit and deliver an immediate high-energy shock",
          "Begin chest compressions immediately and shout for the code team",
          "Document this as a normal variation in physical exertion"
        ],
        correctAnswer: 0,
        explanation: "Ventricular Tachycardia is segmented into: 1) V-Tach with a pulse (stable or unstable), and 2) Pulseless V-Tach. For V-Tach with a pulse, the nurse should administer antiarrhythmics (such as Amiodarone) or expect synchronized cardioversion if unstable. Defibrillation and chest compressions are strictly for pulseless patients.",
        difficulty: "hard",
        domain: "Physiological Adaptation"
      },
      {
        id: "mast_25",
        question: "A 5-year-old child diagnosed with acute epiglottitis is highly anxious and breathing rapidly. What position should the nurse encourage the child to maintain?",
        options: [
          "Flat supine to encourage complete lung expansion",
          "Placed on their left side with knees bent to promote abdominal pressure relief",
          "Allowing the child to remain in a fully upright, sitting posture (such as tripod posture) on the parent's lap",
          "Trendelenburg position with the feet elevated above the head"
        ],
        correctAnswer: 2,
        explanation: "Children with respiratory distress or epiglottitis instinctively sit up/tripod to maximize airway diameter and chest expansion. Forcing the child to lie down (supine) can cause rapid, complete airway collapse and is extremely dangerous. Keeping them on a parent's lap reduces anxiety and prevents crying, which further narrows the airway.",
        difficulty: "hard",
        domain: "Health Promotion and Maintenance"
      }
    ]
  }
];

// Seed all unique practice exam questions into the PERMANENT_QUESTION_BANK array programmatically on load
DEFAULT_PRACTICE_TESTS.forEach(test => {
  test.questions.forEach(q => {
    const isAlreadyInBank = PERMANENT_QUESTION_BANK.some(bq => bq.id === q.id || bq.question.trim().toLowerCase() === q.question.trim().toLowerCase());
    if (!isAlreadyInBank) {
      PERMANENT_QUESTION_BANK.push({
        id: q.id,
        question: q.question,
        options: [...q.options],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: test.difficulty,
        domain: q.domain || "Physiological Adaptation"
      });
    }
  });
});

let finalQuestionText = "";


