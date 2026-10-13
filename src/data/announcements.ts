import { Announcement } from "./types";

export const starterAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "KVS Principal & Vice-Principal Examination Scheme & Blueprint 2026",
    message: "Kendriya Vidyalaya Sangathan releases the updated scheme of examination for Principal (Direct Recruitment & LDCE). Total marks: 150 questions (150 marks) in CBT format, followed by Interview (60 marks). The merit weightage between Written Test and Interview will be 85:15.",
    publicationDate: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    priority: "High",
    category: "Exam Alert",
    linkText: "View Complete Syllabus",
    active: true
  },
  {
    id: "ann-2",
    title: "Circular on GFR 2017 & Public Procurement via GeM Compliance",
    message: "All prospective school heads must thoroughly review the revised threshold limits for GeM procurement under Rule 149 and updated guidelines for Vidyalaya Vikas Nidhi (VVN) maintenance. Practice modules in Section III have been updated accordingly.",
    publicationDate: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    priority: "Normal",
    category: "Administrative",
    active: true
  },
  {
    id: "ann-3",
    title: "NEP 2020 & NCF-SE 2023 Implementation Notes in E-Library",
    message: "New study modules on Panchakosha Vikas, Holistic Progress Card (HPC), and School Quality Assessment & Accreditation Framework (SQAAF) have been compiled from NCERT/NCSL and indexed in the Study Resources repository.",
    publicationDate: new Date(Date.now() - 3600000 * 24 * 9).toISOString(),
    priority: "Normal",
    category: "Resource",
    active: true
  }
];
