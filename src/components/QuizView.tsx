import React, { useState, useEffect, useMemo } from "react";
import { Question } from "../data/types";
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Flag, 
  Award, 
  BookOpen, 
  Sparkles
} from "lucide-react";

interface QuizViewProps {
  questions: Question[];
  onQuizComplete: (topic: string, score: number, total: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, onQuizComplete }) => {
  const publishedQuestions = useMemo(() => questions.filter((q) => q.published), [questions]);
  
  const availableTopics = useMemo(() => {
    return Array.from(new Set(publishedQuestions.map((q) => q.topic)));
  }, [publishedQuestions]);

  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics (Comprehensive Mock)");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timedMode, setTimedMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);

  const activeQuestions = useMemo(() => {
    if (selectedTopic === "All Topics (Comprehensive Mock)") {
      return publishedQuestions;
    }
    return publishedQuestions.filter((q) => q.topic === selectedTopic);
  }, [publishedQuestions, selectedTopic]);

  useEffect(() => {
    if (!quizStarted || submitted || !timedMode) return;
    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [quizStarted, submitted, timedMode, timeLeft]);

  const handleStartQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setFlagged({});
    setSubmitted(false);
    setShowOnlyIncorrect(false);
    setTimeLeft(activeQuestions.length * 60);
    setQuizStarted(true);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    const correctCount = activeQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
    onQuizComplete(selectedTopic, correctCount, activeQuestions.length);
  };

  const score = useMemo(() => {
    return activeQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [activeQuestions, answers]);

  const scorePercentage = activeQuestions.length > 0 ? Math.round((score / activeQuestions.length) * 100) : 0;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  const reviewQuestions = useMemo(() => {
    if (!showOnlyIncorrect) return activeQuestions;
    return activeQuestions.filter((q) => answers[q.id] !== q.correctIndex);
  }, [activeQuestions, showOnlyIncorrect, answers]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D5CBB4] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFE5D5] text-[#2F3D28] text-xs font-semibold mb-2 border border-[#C0CCB1]">
            <Award className="w-3.5 h-3.5 text-[#3c4e2e]" />
            <span>Interactive Examination Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2918] font-serif-title">
            KVS Principal CBT Practice & Mock Tests
          </h2>
          <p className="text-xs sm:text-sm text-[#5a5040] mt-1">
            Simulate real exam scenarios with statutory rule references, instant feedback, and detailed performance metrics.
          </p>
        </div>

        {quizStarted && !submitted && timedMode && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm shadow-xs ${
            timeLeft < 120 ? "bg-[#fbe8e6] text-[#a82e22] border-[#e8a39c] animate-pulse" : "bg-[#F2ECD8] text-[#2f3b26] border-[#D5CBB4]"
          }`}>
            <Clock className="w-4 h-4 text-[#8a7f66]" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Setup Screen before starting */}
      {!quizStarted && (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#1f2918] font-serif-title">Select Practice Topic</h3>
              <p className="text-xs text-[#5a5040]">
                Choose a specific domain for targeted revision or select Full Comprehensive Mock.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#3d3222]">Choose Topic Module</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] focus:border-[#4a5f36] text-[#2f3b26] outline-none text-sm font-medium"
              >
                <option value="All Topics (Comprehensive Mock)">
                  ★ All Topics (Comprehensive Full Mock - {publishedQuestions.length} Questions)
                </option>
                {availableTopics.map((topic) => {
                  const count = publishedQuestions.filter((q) => q.topic === topic).length;
                  return (
                    <option key={topic} value={topic}>
                      {topic} ({count} Questions)
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Timed Mode Checkbox */}
            <div className="p-4 rounded-xl bg-[#F0E6D2] border border-[#DBC8A8] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#2f3b26]">Timed Exam Mode</p>
                <p className="text-[11px] text-[#6b5d49]">
                  Enables 60-second countdown per question to simulate official CBT time pressure.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={timedMode}
                  onChange={(e) => setTimedMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#C5BAA0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3c4e2e]"></div>
              </label>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartQuiz}
              disabled={activeQuestions.length === 0}
              className="w-full h-12 rounded-xl bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              <span>Start Test ({activeQuestions.length} Questions)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Quiz Info & Tips */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#DFE5D5] border border-[#C0CCB1] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F3D28] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#3c4e2e]" />
                Examination Instructions
              </h4>
              <ul className="text-xs text-[#435539] space-y-2 list-disc list-inside leading-relaxed">
                <li>Each question carries 1 mark without negative marking.</li>
                <li>Statutory references (GFR 2017, CCS Rules, RTE, NEP) are cited on completion.</li>
                <li>Use the Question Palette to jump between questions and flag doubts.</li>
                <li>Review mode will highlight exact mistakes and correct options.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-2xs space-y-2 text-xs text-[#5a5040]">
              <p className="font-bold text-[#2f3b26]">Total Questions in Bank: {publishedQuestions.length}</p>
              <p>Topics Covered: NEP 2020, NCF 2023, CCS Conduct & CCA Rules, GFR 2017, POCSO Act, RTE 2009, Measurement.</p>
            </div>
          </div>
        </div>
      )}

      {/* Active Quiz Test Taking Screen */}
      {quizStarted && !submitted && activeQuestions.length > 0 && (
        <div className="grid lg:grid-cols-4 gap-6 items-start">
          {/* Main Question Card (3 cols) */}
          <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-6">
            {/* Question Progress Header */}
            <div className="flex items-center justify-between border-b border-[#E2D8C0] pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#3c4e2e] text-[#F2ECD8] font-bold text-xs">
                  Question {currentIndex + 1} of {activeQuestions.length}
                </span>
                <span className="text-xs text-[#6e634f] font-medium hidden sm:inline">
                  {activeQuestions[currentIndex].module}
                </span>
              </div>

              <button
                onClick={() => toggleFlag(activeQuestions[currentIndex].id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                  flagged[activeQuestions[currentIndex].id]
                    ? "bg-[#F0E6D2] text-[#8C522A] border-[#DBC8A8]"
                    : "border-[#D5CBB4] bg-[#FAF6EC] text-[#5a5040] hover:bg-[#EAE2CE]"
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flagged[activeQuestions[currentIndex].id] ? "Flagged for Review" : "Flag Question"}</span>
              </button>
            </div>

            {/* Question Stem */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C522A] bg-[#F0E6D2] px-2 py-0.5 rounded border border-[#DBC8A8]">
                {activeQuestions[currentIndex].topic}
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif-title text-[#1f2918] leading-snug">
                {activeQuestions[currentIndex].question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {activeQuestions[currentIndex].options.map((option, optIdx) => {
                const currentQuestionId = activeQuestions[currentIndex].id;
                const isSelected = answers[currentQuestionId] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQuestionId, optIdx)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? "bg-[#3c4e2e] text-[#F4F0E6] border-[#3c4e2e] shadow-xs"
                        : "bg-[#FAF6EC] hover:bg-[#F2ECD8] border-[#D5CBB4] text-[#2f3b26]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? "bg-[#E6C387] text-[#25301d]" : "bg-[#EAE2CE] border border-[#C5BAA0] text-[#3b3223]"
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#E6C387] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submit Controls */}
            <div className="pt-6 border-t border-[#E2D8C0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] hover:bg-[#EAE2CE] text-xs font-semibold text-[#3b3223] disabled:opacity-40 flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                  disabled={currentIndex === activeQuestions.length - 1}
                  className="px-4 py-2 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] hover:bg-[#EAE2CE] text-xs font-semibold text-[#3b3223] disabled:opacity-40 flex items-center gap-1.5 transition"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 rounded-lg bg-[#4a5f36] hover:bg-[#344525] text-[#F2ECD8] font-bold text-xs shadow-xs transition flex items-center gap-2"
              >
                <span>Submit & View Results</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Question Palette (1 col) */}
          <div className="p-5 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-2xs space-y-4">
            <h4 className="text-xs font-bold text-[#2f3b26] uppercase tracking-wider font-serif-title">Question Palette</h4>

            <div className="grid grid-cols-5 gap-2">
              {activeQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isFlag = flagged[q.id];
                const isCurrent = idx === currentIndex;

                let bgClass = "bg-[#FAF6EC] text-[#5a5040] border-[#D5CBB4]";
                if (isAnswered) bgClass = "bg-[#4a5f36] text-[#F2ECD8] border-[#3c4e2e] font-bold";
                if (isFlag) bgClass = "bg-[#9c5a30] text-[#F2ECD8] border-[#834923] font-bold";
                if (isCurrent) bgClass = "ring-2 ring-[#2d3a24] ring-offset-1 font-bold";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs flex items-center justify-center border transition ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-[#E2D8C0] space-y-1.5 text-[11px] text-[#6e634f]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#4a5f36]"></span>
                <span>Answered ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#9c5a30]"></span>
                <span>Flagged ({Object.values(flagged).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#FAF6EC] border border-[#C5BAA0]"></span>
                <span>Unanswered ({activeQuestions.length - Object.keys(answers).length})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submitted Results & Comprehensive Review Screen */}
      {submitted && (
        <div className="space-y-8">
          {/* Score Card Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#2D3E27] text-[#F2ECD8] shadow-lg border border-[#445B3A] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E6C387] bg-white/10 px-2.5 py-1 rounded-md">
                  Performance Summary
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-title mt-2">
                  Test Results: {selectedTopic}
                </h3>
              </div>

              <div className="text-right sm:text-right">
                <div className="text-4xl sm:text-5xl font-bold font-serif-title text-[#E6C387]">
                  {score} / {activeQuestions.length}
                </div>
                <p className="text-xs text-[#D7D0C0] mt-1 font-semibold">{scorePercentage}% Accuracy</p>
              </div>
            </div>

            {/* Feedback Verdict */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs font-bold text-[#E6C387]">
                  {scorePercentage >= 75 ? "Excellent Preparation!" : scorePercentage >= 50 ? "Satisfactory Knowledge - Targeted Revision Recommended" : "Needs Review in Service Rules & GFR"}
                </p>
                <p className="text-xs text-[#D8D2C4] mt-0.5">
                  Review the official statutory rules and explanations below to consolidate understanding.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleStartQuiz}
                  className="px-4 py-2 rounded-lg bg-[#E6C387] hover:bg-[#d8b375] text-[#25301d] font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
                <button
                  onClick={() => setQuizStarted(false)}
                  className="px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-[#F2ECD8] font-semibold text-xs transition"
                >
                  Select Another Topic
                </button>
              </div>
            </div>
          </div>

          {/* Question by Question Detailed Review */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#3c4e2e]" />
                <span>Question Review with Official Rule Citations</span>
              </h4>

              <button
                onClick={() => setShowOnlyIncorrect(!showOnlyIncorrect)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                  showOnlyIncorrect ? "bg-[#fbe8e6] text-[#a82e22] border-[#e8a39c] font-bold" : "border-[#C5BAA0] bg-[#FAF6EC] text-[#3b3223] hover:bg-[#EAE2CE]"
                }`}
              >
                {showOnlyIncorrect ? "Showing Incorrect Only" : "Show Incorrect Questions Only"}
              </button>
            </div>

            <div className="space-y-4">
              {reviewQuestions.map((q) => {
                const userChoice = answers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl bg-[#FBF7ED] border transition shadow-2xs ${
                      isCorrect ? "border-[#C0CCB1]" : "border-[#E8B8B4]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                          isCorrect ? "bg-[#DFE5D5] text-[#2F3D28]" : "bg-[#FBE8E6] text-[#A82E22]"
                        }`}>
                          {isCorrect ? "Correct ✓" : "Incorrect ✗"}
                        </span>
                        <span className="text-xs font-semibold text-[#6e634f]">{q.topic}</span>
                      </div>
                      <span className="text-xs font-mono text-[#8a7f66]">Rule Ref: {q.sourceRef}</span>
                    </div>

                    <h5 className="text-sm sm:text-base font-bold font-serif-title text-[#1f2918] mb-4">{q.question}</h5>

                    {/* Options list */}
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOption = optIdx === q.correctIndex;
                        const isUserOption = optIdx === userChoice;

                        let optionStyle = "bg-[#FAF6EC] border-[#D5CBB4] text-[#2f3b26]";
                        if (isCorrectOption) {
                          optionStyle = "bg-[#DFE5D5] border-[#C0CCB1] text-[#2F3D28] font-semibold";
                        } else if (isUserOption && !isCorrect) {
                          optionStyle = "bg-[#FBE8E6] border-[#E8B8B4] text-[#A82E22] font-medium";
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between ${optionStyle}`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                              <span>{opt}</span>
                            </span>
                            {isCorrectOption && (
                              <span className="text-[11px] font-bold text-[#2F3D28] flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-[#3c4e2e]" /> Correct Answer
                              </span>
                            )}
                            {isUserOption && !isCorrect && (
                              <span className="text-[11px] font-bold text-[#A82E22] flex items-center gap-1">
                                <XCircle className="w-4 h-4 text-[#A82E22]" /> Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation */}
                    <div className="p-4 rounded-xl bg-[#F2ECD8] border border-[#D5CBB4] space-y-1.5 text-xs">
                      <p className="font-bold text-[#2f3b26] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#9C5A30]" />
                        <span>Official Reference & Pedagogical Explanation:</span>
                      </p>
                      <p className="text-[#5a5040] leading-relaxed">{q.explanation}</p>
                      <p className="text-[11px] text-[#7e725d] font-medium">Statutory Authority: {q.sourceRef}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
