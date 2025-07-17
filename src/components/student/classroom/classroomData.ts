
export interface ClassroomData {
  id: string;
  name: string;
  description: string;
  instructor: string;
  instructorRole: string;
  instructorImage: string;
  startDate: string;
  endDate: string;
  moduleCount: number;
  completedModules: number;
  progress: number;
  studentCount: number;
  nextSession: string;
  modules: Array<{
    id: string;
    title: string;
    topics: Array<{
      id: string;
      title: string;
      completed: boolean;
      type: string;
    }>;
    progress: number;
  }>;
  assignments: Array<{
    id: string;
    title: string;
    dueDate: string;
    status: string;
    grade?: string;
    feedback?: string;
    submissionLink?: string;
  }>;
  announcements: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
  }>;
  students: Array<{
    id: string;
    name: string;
    image: string;
  }>;
  feeds: Array<{
    id: string;
    content: string;
    author: string;
    authorRole: string;
    date: string;
    type: string;
    likes: number;
    comments: number;
  }>;
}

export const getMockClassroomData = (classroomId: string): ClassroomData => {
  return {
    id: classroomId,
    name: "UI Design Fundamentals",
    description: "A comprehensive introduction to UI design principles and practices.",
    instructor: "Thomas Anderson",
    instructorRole: "Lead Tutor",
    instructorImage: "https://i.pravatar.cc/150?img=33",
    startDate: "2023-08-15",
    endDate: "2023-12-15",
    moduleCount: 6,
    completedModules: 4,
    progress: 68,
    studentCount: 24,
    nextSession: "Tomorrow, 3:00 PM",
    modules: [
      {
        id: "mod-1",
        title: "Introduction to UI Design",
        topics: [
          { id: "top-1", title: "Design Principles", completed: true, type: "video" },
          { id: "top-2", title: "UI Elements", completed: true, type: "pdf" },
          { id: "top-3", title: "Color Theory", completed: false, type: "document" },
        ],
        progress: 75
      },
      {
        id: "mod-2",
        title: "Layout & Composition",
        topics: [
          { id: "top-4", title: "Grid Systems", completed: false, type: "presentation" },
          { id: "top-5", title: "Responsive Design", completed: false, type: "link" },
        ],
        progress: 0
      }
    ],
    assignments: [
      {
        id: "asgn-1",
        title: "Design Principles Analysis",
        dueDate: "2023-09-20",
        status: "submitted",
        grade: "A",
        feedback: "Excellent analysis of design principles."
      },
      {
        id: "asgn-2",
        title: "UI Components Creation",
        dueDate: "2023-10-05",
        status: "pending",
        submissionLink: "https://forms.example.com/submit"
      }
    ],
    announcements: [
      {
        id: "ann-1",
        title: "Welcome to the class!",
        content: "Welcome to UI Design Fundamentals. Please review the syllabus and prepare for our first session.",
        date: "2023-08-14",
        author: "Thomas Anderson"
      },
      {
        id: "ann-2",
        title: "Assignment Deadline Extended",
        content: "The deadline for the UI Components Creation assignment has been extended to October 5th.",
        date: "2023-09-25",
        author: "Thomas Anderson"
      }
    ],
    students: [
      { id: "std-1", name: "Emily Johnson", image: "https://i.pravatar.cc/150?img=1" },
      { id: "std-2", name: "Michael Chen", image: "https://i.pravatar.cc/150?img=2" },
      { id: "std-3", name: "Sara Williams", image: "https://i.pravatar.cc/150?img=3" },
      { id: "std-4", name: "David Kim", image: "https://i.pravatar.cc/150?img=4" },
    ],
    feeds: [
      {
        id: "feed-1", 
        content: "Class materials for today's session have been uploaded.",
        author: "Thomas Anderson",
        authorRole: "Instructor",
        date: "2 hours ago",
        type: "announcement",
        likes: 5,
        comments: 2
      },
      {
        id: "feed-2", 
        content: "Has anyone started on the UI Components assignment?",
        author: "Emily Johnson",
        authorRole: "Student",
        date: "Yesterday",
        type: "question",
        likes: 3,
        comments: 4
      },
      {
        id: "feed-3", 
        content: "Great session today! Looking forward to the next one.",
        author: "Michael Chen",
        authorRole: "Student",
        date: "2 days ago",
        type: "comment",
        likes: 7,
        comments: 1
      }
    ]
  };
};
