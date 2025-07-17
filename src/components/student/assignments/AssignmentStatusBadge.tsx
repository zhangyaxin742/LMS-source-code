
import React from "react";
import { Badge } from "@/components/ui/badge";

interface AssignmentStatusBadgeProps {
  status: string;
}

const AssignmentStatusBadge: React.FC<AssignmentStatusBadgeProps> = ({ status }) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "submitted":
        return "outline" as const;
      case "graded":
        return "outline" as const;
      case "overdue":
        return "destructive" as const;
      default:
        return "default" as const;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-600";
      case "graded":
        return "bg-blue-100 text-blue-600";
      default:
        return "";
    }
  };
  
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "submitted":
        return "Submitted";
      case "graded":
        return "Graded";
      case "overdue":
        return "Overdue";
      default:
        return "Pending";
    }
  };

  return (
    <Badge 
      variant={getStatusBadgeVariant(status)}
      className={getStatusBadgeClass(status)}
    >
      {getStatusDisplay(status)}
    </Badge>
  );
};

export default AssignmentStatusBadge;
