
import { Assignment, Submission } from "@/components/assignments/types";

export const useMockData = () => {
  // Mock assignments data
  const mockAssignments: Assignment[] = [
    {
      id: "a1",
      title: "React Component Basics",
      description: "Create a simple React component",
      dueDate: "2023-12-15",
      totalPoints: 100,
      submissionType: "file_upload",
      allowLateSubmission: true,
      assignTo: "all",
      course: "React 101",
      dueTime: "23:59",
      submissionRequirements: ["Code files", "Documentation"],
      resources: [
        { name: "React Docs.pdf", type: "PDF", size: "2.3 MB" },
        { name: "Component Example.zip", type: "ZIP", size: "1.5 MB" }
      ],
      submissions: {
        received: 15,
        total: 20
      },
      studentsNotSubmitted: ["John Doe", "Jane Smith"],
      linkedTopic: { id: "t1", name: "JSX and Components", moduleId: "m1" },
      attachments: [
        { name: "Assignment Instructions.pdf", type: "PDF", size: "1.2 MB" }
      ],
      status: "ongoing"
    },
    {
      id: "a2",
      title: "State Management",
      description: "Implement state management in React",
      dueDate: "2023-12-22",
      totalPoints: 150,
      submissionType: "text_input",
      allowLateSubmission: false,
      assignTo: "all",
      course: "React 101",
      dueTime: "23:59",
      submissionRequirements: ["Explanation", "Code snippets"],
      resources: [
        { name: "State Management Guide.pdf", type: "PDF", size: "3.1 MB" }
      ],
      submissions: {
        received: 10,
        total: 20
      },
      studentsNotSubmitted: ["Mike Johnson", "Sarah Lee", "Alex Wong"],
      linkedTopic: { id: "t2", name: "State and Props", moduleId: "m1" },
      status: "ongoing"
    }
  ];

  // Mock submissions data
  const mockSubmissions: Submission[] = [
    {
      id: "s1",
      studentName: "Alice Johnson",
      date: "2023-12-14",
      status: "submitted",
      assignmentId: "a1",
      assignmentName: "React Component Basics",
      dueDate: "2023-12-15",
      totalPoints: 100,
      submittedAt: "2023-12-14T15:30:00",
      content: "I've implemented the component as requested. The main challenge was...",
      attachments: [
        { name: "component.jsx", type: "JSX", size: "2.3 KB" }
      ]
    },
    {
      id: "s2",
      studentName: "Bob Smith",
      date: "2023-12-16",
      status: "late",
      assignmentId: "a1",
      assignmentName: "React Component Basics",
      dueDate: "2023-12-15",
      totalPoints: 100,
      submittedAt: "2023-12-16T10:15:00",
      content: "Sorry for the late submission. Here's my implementation...",
      attachments: [
        { name: "react-component.zip", type: "ZIP", size: "1.5 MB" }
      ]
    },
    {
      id: "s3",
      studentName: "Charlie Davis",
      date: "2023-12-20",
      status: "graded",
      grade: "85",
      feedback: "Good work! Some improvements needed in code organization.",
      assignmentId: "a1",
      assignmentName: "React Component Basics",
      dueDate: "2023-12-15",
      totalPoints: 100,
      submittedAt: "2023-12-14T09:45:00"
    }
  ];

  return { mockAssignments, mockSubmissions };
};
