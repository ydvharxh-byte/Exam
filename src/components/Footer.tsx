import React from "react";
import { Page } from "../data/types";
import { ShieldCheck, Send } from "lucide-react";
import { TELEGRAM_CONFIG } from "../config/telegram";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-[#E2E8E2] bg-white text-[#55695E] py-5 px-4 md:px-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left text */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#142D21]">
            Administrative Examination Portal
          </span>
          <span className="text-[#C5D2C9]">|</span>
          <span className="text-[#6C7E74]">
            Empowering Leadership. Building Good Governance.
          </span>
        </div>

        {/* Right Quote & Botanical Leaf & Admin access */}
        <div className="flex items-center gap-3">
          <span className="italic font-serif text-[#4A5E52] hidden sm:inline">
            "Integrity, efficiency, and dedication build a stronger nation."
          </span>

          <div className="text-[#11382B]" title="Administrative Excellence">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path
                d="M19.5 4.5C19.5 4.5 15 5 11 9C7 13 6 18 6 18C6 18 11 17 15 13C19 9 19.5 4.5 19.5 4.5Z"
                fill="#11382B"
              />
            </svg>
          </div>

          <a
            href={TELEGRAM_CONFIG.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#173F35] hover:text-[#286B50] bg-[#FAF6ED] hover:bg-[#F4EEDC] transition flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded border border-[#D5CBB4] cursor-pointer"
            title="Join Private Telegram Channel"
          >
            <Send className="w-3 h-3 text-[#286B50]" />
            <span>Telegram</span>
          </a>

          <button
            onClick={() => onNavigate("admin")}
            className="text-[#889B90] hover:text-[#11382B] transition flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border border-[#E2E8E2] hover:border-[#11382B] cursor-pointer"
            title="Administrative Desk"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
