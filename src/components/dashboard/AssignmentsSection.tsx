
import React from "react";
import { useNavigate } from "react-router-dom";
import AssignmentListCard from "./AssignmentListCard";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  submissions: string;
  status: "upcoming" | "active" | "completed";
}

const AssignmentsSection = () => {
  const navigate = useNavigate();
  
  // Assignments data
  const assignments = [
    { 
      id: "assignment1",
      title: "Wireframing Exercise", 
      dueDate: "Oct 5", 
      submissions: "27/28", 
      status: "completed" as const,
    },
    { 
      id: "assignment2",
      title: "User Personas Creation", 
      dueDate: "Oct 12", 
      submissions: "15/28", 
      status: "active" as const,
    },
    { 
      id: "assignment3",
      title: "Usability Testing Plan", 
      dueDate: "Oct 19", 
      submissions: "0/28", 
      status: "upcoming" as const,
    },
  ];

  const handleViewAllAssignments = () => {
    console.log("Navigating to All Assignments");
    navigate("/assignments");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Pending Assignments</h2>
        <button 
          className="text-sm text-primary font-medium hover:underline"
          onClick={handleViewAllAssignments}
        >
          View All
        </button>
      </div>
      <AssignmentListCard 
        assignments={assignments}
        onViewAll={handleViewAllAssignments}
        onViewAssignment={(id) => {
          console.log(`Viewing assignment ${id}`);
          navigate(`/assignments/${id}`);
        }}
      />
    </div>
  );
};

export default AssignmentsSection;
