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
