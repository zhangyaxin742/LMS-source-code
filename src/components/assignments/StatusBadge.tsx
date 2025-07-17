
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "submitted" | "late" | "not_submitted" | "graded";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let label = "Unknown";
  
  switch (status) {
    case "submitted":
      variant = "secondary";
      label = "Submitted";
      break;
    case "late":
      variant = "destructive";
      label = "Late";
      break;
    case "not_submitted":
      variant = "outline";
      label = "Not Submitted";
      break;
    case "graded":
      variant = "default";
      label = "Graded";
      break;
  }
  
  return <Badge variant={variant}>{label}</Badge>;
};

export default StatusBadge;
