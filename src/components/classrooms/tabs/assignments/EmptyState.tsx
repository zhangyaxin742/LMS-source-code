
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ClipboardList } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-md">
      <ClipboardList className="h-8 w-8 text-muted-foreground mb-2" />
      <h3 className="text-lg font-medium">No assignments created yet</h3>
      <p className="text-muted-foreground mb-4">
        Create assignments for your students
      </p>
      <Button onClick={onCreateClick}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Assignment
      </Button>
    </div>
  );
};

export default EmptyState;
