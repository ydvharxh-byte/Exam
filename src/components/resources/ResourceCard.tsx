import React, { useState } from "react";
import { ResourceItem } from "../../data/types";
import { 
  FileText, 
  Folder, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";

interface ResourceCardProps {
  resource: ResourceItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isSaved,
  onToggleSave
}) => {
  const [copied, setCopied] = useState(false);

  // File type styling
  const isFolder = resource.fileType.toLowerCase() === "folder" || resource.type === "folder";
  const isPdf = resource.fileType.toLowerCase() === "pdf" || resource.type === "pdf";

  const primaryUrl = resource.sourceUrl || resource.url || resource.driveUrl || "#";
  const hasDistinctDriveUrl = resource.driveUrl && resource.driveUrl !== resource.sourceUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(primaryUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl bg-[#FCFAF5] border border-[#E5DEC9] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#286B50]/40 transition-all duration-200">
      <div>
        {/* Top Header: Category, Type & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Format Badge */}
            <span 
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                isFolder
                  ? "bg-[#EAE2CE] text-[#173F35]"
                  : isPdf
                  ? "bg-[#286B50]/15 text-[#173F35]"
                  : "bg-[#B8D986]/30 text-[#173F35]"
              }`}
            >
              {isFolder ? <Folder className="w-3 h-3 text-[#286B50]" /> : <FileText className="w-3 h-3 text-[#286B50]" />}
              <span>{resource.fileType || resource.type || "DOC"}</span>
            </span>

            {/* Document Code */}
            {resource.code && (
              <span className="font-mono text-[11px] font-semibold text-[#252923]/60 bg-black/5 px-2 py-0.5 rounded">
                {resource.code}
              </span>
            )}

            {/* Featured Badge */}
            {resource.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#173F35] bg-[#B8D986] px-2 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => onToggleSave(resource.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isSaved 
                ? "bg-[#286B50]/10 text-[#286B50]" 
                : "text-[#252923]/40 hover:text-[#173F35] hover:bg-black/5"
            }`}
            title={isSaved ? "Remove from saved resources" : "Save resource for revision"}
            aria-label={isSaved ? "Remove from saved resources" : "Save resource for revision"}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#286B50]" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Title in Editorial Serif */}
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#173F35] leading-snug group-hover:text-[#286B50] transition-colors line-clamp-2">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-[#252923]/80 leading-relaxed line-clamp-3">
          {resource.description || "Official reference document indexed for the KVS Principal & Administrative Officer Examination."}
        </p>

        {/* Metadata Chips: Category, Pages, Size */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-[#252923]/70">
          <span className="px-2.5 py-0.5 rounded-full bg-[#F4EEDC] font-semibold text-[#173F35] border border-[#E5DEC9]">
            {resource.category || resource.module}
          </span>

          {resource.pages && (
            <span className="inline-flex items-center gap-1 font-medium">
              <Layers className="w-3 h-3 text-[#286B50]" />
              {resource.pages} pages
            </span>
          )}

          {resource.size && (
            <span className="font-medium">
              • {resource.size}
            </span>
          )}

          {resource.dateAdded && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#252923]/60 ml-auto">
              <Calendar className="w-3 h-3" />
              {resource.dateAdded}
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-3.5 border-t border-[#E5DEC9] flex items-center justify-between gap-2">
        {/* Copy Link Utility */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#252923]/60 hover:text-[#173F35] transition p-1 cursor-pointer"
          title="Copy resource URL"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#286B50]" />
              <span className="text-[#286B50] font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy Link</span>
            </>
          )}
        </button>

        {/* Direct Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Secondary Google Drive Mirror if present */}
          {hasDistinctDriveUrl && (
            <a
              href={resource.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#286B50]/30 hover:border-[#286B50] text-[#173F35] text-xs font-semibold hover:bg-[#F4EEDC] transition cursor-pointer"
              title="Open Google Drive mirror"
            >
              <span>Drive</span>
              <ExternalLink className="w-3 h-3 text-[#286B50]" />
            </a>
          )}

          {/* Primary Action Button: Open Resource */}
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#173F35] hover:bg-[#286B50] text-[#F4EEDC] text-xs font-bold transition shadow-xs hover:shadow active:scale-[0.98] cursor-pointer"
          >
            <span>Open Resource</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#B8D986]" />
          </a>
        </div>
      </div>
    </article>
  );
};
