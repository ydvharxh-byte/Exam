import React, { useState, useMemo } from "react";
import { DiscussionThread, DiscussionReply } from "../data/types";
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Search, 
  CheckCircle, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

interface DiscussionViewProps {
  threads: DiscussionThread[];
  replies: DiscussionReply[];
  educatorName: string;
  educatorDesignation: string;
  educatorRegion: string;
  onPostThread: (title: string, topic: string, module: string, question: string) => void;
  onPostReply: (threadId: string, text: string) => void;
  onLikeThread: (threadId: string) => void;
}

export const DiscussionView: React.FC<DiscussionViewProps> = ({
  threads,
  replies,
  educatorName,
  educatorDesignation,
  onPostThread,
  onPostReply,
  onLikeThread
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({ "th-1": true, "th-2": true });
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newModule, setNewModule] = useState("Admin & Finance");
  const [newQuestion, setNewQuestion] = useState("");

  const modules = ["All", "Admin & Finance", "Perspectives in Education", "Pedagogy & Evaluation", "School Safety & Law", "General & Languages"];

  const filteredThreads = useMemo(() => {
    return threads.filter((th) => {
      if (th.hidden) return false;
      const matchSearch =
        th.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        th.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        th.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        th.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchModule = selectedModule === "All" || th.module === selectedModule;
      return matchSearch && matchModule;
    });
  }, [threads, searchTerm, selectedModule]);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim() || !newTopic.trim()) return;
    onPostThread(newTitle.trim(), newTopic.trim(), newModule, newQuestion.trim());
    setNewTitle("");
    setNewTopic("");
    setNewQuestion("");
    setShowNewThreadModal(false);
  };

  const toggleExpand = (id: string) => {
    setExpandedThreads((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendReply = (threadId: string) => {
    const text = replyDrafts[threadId];
    if (!text || !text.trim()) return;
    onPostReply(threadId, text.trim());
    setReplyDrafts((prev) => ({ ...prev, [threadId]: "" }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D5CBB4] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFE5D5] text-[#2F3D28] text-xs font-semibold mb-2 border border-[#C0CCB1]">
            <MessageSquare className="w-3.5 h-3.5 text-[#3c4e2e]" />
            <span>Peer Learning & Administrative Exchange</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2918] font-serif-title">
            Educator Doubt Discussion Board
          </h2>
          <p className="text-xs sm:text-sm text-[#5a5040] mt-1">
            Collaborative forum where Principal aspirants, Vice-Principals, and senior PGTs discuss service rules, NEP questions, and school management.
          </p>
        </div>

        <button
          onClick={() => setShowNewThreadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#E6C387]" />
          <span>Ask New Question / Doubt</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#F2ECD8] border border-[#D5CBB4] shadow-xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8a7f66] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search discussions (e.g. HPL, Rule 14, GeM purchase, Balvatika)..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] focus:border-[#4a5f36] text-[#2f3b26] outline-none text-xs sm:text-sm placeholder-[#9c907b]"
          />
        </div>

        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="h-11 px-3 rounded-xl border border-[#C5BAA0] bg-[#FAF6EC] text-[#2f3b26] focus:border-[#4a5f36] outline-none text-xs sm:text-sm font-medium"
        >
          {modules.map((m) => (
            <option key={m} value={m}>Module: {m}</option>
          ))}
        </select>
      </div>

      {/* New Question Modal */}
      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl bg-[#FBF7ED] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 border border-[#D5CBB4]">
            <div className="flex items-center justify-between border-b border-[#E2D8C0] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#1f2918] font-serif-title">Post a Discussion Doubt</h3>
                <p className="text-xs text-[#5a5040]">Posting as {educatorName} ({educatorDesignation})</p>
              </div>
              <button
                onClick={() => setShowNewThreadModal(false)}
                className="text-[#8a7f66] hover:text-[#2f3b26] text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2f3b26] mb-1">Doubt Title / Subject</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Clarification on Child Care Leave (CCL) during probation"
                  className="w-full h-10 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] focus:border-[#4a5f36] text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2f3b26] mb-1">Topic Tag</label>
                  <input
                    type="text"
                    required
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="e.g. CCS Leave Rules"
                    className="w-full h-10 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] focus:border-[#4a5f36] text-xs sm:text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2f3b26] mb-1">Syllabus Module</label>
                  <select
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] focus:border-[#4a5f36] text-xs sm:text-sm outline-none"
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
                <label className="block text-xs font-bold text-[#2f3b26] mb-1">Detailed Query</label>
                <textarea
                  required
                  rows={4}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Elaborate on the specific rule or administrative situation..."
                  className="w-full p-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] focus:border-[#4a5f36] text-xs sm:text-sm outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewThreadModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#C5BAA0] text-xs font-semibold text-[#5a5040] hover:bg-[#EAE2CE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-bold shadow-xs cursor-pointer"
                >
                  Publish Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Threads List */}
      <div className="space-y-5">
        {filteredThreads.map((thread) => {
          const threadReplies = replies.filter((r) => r.threadId === thread.id && !r.hidden);
          const isExpanded = expandedThreads[thread.id] ?? false;

          return (
            <div
              key={thread.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#FBF7ED] border border-[#D5CBB4] shadow-xs hover:-translate-y-0.5 transition space-y-4"
            >
              {/* Thread Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D8C0] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0E6D2] text-[#8C522A] px-2.5 py-0.5 rounded border border-[#DBC8A8]">
                    {thread.topic}
                  </span>
                  <span className="text-xs text-[#8a7f66]">•</span>
                  <span className="text-xs text-[#6e634f]">{thread.module}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#7e725d]">
                  <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                  {thread.isResolved && (
                    <span className="flex items-center gap-1 text-[#2F3D28] bg-[#DFE5D5] px-2 py-0.5 rounded text-[11px] font-bold border border-[#C0CCB1]">
                      <CheckCircle className="w-3.5 h-3.5" /> Answered
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Question */}
              <div>
                <h3 className="text-base sm:text-lg font-bold font-serif-title text-[#1f2918] leading-snug">
                  {thread.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4b402e] mt-2 leading-relaxed whitespace-pre-line">
                  {thread.question}
                </p>
              </div>

              {/* Author & Stats Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#6e634f]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EAE2CE] text-[#34452C] font-bold flex items-center justify-center text-[10px] border border-[#C5BAA0]">
                    {thread.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-[#2f3b26]">{thread.name}</span>
                  {thread.role && <span className="text-[#7e725d] text-[11px]">({thread.role}{thread.school ? `, ${thread.school}` : ""})</span>}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onLikeThread(thread.id)}
                    className="flex items-center gap-1.5 text-[#5a5040] hover:text-[#2f3b26] transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{thread.likes || 0} Upvotes</span>
                  </button>

                  <button
                    onClick={() => toggleExpand(thread.id)}
                    className="flex items-center gap-1.5 font-semibold text-[#4a5f36] hover:underline"
                  >
                    <span>{threadReplies.length} Replies</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Replies Section */}
              {isExpanded && (
                <div className="pt-4 border-t border-[#E2D8C0] space-y-4 bg-[#F2ECD8]/70 p-4 rounded-xl">
                  {threadReplies.length > 0 ? (
                    <div className="space-y-3">
                      {threadReplies.map((reply) => (
                        <div key={reply.id} className="p-3.5 rounded-lg bg-[#FAF6EC] border border-[#D5CBB4] text-xs space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-[#7e725d] border-b border-[#E2D8C0] pb-1.5">
                            <span className="font-bold text-[#2f3b26] flex items-center gap-1.5">
                              <span>{reply.name}</span>
                              {reply.role && <span className="text-[#6e634f] font-normal">({reply.role})</span>}
                            </span>
                            <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-[#4b402e] leading-relaxed text-xs">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#7e725d] italic">No replies yet. Be the first to share your insights!</p>
                  )}

                  {/* Add Reply Input Form */}
                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      value={replyDrafts[thread.id] || ""}
                      onChange={(e) => setReplyDrafts({ ...replyDrafts, [thread.id]: e.target.value })}
                      placeholder="Write an administrative insight or reference rule..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendReply(thread.id);
                      }}
                      className="flex-1 h-10 px-3 rounded-lg border border-[#C5BAA0] bg-[#FAF6EC] focus:border-[#4a5f36] text-xs outline-none text-[#2f3b26]"
                    />
                    <button
                      onClick={() => handleSendReply(thread.id)}
                      className="px-4 h-10 rounded-lg bg-[#34452C] hover:bg-[#253320] text-[#F4F0E6] text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer"
                    >
                      <span>Reply</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
