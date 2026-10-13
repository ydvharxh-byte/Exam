import React, { useState, useMemo } from "react";
import { ResourceItem } from "../data/types";
import { STUDY_FOLDER_URL, QUIZ_FOLDER_URL } from "../data/resources";
import { 
  Search, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  BookOpen,
  FolderOpen
} from "lucide-react";

interface ResourcesViewProps {
  resources: ResourceItem[];
  savedResourceIds: string[];
  onToggleSave: (id: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  savedResourceIds,
  onToggleSave
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const modules = ["All", "Admin & Finance", "Perspectives in Education", "Pedagogy & Evaluation", "School Safety & Law", "General & Languages"];
  const fileTypes = ["All", "pdf", "doc", "folder"];

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchModule = selectedModule === "All" || item.module === selectedModule;
      const matchType = selectedType === "All" || item.type === selectedType;
      const matchSaved = !showSavedOnly || savedResourceIds.includes(item.id);

      return matchSearch && matchModule && matchType && matchSaved;
    });
  }, [resources, searchTerm, selectedModule, selectedType, showSavedOnly, savedResourceIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Google Drive Folder Quick Access */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#D5CBB4] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFE5D5] text-[#2F3D28] text-xs font-semibold mb-2 border border-[#C0CCB1]">
            <BookOpen className="w-3.5 h-3.5 text-[#3c4e2e]" />
            <span>Digital Repository • Google Drive Integration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2918] font-serif-title">
            KVS Study Resources & E-Library
          </h2>
          <p className="text-xs sm:text-sm text-[#5a5040] mt-1">
            Access indexed study materials, GFR 2017 notes, CCS Rules, NCF-SE 2023, and IGNOU measurement PDFs.
          </p>
        </div>

        {/* Cloud Folders Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={STUDY_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-semibold shadow-xs transition"
          >
            <FolderOpen className="w-4 h-4 text-[#E6C387]" />
            <span>Google Drive: Study Folders</span>
            <ExternalLink className="w-3 h-3 text-[#D8CCA8]" />
          </a>
          <a
            href={QUIZ_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#C5BAA0] bg-[#EAE2CE] hover:bg-[#E0D7C0] text-[#2f3b26] text-xs font-semibold transition shadow-2xs"
          >
            <FolderOpen className="w-4 h-4 text-[#8C522A]" />
            <span>Practice Folder 2</span>
            <ExternalLink className="w-3 h-3 text-[#7a6b52]" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#F2ECD8] border border-[#D5CBB4] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8a7f66] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by topic, document code, rule name (e.g. GFR, CCS, POCSO, NCF)..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] focus:border-[#4a5f36] text-[#2f3b26] outline-none text-xs sm:text-sm placeholder-[#9c907b]"
            />
          </div>

          {/* Module Selector */}
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="h-11 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-[#2f3b26] focus:border-[#4a5f36] outline-none text-xs sm:text-sm font-medium"
          >
            {modules.map((m) => (
              <option key={m} value={m}>Module: {m}</option>
            ))}
          </select>

          {/* Type Selector */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-11 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-[#2f3b26] focus:border-[#4a5f36] outline-none text-xs sm:text-sm uppercase font-medium"
          >
            {fileTypes.map((t) => (
              <option key={t} value={t}>Format: {t}</option>
            ))}
          </select>

          {/* Saved Toggle */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`h-11 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition ${
              showSavedOnly 
                ? "bg-[#9C5A30] text-[#F4F0E6] border-[#834923]" 
                : "border-[#C5BAA0] bg-[#FAF6EC] text-[#4a3f2e] hover:bg-[#EAE2CE]"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved ({savedResourceIds.length})</span>
          </button>
        </div>

        {/* Results Counter and Filter Pills */}
        <div className="flex items-center justify-between text-xs text-[#6e634f] pt-1">
          <span>Showing {filteredResources.length} of {resources.length} study resources</span>
          {(searchTerm || selectedModule !== "All" || selectedType !== "All" || showSavedOnly) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedModule("All");
                setSelectedType("All");
                setShowSavedOnly(false);
              }}
              className="text-[#3c4e2e] hover:underline font-bold"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => {
          const isSaved = savedResourceIds.includes(res.id);
          const isFolder = res.type === "folder";

          return (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs hover:-translate-y-1 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isFolder ? "bg-[#F0E6D2] text-[#8C522A]" : "bg-[#DFE5D5] text-[#2F3D28]"
                    }`}>
                      {res.type}
                    </span>
                    {res.code && (
                      <span className="text-[10px] font-mono text-[#7e725d] font-semibold">
                        {res.code}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleSave(res.id)}
                    className="text-[#9c907b] hover:text-[#9C5A30] transition p-1"
                    title={isSaved ? "Remove from saved" : "Save for revision"}
                  >
                    {isSaved ? <BookmarkCheck className="w-5 h-5 text-[#9C5A30]" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                </div>

                <h3 className="text-sm font-bold font-serif-title text-[#1f2918] line-clamp-2 leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-[#5a5040] mt-2 line-clamp-2 leading-relaxed">
                  {res.description || "Official reference document for KVS Principal examination syllabus."}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#756851]">
                  <span className="bg-[#EAE2CE] px-2 py-0.5 rounded font-medium text-[#4a3f2e]">
                    {res.topic}
                  </span>
                  {res.pages && <span>• {res.pages} pages</span>}
                  {res.size && <span>• {res.size}</span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#E2D8C0] flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#8b7e66] uppercase tracking-wider">
                  {res.module}
                </span>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3c4e2e] hover:bg-[#2c3b21] text-[#F2ECD8] text-xs font-semibold transition shadow-2xs"
                >
                  <span>Open Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#F2ECD8] border border-dashed border-[#C5BAA0] space-y-3">
          <BookOpen className="w-12 h-12 text-[#9c907b] mx-auto" />
          <h4 className="text-base font-bold text-[#2f3b26] font-serif-title">No matching study resources found</h4>
          <p className="text-xs text-[#5a5040] max-w-md mx-auto">
            Try adjusting your search keyword or clearing the module filter.
          </p>
        </div>
      )}
    </div>
  );
};
