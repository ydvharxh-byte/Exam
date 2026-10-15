import React, { useState, useMemo } from "react";
import { practiceDriveTopics } from "../data/driveTopics";
import { 
  X, 
  ExternalLink, 
  FolderOpen, 
  BookOpen, 
  Globe, 
  Languages, 
  BrainCircuit, 
  Calculator, 
  FileCheck2, 
  GraduationCap, 
  FolderKanban, 
  ShieldAlert, 
  Briefcase,
  Sparkles
} from "lucide-react";

interface PracticeMoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PracticeMoreDrawer: React.FC<PracticeMoreDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return practiceDriveTopics;
    const q = searchQuery.toLowerCase();
    return practiceDriveTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case "Globe": return <Globe className="w-5 h-5 text-[#2A6A9E]" />;
      case "Languages": return <Languages className="w-5 h-5 text-[#A2573B]" />;
      case "BookOpen": return <BookOpen className="w-5 h-5 text-[#11382B]" />;
      case "BrainCircuit": return <BrainCircuit className="w-5 h-5 text-[#6B52A3]" />;
      case "Calculator": return <Calculator className="w-5 h-5 text-[#996530]" />;
      case "FileCheck2": return <FileCheck2 className="w-5 h-5 text-[#11382B]" />;
      case "GraduationCap": return <GraduationCap className="w-5 h-5 text-[#2A6A9E]" />;
      case "FolderKanban": return <FolderKanban className="w-5 h-5 text-[#A2573B]" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-[#6B52A3]" />;
      case "Briefcase": return <Briefcase className="w-5 h-5 text-[#996530]" />;
      default: return <FolderOpen className="w-5 h-5 text-[#11382B]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity">
      {/* Click outside to close backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-label="Close drawer backdrop"
      />

      {/* Slide-over Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Practice More Topic Repositories"
        className="relative z-10 w-full max-w-2xl bg-[#F8F9F5] h-full shadow-2xl flex flex-col border-l border-[#DCE4DF] animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-[#11382B] text-white flex items-start justify-between border-b border-[#1E4D3B]/60">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[#D5EADB] text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-[#A6CDB6]" />
              <span>Official Resource Archives</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-white tracking-wide">
              Practice More: Topic Repositories
            </h2>
            <p className="text-xs text-[#BFD6C8] leading-relaxed max-w-lg">
              Explore official Google Drive repositories curated for the Central Administrative & Leadership Examination. Click any topic to open its folder and practice papers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer shrink-0 ml-3"
            aria-label="Close slide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Ribbon */}
        <div className="bg-[#EAF3EC] border-b border-[#D3E4D7] px-5 py-2.5 flex items-center justify-between text-xs text-[#142D21]">
          <span className="flex items-center gap-2 font-medium">
            <FolderOpen className="w-4 h-4 text-[#11382B]" />
            <span>10 Curated Drive Folders with Notes, Quizzes & Reference Books</span>
          </span>
          <span className="text-[11px] font-bold text-[#11382B] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-[#C5D9CB]">
            100% Free Access
          </span>
        </div>

        {/* Beginner Guide & Search Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E2E8E2] space-y-3">
          <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D5E8D9] text-xs text-[#2F4D3C] flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#11382B] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
              i
            </div>
            <span>
              <strong>Newbie Tip:</strong> Click any topic below to open its dedicated Google Drive repository in a new tab. All PDFs, modules, and notes are free for all aspirants.
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search topics (e.g. Hindi, Maths, Office Procedure, Pedagogy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 text-xs rounded-xl border border-[#D5E0D7] bg-[#F8FAF8] outline-none focus:border-[#11382B] focus:bg-white transition"
            />
            <FolderOpen className="w-4 h-4 text-[#799986] absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-[#55695E] hover:text-[#11382B]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Topics List (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-[#55695E]">
              <p className="text-sm font-bold">No topics match "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#11382B] font-bold underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredTopics.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 sm:p-4.5 rounded-2xl bg-white border border-[#E2E8E2] hover:border-[#11382B] shadow-2xs hover:shadow-md transition transform hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    {/* Topic Number + Icon */}
                    <div className="w-11 h-11 rounded-xl bg-[#F4F6F2] group-hover:bg-[#EAF3EC] border border-[#E2E8E2] flex items-center justify-center shrink-0 transition">
                      {getIcon(item.iconName)}
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono font-bold text-[#11382B] bg-[#EAF3EC] px-2 py-0.2 rounded-md">
                          #{String(item.id).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#55695E]">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold font-serif-title text-[#142D21] group-hover:text-[#11382B] transition">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#55695E] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Redirect Button */}
                  <div className="shrink-0 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F6F2] group-hover:bg-[#11382B] group-hover:text-white text-[#11382B] text-xs font-semibold transition border border-[#DCE4DF]">
                      <span>Open Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E2E8E2] bg-white flex items-center justify-between text-xs text-[#6C7E74]">
          <span className="italic font-serif">
            "Regular practice is the secret to cracking AIR 1."
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#F4F6F2] hover:bg-[#EAF0E8] text-[#142D21] font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
