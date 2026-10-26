import { Announcement } from "./types";

export const starterAnnouncements: Announcement[] = [
  {
    id: "ann-mock-1",
    title: "🎯 Official UPSC Administrative Mock Test 1 (2026) Released with Answer Key",
    message: "The 120-question comprehensive computer-based mock examination paper with official answer key and statutory explanations is now active. Candidates can practice in interactive CBT or PDF Answer Key mode.",
    publicationDate: "2026-10-26T09:00:00.000Z",
    priority: "High",
    category: "Exam Alert",
    linkText: "Attempt Mock Test Now",
    linkUrl: "mocktests",
    active: true
  },
  {
    id: "ann-sample-csmop",
    title: "📑 CSMoP 16th Edition Sample Question Paper & Official Answer Sheet Published",
    message: "A specialized 51-question sample paper covering Central Secretariat Manual of Office Procedure (CSMoP), noting, and e-Office rules has been published in the Mock Tests & Papers portal.",
    publicationDate: "2026-10-25T14:30:00.000Z",
    priority: "Normal",
    category: "Resource",
    linkText: "Solve Sample Paper",
    linkUrl: "mocktests",
    active: true
  },
  {
    id: "ann-cbt-guidelines",
    title: "📢 Guidelines for CBT Examination Pattern & Negative Marking Scheme",
    message: "Aspirants are advised to review the official blueprint: 150 Questions, 180 Minutes, with standard 0.33 deduction for incorrect objective responses. Practice mock papers to master speed and accuracy.",
    publicationDate: "2026-10-24T11:00:00.000Z",
    priority: "Normal",
    category: "Circular",
    linkText: "Check Exam Pattern",
    linkUrl: "syllabus",
    active: true
  }
];
