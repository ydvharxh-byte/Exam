import React, { useState, useEffect, useMemo } from "react";
import { MockTestItem, Question, Page } from "../data/types";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Award, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Bookmark, 
  Search, 
  BookOpen, 
  ExternalLink, 
  Download, 
  Eye, 
  Check, 
  ShieldCheck, 
  Pause, 
  Play, 
  ChevronRight,
  Filter,
  Layers,
  FileCheck2,
  Maximize2
} from "lucide-react";

interface MockTestsViewProps {
  mockTests: MockTestItem[];
  onNavigate: (page: Page) => void;
  initialTestId?: string | null;
  onClearInitialTest?: () => void;
}

export const MockTestsView: React.FC<MockTestsViewProps> = ({
  mockTests,
  onNavigate: _onNavigate,
  initialTestId,
  onClearInitialTest
}) => {
  // Search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "mock_test" | "sample_paper">("all");

  // Active Test State (null when in list mode, MockTestItem when taking a test)
  const [activeTest, setActiveTest] = useState<MockTestItem | null>(null);

  // Active Test View Mode: "cbt" (standard card CBT) | "pdf_omr" (PDF on left + digital answer sheet on right)
  const [cbtMode, setCbtMode] = useState<"cbt" | "pdf_omr">("cbt");

  // Exam Progress State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({}); // { questionNumber: "A"|"B"|"C"|"D" }
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Review Result Filter
  const [resultFilter, setResultFilter] = useState<"all" | "correct" | "incorrect" | "skipped">("all");

  // Quick Answer Key Modal (for viewing key without taking exam)
  const [previewKeyTest, setPreviewKeyTest] = useState<MockTestItem | null>(null);

  // Auto-start initial test if passed via prop (e.g. from announcement or dashboard)
  useEffect(() => {
    if (initialTestId) {
      const found = mockTests.find((t) => t.id === initialTestId);
      if (found) {
        startTest(found);
      }
      onClearInitialTest?.();
    }
  }, [initialTestId, mockTests]);

  // Filtered mock tests list
  const filteredTests = useMemo(() => {
    return mockTests.filter((test) => {
      const matchesSearch = 
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || test.type === filterType;
      return test.published && matchesSearch && matchesType;
    });
  }, [mockTests, searchQuery, filterType]);

  // Start a test
  const startTest = (test: MockTestItem, defaultMode: "cbt" | "pdf_omr" = "cbt") => {
    setActiveTest(test);
    setCbtMode(defaultMode);
    setCurrentQIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setSecondsRemaining(test.durationMinutes * 60);
    setIsTimerPaused(false);
    setIsSubmitted(false);
    setShowSubmitConfirm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Live Timer Countdown
  useEffect(() => {
    if (!activeTest || isSubmitted || isTimerPaused) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTest, isSubmitted, isTimerPaused]);

  // Format Time
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
    }
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Exit Exam
  const handleExitExam = () => {
    if (!isSubmitted) {
      const confirmExit = window.confirm("Are you sure you want to exit? Your exam progress will not be saved.");
      if (!confirmExit) return;
    }
    setActiveTest(null);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select option for Question #
  const handleSelectOption = (qNum: number, letter: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qNum]: prev[qNum] === letter ? "" : letter
    }));
  };

  // Toggle mark for review
  const toggleMarkForReview = (qNum: number) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [qNum]: !prev[qNum]
    }));
  };

  // Clear response for current question
  const clearCurrentResponse = () => {
    if (isSubmitted) return;
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQIndex + 1];
      return next;
    });
  };

  // Submit test
  const handleSubmitTest = () => {
    setShowSubmitConfirm(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Evaluation calculations
  const evaluation = useMemo(() => {
    if (!activeTest) return { score: 0, correct: 0, incorrect: 0, skipped: 0, percentage: 0 };
    
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    const totalQ = activeTest.totalQuestions;
    const marksPerQ = activeTest.totalMarks / totalQ;
    const penalty = (activeTest.negativeMarking || 0) * marksPerQ;

    for (let i = 1; i <= totalQ; i++) {
      const userChoice = (userAnswers[i] || "").toUpperCase().trim();
      const officialKey = (activeTest.answerKeyMap[i] || "").toUpperCase().trim();

      if (!userChoice) {
        skipped++;
      } else if (userChoice === officialKey) {
        correct++;
      } else {
        incorrect++;
      }
    }

    const rawScore = (correct * marksPerQ) - (incorrect * penalty);
    const score = Math.max(0, Math.round(rawScore * 10) / 10);
    const percentage = Math.round((score / activeTest.totalMarks) * 100);

    return {
      score,
      correct,
      incorrect,
      skipped,
      percentage
    };
  }, [activeTest, userAnswers]);

  // Questions array for the active test
  const activeQuestionsList: (Question | null)[] = useMemo(() => {
    if (!activeTest) return [];
    if (activeTest.questions && activeTest.questions.length > 0) {
      return activeTest.questions;
    }
    // Fallback stub questions if only PDF & answer key map were provided
    return Array.from({ length: activeTest.totalQuestions }, (_, i) => ({
      id: `q-gen-${i + 1}`,
      module: activeTest.subject,
      topic: `Question ${i + 1}`,
      question: `Refer to Question ${i + 1} in the uploaded Question Paper PDF (${activeTest.questionPaperPdfName || "Official Paper"}).`,
      options: ["Option (A)", "Option (B)", "Option (C)", "Option (D)"],
      correctIndex: ["A", "B", "C", "D"].indexOf((activeTest.answerKeyMap[i + 1] || "A").toUpperCase()),
      explanation: `Official Answer Key: Option ${activeTest.answerKeyMap[i + 1] || "A"}. Verified from authoritative service manual and exam board answer key.`,
      sourceRef: `${activeTest.title}, Q${i + 1}`,
      published: true
    }));
  }, [activeTest]);

  // Current question object
  const currentQ = activeQuestionsList[currentQIndex];

  // -------------------------------------------------------------
  // RENDER: Active Exam Taking or Review View
  // -------------------------------------------------------------
  if (activeTest) {
    const answeredCount = Object.values(userAnswers).filter(Boolean).length;
    const markedCount = Object.values(markedForReview).filter(Boolean).length;
    const unansweredCount = activeTest.totalQuestions - answeredCount;

    return (
      <div className="min-h-screen bg-[#F4F6F2] text-[#1E293B] pb-12 font-sans">
        {/* Top Sticky CBT Bar */}
        <div className="sticky top-0 z-40 bg-[#11382B] text-white shadow-md border-b border-[#235843]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleExitExam}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Exam</span>
              </button>

              <div className="hidden md:block">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6CDB6] bg-white/10 px-2 py-0.5 rounded-full mr-2">
                  {activeTest.type === "mock_test" ? "Mock CBT Exam" : "Sample Paper"}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white truncate max-w-md inline-block align-middle">
                  {activeTest.title}
                </span>
              </div>
            </div>

            {/* View Mode Switcher: Full CBT vs PDF Dual Mode */}
            {!isSubmitted && (
              <div className="flex items-center gap-1 bg-[#0A261D] p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setCbtMode("cbt")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    cbtMode === "cbt" ? "bg-[#E5F1E9] text-[#11382B]" : "text-[#BFD6C8] hover:text-white"
                  }`}
                  title="Card by card interactive question layout"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CBT Mode</span>
                </button>
                <button
                  onClick={() => setCbtMode("pdf_omr")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    cbtMode === "pdf_omr" ? "bg-[#E5F1E9] text-[#11382B]" : "text-[#BFD6C8] hover:text-white"
                  }`}
                  title="PDF Question Paper on left, interactive Answer Sheet on right"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PDF + Answer Sheet</span>
                </button>
              </div>
            )}

            {/* Timer & Submit Controls */}
            <div className="flex items-center gap-3">
              {!isSubmitted ? (
                <>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                    secondsRemaining < 300 
                      ? "bg-red-500/20 border-red-400 text-red-200 animate-pulse" 
                      : "bg-white/10 border-white/15 text-[#E5F1E9]"
                  }`}>
                    <Clock className="w-4 h-4 text-[#A6CDB6]" />
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-wider">
                      {formatTime(secondsRemaining)}
                    </span>
                    <button
                      onClick={() => setIsTimerPaused(!isTimerPaused)}
                      className="p-1 hover:bg-white/10 rounded transition text-[#BFD6C8] hover:text-white"
                      title={isTimerPaused ? "Resume Timer" : "Pause Timer"}
                    >
                      {isTimerPaused ? <Play className="w-3 h-3 text-amber-300" /> : <Pause className="w-3 h-3" />}
                    </button>
                  </div>

                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="px-4 py-1.5 rounded-xl bg-[#E5F1E9] hover:bg-[#D5E8DC] text-[#11382B] text-xs sm:text-sm font-bold shadow-sm transition transform hover:scale-105 cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#11382B]" />
                    <span>Submit Paper</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#A6CDB6] font-semibold">Test Evaluated</span>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setUserAnswers({});
                      setSecondsRemaining(activeTest.durationMinutes * 60);
                      setCurrentQIndex(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-Take Test</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SUBMIT CONFIRMATION MODAL */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#D5DDD6] space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3EC] text-[#11382B] mx-auto flex items-center justify-center">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif-title text-[#142D21]">Submit Examination Paper?</h3>
                <p className="text-xs text-[#55695E]">
                  You will immediately receive your final evaluated score, percentage, and official answer key comparison.
                </p>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#F8FAF7] border border-[#E2E8E2] text-center text-xs">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-emerald-800 font-bold text-base">{answeredCount}</p>
                  <p className="text-[10px] text-emerald-700">Answered</p>
                </div>
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-amber-800 font-bold text-base">{markedCount}</p>
                  <p className="text-[10px] text-amber-700">Review Marked</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">
                  <p className="text-slate-700 font-bold text-base">{unansweredCount}</p>
                  <p className="text-[10px] text-slate-500">Unanswered</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#C5D2C9] bg-white text-xs font-semibold text-[#3C5245] hover:bg-[#F3F7F4] transition cursor-pointer"
                >
                  Return to Paper
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="flex-1 py-2.5 rounded-xl bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-md cursor-pointer"
                >
                  Yes, Submit Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            RESULT / EVALUATION SCREEN (After submission)
            ------------------------------------------------------------- */}
        {isSubmitted ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
            {/* Scorecard Hero Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-[#11382B] via-[#164434] to-[#0A261D] text-white p-6 sm:p-10 shadow-xl border border-[#235843] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A6CDB6] text-xs font-bold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Official Automated Evaluation Result</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
                    {activeTest.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#BFD6C8]">
                    Evaluated against verified official answer key with {activeTest.negativeMarking || 0} negative penalty marking.
                  </p>
                </div>

                {/* Score Pill Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-3xl text-center min-w-[200px] shadow-lg">
                  <p className="text-xs font-semibold text-[#A6CDB6] uppercase tracking-wider">Score Obtained</p>
                  <p className="text-4xl font-black font-serif-title text-white mt-1">
                    {evaluation.score}
                    <span className="text-sm font-normal text-[#BFD6C8] ml-1">/ {activeTest.totalMarks}</span>
                  </p>
                  <div className="mt-2 inline-block px-3 py-0.5 rounded-full bg-[#E5F1E9] text-[#11382B] text-xs font-bold">
                    {evaluation.percentage}% Score Rate
                  </div>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/15 text-xs">
                <div className="p-3 rounded-2xl bg-white/10">
                  <p className="text-[#A6CDB6] font-medium">Correct Answers</p>
                  <p className="text-xl font-bold text-emerald-300 mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{evaluation.correct}</span>
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white/10">
                  <p className="text-[#A6CDB6] font-medium">Incorrect Answers</p>
                  <p className="text-xl font-bold text-red-300 mt-1 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    <span>{evaluation.incorrect}</span>
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white/10">
                  <p className="text-[#A6CDB6] font-medium">Unattempted</p>
                  <p className="text-xl font-bold text-slate-300 mt-1 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{evaluation.skipped}</span>
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white/10">
                  <p className="text-[#A6CDB6] font-medium">Accuracy</p>
                  <p className="text-xl font-bold text-amber-300 mt-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {answeredCount > 0 ? Math.round((evaluation.correct / answeredCount) * 100) : 0}%
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Key Comparison & Solution Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold font-serif-title text-[#142D21] flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Detailed Question-by-Question Solution & Official Answer Key</span>
                  </h3>
                  <p className="text-xs text-[#55695E]">
                    Compare your selected option with the official answer key and statutory rationale.
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#D5DDD6] shadow-2xs self-start text-xs">
                  {(["all", "correct", "incorrect", "skipped"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setResultFilter(mode)}
                      className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition cursor-pointer ${
                        resultFilter === mode 
                          ? "bg-[#11382B] text-white shadow-2xs" 
                          : "text-[#55695E] hover:text-[#11382B]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Questions List */}
              <div className="space-y-4">
                {Array.from({ length: activeTest.totalQuestions }, (_, i) => {
                  const qNum = i + 1;
                  const userChoice = (userAnswers[qNum] || "").toUpperCase().trim();
                  const officialKey = (activeTest.answerKeyMap[qNum] || "").toUpperCase().trim();
                  const isCorrect = userChoice && userChoice === officialKey;
                  const isSkipped = !userChoice;
                  const isIncorrect = userChoice && userChoice !== officialKey;

                  if (resultFilter === "correct" && !isCorrect) return null;
                  if (resultFilter === "incorrect" && !isIncorrect) return null;
                  if (resultFilter === "skipped" && !isSkipped) return null;

                  const qData = activeQuestionsList[i];

                  return (
                    <div
                      key={qNum}
                      className={`p-5 rounded-2xl border transition bg-white shadow-2xs ${
                        isCorrect
                          ? "border-emerald-300 hover:border-emerald-500"
                          : isIncorrect
                          ? "border-red-200 hover:border-red-400"
                          : "border-[#E2E8E2] hover:border-[#11382B]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-xl bg-[#11382B] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            Q{qNum}
                          </span>
                          {qData?.module && (
                            <span className="text-[11px] font-semibold text-[#55695E] bg-[#F4F6F2] px-2.5 py-0.5 rounded-full border border-[#DCE4DF]">
                              {qData.module}
                            </span>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isCorrect && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Correct (+{Math.round((activeTest.totalMarks / activeTest.totalQuestions) * 10) / 10})</span>
                            </span>
                          )}
                          {isIncorrect && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-800 text-xs font-bold border border-red-200">
                              <XCircle className="w-3.5 h-3.5 text-red-600" />
                              <span>Incorrect (-{Math.round(((activeTest.negativeMarking || 0) * (activeTest.totalMarks / activeTest.totalQuestions)) * 10) / 10})</span>
                            </span>
                          )}
                          {isSkipped && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                              <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                              <span>Not Attempted (0)</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question text */}
                      <p className="text-sm font-semibold text-[#142D21] mb-3 leading-relaxed">
                        {qData?.question || `Refer to Question ${qNum} in the uploaded Question Paper PDF.`}
                      </p>

                      {/* Options or Answer Summary */}
                      {qData?.options && qData.options.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-2 mb-3">
                          {qData.options.map((opt, optIdx) => {
                            const optLetter = ["A", "B", "C", "D"][optIdx];
                            const isOfficial = optLetter === officialKey;
                            const isUserPick = optLetter === userChoice;

                            let optStyle = "bg-[#FAFBF9] border-[#E2E8E2] text-[#334155]";
                            if (isOfficial) {
                              optStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-300";
                            } else if (isUserPick && !isCorrect) {
                              optStyle = "bg-red-50 border-red-300 text-red-950 ring-1 ring-red-200";
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${optStyle}`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[11px] shrink-0 ${
                                    isOfficial ? "bg-emerald-600 text-white" : isUserPick ? "bg-red-500 text-white" : "bg-[#EAEFEA] text-[#11382B]"
                                  }`}>
                                    {optLetter}
                                  </span>
                                  <span>{opt}</span>
                                </div>

                                {isOfficial && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                                    Official Key
                                  </span>
                                )}
                                {isUserPick && !isOfficial && (
                                  <span className="text-[10px] font-bold text-red-700 bg-red-100/60 px-2 py-0.5 rounded-md">
                                    Your Choice
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E2E8E2] mb-3 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[#55695E]">Your Response: </span>
                            <span className="font-bold text-[#142D21]">
                              {userChoice ? `Option (${userChoice})` : "Unattempted"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#55695E]">Official Answer Key: </span>
                            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              Option ({officialKey})
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Official Explanation Box */}
                      <div className="p-3.5 rounded-xl bg-[#F0F6F2] border border-[#CDE0D3] text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-[#11382B] font-bold">
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Official Solution Reference &amp; Explanation</span>
                        </div>
                        <p className="text-[#2F4D3C] leading-relaxed">
                          {qData?.explanation || `As per the official answer key verified by the examination board, Option (${officialKey}) is correct.`}
                        </p>
                        {qData?.sourceRef && (
                          <p className="text-[11px] text-[#557864] font-medium pt-1">
                            Reference: {qData.sourceRef}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : cbtMode === "cbt" ? (
          /* -------------------------------------------------------------
              MODE 1: STANDARD DIGITAL CBT CARD VIEW
              ------------------------------------------------------------- */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Question Card */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D5DDD6] shadow-sm space-y-6">
                {/* Question Header */}
                <div className="flex items-center justify-between border-b border-[#EDF2EE] pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-xl bg-[#11382B] text-white text-xs sm:text-sm font-bold shadow-2xs">
                      Question {currentQIndex + 1} of {activeTest.totalQuestions}
                    </span>
                    <span className="text-xs text-[#55695E] font-medium">
                      {currentQ?.module || activeTest.subject}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMarkForReview(currentQIndex + 1)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        markedForReview[currentQIndex + 1]
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-[#F4F6F2] text-[#55695E] hover:text-[#11382B] border border-[#E2E8E2]"
                      }`}
                      title="Mark for later review"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{markedForReview[currentQIndex + 1] ? "Marked" : "Mark Review"}</span>
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold font-serif-title text-[#142D21] leading-relaxed">
                    {currentQ?.question || `Refer to Question ${currentQIndex + 1} in the uploaded Question Paper PDF.`}
                  </h3>
                  
                  {activeTest.questionPaperPdfName && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EAF3EC] text-[#11382B] text-xs font-medium border border-[#C5D9CB]">
                      <FileText className="w-3.5 h-3.5 text-[#11382B]" />
                      <span>Paper Reference: {activeTest.questionPaperPdfName}</span>
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options (A, B, C, D) */}
                <div className="space-y-3 pt-2">
                  {(["A", "B", "C", "D"] as const).map((letter, optIdx) => {
                    const isSelected = userAnswers[currentQIndex + 1] === letter;
                    const optionText = currentQ?.options?.[optIdx] || `Option (${letter})`;

                    return (
                      <div
                        key={letter}
                        onClick={() => handleSelectOption(currentQIndex + 1, letter)}
                        className={`group p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                          isSelected
                            ? "bg-[#EAF3EC] border-[#11382B] ring-2 ring-[#11382B]/20 shadow-xs"
                            : "bg-[#FAFBF9] hover:bg-[#F3F7F4] border-[#E2E8E2] text-[#334155]"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition ${
                            isSelected
                              ? "bg-[#11382B] text-white shadow-2xs"
                              : "bg-[#EAEFEA] text-[#11382B] group-hover:bg-[#DFE7E0]"
                          }`}
                        >
                          {letter}
                        </div>

                        <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                          {optionText}
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected ? "border-[#11382B] bg-[#11382B]" : "border-[#C5D2C9]"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#EDF2EE]">
                  <button
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#C5D2C9] bg-white hover:bg-[#F3F7F4] text-xs font-semibold text-[#3C5245] disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearCurrentResponse}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-[#7A8E82] hover:text-[#C2392E] hover:bg-red-50 transition cursor-pointer"
                    >
                      Clear Choice
                    </button>

                    <button
                      onClick={() => {
                        if (currentQIndex < activeTest.totalQuestions - 1) {
                          setCurrentQIndex((prev) => prev + 1);
                        } else {
                          setShowSubmitConfirm(true);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <span>{currentQIndex < activeTest.totalQuestions - 1 ? "Save & Next" : "Review & Submit"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Question Palette */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-[#D5DDD6] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EDF2EE] pb-3">
                  <h4 className="text-sm font-bold font-serif-title text-[#142D21]">Question Palette</h4>
                  <span className="text-xs text-[#55695E] font-medium">
                    {answeredCount}/{activeTest.totalQuestions} Answered
                  </span>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-600"></span>
                    <span className="text-[#55695E]">Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-amber-400"></span>
                    <span className="text-[#55695E]">Review ({markedCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-[#FAFBF9] border border-[#CBD5E1]"></span>
                    <span className="text-[#55695E]">Not Visited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-[#11382B] ring-2 ring-[#B8D986]"></span>
                    <span className="text-[#55695E]">Current</span>
                  </div>
                </div>

                {/* Question Grid Buttons */}
                <div className="max-h-80 overflow-y-auto pr-1">
                  <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2">
                    {Array.from({ length: activeTest.totalQuestions }, (_, i) => {
                      const qNum = i + 1;
                      const isAnswered = Boolean(userAnswers[qNum]);
                      const isMarked = Boolean(markedForReview[qNum]);
                      const isCurrent = currentQIndex === i;

                      let btnStyle = "bg-[#FAFBF9] text-[#475569] border-[#E2E8E2]";
                      if (isCurrent) {
                        btnStyle = "bg-[#11382B] text-white ring-2 ring-[#52876E] font-bold";
                      } else if (isMarked) {
                        btnStyle = "bg-amber-400 text-amber-950 font-bold border-amber-500";
                      } else if (isAnswered) {
                        btnStyle = "bg-emerald-600 text-white font-bold border-emerald-700";
                      }

                      return (
                        <button
                          key={qNum}
                          onClick={() => setCurrentQIndex(i)}
                          className={`h-9 rounded-xl border text-xs flex items-center justify-center transition cursor-pointer ${btnStyle}`}
                        >
                          {qNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="w-full py-2.5 rounded-xl bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A6CDB6]" />
                    <span>Submit &amp; View Answer Key</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* -------------------------------------------------------------
              MODE 2: PDF QUESTION PAPER + DIGITAL OMR ANSWER SHEET DUAL MODE
              ------------------------------------------------------------- */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Cols: Embedded Question Paper / PDF Viewer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[#D5DDD6] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EDF2EE] pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#11382B]" />
                    <span className="text-sm font-bold font-serif-title text-[#142D21]">
                      {activeTest.questionPaperPdfName || "Question Paper"}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#55695E] bg-[#F4F6F2] px-2.5 py-0.5 rounded-md border border-[#E2E8E2]">
                    {activeTest.totalQuestions} Questions • {activeTest.totalMarks} Marks
                  </span>
                </div>

                {/* PDF Frame or Interactive Styled Paper */}
                <div className="h-[620px] rounded-2xl bg-[#F8FAF7] border border-[#D5DDD6] overflow-y-auto p-4 sm:p-6 space-y-6">
                  {activeTest.questionPaperPdfUrl ? (
                    <iframe
                      src={activeTest.questionPaperPdfUrl}
                      title="Uploaded Question Paper PDF"
                      className="w-full h-full rounded-xl border border-[#C5D2C9]"
                    />
                  ) : (
                    <div className="space-y-6 font-serif">
                      {/* Institutional Paper Header */}
                      <div className="text-center border-b-2 border-[#11382B] pb-4 space-y-1">
                        <p className="text-xs uppercase font-sans tracking-widest text-[#55695E]">
                          CENTRAL ADMINISTRATIVE &amp; LEADERSHIP EXAMINATION
                        </p>
                        <h2 className="text-lg font-bold text-[#11382B]">
                          {activeTest.title}
                        </h2>
                        <p className="text-xs font-sans text-[#7A8E82]">
                          Time Allowed: {activeTest.durationMinutes} Minutes • Maximum Marks: {activeTest.totalMarks} • Negative Deduction: {activeTest.negativeMarking || 0.33}
                        </p>
                      </div>

                      {/* Instructions */}
                      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-sans text-amber-900 space-y-1">
                        <p className="font-bold">INSTRUCTIONS FOR CANDIDATES:</p>
                        <p>1. All questions carry equal marks. Choose the most appropriate single response for each item.</p>
                        <p>2. Record your answer on the Interactive Digital Answer Sheet on the right column.</p>
                      </div>

                      {/* Question Items in PDF Style */}
                      <div className="space-y-5">
                        {Array.from({ length: activeTest.totalQuestions }, (_, i) => {
                          const qData = activeQuestionsList[i];
                          const qNum = i + 1;
                          return (
                            <div key={qNum} className="space-y-2 border-b border-[#E2E8E2] pb-4 font-sans">
                              <p className="text-sm font-bold text-[#142D21]">
                                <span className="font-mono text-[#11382B] mr-1.5">Q.{qNum}</span>
                                {qData?.question || `Question statement ${qNum}`}
                              </p>
                              {qData?.options && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#334155] pl-4">
                                  {qData.options.map((opt, optIdx) => (
                                    <div key={optIdx} className="flex items-center gap-1.5">
                                      <span className="font-bold text-[#11382B]">({["A", "B", "C", "D"][optIdx]})</span>
                                      <span>{opt}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Interactive Digital Answer Sheet (OMR) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-[#D5DDD6] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EDF2EE] pb-3">
                  <div>
                    <h4 className="text-sm font-bold font-serif-title text-[#142D21]">
                      Digital Answer Sheet (OMR)
                    </h4>
                    <p className="text-[11px] text-[#55695E]">
                      Select A, B, C, or D for each question
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#EAF3EC] text-[#11382B] text-xs font-bold">
                    {answeredCount}/{activeTest.totalQuestions}
                  </span>
                </div>

                {/* Scrollable Questions Rows */}
                <div className="h-[520px] overflow-y-auto pr-2 space-y-2.5">
                  {Array.from({ length: activeTest.totalQuestions }, (_, i) => {
                    const qNum = i + 1;
                    const selected = userAnswers[qNum];

                    return (
                      <div
                        key={qNum}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition ${
                          selected
                            ? "bg-[#EAF3EC] border-[#11382B]"
                            : "bg-[#FAFBF9] border-[#E2E8E2]"
                        }`}
                      >
                        <span className="w-8 font-mono font-bold text-xs text-[#11382B] pl-1">
                          #{qNum}
                        </span>

                        <div className="flex items-center gap-1.5 flex-1 justify-center">
                          {(["A", "B", "C", "D"] as const).map((letter) => {
                            const isChosen = selected === letter;
                            return (
                              <button
                                key={letter}
                                onClick={() => handleSelectOption(qNum, letter)}
                                className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                                  isChosen
                                    ? "bg-[#11382B] text-white shadow-xs"
                                    : "bg-white hover:bg-[#EAEFEA] text-[#142D21] border border-[#C5D2C9]"
                                }`}
                              >
                                {letter}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => toggleMarkForReview(qNum)}
                          className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                            markedForReview[qNum] ? "text-amber-600 bg-amber-50" : "text-slate-400 hover:text-slate-600"
                          }`}
                          title="Mark Review"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-[#EDF2EE]">
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="w-full py-3 rounded-xl bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A6CDB6]" />
                    <span>Submit &amp; Evaluate Against Answer Key</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: Main Mock Tests & Sample Papers Hub / Catalog
  // -------------------------------------------------------------
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 space-y-8 font-sans">
      {/* 1. Hero Header Banner */}
      <div className="rounded-3xl bg-[#11382B] text-white p-6 sm:p-10 shadow-lg border border-[#1E4D3B]/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A6CDB6] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Computer Based Testing Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-serif-title leading-tight text-white">
            Mock Tests &amp; Sample Question Papers
          </h1>

          <p className="text-xs sm:text-sm text-[#BFD6C8] leading-relaxed">
            Practice authenticated full-length mock examinations and solved sample papers. Every paper features instant automated scoring, official answer keys, statutory citations, and time-tracking analytics.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#E5F1E9] bg-white/10 px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5 text-[#B8D986]" />
              <span>Verified Answer Keys Attached</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#E5F1E9] bg-white/10 px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5 text-[#B8D986]" />
              <span>Full CBT &amp; PDF Dual-Mode</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#E5F1E9] bg-white/10 px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5 text-[#B8D986]" />
              <span>Negative Penalty Marking Supported</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: "all", label: "All Papers" },
            { id: "mock_test", label: "Mock Tests (CBT)" },
            { id: "sample_paper", label: "Sample Papers" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as typeof filterType)}
              className={`px-4 py-2 rounded-full font-bold transition cursor-pointer whitespace-nowrap ${
                filterType === tab.id
                  ? "bg-[#11382B] text-white shadow-2xs"
                  : "bg-white text-[#455A4F] hover:bg-[#F3F7F4] border border-[#D5DDD6]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search papers by subject or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-full border border-[#C5D2C9] bg-white text-xs outline-none focus:border-[#11382B] text-[#142D21]"
          />
          <Search className="w-4 h-4 text-[#7A8E82] absolute left-3 top-3" />
        </div>
      </div>

      {/* 3. Mock Tests & Sample Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => {
          const keysCount = Object.keys(test.answerKeyMap || {}).length;

          return (
            <div
              key={test.id}
              className="p-6 rounded-3xl bg-white border border-[#E2E8E2] hover:border-[#11382B] shadow-2xs hover:shadow-md transition flex flex-col justify-between group space-y-5"
            >
              <div className="space-y-3.5">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    test.type === "mock_test" 
                      ? "bg-[#EAF3EC] text-[#11382B] border-[#C5D9CB]" 
                      : "bg-[#FBF1EB] text-[#A2573B] border-[#F2DDD2]"
                  }`}>
                    {test.type === "mock_test" ? "Mock CBT Exam" : "Sample Paper"}
                  </span>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Official Key ({keysCount} Qs)</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold font-serif-title text-[#142D21] group-hover:text-[#11382B] transition leading-snug">
                  {test.title}
                </h3>

                {/* Subject */}
                <p className="text-xs font-semibold text-[#11382B]">
                  {test.subject}
                </p>

                {/* Description */}
                <p className="text-xs text-[#55695E] leading-relaxed line-clamp-2">
                  {test.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-[#F8FAF7] border border-[#EDF2EE] text-center text-xs">
                  <div>
                    <p className="font-bold text-[#142D21]">{test.totalQuestions} Qs</p>
                    <p className="text-[10px] text-[#7A8E82]">Questions</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#142D21]">{test.durationMinutes} Mins</p>
                    <p className="text-[10px] text-[#7A8E82]">Duration</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#142D21]">{test.totalMarks} Marks</p>
                    <p className="text-[10px] text-[#7A8E82]">Max Marks</p>
                  </div>
                </div>

                {/* Attached File Names */}
                {(test.questionPaperPdfName || test.answerKeyPdfName) && (
                  <div className="text-[11px] text-[#55695E] space-y-1">
                    {test.questionPaperPdfName && (
                      <p className="flex items-center gap-1.5 truncate">
                        <FileText className="w-3 h-3 text-[#11382B] shrink-0" />
                        <span className="truncate">Paper: {test.questionPaperPdfName}</span>
                      </p>
                    )}
                    {test.answerKeyPdfName && (
                      <p className="flex items-center gap-1.5 truncate">
                        <ShieldCheck className="w-3 h-3 text-emerald-700 shrink-0" />
                        <span className="truncate">Key: {test.answerKeyPdfName}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EDF2EE] space-y-2">
                <button
                  onClick={() => startTest(test, "cbt")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Start Interactive CBT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startTest(test, "pdf_omr")}
                    className="flex-1 py-1.5 px-2 rounded-xl border border-[#D5DDD6] bg-white hover:bg-[#F3F7F4] text-[#3C5245] text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3 h-3 text-[#11382B]" />
                    <span>PDF + Answer Sheet</span>
                  </button>

                  <button
                    onClick={() => setPreviewKeyTest(test)}
                    className="py-1.5 px-3 rounded-xl border border-[#D5DDD6] bg-white hover:bg-[#F3F7F4] text-[#11382B] text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1"
                    title="View Official Answer Key"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Key</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-16 p-8 bg-white rounded-3xl border border-[#E2E8E2] space-y-3">
          <FileText className="w-10 h-10 text-[#7A8E82] mx-auto opacity-60" />
          <h3 className="text-base font-bold font-serif-title text-[#142D21]">No Mock Tests Found</h3>
          <p className="text-xs text-[#55695E]">No tests match your current search query or filter.</p>
        </div>
      )}

      {/* 4. PREVIEW OFFICIAL ANSWER KEY MODAL */}
      {previewKeyTest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#D5DDD6] space-y-4 max-h-[85vh] flex flex-col animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#EDF2EE] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Official Answer Key
                </span>
                <h3 className="text-base font-bold font-serif-title text-[#142D21] mt-1">
                  {previewKeyTest.title}
                </h3>
              </div>

              <button
                onClick={() => setPreviewKeyTest(null)}
                className="w-8 h-8 rounded-full bg-[#F4F6F2] hover:bg-[#EAEFEA] text-[#55695E] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Answer Key Grid */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              <p className="text-xs text-[#55695E]">
                Official answer keys verified for all {previewKeyTest.totalQuestions} questions:
              </p>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {Array.from({ length: previewKeyTest.totalQuestions }, (_, i) => {
                  const qNum = i + 1;
                  const keyOption = previewKeyTest.answerKeyMap[qNum] || "—";
                  return (
                    <div
                      key={qNum}
                      className="p-2.5 rounded-xl bg-[#F8FAF7] border border-[#E2E8E2] text-center"
                    >
                      <p className="text-[10px] font-mono text-[#7A8E82]">Q.{qNum}</p>
                      <p className="text-sm font-bold text-emerald-700 mt-0.5 font-mono">
                        ({keyOption})
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EDF2EE] flex items-center justify-between">
              <span className="text-xs text-[#55695E]">
                {Object.keys(previewKeyTest.answerKeyMap).length} Verified Keys
              </span>

              <button
                onClick={() => {
                  const t = previewKeyTest;
                  setPreviewKeyTest(null);
                  startTest(t, "cbt");
                }}
                className="px-4 py-2 rounded-xl bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Attempt CBT Test Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
