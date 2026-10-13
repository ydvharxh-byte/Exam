import React from "react";
import { Page } from "../data/types";
import { ShieldCheck } from "lucide-react";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-[#3c4e2e] bg-[#263520] text-[#D8D2C4] py-6 px-4 md:px-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left text */}
        <div className="text-xs sm:text-sm text-[#CDC6B5]">
          KVS Principal Exam Preparation <span className="mx-2 text-[#7f9270] opacity-60">|</span> Study <span className="mx-1">•</span> Practice <span className="mx-1">•</span> Succeed
        </div>

        {/* Center Leaf Motif */}
        <div className="text-[#8FA57E]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C12 22 12 16 17 11C20.5 7.5 22 4 22 4C22 4 18.5 5.5 15 9C12 12.5 12 18 12 18Z" />
            <path d="M12 22C12 22 12 16 7 11C3.5 7.5 2 4 2 4C2 4 5.5 5.5 9 9C12 12.5 12 18 12 18Z" />
          </svg>
        </div>

        {/* Right Italic Motto */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <span className="italic font-serif text-[#E2DCce]">
            Together Towards Better Education
          </span>
          <button
            onClick={() => onNavigate("admin")}
            className="text-[#9DB28C] hover:text-[#E2DCCE] transition flex items-center gap-1 text-[11px]"
            title="Admin Desk"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
