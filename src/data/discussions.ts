import { DiscussionThread, DiscussionReply } from "./types";

export const starterThreads: DiscussionThread[] = [
  {
    id: "th-1",
    name: "Dr. Ananya Mukherjee",
    role: "Vice Principal",
    school: "KV IIT Powai, Mumbai",
    topic: "CCS (Leave) Rules & Vacation Department",
    module: "Admin & Finance",
    title: "Clarification on HPL accumulation vs Commuted Leave for teaching staff",
    question: "As teachers in a vacation department, can a PGT/TGT commute Half Pay Leave (HPL) on medical certificate without producing an MC if it is for an approved course of study? Also, what is the ceiling for accumulation of HPL in KVS?",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    likes: 14,
    views: 142,
    isResolved: true
  },
  {
    id: "th-2",
    name: "Shri Rajeshwar Verma",
    role: "PGT Physics (Aspiring Principal)",
    school: "KV AFS Bareilly",
    topic: "GFR 2017 & GeM Procurement",
    module: "Admin & Finance",
    title: "Financial limits of Principal as DDO under Rule 149 of GFR 2017 for GeM purchases",
    question: "When procuring laboratory apparatus or IT equipment for smart classes through GeM, what are the precise limits for direct purchase vs L1 comparison on GeM? Does VMC sanction need to precede the GeM order or can it be ex-post facto for minor repairs?",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    likes: 22,
    views: 210,
    isResolved: true
  },
  {
    id: "th-3",
    name: "Smt. Sunita Bhattacharya",
    role: "Headmistress (HM)",
    school: "KV Fort William, Kolkata",
    topic: "NEP 2020 & Balvatika Implementation",
    module: "Perspectives in Education",
    title: "Pedagogical alignment of Jaadui Pitara with Balvatika 1, 2, and 3",
    question: "For the interview segment of the Principal selection, how should one present the transition from play-based experiential learning in Balvatika to structured Grade 1 learning without creating developmental cognitive overload? Any specific NCF-FS 2022 rubrics to highlight?",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    likes: 19,
    views: 185,
    isResolved: false
  },
  {
    id: "th-4",
    name: "Mohd. Tariq Khan",
    role: "PGT English",
    school: "KV No. 1 Chhatarpur",
    topic: "CCS (CCA) Rules 1965",
    module: "Admin & Finance",
    title: "Procedure for preliminary fact-finding enquiry vs Rule 14 inquiry",
    question: "What are the essential distinctions between a preliminary fact-finding inquiry conducted by a Principal upon receiving a complaint, and a formal departmental inquiry under Rule 14 of CCS (CCA) Rules? Does the employee have the right to a defense assistant during preliminary inquiry?",
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    likes: 31,
    views: 340,
    isResolved: true
  }
];

export const starterReplies: DiscussionReply[] = [
  {
    id: "rep-1",
    threadId: "th-1",
    name: "Shri R. K. Saxena",
    role: "Retired Education Officer",
    school: "KVS RO Jaipur",
    text: "Under Rule 30 of CCS (Leave) Rules, Commuted Leave is granted on medical certificate up to a maximum of 240 days in entire service without medical certificate if it is utilized for an approved course of study. Regarding accumulation, unlike EL which is capped at 300 days, there is NO statutory ceiling on the accumulation of HPL. Upon retirement, encashment of both EL and HPL combined is subject to an overall ceiling of 300 days.",
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    likes: 11
  },
  {
    id: "rep-2",
    threadId: "th-1",
    name: "Dr. Ananya Mukherjee",
    role: "Vice Principal",
    school: "KV IIT Powai",
    text: "Thank you so much, Sir! That clears the distinction between Rule 28 and Rule 30 completely. Very helpful for the Administrative Service Rules section.",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    likes: 4
  },
  {
    id: "rep-3",
    threadId: "th-2",
    name: "Pradeep Joshi",
    role: "Principal",
    school: "KV Cantt, Varanasi",
    text: "On GeM: (1) Up to ₹25,000: Direct purchase from any available seller meeting specs. (2) ₹25,000 to ₹5,00,000: L1 purchase through GeM comparison of at least 3 manufacturers/sellers. (3) Above ₹5,00,000: Mandatory online bidding / reverse auction on GeM. Crucially: Prior approval from VMC / Chairman VMC is mandatory if expenditure exceeds the Principal's delegated financial power under VVN guidelines. Never rely on ex-post facto approvals except for documented structural emergencies.",
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString(),
    likes: 18
  },
  {
    id: "rep-4",
    threadId: "th-4",
    name: "V. Swaminathan",
    role: "Administrative Officer",
    school: "KVS HQ New Delhi",
    text: "A preliminary enquiry is purely fact-finding to determine whether a prima facie case exists. The accused employee has NO right to a defense assistant during preliminary inquiry. In contrast, under Rule 14 formal inquiry, the charged official has statutory right to inspect listed documents, cross-examine prosecution witnesses, and engage a defense assistant as per Rule 14(8).",
    createdAt: new Date(Date.now() - 3600000 * 80).toISOString(),
    likes: 25
  }
];
