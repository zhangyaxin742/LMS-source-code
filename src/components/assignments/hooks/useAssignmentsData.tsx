
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assignment, Module } from "@/components/assignments/types";
import { useToast } from "@/components/ui/use-toast";

// Define the local Assignment interface with the required fields
interface AssignmentWithModule extends Assignment {
  linkedModule: string;
}

interface Template {
  title: string;
  description: string;
  usage: string;
}

export const useAssignmentsData = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ongoing");
  
  const modules: Module[] = [
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

  const [assignments, setAssignments] = useState<AssignmentWithModule[]>([
    { 
      id: "a1",
      title: "Wireframing Exercise", 
      dueDate: "Oct 5, 2023", 
      submissions: { received: 24, total: 24 },
      totalPoints: 100,
      submissionType: "file_upload",
      allowLateSubmission: false,
      assignTo: "all",
      status: "completed",
      linkedModule: "Wireframing Basics",
      linkedTopic: { id: "t3", name: "Low-fidelity Wireframes", moduleId: "m2" },
      description: "Create wireframes for a mobile app"
    },
    { 
      id: "a2",
      title: "User Personas Creation", 
      dueDate: "Oct 12, 2023", 
      submissions: { received: 21, total: 24 },
      totalPoints: 100,
      submissionType: "file_upload",
      allowLateSubmission: true,
      assignTo: "all",
      status: "ongoing",
      linkedModule: "Introduction to UX/UI",
      linkedTopic: { id: "t2", name: "User Research", moduleId: "m1" },
      description: "Create user personas based on research"
    },
    { 
      id: "a3",
      title: "Usability Testing Plan", 
      dueDate: "Oct 19, 2023", 
      submissions: { received: 19, total: 24 },
      totalPoints: 150,
      submissionType: "text_input",
      allowLateSubmission: false,
      assignTo: "all",
      status: "ongoing",
      linkedModule: "Introduction to UX/UI",
      linkedTopic: { id: "t2", name: "User Research", moduleId: "m1" },
      description: "Develop a usability testing plan"
    },
    { 
      id: "a4",
      title: "Wireframe Critique", 
      dueDate: "Oct 25, 2023", 
      submissions: { received: 16, total: 24 },
      totalPoints: 75,
      submissionType: "link",
      allowLateSubmission: true,
      assignTo: "all",
      status: "ongoing",
      linkedModule: "Wireframing Basics", 
      linkedTopic: { id: "t4", name: "High-fidelity Wireframes", moduleId: "m2" },
      description: "Provide critique on classmates' wireframes"
    },
  ]);

  const templates: Template[] = [
    { 
      title: "Wireframing Template", 
      description: "Standard wireframing assignment template with grading criteria", 
      usage: "Used in 2 Assignments" 
    },
    { 
      title: "Research & Analysis", 
      description: "Template for user research and competitive analysis", 
      usage: "Used in 1 Assignment" 
    },
  ];

  const ongoingAssignments = assignments.filter(a => a.status === "ongoing");
  const completedAssignments = assignments.filter(a => a.status === "completed");

  const handleCreateAssignment = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSaveAssignment = (assignment: Partial<Assignment>) => {
    const newAssignment: AssignmentWithModule = {
      ...assignment as Assignment,
      id: `a${Date.now()}`,
      status: "ongoing",
      submissions: { received: 0, total: 24 },
      linkedModule: assignment.linkedTopic 
        ? modules.find(m => m.id === assignment.linkedTopic.moduleId)?.name || "" 
        : ""
    };
    
    setAssignments(prev => [...prev, newAssignment]);
    
    toast({
      title: "Assignment Created",
      description: `${assignment.title} has been published successfully.`,
    });
    
    setIsCreateModalOpen(false);
  };

  const handleMarkAsCompleted = (assignment: AssignmentWithModule) => {
    setAssignments(prev => prev.map(item => 
      item.id === assignment.id ? {...item, status: "completed"} : item
    ));
    
    toast({
      title: "Assignment Completed",
      description: "The assignment has been marked as completed.",
    });
  };

  const handleViewAssignment = (assignment: AssignmentWithModule) => {
    navigate(`/assignments/${assignment.id}`);
  };

  const handleEditAssignment = (assignment: AssignmentWithModule) => {
    navigate(`/assignments/${assignment.id}?edit=true`);
  };

  return {
    isCreateModalOpen,
    setIsCreateModalOpen,
    activeTab,
    setActiveTab,
    modules,
    assignments,
    templates,
    ongoingAssignments,
    completedAssignments,
    handleCreateAssignment,
    handleCloseCreateModal,
    handleSaveAssignment,
    handleMarkAsCompleted,
    handleViewAssignment,
    handleEditAssignment
  };
};
