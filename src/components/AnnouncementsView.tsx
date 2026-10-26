import { Announcement, Page } from "../data/types";
import { Bell, Calendar, ExternalLink } from "lucide-react";

interface AnnouncementsViewProps {
  announcements: Announcement[];
  dismissedIds: string[];
  onDismiss: (id: string) => void;
  onNavigateToSyllabus?: () => void;
  onNavigate?: (page: Page) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  dismissedIds,
  onDismiss,
  onNavigateToSyllabus,
  onNavigate
}) => {
  const activeAnnouncements = announcements
    .filter((a) => a.active)
    .sort((a, b) => +new Date(b.publicationDate) - +new Date(a.publicationDate));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E2E8E2] pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3EC] text-[#11382B] text-xs font-semibold mb-2 border border-[#C5D9CB]">
          <Bell className="w-3.5 h-3.5 text-[#11382B]" />
          <span>Official Examination Bulletins & Circulars</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#142D21] font-serif-title">
          Administrative Examination Announcements & Notices
        </h2>
        <p className="text-xs sm:text-sm text-[#55695E] mt-1">
          Stay informed on CBT schedules, syllabus revisions, mock tests, and official notifications.
        </p>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {activeAnnouncements.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white border border-[#E2E8E2] text-center space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-[#EAF3EC] text-[#11382B] flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-serif-title text-[#142D21]">
              No Active Announcements
            </h3>
            <p className="text-xs text-[#55695E] max-w-md mx-auto leading-relaxed">
              There are currently no new alerts. Examination notifications and circulars will be published here as soon as they are announced.
            </p>
          </div>
        ) : (
          activeAnnouncements.map((item) => {
          const isDismissed = dismissedIds.includes(item.id);
          const isHighPriority = item.priority === "High";

          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl bg-white border transition shadow-xs space-y-3 ${
                isHighPriority ? "border-[#F2DDD2] ring-1 ring-[#A2573B]/20" : "border-[#E2E8E2]"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D8C0] pb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                    isHighPriority ? "bg-[#cc5141] text-white" : "bg-[#DFE5D5] text-[#2F3D28]"
                  }`}>
                    {item.priority} Priority
                  </span>
                  <span className="text-xs font-semibold text-[#6e634f] uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#7e725d]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.publicationDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold font-serif-title text-[#1f2918] leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#4b402e] leading-relaxed">
                {item.message}
              </p>

              <div className="pt-3 border-t border-[#E2D8C0] flex items-center justify-between text-xs">
                {item.linkText ? (
                  <button
                    onClick={() => {
                      if (item.linkUrl && onNavigate) {
                        onNavigate(item.linkUrl as Page);
                      } else if (onNavigateToSyllabus) {
                        onNavigateToSyllabus();
                      }
                    }}
                    className="font-bold text-[#3c4e2e] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{item.linkText}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[#8a7f66] text-[11px]">Official Examination Announcement</span>
                )}

                <button
                  onClick={() => onDismiss(item.id)}
                  className={`text-xs font-medium px-3 py-1 rounded-md border transition ${
                    isDismissed ? "bg-[#EAE2CE] text-[#8a7f66] border-[#D5CBB4]" : "text-[#5a5040] border-[#D5CBB4] bg-[#FAF6EC] hover:bg-[#EAE2CE]"
                  }`}
                >
                  {isDismissed ? "Marked as Read ✓" : "Mark as Read"}
                </button>
              </div>
            </div>
          );
        })
      )}
      </div>
    </div>
  );
};
