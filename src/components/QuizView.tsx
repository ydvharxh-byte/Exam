import React, { useState, useEffect, useMemo } from "react";
import { Question, Page } from "../data/types";
import { practiceDriveTopics } from "../data/driveTopics";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Pause, 
  Play, 
  Bookmark, 
  BookmarkCheck, 
  BookOpen, 
  FileText, 
  Lightbulb, 
  MessageSquare,
  Bell,
  Calendar,
  FolderOpen,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  BookMarked
} from "lucide-react";

interface QuizViewProps {
  questions: Question[];
  onQuizComplete: (topic: string, score: number, total: number) => void;
  onNavigate?: (page: Page) => void;
  onOpenPracticeMore?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ 
  questions, 
  onQuizComplete,
  onNavigate,
  onOpenPracticeMore 
}) => {
  // Selected Quiz: "csmop" (51 questions) or "chapter5" (10 questions as in Image 2)
  const [selectedQuizTopic, setSelectedQuizTopic] = useState<"chapter5" | "csmop" | "all">("chapter5");
  
  // Current active question index (starts at 6 for chapter5 to display Question 7 of 10)
  const [currentIndex, setCurrentIndex] = useState(6);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 1, // Option B selected on Question 7 as shown in Image 2
    7: 1  // Question 8 was marked incorrect in Image 2
  });
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({ 6: false });
  const [isPaused, setIsPaused] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(504); // 08:24 = 504 seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter questions depending on selectedQuizTopic
  const activeQuestions = useMemo(() => {
    if (selectedQuizTopic === "csmop") {
      const csmopList = questions.filter((q) => q.topic === "CSMoP & Office Procedure");
      if (csmopList.length > 0) return csmopList;
    }

    if (selectedQuizTopic === "all") {
      return questions;
    }

    // Default to Chapter 5 (10 questions)
    const ch5List = questions.filter((q) => q.topic === "Educational Planning and Management");
    const list = [...ch5List];
    while (list.length < 10 && questions.length > 0) {
      list.push(questions[list.length % questions.length]);
    }
    return list.slice(0, 10);
  }, [questions, selectedQuizTopic]);

  // Handle switching quiz topic
  const switchQuizTopic = (topic: "chapter5" | "csmop" | "all") => {
    setSelectedQuizTopic(topic);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setBookmarked({});
    if (topic === "chapter5") {
      setCurrentIndex(6);
      setSelectedAnswers({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1
      });
      setSecondsRemaining(504);
    } else if (topic === "csmop") {
      setCurrentIndex(0);
      setSecondsRemaining(3600); // 60 mins for 51 questions
    } else {
      setCurrentIndex(0);
      setSecondsRemaining(activeQuestions.length * 60);
    }
  };

  // Live Timer Countdown
  useEffect(() => {
    if (isPaused || isSubmitted) return;
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
  }, [isPaused, isSubmitted]);

  const currentQ = activeQuestions[currentIndex] || activeQuestions[0];
  const totalQuestions = activeQuestions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex
    }));
  };

  const toggleBookmark = (idx: number) => {
    setBookmarked((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    onQuizComplete(
      selectedQuizTopic === "csmop" ? "CSMoP & Office Procedure" : "Education – Chapter 5",
      correct,
      totalQuestions
    );
  };

  // Status for Palette
  const getQuestionStatus = (idx: number) => {
    if (selectedQuizTopic === "chapter5" && idx === 7 && !isSubmitted) {
      return "incorrect"; // Match red square 8 on Image 2
    }
    const ans = selectedAnswers[idx];
    if (ans === undefined) return "unattempted";
    if (isSubmitted) {
      return ans === activeQuestions[idx].correctIndex ? "answered" : "incorrect";
    }
    return "answered";
  };

  // Score computation
  const correctCount = useMemo(() => {
    if (selectedQuizTopic === "chapter5" && !isSubmitted) return 5; // As depicted in Image 2
    return activeQuestions.reduce((acc, q, idx) => {
      return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [activeQuestions, selectedAnswers, isSubmitted, selectedQuizTopic]);

  const incorrectCount = useMemo(() => {
    if (selectedQuizTopic === "chapter5" && !isSubmitted) return 2; // As depicted in Image 2
    return Object.keys(selectedAnswers).filter((k) => {
      const idx = Number(k);
      return selectedAnswers[idx] !== activeQuestions[idx]?.correctIndex;
    }).length;
  }, [activeQuestions, selectedAnswers, isSubmitted, selectedQuizTopic]);

  const unattemptedCount = totalQuestions - Object.keys(selectedAnswers).length;

  return (
    <div className="w-full bg-[#F8F9F5] py-4 sm:py-6">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Main 3-Column Responsive Grid matching Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Sidebar in Dark Forest Green (lg:col-span-3) */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 rounded-2xl bg-[#0F2D20] text-white p-5 shadow-lg flex flex-col justify-between min-h-[720px] border border-[#173F2E]">
            <div className="space-y-6">
              {/* Back to Quizzes button */}
              <button
                onClick={() => onNavigate ? onNavigate("dashboard") : setCurrentIndex(0)}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#A6CDB6] hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Quizzes</span>
              </button>

              {/* Sidebar Header Title */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#96C3A8] text-xs font-semibold tracking-wider">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center border border-white/15">
                    <BookOpen className="w-3.5 h-3.5 text-[#96C3A8]" />
                  </div>
                  <span className="uppercase text-[11px]">Administrative Exam</span>
                </div>
                <h2 className="text-xl font-bold font-serif-title text-white tracking-wide">
                  Practice Quizzes
                </h2>
              </div>

              {/* Prominent Practice More - 10 Subject Drive Repositories (Accessible for Newbies) */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#1C4E3A] to-[#123626] border border-[#2E7556] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8E2CB] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    10 Drive Folders
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                    Free Notes
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-serif-title">
                    Practice More Repositories
                  </h3>
                  <p className="text-[11px] text-[#CDE6D7] leading-relaxed mt-1">
                    Direct access to official Google Drive folders for Hindi, Maths, General Awareness, and Office Procedure.
                  </p>
                </div>
                {onOpenPracticeMore && (
                  <button
                    onClick={onOpenPracticeMore}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#2D7A57] hover:bg-[#369067] text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-md cursor-pointer border border-[#43A678]"
                  >
                    <FolderOpen className="w-4 h-4 text-amber-300" />
                    <span>Open 10 Drive Folders Slide</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Direct 1-Click Drive Subject Directory (Super Friendly for Newbies) */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between px-1.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#8CBFA2]">
                  <span>10 Subject Drive Repositories</span>
                  <span className="text-[9px] text-[#79A88E]">Direct Links ↗</span>
                </div>

                <div className="space-y-0.5 max-h-[220px] overflow-y-auto pr-1">
                  {practiceDriveTopics.map((topic) => (
                    <a
                      key={topic.id}
                      href={topic.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#C6E2D2] hover:text-white hover:bg-white/10 transition group"
                      title={`Open ${topic.title} folder in Google Drive`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono text-[#8CBFA2] group-hover:text-amber-300 shrink-0 w-3.5">
                          {topic.id}.
                        </span>
                        <span className="truncate">{topic.title}</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-[#7FA692] group-hover:text-white shrink-0 ml-1" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#79A88E] px-3">
                  Quick Links
                </p>

                <div className="space-y-0.5">
                  <button
                    onClick={() => onNavigate && onNavigate("resources")}
                    className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-[#A6CDB6] hover:bg-white/5 hover:text-white transition cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Study Resources</span>
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate("discussion")}
                    className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-[#A6CDB6] hover:bg-white/5 hover:text-white transition cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Doubt Discussion</span>
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate("announcements")}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#A6CDB6] hover:bg-white/5 hover:text-white transition cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <Bell className="w-3.5 h-3.5" />
                      <span>Announcements</span>
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#D34537] text-white text-[9px] font-bold flex items-center justify-center">
                      3
                    </span>
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate("syllabus")}
                    className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-[#A6CDB6] hover:bg-white/5 hover:text-white transition cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Exam Pattern</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Footer with Pine Tree Silhouette & Quote */}
            <div className="pt-4 mt-4 border-t border-white/10 relative overflow-hidden">
              <div className="relative z-10 space-y-1.5">
                <div className="text-[#96C3A8]">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                    <path d="M19.5 4.5C19.5 4.5 15 5 11 9C7 13 6 18 6 18C6 18 11 17 15 13C19 9 19.5 4.5 19.5 4.5Z" fill="#96C3A8" />
                  </svg>
                </div>
                <p className="italic font-serif text-[11.5px] text-[#CBE2D4] leading-relaxed">
                  "Small steps every day lead to big results."
                </p>
              </div>

              {/* Tree silhouette illustration SVG in background */}
              <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
                <svg width="120" height="60" viewBox="0 0 120 60" fill="currentColor" className="text-emerald-300">
                  <path d="M30 60L20 40H25L15 25H20L10 10H15L10 0L30 30L25 30L35 45L30 45L40 60Z" />
                  <path d="M60 60L52 42H56L48 28H52L44 14H48L42 2L70 34L65 34L74 48L69 48L80 60Z" />
                  <path d="M95 60L88 45H92L84 32H88L82 18H86L80 6L105 36L100 36L110 50L105 50L115 60Z" />
                </svg>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* CENTER COLUMN: Main Quiz View (lg:col-span-6)             */}
          {/* ========================================================= */}
          <main className="lg:col-span-6 space-y-4">
            {/* Topic Switcher Pills (Top bar) */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => switchQuizTopic("chapter5")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                    selectedQuizTopic === "chapter5"
                      ? "bg-[#11382B] text-white border-[#11382B] shadow-xs"
                      : "bg-white text-[#55695E] border-[#E2E8E2] hover:bg-[#F3F7F4]"
                  }`}
                >
                  Education – Chapter 5 (10Q)
                </button>

                <button
                  onClick={() => switchQuizTopic("csmop")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border flex items-center gap-1.5 ${
                    selectedQuizTopic === "csmop"
                      ? "bg-[#11382B] text-white border-[#11382B] shadow-xs"
                      : "bg-white text-[#55695E] border-[#E2E8E2] hover:bg-[#F3F7F4]"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>CSMoP & Office Procedure (51Q)</span>
                </button>
              </div>

              {onOpenPracticeMore && (
                <button
                  onClick={onOpenPracticeMore}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF3EC] hover:bg-[#D5EADB] text-[#11382B] text-xs font-bold border border-[#C5D9CB] transition shadow-2xs cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-[#11382B]" />
                  <span>Official Drive Library</span>
                </button>
              )}
            </div>

            {/* 1. Quiz Header Banner with Academic Books & Script Subtitle */}
            <div className="relative rounded-2xl overflow-hidden bg-[#11382B] text-white p-5 sm:p-6 shadow-sm border border-[#1E4D3B]/40">
              {/* Background Books Photography */}
              <img
                src="/images/kvs-quiz-banner.jpg"
                alt="Educational Books"
                className="absolute inset-0 w-full h-full object-cover object-[70%_35%] opacity-40 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#11382B] via-[#11382B]/90 to-[#11382B]/60"></div>

              <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[#D5EADB] text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs">
                    <BookOpen className="w-3 h-3 text-[#A6CDB6]" />
                    <span>PRACTICE QUIZ</span>
                  </div>

                  {/* Elegant Script Text: "Better prep, Brighter future" */}
                  <span className="font-script text-xl sm:text-2xl text-[#E3EFE6] drop-shadow-xs">
                    Better prep, Brighter future
                  </span>
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold font-serif-title text-white tracking-wide">
                    {selectedQuizTopic === "csmop" 
                      ? "Office Procedure & CSMoP – Special Practice"
                      : "Education – Chapter 5"}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#BFD6C8] mt-0.5">
                    {selectedQuizTopic === "csmop"
                      ? "Central Secretariat Manual of Office Procedure & e-Office Guidelines (51 Questions)"
                      : "Educational Planning and Management"}
                  </p>
                </div>

                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[11px] font-medium text-white border border-white/15">
                    <BookOpen className="w-3.5 h-3.5 text-[#A6CDB6]" />
                    <span>{totalQuestions} Questions</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[11px] font-medium text-white border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>{selectedQuizTopic === "csmop" ? "Comprehensive" : "Medium"}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[11px] font-medium text-white border border-white/15">
                    <Clock className="w-3.5 h-3.5 text-[#A6CDB6]" />
                    <span>Time: {selectedQuizTopic === "csmop" ? "60 mins" : "15 mins"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Question Progress & Timer Top Bar */}
            <div className="rounded-2xl bg-white border border-[#E2E8E2] p-3.5 px-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <span className="text-xs font-bold text-[#142D21] whitespace-nowrap">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>

                {/* Progress bar */}
                <div className="flex-1 bg-[#EAF2EC] h-2 rounded-full overflow-hidden max-w-xs">
                  <div
                    className="bg-[#11382B] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <span className="text-xs font-bold text-[#55695E]">
                  {progressPercent}%
                </span>
              </div>

              {/* Timer & Pause Button */}
              <div className="flex items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#11382B] bg-[#F3F7F4] px-3 py-1.5 rounded-full border border-[#DCE5DF]">
                  <Clock className="w-3.5 h-3.5 text-[#11382B]" />
                  <span>{formatTime(secondsRemaining)}</span>
                </div>

                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#DCE5DF] bg-white hover:bg-[#F3F7F4] text-xs font-semibold text-[#3D5245] transition cursor-pointer"
                >
                  {isPaused ? <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" /> : <Pause className="w-3 h-3 text-[#11382B]" />}
                  <span>{isPaused ? "Resume" : "Pause"}</span>
                </button>
              </div>
            </div>

            {/* 3. Question Card */}
            <div className="rounded-2xl bg-white border border-[#E2E8E2] p-5 sm:p-6 shadow-xs space-y-5">
              {/* Card Header: Type Badge & Bookmark Toggle */}
              <div className="flex items-center justify-between border-b border-[#EDF2EE] pb-3">
                <div className="flex items-center gap-2 text-xs text-[#55695E] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#11382B]" />
                  <span>Multiple Choice Question</span>
                  <span className="text-[#C5D2C9]">•</span>
                  <span className="text-[#11382B] font-semibold">{currentQ.topic}</span>
                </div>

                <button
                  onClick={() => toggleBookmark(currentIndex)}
                  className="text-[#6C7E74] hover:text-[#11382B] transition cursor-pointer p-1"
                  title="Bookmark Question"
                >
                  {bookmarked[currentIndex] ? (
                    <BookmarkCheck className="w-4 h-4 text-[#11382B] fill-[#11382B]" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold font-serif-title text-[#142D21] leading-snug whitespace-pre-line">
                {currentQ.question}
              </h3>

              {/* 4 Interactive Option Cards (A, B, C, D) */}
              <div className="space-y-3 pt-1">
                {currentQ.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isSelected = selectedAnswers[currentIndex] === optIdx;

                  let borderClass = "border-[#E2E8E2] bg-white hover:bg-[#F9FAF8] text-[#2C3F34]";
                  let circleClass = "border-[#C5D2C9] bg-white";

                  if (isSelected) {
                    borderClass = "bg-[#EAF3EC] border-[#11382B] text-[#142D21] shadow-2xs font-semibold";
                    circleClass = "border-[#11382B] bg-[#11382B]";
                  }

                  if (isSubmitted) {
                    if (optIdx === currentQ.correctIndex) {
                      borderClass = "bg-[#DFE5D5] border-[#4A6B53] text-[#142D21] font-bold";
                      circleClass = "border-[#11382B] bg-[#11382B]";
                    } else if (isSelected && optIdx !== currentQ.correctIndex) {
                      borderClass = "bg-[#FDF2F1] border-[#E07A70] text-[#8C2318]";
                      circleClass = "border-[#D34537] bg-[#D34537]";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 sm:p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition flex items-center gap-3.5 cursor-pointer ${borderClass}`}
                    >
                      {/* Radio Circle */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition ${circleClass}`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>

                      {/* Option Text */}
                      <span className="flex-1 leading-relaxed">
                        <span className="font-bold mr-1.5">{letter}.</span>
                        <span>{opt.replace(/^(?:[A-Da-d1-4][\.\)]|\([A-Da-d1-4]\))\s*/, '')}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 4. Quick Tip Box (Exact match to Image 2 with dynamic explanation) */}
              <div className="rounded-xl bg-[#FEF9E7] border border-[#F2DEAA] p-4 text-xs text-[#5C4511] space-y-1 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#4B3708]">
                  <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Quick Tip & Canonical Reference</span>
                </div>
                <p className="leading-relaxed text-[11.5px] text-[#5C4511] pl-6">
                  {currentQ.explanation}
                </p>
                {currentQ.sourceRef && (
                  <p className="text-[10.5px] text-[#8A6A24] font-medium pl-6 pt-1">
                    Statutory Authority: {currentQ.sourceRef}
                  </p>
                )}
              </div>

              {/* Navigation Controls: Previous / Next Question / Submit */}
              <div className="pt-4 border-t border-[#EDF2EE] flex items-center justify-between gap-3">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D5DDD6] bg-white text-xs font-semibold text-[#3C5245] hover:bg-[#F3F7F4] transition shadow-2xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {!isSubmitted && (
                    <button
                      onClick={handleSubmitQuiz}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#D5DDD6] bg-white hover:bg-[#F3F7F4] text-xs font-semibold text-[#142D21] transition shadow-2xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#11382B]" />
                      <span>Finish & Score</span>
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <span>{currentIndex === totalQuestions - 1 ? (isSubmitted ? "Review Completed" : "Submit Test") : "Next Question"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Test Results Banner when submitted */}
            {isSubmitted && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#11382B] text-white space-y-3 shadow-md border border-[#1E4D3B]/40">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-wider text-[#D5EADB]">
                      Test Evaluation
                    </span>
                    <h3 className="text-xl font-bold font-serif-title mt-1">
                      Score: {correctCount} / {totalQuestions} ({Math.round((correctCount / totalQuestions) * 100)}%)
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSelectedAnswers({});
                      setCurrentIndex(0);
                      setSecondsRemaining(totalQuestions * 60);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#11382B] text-xs font-bold hover:bg-[#E5F1E9] transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>

                <p className="text-xs text-[#BFD6C8] leading-relaxed">
                  Review the correct options highlighted in green above with their respective statutory references.
                </p>
              </div>
            )}
          </main>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Session Status, Cheat Sheet & Palette       */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 space-y-4">
            {/* Widget 1: Active Practice Session Status (All-User Friendly) */}
            <div className="rounded-2xl bg-white border border-[#E2E8E2] p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif-title text-[#142D21] flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-[#11382B]" />
                  <span>Practice Session Status</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF3EC] text-[#11382B] border border-[#C6DC CE]">
                  CBT Mode
                </span>
              </div>

              {/* Status Counters Grid */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#F4F7F4] border border-[#E2EAE3]">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#55695E]">Answered</p>
                  <p className="text-lg font-bold text-[#11382B] font-serif-title mt-0.5">
                    {Object.keys(selectedAnswers).length}
                    <span className="text-xs text-[#6C7E74] font-sans font-normal"> / {totalQuestions}</span>
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FBF1EB] border border-[#F3E1D5]">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#A2573B]">Remaining</p>
                  <p className="text-lg font-bold text-[#A2573B] font-serif-title mt-0.5">
                    {Math.max(0, unattemptedCount)}
                  </p>
                </div>
              </div>

              {/* Live Answer Breakdown if submitted or practicing */}
              <div className="pt-2 border-t border-[#EDF2EE] space-y-1.5 text-xs text-[#55695E]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#11382B]"></span>
                    <span>Correct Verified</span>
                  </span>
                  <span className="font-bold text-[#142D21]">{correctCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D34537]"></span>
                    <span>Incorrect</span>
                  </span>
                  <span className="font-bold text-[#142D21]">{incorrectCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Bookmarked for Review</span>
                  </span>
                  <span className="font-bold text-[#142D21]">
                    {Object.values(bookmarked).filter(Boolean).length}
                  </span>
                </div>
              </div>

              {/* Reset Quiz Button */}
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setBookmarked({});
                  setCurrentIndex(0);
                  setIsSubmitted(false);
                }}
                className="w-full py-2 px-3 rounded-xl border border-[#D5DDD6] bg-[#F8FAF8] hover:bg-[#EEF3EF] text-xs font-semibold text-[#3C5245] transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#55695E]" />
                <span>Reset Current Attempt</span>
              </button>
            </div>

            {/* Widget 2: High-Yield Cheat Sheet / Section Breakdown */}
            <div className="rounded-2xl bg-white border border-[#E2E8E2] p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif-title text-[#142D21] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>CSMoP Rulebook Cheat Sheet</span>
                </h3>
                <span className="text-[10px] text-[#55695E] bg-[#F4F6F2] px-2 py-0.5 rounded-md font-mono">Govt Rules</span>
              </div>
              <p className="text-[11px] text-[#55695E] leading-relaxed">
                  Key principles tested in Central Administrative recruitment:
                </p>

                  <div className="space-y-2 text-xs text-[#2A3F33] max-h-60 overflow-y-auto pr-1">
                    <div className="p-2.5 rounded-xl bg-[#F7F9F7] border border-[#E5EBE6] space-y-1">
                      <p className="font-bold text-[#11382B] flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#11382B]"></span>
                        Administrative Hierarchy
                      </p>
                      <p className="text-[11px] text-[#475C50] leading-snug">
                        Section (lowest, headed by SO) → Branch (Under Secretary) → Division (Deputy Secy/Director) → Wing (Joint Secretary) → Dept/Ministry.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F7F9F7] border border-[#E5EBE6] space-y-1">
                      <p className="font-bold text-[#11382B] flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#11382B]"></span>
                        Record Retention Categories
                      </p>
                      <p className="text-[11px] text-[#475C50] leading-snug">
                        • <strong>Category C-5:</strong> Retain for 5 years<br />
                        • <strong>Category C-10:</strong> Retain for 10 years<br />
                        • <strong>Category A:</strong> Permanent preservation & National Archives after 25 years.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F7F9F7] border border-[#E5EBE6] space-y-1">
                      <p className="font-bold text-[#11382B] flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#11382B]"></span>
                        Official Forms of Communication
                      </p>
                      <p className="text-[11px] text-[#475C50] leading-snug">
                        • <strong>Office Memorandum:</strong> 3rd person, no salutation, inter-ministry.<br />
                        • <strong>Demi-Official (DO):</strong> 1st person, personal attention.<br />
                        • <strong>Office Order:</strong> Leave, internal postings, section allocation.<br />
                        • <strong>Order:</strong> Financial sanctions & disciplinary action.<br />
                        • <strong>Notification:</strong> Statutory rules & gazetted officers.<br />
                        • <strong>Endorsement:</strong> Forwarding papers in original.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F7F9F7] border border-[#E5EBE6] space-y-1">
                      <p className="font-bold text-[#11382B] flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#11382B]"></span>
                        Key Definitions
                      </p>
                      <p className="text-[11px] text-[#475C50] leading-snug">
                        • <strong>PUC:</strong> Paper Under Consideration.<br />
                        • <strong>Level Jumping:</strong> Case should not pass through &gt;2-3 levels.<br />
                        • <strong>Call Book:</strong> For cases halted for reasons beyond office control.
                      </p>
                    </div>
                  </div>

              {/* Direct Link to Verified Drive Notes */}
              <div className="pt-2 border-t border-[#EDF2EE]">
                <a
                  href="https://drive.google.com/file/d/1vGGEvJ8QRYKOjwKYJAucaW15VdL6kCAv/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#EAF3EC] hover:bg-[#D5EADB] text-[#11382B] text-xs font-bold transition flex items-center justify-between group"
                >
                  <span className="flex items-center gap-1.5">
                    <FolderOpen className="w-3.5 h-3.5 text-[#11382B]" />
                    <span>Open DSEA 1973 Notes (Drive)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </a>
              </div>
            </div>

            {/* Widget 2: Question Palette */}
            <div className="rounded-2xl bg-white border border-[#E2E8E2] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif-title text-[#142D21]">
                  Question Palette
                </h3>
                <span className="text-[10px] text-[#6C7E74]">
                  {totalQuestions} Qs
                </span>
              </div>

              {/* Grid of question squares */}
              <div className={`grid ${totalQuestions > 20 ? "grid-cols-6 max-h-64 overflow-y-auto pr-1" : "grid-cols-5"} gap-2`}>
                {activeQuestions.map((_, qIdx) => {
                  const num = qIdx + 1;
                  const isCurrent = qIdx === currentIndex;
                  const status = getQuestionStatus(qIdx);

                  let bgStyle = "bg-[#EAEFEA] text-[#4F6859]";
                  if (status === "answered") bgStyle = "bg-[#3E8357] text-white font-bold";
                  if (status === "incorrect") bgStyle = "bg-[#D45548] text-white font-bold";

                  return (
                    <button
                      key={num}
                      onClick={() => setCurrentIndex(qIdx)}
                      className={`h-8 sm:h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition cursor-pointer ${bgStyle} ${
                        isCurrent ? "ring-2 ring-[#11382B] ring-offset-1 scale-105" : ""
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Palette Legend */}
              <div className="pt-2 border-t border-[#EDF2EE] flex items-center justify-between text-[10.5px] text-[#6C7E74]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#3E8357]"></span>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#D45548]"></span>
                  <span>Incorrect</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#EAEFEA]"></span>
                  <span>Not Attempted</span>
                </div>
              </div>
            </div>

            {/* Widget 3: Time Left */}
            <div className="rounded-2xl bg-white border border-[#E2E8E2] p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#142D21]">
                <Clock className="w-4 h-4 text-[#11382B]" />
                <span>Time Left</span>
              </div>

              <p className="text-2xl font-bold font-serif-title text-[#11382B]">
                {formatTime(secondsRemaining)}
              </p>

              <div className="w-full bg-[#EAF2EC] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#11382B] h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.round((secondsRemaining / (selectedQuizTopic === "csmop" ? 3600 : 900)) * 100)}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-[#6C7E74]">
                You have {Math.floor(secondsRemaining / 60)} minutes {secondsRemaining % 60} seconds left.
              </p>
            </div>

            {/* Widget 4: Motivation Card */}
            <div className="rounded-2xl overflow-hidden relative border border-[#D5E0D7] p-5 shadow-xs min-h-[170px] flex flex-col justify-between">
              {/* Mountain watercolor painting background */}
              <img
                src="/images/misty-mountains.jpg"
                alt="Misty landscape"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/40"></div>

              <div className="relative z-10 space-y-1">
                <div className="text-2xl text-[#11382B] font-serif leading-none">“</div>
                <p className="font-serif italic text-xs sm:text-sm text-[#142D21] leading-relaxed">
                  Discipline today builds success tomorrow.
                </p>
              </div>

              <div className="relative z-10 pt-3 flex items-center justify-between gap-2">
                {onOpenPracticeMore && (
                  <button
                    onClick={onOpenPracticeMore}
                    className="inline-flex items-center gap-1 text-[11px] text-[#11382B] font-bold hover:underline cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Drive Library</span>
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-xs cursor-pointer ml-auto"
                >
                  <span>Keep Going</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};
