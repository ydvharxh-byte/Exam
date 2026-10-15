import React from "react";
import { ResourceItem } from "../../data/types";
import { Sparkles, Calendar, ExternalLink, FileText, Folder } from "lucide-react";

interface RecentlyAddedSectionProps {
  resources: ResourceItem[];
  onSelectResource?: (resource: ResourceItem) => void;
}

export const RecentlyAddedSection: React.FC<RecentlyAddedSectionProps> = ({
  resources
}) => {
  if (!resources || resources.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5DEC9] pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#286B50]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8D986]" />
            <span>Curated Updates</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173F35] mt-1">
            Recently Added Resources
          </h3>
        </div>
        <span className="text-xs text-[#252923]/70 font-sans">
          Freshly indexed documents from the examination stream
        </span>
      </div>

      {/* Grid of Highlighted Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((item) => {
          const isFolder = item.fileType.toLowerCase() === "folder" || item.type === "folder";
          const openUrl = item.sourceUrl || item.driveUrl || item.url || "#";

          return (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-xl bg-[#FAF6ED] border border-[#E5DEC9] p-4.5 hover:border-[#286B50] hover:bg-[#F4EEDC]/60 transition-all duration-200 shadow-2xs"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#B8D986] text-[#173F35]">
                    {isFolder ? <Folder className="w-2.5 h-2.5" /> : <FileText className="w-2.5 h-2.5" />}
                    <span>{item.fileType || item.type}</span>
                  </span>

                  {item.dateAdded && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-[#252923]/60">
                      <Calendar className="w-2.5 h-2.5 text-[#286B50]" />
                      {item.dateAdded}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-serif text-sm font-bold text-[#173F35] leading-snug line-clamp-2 group-hover:text-[#286B50] transition-colors">
                  {item.title}
                </h4>

                {/* Excerpt */}
                <p className="mt-1.5 text-xs text-[#252923]/75 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="mt-3 pt-2.5 border-t border-[#E5DEC9]/70 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-[#286B50] truncate max-w-[130px]">
                  {item.category || item.module}
                </span>

                <a
                  href={openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#173F35] group-hover:text-[#286B50] hover:underline"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3 text-[#286B50]" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
