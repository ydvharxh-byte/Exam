import React, { useState } from "react";
import { Page } from "../data/types";
import { KvsLogo } from "./KvsLogo";
import { 
  Search, 
  ChevronDown, 
  User, 
  Bookmark, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  FolderOpen
} from "lucide-react";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  educatorName: string;
  educatorDesignation: string;
  educatorRegion: string;
  unreadAnnouncementsCount: number;
  onSignOut: () => void;
  savedResourcesCount: number;
  onOpenPracticeMore?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  educatorName: _educatorName,
  educatorDesignation: _educatorDesignation,
  educatorRegion: _educatorRegion,
  unreadAnnouncementsCount,
  onSignOut,
  savedResourcesCount,
  onOpenPracticeMore
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems: { id: Page; label: string; badgeCount?: number }[] = [
    { id: "dashboard", label: "Home" },
    { id: "resources", label: "Study Resources" },
    { id: "quizzes", label: "Practice Quizzes" },
    { id: "discussion", label: "Doubt Discussion" },
    { id: "announcements", label: "Announcements", badgeCount: unreadAnnouncementsCount || 3 },
    { id: "syllabus", label: "Exam Pattern" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigate("resources");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E7E2] shadow-2xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center text-left cursor-pointer transition hover:opacity-95"
        >
          <KvsLogo />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative pb-1.5 pt-1 text-[13.5px] font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? "text-[#11382B] font-bold border-b-2 border-[#11382B]"
                    : "text-[#55695E] hover:text-[#11382B]"
                }`}
              >
                <span>{item.label}</span>
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#D34537] text-white text-[10px] font-bold leading-none">
                    {item.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Search + User Pill + Botanical Accent */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Trigger Button */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search resources, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 sm:w-60 h-9 pl-8 pr-7 text-xs rounded-full border border-[#C5D2C9] bg-[#F8F9F5] outline-none focus:border-[#11382B]"
                />
                <Search className="w-3.5 h-3.5 text-[#55695E] absolute left-2.5" />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-2 text-xs text-[#55695E] hover:text-[#11382B]"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full bg-[#F4F6F2] hover:bg-[#EAF0E8] text-[#3D5245] flex items-center justify-center transition cursor-pointer border border-[#E2E8E1]"
                title="Search study materials"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Practice More Google Drive Slide Trigger */}
          {onOpenPracticeMore && (
            <button
              onClick={onOpenPracticeMore}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF3EC] hover:bg-[#D8EADB] text-[#11382B] text-xs font-bold border border-[#C5D9CB] transition shadow-2xs cursor-pointer"
              title="Open Google Drive Topic Repositories"
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#11382B]" />
              <span className="hidden sm:inline">Practice More</span>
            </button>
          )}

          {/* Candidate Portal Pill (All-User Friendly) */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-[#D3DDD5] bg-[#F7F9F6] hover:bg-[#EEF3ED] px-3 py-1.5 text-xs sm:text-sm text-[#11382B] transition cursor-pointer shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#11382B] text-white flex items-center justify-center text-xs font-semibold">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-xs sm:text-sm">Aspirants Hub</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#55695E]" />
            </button>

            {/* Candidate Hub Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#DCE4DF] bg-white shadow-xl overflow-hidden py-1 z-50 text-xs">
                <div className="px-4 py-3 border-b border-[#EAEFEA] bg-[#F8FAF7]">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#11382B] text-sm">Administrative Aspirant Portal</p>
                    <span className="px-2 py-0.5 rounded-full bg-[#EAF3EC] text-[#11382B] text-[10px] font-bold">
                      Open Access
                    </span>
                  </div>
                  <p className="text-[#55695E] text-[11px] mt-0.5 font-medium">Central Administrative Services</p>
                  <p className="text-[#7A8E82] text-[10px]">Administrative & Leadership Examination</p>
                </div>

                {/* Quick Practice & Drive Links */}
                <button
                  onClick={() => { onNavigate("quizzes"); setShowProfileMenu(false); }}
                  className="w-full px-4 py-2.5 text-left text-[#2B3E32] hover:bg-[#F2F7F3] flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Practice 51 CSMoP Questions</span>
                  </span>
                  <span className="bg-[#EAF3EC] text-[#11382B] font-bold px-1.5 py-0.5 rounded-md text-[9px]">
                    Interactive
                  </span>
                </button>

                {onOpenPracticeMore && (
                  <button
                    onClick={() => { onOpenPracticeMore(); setShowProfileMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-[#2B3E32] hover:bg-[#F2F7F3] flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FolderOpen className="w-3.5 h-3.5 text-[#11382B]" />
                      <span>10 Google Drive Repositories</span>
                    </span>
                    <span className="bg-[#FBF1EB] text-[#A2573B] font-bold px-1.5 py-0.5 rounded-md text-[9px]">
                      Drive
                    </span>
                  </button>
                )}

                <button
                  onClick={() => { onNavigate("resources"); setShowProfileMenu(false); }}
                  className="w-full px-4 py-2.5 text-left text-[#2B3E32] hover:bg-[#F2F7F3] flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5 text-[#11382B]" /> Saved Resources
                  </span>
                  <span className="bg-[#EAF3EC] text-[#11382B] font-bold px-2 py-0.5 rounded-full text-[10px]">
                    {savedResourcesCount}
                  </span>
                </button>

                <button
                  onClick={() => { onNavigate("quizzes"); setShowProfileMenu(false); }}
                  className="w-full px-4 py-2.5 text-left text-[#2B3E32] hover:bg-[#F2F7F3] flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#11382B]" /> Chapter Quizzes
                  </span>
                  <span className="bg-[#11382B] text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                    10Q
                  </span>
                </button>

                <button
                  onClick={() => { onNavigate("admin"); setShowProfileMenu(false); }}
                  className="w-full px-4 py-2.5 text-left text-[#2B3E32] hover:bg-[#F2F7F3] flex items-center gap-2 transition cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#11382B]" /> Administrative Desk
                </button>

                <div className="border-t border-[#EAEFEA]">
                  <button
                    onClick={() => { setShowProfileMenu(false); onSignOut(); }}
                    className="w-full px-4 py-2.5 text-left text-[#C2392E] hover:bg-[#FDF2F1] flex items-center gap-2 font-medium transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out / Switch User
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Botanical Leaf Accent Icon (Exact match to screenshot right corner) */}
          <div className="hidden sm:flex items-center justify-center w-8 h-8 text-[#11382B] opacity-80 hover:opacity-100 transition" title="Administrative Excellence">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path
                d="M19.5 4.5C19.5 4.5 15 5 11 9C7 13 6 18 6 18C6 18 11 17 15 13C19 9 19.5 4.5 19.5 4.5Z"
                fill="#11382B"
              />
              <path
                d="M6 18C8 15 12 11 15 9"
                stroke="#A8C4B2"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M5 20C5 20 7.5 19.5 9 17.5"
                stroke="#11382B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-[#11382B] hover:bg-[#EAF0E8]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E7E2] bg-white px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm flex items-center justify-between font-medium ${
                  active
                    ? "bg-[#11382B] text-white font-bold"
                    : "text-[#43574C] hover:bg-[#F3F6F2]"
                }`}
              >
                <span>{item.label}</span>
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    active ? "bg-white text-[#11382B]" : "bg-[#D34537] text-white"
                  }`}>
                    {item.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
