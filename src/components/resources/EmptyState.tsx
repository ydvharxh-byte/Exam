import React from "react";
import { TELEGRAM_CONFIG } from "../../config/telegram";
import { Send, BookOpen, RotateCcw, ExternalLink, SearchX } from "lucide-react";

interface EmptyStateProps {
  type: "catalogue-empty" | "search-empty";
  searchQuery?: string;
  onResetFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  searchQuery,
  onResetFilters
}) => {
  if (type === "catalogue-empty") {
    return (
      <div className="rounded-3xl bg-[#FAF6ED] border-2 border-dashed border-[#D5CBB4] p-8 sm:p-14 text-center max-w-3xl mx-auto my-6 space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#173F35] text-[#B8D986] flex items-center justify-center mx-auto shadow-md">
          <BookOpen className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#286B50]">
            Digital Archive Stream
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35]">
            Resource Catalogue Syncing
          </h3>
          <p className="text-sm text-[#252923]/80 max-w-lg mx-auto leading-relaxed">
            The full collection of KVS Principal circulars, Swamy's handbooks, and model question papers is accessible directly through our private Telegram repository.
          </p>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={TELEGRAM_CONFIG.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#173F35] hover:bg-[#286B50] text-[#F4EEDC] font-bold text-sm shadow-sm transition cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#B8D986]" />
            <span>Browse Telegram Channel</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#FAF6ED] border border-dashed border-[#D5CBB4] p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 space-y-4">
      <div className="w-12 h-12 rounded-xl bg-[#EAE2CE] text-[#286B50] flex items-center justify-center mx-auto">
        <SearchX className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        <h4 className="font-serif text-lg font-bold text-[#173F35]">
          No matching resources found
        </h4>
        <p className="text-xs sm:text-sm text-[#252923]/75 max-w-md mx-auto leading-relaxed">
          {searchQuery
            ? `No documents matched the keyword "${searchQuery}". Try a different term or clear the filter.`
            : "No documents match the currently selected category or format filter."}
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#173F35] text-[#F4EEDC] text-xs font-semibold hover:bg-[#286B50] transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#B8D986]" />
            <span>Reset all filters</span>
          </button>
        )}

        <a
          href={TELEGRAM_CONFIG.inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#286B50] text-[#173F35] text-xs font-semibold hover:bg-[#F4EEDC] transition cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 text-[#286B50]" />
          <span>Search in Telegram</span>
          <ExternalLink className="w-3 h-3 text-[#286B50]" />
        </a>
      </div>
    </div>
  );
};
