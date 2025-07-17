
export interface Resource {
  name: string;
  type: string;
  size: string;
}

export interface Submission {
  id: string;
  studentName: string;
  date: string;
  status: "submitted" | "late" | "not_submitted" | "graded";
  grade?: string;
  feedback?: string;
  attachments?: { name: string, type: string, size: string }[];
  assignmentId: string;
  assignmentName: string;
  dueDate: string;
  totalPoints: number;
  submittedAt: string;
  content?: string;
}

export interface Topic {
  id: string;
  name: string;
  moduleId: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  linkedTopic?: { id: string; name: string; moduleId: string };
  submissionType: "file_upload" | "link" | "text_input";
  allowLateSubmission: boolean;
  assignTo: "all" | "specific";
  attachments?: Resource[];
  status?: "ongoing" | "completed";
  
  // Optional properties for compatibility with other components
  course?: string;
  dueTime?: string;
  submissionRequirements?: string[];
  resources?: Resource[];
  submissions?: {
    received: number;
    total: number;
  };
  studentsNotSubmitted?: string[];
  linkedModule?: string; // Added for compatibility
}

export interface ModuleTopic {
  id: string;
  name: string;
  moduleId: string;
}

export interface Module {
  id: string;
  name: string;
  overview: string;
  topics: ModuleTopic[];
}
