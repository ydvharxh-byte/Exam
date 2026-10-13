import React, { useState } from "react";
import { Page, Announcement } from "../data/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DashboardViewProps {
  educatorName?: string;
  educatorDesignation?: string;
  educatorRegion?: string;
  onNavigate: (page: Page) => void;
  announcements: Announcement[];
  resourcesCount?: number;
  questionsCount?: number;
  resources?: any[];
  questions?: any[];
  savedResourcesCount?: number;
  completedQuizzesCount?: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  announcements
}) => {
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    {
      titleLine1: "Learn Today,",
      titleLine2: "Lead Tomorrow",
      tagline: "Better Principals • Better Schools • A Stronger India",
      subheading: "KVS PRINCIPAL EXAM"
    },
    {
      titleLine1: "Integrity in Rules,",
      titleLine2: "Excellence in Action",
      tagline: "Master GFR 2017 • CCS Rules • NEP 2020 Guidelines",
      subheading: "ADMINISTRATIVE MASTERY"
    }
  ];

  const currentSlide = heroSlides[heroSlide];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 space-y-10">
      {/* 1. Hero Panoramic Banner matching the user's screenshot */}
      <section className="relative w-full overflow-hidden rounded-2xl bg-[#EAE2C8] shadow-md border border-[#D5CBB4]" style={{ minHeight: "460px" }}>
        {/* Background Image of Educator at desk */}
        <img
          src="/images/hero-teacher.jpg"
          className="absolute inset-0 w-full h-full object-cover object-[25%_25%] opacity-90 mix-blend-multiply"
          alt="Educator at desk"
        />

        {/* Gradient fade to parchment text overlay on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EAE2C8]/70 to-[#EAE2C8] w-full h-full pointer-events-none"></div>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={() => setHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-xs"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-xs"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Hero Content Right Overlay */}
        <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-14 lg:p-16 max-w-2xl ml-auto text-right min-h-[460px]">
          <div className="flex items-center justify-end gap-3 text-[#4a5f36] mb-4">
            <div className="h-[1px] w-12 bg-[#8a7f66]"></div>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#3c4a2e]">
              — {currentSlide.subheading} —
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#1f2918] mb-5 leading-[1.08] font-serif-title font-medium">
            {currentSlide.titleLine1}<br />
            {currentSlide.titleLine2}
          </h2>

          <div className="flex items-center justify-end gap-2 text-sm md:text-base italic text-[#4f4534] font-serif">
            {currentSlide.tagline}
          </div>

          {/* Book Spine Labels Decoration on Bottom Right */}
          <div className="mt-8 flex justify-end">
            <div className="flex flex-col items-end gap-1 font-serif text-[11px] tracking-widest text-[#E8DFC9] uppercase">
              <span className="bg-[#2D3E27] px-4 py-0.5 rounded shadow-xs border border-[#43593B]">EDUCATION</span>
              <span className="bg-[#8A522A] px-4 py-0.5 rounded shadow-xs border border-[#A66637]">LEADERSHIP</span>
              <span className="bg-[#243320] px-4 py-0.5 rounded shadow-xs border border-[#3C5035]">KVS</span>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="mt-6 flex items-center justify-end gap-2">
            {heroSlides.map((_, i) => (
              <span
                key={i}
                onClick={() => setHeroSlide(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                  heroSlide === i ? "bg-[#3c4f2e] scale-125" : "bg-[#8a7f66]/50"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Quick Access Heading with horizontal dividing line */}
      <div className="flex items-center gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#4a5f36" className="shrink-0">
          <path d="M12 22C12 22 12 16 17 11C20.5 7.5 22 4 22 4C22 4 18.5 5.5 15 9C12 12.5 12 18 12 18Z" />
          <path d="M12 22C12 22 12 16 7 11C3.5 7.5 2 4 2 4C2 4 5.5 5.5 9 9C12 12.5 12 18 12 18Z" />
        </svg>
        <h3 className="text-2xl text-[#2f3b26] font-serif-title font-medium whitespace-nowrap">
          Quick Access
        </h3>
        <div className="h-[1px] w-full bg-[#D5CBB4] ml-2"></div>
      </div>

      {/* 3. Main Grid: 4 Quick Access Cards on Left + Announcements Panel on Right */}
      <section className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column (8 cols): 4 Cards */}
        <div className="lg:col-span-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              title: "Study Resources",
              desc: "Access all study materials and important documents.",
              page: "resources" as Page,
              bg: "bg-[#DFE5D5]",
              border: "border-[#C0CCB1]",
              badgeBg: "bg-[#3c4e2e]",
              btnBg: "bg-[#4a5f36] hover:bg-[#344525]",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
              ),
              bottomGraphic: (
                <svg className="w-28 h-20 text-[#2F3D28] opacity-15" viewBox="0 0 100 60" fill="currentColor">
                  <rect x="10" y="38" width="80" height="14" rx="2" />
                  <rect x="15" y="24" width="70" height="12" rx="2" />
                  <rect x="22" y="12" width="56" height="10" rx="2" />
                </svg>
              )
            },
            {
              title: "Practice Quizzes",
              desc: "Topic-wise quizzes to check your preparation.",
              page: "quizzes" as Page,
              bg: "bg-[#F0E6D2]",
              border: "border-[#DBC8A8]",
              badgeBg: "bg-[#9c5a30]",
              btnBg: "bg-[#a25b33] hover:bg-[#864825]",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                  <path d="M9 12h6m-6 4h6m-6-8h2"/>
                </svg>
              ),
              bottomGraphic: (
                <svg className="w-28 h-20 text-[#8C522A] opacity-15" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="20" y="10" width="60" height="40" rx="3" />
                  <line x1="28" y1="20" x2="60" y2="20" />
                  <line x1="28" y1="28" x2="68" y2="28" />
                  <line x1="28" y1="36" x2="52" y2="36" />
                </svg>
              )
            },
            {
              title: "Doubt Discussion",
              desc: "Ask questions and get help from fellow teachers.",
              page: "discussion" as Page,
              bg: "bg-[#DFE5D5]",
              border: "border-[#C0CCB1]",
              badgeBg: "bg-[#3c4e2e]",
              btnBg: "bg-[#4a5f36] hover:bg-[#344525]",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <circle cx="9" cy="10" r="1"/>
                  <circle cx="12" cy="10" r="1"/>
                  <circle cx="15" cy="10" r="1"/>
                </svg>
              ),
              bottomGraphic: (
                <svg className="w-28 h-20 text-[#2F3D28] opacity-15" viewBox="0 0 100 60" fill="currentColor">
                  <circle cx="35" cy="25" r="10"/>
                  <circle cx="65" cy="25" r="10"/>
                  <path d="M20 50c0-8 7-15 15-15s15 7 15 15z" />
                  <path d="M50 50c0-8 7-15 15-15s15 7 15 15z" />
                </svg>
              )
            },
            {
              title: "Announcements",
              desc: "Important updates and notifications.",
              page: "announcements" as Page,
              bg: "bg-[#F0E6D2]",
              border: "border-[#DBC8A8]",
              badgeBg: "bg-[#9c5a30]",
              btnBg: "bg-[#a25b33] hover:bg-[#864825]",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              ),
              bottomGraphic: (
                <svg className="w-28 h-20 text-[#8C522A] opacity-15" viewBox="0 0 100 60" fill="currentColor">
                  <path d="M20 25h12l25-15v40L32 35H20z" />
                  <path d="M65 20a15 15 0 0 1 0 20" stroke="currentColor" strokeWidth="3" fill="none"/>
                </svg>
              )
            }
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl border ${card.border} ${card.bg} p-5 flex flex-col items-center text-center shadow-xs relative overflow-hidden h-full min-h-[340px] transition hover:-translate-y-1`}
            >
              <div className={`h-14 w-14 mb-4 rounded-full ${card.badgeBg} flex items-center justify-center text-[#F2ECD8] shadow-sm z-10`}>
                {card.icon}
              </div>

              <h4 className="text-lg font-bold font-serif-title text-[#25301d] mb-2 z-10">
                {card.title}
              </h4>

              <p className="text-xs leading-relaxed text-[#5a5040] mb-6 flex-1 z-10">
                {card.desc}
              </p>

              <button
                onClick={() => onNavigate(card.page)}
                className={`rounded-full ${card.btnBg} px-6 py-2 text-xs font-semibold text-[#F2ECD8] transition z-10 shadow-xs cursor-pointer`}
              >
                Go to &rarr;
              </button>

              {/* Bottom decorative graphic */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
                {card.bottomGraphic}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (4 cols): Latest Announcement & Quote */}
        <div className="lg:col-span-4 space-y-5 flex flex-col h-full">
          {/* Announcement Card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#2f3b26]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <h4 className="text-lg font-serif-title font-medium">Latest Announcement</h4>
            </div>

            {!announcementDismissed ? (
              <div className="rounded-xl border border-[#D5CBB4] bg-[#F2ECD8] p-5 shadow-xs relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#cc5141] inline-block animate-pulse"></span>
                    <span className="bg-[#cc5141] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                      New
                    </span>
                  </div>
                  <button
                    onClick={() => setAnnouncementDismissed(true)}
                    className="text-[#8b7e66] hover:text-[#2f3b26] text-sm"
                    aria-label="Dismiss notice"
                  >
                    ✕
                  </button>
                </div>

                <h5 className="text-base font-bold font-serif-title text-[#2f3b26] mt-2 leading-tight">
                  Mock Test Schedule Updated
                </h5>

                <p className="mt-2 text-xs text-[#5a5040] leading-relaxed">
                  The topic-wise mock test for Leadership and Educational Management is now available. Please check the Practice Quizzes section.
                </p>

                <div className="mt-4 pt-4 border-t border-[#D5CBB4] flex items-center justify-between text-xs text-[#7e725d]">
                  <span className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    12 Oct 2025
                  </span>
                  <button
                    onClick={() => onNavigate("announcements")}
                    className="text-[#4a5f36] font-semibold hover:underline"
                  >
                    View All &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-[#D5CBB4] bg-[#F2ECD8] p-4 text-xs text-[#6e634f]">
                No new unread bulletins. Click to browse{" "}
                <button onClick={() => onNavigate("announcements")} className="text-[#3c4e2e] underline font-bold">
                  all circulars
                </button>.
              </div>
            )}
          </div>

          {/* Inspirational Education Quote Box */}
          <div className="rounded-xl bg-gradient-to-br from-[#DFE5D5] to-[#EAE2C8] border border-[#C6D1B9] p-6 shadow-xs flex-1 flex flex-col justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#586b47" className="mb-2">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <p className="italic font-serif text-[#374728] text-sm leading-relaxed">
              "The function of education is to teach one to think intensively and to think critically."
            </p>
            <p className="mt-3 text-xs text-[#5a5040] font-serif">
              &mdash; Martin Luther King Jr.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
