import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="relative">
      {/* Scrollable Container with Subtle Fade on Overflow */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-[#173F35] text-[#F4EEDC] shadow-xs border border-[#173F35]"
                  : "bg-[#FCFAF5] text-[#252923]/80 hover:text-[#173F35] hover:bg-[#F4EEDC] border border-[#E5DEC9]"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? "bg-[#B8D986] text-[#173F35]"
                    : "bg-black/5 text-[#252923]/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
