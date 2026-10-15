import React from "react";
import { SortOption } from "../../services/resourceCatalogueService";
import { 
  Search, 
  X, 
  Bookmark, 
  RotateCcw
} from "lucide-react";

interface ResourceSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  showSavedOnly: boolean;
  onToggleSavedOnly: () => void;
  savedCount: number;
  availableTypes: string[];
  totalResultsCount: number;
  totalCatalogueCount: number;
  onResetFilters: () => void;
  isFiltered: boolean;
}

export const ResourceSearchBar: React.FC<ResourceSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  showSavedOnly,
  onToggleSavedOnly,
  savedCount,
  availableTypes,
  totalResultsCount,
  totalCatalogueCount,
  onResetFilters,
  isFiltered
}) => {
  const quickKeywords = ["GFR 2017", "CCS Rules", "NEP 2020", "RTE Act", "BES-127", "Safety"];

  return (
    <div className="rounded-2xl bg-[#FCFAF5] border border-[#E5DEC9] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#286B50] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by topic, document code, rule name (e.g. GFR, BES, RTE, CSMOP)..."
            className="w-full h-11 pl-10 pr-9 rounded-xl border border-[#D5CBB4] bg-white text-[#252923] text-xs sm:text-sm placeholder-[#252923]/40 focus:outline-none focus:border-[#286B50] focus:ring-1 focus:ring-[#286B50] transition"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-3.5 text-[#252923]/40 hover:text-[#252923] p-0.5"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Format Selector */}
        <div className="flex items-center gap-2">
          <div className="relative shrink-0">
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="h-11 px-3.5 pr-8 rounded-xl border border-[#D5CBB4] bg-white text-[#252923] text-xs sm:text-sm font-medium focus:outline-none focus:border-[#286B50] transition uppercase cursor-pointer"
            >
              {availableTypes.map((t) => (
                <option key={t} value={t}>
                  Format: {t}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-11 px-3.5 pr-8 rounded-xl border border-[#D5CBB4] bg-white text-[#252923] text-xs sm:text-sm font-medium focus:outline-none focus:border-[#286B50] transition cursor-pointer"
            >
              <option value="recent">Sort: Recently Added</option>
              <option value="title-asc">Sort: Title (A-Z)</option>
              <option value="title-desc">Sort: Title (Z-A)</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>

          {/* Saved Toggle Button */}
          <button
            type="button"
            onClick={onToggleSavedOnly}
            className={`h-11 px-3.5 sm:px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition cursor-pointer shrink-0 ${
              showSavedOnly
                ? "bg-[#173F35] text-[#F4EEDC] border-[#173F35] shadow-xs"
                : "border-[#D5CBB4] bg-white text-[#252923] hover:bg-[#F4EEDC]"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? "text-[#B8D986]" : "text-[#286B50]"}`} />
            <span>Saved ({savedCount})</span>
          </button>
        </div>
      </div>

      {/* Suggested Quick Keywords & Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#E5DEC9]/60 text-xs">
        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[#252923]/60 text-[11px] font-medium mr-1">Quick search:</span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => onSearchChange(kw)}
              className="px-2 py-0.5 rounded-md bg-[#F4EEDC] hover:bg-[#B8D986]/40 text-[#173F35] text-[11px] font-medium transition cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Results Counter & Reset Action */}
        <div className="flex items-center gap-3">
          <span className="text-[#252923]/70 font-medium">
            Showing <strong>{totalResultsCount}</strong> of {totalCatalogueCount} resources
          </span>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-[#286B50] hover:text-[#173F35] font-bold text-xs underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
