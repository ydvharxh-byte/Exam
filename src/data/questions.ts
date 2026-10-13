import { Question } from "./types";

export const starterQuestions: Question[] = [
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
    question: "In Kendriya Vidyalayas, teaching staff serve in a 'Vacation Department'. How many days of Earned Leave (EL) are credited per calendar year to a permanent teacher who avails the full vacation?",
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
    question: "According to Rule 149 of GFR 2017, the procurement of common-use Goods and Services by Government Ministries and autonomous bodies like KVS is mandatory through which portal?",
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
    topic: "School Funds & Accounts (VVN)",
    question: "In Kendriya Vidyalayas, what is the full form of 'VVN', and what is the primary source of its fund collection?",
    options: [
      "Vidyalaya Vikas Nidhi - collected from students as a quarterly development fee",
      "Vidya Vahini Nidhi - funded solely by Ministry of Defense grants",
      "Vidyalaya Vahan Nidhi - bus transport fund",
      "Vidyarthi Vridhi Nidhi - alumni donations only"
    ],
    correctIndex: 0,
    explanation: "Vidyalaya Vikas Nidhi (VVN) is the school development fund of KVS, collected quarterly from students, utilized for pupil welfare, minor repairs, lab upkeep, sports, and school activities as per VMC approval.",
    sourceRef: "KVS Accounts Code & VVN Rules",
    difficulty: "Easy",
    published: true
  },

  // Module 4: KVS Education Code & School Governance
  {
    id: "q-kvs-1",
    module: "Perspectives in Education",
    topic: "KVS Education Code",
    question: "Who is the ex-officio Chairman of the Vidyalaya Management Committee (VMC) of a Kendriya Vidyalaya located in a Civil Sector district headquarters?",
    options: [
      "District Collector / District Magistrate (DM) or an ADM nominated by DM",
      "The Principal of the Kendriya Vidyalaya",
      "The Senior-most PGT of the school",
      "The Member of Parliament (MP) of the constituency"
    ],
    correctIndex: 0,
    explanation: "As per the KVS Education Code, in Civil Sector schools, the District Magistrate / District Collector or an officer nominated by them acts as Chairman of the VMC. The Principal is the Member Secretary.",
    sourceRef: "KVS Education Code for Kendriya Vidyalayas, Chapter IV",
    difficulty: "Medium",
    published: true
  },
  {
    id: "q-kvs-2",
    module: "Perspectives in Education",
    topic: "KVS Education Code",
    question: "Under KVS Admission Guidelines, which priority category is given Category-I status for admissions in Civil/Defence Sector Kendriya Vidyalayas?",
    options: [
      "Children of transferable and non-transferable Central Government employees and ex-servicemen",
      "Children of Central Autonomous bodies / PSUs",
      "Children of State Government employees",
      "Children from the general public / private sector"
    ],
    correctIndex: 0,
    explanation: "Category-I in Defence/Civil sector KVs is reserved for children of transferable and non-transferable Central Government employees and ex-servicemen. (In Institute of Higher Learning/Project sector, project employees' children are Category-I).",
    sourceRef: "KVS Admission Guidelines, Part A",
    difficulty: "Easy",
    published: true
  },
  {
    id: "q-kvs-3",
    module: "Perspectives in Education",
    topic: "KVS Education Code",
    question: "What is the motto inscribed on the emblem of Kendriya Vidyalaya Sangathan (KVS)?",
    options: [
      "तत् त्वं पूषन् अपावृणु (Tat Tvam Pushan Apavrinu)",
      "सत्यमेव जयते (Satyameva Jayate)",
      "विद्या ददाति विनयं (Vidya Dadati Vinayam)",
      "तमसो मा ज्योतिर्गमय (Tamaso Ma Jyotirgamaya)"
    ],
    correctIndex: 0,
    explanation: "The KVS emblem features the quotation from the Isha Upanishad: 'तत् त्वं पूषन् अपावृणु' (O Sun, please unveil that cover to reveal the truth).",
    sourceRef: "KVS Emblem & Foundation Charter",
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
];
