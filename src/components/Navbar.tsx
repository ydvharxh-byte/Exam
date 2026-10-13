import React, { useState } from "react";
import { Page } from "../data/types";
import { ChevronDown, ShieldCheck, LogOut, Bookmark, Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  educatorName: string;
  educatorDesignation: string;
  educatorRegion: string;
  unreadAnnouncementsCount: number;
  onSignOut: () => void;
  savedResourcesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  educatorName,
  educatorDesignation,
  educatorRegion,
  unreadAnnouncementsCount,
  onSignOut,
  savedResourcesCount
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: Page; label: string }[] = [
    { id: "dashboard", label: "Home" },
    { id: "resources", label: "Study Resources" },
    { id: "quizzes", label: "Practice Quizzes" },
    { id: "discussion", label: "Doubt Discussion" },
    { id: "announcements", label: "Announcements" },
    { id: "syllabus", label: "Exam Pattern" },
  ];

  const displayName = educatorName || "Harsh";

  return (
    <header className="sticky top-0 z-40 border-b border-[#D5CBB4] bg-[#F2ECD8]/95 backdrop-blur-xs shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Left: KVS Principal Logo & Subtitle */}
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-3 text-left">
            <svg width="42" height="34" viewBox="0 0 48 40" fill="#2d3a24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 24C18 24 12 29.3333 6 33.3333C12 33.3333 18 30.6667 24 29.3333C30 30.6667 36 33.3333 42 33.3333C36 29.3333 30 24 24 24Z"/>
              <path d="M24 29.3333C18 30.6667 12 34.6667 6 37.3333C12 37.3333 18 36 24 34.6667C30 36 36 37.3333 42 37.3333C36 34.6667 30 30.6667 24 29.3333Z"/>
              <path d="M23 20L18 6.66667M24 20L24 2.66667M25 20L30 6.66667M20 21.3333L8 13.3333M28 21.3333L40 13.3333" stroke="#2d3a24" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <p className="text-xl font-bold tracking-wider text-[#1d2617] font-serif-title">KVS PRINCIPAL</p>
              <p className="text-xs text-[#524a3a]">Study <span className="mx-1">•</span> Practice <span className="mx-1">•</span> Succeed</p>
            </div>
          </button>

          <div className="hidden lg:block h-9 w-[1px] bg-[#C5BAA0] ml-2"></div>
          <p className="hidden lg:block text-[#4b4334] text-xs font-serif">Study Resources</p>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition pb-1 text-sm ${
                  active
                    ? "border-b-2 border-[#3c4f2e] text-[#1c2415] font-semibold"
                    : "text-[#5a5040] hover:text-[#2d3a24]"
                }`}
              >
                {item.label}
                {item.id === "announcements" && unreadAnnouncementsCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-[#cc5141] text-white font-bold">
                    {unreadAnnouncementsCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: User Pill Button & Leaf Motif */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-[#D1C6AE] bg-[#EAE3CD] px-3.5 py-1.5 text-xs sm:text-sm text-[#3b3429] hover:bg-[#E0D8C0] transition shadow-2xs"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5a5040]">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="font-semibold line-clamp-1 max-w-[100px]">{displayName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6c604c]" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl border border-[#C5BAA0] bg-[#F4ECD8] shadow-xl overflow-hidden py-1 z-50 text-xs">
                <div className="px-4 py-2.5 border-b border-[#D8CCA8] bg-[#EBE3CB]">
                  <p className="font-bold text-[#2d3a24]">{displayName}</p>
                  <p className="text-[#645743] text-[11px] mt-0.5">{educatorDesignation}</p>
                  <p className="text-[#7f7058] text-[10px]">{educatorRegion}</p>
                </div>
                
                <button
                  onClick={() => { onNavigate("resources"); setShowProfileMenu(false); }}
                  className="w-full px-4 py-2.5 text-left text-[#3b3429] hover:bg-[#E4DBC2] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5 text-[#5e4f3a]" /> Saved Resources
                  </span>
                  <span className="bg-[#D8CCA8] text-[#2d3a24] font-bold px-1.5 py-0.5 rounded-full text-[10px]">
                    {savedResourcesCount}
                  </span>
                </button>

                <button
                  onClick={() => { onNavigate("admin"); setShowProfileMenu(false); }}
                  className="w-full px-4 py-2.5 text-left text-[#3b3429] hover:bg-[#E4DBC2] flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5e4f3a]" /> Admin Workspace
                </button>

                <div className="border-t border-[#D8CCA8]">
                  <button
                    onClick={() => { setShowProfileMenu(false); onSignOut(); }}
                    className="w-full px-4 py-2.5 text-left text-[#a83226] hover:bg-[#EAE0C7] flex items-center gap-2 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Change Profile / Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Leaf Motif Icon on far right */}
          <div className="hidden sm:block text-[#4a5f36] pl-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C12 22 12 16 17 11C20.5 7.5 22 4 22 4C22 4 18.5 5.5 15 9C12 12.5 12 18 12 18Z" />
              <path d="M12 22C12 22 12 16 7 11C3.5 7.5 2 4 2 4C2 4 5.5 5.5 9 9C12 12.5 12 18 12 18Z" />
            </svg>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#3b3429] hover:bg-[#E0D8C0]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D5CBB4] bg-[#F2ECD8] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                currentPage === item.id ? "bg-[#3c4f2e] text-[#F2ECD8] font-semibold" : "text-[#5a5040]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
