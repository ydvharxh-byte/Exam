export interface DriveTopic {
  id: number;
  title: string;
  category: string;
  url: string;
  description: string;
  iconName: string;
}

export const practiceDriveTopics: DriveTopic[] = [
  {
    id: 1,
    title: "General Awareness",
    category: "General Knowledge & Current Affairs",
    url: "https://drive.google.com/drive/folders/1XjJbDlzkYWGg1rj940pgPE2utZCXUodY?usp=sharing",
    description: "National & international affairs, Indian polity, government schemes, and educational news.",
    iconName: "Globe"
  },
  {
    id: 2,
    title: "Hindi Language & Grammar",
    category: "Languages",
    url: "https://drive.google.com/drive/folders/175TdCN-lrXY8kYRju3yhyLRKNx_opakN?usp=drive_link",
    description: "Hindi vyakaran, sandhi, samas, muhavare, comprehension, and vocabulary exercises.",
    iconName: "Languages"
  },
  {
    id: 3,
    title: "English Language & Comprehension",
    category: "Languages",
    url: "https://drive.google.com/drive/folders/14AkRpYyp7pjELmWz9ixgGPQIKSoxLc16?usp=drive_link",
    description: "Grammar, active-passive voice, idioms, reading comprehension passages, and vocab.",
    iconName: "BookOpen"
  },
  {
    id: 4,
    title: "Reasoning & Quantitative Aptitude",
    category: "Logical & Quantitative",
    url: "https://drive.google.com/drive/folders/1-fBRIIKRPKsTK9y1o7oxhcpUkLzgkuSB?usp=drive_link",
    description: "Analytical reasoning, blood relations, syllogisms, arithmetic, and problem solving.",
    iconName: "BrainCircuit"
  },
  {
    id: 5,
    title: "Mathematics & Numerical Ability",
    category: "Logical & Quantitative",
    url: "https://drive.google.com/drive/folders/1XyisqjROwYNHg65VEd_1Uf_bMlYm6ql1?usp=drive_link",
    description: "Data interpretation, algebra, percentages, ratios, geometry, and numerical speed tests.",
    iconName: "Calculator"
  },
  {
    id: 6,
    title: "Educational Policy & Measurement Evaluation",
    category: "Perspectives in Education",
    url: "https://drive.google.com/drive/folders/1AM0wVH1Y91TgaleCR1lzroDL67uaP18R?usp=drive_link",
    description: "NEP 2020, NCF-SE 2023, Bloom's taxonomy, formative/summative evaluation, and CCE.",
    iconName: "FileCheck2"
  },
  {
    id: 7,
    title: "Pedagogy in Education",
    category: "Perspectives in Education",
    url: "https://drive.google.com/drive/folders/1P0davJ7uONPauqBxJYOLsuNoPuusdqWW?usp=drive_link",
    description: "Child psychology, instructional design, inclusive education, classroom management, and ethics.",
    iconName: "GraduationCap"
  },
  {
    id: 8,
    title: "Office Procedure & CSMoP",
    category: "Administration & Rules",
    url: "https://drive.google.com/drive/folders/1IGEAJeq6bHtFCKpV28U2HuKgPqVIFuzo?usp=drive_link",
    description: "Central Secretariat Manual of Office Procedure, e-Office, filing, dak, noting, and drafting.",
    iconName: "FolderKanban"
  },
  {
    id: 9,
    title: "Digital Literacy & Cyber Safety",
    category: "Information Technology",
    url: "https://drive.google.com/open?id=11gry29imjL7UC2WJsO7HHd934thpUgLE&usp=drive_copy",
    description: "Information security, DPDP Act 2023, cyber hygiene, smart classroom tech, and ICT tools.",
    iconName: "ShieldAlert"
  },
  {
    id: 10,
    title: "Management & Financial Administration",
    category: "Administration & Finance",
    url: "https://drive.google.com/drive/folders/1Nv4UJ5gGMCV7EKHSjcpuTW5WrEH6wRV4?usp=drive_link",
    description: "GFR 2017, GeM procurement, CCS Rules, service records, budgeting, and institutional leadership.",
    iconName: "Briefcase"
  }
];
