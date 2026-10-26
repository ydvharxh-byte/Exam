import { useState, useEffect } from "react";
import { Page, ResourceItem, Question, DiscussionThread, DiscussionReply, Announcement, AdminUser, ActivityLog, MockTestItem } from "./data/types";
import { starterResources } from "./data/resources";
import { starterQuestions } from "./data/questions";
import { starterThreads, starterReplies } from "./data/discussions";
import { starterAnnouncements } from "./data/announcements";
import { starterMockTests } from "./data/mockTests";

import { Navbar } from "./components/Navbar";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { DashboardView } from "./components/DashboardView";
import { SyllabusView } from "./components/SyllabusView";
import { ResourcesView } from "./components/ResourcesView";
import { QuizView } from "./components/QuizView";
import { MockTestsView } from "./components/MockTestsView";
import { DiscussionView } from "./components/DiscussionView";
import { AnnouncementsView } from "./components/AnnouncementsView";
import { AdminView } from "./components/AdminView";
import { Footer } from "./components/Footer";
import { PracticeMoreDrawer } from "./components/PracticeMoreDrawer";

const STORE_KEYS = {
  participantId: "exam_participant_id_v3",
  participantName: "exam_participant_name_v3",
  participantDesignation: "exam_participant_designation_v3",
  participantRegion: "exam_participant_region_v3",
  resources: "exam_resources_v3",
  questions: "exam_questions_v3",
  threads: "exam_threads_v3",
  replies: "exam_replies_v3",
  announcements: "exam_announcements_v3",
  dismissals: "exam_dismissals_v3",
  savedResources: "exam_saved_resources_v3",
  completedQuizzes: "exam_completed_quizzes_v3",
  admins: "exam_admins_v3",
  logs: "exam_logs_v3",
  mockTests: "exam_mock_tests_v3",
};

const defaultAdmins: AdminUser[] = [
  {
    id: "admin-1",
    name: "Examination Administrator",
    email: "admin@examportal.local",
    role: "super_admin",
    password: "adminpassword"
  },
  {
    id: "admin-2",
    name: "Administrative Desk",
    email: "desk@examportal.local",
    role: "super_admin",
    password: "deskpassword"
  }
];

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Failed to save to localStorage", err);
  }
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [isPracticeMoreOpen, setIsPracticeMoreOpen] = useState(false);
  const [activeQuizTopic, setActiveQuizTopic] = useState<"chapter5" | "csmop" | "all">("chapter5");

  // Participant Profile State (Defaults to Harsh as in the design)
  const [participantId, setParticipantId] = useState<string>(
    () => localStorage.getItem(STORE_KEYS.participantId) || "participant-harsh"
  );
  const [educatorName, setEducatorName] = useState<string>(
    () => localStorage.getItem(STORE_KEYS.participantName) || "Harsh"
  );
  const [educatorDesignation, setEducatorDesignation] = useState<string>(
    () => localStorage.getItem(STORE_KEYS.participantDesignation) || "Administrative Officer (Aspirant)"
  );
  const [educatorRegion, setEducatorRegion] = useState<string>(
    () => localStorage.getItem(STORE_KEYS.participantRegion) || "National Cadre"
  );

  // Core Data State
  const [resources] = useState<ResourceItem[]>(
    () => readJSON(STORE_KEYS.resources, starterResources)
  );
  const [questions, setQuestions] = useState<Question[]>(() => {
    const stored = readJSON<Question[]>(STORE_KEYS.questions, starterQuestions);
    const hasMock = stored.some((q) => q.id.startsWith("upsc-mock-1"));
    if (!hasMock) {
      return starterQuestions;
    }
    return stored;
  });
  const [threads, setThreads] = useState<DiscussionThread[]>(
    () => readJSON(STORE_KEYS.threads, starterThreads)
  );
  const [replies, setReplies] = useState<DiscussionReply[]>(
    () => readJSON(STORE_KEYS.replies, starterReplies)
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>(
    () => readJSON(STORE_KEYS.announcements, starterAnnouncements)
  );
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(
    () => readJSON(STORE_KEYS.savedResources, ["sr-1", "sr-6", "qf-9"])
  );
  const [completedQuizzes, setCompletedQuizzes] = useState<{ topic: string; score: number; total: number; date: string }[]>(
    () => readJSON(STORE_KEYS.completedQuizzes, [])
  );
  const [dismissedIds, setDismissedIds] = useState<string[]>(
    () => readJSON(STORE_KEYS.dismissals, [])
  );

  // Mock Tests State
  const [mockTests, setMockTests] = useState<MockTestItem[]>(
    () => readJSON(STORE_KEYS.mockTests, starterMockTests)
  );
  const [activeMockTestId, setActiveMockTestId] = useState<string | null>(null);

  // Admin State
  const [admins] = useState<AdminUser[]>(
    () => readJSON(STORE_KEYS.admins, defaultAdmins)
  );
  const [activeAdmin, setActiveAdmin] = useState<AdminUser | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>(
    () => readJSON(STORE_KEYS.logs, [])
  );

  // Synchronize with other tabs via BroadcastChannel
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel("upsc-live-updates");
      channel.onmessage = (event) => {
        if (event.data === "threads") {
          setThreads(readJSON(STORE_KEYS.threads, starterThreads));
        } else if (event.data === "replies") {
          setReplies(readJSON(STORE_KEYS.replies, starterReplies));
        } else if (event.data === "announcements") {
          setAnnouncements(readJSON(STORE_KEYS.announcements, starterAnnouncements));
        } else if (event.data === "questions") {
          setQuestions(readJSON(STORE_KEYS.questions, starterQuestions));
        } else if (event.data === "mockTests") {
          setMockTests(readJSON(STORE_KEYS.mockTests, starterMockTests));
        }
      };
    } catch {
      // BroadcastChannel fallback if unsupported
    }

    return () => {
      channel?.close();
    };
  }, []);

  // Save states to localStorage whenever changed
  useEffect(() => { saveJSON(STORE_KEYS.resources, resources); }, [resources]);
  useEffect(() => { saveJSON(STORE_KEYS.questions, questions); }, [questions]);
  useEffect(() => { 
    saveJSON(STORE_KEYS.threads, threads); 
    try { new BroadcastChannel("upsc-live-updates").postMessage("threads"); } catch {}
  }, [threads]);
  useEffect(() => { 
    saveJSON(STORE_KEYS.replies, replies); 
    try { new BroadcastChannel("upsc-live-updates").postMessage("replies"); } catch {}
  }, [replies]);
  useEffect(() => { 
    saveJSON(STORE_KEYS.announcements, announcements); 
    try { new BroadcastChannel("upsc-live-updates").postMessage("announcements"); } catch {}
  }, [announcements]);
  useEffect(() => { saveJSON(STORE_KEYS.savedResources, savedResourceIds); }, [savedResourceIds]);
  useEffect(() => { saveJSON(STORE_KEYS.completedQuizzes, completedQuizzes); }, [completedQuizzes]);
  useEffect(() => { saveJSON(STORE_KEYS.dismissals, dismissedIds); }, [dismissedIds]);
  useEffect(() => { saveJSON(STORE_KEYS.admins, admins); }, [admins]);
  useEffect(() => { saveJSON(STORE_KEYS.logs, logs); }, [logs]);
  useEffect(() => { 
    saveJSON(STORE_KEYS.mockTests, mockTests); 
    try { new BroadcastChannel("upsc-live-updates").postMessage("mockTests"); } catch {}
  }, [mockTests]);

  const pushLog = (message: string) => {
    const entry: ActivityLog = {
      id: uid("log"),
      message,
      timestamp: new Date().toISOString(),
      adminEmail: activeAdmin?.email
    };
    setLogs((prev) => [entry, ...prev].slice(0, 50));
  };

  // Participant Login / Onboarding
  const handleEnterStudyRoom = (name: string, designation: string, region: string) => {
    const newId = uid("participant");
    setParticipantId(newId);
    setEducatorName(name);
    setEducatorDesignation(designation);
    setEducatorRegion(region);

    localStorage.setItem(STORE_KEYS.participantId, newId);
    localStorage.setItem(STORE_KEYS.participantName, name);
    localStorage.setItem(STORE_KEYS.participantDesignation, designation);
    localStorage.setItem(STORE_KEYS.participantRegion, region);

    setCurrentPage("dashboard");
    pushLog(`Educator enrolled: ${name} (${designation}, ${region})`);
  };

  // Sign out / Change profile
  const handleSignOut = () => {
    localStorage.removeItem(STORE_KEYS.participantId);
    localStorage.removeItem(STORE_KEYS.participantName);
    setParticipantId("");
    setEducatorName("");
    setCurrentPage("dashboard");
  };

  // Toggle Save Resource
  const handleToggleSaveResource = (id: string) => {
    setSavedResourceIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Quiz completion
  const handleQuizComplete = (topic: string, score: number, total: number) => {
    const record = { topic, score, total, date: new Date().toISOString() };
    setCompletedQuizzes((prev) => [record, ...prev]);
    pushLog(`Quiz completed on "${topic}": ${score}/${total}`);
  };

  // Post Discussion Thread
  const handlePostThread = (title: string, topic: string, module: string, question: string) => {
    const newThread: DiscussionThread = {
      id: uid("th"),
      name: educatorName || "Educator Aspirant",
      role: educatorDesignation,
      school: educatorRegion,
      title,
      topic,
      module,
      question,
      createdAt: new Date().toISOString(),
      likes: 1,
      views: 1,
      isResolved: false
    };
    setThreads((prev) => [newThread, ...prev]);
    pushLog(`New doubt posted: ${title}`);
  };

  // Post Reply
  const handlePostReply = (threadId: string, text: string) => {
    const newReply: DiscussionReply = {
      id: uid("rep"),
      threadId,
      name: educatorName || "Educator Aspirant",
      role: educatorDesignation,
      text,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    setReplies((prev) => [...prev, newReply]);
    pushLog(`Reply added to thread ${threadId}`);
  };

  // Like Thread
  const handleLikeThread = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, likes: (t.likes || 0) + 1 } : t))
    );
  };

  // Dismiss Announcement
  const handleDismissAnnouncement = (id: string) => {
    setDismissedIds((prev) => [...new Set([...prev, id])]);
  };

  // Admin actions
  const handleAdminLogin = (email: string, pass: string): boolean => {
    const found = admins.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === pass);
    if (found) {
      setActiveAdmin(found);
      pushLog(`Admin session started: ${found.email}`);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    pushLog(`Admin signed out: ${activeAdmin?.email}`);
    setActiveAdmin(null);
  };

  const handleToggleQuestionPublish = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, published: !q.published } : q))
    );
    pushLog(`Toggled question publish status for ID ${id}`);
  };

  const handleAddQuestion = (qData: Omit<Question, "id">) => {
    const newQ: Question = {
      id: uid("q"),
      ...qData
    };
    setQuestions((prev) => [newQ, ...prev]);
    pushLog(`New question created in bank: ${newQ.topic}`);
  };

  // Mock Test actions
  const handleAddMockTest = (testData: Omit<MockTestItem, "id">, autoAnnounce = true) => {
    const newTestId = uid("mock");
    const newTest: MockTestItem = {
      id: newTestId,
      ...testData
    };
    setMockTests((prev) => [newTest, ...prev]);
    pushLog(`Admin published Mock Test: ${newTest.title} (${newTest.totalQuestions} Questions)`);

    // Automatically announce across website if requested
    if (autoAnnounce) {
      const newAnn: Announcement = {
        id: uid("ann"),
        title: `🎯 New Mock Test Released: ${newTest.title}`,
        message: `The official ${newTest.type === "mock_test" ? "Mock CBT Exam" : "Sample Paper"} "${newTest.title}" (${newTest.totalQuestions} Questions, ${newTest.durationMinutes} Mins, ${newTest.totalMarks} Marks) with verified interactive answer key is now active. Practice in CBT mode now!`,
        publicationDate: new Date().toISOString(),
        priority: "High",
        category: "Exam Alert",
        linkText: "Attempt Mock Test Now",
        linkUrl: "mocktests",
        active: true
      };
      setAnnouncements((prev) => [newAnn, ...prev]);
      pushLog(`Auto-announced new mock test: ${newTest.title}`);
    }
  };

  const handleToggleMockTestPublish = (id: string) => {
    setMockTests((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published: !t.published } : t))
    );
    pushLog(`Toggled publish status for Mock Test ID ${id}`);
  };

  const handleDeleteMockTest = (id: string) => {
    setMockTests((prev) => prev.filter((t) => t.id !== id));
    pushLog(`Deleted Mock Test ID ${id}`);
  };

  const handleToggleAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
    pushLog(`Announcement status changed for ID ${id}`);
  };

  const handleAddAnnouncement = (aData: Omit<Announcement, "id">) => {
    const newA: Announcement = {
      id: uid("ann"),
      ...aData
    };
    setAnnouncements((prev) => [newA, ...prev]);
    pushLog(`New circular released: ${newA.title}`);
  };

  const handleSyncResources = () => {
    pushLog(`Drive metadata sync executed (${resources.length} files indexed)`);
    alert(`Successfully synced ${resources.length} study resource records.`);
  };

  // If user hasn't completed entry, show Welcome Screen
  if (!participantId) {
    return <WelcomeScreen onEnter={handleEnterStudyRoom} />;
  }

  const unreadAnnouncementsCount = announcements.filter(
    (a) => a.active && !dismissedIds.includes(a.id)
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B] font-sans">
      {/* Top Professional Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        educatorName={educatorName}
        educatorDesignation={educatorDesignation}
        educatorRegion={educatorRegion}
        unreadAnnouncementsCount={unreadAnnouncementsCount}
        onSignOut={handleSignOut}
        savedResourcesCount={savedResourceIds.length}
        onOpenPracticeMore={() => setIsPracticeMoreOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === "dashboard" && (
          <DashboardView
            educatorName={educatorName}
            educatorDesignation={educatorDesignation}
            educatorRegion={educatorRegion}
            onNavigate={setCurrentPage}
            announcements={announcements}
            resources={resources}
            questions={questions}
            mockTests={mockTests}
            onSelectMockTest={(id) => {
              setActiveMockTestId(id);
              setCurrentPage("mocktests");
            }}
            savedResourcesCount={savedResourceIds.length}
            completedQuizzesCount={completedQuizzes.length}
            onOpenPracticeMore={() => setIsPracticeMoreOpen(true)}
            onStartMockTest={(topic = "chapter5") => {
              setActiveQuizTopic(topic as "chapter5" | "csmop" | "all");
              setCurrentPage("quizzes");
            }}
          />
        )}

        {currentPage === "syllabus" && (
          <SyllabusView />
        )}

        {currentPage === "resources" && (
          <ResourcesView
            resources={resources}
            savedResourceIds={savedResourceIds}
            onToggleSave={handleToggleSaveResource}
          />
        )}

        {currentPage === "quizzes" && (
          <QuizView
            questions={questions}
            onQuizComplete={handleQuizComplete}
            onNavigate={setCurrentPage}
            onOpenPracticeMore={() => setIsPracticeMoreOpen(true)}
          />
        )}

        {currentPage === "mocktests" && (
          <MockTestsView
            mockTests={mockTests}
            onNavigate={setCurrentPage}
            initialTestId={activeMockTestId}
            onClearInitialTest={() => setActiveMockTestId(null)}
          />
        )}

        {currentPage === "discussion" && (
          <DiscussionView
            threads={threads}
            replies={replies}
            educatorName={educatorName}
            educatorDesignation={educatorDesignation}
            educatorRegion={educatorRegion}
            onPostThread={handlePostThread}
            onPostReply={handlePostReply}
            onLikeThread={handleLikeThread}
          />
        )}

        {currentPage === "announcements" && (
          <AnnouncementsView
            announcements={announcements}
            dismissedIds={dismissedIds}
            onDismiss={handleDismissAnnouncement}
            onNavigateToSyllabus={() => setCurrentPage("syllabus")}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === "admin" && (
          <AdminView
            admins={admins}
            activeAdmin={activeAdmin}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            questions={questions}
            onToggleQuestionPublish={handleToggleQuestionPublish}
            onAddQuestion={handleAddQuestion}
            announcements={announcements}
            onToggleAnnouncement={handleToggleAnnouncement}
            onAddAnnouncement={handleAddAnnouncement}
            resources={resources}
            onSyncResources={handleSyncResources}
            logs={logs}
            mockTests={mockTests}
            onAddMockTest={handleAddMockTest}
            onToggleMockTestPublish={handleToggleMockTestPublish}
            onDeleteMockTest={handleDeleteMockTest}
          />
        )}
      </main>

      {/* Prestigious Institutional Footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* Slide-over Practice More Google Drive Library Drawer */}
      <PracticeMoreDrawer
        isOpen={isPracticeMoreOpen}
        onClose={() => setIsPracticeMoreOpen(false)}
      />
    </div>
  );
}
