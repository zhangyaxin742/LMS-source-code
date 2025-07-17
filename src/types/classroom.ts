
export type ClassroomStatus = "active" | "upcoming" | "completed";

export interface Tutor {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

export interface Classroom {
  id: string;
  name: string;
  program: string;
  course?: string; // Make course optional
  studentCount: number;
  moduleCount: number;
  status: ClassroomStatus;
  description?: string;
  startDate?: string;
  endDate?: string;
  tutors?: Tutor[];
}
