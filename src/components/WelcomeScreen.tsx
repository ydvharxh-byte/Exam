import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, User, Sparkles, ShieldCheck, Flame } from "lucide-react";
import { KvsLogo } from "./KvsLogo";

interface WelcomeScreenProps {
  onEnter: (name: string, designation: string, region: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [draftName, setDraftName] = useState("");
  const [designation, setDesignation] = useState("Administrative Officer (Aspirant)");
  const [region, setRegion] = useState("Central Administrative Cadre");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftName.trim()) return;
    onEnter(draftName.trim(), designation, region);
  };

  const handleQuickGuest = () => {
    onEnter("Aspirant", "Administrative Officer", "Central Cadre");
  };

  return (
    <main
      className="relative min-h-screen font-serif flex flex-col bg-[#0B1528] bg-cover bg-center text-slate-100"
      style={{ backgroundImage: "url('/images/upsc-dholpur.jpg')" }}
    >
      {/* Luxurious Dark Navy Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/85 via-[#0B1528]/80 to-[#070D19]/95 backdrop-blur-[3px]"></div>

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 max-w-7xl mx-auto w-full">
        <KvsLogo variant="light" />

        <div className="hidden md:flex items-center gap-3 text-xs md:text-sm text-slate-300">
          <div className="h-[1px] w-10 bg-[#A6CDB6]/50"></div>
          <span className="italic font-serif text-[#CBE2D4]">Empowering Leadership. Building Good Governance.</span>
        </div>
      </header>

      {/* Main Entrance Card */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center p-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl rounded-3xl border border-[#C98A2C]/35 bg-[#0F1E36]/90 p-8 md:p-11 shadow-2xl backdrop-blur-xl relative overflow-hidden text-slate-100"
          style={{
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(229, 169, 60, 0.2)"
          }}
        >
          {/* Subtle Ambient Golden Glow in background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C98A2C]/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Decorative Ashoka / Prestige Motif */}
          <div className="flex items-center justify-center gap-3 text-[#E5A93C] mb-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C98A2C]"></div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A93C]/10 border border-[#C98A2C]/30 text-[11px] font-sans font-semibold tracking-wider text-[#E5A93C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL RECRUITMENT SUITE</span>
            </div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C98A2C]"></div>
          </div>

          <div className="text-center mt-3 space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-serif-title font-medium tracking-tight">
              Lead India's <span className="text-[#E5A93C]">Schools.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-md mx-auto">
              Your UPSC administrative study desk is configured. Master CCS Rules, GFR 2017 & Educational Vision.
            </p>
          </div>

          {/* High-yield blueprint snapshot pills */}
          <div className="grid grid-cols-3 gap-2 my-6 pt-1 font-sans text-center">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60">
              <p className="text-base sm:text-lg font-bold text-[#E5A93C] font-mono">150</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">CBT MCQs</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60">
              <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono">85 : 15</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Merit Ratio</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60">
              <p className="text-base sm:text-lg font-bold text-amber-300 font-mono">60 Marks</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Interview</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 font-sans">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <User className="w-5 h-5 text-[#E5A93C]" />
              </div>
              <input
                type="text"
                required
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Enter your name (e.g. Harsh)"
                className="h-14 w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-12 pr-4 text-base sm:text-lg text-white outline-none focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/20 placeholder-slate-500 transition shadow-inner"
              />
            </div>

            {/* Optional Designation / Cadre toggle */}
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3 pt-1 text-xs"
              >
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Target Post / Current Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 text-slate-100 outline-none focus:border-[#E5A93C]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">State / Administrative Cadre</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 text-slate-100 outline-none focus:border-[#E5A93C]"
                  />
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              className="h-14 w-full rounded-xl flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#C98A2C] via-[#E5A93C] to-[#B3741B] hover:brightness-110 text-base sm:text-lg font-bold text-[#0B1528] transition shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Launch UPSC Study Desk</span>
              <ArrowRight className="w-5 h-5 text-[#0B1528]" />
            </button>

            {/* Quick Guest Access */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleQuickGuest}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-700 hover:border-[#C98A2C]/60 bg-slate-900/50 hover:bg-slate-800/80 text-[#E5A93C] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>Enter immediately as Harsh (Demo UPSC Aspirant)</span>
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-slate-400 max-w-md mx-auto font-sans">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instant Offline Access • No Login Required</span>
            </span>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[#E5A93C] hover:underline"
            >
              {showAdvanced ? "Quick Form" : "Set Cadre & Post"}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-center pb-6 pt-2 font-sans text-slate-400 text-xs">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-[#C98A2C]/40"></div>
          <span className="font-semibold text-slate-300 tracking-wider uppercase">
            Union Public Service Commission • Dholpur House, New Delhi
          </span>
          <div className="h-[1px] w-8 bg-[#C98A2C]/40"></div>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          Administrative & Leadership Examination Preparation System
        </p>
      </footer>
    </main>
  );
};
