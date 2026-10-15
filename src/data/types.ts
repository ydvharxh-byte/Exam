export type Page = 
  | "dashboard" 
  | "syllabus" 
  | "resources" 
  | "quizzes" 
  | "discussion" 
  | "announcements" 
  | "admin";

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: "pdf" | "doc" | "presentation" | "folder" | "other" | string;
  sourceUrl: string;
  driveUrl?: string;
  dateAdded?: string;
  code?: string;
  type?: "pdf" | "doc" | "presentation" | "folder" | "other" | string;
  topic?: string;
  module?: "Admin & Finance" | "Perspectives in Education" | "Pedagogy & Evaluation" | "School Safety & Law" | "General & Languages" | string;
  sourceFolder?: "study" | "quiz";
  url?: string;
  size?: string;
  pages?: number;
  featured?: boolean;
};

export type Question = {
  id: string;
  topic: string;
  module: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceRef: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  published: boolean;
};

export type DiscussionReply = {
  id: string;
  threadId: string;
  name: string;
  role?: string;
  school?: string;
  text: string;
  createdAt: string;
  likes?: number;
  hidden?: boolean;
};

export type DiscussionThread = {
  id: string;
  name: string;
  role?: string;
  school?: string;
  topic: string;
  module: string;
  title: string;
  question: string;
  createdAt: string;
  likes?: number;
  views?: number;
  isResolved?: boolean;
  hidden?: boolean;
};

export type Announcement = {
  id: string;
  title: string;
  message: string;
  publicationDate: string;
  priority: "Low" | "Normal" | "High";
  category: "Exam Alert" | "Circular" | "Resource" | "Administrative";
  linkText?: string;
  linkUrl?: string;
  active: boolean;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "editor" | "moderator";
  password: string;
};

export type ActivityLog = {
  id: string;
  message: string;
  timestamp: string;
  adminEmail?: string;
};

export type EducatorProfile = {
  id: string;
  name: string;
  designation: string;
  region: string;
  joinedDate: string;
  savedResources: string[];
  completedQuizzes: {
    topic: string;
    score: number;
    total: number;
    date: string;
  }[];
};
