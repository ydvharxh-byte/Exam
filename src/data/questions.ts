import { Question } from "./types";
import { csmopQuestions } from "./csmopQuestions";

export const starterQuestions: Question[] = [
  ...csmopQuestions,
  // Exact Chapter 5 Question from Image 2
  {
    id: "q-edu-plan-1",
    module: "Perspectives in Education",
    topic: "Educational Planning and Management",
    question: "Which of the following is NOT a key feature of effective educational planning?",
    options: [
      "Setting clear and achievable goals",
      "Flexibility to address changing needs",
      "Involving all stakeholders",
      "Ignoring local context"
    ],
    correctIndex: 3,
    explanation: "Effective educational planning must always take local context, community resources, socio-economic factors, and demographic diversity into consideration. Ignoring local context leads to disconnected and rigid plans.",
    sourceRef: "NIEPA Educational Planning Framework, Chapter 5",
    difficulty: "Medium",
    published: true
  },
  // Module 1: Perspectives on Education & School Leadership (NEP 2020, NCF, Leadership)
  {
    id: "q-nep-1",
    module: "Perspectives in Education",
    topic: "NEP 2020 & School Education",
    question: "Under the National Education Policy 2020 (NEP 2020), what is the new pedagogical and curricular structure replacing the 10+2 system?",
    options: [
      "5 + 3 + 3 + 4",
      "5 + 4 + 3 + 3",
      "3 + 3 + 4 + 5",
      "4 + 4 + 3 + 3"
    ],
    correctIndex: 0,
    explanation: "NEP 2020 replaces the 10+2 structure with a 5+3+3+4 design corresponding to ages 3-8 (Foundational), 8-11 (Preparatory), 11-14 (Middle), and 14-18 (Secondary).",
    sourceRef: "NEP 2020, Section 4.1",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-nep-2",
    module: "Perspectives in Education",
    topic: "NEP 2020 & School Education",
    question: "According to NEP 2020, what is the target year to achieve universal foundational literacy and numeracy (FLN) in primary school through the NIPUN Bharat mission?",
    options: [
      "2025-26",
      "2028-29",
      "2030-31",
      "2035-36"
    ],
    correctIndex: 0,
    explanation: "The highest priority of the education system under NEP 2020 is achieving universal Foundational Literacy and Numeracy (FLN) in primary school by 2025-26 under the NIPUN Bharat Mission.",
    sourceRef: "NEP 2020, Chapter 2 & NIPUN Bharat Guidelines",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-ncf-1",
    module: "Perspectives in Education",
    topic: "National Curriculum Framework (NCF-SE 2023)",
    question: "The National Curriculum Framework for School Education (NCF-SE 2023) roots holistic child development in which ancient Indian philosophical concept?",
    options: [
      "Panchakosha (Five Sheaths of Being)",
      "Ashtanga Yoga",
      "Chaturvidha Purushartha",
      "Triguna Siddhanta"
    ],
    correctIndex: 0,
    explanation: "NCF-SE 2023 grounds holistic education in the Panchakosha concept: Annamaya (physical), Pranamaya (vital energy), Manomaya (mental/emotional), Vijnanamaya (intellectual), and Anandamaya (spiritual/bliss).",
    sourceRef: "NCF-SE 2023 Part A, Section 1.3",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-lead-1",
    module: "Perspectives in Education",
    topic: "School Leadership & Management",
    question: "In school leadership theory, a Principal who shifts from administrative compliance to collaborative capacity-building, mentoring teachers, and prioritizing student learning outcomes is demonstrating which leadership style?",
    options: [
      "Instructional & Transformational Leadership",
      "Bureaucratic / Authoritarian Leadership",
      "Laissez-Faire Leadership",
      "Transactional Leadership solely"
    ],
    correctIndex: 0,
    explanation: "Instructional and Transformational Leadership focuses on school vision, empowering educators as pedagogical leaders, fostering professional learning communities (PLCs), and improving student outcomes.",
    sourceRef: "NCSL (NIEPA) Framework for School Leadership",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-rte-1",
    module: "School Safety & Law",
    topic: "RTE Act 2009",
    question: "Under Section 17 of the Right to Education Act, 2009 (RTE Act), which of the following is strictly prohibited?",
    options: [
      "Physical punishment and mental harassment of a child",
      "Conducting diagnostic unit tests",
      "Remedial teaching outside regular periods",
      "Assigning peer learning groups"
    ],
    correctIndex: 0,
    explanation: "Section 17(1) of the RTE Act prohibits subjecting any child to physical punishment or mental harassment, with Section 17(2) prescribing disciplinary action against violators.",
    sourceRef: "RTE Act 2009, Section 17",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-rte-2",
    module: "School Safety & Law",
    topic: "RTE Act 2009",
    question: "What is the statutory Pupil-Teacher Ratio (PTR) prescribed under the Schedule of the RTE Act 2009 for primary classes (Classes I to V) with student enrolment up to 200?",
    options: [
      "30:1",
      "35:1",
      "40:1",
      "25:1"
    ],
    correctIndex: 0,
    explanation: "For Classes I to V, the prescribed PTR under the RTE Act Schedule is 30:1 (up to 200 students). For upper primary (Classes VI to VIII), the ratio is 35:1.",
    sourceRef: "RTE Act 2009 Schedule, Norms and Standards",
    difficulty: "Medium",
    published: true
  },

  // Module 2: Administration and Service Rules (CCS Rules, FR/SR)
  {
    id: "q-ccs-1",
    module: "Admin & Finance",
    topic: "CCS (Conduct) Rules 1964",
    question: "According to Rule 3 of the Central Civil Services (Conduct) Rules, 1964, which of the following is NOT an obligation of a government servant?",
    options: [
      "To participate in active political campaigns during sanctioned leave",
      "To maintain absolute integrity and devotion to duty",
      "To do nothing which is unbecoming of a Government servant",
      "To maintain high ethical standards and honesty"
    ],
    correctIndex: 0,
    explanation: "Rule 5 of CCS (Conduct) Rules strictly prohibits taking part in politics and elections. Rule 3 mandates absolute integrity, devotion to duty, and conduct befitting a government servant.",
    sourceRef: "CCS (Conduct) Rules 1964, Rules 3 & 5",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-ccs-2",
    module: "Admin & Finance",
    topic: "CCS (CCA) Rules 1965",
    question: "Under Rule 11 of the CCS (CCA) Rules, 1965, which of the following penalties is classified as a 'Major Penalty'?",
    options: [
      "Compulsory Retirement",
      "Censure",
      "Withholding of promotion for a specific period",
      "Recovery from pay of the whole or part of any pecuniary loss caused to Government"
    ],
    correctIndex: 0,
    explanation: "Under Rule 11, Censure, withholding of promotion, and recovery of loss are Minor Penalties (clauses i to iv). Compulsory Retirement, Removal, and Dismissal are Major Penalties (clauses vii to ix).",
    sourceRef: "CCS (CCA) Rules 1965, Rule 11",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-ccs-3",
    module: "Admin & Finance",
    topic: "CCS (Leave) Rules 1972",
    question: "Under the CCS (Leave) Rules, 1972, what is the maximum duration for which Child Care Leave (CCL) can be granted to a female employee or single male parent during the entire service?",
    options: [
      "730 days",
      "365 days",
      "180 days",
      "540 days"
    ],
    correctIndex: 0,
    explanation: "Child Care Leave (CCL) can be granted for a maximum period of 730 days during the entire service for taking care of up to two eldest surviving children below the age of 18 years.",
    sourceRef: "CCS (Leave) Rules 1972, Rule 43-C",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-ccs-4",
    module: "Admin & Finance",
    topic: "CCS (Leave) Rules 1972",
    question: "Under CCS (Leave) Rules 1972, teaching staff serve in a 'Vacation Department'. How many days of Earned Leave (EL) are credited per calendar year to a permanent teacher who avails the full vacation?",
    options: [
      "Zero days of regular EL (except HPL and EL credited if prevented from vacation)",
      "30 days",
      "15 days",
      "10 days"
    ],
    correctIndex: 0,
    explanation: "Under Rule 28 of CCS (Leave) Rules, employees of vacation departments are not entitled to normal 30 days EL if they avail full vacation. Instead, Half Pay Leave (HPL) of 20 days per year is credited. EL is only credited if prevented from vacation by order.",
    sourceRef: "CCS (Leave) Rules 1972, Rule 28",
    difficulty: "Hard",
    published: true
  },
  {
    id: "q-fr-1",
    module: "Admin & Finance",
    topic: "FR & SR (Fundamental Rules)",
    question: "Under Fundamental Rule 22 (FR 22(I)(a)(1)), upon promotion to a post carrying higher responsibilities, how is pay fixed?",
    options: [
      "One notional increment in the lower pay level, then placed at the equal cell or next higher cell in the higher pay level",
      "Two increments in the existing level added directly",
      "Direct minimum of the promotional scale with no increment",
      "10% flat hike over existing basic pay"
    ],
    correctIndex: 0,
    explanation: "Under FR 22(I)(a)(1) read with 7th CPC Matrix rules, one notional increment is granted in the lower level, and the figure arrived at is matched or placed at the next higher cell in the promotional level.",
    sourceRef: "Fundamental Rules FR 22(I)(a)(1) & CCS (Revised Pay) Rules 2016",
    difficulty: "Hard",
    published: true
  },

  // Module 3: General Financial Rules (GFR 2017) & Procurement
  {
    id: "q-gfr-1",
    module: "Admin & Finance",
    topic: "General Financial Rules (GFR 2017)",
    question: "According to Rule 149 of GFR 2017, the procurement of common-use Goods and Services by Government Ministries, Departments and central educational bodies is mandatory through which portal?",
    options: [
      "Government e-Marketplace (GeM)",
      "Central Public Procurement Portal (CPPP) exclusively",
      "State Civil Supplies Portal",
      "Open Local Market Tender"
    ],
    correctIndex: 0,
    explanation: "Rule 149 of GFR 2017 mandates the procurement of common use goods and services available on the Government e-Marketplace (GeM) by all Central Govt departments and autonomous bodies.",
    sourceRef: "GFR 2017, Rule 149",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-gfr-2",
    module: "Admin & Finance",
    topic: "General Financial Rules (GFR 2017)",
    question: "Under Rule 154 of GFR 2017, purchase of goods up to what monetary value can be made directly without quotation on each occasion, subject to the certificate of urgency and reasonable rate?",
    options: [
      "₹25,000",
      "₹50,000",
      "₹1,00,000",
      "₹15,000"
    ],
    correctIndex: 0,
    explanation: "Rule 154 of GFR 2017 allows purchase of goods up to the value of ₹25,000 on each occasion without inviting quotations or bids on the basis of a certificate recorded by the competent authority.",
    sourceRef: "GFR 2017, Rule 154",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-gfr-3",
    module: "Admin & Finance",
    topic: "General Financial Rules (GFR 2017)",
    question: "Under Rule 21 of GFR 2017, which fundamental principle outlines that an officer should exercise the same vigilance in respect of public money as a person of ordinary prudence would exercise in respect of expenditure of his own money?",
    options: [
      "Standards of Financial Propriety",
      "Principle of Accrual Accounting",
      "Principle of Deficit Minimization",
      "Principle of Delegated Discretion"
    ],
    correctIndex: 0,
    explanation: "Rule 21 defines the 'Standards of Financial Propriety', requiring every public officer to enforce strict financial prudence and ensure expenditure is not prima facie more than the occasion demands.",
    sourceRef: "GFR 2017, Rule 21",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-gfr-4",
    module: "Admin & Finance",
    topic: "School Funds & Accounts (SDF/Pupil Fund)",
    question: "Under Public School Financial Management Rules, what is the primary purpose and accounting mechanism for the School Development Fund / Pupil Welfare Fund?",
    options: [
      "Student welfare, laboratory upkeep, sports, and school activities as sanctioned by the School Management Committee",
      "Payment of regular monthly salaries of permanent teaching staff",
      "Direct remittance to the Consolidated Fund of India without local discretion",
      "Discretionary expenditure by the Principal without any committee approval or audit"
    ],
    correctIndex: 0,
    explanation: "School Development Funds / Pupil Welfare Funds are maintained for student-centric amenities, academic enrichment, sports, and minor campus maintenance, requiring statutory School Management Committee (SMC) budget approval and annual audit.",
    sourceRef: "Civil Educational Institutions Accounts & Financial Guidelines",
    difficulty: "Easy",
    published: true
  },

  // Module 4: Administrative Governance & Constitutional Provisions
  {
    id: "q-upsc-1",
    module: "Perspectives in Education",
    topic: "School Governance & Civil Administration",
    question: "In government and central educational institutions located in district headquarters, who typically serves as the ex-officio Chairman of the School Management Committee (SMC / VMC)?",
    options: [
      "District Collector / District Magistrate (DM) or a nominated Senior Civil Officer",
      "The Principal of the school (acting as sole Chairman & Secretary)",
      "The Senior-most PGT of the school",
      "The local Member of Parliament (MP)"
    ],
    correctIndex: 0,
    explanation: "Under institutional governance norms for government/central civil schools, the District Magistrate (DM/DC) or a nominated administrative officer serves as the Chairman, while the Principal serves as the Member Secretary.",
    sourceRef: "Civil School Administration & Governance Manual, Chapter IV",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-upsc-2",
    module: "Perspectives in Education",
    topic: "Statutory Educational Rights (RTE Act 2009)",
    question: "Under Section 12(1)(c) of the Right of Children to Free and Compulsory Education (RTE) Act 2009, what minimum percentage of entry-level seats must be reserved for children from Economically Weaker Sections (EWS) and Disadvantaged Groups?",
    options: [
      "25%",
      "15%",
      "10%",
      "33%"
    ],
    correctIndex: 0,
    explanation: "Section 12(1)(c) of the RTE Act 2009 mandates that all specified category schools and private unaided schools shall admit at least 25% of the strength of that class from children belonging to weaker sections and disadvantaged groups.",
    sourceRef: "Right of Children to Free and Compulsory Education (RTE) Act 2009, Section 12",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-upsc-3",
    module: "Perspectives in Education",
    topic: "Indian Polity & Civil Services",
    question: "Under Article 315 of the Constitution of India, which constitutional body is mandated to conduct competitive examinations and recruitment for Group A and B Gazetted school administrative leadership (Principals & Vice-Principals)?",
    options: [
      "Union Public Service Commission (UPSC)",
      "Staff Selection Commission (SSC)",
      "National Testing Agency (NTA)",
      "Central Board of Secondary Education (CBSE)"
    ],
    correctIndex: 0,
    explanation: "The Union Public Service Commission (UPSC), established under Article 315 of the Constitution of India, is the constitutional authority mandated to conduct competitive recruitment tests and interviews for Gazetted educational leaders, Principals, and Education Officers.",
    sourceRef: "Constitution of India, Article 315 & UPSC Charter",
    difficulty: "Easy",
    published: true
  },

  // Module 5: Child Safety, POCSO Act & Inclusion
  {
    id: "q-pocso-1",
    module: "School Safety & Law",
    topic: "Child Protection (POCSO Act 2012)",
    question: "Under Section 19 of the Protection of Children from Sexual Offences (POCSO) Act, 2012, what is the legal obligation of a Principal or teacher upon receiving information or suspicion of an offense under the Act?",
    options: [
      "Mandatory duty to report immediately to Special Juvenile Police Unit (SJPU) or local police",
      "Conduct an internal enquiry committee and report only if confirmed",
      "Notify only the parents and let them decide whether to report",
      "Refer the child to a counsellor and wait for 30 days"
    ],
    correctIndex: 0,
    explanation: "Section 19 makes reporting mandatory for any person (including institution heads/teachers) having knowledge or apprehension of an offense. Failure to report is punishable under Section 21 of the POCSO Act.",
    sourceRef: "POCSO Act 2012, Sections 19 & 21",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-safe-1",
    module: "School Safety & Law",
    topic: "Disaster Management & School Safety",
    question: "As per Supreme Court directives and NDMA guidelines, which committee must be formed in every school to formulate an evacuation plan and conduct periodic drills?",
    options: [
      "School Disaster Management Committee (SDMC)",
      "Parent Safety Tribunal",
      "National Red Cross Youth Unit",
      "Vidyalaya Security Sub-Council"
    ],
    correctIndex: 0,
    explanation: "Every school must constitute a School Disaster Management Committee (SDMC) under the Principal, prepare a School Disaster Management Plan (SDMP), conduct structural/non-structural audits, and execute mock drills biannually.",
    sourceRef: "NDMA School Safety Policy Guidelines",
    difficulty: "Easy",
    published: true
  },

  // Module 6: Measurement, Evaluation & Pedagogy
  {
    id: "q-eval-1",
    module: "Pedagogy & Evaluation",
    topic: "Measurement & Assessment",
    question: "What is the primary conceptual difference between 'Assessment FOR Learning' and 'Assessment OF Learning'?",
    options: [
      "Assessment FOR learning is formative and diagnostic during instruction, while Assessment OF learning is summative after instruction",
      "Assessment FOR learning is conducted solely by CBSE, while OF learning is conducted internally",
      "Assessment FOR learning awards numerical grades, while OF learning is ungraded",
      "There is no distinction in modern pedagogical literature"
    ],
    correctIndex: 0,
    explanation: "Assessment FOR learning is formative, providing ongoing feedback to both teacher and learner to modify instruction. Assessment OF learning is summative, evaluating cumulative learning against benchmark criteria at the end.",
    sourceRef: "BES-127 & NCF-SE 2023, Chapter on Assessment",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-eval-2",
    module: "Pedagogy & Evaluation",
    topic: "Bloom's Revised Taxonomy",
    question: "In Anderson & Krathwohl's Revised Bloom's Taxonomy of educational objectives (Cognitive Domain), which is the highest cognitive process level?",
    options: [
      "Creating (Synthesis / Generation of new structures)",
      "Evaluating (Critiquing and judging)",
      "Analyzing (Differentiating and organizing)",
      "Applying (Executing and implementing)"
    ],
    correctIndex: 0,
    explanation: "The revised taxonomy hierarchy from lowest to highest is: Remembering -> Understanding -> Applying -> Analyzing -> Evaluating -> Creating.",
    sourceRef: "Anderson & Krathwohl (2001) Bloom's Taxonomy Revised",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-eval-3",
    module: "Pedagogy & Evaluation",
    topic: "Psychometric Testing & Item Analysis",
    question: "In test construction, an item difficulty index (p-value) of 0.85 indicates that:",
    options: [
      "The item was easy, as 85% of test-takers answered it correctly",
      "The item was difficult, as only 15% answered correctly",
      "The item has negative discrimination value",
      "The item is invalid and must be discarded"
    ],
    correctIndex: 0,
    explanation: "Item difficulty index (p) is the proportion of examinees who answered the item correctly. A value of 0.85 means 85% answered correctly, indicating an easy item (ideal balanced items are generally around 0.50 to 0.60).",
    sourceRef: "IGNOU BES-127 Unit 3: Educational Measurement",
    difficulty: "Hard",
    published: true
  }
,

  // --- EXTRACTED FROM DRIVE REPOSITORY ---
  {
    id: "q-drive-reason-1",
    module: "Reasoning & Quantitative",
    topic: "Analytical Reasoning & Blood Relations",
    question: "Consider the following Question and Statements:\nThere are 5 members A, B, C, D, E in a family.\nQuestion: What is the relation of E to B?\nStatement-1: A and B are a married couple.\nStatement-2: D is the father of C.\nStatement-3: E is D's son.\nStatement-4: A and C are sisters.\nWhich of the following is correct?",
    options: [
          "All four statements together are sufficient to answer the Question",
          "Statement-1, Statement-2 and Statement-3 are sufficient to answer the Question",
          "Statement-1, Statement-3 and Statement-4 are sufficient to answer the Question",
          "All four statements are not sufficient to answer the Question"
    ],
    correctIndex: 0,
    explanation: "From St-1: A & B are married couple. From St-4: A and C are sisters. From St-2: D is father of C (so D is also father of A). From St-3: E is D's son (so E is brother of A & C). Since A is married to B and E is A's brother, E is brother-in-law to B. All four statements together are required to establish the relationship.",
    sourceRef: "UPSC CSAT / Drive Reasoning & Blood Relations Module",
    difficulty: "Hard",
    published: true
  },

  {
    id: "q-drive-reason-2",
    module: "Reasoning & Quantitative",
    topic: "Analytical Reasoning & Blood Relations",
    question: "Pointing to a girl on a stage, Renu said, 'She is the sister of the son of the wife of my husband'. How is the girl related to Renu?",
    options: [
          "Daughter",
          "Sister-in-law",
          "Sister",
          "Cousin"
    ],
    correctIndex: 0,
    explanation: "Breakdown: 'Wife of my husband' = Renu herself. 'Son of the wife of my husband' = Renu's son. 'Sister of the son' = Renu's daughter. Hence, the girl is Renu's daughter.",
    sourceRef: "Drive Reasoning & Blood Relations Module, Q2",
    difficulty: "Easy",
    published: true
  },

  {
    id: "q-drive-reason-3",
    module: "Reasoning & Quantitative",
    topic: "Analytical Reasoning & Blood Relations",
    question: "Given: 1. A is the brother of B. 2. C is the father of A. 3. D is the brother of E. 4. E is the daughter of B. Who is the uncle/maternal uncle of D?",
    options: [
          "A",
          "B",
          "C",
          "E"
    ],
    correctIndex: 0,
    explanation: "E is the daughter of B, and D is the brother of E, which means D is the son of B. A is the brother of B. Therefore, A is the uncle (or maternal uncle) of D.",
    sourceRef: "Drive Reasoning & Blood Relations Module, Q3",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-reason-4",
    module: "Reasoning & Quantitative",
    topic: "Analytical Reasoning & Blood Relations",
    question: "Given that 'A + B' means A is the Son of B, and 'A - B' means A is the wife of B, what does the symbolic expression 'P + R - Q' mean?",
    options: [
          "Q is the father of P",
          "Q is the son of P",
          "Q is the wife of P",
          "None of the above"
    ],
    correctIndex: 0,
    explanation: "'P + R' implies P is the son of R. 'R - Q' implies R is the wife of Q. Consequently, Q is the husband of R. Since P is R's son, Q is the father of P.",
    sourceRef: "Drive Reasoning & Blood Relations Module, Q4",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-eng-1",
    module: "General & Languages",
    topic: "English: Active & Passive Voice",
    question: "Which one of the following represents the correct passive transformation of: 'The governing body proposed to defer the discussion on budget allocation until the next academic session'?",
    options: [
          "The discussion on budget allocation was proposed to be deferred until the next academic session by the governing body",
          "It was proposed by the governing body to defer the discussion on budget allocation until the next academic session",
          "The discussion on budget allocation was proposed deferring until the next academic session by the governing body",
          "It was proposed that the discussion on budget allocation is deferred until the next academic session by the governing body"
    ],
    correctIndex: 0,
    explanation: "When an active sentence has a non-finite complement clause (to defer...), the object of the infinitive ('the discussion on budget allocation') moves to the subject position of the passive matrix verb: 'was proposed to be deferred'.",
    sourceRef: "Drive English Module: Active & Passive Voice, Q1",
    difficulty: "Hard",
    published: true
  },

  {
    id: "q-drive-eng-2",
    module: "General & Languages",
    topic: "English: Active & Passive Voice",
    question: "Transform into passive voice: 'The director requested the faculty members to review the draft curriculum thoroughly.'",
    options: [
          "The faculty members were requested to review the draft curriculum thoroughly by the director",
          "The faculty members were requested to be reviewed the draft curriculum thoroughly by the director",
          "The draft curriculum was requested to review by the faculty members and the director",
          "The faculty members were being requested to review the draft curriculum thoroughly"
    ],
    correctIndex: 0,
    explanation: "In sentences with reporting or directive verbs governing an infinitive phrase (requested + object + to-infinitive), the matrix verb becomes passive ('were requested') while the to-infinitive clause remains unchanged ('to review').",
    sourceRef: "Drive English Module: Active & Passive Voice, Q2",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-eng-3",
    module: "General & Languages",
    topic: "English: Active & Passive Voice",
    question: "What is the standard passive voice conversion of the negative imperative command: 'Do not disclose confidential examination particulars to unauthorized personnel'?",
    options: [
          "Let confidential examination particulars not be disclosed to unauthorized personnel",
          "Confidential examination particulars should not disclose to unauthorized personnel",
          "You are ordered not to be disclosed confidential examination particulars to unauthorized personnel",
          "Let not unauthorized personnel be disclosed confidential examination particulars"
    ],
    correctIndex: 0,
    explanation: "Negative imperative commands of the form 'Do not + verb + object' transform into passive using the rule: 'Let + object + not be + past participle (V3)'.",
    sourceRef: "Drive English Module: Active & Passive Voice, Q5",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-idiom-1",
    module: "General & Languages",
    topic: "English: Idioms & Phrases",
    question: "Choose the option that most appropriately explains the meaning of the underlined phrase: 'The committee’s recommendation was ultimately a damp squib, generating considerable anticipation but producing little of practical consequence.'",
    options: [
          "Something that fails to produce the expected excitement or impact",
          "A proposal that is deliberately suppressed before implementation",
          "A proposal that encounters opposition after initial approval",
          "Something that appears promising but requires extensive modification"
    ],
    correctIndex: 0,
    explanation: "A 'damp squib' is an event, attempt, or situation that is much less impressive, successful, or exciting than expected.",
    sourceRef: "Drive English Module: Idioms & Phrases, Q1",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-idiom-2",
    module: "General & Languages",
    topic: "English: Idioms & Phrases",
    question: "What is the meaning of the idiom: 'The disagreement over the distribution of academic duties became a bone of contention among the faculty'?",
    options: [
          "A cause or subject of continuous disagreement and dispute",
          "A difficult administrative responsibility",
          "A matter of professional pride and accolade",
          "A minor and negligible scheduling issue"
    ],
    correctIndex: 0,
    explanation: "A 'bone of contention' refers to an issue or problem over which there is continuing disagreement or dispute.",
    sourceRef: "Drive English Module: Idioms & Phrases, Q4",
    difficulty: "Easy",
    published: true
  },

  {
    id: "q-drive-idiom-3",
    module: "General & Languages",
    topic: "English: Idioms & Phrases",
    question: "Choose the correct meaning of the idiom 'to take something with a pinch of salt':",
    options: [
          "To treat or accept something with skepticism and caution",
          "To accept something completely without question",
          "To reject an allegation immediately",
          "To maintain utmost official confidentiality"
    ],
    correctIndex: 0,
    explanation: "To take something with a pinch of salt means to view something with skepticism or to not completely believe it.",
    sourceRef: "Drive English Module: Idioms & Phrases, Q5",
    difficulty: "Easy",
    published: true
  },

  {
    id: "q-drive-rti-1",
    module: "School Safety & Law",
    topic: "Right to Information (RTI) Act 2005",
    question: "Under Section 2(e) of the RTI Act, 2005, who is designated as the 'Competent Authority' in the case of the House of the People (Lok Sabha)?",
    options: [
          "The Speaker of the Lok Sabha",
          "The Prime Minister",
          "The Secretary General, Lok Sabha",
          "The Chief Justice of India"
    ],
    correctIndex: 0,
    explanation: "Under Section 2(e)(i) of the RTI Act 2005, the Speaker is the Competent Authority in the case of the House of the People (Lok Sabha) and the Legislative Assemblies.",
    sourceRef: "RTI Act 2005, Section 2(e) / Drive RTI Document, Q1",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-rti-2",
    module: "School Safety & Law",
    topic: "Right to Information (RTI) Act 2005",
    question: "Which section of the Right to Information Act, 2005 deals with 'Severability' (providing that part of the record which does not contain exempt information)?",
    options: [
          "Section 10",
          "Section 8",
          "Section 9",
          "Section 11"
    ],
    correctIndex: 0,
    explanation: "Section 10 of the RTI Act, 2005 deals with Severability: where a request for access to information is rejected in respect of that part of the record which is exempt, access may be provided to that part which does not contain exempt information.",
    sourceRef: "RTI Act 2005, Section 10 / Drive RTI Document, Q3",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-rti-3",
    module: "School Safety & Law",
    topic: "Right to Information (RTI) Act 2005",
    question: "Under Section 19(1) of the RTI Act 2005, what is the statutory time limit within which an applicant may prefer a First Appeal before the First Appellate Authority (FAA)?",
    options: [
          "Within 30 days from the expiry of the period or from receipt of the PIO decision",
          "Within 15 days of receiving the PIO decision",
          "Within 45 days of the PIO decision",
          "Within 60 days of the PIO decision"
    ],
    correctIndex: 0,
    explanation: "Section 19(1) mandates that an aggrieved applicant may prefer a First Appeal within 30 days from the expiry of the statutory response period or from the receipt of the PIO decision.",
    sourceRef: "RTI Act 2005, Section 19(1) / Drive RTI Document, Q9",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-rti-4",
    module: "School Safety & Law",
    topic: "Right to Information (RTI) Act 2005",
    question: "Under Section 11 of the RTI Act 2005, when a CPIO intends to disclose confidential third-party information, within how many days must notice be given to the third party, and how many days is the third party allowed to make representation?",
    options: [
          "Notice within 5 days; 10 days allowed for representation",
          "Notice within 2 days; 7 days allowed for representation",
          "Notice within 10 days; 15 days allowed for representation",
          "Notice within 15 days; 30 days allowed for representation"
    ],
    correctIndex: 0,
    explanation: "Under Section 11(1), the CPIO/SPIO must within 5 days of receiving the request give written notice to the third party, and the third party is given 10 days to make representation against disclosure.",
    sourceRef: "RTI Act 2005, Section 11(1) / Drive RTI Document, Q10",
    difficulty: "Hard",
    published: true
  },

  {
    id: "q-drive-pocso-1",
    module: "School Safety & Law",
    topic: "NCPCR & POCSO Act Compliance",
    question: "Consider the following statements regarding the National Commission for Protection of Child Rights (NCPCR):\n1. It is constituted under Section 3 of the CPCR Act, 2005.\n2. It consists of a Chairperson and six Members.\n3. At least two of the six Members must be women.\n4. Its office is located in New Delhi.\nWhich of the statements given above are correct?",
    options: [
          "1, 2, 3 and 4",
          "1 and 2 only",
          "1, 2 and 3 only",
          "2, 3 and 4 only"
    ],
    correctIndex: 0,
    explanation: "All four statements are correct under Section 3 of the Commissions for Protection of Child Rights (CPCR) Act, 2005. The Commission comprises 1 Chairperson and 6 Members (min 2 women).",
    sourceRef: "CPCR Act 2005, Section 3 / Drive POCSO & NCPCR Mock, Q1",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-pocso-2",
    module: "School Safety & Law",
    topic: "NCPCR & POCSO Act Compliance",
    question: "Under Section 19 and Section 21 of the POCSO Act 2012, what is the legal obligation and consequence for a school Principal or staff member who fails to report suspected sexual abuse against a child?",
    options: [
          "Reporting is mandatory; failure to report is punishable with imprisonment up to six months or fine or both",
          "Reporting is discretionary based on internal school inquiry findings",
          "The Principal can resolve the matter through parent mediation without police reporting",
          "Only the medical doctor examining the child is legally obligated to report"
    ],
    correctIndex: 0,
    explanation: "Under Section 19 of POCSO Act 2012, any person (including school heads and teachers) who has apprehension or knowledge that an offence has been committed must report to Special Juvenile Police Unit or local police. Section 21 prescribes up to 6 months imprisonment, fine, or both for failure to report.",
    sourceRef: "POCSO Act 2012, Sections 19 & 21 / Drive POCSO Document",
    difficulty: "Hard",
    published: true
  },

  {
    id: "q-drive-gfr-1",
    module: "Admin & Finance",
    topic: "GFR 2017 & GeM Public Procurement",
    question: "Under Rule 149(i) of the General Financial Rules (GFR 2017), what is the direct purchase threshold through any available supplier on the Government e-Marketplace (GeM)?",
    options: [
          "Up to ₹25,000",
          "Up to ₹50,000",
          "Up to ₹1,00,000",
          "Up to ₹2,50,000"
    ],
    correctIndex: 0,
    explanation: "Rule 149(i) of GFR 2017 allows direct purchase of goods/services up to ₹25,000 through any available supplier on GeM meeting quality, specification, and delivery period.",
    sourceRef: "GFR 2017, Rule 149(i) / Drive GFR Document",
    difficulty: "Easy",
    published: true
  },

  {
    id: "q-drive-gfr-2",
    module: "Admin & Finance",
    topic: "GFR 2017 & GeM Public Procurement",
    question: "Under Rule 155 of GFR 2017, purchase of goods by a Local Purchase Committee of three members is permissible for items costing:",
    options: [
          "Above ₹25,000 and up to ₹2,50,000 on each occasion",
          "Above ₹10,000 and up to ₹1,00,000 on each occasion",
          "Above ₹50,000 and up to ₹5,00,000 on each occasion",
          "Above ₹1,00,000 and up to ₹10,00,000 on each occasion"
    ],
    correctIndex: 0,
    explanation: "Rule 155 of GFR 2017 provides for purchase of goods costing above ₹25,000 and up to ₹2,50,000 on each occasion on the recommendations of a duly constituted Local Purchase Committee of three members.",
    sourceRef: "GFR 2017, Rule 155 / Drive GFR Document",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-rte-1",
    module: "School Safety & Law",
    topic: "Right to Education (RTE) Act 2009",
    question: "Under Section 12(1)(c) of the Right of Children to Free and Compulsory Education (RTE) Act 2009, what percentage of Class 1 (or pre-school) seats must private unaided schools reserve for children belonging to disadvantaged groups and weaker sections?",
    options: [
          "At least 25%",
          "At least 15%",
          "At least 33%",
          "At least 50%"
    ],
    correctIndex: 0,
    explanation: "Section 12(1)(c) of the RTE Act 2009 mandates specified schools and unaided schools to admit in Class 1, to the extent of at least twenty-five per cent of the strength of that class, children belonging to weaker sections and disadvantaged groups.",
    sourceRef: "RTE Act 2009, Section 12(1)(c) / Drive RTE Document",
    difficulty: "Easy",
    published: true
  },

  {
    id: "q-drive-digi-1",
    module: "Pedagogy & Evaluation",
    topic: "Digital Literacy & Cyber Security in Education",
    question: "Under modern cyber-security guidelines and the Digital Personal Data Protection (DPDP) Act 2023, what is mandatory before processing personal data of children in digital learning environments?",
    options: [
          "Verifiable parental or legal guardian consent",
          "Self-certification by the minor student",
          "Notification to the district education officer only",
          "Storing all student credentials in unencrypted format"
    ],
    correctIndex: 0,
    explanation: "Section 9 of the DPDP Act 2023 mandates obtaining verifiable consent of the parent or lawful guardian of the child before processing any personal data of a child (individual under 18 years of age).",
    sourceRef: "DPDP Act 2023 Section 9 / Drive Cyber Security Document",
    difficulty: "Medium",
    published: true
  },

  {
    id: "q-drive-eoff-1",
    module: "Admin & Finance",
    topic: "Central Secretariat Manual & e-Office Procedure",
    question: "In the Central Secretariat Manual of Office Procedure (CSMOP) and Government e-Office workflow, what does the acronym 'DFA' stand for?",
    options: [
          "Draft For Approval",
          "Digital File Allocation",
          "Direct Financial Authorization",
          "Document Filing Archive"
    ],
    correctIndex: 0,
    explanation: "In government office procedure and e-Office, DFA stands for 'Draft For Approval'—a proposed communication placed before the competent officer for review and sanction prior to issue.",
    sourceRef: "CSMOP Manual / Drive eOffice Procedure Document",
    difficulty: "Easy",
    published: true
  },

  {
    id: "q-drive-hindi-1",
    module: "General & Languages",
    topic: "Hindi Vyakaran: Sandhi & Samas",
    question: "'प्रधानाचार्य' (Principal) शब्द का शुद्ध संधि-विच्छेद निम्नलिखित में से कौन-सा है तथा इसमें कौन-सी संधि है?",
    options: [
          "प्रधान + आचार्य (दीर्घ स्वर संधि)",
          "प्रधा + नाचार्य (गुण स्वर संधि)",
          "प्रधान + चार्य (व्यंजन संधि)",
          "प्रध + अनाचार्य (वृद्धि स्वर संधि)"
    ],
    correctIndex: 0,
    explanation: "प्रधानाचार्य = प्रधान (अ) + आचार्य (आ) = अ + आ मिलकर 'आ' बनता है, जो कि दीर्घ स्वर संधि (अकः सवर्णे दीर्घः) का शुद्ध उदाहरण है।",
    sourceRef: "Drive Hindi Vyakaran Document",
    difficulty: "Easy",
    published: true
  }
];
