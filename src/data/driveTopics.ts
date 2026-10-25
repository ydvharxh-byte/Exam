export interface DriveTopic {
  id: number;
  title: string;
  category: string;
  url: string;
  description: string;
  iconName: string;
  badge?: string;
}

export const practiceDriveTopics: DriveTopic[] = [
  {
    id: 1,
    title: "General Awareness",
    category: "GK & Current Affairs",
    url: "https://drive.google.com/drive/folders/1XjJbDlzkYWGg1rj940pgPE2utZCXUodY?usp=drive_link",
    description: "National & international affairs, Indian polity, government schemes, and current events.",
    iconName: "Globe",
    badge: "GK & Current Affairs"
  },
  {
    id: 2,
    title: "Hindi Language & Grammar",
    category: "Language",
    url: "https://drive.google.com/drive/folders/175TdCN-lrXY8kYRju3yhyLRKNx_opakN?usp=drive_link",
    description: "Hindi grammar, active-passive voice, idioms, comprehension, and vocabulary.",
    iconName: "Languages",
    badge: "Language"
  },
  {
    id: 3,
    title: "English Language & Comprehension",
    category: "Language",
    url: "https://drive.google.com/drive/folders/14AkRpYyp7pjELmWz9ixgGPQIKSoxLc16?usp=drive_link",
    description: "English grammar, reading comprehension, vocabulary, and communication passages.",
    iconName: "BookOpen",
    badge: "Language"
  },
  {
    id: 4,
    title: "Reasoning & Quantitative Aptitude",
    category: "Aptitude & Reasoning",
    url: "https://drive.google.com/drive/folders/1-fBRIIKRPKsTK9y1o7oxhcpUkLzgkuSB?usp=drive_link",
    description: "Analytical reasoning, blood relations, syllogisms, arithmetic, and quantitative aptitude.",
    iconName: "BrainCircuit",
    badge: "Aptitude"
  },
  {
    id: 5,
    title: "Mathematics & Numerical Ability",
    category: "Mathematics",
    url: "https://drive.google.com/drive/folders/1XyisqjROwYNHg65VEd_1Uf_bMlYm6ql1?usp=drive_link",
    description: "Data interpretation, algebra, percentages, ratio, geometry, and numerical ability.",
    iconName: "Calculator",
    badge: "Mathematics"
  },
  {
    id: 6,
    title: "Educational Policy & Measurement Evaluation",
    category: "Education Policy",
    url: "https://drive.google.com/drive/folders/1AM0wVH1Y91TgaleCR1lzroDL67uaP18R?usp=drive_link",
    description: "NEP 2020, RTE Act, formative assessment, fundamental curriculum evaluation, and CCE.",
    iconName: "FileCheck2",
    badge: "Education Policy"
  },
  {
    id: 7,
    title: "Pedagogy in Education",
    category: "Pedagogy & Psychology",
    url: "https://drive.google.com/drive/folders/1P0davJ7uONPauqBxJYOLsuNoPuusdqWW?usp=drive_link",
    description: "Child development, inclusive education, motivation, classroom management, and leadership.",
    iconName: "GraduationCap",
    badge: "Pedagogy"
  },
  {
    id: 8,
    title: "Office Procedure & CSMoP",
    category: "Office Rules & Procedures",
    url: "https://drive.google.com/drive/folders/1IGEAJeq6bHtFCKpV28U2HuKgPqVIFuzo?usp=drive_link",
    description: "Central Secretariat Manual of Office Procedure, e-Office filing, noting, drafting, dak, and record keeping.",
    iconName: "FolderKanban",
    badge: "Office Rules"
  },
  {
    id: 9,
    title: "Digital Literacy & Cyber Safety",
    category: "Digital Literacy",
    url: "https://drive.google.com/drive/folders/11gry29imjL7UC2WJsO7HHd934thpUgLE?usp=drive_link",
    description: "CERT-In, cyber hygiene, digital transactions, cyber bullying, data privacy laws, and IT Act 2000.",
    iconName: "ShieldAlert",
    badge: "Digital Safety"
  },
  {
    id: 10,
    title: "Management & Financial Administration",
    category: "Finance & Procurement",
    url: "https://drive.google.com/drive/folders/1Nv4UJ5gGMCV7EKHSjcpuTW5WrEH6wRV4?usp=drive_link",
    description: "GFR 2017, GeM procurement, CCS Rules, service records, budgeting, and Treasury rules.",
    iconName: "Briefcase",
    badge: "Finance & GFR"
  },
  {
    id: 11,
    title: "Acts & Legislation",
    category: "Statutory Acts & Rules",
    url: "https://drive.google.com/drive/folders/1sqfu5cNhBjflO97tvOClv030-jG3AIDC?usp=drive_link",
    description: "Key Acts including DSEA 1973, RTI Act 2005, RTE Act 2009, and other relevant statutory legislation.",
    iconName: "BookOpen",
    badge: "Acts"
  },
  {
    id: 12,
    title: "GFR 2017",
    category: "Financial Rules",
    url: "https://drive.google.com/drive/folders/1Zpq2j0iMsqqx6KXxgG5f9zEHK9FVr6W7?usp=drive_link",
    description: "General Financial Rules 2017, procurement norms, budget estimates, and expenditure management.",
    iconName: "Calculator",
    badge: "GFR 2017"
  }
];
