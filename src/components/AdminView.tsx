import React, { useState } from "react";
import { AdminUser, Question, Announcement, ResourceItem, ActivityLog, MockTestItem } from "../data/types";
import { 
  ShieldCheck, 
  PlusCircle, 
  BookOpen, 
  HelpCircle, 
  Bell, 
  Clock, 
  RefreshCw,
  LogOut,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Sparkles,
  BarChart3,
  Award,
  Layers,
  FileCheck2,
  Check,
  Search
} from "lucide-react";

interface AdminViewProps {
  admins: AdminUser[];
  activeAdmin: AdminUser | null;
  onLogin: (email: string, pass: string) => boolean;
  onLogout: () => void;
  questions: Question[];
  onToggleQuestionPublish: (id: string) => void;
  onAddQuestion: (q: Omit<Question, "id">) => void;
  announcements: Announcement[];
  onToggleAnnouncement: (id: string) => void;
  onAddAnnouncement: (a: Omit<Announcement, "id">) => void;
  resources: ResourceItem[];
  onSyncResources: () => void;
  logs: ActivityLog[];
  mockTests: MockTestItem[];
  onAddMockTest: (test: Omit<MockTestItem, "id">, autoAnnounce?: boolean) => void;
  onToggleMockTestPublish: (id: string) => void;
  onDeleteMockTest: (id: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  admins: _admins,
  activeAdmin,
  onLogin,
  onLogout,
  questions,
  onToggleQuestionPublish,
  onAddQuestion,
  announcements,
  onToggleAnnouncement: _onToggleAnnouncement,
  onAddAnnouncement,
  resources,
  onSyncResources,
  logs,
  mockTests,
  onAddMockTest,
  onToggleMockTestPublish,
  onDeleteMockTest
}) => {
  const [adminTab, setAdminTab] = useState<"insights" | "bank" | "logs">("insights");

  // Login Form
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Question Form
  const [newTopic, setNewTopic] = useState("");
  const [newModule, setNewModule] = useState("Admin & Finance");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [newExplanation, setNewExplanation] = useState("");
  const [newSourceRef, setNewSourceRef] = useState("");

  // Announcement Form
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnMessage, setNewAnnMessage] = useState("");
  const [newAnnPriority, setNewAnnPriority] = useState<Announcement["priority"]>("Normal");
  const [newAnnCategory, setNewAnnCategory] = useState<Announcement["category"]>("Circular");

  // ----------------------------------------------------------------------
  // INSIGHT: Mock Test & Answer Key Upload State
  // ----------------------------------------------------------------------
  const [mockTitle, setMockTitle] = useState("");
  const [mockType, setMockType] = useState<"mock_test" | "sample_paper">("mock_test");
  const [mockSubject, setMockSubject] = useState("General Administration & CSMoP");
  const [mockDescription, setMockDescription] = useState("");
  const [mockQuestionsCount, setMockQuestionsCount] = useState<number>(20);
  const [mockDurationMinutes, setMockDurationMinutes] = useState<number>(30);
  const [mockTotalMarks, setMockTotalMarks] = useState<number>(50);
  const [mockNegativeMarking, setMockNegativeMarking] = useState<number>(0.25);
  const [mockDifficulty, setMockDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");

  // Files state
  const [questionPaperFile, setQuestionPaperFile] = useState<File | null>(null);
  const [questionPaperDataUrl, setQuestionPaperDataUrl] = useState<string>("");
  const [answerKeyFile, setAnswerKeyFile] = useState<File | null>(null);
  const [answerKeyDataUrl, setAnswerKeyDataUrl] = useState<string>("");

  // Answer Key mapping state
  const [rawAnswerKeyText, setRawAnswerKeyText] = useState("");
  const [answerKeyMap, setAnswerKeyMap] = useState<Record<number, string>>({});
  const [autoAnnounce, setAutoAnnounce] = useState(true);
  const [uploadSuccessNotice, setUploadSuccessNotice] = useState("");

  // Optional Question Parser text
  const [rawQuestionsText, setRawQuestionsText] = useState("");

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = onLogin(emailInput.trim(), passwordInput);
    if (!success) {
      setLoginError("Invalid administrator credentials. Try demo: admin@upsc.local / upscadmin or admin@examportal.local / adminpassword");
    } else {
      setEmailInput("");
      setPasswordInput("");
    }
  };

  // Handle Create Single Question
  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newQuestionText.trim() || options.some(opt => !opt.trim())) return;
    onAddQuestion({
      topic: newTopic.trim(),
      module: newModule,
      question: newQuestionText.trim(),
      options: [...options],
      correctIndex,
      explanation: newExplanation.trim() || "Verified official reference question.",
      sourceRef: newSourceRef.trim() || "Administrative Code / GFR 2017",
      published: true
    });
    setNewTopic("");
    setNewQuestionText("");
    setOptions(["", "", "", ""]);
    setNewExplanation("");
    setNewSourceRef("");
  };

  // Handle Create Announcement
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnMessage.trim()) return;
    onAddAnnouncement({
      title: newAnnTitle.trim(),
      message: newAnnMessage.trim(),
      priority: newAnnPriority,
      category: newAnnCategory,
      publicationDate: new Date().toISOString(),
      active: true
    });
    setNewAnnTitle("");
    setNewAnnMessage("");
  };

  // Handle Question Paper PDF Upload
  const handleQuestionPaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setQuestionPaperFile(file);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setQuestionPaperDataUrl(uploadEvent.target?.result as string || "");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Answer Key PDF/File Upload
  const handleAnswerKeyUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAnswerKeyFile(file);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string || "";
        setAnswerKeyDataUrl(result);
        // If it's text/csv, try auto-parsing
        if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".csv")) {
          parseAnswerKeyString(result);
        }
      };
      if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".csv")) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  // Smart Parser for Answer Key Strings (e.g. "1:A, 2:B" or "1. C 2. D" or "A, B, C, D" or "1(c) 2(d)")
  const parseAnswerKeyString = (text: string) => {
    const newMap: Record<number, string> = {};
    if (!text) return;

    // Pattern 1: Look for pairs like 1:A, 1-A, 1. A, 1) B, Q1: C, Q.1 - D
    const pairRegex = /(?:Q\.?|Question)?\s*(\d+)[\s:.\-\)]+([A-Da-d])/gi;
    let match;
    let foundPairs = 0;
    while ((match = pairRegex.exec(text)) !== null) {
      const qNum = parseInt(match[1], 10);
      const opt = match[2].toUpperCase();
      newMap[qNum] = opt;
      foundPairs++;
    }

    // Pattern 2: If no pairs found, split by comma / space / newline of single letters A-D
    if (foundPairs === 0) {
      const letters = text.match(/\b([A-Da-d])\b/g);
      if (letters && letters.length > 0) {
        letters.forEach((letStr, idx) => {
          newMap[idx + 1] = letStr.toUpperCase();
        });
        foundPairs = letters.length;
      }
    }

    if (foundPairs > 0) {
      setAnswerKeyMap(newMap);
      setMockQuestionsCount(Math.max(foundPairs, mockQuestionsCount));
    }
  };

  // Handle Manual/Parsed Key Selection
  const setSingleKey = (qNum: number, letter: string) => {
    setAnswerKeyMap((prev) => ({
      ...prev,
      [qNum]: letter
    }));
  };

  // Smart Question Text Parser
  const parseQuestionsFromText = (rawText: string): Question[] => {
    if (!rawText.trim()) return [];
    const questionsList: Question[] = [];
    
    // Split by Question patterns
    const chunks = rawText.split(/(?:^|\n)(?:Q\.?\s*\d+|Question\s*\d+)[:.]\s*/i).filter(Boolean);
    
    chunks.forEach((chunk, idx) => {
      const lines = chunk.trim().split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length > 0) {
        const qStatement = lines[0];
        const optA = lines.find(l => /^\(?A\)?[.\s]/i.test(l))?.replace(/^\(?A\)?[.\s]+/i, "") || "Option A";
        const optB = lines.find(l => /^\(?B\)?[.\s]/i.test(l))?.replace(/^\(?B\)?[.\s]+/i, "") || "Option B";
        const optC = lines.find(l => /^\(?C\)?[.\s]/i.test(l))?.replace(/^\(?C\)?[.\s]+/i, "") || "Option C";
        const optD = lines.find(l => /^\(?D\)?[.\s]/i.test(l))?.replace(/^\(?D\)?[.\s]+/i, "") || "Option D";
        
        const officialKey = answerKeyMap[idx + 1] || "A";
        const correctIdx = ["A", "B", "C", "D"].indexOf(officialKey);

        questionsList.push({
          id: `parsed-q-${idx + 1}`,
          module: mockSubject,
          topic: mockTitle || "Mock Test",
          question: qStatement,
          options: [optA, optB, optC, optD],
          correctIndex: correctIdx >= 0 ? correctIdx : 0,
          explanation: `Official Answer Key: Option ${officialKey}. Statutory verification reference.`,
          sourceRef: `${mockTitle}, Q${idx + 1}`,
          published: true
        });
      }
    });

    return questionsList;
  };

  // Handle Mock Test & Answer Key Creation
  const handlePublishMockTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockTitle.trim()) return;

    // Ensure answer key map has entries up to mockQuestionsCount
    const finalKeyMap: Record<number, string> = { ...answerKeyMap };
    for (let i = 1; i <= mockQuestionsCount; i++) {
      if (!finalKeyMap[i]) {
        finalKeyMap[i] = ["A", "B", "C", "D"][(i - 1) % 4];
      }
    }

    // Optional parsed questions
    const parsedQuestions = parseQuestionsFromText(rawQuestionsText);

    const newTest: Omit<MockTestItem, "id"> = {
      title: mockTitle.trim(),
      type: mockType,
      subject: mockSubject,
      description: mockDescription.trim() || `Official ${mockType === "mock_test" ? "Mock CBT Exam" : "Sample Paper"} with ${mockQuestionsCount} questions and verified official answer key.`,
      totalQuestions: mockQuestionsCount,
      durationMinutes: mockDurationMinutes,
      totalMarks: mockTotalMarks,
      negativeMarking: mockNegativeMarking,
      questionPaperPdfUrl: questionPaperDataUrl || undefined,
      questionPaperPdfName: questionPaperFile ? questionPaperFile.name : `${mockTitle.replace(/\s+/g, "_")}_Paper.pdf`,
      answerKeyPdfUrl: answerKeyDataUrl || undefined,
      answerKeyPdfName: answerKeyFile ? answerKeyFile.name : `${mockTitle.replace(/\s+/g, "_")}_AnswerKey.pdf`,
      answerKeyMap: finalKeyMap,
      questions: parsedQuestions.length > 0 ? parsedQuestions : undefined,
      createdAt: new Date().toISOString(),
      published: true,
      attemptsCount: 0,
      averageScore: 0,
      difficulty: mockDifficulty,
      tags: [
        mockType === "mock_test" ? "CBT Mock" : "Sample Paper",
        "Official Answer Key",
        `${mockQuestionsCount} Questions`,
        mockSubject
      ],
      isFeatured: true
    };

    onAddMockTest(newTest, autoAnnounce);

    setUploadSuccessNotice(`Successfully published "${mockTitle}"! The mock test and answer key are now interactive for all candidates, and an announcement has been broadcast.`);

    // Reset Form
    setMockTitle("");
    setMockDescription("");
    setQuestionPaperFile(null);
    setQuestionPaperDataUrl("");
    setAnswerKeyFile(null);
    setAnswerKeyDataUrl("");
    setRawAnswerKeyText("");
    setAnswerKeyMap({});
    setRawQuestionsText("");

    setTimeout(() => {
      setUploadSuccessNotice("");
    }, 6000);
  };

  // -------------------------------------------------------------
  // RENDER: Administrator Login Screen
  // -------------------------------------------------------------
  if (!activeAdmin) {
    return (
      <div className="max-w-md mx-auto my-12 px-4 font-sans">
        <div className="p-8 rounded-3xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#3c4e2e] text-[#F2ECD8] mx-auto flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#1f2918] font-serif-title">Administrator Portal</h2>
            <p className="text-xs text-[#5a5040]">Sign in to access Insight Desk, upload mock tests, and manage examination resources.</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-[#fbe8e6] text-[#a82e22] text-xs border border-[#e8a39c] font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2f3b26] mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@upsc.local"
                className="w-full h-11 px-3.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs sm:text-sm outline-none focus:border-[#4a5f36] text-[#2f3b26]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2f3b26] mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs sm:text-sm outline-none focus:border-[#4a5f36] text-[#2f3b26]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Authenticate &amp; Enter Desk
            </button>
          </form>

          <div className="pt-3 border-t border-[#E2D8C0] text-center">
            <p className="text-[11px] text-[#7e725d]">
              Demo: <span className="font-mono text-[#2f3b26] font-semibold">admin@examportal.local</span> / <span className="font-mono text-[#2f3b26] font-semibold">adminpassword</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate insight stats
  const totalAttempts = mockTests.reduce((acc, t) => acc + (t.attemptsCount || 0), 0);
  const avgPerformance = mockTests.length > 0 
    ? Math.round(mockTests.reduce((acc, t) => acc + (t.averageScore ? (t.averageScore / t.totalMarks) * 100 : 0), 0) / mockTests.length)
    : 0;

  // -------------------------------------------------------------
  // RENDER: Authenticated Admin Panel
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D5CBB4] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#DFE5D5] text-[#2F3D28] px-2.5 py-0.5 rounded border border-[#C0CCB1]">
              Super Admin Control
            </span>
            <span className="text-xs text-[#6e634f]">Logged in as {activeAdmin.email}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2918] font-serif-title mt-1">
            UPSC Portal Administrative Workspace
          </h2>
        </div>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-[#34452C] text-xs font-semibold hover:bg-[#EAE2CE] transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Desk</span>
        </button>
      </div>

      {/* Admin Tab Selector: INSIGHTS vs QUESTION BANK vs AUDIT LOGS */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#EAE2CE] border border-[#D5CBB4] max-w-fit">
        <button
          onClick={() => setAdminTab("insights")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            adminTab === "insights"
              ? "bg-[#34452C] text-[#F4F0E6] shadow-xs"
              : "text-[#5a5040] hover:text-[#1f2918]"
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-300" />
          <span>Insight: Mock Tests &amp; Answer Keys</span>
          <span className="bg-amber-400 text-[#1f2918] text-[9px] font-bold px-1.5 py-0.2 rounded-md">
            New
          </span>
        </button>

        <button
          onClick={() => setAdminTab("bank")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            adminTab === "bank"
              ? "bg-[#34452C] text-[#F4F0E6] shadow-xs"
              : "text-[#5a5040] hover:text-[#1f2918]"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Question Bank &amp; Circulars</span>
        </button>

        <button
          onClick={() => setAdminTab("logs")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            adminTab === "logs"
              ? "bg-[#34452C] text-[#F4F0E6] shadow-xs"
              : "text-[#5a5040] hover:text-[#1f2918]"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Audit Log Timeline</span>
        </button>
      </div>

      {/* -------------------------------------------------------------
          TAB 1: INSIGHT DESK & MOCK TEST MANAGER (User's primary request)
          ------------------------------------------------------------- */}
      {adminTab === "insights" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Success Banner */}
          {uploadSuccessNotice && (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-medium flex items-center gap-3 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>{uploadSuccessNotice}</span>
            </div>
          )}

          {/* Insight Analytics Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                label: "Active Mock Tests", 
                val: mockTests.filter(t => t.type === "mock_test").length, 
                sub: `${mockTests.length} Total Papers`, 
                icon: <FileText className="w-5 h-5 text-[#3c4e2e]" />, 
                bg: "bg-[#DFE5D5]", 
                border: "border-[#C0CCB1]" 
              },
              { 
                label: "Sample Papers", 
                val: mockTests.filter(t => t.type === "sample_paper").length, 
                sub: "CSMoP & GFR Solved", 
                icon: <BookOpen className="w-5 h-5 text-[#8C522A]" />, 
                bg: "bg-[#F0E6D2]", 
                border: "border-[#DBC8A8]" 
              },
              { 
                label: "Aspirant CBT Attempts", 
                val: totalAttempts, 
                sub: "Live Engagement", 
                icon: <Award className="w-5 h-5 text-[#3c4e2e]" />, 
                bg: "bg-[#DFE5D5]", 
                border: "border-[#C0CCB1]" 
              },
              { 
                label: "Key Verification Rate", 
                val: "100%", 
                sub: "Automated Evaluation", 
                icon: <CheckCircle2 className="w-5 h-5 text-[#8C522A]" />, 
                bg: "bg-[#F0E6D2]", 
                border: "border-[#DBC8A8]" 
              },
            ].map((s) => (
              <div key={s.label} className={`p-4 rounded-2xl ${s.bg} border ${s.border} shadow-xs`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#5a5040] font-semibold">{s.label}</span>
                  {s.icon}
                </div>
                <p className="text-2xl font-bold text-[#1f2918] font-serif-title">{s.val}</p>
                <p className="text-[11px] text-[#6e634f] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* -------------------------------------------------------------
              UPLOAD MOCK TEST WITH ANSWER KEY FORM
              ------------------------------------------------------------- */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DFE5D5] text-[#2F3D28] text-[10px] font-bold uppercase tracking-wider border border-[#C0CCB1]">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Automated CBT &amp; Announcement Generator</span>
              </div>
              <h3 className="text-xl font-bold text-[#1f2918] font-serif-title">
                Add Mock Test / Sample Paper with Official Answer Key
              </h3>
              <p className="text-xs text-[#5a5040]">
                Upload your Question Paper PDF and Answer Key PDF (or mapping). It will automatically become interactive on the Mock Tests &amp; Papers portal and be announced across the site.
              </p>
            </div>

            <form onSubmit={handlePublishMockTest} className="space-y-6">
              {/* Row 1: Title & Type */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#2f3b26] mb-1">
                    Mock Test / Sample Paper Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={mockTitle}
                    onChange={(e) => setMockTitle(e.target.value)}
                    placeholder="e.g. UPSC Administrative Officer CBT Mock Test 2 (2026)"
                    className="w-full h-11 px-3.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs sm:text-sm outline-none focus:border-[#4a5f36] text-[#2f3b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2f3b26] mb-1">
                    Paper Classification *
                  </label>
                  <select
                    value={mockType}
                    onChange={(e) => setMockType(e.target.value as typeof mockType)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs sm:text-sm outline-none focus:border-[#4a5f36] text-[#2f3b26]"
                  >
                    <option value="mock_test">Mock Test (CBT Exam)</option>
                    <option value="sample_paper">Sample Question Paper</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Subject, Questions Count, Duration, Total Marks */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2f3b26] mb-1">
                    Subject / Module
                  </label>
                  <select
                    value={mockSubject}
                    onChange={(e) => setMockSubject(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36] text-[#2f3b26]"
                  >
                    <option value="General Administration & CSMoP">General Administration &amp; CSMoP</option>
                    <option value="Full UPSC Blueprint">Full UPSC 150 Marks Blueprint</option>
                    <option value="Financial Rules & GFR 2017">Financial Rules &amp; GFR 2017</option>
                    <option value="Perspectives in Education & NEP">Perspectives in Education &amp; NEP</option>
                    <option value="Pedagogy & Evaluation">Pedagogy &amp; Evaluation</option>
                    <option value="School Safety & Service Law">School Safety &amp; Service Law</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2f3b26] mb-1">
                    Total Questions
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    required
                    value={mockQuestionsCount}
                    onChange={(e) => setMockQuestionsCount(parseInt(e.target.value, 10) || 10)}
                    className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36] text-[#2f3b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2f3b26] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    required
                    value={mockDurationMinutes}
                    onChange={(e) => setMockDurationMinutes(parseInt(e.target.value, 10) || 30)}
                    className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36] text-[#2f3b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2f3b26] mb-1">
                    Max Marks &amp; Penalty
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      min="10"
                      max="600"
                      required
                      value={mockTotalMarks}
                      onChange={(e) => setMockTotalMarks(parseInt(e.target.value, 10) || 50)}
                      placeholder="Marks"
                      className="w-1/2 h-10 px-2 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36] text-[#2f3b26]"
                    />
                    <select
                      value={mockNegativeMarking}
                      onChange={(e) => setMockNegativeMarking(parseFloat(e.target.value))}
                      className="w-1/2 h-10 px-1 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36] text-[#2f3b26]"
                    >
                      <option value="0.33">0.33 Neg</option>
                      <option value="0.25">0.25 Neg</option>
                      <option value="0">No Neg</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Two Dedicated PDF Upload Zones (Question Paper PDF & Answer Key PDF) */}
              <div className="grid md:grid-cols-2 gap-5 pt-2">
                {/* Zone A: Question Paper PDF */}
                <div className="p-5 rounded-2xl bg-[#FAF6EC] border-2 border-dashed border-[#C5BAA0] hover:border-[#4a5f36] transition space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#3c4e2e]" />
                    <span className="text-xs font-bold text-[#2f3b26]">
                      1. Upload Question Paper PDF / Document
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6e634f]">
                    Upload the full question paper PDF. Candidates will be able to read it in the integrated PDF viewer alongside the interactive answer sheet.
                  </p>

                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#C5BAA0] hover:bg-[#EAE2CE] text-xs font-bold text-[#34452C] cursor-pointer transition">
                    <Upload className="w-4 h-4" />
                    <span>Choose Question Paper PDF</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleQuestionPaperUpload}
                      className="hidden"
                    />
                  </label>

                  {questionPaperFile && (
                    <div className="p-2.5 rounded-xl bg-[#DFE5D5] border border-[#C0CCB1] text-xs text-[#2F3D28] flex items-center justify-between">
                      <span className="font-semibold truncate">{questionPaperFile.name}</span>
                      <span className="text-[10px] text-[#4a5f36]">
                        {Math.round(questionPaperFile.size / 1024)} KB
                      </span>
                    </div>
                  )}
                </div>

                {/* Zone B: Answer Key PDF / File */}
                <div className="p-5 rounded-2xl bg-[#FAF6EC] border-2 border-dashed border-[#C5BAA0] hover:border-[#4a5f36] transition space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#8C522A]" />
                    <span className="text-xs font-bold text-[#2f3b26]">
                      2. Upload Official Answer Key PDF / Key File
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6e634f]">
                    Upload the answer key document (PDF, TXT, or CSV) or enter answer keys below to enable automatic evaluation.
                  </p>

                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#C5BAA0] hover:bg-[#EAE2CE] text-xs font-bold text-[#34452C] cursor-pointer transition">
                    <Upload className="w-4 h-4" />
                    <span>Choose Answer Key PDF/File</span>
                    <input
                      type="file"
                      accept=".pdf,.txt,.csv"
                      onChange={handleAnswerKeyUpload}
                      className="hidden"
                    />
                  </label>

                  {answerKeyFile && (
                    <div className="p-2.5 rounded-xl bg-[#F0E6D2] border border-[#DBC8A8] text-xs text-[#523315] flex items-center justify-between">
                      <span className="font-semibold truncate">{answerKeyFile.name}</span>
                      <span className="text-[10px] text-[#8C522A]">
                        {Math.round(answerKeyFile.size / 1024)} KB
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 4: Answer Key Smart Input & Visual Key Selector */}
              <div className="p-5 rounded-2xl bg-white border border-[#D5CBB4] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#2f3b26] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Answer Key Matrix (Automatic Evaluation against Candidates' Submissions)</span>
                    </h4>
                    <p className="text-[11px] text-[#6e634f]">
                      Paste answer key text or click buttons below to configure the official key for Question 1 to {mockQuestionsCount}.
                    </p>
                  </div>

                  <span className="text-[11px] font-bold bg-[#DFE5D5] text-[#2F3D28] px-2.5 py-0.5 rounded-full border border-[#C0CCB1]">
                    {Object.keys(answerKeyMap).length} / {mockQuestionsCount} Keys Set
                  </span>
                </div>

                {/* Quick Paste & Auto Parse Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={rawAnswerKeyText}
                    onChange={(e) => setRawAnswerKeyText(e.target.value)}
                    placeholder="e.g. 1:B, 2:A, 3:C, 4:D, 5:A... or B, A, C, D..."
                    className="flex-1 h-9 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                  />
                  <button
                    type="button"
                    onClick={() => parseAnswerKeyString(rawAnswerKeyText)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-bold transition cursor-pointer"
                  >
                    Auto-Extract Keys
                  </button>
                </div>

                {/* Interactive Visual Key Matrix */}
                <div className="max-h-48 overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                    {Array.from({ length: mockQuestionsCount }, (_, i) => {
                      const qNum = i + 1;
                      const currentKey = answerKeyMap[qNum] || "A";

                      return (
                        <div
                          key={qNum}
                          className="p-2 rounded-xl bg-[#FAF6EC] border border-[#E2D8C0] flex items-center justify-between text-xs"
                        >
                          <span className="font-mono font-bold text-[#2f3b26]">Q{qNum}</span>
                          <div className="flex items-center gap-1">
                            {(["A", "B", "C", "D"] as const).map((letOpt) => (
                              <button
                                key={letOpt}
                                type="button"
                                onClick={() => setSingleKey(qNum, letOpt)}
                                className={`w-5 h-5 rounded text-[10px] font-bold transition cursor-pointer ${
                                  currentKey === letOpt
                                    ? "bg-[#34452C] text-white shadow-2xs"
                                    : "bg-white text-[#5a5040] hover:bg-[#EAE2CE]"
                                }`}
                              >
                                {letOpt}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Automatic Announcement Option */}
              <div className="p-4 rounded-2xl bg-[#DFE5D5]/60 border border-[#C0CCB1] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="autoAnnounceCheck"
                    checked={autoAnnounce}
                    onChange={(e) => setAutoAnnounce(e.target.checked)}
                    className="w-4 h-4 text-[#3c4e2e] rounded accent-[#3c4e2e]"
                  />
                  <label htmlFor="autoAnnounceCheck" className="text-xs font-bold text-[#2F3D28] cursor-pointer">
                    Automatically publish an Examination Announcement to all candidates
                    <span className="block text-[11px] font-normal text-[#5a6e4d]">
                      Broadcasting notice banner and unread badge in Header and Circulars
                    </span>
                  </label>
                </div>

                <span className="text-xs font-bold text-[#2F3D28] bg-white/80 px-2.5 py-1 rounded-lg">
                  Instant Release
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs sm:text-sm font-bold shadow-md transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Publish Mock Test &amp; Broadcast Announcement</span>
              </button>
            </form>
          </div>

          {/* -------------------------------------------------------------
              MANAGEMENT TABLE: Uploaded Mock Tests & Sample Papers
              ------------------------------------------------------------- */}
          <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#1f2918] font-serif-title">
                  Uploaded Mock Tests &amp; Sample Papers ({mockTests.length} Total)
                </h3>
                <p className="text-xs text-[#5a5040]">
                  Manage active testing items, verify keys, and inspect candidates' performance.
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {mockTests.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl border border-[#D5CBB4] bg-[#FAF6EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1f2918] text-sm font-serif-title">
                        {t.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.type === "mock_test" ? "bg-[#DFE5D5] text-[#2F3D28]" : "bg-[#F0E6D2] text-[#8C522A]"
                      }`}>
                        {t.type === "mock_test" ? "Mock Test (CBT)" : "Sample Paper"}
                      </span>
                    </div>

                    <p className="text-[#5a5040]">
                      {t.subject} • {t.totalQuestions} Questions • {t.durationMinutes} Mins • {t.totalMarks} Marks
                    </p>

                    <p className="text-[11px] text-[#8a7f66] flex items-center gap-3">
                      <span>Key Verified: {Object.keys(t.answerKeyMap).length} Qs</span>
                      <span>•</span>
                      <span>Paper: {t.questionPaperPdfName || "Digital"}</span>
                      <span>•</span>
                      <span>Attempts: {t.attemptsCount || 0}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => onToggleMockTestPublish(t.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        t.published
                          ? "bg-[#DFE5D5] text-[#2F3D28] border border-[#C0CCB1]"
                          : "bg-[#EAE2CE] text-[#7e725d]"
                      }`}
                    >
                      {t.published ? "Active" : "Draft"}
                    </button>

                    <button
                      onClick={() => onDeleteMockTest(t.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 border border-red-200 transition cursor-pointer"
                      title="Delete Mock Test"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: QUESTION BANK & NOTICES (Original management desk)
          ------------------------------------------------------------- */}
      {adminTab === "bank" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add Question Card */}
            <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#3c4e2e]" />
                <span>Add Single Question to Practice Bank</span>
              </h3>

              <form onSubmit={handleCreateQuestion} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Topic</label>
                    <input
                      type="text"
                      required
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="e.g. GFR 2017 Procurement"
                      className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Module</label>
                    <select
                      value={newModule}
                      onChange={(e) => setNewModule(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                    >
                      <option value="Admin & Finance">Admin &amp; Finance</option>
                      <option value="Perspectives in Education">Perspectives in Education</option>
                      <option value="Pedagogy & Evaluation">Pedagogy &amp; Evaluation</option>
                      <option value="School Safety & Law">School Safety &amp; Law</option>
                      <option value="General & Languages">General &amp; Languages</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Question Text</label>
                  <textarea
                    required
                    rows={2}
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Enter complete question statement..."
                    className="w-full p-2.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#2f3b26]">4 Multiple Choice Options</label>
                  {options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-[#EAE2CE] font-bold text-xs flex items-center justify-center shrink-0 border border-[#C5BAA0]">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) => {
                          const next = [...options];
                          next[i] = e.target.value;
                          setOptions(next);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        className="flex-1 h-9 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                      />
                      <input
                        type="radio"
                        name="correctOption"
                        checked={correctIndex === i}
                        onChange={() => setCorrectIndex(i)}
                        className="w-4 h-4 text-[#3c4e2e]"
                        title="Mark as correct answer"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Statutory Rule Ref</label>
                    <input
                      type="text"
                      value={newSourceRef}
                      onChange={(e) => setNewSourceRef(e.target.value)}
                      placeholder="e.g. Rule 149 GFR 2017"
                      className="w-full h-9 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Explanation</label>
                    <input
                      type="text"
                      value={newExplanation}
                      onChange={(e) => setNewExplanation(e.target.value)}
                      placeholder="Why this answer is legally correct..."
                      className="w-full h-9 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  Save &amp; Publish Question
                </button>
              </form>
            </div>

            {/* Add Announcement Card */}
            <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#8C522A]" />
                <span>Publish Circular / Examination Notice</span>
              </h3>

              <form onSubmit={handleCreateAnnouncement} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Notice Title</label>
                  <input
                    type="text"
                    required
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    placeholder="e.g. Administrative Exam CBT Date Schedule Released"
                    className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Priority</label>
                    <select
                      value={newAnnPriority}
                      onChange={(e) => setNewAnnPriority(e.target.value as Announcement["priority"])}
                      className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Category</label>
                    <select
                      value={newAnnCategory}
                      onChange={(e) => setNewAnnCategory(e.target.value as Announcement["category"])}
                      className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                    >
                      <option value="Exam Alert">Exam Alert</option>
                      <option value="Circular">Circular</option>
                      <option value="Administrative">Administrative</option>
                      <option value="Resource">Resource</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Message Body</label>
                  <textarea
                    required
                    rows={3}
                    value={newAnnMessage}
                    onChange={(e) => setNewAnnMessage(e.target.value)}
                    placeholder="Detailed contents of the notification..."
                    className="w-full p-2.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-[#8C522A] hover:bg-[#724120] text-[#F4F0E6] text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  Publish Circular
                </button>
              </form>

              {/* Quick Sync Button */}
              <div className="pt-4 border-t border-[#E2D8C0] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#2f3b26]">Study Repository Sync</p>
                  <p className="text-[11px] text-[#7e725d]">Sync indexed Drive files and cache metadata</p>
                </div>
                <button
                  onClick={onSyncResources}
                  className="px-3.5 py-2 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] hover:bg-[#EAE2CE] text-xs font-semibold text-[#34452C] flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Run Sync</span>
                </button>
              </div>
            </div>
          </div>

          {/* Question Bank Table */}
          <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#1f2918] font-serif-title">
              Manage Practice Questions ({questions.length} Items)
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {questions.slice(0, 30).map((q) => (
                <div key={q.id} className="p-3.5 rounded-xl border border-[#D5CBB4] bg-[#FAF6EC] flex items-center justify-between gap-4 text-xs">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#2f3b26]">{q.topic}</span>
                      <span className="text-[#8a7f66]">•</span>
                      <span className="text-[#6e634f]">{q.sourceRef}</span>
                    </div>
                    <p className="text-[#4b402e] line-clamp-1">{q.question}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleQuestionPublish(q.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        q.published ? "bg-[#DFE5D5] text-[#2F3D28] border border-[#C0CCB1]" : "bg-[#EAE2CE] text-[#7e725d]"
                      }`}
                    >
                      {q.published ? "Published" : "Draft"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 3: AUDIT LOG TIMELINE
          ------------------------------------------------------------- */}
      {adminTab === "logs" && (
        <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-3 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8C522A]" />
            <span>Audit Log Timeline ({logs.length} Actions)</span>
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto text-xs text-[#5a5040]">
            {logs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-[#FAF6EC] border border-[#E2D8C0] flex items-center justify-between">
                <span>{log.message}</span>
                <span className="text-[11px] text-[#8a7f66]">
                  {new Date(log.timestamp).toLocaleTimeString()} ({new Date(log.timestamp).toLocaleDateString()})
                </span>
              </div>
            ))}
            {logs.length === 0 && (
              <p className="text-[#8a7f66] italic">No admin actions recorded yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
