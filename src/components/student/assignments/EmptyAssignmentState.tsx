
import React from "react";
import { FileText } from "lucide-react";

interface EmptyAssignmentStateProps {
  searchTerm: string;
  courseFilter: string;
  type: "pending" | "completed";
}

const EmptyAssignmentState: React.FC<EmptyAssignmentStateProps> = ({
  searchTerm,
  courseFilter,
  type,
}) => {
  return (
    <div className="text-center py-12">
      <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">
        No {type} assignments found
      </h3>
      <p className="text-muted-foreground">
        {searchTerm || courseFilter !== "all" 
          ? "Try adjusting your search or filters"
          : type === "pending"
            ? "You're all caught up! Check the completed tab to view your past work."
            : "You haven't completed any assignments yet."}
      </p>
    </div>
  );
};

export default EmptyAssignmentState;
