import React, { useState } from "react";
import { AdminUser, Question, Announcement, ResourceItem, ActivityLog } from "../data/types";
import { 
  ShieldCheck, 
  PlusCircle, 
  BookOpen, 
  HelpCircle, 
  Bell, 
  Clock, 
  RefreshCw,
  LogOut
} from "lucide-react";

interface AdminViewProps {
  admins: AdminUser[];
  activeAdmin: AdminUser | null;
  onLogin: (email: string, pass: string) => boolean;
  onLogout: () => void;
  questions: Question[];
  onToggleQuestionPublish: (id: string) => void;
  onAddQuestion: (q: Omit<Question, "id">) => void;
  announcements: Announcement[];
  onToggleAnnouncement: (id: string) => void;
  onAddAnnouncement: (a: Omit<Announcement, "id">) => void;
  resources: ResourceItem[];
  onSyncResources: () => void;
  logs: ActivityLog[];
}

export const AdminView: React.FC<AdminViewProps> = ({
  admins: _admins,
  activeAdmin,
  onLogin,
  onLogout,
  questions,
  onToggleQuestionPublish,
  onAddQuestion,
  announcements,
  onToggleAnnouncement: _onToggleAnnouncement,
  onAddAnnouncement,
  resources,
  onSyncResources,
  logs
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [newTopic, setNewTopic] = useState("");
  const [newModule, setNewModule] = useState("Admin & Finance");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [newExplanation, setNewExplanation] = useState("");
  const [newSourceRef, setNewSourceRef] = useState("");

  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnMessage, setNewAnnMessage] = useState("");
  const [newAnnPriority, setNewAnnPriority] = useState<Announcement["priority"]>("Normal");
  const [newAnnCategory, setNewAnnCategory] = useState<Announcement["category"]>("Circular");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = onLogin(emailInput.trim(), passwordInput);
    if (!success) {
      setLoginError("Invalid administrator credentials. Try demo: admin@upsc.local / upscadmin");
    } else {
      setEmailInput("");
      setPasswordInput("");
    }
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newQuestionText.trim() || options.some(opt => !opt.trim())) return;
    onAddQuestion({
      topic: newTopic.trim(),
      module: newModule,
      question: newQuestionText.trim(),
      options: [...options],
      correctIndex,
      explanation: newExplanation.trim() || "Verified official reference question.",
      sourceRef: newSourceRef.trim() || "Administrative Code / GFR 2017",
      published: true
    });
    setNewTopic("");
    setNewQuestionText("");
    setOptions(["", "", "", ""]);
    setNewExplanation("");
    setNewSourceRef("");
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnMessage.trim()) return;
    onAddAnnouncement({
      title: newAnnTitle.trim(),
      message: newAnnMessage.trim(),
      priority: newAnnPriority,
      category: newAnnCategory,
      publicationDate: new Date().toISOString(),
      active: true
    });
    setNewAnnTitle("");
    setNewAnnMessage("");
  };

  if (!activeAdmin) {
    return (
      <div className="max-w-md mx-auto my-12 px-4">
        <div className="p-8 rounded-3xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#3c4e2e] text-[#F2ECD8] mx-auto flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#1f2918] font-serif-title">Administrator Portal</h2>
            <p className="text-xs text-[#5a5040]">Sign in to manage question bank, study links, and announcements.</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-[#fbe8e6] text-[#a82e22] text-xs border border-[#e8a39c] font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2f3b26] mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@upsc.local"
                className="w-full h-11 px-3.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs sm:text-sm outline-none focus:border-[#4a5f36] text-[#2f3b26]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2f3b26] mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs sm:text-sm outline-none focus:border-[#4a5f36] text-[#2f3b26]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Authenticate & Enter Desk
            </button>
          </form>

          <div className="pt-3 border-t border-[#E2D8C0] text-center">
            <p className="text-[11px] text-[#7e725d]">
              Demo: <span className="font-mono text-[#2f3b26] font-semibold">admin@upsc.local</span> / <span className="font-mono text-[#2f3b26] font-semibold">upscadmin</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D5CBB4] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#DFE5D5] text-[#2F3D28] px-2.5 py-0.5 rounded border border-[#C0CCB1]">
              Super Admin Control
            </span>
            <span className="text-xs text-[#6e634f]">Logged in as {activeAdmin.email}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2918] font-serif-title mt-1">
            UPSC Portal Administrative Workspace
          </h2>
        </div>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-[#34452C] text-xs font-semibold hover:bg-[#EAE2CE] transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Desk</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Study Resources", val: resources.length, icon: <BookOpen className="w-5 h-5 text-[#3c4e2e]" />, bg: "bg-[#DFE5D5]", border: "border-[#C0CCB1]" },
          { label: "Questions in Bank", val: questions.length, icon: <HelpCircle className="w-5 h-5 text-[#8C522A]" />, bg: "bg-[#F0E6D2]", border: "border-[#DBC8A8]" },
          { label: "Active Circulars", val: announcements.filter(a => a.active).length, icon: <Bell className="w-5 h-5 text-[#3c4e2e]" />, bg: "bg-[#DFE5D5]", border: "border-[#C0CCB1]" },
          { label: "Audit Actions", val: logs.length, icon: <Clock className="w-5 h-5 text-[#8C522A]" />, bg: "bg-[#F0E6D2]", border: "border-[#DBC8A8]" },
        ].map((s) => (
          <div key={s.label} className={`p-4 rounded-2xl ${s.bg} border ${s.border} shadow-xs`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#5a5040] font-semibold">{s.label}</span>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-[#1f2918] font-serif-title">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Management Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add Question Card */}
        <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#3c4e2e]" />
            <span>Add New Question to Practice Bank</span>
          </h3>

          <form onSubmit={handleCreateQuestion} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Topic</label>
                <input
                  type="text"
                  required
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="e.g. GFR 2017 Procurement"
                  className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Module</label>
                <select
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                >
                  <option value="Admin & Finance">Admin & Finance</option>
                  <option value="Perspectives in Education">Perspectives in Education</option>
                  <option value="Pedagogy & Evaluation">Pedagogy & Evaluation</option>
                  <option value="School Safety & Law">School Safety & Law</option>
                  <option value="General & Languages">General & Languages</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Question Text</label>
              <textarea
                required
                rows={2}
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Enter complete question statement..."
                className="w-full p-2.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#2f3b26]">4 Multiple Choice Options</label>
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#EAE2CE] font-bold text-xs flex items-center justify-center shrink-0 border border-[#C5BAA0]">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <input
                    type="text"
                    required
                    value={opt}
                    onChange={(e) => {
                      const next = [...options];
                      next[i] = e.target.value;
                      setOptions(next);
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    className="flex-1 h-9 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                  />
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctIndex === i}
                    onChange={() => setCorrectIndex(i)}
                    className="w-4 h-4 text-[#3c4e2e]"
                    title="Mark as correct answer"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Statutory Rule Ref</label>
                <input
                  type="text"
                  value={newSourceRef}
                  onChange={(e) => setNewSourceRef(e.target.value)}
                  placeholder="e.g. Rule 149 GFR 2017"
                  className="w-full h-9 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Explanation</label>
                <input
                  type="text"
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Why this answer is legally correct..."
                  className="w-full h-9 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-10 rounded-xl bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Save & Publish Question
            </button>
          </form>
        </div>

        {/* Add Announcement Card */}
        <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#8C522A]" />
            <span>Publish Examination Circular / Notice</span>
          </h3>

          <form onSubmit={handleCreateAnnouncement} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Notice Title</label>
              <input
                type="text"
                required
                value={newAnnTitle}
                onChange={(e) => setNewAnnTitle(e.target.value)}
                placeholder="e.g. Administrative Exam CBT Date Schedule Released"
                className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Priority</label>
                <select
                  value={newAnnPriority}
                  onChange={(e) => setNewAnnPriority(e.target.value as Announcement["priority"])}
                  className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Category</label>
                <select
                  value={newAnnCategory}
                  onChange={(e) => setNewAnnCategory(e.target.value as Announcement["category"])}
                  className="w-full h-10 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
                >
                  <option value="Exam Alert">Exam Alert</option>
                  <option value="Circular">Circular</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Resource">Resource</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2f3b26] mb-1">Message Body</label>
              <textarea
                required
                rows={3}
                value={newAnnMessage}
                onChange={(e) => setNewAnnMessage(e.target.value)}
                placeholder="Detailed contents of the notification..."
                className="w-full p-2.5 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-xs outline-none focus:border-[#4a5f36]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full h-10 rounded-xl bg-[#8C522A] hover:bg-[#724120] text-[#F4F0E6] text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Publish Circular
            </button>
          </form>

          {/* Quick Sync Button */}
          <div className="pt-4 border-t border-[#E2D8C0] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#2f3b26]">Study Repository Sync</p>
              <p className="text-[11px] text-[#7e725d]">Sync indexed Drive files and cache metadata</p>
            </div>
            <button
              onClick={onSyncResources}
              className="px-3.5 py-2 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] hover:bg-[#EAE2CE] text-xs font-semibold text-[#34452C] flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Run Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Question Bank Table */}
      <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1f2918] font-serif-title">
          Manage Question Bank ({questions.length} Items)
        </h3>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {questions.map((q) => (
            <div key={q.id} className="p-3.5 rounded-xl border border-[#D5CBB4] bg-[#FAF6EC] flex items-center justify-between gap-4 text-xs">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-[#2f3b26]">{q.topic}</span>
                  <span className="text-[#8a7f66]">•</span>
                  <span className="text-[#6e634f]">{q.sourceRef}</span>
                </div>
                <p className="text-[#4b402e] line-clamp-1">{q.question}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleQuestionPublish(q.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    q.published ? "bg-[#DFE5D5] text-[#2F3D28] border border-[#C0CCB1]" : "bg-[#EAE2CE] text-[#7e725d]"
                  }`}
                >
                  {q.published ? "Published" : "Draft"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Logs */}
      <div className="p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#1f2918] font-serif-title flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#8C522A]" />
          <span>Audit Log Timeline</span>
        </h3>

        <div className="space-y-2 max-h-48 overflow-y-auto text-xs text-[#5a5040]">
          {logs.map((log) => (
            <div key={log.id} className="p-2.5 rounded-xl bg-[#FAF6EC] border border-[#E2D8C0] flex items-center justify-between">
              <span>{log.message}</span>
              <span className="text-[11px] text-[#8a7f66]">{new Date(log.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <p className="text-[#8a7f66] italic">No admin actions recorded in this session.</p>
          )}
        </div>
      </div>
    </div>
  );
};
