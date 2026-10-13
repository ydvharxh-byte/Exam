import React, { useState } from "react";
import { EXAM_SCHEME, syllabusSections, RECOMMENDED_BOOKS } from "../data/syllabus";
import { 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Award, 
  Scale, 
  HelpCircle,
  Printer
} from "lucide-react";

export const SyllabusView: React.FC = () => {
  const [expandedPart, setExpandedPart] = useState<string>("Part I");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D5CBB4] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFE5D5] text-[#2F3D28] text-xs font-semibold mb-2 border border-[#C0CCB1]">
            <Award className="w-3.5 h-3.5 text-[#3c4e2e]" />
            <span>Official Examination Scheme • Kendriya Vidyalaya Sangathan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2918] font-serif-title">
            Principal Examination Pattern & Detailed Syllabus
          </h2>
          <p className="text-xs sm:text-sm text-[#5a5040] mt-1">
            Prescribed blueprint for Direct Recruitment and Limited Departmental Competitive Examination (LDCE).
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] hover:bg-[#EAE2CE] text-[#34452C] text-xs font-semibold shadow-2xs transition cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#8a7f66]" />
          <span>Print / Save Blueprint</span>
        </button>
      </div>

      {/* Scheme Snapshot Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Questions", val: "150 Questions", sub: "1 Mark per Question", icon: <HelpCircle className="w-5 h-5 text-[#3c4e2e]" />, bg: "bg-[#DFE5D5]", border: "border-[#C0CCB1]" },
          { label: "Test Duration", val: "150 Minutes", sub: "2 Hours 30 Minutes", icon: <FileText className="w-5 h-5 text-[#8C522A]" />, bg: "bg-[#F0E6D2]", border: "border-[#DBC8A8]" },
          { label: "Evaluation Mode", val: "CBT Format", sub: "No Negative Marking", icon: <CheckCircle2 className="w-5 h-5 text-[#3c4e2e]" />, bg: "bg-[#DFE5D5]", border: "border-[#C0CCB1]" },
          { label: "Merit Weightage", val: "85 : 15 Ratio", sub: "Written (85%) : Interview (15%)", icon: <Scale className="w-5 h-5 text-[#8C522A]" />, bg: "bg-[#F0E6D2]", border: "border-[#DBC8A8]" },
        ].map((item) => (
          <div key={item.label} className={`p-4 rounded-2xl ${item.bg} border ${item.border} shadow-xs`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#5a5040] font-semibold">{item.label}</span>
              {item.icon}
            </div>
            <p className="text-xl font-bold text-[#1f2918] font-serif-title">{item.val}</p>
            <p className="text-[11px] text-[#6e634f] mt-0.5">{item.sub}</p>
          </div>
        ))}
      </section>

      {/* Marks Allocation Bar Chart Representation */}
      <section className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#3c4e2e]" />
          <span>Mark Distribution Across Syllabus Parts</span>
        </h3>

        <div className="grid gap-3 pt-2">
          {syllabusSections.map((sec) => {
            const pct = Math.round((sec.marks / EXAM_SCHEME.totalMarks) * 100);
            return (
              <div key={sec.part} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#2f3b26]">
                    <span className="text-[#8C522A] font-bold mr-2">{sec.part}:</span>
                    {sec.title}
                  </span>
                  <span className="font-bold text-[#34452C]">{sec.marks} Marks ({pct}%)</span>
                </div>
                <div className="w-full bg-[#EAE2CE] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#3c4e2e] to-[#607a4a] h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed Breakdown of Each Part */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-[#1f2918] font-serif-title">
          Detailed Subtopics & Recommended Reference Texts
        </h3>

        <div className="space-y-3">
          {syllabusSections.map((sec) => {
            const isOpen = expandedPart === sec.part;
            return (
              <div
                key={sec.part}
                className="rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setExpandedPart(isOpen ? "" : sec.part)}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between transition ${
                    isOpen ? "bg-[#F2ECD8] border-b border-[#D5CBB4]" : "hover:bg-[#F2ECD8]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#3c4e2e] text-[#F2ECD8]">
                      {sec.part}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#1f2918] font-serif-title">{sec.title}</h4>
                      <p className="text-xs text-[#5a5040]">{sec.marks} Marks • {sec.subtopics.length} Key Sub-domains</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#3c4e2e] hidden sm:inline">
                      {isOpen ? "Collapse" : "Explore Subtopics"}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#7e725d]" /> : <ChevronDown className="w-5 h-5 text-[#7e725d]" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-6 space-y-4 bg-[#FAF6EC]/60">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {sec.subtopics.map((sub, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-2xs space-y-2">
                          <h5 className="text-xs font-bold text-[#1f2918] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#3c4e2e]"></span>
                            {sub.name}
                          </h5>
                          <p className="text-xs text-[#5a5040] leading-relaxed">{sub.description}</p>
                          <div className="pt-2 border-t border-[#EAE2CE] flex items-center gap-1.5 text-[11px] text-[#8C522A] font-medium">
                            <BookOpen className="w-3.5 h-3.5 text-[#8C522A] shrink-0" />
                            <span>Ref: {sub.reference}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Books & Reference Literature */}
      <section className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#8C522A]" />
          <span>Recommended Reference Handbooks for KVS Principal Aspirants</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {RECOMMENDED_BOOKS.map((book) => (
            <div key={book.title} className="p-4 rounded-xl border border-[#D5CBB4] bg-[#F2ECD8]/60 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0E6D2] text-[#8C522A] px-2 py-0.5 rounded border border-[#DBC8A8]">
                {book.badge}
              </span>
              <h4 className="text-xs font-bold text-[#1f2918] font-serif-title">{book.title}</h4>
              <p className="text-[11px] text-[#6e634f]">Author/Publisher: {book.author}</p>
              <p className="text-[11px] text-[#5a5040] leading-relaxed border-t border-[#E2D8C0] pt-2">{book.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interview & Selection Guidance */}
      <section className="p-6 rounded-2xl bg-[#2D3E27] text-[#F2ECD8] space-y-3 border border-[#445B3A]">
        <div className="flex items-center gap-2 text-[#E6C387]">
          <Award className="w-5 h-5" />
          <h3 className="text-base font-bold font-serif-title">Stage II: Interview Assessment Criteria (60 Marks)</h3>
        </div>
        <p className="text-xs sm:text-sm text-[#D7D0C0] leading-relaxed">
          The interview assesses vision for institutional governance, dispute resolution, handling disciplinary proceedings (CCS CCA), pupil safety compliance (POCSO & Disaster Management), and articulation of NEP 2020 initiatives. Weightage: Written CBT (85%) and Interview (15%).
        </p>
      </section>
    </div>
  );
};
