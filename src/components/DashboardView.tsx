import React, { useState } from "react";
import { Page, Announcement, ResourceItem, Question } from "../data/types";
import { practiceDriveTopics } from "../data/driveTopics";
import { 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  FileQuestion, 
  MessageSquare, 
  Bell, 
  FolderOpen,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Award,
  Clock,
  Copy,
  Check
} from "lucide-react";

interface DashboardViewProps {
  educatorName?: string;
  educatorDesignation?: string;
  educatorRegion?: string;
  onNavigate: (page: Page) => void;
  announcements?: Announcement[];
  resources?: ResourceItem[];
  questions?: Question[];
  savedResourcesCount?: number;
  completedQuizzesCount?: number;
  onOpenPracticeMore?: () => void;
  onStartMockTest?: (topic?: "csmop" | "chapter5") => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenPracticeMore,
  onStartMockTest
}) => {
  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    {
      quote: "Education is the most powerful weapon which you can use to change the world.",
      author: "Dr. A.P.J. Abdul Kalam",
      subheading: "CENTRAL ADMINISTRATIVE & LEADERSHIP EXAM",
      titleLine1: "Learn Today,",
      titleLine2: "Lead Tomorrow",
      tagline: "Excellence in Administration • Leadership • Integrity"
    },
    {
      quote: "The mind is not a vessel to be filled, but a fire to be kindled.",
      author: "Plutarch",
      subheading: "EDUCATIONAL LEADERSHIP",
      titleLine1: "Inspire Excellence,",
      titleLine2: "Shape the Future",
      tagline: "Pedagogy • Governance • National Education Policy"
    }
  ];

  const currentHero = heroSlides[heroSlide];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 space-y-9 font-sans">
      {/* 1. Hero Panoramic Banner (Exact replica of Image 1) */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-[#11382B] text-white shadow-xl min-h-[380px] lg:min-h-[410px] flex items-center border border-[#1E4D3B]/40">
        {/* Dignified Educator Portrait placed in background/right */}
        <div className="absolute inset-0 z-0 flex justify-center lg:justify-end items-center pointer-events-none">
          <img
            src="/images/kvs-hero-principal.jpg"
            alt="Administrative Study Desk"
            className="w-full h-full object-cover object-[70%_25%] lg:w-[68%] lg:object-right opacity-80 lg:opacity-90"
          />
          {/* Subtle gradient overlay to merge educator with forest green */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#11382B] via-[#11382B]/85 to-transparent lg:w-[65%]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#11382B] via-transparent to-transparent lg:hidden"></div>
        </div>

        {/* Decorative corner leaves */}
        <div className="absolute top-4 left-4 z-10 text-[#52876E]/40 pointer-events-none hidden sm:block">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5 16 5 21C10 21 16 18 18 9C19 5 19 3 19 3C19 3 17 4 17 8Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 z-10 text-[#52876E]/30 pointer-events-none hidden sm:block">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM15.5 16.5C12.5 17 9 15.5 8 13.5C7 11.5 8 8 11.5 7.5C15 7 16.5 10 16.5 12.5C16.5 15 15.5 16.5 15.5 16.5Z" />
          </svg>
        </div>

        {/* Hero Content Grid: Left Text + Right Quote */}
        <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left: Heading & Call to Action */}
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[#96C3A8] text-xs font-semibold tracking-wider uppercase">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path d="M19.5 4.5C19.5 4.5 15 5 11 9C7 13 6 18 6 18C6 18 11 17 15 13C19 9 19.5 4.5 19.5 4.5Z" fill="#96C3A8" />
              </svg>
              <span>{currentHero.subheading}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-serif-title font-bold leading-[1.12] tracking-tight whitespace-pre-line">
              {currentHero.titleLine1} <br className="hidden sm:inline" />
              {currentHero.titleLine2}
            </h1>

            <p className="text-xs sm:text-sm text-[#BFD6C8] font-medium tracking-wide">
              {currentHero.tagline}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate("quizzes")}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#E5F1E9] hover:bg-[#D5E8DC] text-[#11382B] text-xs sm:text-sm font-bold shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start Practicing</span>
                <ArrowRight className="w-4 h-4 text-[#11382B]" />
              </button>
            </div>
          </div>

          {/* Right: Quote Box with Abdul Kalam citation & slider dots */}
          <div className="max-w-xs lg:max-w-sm ml-auto text-left lg:text-right bg-[#11382B]/60 lg:bg-transparent backdrop-blur-xs p-4 lg:p-0 rounded-2xl lg:rounded-none border lg:border-none border-white/10 space-y-3">
            <div className="text-3xl text-[#96C3A8]/80 font-serif leading-none lg:text-right">“</div>
            <p className="italic font-serif text-slate-100 text-xs sm:text-sm leading-relaxed">
              "{currentHero.quote}"
            </p>
            <p className="text-[11px] text-[#A6CDB6] font-medium">
              — {currentHero.author}
            </p>

            {/* Carousel navigation dots */}
            <div className="flex items-center lg:justify-end gap-2 pt-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    heroSlide === idx
                      ? "bg-[#E5F1E9] w-6"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Access Section (Exact replica of Image 1) */}
      <section className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-[#11382B]">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path d="M19.5 4.5C19.5 4.5 15 5 11 9C7 13 6 18 6 18C6 18 11 17 15 13C19 9 19.5 4.5 19.5 4.5Z" fill="#11382B" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-[#142D21]">
                Quick Access
              </h2>
            </div>
            <span className="hidden sm:inline text-xs sm:text-sm text-[#6C7E74] ml-2">
              Everything you need, all in one place
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenPracticeMore && (
              <button
                onClick={onOpenPracticeMore}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-[#B8D986]" />
                <span>Official Drive Library</span>
              </button>
            )}
            <button
              onClick={() => onNavigate("resources")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D5DDD6] bg-white text-xs font-semibold text-[#3C5245] hover:bg-[#F3F7F4] transition shadow-2xs cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grid: 5 Pastel Cards (Left 8 cols) + 2 Right Widgets (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: 5 Pastel Quick Access Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
            {/* Card 1: Study Resources */}
            <div
              onClick={() => onNavigate("resources")}
              className="group p-4 rounded-2xl bg-[#EAF2EC] border border-[#D3E4D7] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md cursor-pointer min-h-[190px]"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#11382B] text-white flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold font-serif-title text-[#142D21] mb-1">
                  Study Resources
                </h3>
                <p className="text-[11px] text-[#4F6859] leading-relaxed">
                  Access all study materials and important documents.
                </p>
              </div>

              <div className="pt-3">
                <span className="w-7 h-7 rounded-full bg-[#11382B] text-white flex items-center justify-center group-hover:bg-[#1E4D3B] transition shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card 2: Practice Quizzes */}
            <div
              onClick={() => onNavigate("quizzes")}
              className="group p-4 rounded-2xl bg-[#FBF1EB] border border-[#F2DDD2] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md cursor-pointer min-h-[190px]"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#A2573B] text-white flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition">
                  <FileQuestion className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold font-serif-title text-[#331C14] mb-1">
                  Practice Quizzes
                </h3>
                <p className="text-[11px] text-[#784A3A] leading-relaxed">
                  Topic-wise quizzes to check your preparation.
                </p>
              </div>

              <div className="pt-3">
                <span className="w-7 h-7 rounded-full bg-[#A2573B] text-white flex items-center justify-center group-hover:bg-[#8C462D] transition shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card 3: Doubt Discussion */}
            <div
              onClick={() => onNavigate("discussion")}
              className="group p-4 rounded-2xl bg-[#EAF1F8] border border-[#D1E1F0] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md cursor-pointer min-h-[190px]"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#2A6A9E] text-white flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold font-serif-title text-[#142838] mb-1">
                  Doubt Discussion
                </h3>
                <p className="text-[11px] text-[#45647F] leading-relaxed">
                  Ask questions and get help from fellow teachers.
                </p>
              </div>

              <div className="pt-3">
                <span className="w-7 h-7 rounded-full bg-[#2A6A9E] text-white flex items-center justify-center group-hover:bg-[#1E527D] transition shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card 4: Announcements */}
            <div
              onClick={() => onNavigate("announcements")}
              className="group p-4 rounded-2xl bg-[#EFEBF8] border border-[#DFD6F2] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md cursor-pointer min-h-[190px] relative"
            >
              <div>
                <div className="relative inline-block mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#6B52A3] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D34537] text-white text-[9px] font-bold flex items-center justify-center">
                    3
                  </span>
                </div>
                <h3 className="text-sm font-bold font-serif-title text-[#261A3B] mb-1">
                  Announcements
                </h3>
                <p className="text-[11px] text-[#635182] leading-relaxed">
                  Important updates and notifications.
                </p>
              </div>

              <div className="pt-3">
                <span className="w-7 h-7 rounded-full bg-[#6B52A3] text-white flex items-center justify-center group-hover:bg-[#563E87] transition shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card 5: Exam Pattern */}
            <div
              onClick={() => onNavigate("syllabus")}
              className="group p-4 rounded-2xl bg-[#F9EFE6] border border-[#F0DBC9] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md cursor-pointer min-h-[190px]"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#996530] text-white flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold font-serif-title text-[#332210] mb-1">
                  Exam Pattern
                </h3>
                <p className="text-[11px] text-[#78542F] leading-relaxed">
                  Know the latest exam structure and syllabus.
                </p>
              </div>

              <div className="pt-3">
                <span className="w-7 h-7 rounded-full bg-[#996530] text-white flex items-center justify-center group-hover:bg-[#7D4F1E] transition shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Right: Stacked Widgets (Chapter 5 Quiz + Interactive Practice MCQs) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3.5">
            {/* Widget 1: Education Chapter 5 Quick Quiz */}
            <div className="rounded-2xl bg-[#11382B] text-white p-4 sm:p-5 flex flex-col justify-between shadow-xs border border-[#235843] relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-emerald-400/10 blur-xl pointer-events-none"></div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5F1E9] text-[#11382B] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Education – Chapter 5</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/15 text-[10px] font-mono font-bold text-[#A6CDB6]">
                    10 Qs • 15 M
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold font-serif-title text-white leading-snug group-hover:text-[#D5EADB] transition">
                  Educational Planning &amp; Management
                </h3>

                <p className="text-[11px] text-[#BFD6C8] leading-relaxed">
                  Quick 10-question timed practice covering Chapter 5 of educational administration with instant feedback.
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/15 flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#A6CDB6] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>15 Mins CBT</span>
                </span>

                <button
                  onClick={() => onStartMockTest ? onStartMockTest("chapter5") : onNavigate("quizzes")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E5F1E9] hover:bg-[#D5EADB] text-[#11382B] text-xs font-bold shadow-xs transition transform hover:scale-[1.02] cursor-pointer"
                >
                  <span>Start Practice Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Widget 2: Interactive Practice MCQs Hub */}
            <div className="rounded-2xl bg-white border border-[#E2E8E2] p-4 sm:p-5 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-[#142D21]">Interactive Practice MCQs</span>
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#11382B] text-white text-[9px] font-bold tracking-wider">
                    51 MCQs
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold font-serif-title text-[#142D21]">
                    CSMoP & Office Procedure
                  </h4>
                </div>

                <p className="text-[11px] text-[#55695E] leading-relaxed">
                  Full in-site CBT practice test covering Central Secretariat filing, dak, noting, drafting, and e-Office rules with instant explanations.
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#EDF2EE] flex items-center justify-between text-[11px]">
                <span className="text-[#11382B] font-semibold flex items-center gap-1">
                  100% Free Practice
                </span>

                <button
                  onClick={() => onStartMockTest ? onStartMockTest("csmop") : onNavigate("quizzes")}
                  className="font-bold text-[#11382B] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Start Test</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Google Drive Study Repositories (10 Subject Topics) */}
      <section className="space-y-5">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF3EC] text-[#11382B] text-[10px] font-bold uppercase tracking-wider border border-[#C6DCCE]">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Verified Google Drive Repository
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-[#142D21]">
              Official Study Drive & Topic Repositories
            </h2>
            <p className="text-xs sm:text-sm text-[#55695E]">
              Direct access to 12 subject-wise Drive folders curated for the Central Administrative & Leadership Examination.
            </p>
          </div>

          {onOpenPracticeMore && (
            <button
              onClick={onOpenPracticeMore}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <FolderOpen className="w-4 h-4 text-amber-300" />
              <span>Browse All 12 Repositories</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 10 Subject Drive Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceDriveTopics.map((item) => {
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-[#E2E8E2] hover:border-[#11382B] shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#11382B] bg-[#EAF3EC] px-2 py-0.5 rounded-md border border-[#D0E2D5]">
                      #{String(item.id).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#11382B] bg-[#F4F6F2] px-2 py-0.5 rounded-full border border-[#DDE4DF]">
                      {item.badge || item.category}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold font-serif-title text-[#142D21] group-hover:text-[#11382B] transition leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#55695E] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EDF2EE] flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#6C7E74]">
                    Google Drive PDF
                  </span>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-xl bg-[#11382B] hover:bg-[#1A4B37] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>Open in Drive</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#B8D986]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Examination Scheme & Official Blueprint (150 Marks) */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-[#142D21] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#11382B]" />
              <span>Official Administrative Examination Blueprint (150 Marks)</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#55695E]">
              Total 150 Objective Type Questions • 150 Marks • Duration: 180 Minutes (Computer Based Test)
            </p>
          </div>

          <button
            onClick={() => onNavigate("syllabus")}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#11382B] hover:underline cursor-pointer"
          >
            <span>Full Syllabus Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Blueprint Part Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Part I */}
          <div className="p-4.5 rounded-2xl bg-white border border-[#E2E8E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF1F8] text-[#2A6A9E] text-xs font-bold">
                Part I • 30 Marks
              </span>
              <span className="text-xs font-bold text-[#142D21]">30 Qs</span>
            </div>
            <h3 className="text-sm font-bold font-serif-title text-[#142D21]">
              Proficiency in Languages
            </h3>
            <ul className="text-xs text-[#55695E] space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>General English (15 Marks)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>General Hindi (15 Marks)</span>
              </li>
            </ul>
          </div>

          {/* Part II */}
          <div className="p-4.5 rounded-2xl bg-white border border-[#E2E8E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FBF1EB] text-[#A2573B] text-xs font-bold">
                Part II • 20 Marks
              </span>
              <span className="text-xs font-bold text-[#142D21]">20 Qs</span>
            </div>
            <h3 className="text-sm font-bold font-serif-title text-[#142D21]">
              General Awareness & Reasoning
            </h3>
            <ul className="text-xs text-[#55695E] space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>General Knowledge & Current Affairs (10)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Reasoning & Computer Literacy (10)</span>
              </li>
            </ul>
          </div>

          {/* Part III */}
          <div className="p-4.5 rounded-2xl bg-white border border-[#E2E8E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF3EC] text-[#11382B] text-xs font-bold">
                Part III • 50 Marks
              </span>
              <span className="text-xs font-bold text-[#11382B]">50 Qs</span>
            </div>
            <h3 className="text-sm font-bold font-serif-title text-[#142D21]">
              Perspectives on Education
            </h3>
            <ul className="text-xs text-[#55695E] space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Understanding the Learner & Teaching</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>NEP 2020 & School Leadership</span>
              </li>
            </ul>
          </div>

          {/* Part IV */}
          <div className="p-4.5 rounded-2xl bg-white border border-[#E2E8E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFEBF8] text-[#6B52A3] text-xs font-bold">
                Part IV • 50 Marks
              </span>
              <span className="text-xs font-bold text-[#6B52A3]">50 Qs</span>
            </div>
            <h3 className="text-sm font-bold font-serif-title text-[#142D21]">
              Administration & Finance
            </h3>
            <ul className="text-xs text-[#55695E] space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>CSMoP & Office Procedure Rules</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>GFR 2017, GeM & CCS Conduct Rules</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#11382B] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold font-serif-title">
              Ready to test your knowledge on Administration & Office Procedure?
            </h3>
            <p className="text-xs text-[#C5E0D0]">
              51 practice questions with instant answers, official manual references, and statutory explanations.
            </p>
          </div>

          <button
            onClick={() => onNavigate("quizzes")}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F3F7F4] text-[#11382B] text-xs font-bold transition shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Start Practice Quiz Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
