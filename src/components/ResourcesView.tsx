import React, { useState, useMemo } from "react";
import { ResourceItem } from "../data/types";
import { 
  loadLocalCatalogue, 
  getUniqueCategories, 
  getUniqueFileTypes, 
  getRecentlyAdded, 
  filterAndSortResources, 
  SortOption,
  normalizeResource
} from "../services/resourceCatalogueService";
import { 
  TelegramChannelSection, 
  ResourceCard, 
  RecentlyAddedSection, 
  ResourceSearchBar, 
  CategoryFilter, 
  EmptyState 
} from "./resources";
import { STUDY_FOLDER_URL, QUIZ_FOLDER_URL } from "../data/resources";
import { FolderOpen, ExternalLink, Library } from "lucide-react";

interface ResourcesViewProps {
  resources?: ResourceItem[];
  savedResourceIds?: string[];
  onToggleSave?: (id: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources: initialResources,
  savedResourceIds = [],
  onToggleSave = () => {}
}) => {
  // 1. Data initialization: Use passed resources if available, otherwise load from local JSON catalogue
  const allResources = useMemo(() => {
    if (initialResources && initialResources.length > 0) {
      return initialResources.map(normalizeResource);
    }
    return loadLocalCatalogue();
  }, [initialResources]);

  // 2. Filter & Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // 3. Computed categories, types, and counts
  const categories = useMemo(() => getUniqueCategories(allResources), [allResources]);
  const availableTypes = useMemo(() => getUniqueFileTypes(allResources), [allResources]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allResources.length };
    allResources.forEach((item) => {
      const cat = item.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [allResources]);

  // 4. Recently added resources for top spotlight
  const recentResources = useMemo(() => getRecentlyAdded(allResources, 4), [allResources]);

  // 5. Filtered & Sorted Resources for main grid
  const filteredResources = useMemo(() => {
    return filterAndSortResources(
      allResources,
      searchTerm,
      selectedCategory,
      selectedType,
      sortBy,
      showSavedOnly,
      savedResourceIds
    );
  }, [allResources, searchTerm, selectedCategory, selectedType, sortBy, showSavedOnly, savedResourceIds]);

  const isFiltered = Boolean(
    searchTerm.trim() || 
    selectedCategory !== "All" || 
    selectedType !== "All" || 
    showSavedOnly || 
    sortBy !== "recent"
  );

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedType("All");
    setSortBy("recent");
    setShowSavedOnly(false);
  };

  // If no catalogue is available at all, show master empty state with direct Telegram CTA
  if (allResources.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <EmptyState type="catalogue-empty" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-sans">
      {/* 1. Academic Editorial Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#E5DEC9] pb-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/10 text-[#173F35] text-xs font-bold border border-[#173F35]/20">
            <Library className="w-3.5 h-3.5 text-[#286B50]" />
            <span>KVS Principal Examination • Resource Repository</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#173F35] tracking-tight leading-tight">
            Administrative & Academic Resource Hub
          </h1>

          <p className="text-xs sm:text-sm text-[#252923]/75 leading-relaxed font-sans">
            Indexed syllabus reference materials, Swamy's Handbook digests, GFR 2017 compendiums, CCS Conduct Rules, and NCF-SE 2023 guidelines.
          </p>
        </div>

        {/* Quick Drive Folders Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href={STUDY_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#173F35] hover:bg-[#286B50] text-[#F4EEDC] text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-[#B8D986]" />
            <span>Study Drive</span>
            <ExternalLink className="w-3 h-3 text-[#B8D986]/80" />
          </a>

          <a
            href={QUIZ_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D5CBB4] bg-[#FAF6ED] hover:bg-[#F4EEDC] text-[#173F35] text-xs font-semibold transition shadow-2xs cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-[#286B50]" />
            <span>Practice Drive</span>
            <ExternalLink className="w-3 h-3 text-[#252923]/60" />
          </a>
        </div>
      </header>

      {/* 2. Prominent Telegram Channel Section */}
      <TelegramChannelSection totalResourcesCount={allResources.length} />

      {/* 3. Recently Added Resources Spotlight */}
      {!isFiltered && (
        <RecentlyAddedSection resources={recentResources} />
      )}

      {/* 4. Search and Filter Bar */}
      <section className="space-y-4">
        <ResourceSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showSavedOnly={showSavedOnly}
          onToggleSavedOnly={() => setShowSavedOnly(!showSavedOnly)}
          savedCount={savedResourceIds.length}
          availableTypes={availableTypes}
          totalResultsCount={filteredResources.length}
          totalCatalogueCount={allResources.length}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
        />

        {/* Category Pills Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />
      </section>

      {/* 5. Resources Cards Grid */}
      {filteredResources.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((item) => (
            <ResourceCard
              key={item.id}
              resource={item}
              isSaved={savedResourceIds.includes(item.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          type="search-empty"
          searchQuery={searchTerm}
          onResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
};
