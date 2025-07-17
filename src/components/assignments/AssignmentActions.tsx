
import React from "react";
import { Button } from "@/components/ui/button";
import { Assignment } from "./types";

interface AssignmentActionsProps {
  assignment: Assignment;
  onMarkAsCompleted: () => void;
}

const AssignmentActions: React.FC<AssignmentActionsProps> = ({ 
  assignment, 
  onMarkAsCompleted 
}) => {
  if (assignment.status !== "ongoing") {
    return null;
  }

  return (
    <div className="flex justify-end">
      <button 
        className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-md font-medium hover:bg-emerald-200"
        onClick={onMarkAsCompleted}
      >
        Mark Assignment as Completed
      </button>
    </div>
  );
};

export default AssignmentActions;
