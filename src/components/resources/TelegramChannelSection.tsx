import React, { useState } from "react";
import { TELEGRAM_CONFIG } from "../../config/telegram";
import { 
  Send, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Zap, 
  HelpCircle, 
  CheckCircle2,
  Copy,
  Check
} from "lucide-react";

interface TelegramChannelSectionProps {
  totalResourcesCount?: number;
  className?: string;
}

export const TelegramChannelSection: React.FC<TelegramChannelSectionProps> = ({
  totalResourcesCount = 20,
  className = ""
}) => {
  const [copied, setCopied] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(TELEGRAM_CONFIG.inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#173F35] text-[#F4EEDC] border border-[#286B50] shadow-md ${className}`}>
      {/* Subtle Botanical / Academic Background Pattern */}
      <div 
        className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#286B50]/20 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute -left-10 -top-10 w-60 h-60 rounded-full bg-[#B8D986]/10 blur-2xl pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Editorial Headline & Value Propositions */}
        <div className="max-w-2xl space-y-4">
          {/* Channel Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#286B50]/70 border border-[#B8D986]/40 text-[#B8D986] text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#B8D986] animate-pulse" />
            <span>{TELEGRAM_CONFIG.badgeText}</span>
          </div>

          {/* Title in Editorial Serif */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#F4EEDC] leading-tight">
            {TELEGRAM_CONFIG.channelName}
          </h2>

          <p className="text-sm sm:text-base text-[#F4EEDC]/85 leading-relaxed font-sans font-normal">
            {TELEGRAM_CONFIG.description}
          </p>

          {/* Core Feature Badges */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/20 border border-white/10">
              <Zap className="w-4 h-4 text-[#B8D986] shrink-0" />
              <span className="font-medium text-[#F4EEDC]/90">Zero Bulk Uploads</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/20 border border-white/10">
              <FileText className="w-4 h-4 text-[#B8D986] shrink-0" />
              <span className="font-medium text-[#F4EEDC]/90">Uncompressed PDFs</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/20 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#B8D986] shrink-0" />
              <span className="font-medium text-[#F4EEDC]/90">Authorized Group</span>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent Telegram Action Box */}
        <div className="w-full lg:w-auto shrink-0 flex flex-col items-stretch lg:items-end gap-3.5">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#252923]/90 border border-[#B8D986]/30 backdrop-blur-md shadow-lg space-y-4 text-center lg:text-left min-w-[280px] sm:min-w-[320px]">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#286B50] flex items-center justify-center text-[#B8D986] shadow-inner">
                  <Send className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-[#F4EEDC]">{TELEGRAM_CONFIG.channelHandle}</div>
                  <div className="text-[11px] text-[#B8D986]">Direct Access Channel</div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/10 text-[#F4EEDC]/80">
                {totalResourcesCount}+ docs
              </span>
            </div>

            <p className="text-xs text-[#F4EEDC]/80 text-left leading-relaxed">
              Open the private invite link directly to view the chronological stream of notes, rules, and question banks.
            </p>

            {/* Direct Open Button */}
            <a
              href={TELEGRAM_CONFIG.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#B8D986] hover:bg-[#a6cb6e] text-[#173F35] font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Browse Telegram Channel</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75" />
            </a>

            {/* Copy Invite Link Option */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                type="button"
                onClick={handleCopyInvite}
                className="inline-flex items-center gap-1.5 text-xs text-[#F4EEDC]/70 hover:text-[#B8D986] transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#B8D986]" />
                    <span className="text-[#B8D986] font-medium">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Invite Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="inline-flex items-center gap-1 text-[11px] text-[#B8D986] hover:underline cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>How to join</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable How to Join Guide */}
      {showTips && (
        <div className="px-6 pb-6 pt-2 sm:px-8 border-t border-white/10 bg-[#123129]/60 text-xs text-[#F4EEDC]/90 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <h4 className="font-semibold text-[#B8D986] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Access Instructions for Candidates:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-[#F4EEDC]/80 leading-relaxed pl-1">
              <li>Click <strong>Browse Telegram Channel</strong> above. It will launch Telegram web or the desktop/mobile application.</li>
              <li>Press <strong>Join Channel</strong> or <strong>Request to Join</strong> inside Telegram.</li>
              <li>Use the channel's in-app search for instant lookup by circular number, rule name (e.g. <em>GFR 2017</em>, <em>CCS CCA Rules</em>), or question topic.</li>
              <li>All materials remain safely backed up in the cloud with zero storage burden on your local computer.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
