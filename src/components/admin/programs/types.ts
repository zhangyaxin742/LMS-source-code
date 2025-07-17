
export interface Program {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  branches: string[];
  tutors: number;
  students: number;
  courses: number;
  assignedStudents: string[];
  assignedTutors: string[];
}

export interface Course {
  id: string;
  name: string;
  program: string;
  branch: string;
  duration: string;
  modules: number;
  students: number;
}

export interface Classroom {
  id: string;
  name: string;
  program: string;
  startDate: string;
  endDate: string;
  students: number;
  tutors: number;
}
