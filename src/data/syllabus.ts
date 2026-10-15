export interface SyllabusSection {
  part: string;
  title: string;
  marks: number;
  questions: number;
  subtopics: {
    name: string;
    description: string;
    reference: string;
  }[];
}

export const EXAM_SCHEME = {
  totalMarks: 150,
  durationMinutes: 150,
  testType: "Computer Based Test (CBT) Multiple Choice Questions",
  negativeMarking: "No negative marking (1 mark per correct answer)",
  interviewMarks: 60,
  finalWeightage: "Written CBT Test : Interview = 85 : 15",
  eligibilitySnippet: "Master's Degree with at least 50% marks, B.Ed. or equivalent, and qualifying teaching/administrative leadership experience (Vice-Principal / PGT / Educational Administrator) as prescribed under UPSC Recruitment Rules."
};

export const syllabusSections: SyllabusSection[] = [
  {
    part: "Part I",
    title: "Perspectives on Education and Leadership",
    marks: 60,
    questions: 60,
    subtopics: [
      {
        name: "Understanding the Learner",
        description: "Developmental characteristics of adolescents, cognitive & emotional challenges, role of socio-cultural context, guidance & counselling needs.",
        reference: "NCERT Adolescent Education Manual, Educational Psychology"
      },
      {
        name: "Understanding Teaching-Learning",
        description: "Theoretical perspectives of learning (Behaviorism, Cognitivism, Constructivism), curriculum planning, pedagogical competencies, competency-based education (CBE).",
        reference: "NCF-SE 2023, Bloom's Revised Taxonomy"
      },
      {
        name: "Creating Conducive Learning Environment",
        description: "Diversity, disability and inclusion (RPwD Act 2016), mental health in schools (Manodarpan initiative), school climate, life skills development.",
        reference: "Inclusion Guidelines & RPwD Act 2016"
      },
      {
        name: "School Organization & Leadership",
        description: "Principal as instructional leader, building collaborative culture, school development plan (SDP), leading teacher development, partnership with community & SMC.",
        reference: "NCSL (NIEPA) School Leadership Framework"
      },
      {
        name: "Perspectives in Education",
        description: "NEP 2020 guiding principles, RTE Act 2009 statutory obligations, NCF-SE 2023 structure (5+3+3+4), PM SHRI schools, SQAAF accreditation framework.",
        reference: "National Education Policy 2020, RTE Act 2009"
      }
    ]
  },
  {
    part: "Part II",
    title: "General Administration and Financial Rules",
    marks: 50,
    questions: 50,
    subtopics: [
      {
        name: "Service & Conduct Rules",
        description: "CCS (Conduct) Rules 1964 (Rules 3, 5, 9, 13, 15, 18), CCS (CCA) Rules 1965 (Minor vs Major Penalties, Rule 14 & Rule 16 procedures, Suspension, Appeals).",
        reference: "Swamy's Handbook, CCS (Conduct & CCA) Rules"
      },
      {
        name: "Leave & Joining Time Rules",
        description: "CCS (Leave) Rules 1972 (EL, HPL, Commuted Leave, Maternity, Paternity, Child Care Leave, Study Leave) and Central Civil Services Joining Time Rules 1979.",
        reference: "CCS (Leave) Rules 1972"
      },
      {
        name: "General Financial Rules (GFR 2017)",
        description: "General Principles of Financial Propriety, procurement of goods and services via GeM (Rule 149), tendering procedures, contract management, advances, write-off.",
        reference: "GFR 2017 & Procurement Manual"
      },
      {
        name: "Administrative Procedures, DSEAR 1973 & School Governance",
        description: "Constitution and functions of School Management Committee (SMC), Principal's administrative and financial powers, School Fund accounting, Delhi School Education Act & Rules (DSEAR 1973) & Central Education Codes.",
        reference: "Administrative Examination Syllabus & Civil Governance Manual"
      },
      {
        name: "Statutory Acts & Child Welfare",
        description: "POCSO Act 2012 (mandatory reporting, child safety), POSH Act 2013 (Internal Complaints Committee), Right to Information (RTI) Act 2005 (CPIO duties & appeals).",
        reference: "POCSO Act 2012, RTI Act 2005, POSH Act 2013"
      }
    ]
  },
  {
    part: "Part III",
    title: "General Knowledge & Current Affairs",
    marks: 20,
    questions: 20,
    subtopics: [
      {
        name: "Current Affairs & National Initiatives",
        description: "National and international contemporary affairs, scientific discoveries, awards and honours, Government of India educational schemes.",
        reference: "Annual Year Book, MoE Initiatives"
      },
      {
        name: "Indian Polity & Constitutional Values",
        description: "Fundamental Rights, Directive Principles, Preamble values, educational provisions in Indian Constitution (Article 21A, 30, 45, 315).",
        reference: "Constitution of India"
      }
    ]
  },
  {
    part: "Part IV",
    title: "Reasoning Ability & Digital Literacy",
    marks: 20,
    questions: 20,
    subtopics: [
      {
        name: "Reasoning & Analytical Ability",
        description: "Verbal and non-verbal reasoning, series, analogies, syllogisms, blood relations, direction tests, and data sufficiency.",
        reference: "Standard Analytical Reasoning"
      },
      {
        name: "Digital Literacy & Educational Technology",
        description: "ICT in classroom instruction, DIKSHA portal, PM e-VIDYA, digital safety and cyber hygiene, school management software (UDISE+).",
        reference: "NEP 2020 Digital Initiatives, Cyber Security Guidelines"
      }
    ]
  },
  {
    part: "Part V",
    title: "Language Proficiency (General English & General Hindi)",
    marks: 30,
    questions: 30,
    subtopics: [
      {
        name: "General English (15 Marks)",
        description: "Reading comprehension, spotting errors, sentence completion, vocabulary, idioms and phrases, precision in official communication.",
        reference: "Standard English Grammar & Composition"
      },
      {
        name: "General Hindi (15 Marks)",
        description: "गद्यांश आधारित प्रश्न, संधि, समास, पर्यायवाची, विलोम शब्द, वर्तनी शुद्धि, मुहावरे एवं प्रशासनिक पारिभाषिक शब्दावली (राजभाषा नियम).",
        reference: "राजभाषा नियम 1976 एवं मानक हिंदी व्याकरण"
      }
    ]
  }
];

export const RECOMMENDED_BOOKS = [
  {
    title: "Swamy's Handbook for Central Government Staff",
    author: "Muthuswamy & Brinda",
    focus: "CCS (Conduct), CCS (CCA), CCS (Leave), FR & SR, LTC and TA Rules.",
    badge: "Essential"
  },
  {
    title: "General Financial Rules (GFR 2017) & GeM Procurement Manual",
    author: "Ministry of Finance, Govt. of India",
    focus: "Rules 21, 149, 154, 155, purchase committees, sanctions, and audit.",
    badge: "Must Read"
  },
  {
    title: "Civil Services Manual & School Governance Code",
    author: "Union Public Service Commission / Ministry of Education",
    focus: "SMC constitution, admission norms, school accounts, pupil funds, and staff council.",
    badge: "Official UPSC"
  },
  {
    title: "National Education Policy 2020 & NCF-SE 2023",
    author: "Ministry of Education / NCERT",
    focus: "Foundational stage to secondary stage reforms, assessment, and pedagogy.",
    badge: "Policy"
  },
  {
    title: "Educational Measurement and Evaluation (BES-127)",
    author: "IGNOU School of Education",
    focus: "Criterion-referenced testing, validity, reliability, rubrics, and HPC.",
    badge: "Evaluation"
  }
];
