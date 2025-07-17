
import { Assignment } from "./types";

// Mock assignment data
export const assignmentData: Record<string, Assignment> = {
  "assignment1": {
    id: "assignment1",
    title: "Newton's Laws of Motion",
    course: "Introduction to Physics",
    dueDate: "Oct 12, 2023",
    dueTime: "11:59 PM",
    description: "Explain Newton's three laws of motion with examples and applications in everyday life. Include diagrams where necessary.",
    submissionRequirements: [
      "Format: PDF or DOCX",
      "Word Limit: 1000-1500 words",
      "Attachments: Up to 3 diagrams or images"
    ],
    resources: [
      { name: "Newton's Laws Lecture Slides", type: "PDF", size: "2.4 MB" },
      { name: "Motion Examples Video", type: "MP4", size: "45 MB" }
    ],
    submissions: {
      received: 38,
      total: 42
    },
    submissionType: "file_upload",
    totalPoints: 100,
    allowLateSubmission: true,
    studentsNotSubmitted: ["Alex Johnson", "Maria Garcia", "James Wilson", "Priya Patel"],
    linkedTopic: { id: "t1", name: "Design Thinking", moduleId: "m1" },
    assignTo: "all"
  },
  "a1": {
    id: "a1",
    title: "Wireframing Exercise",
    course: "UX/UI Design Basics",
    dueDate: "Oct 5, 2023",
    dueTime: "11:59 PM",
    description: "Create both low-fidelity and high-fidelity wireframes for a mobile app homepage following the requirements discussed in class.",
    submissionRequirements: [
      "Format: PDF or Sketch/Figma file",
      "Include both low-fi and high-fi wireframes",
      "Add annotations explaining your design decisions"
    ],
    resources: [
      { name: "Wireframing Best Practices", type: "PDF", size: "1.8 MB" },
      { name: "Example Wireframes", type: "ZIP", size: "12 MB" }
    ],
    submissions: {
      received: 27,
      total: 28
    },
    submissionType: "file_upload",
    totalPoints: 100,
    allowLateSubmission: false,
    studentsNotSubmitted: ["Emily Chen"],
    linkedTopic: { id: "t3", name: "Low-fidelity Wireframes", moduleId: "m2" },
    assignTo: "all"
  }
};

// Mock modules data
export const modules = [
  {
    id: "m1",
    name: "Introduction to UX/UI",
    overview: "Basic concepts of UX/UI design",
    topics: [
      { id: "t1", name: "Design Thinking", moduleId: "m1" },
      { id: "t2", name: "User Research", moduleId: "m1" },
    ],
  },
  {
    id: "m2",
    name: "Wireframing Basics",
    overview: "Learn how to create effective wireframes",
    topics: [
      { id: "t3", name: "Low-fidelity Wireframes", moduleId: "m2" },
      { id: "t4", name: "High-fidelity Wireframes", moduleId: "m2" },
    ],
  },
];

// Generate mock submissions data
export const generateMockSubmissions = (assignmentId: string, assignmentName: string, dueDate: string, totalPoints: number) => {
  return Array(38).fill(null).map((_, i) => ({
    id: `sub${i+1}`,
    studentName: `Student ${i+1}`,
    date: `Oct ${Math.floor(Math.random() * 10) + 1}, 2023`,
    status: i % 5 === 0 
      ? "late" 
      : i % 3 === 0 
        ? "graded" 
        : i % 7 === 0 
          ? "not_submitted" 
          : "submitted",
    grade: i % 3 === 0 ? `${Math.floor(Math.random() * 30) + 70}/${totalPoints}` : undefined,
    feedback: i % 3 === 0 ? "Good work overall. Could improve on explanations of the third law." : undefined,
    attachments: i % 7 !== 0 ? [
      { name: `submission_${i+1}.pdf`, type: "PDF", size: "1.2 MB" }
    ] : undefined,
    assignmentId,
    assignmentName,
    dueDate,
    totalPoints,
    submittedAt: `Oct ${Math.floor(Math.random() * 10) + 1}, 2023`,
    content: i % 2 === 0 ? "Here is my submission for the assignment. I've included all the required elements and followed the instructions carefully." : undefined
  }));
};
