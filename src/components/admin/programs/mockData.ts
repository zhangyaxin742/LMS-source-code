
import { Program, Course, Classroom } from "./types";

// Mock data for programs
export const mockPrograms: Program[] = [
  {
    id: "1",
    name: "UI/UX Design",
    description: "Learn UI/UX design principles and tools",
    price: 50000,
    duration: "12 weeks",
    tutors: 3,
    students: 45,
    branches: ["UI Design", "UX Research", "Prototyping"],
    courses: 5,
    assignedStudents: ["1", "3"],
    assignedTutors: ["2"]
  },
  {
    id: "2",
    name: "Software Development",
    description: "Become a full-stack developer",
    price: 75000,
    duration: "16 weeks",
    tutors: 5,
    students: 60,
    branches: ["Frontend", "Backend", "Mobile"],
    courses: 8,
    assignedStudents: ["3", "5"],
    assignedTutors: ["4"]
  },
  {
    id: "3",
    name: "Data Science",
    description: "Master data analysis and visualization",
    price: 65000,
    duration: "14 weeks",
    tutors: 4,
    students: 30,
    branches: ["Data Analysis", "Machine Learning", "Data Visualization"],
    courses: 6,
    assignedStudents: ["1"],
    assignedTutors: ["2"]
  },
  {
    id: "4",
    name: "Digital Marketing",
    description: "Learn SEO, SEM, and social media marketing",
    price: 45000,
    duration: "10 weeks",
    tutors: 2,
    students: 25,
    branches: ["SEO/SEM", "Social Media", "Content Marketing"],
    courses: 4,
    assignedStudents: ["5"],
    assignedTutors: ["4"]
  }
];

// Mock data for courses
export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Introduction to UI Design",
    program: "UI/UX Design",
    branch: "UI Design",
    duration: "2 weeks",
    modules: 5,
    students: 32
  },
  {
    id: "2",
    name: "User Research Methods",
    program: "UI/UX Design",
    branch: "UX Research",
    duration: "3 weeks",
    modules: 6,
    students: 28
  },
  {
    id: "3",
    name: "Frontend Development Basics",
    program: "Software Development",
    branch: "Frontend",
    duration: "4 weeks",
    modules: 8,
    students: 45
  },
  {
    id: "4",
    name: "Backend with Node.js",
    program: "Software Development",
    branch: "Backend",
    duration: "4 weeks",
    modules: 7,
    students: 38
  },
  {
    id: "5",
    name: "Introduction to Data Analysis",
    program: "Data Science",
    branch: "Data Analysis",
    duration: "3 weeks",
    modules: 6,
    students: 25
  },
  {
    id: "6",
    name: "SEO Fundamentals",
    program: "Digital Marketing",
    branch: "SEO/SEM",
    duration: "2 weeks",
    modules: 4,
    students: 20
  }
];

// Mock data for classrooms
export const mockClassrooms: Classroom[] = [
  {
    id: "1",
    name: "UI/UX Design Class A",
    program: "UI/UX Design",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    students: 20,
    tutors: 2
  },
  {
    id: "2",
    name: "Software Development Cohort 3",
    program: "Software Development",
    startDate: "2023-08-15",
    endDate: "2023-12-15",
    students: 25,
    tutors: 3
  },
  {
    id: "3",
    name: "Data Science Evening Class",
    program: "Data Science",
    startDate: "2023-10-01",
    endDate: "2024-01-15",
    students: 15,
    tutors: 2
  },
  {
    id: "4",
    name: "Digital Marketing Weekend Class",
    program: "Digital Marketing",
    startDate: "2023-09-15",
    endDate: "2023-11-20",
    students: 18,
    tutors: 1
  }
];
