
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for student assignments
const pendingAssignments = [
  {
    id: 1,
    title: "Design System Components",
    course: "UI/UX Design Fundamentals",
    dueDate: "2023-09-10T23:59:59",
    status: "pending",
    progress: 60,
  },
  {
    id: 2,
    title: "User Persona Development",
    course: "Design Systems",
    dueDate: "2023-09-15T23:59:59",
    status: "pending",
    progress: 30,
  },
];

const completedAssignments = [
  {
    id: 3,
    title: "Wireframing Exercise",
    course: "UI/UX Design Fundamentals",
    dueDate: "2023-08-28T23:59:59",
    submittedDate: "2023-08-27T14:35:00",
    status: "completed",
    grade: "A",
    feedback: "Excellent work on the wireframes. Your attention to detail is impressive."
  },
  {
    id: 4,
    title: "User Research Report",
    course: "Design Systems",
    dueDate: "2023-08-20T23:59:59",
    submittedDate: "2023-08-18T10:15:00",
    status: "completed",
    grade: "B+",
    feedback: "Good analysis but could use more depth in the research methodology."
  },
];

export const useAssignments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const navigate = useNavigate();
  
  const filterAssignments = (assignments: any[]) => {
    return assignments.filter(assignment => 
      (assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       assignment.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (courseFilter === "all" || assignment.course === courseFilter)
    );
  };
  
  const filteredPending = filterAssignments(pendingAssignments);
  const filteredCompleted = filterAssignments(completedAssignments);
  
  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `${diffDays} days remaining`;
  };
  
  const getStatusColor = (dueDate: string) => {
    const days = getDaysRemaining(dueDate);
    if (days === "Overdue") return "destructive";
    if (days === "Due today") return "warning";
    return "secondary";
  };

  const handleViewDetails = (id: number) => {
    navigate(`/student/assignment/${id}`);
  };
  
  const handleSubmitAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setIsSubmitModalOpen(true);
  };
  
  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    courseFilter,
    setCourseFilter,
    filteredPending,
    filteredCompleted,
    isSubmitModalOpen,
    selectedAssignment,
    getDaysRemaining,
    getStatusColor,
    handleViewDetails,
    handleSubmitAssignment,
    handleCloseSubmitModal
  };
};
