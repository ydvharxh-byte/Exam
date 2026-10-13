import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, User, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onEnter: (name: string, designation: string, region: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [draftName, setDraftName] = useState("");
  const [designation, setDesignation] = useState("Vice Principal (Promotional Aspirant)");
  const [region, setRegion] = useState("Delhi Region");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftName.trim()) return;
    onEnter(draftName.trim(), designation, region);
  };

  const handleQuickGuest = () => {
    onEnter("Harsh", "Vice Principal", "Delhi Region");
  };

  return (
    <main
      className="relative min-h-screen font-serif flex flex-col bg-[#F3EFE6] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/desk-bg.jpg')" }}
    >
      {/* Warm parchment overlay */}
      <div className="absolute inset-0 bg-[#E8E1CD]/85 backdrop-blur-[2px]"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <svg width="46" height="38" viewBox="0 0 48 40" fill="#3D4E3A" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 24C18 24 12 29.3333 6 33.3333C12 33.3333 18 30.6667 24 29.3333C30 30.6667 36 33.3333 42 33.3333C36 29.3333 30 24 24 24Z"/>
            <path d="M24 29.3333C18 30.6667 12 34.6667 6 37.3333C12 37.3333 18 36 24 34.6667C30 36 36 37.3333 42 37.3333C36 34.6667 30 30.6667 24 29.3333Z"/>
            <path d="M23 20L18 6.66667M24 20L24 2.66667M25 20L30 6.66667M20 21.3333L8 13.3333M28 21.3333L40 13.3333" stroke="#3D4E3A" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-widest text-[#2f3b26] font-serif-title">
              KVS PRINCIPAL EXAM PORTAL
            </h1>
            <p className="text-xs text-[#5a5040]">
              Learn <span className="mx-1">•</span> Practice <span className="mx-1">•</span> Succeed
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs md:text-sm italic text-[#5a5040]">
          <div className="h-[1px] w-12 bg-[#8c7e65]"></div>
          Better Teachers <span className="mx-2 not-italic text-[#b5a78c]">|</span> Stronger KVS
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#4a5f36" className="ml-1">
            <path d="M12 22C12 22 12 16 17 11C20.5 7.5 22 4 22 4C22 4 18.5 5.5 15 9C12 12.5 12 18 12 18Z" />
            <path d="M12 22C12 22 12 16 7 11C3.5 7.5 2 4 2 4C2 4 5.5 5.5 9 9C12 12.5 12 18 12 18Z" />
          </svg>
        </div>
      </header>

      {/* Main Entrance Card */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl rounded-3xl border border-[#d2c7b3] bg-[#F1EAD7]/95 p-8 md:p-12 shadow-2xl backdrop-blur-xs"
          style={{
            boxShadow: "0 25px 50px -12px rgba(68, 54, 38, 0.2), inset 0 0 0 1px rgba(255,255,255,0.6)"
          }}
        >
          {/* Decorative book icon & rules */}
          <div className="flex items-center justify-center gap-4 text-[#4a5f36]">
            <div className="h-[1px] w-12 bg-[#8a7f66]"></div>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <div className="h-[1px] w-12 bg-[#8a7f66]"></div>
          </div>

          <div className="text-center mt-5 space-y-3">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#425034]">KVS PRINCIPAL EXAM PORTAL</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1e2a1b] font-serif-title font-medium">
              Welcome, Educator.
            </h2>
            <p className="text-sm sm:text-base text-[#5a5040]">
              Your study desk is ready. Enter your name to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#6e634f]">
                <User className="w-5 h-5 text-[#6e634f]" />
              </div>
              <input
                type="text"
                required
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Enter your name (e.g. Harsh)"
                className="h-14 w-full rounded-xl border border-[#C5BBA4] bg-[#F7F3E8] pl-12 pr-4 text-base sm:text-lg text-[#2f3b26] outline-none focus:border-[#4a5f36] focus:ring-1 focus:ring-[#4a5f36] placeholder-[#9c907b] transition shadow-xs"
              />
            </div>

            {/* Optional Designation / Region toggle */}
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3 pt-1 text-xs"
              >
                <div>
                  <label className="block text-[#5a5040] mb-1 font-semibold">Current Post / Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="h-10 w-full rounded-lg border border-[#C5BBA4] bg-[#F7F3E8] px-3 text-[#2f3b26] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5a5040] mb-1 font-semibold">KVS Region</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="h-10 w-full rounded-lg border border-[#C5BBA4] bg-[#F7F3E8] px-3 text-[#2f3b26] outline-none"
                  />
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              className="h-14 w-full rounded-xl flex items-center justify-center gap-2 bg-[#425539] hover:bg-[#2f3d28] text-base sm:text-lg font-medium text-[#F4F0E6] transition shadow-md cursor-pointer"
            >
              <span>Enter Study Room</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Quick Guest Access matching screenshot username 'Harsh' */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleQuickGuest}
                className="w-full py-2.5 px-3 rounded-xl border border-[#C5BBA4] hover:bg-[#EAE2CE] text-[#425539] text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#9C5A30]" />
                <span>Enter immediately as Harsh (Demo Educator)</span>
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-[#7e735e] max-w-md mx-auto">
            <span className="flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              No password required
            </span>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[#4a5f36] underline hover:text-[#2f3b26]"
            >
              {showAdvanced ? "Simple entry" : "Set Region & Post"}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-center pb-6 pt-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#4a5f36" className="mb-1.5">
          <path d="M12 22C12 22 12 16 17 11C20.5 7.5 22 4 22 4C22 4 18.5 5.5 15 9C12 12.5 12 18 12 18Z" />
          <path d="M12 22C12 22 12 16 7 11C3.5 7.5 2 4 2 4C2 4 5.5 5.5 9 9C12 12.5 12 18 12 18Z" />
        </svg>
        <div className="flex items-center gap-3 text-xs md:text-sm italic text-[#5a5040]">
          <div className="h-[1px] w-8 bg-[#8c7e65]"></div>
          Kendriya Vidyalaya Sangathan
          <div className="h-[1px] w-8 bg-[#8c7e65]"></div>
        </div>
      </footer>
    </main>
  );
};
