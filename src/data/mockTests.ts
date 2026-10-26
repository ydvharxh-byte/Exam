import { MockTestItem } from "./types";
import { upscMock1Questions } from "./upscMock1Questions";
import { csmopQuestions } from "./csmopQuestions";

const LETTERS = ["A", "B", "C", "D"];

// Build answer key map for UPSC Mock 1
const upsc1KeyMap: Record<number, string> = {};
upscMock1Questions.forEach((q, idx) => {
  upsc1KeyMap[idx + 1] = LETTERS[q.correctIndex] || "A";
});

// Build answer key map for CSMoP Sample Paper
const csmopKeyMap: Record<number, string> = {};
csmopQuestions.forEach((q, idx) => {
  csmopKeyMap[idx + 1] = LETTERS[q.correctIndex] || "A";
});

export const starterMockTests: MockTestItem[] = [
  {
    id: "mock-upsc-cbt-1",
    title: "Official UPSC Administrative & Leadership CBT Mock Test 1 (2026)",
    type: "mock_test",
    subject: "Full UPSC Blueprint (Language, GA, Perspectives & Administration)",
    description: "Complete 120-question bilingual computer-based mock examination with instant automatic answer key verification, time tracking, and statutory references.",
    totalQuestions: upscMock1Questions.length,
    durationMinutes: 120,
    totalMarks: 300,
    negativeMarking: 0.33,
    questionPaperPdfName: "UPSC_Administrative_Mock_Test_Paper_1.pdf",
    answerKeyPdfName: "Official_Answer_Key_UPSC_Mock_1_Final.pdf",
    answerKeyMap: upsc1KeyMap,
    questions: upscMock1Questions,
    createdAt: "2026-10-24T10:00:00.000Z",
    published: true,
    attemptsCount: 342,
    averageScore: 198,
    difficulty: "Medium",
    tags: ["Official Key", "Bilingual", "CBT Ready", "120 Questions"],
    isFeatured: true
  },
  {
    id: "sample-paper-csmop-1",
    title: "Central Secretariat CSMoP & Office Procedure Sample Question Paper",
    type: "sample_paper",
    subject: "CSMoP & Office Procedure Rules (16th Edition)",
    description: "Authentic model question paper covering dak handling, file management, e-Office procedures, noting, drafting, and record retention with verified answer key.",
    totalQuestions: csmopQuestions.length,
    durationMinutes: 60,
    totalMarks: 100,
    negativeMarking: 0.25,
    questionPaperPdfName: "CSMoP_Administrative_Sample_Paper.pdf",
    answerKeyPdfName: "CSMoP_Official_Answer_Key_Master.pdf",
    answerKeyMap: csmopKeyMap,
    questions: csmopQuestions,
    createdAt: "2026-10-25T14:30:00.000Z",
    published: true,
    attemptsCount: 215,
    averageScore: 78,
    difficulty: "Medium",
    tags: ["CSMoP", "Sample Paper", "Verified Key", "51 Questions"],
    isFeatured: true
  },
  {
    id: "sample-paper-gfr-2017",
    title: "Financial Administration, GFR 2017 & GeM Model Solved Paper",
    type: "sample_paper",
    subject: "Financial Administration & Government e-Marketplace",
    description: "Comprehensive model paper focusing on General Financial Rules 2017, procurement procedures, delegation of financial powers, and audit compliance.",
    totalQuestions: 25,
    durationMinutes: 35,
    totalMarks: 50,
    negativeMarking: 0.25,
    questionPaperPdfName: "GFR_2017_GeM_Model_Question_Paper.pdf",
    answerKeyPdfName: "GFR_2017_Official_Answer_Key.pdf",
    answerKeyMap: {
      1: "B", 2: "C", 3: "A", 4: "D", 5: "B",
      6: "C", 7: "A", 8: "D", 9: "C", 10: "B",
      11: "A", 12: "C", 13: "D", 14: "B", 15: "A",
      16: "D", 17: "B", 18: "C", 19: "A", 20: "B",
      21: "C", 22: "D", 23: "A", 24: "B", 25: "C"
    },
    createdAt: "2026-10-26T08:00:00.000Z",
    published: true,
    attemptsCount: 168,
    averageScore: 39,
    difficulty: "Hard",
    tags: ["GFR 2017", "GeM", "Model Paper", "Answer Key Attached"],
    isFeatured: false
  }
];
