
export interface ProgramStudent {
  id: string;
  name: string;
  email: string;
  program: string;
  completionStatus: "completed" | "ongoing";
  assignedClassrooms: string[];
  progress: number;
  profileImage: string;
}
