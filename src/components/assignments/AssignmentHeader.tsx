
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";

interface AssignmentHeaderProps {
  onCreateAssignment: () => void;
  assignment?: any; // Optional assignment for the details page
  modules?: any[]; // Optional modules for the details page
  onEdit?: () => void; // Optional edit handler for the details page
  onUploadResource?: () => void; // Optional upload resource handler
  onDelete?: () => void; // Optional delete handler
}

const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({ 
  onCreateAssignment,
  assignment,
  modules,
  onEdit,
  onUploadResource,
  onDelete
}) => {
  // If we're in the details view, we show a different header
  if (assignment) {
    return (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{assignment.title}</h1>
          <p className="text-muted-foreground mt-1">{assignment.course || "Course Assignment"}</p>
        </div>
        
        <div className="flex items-center gap-3">
          {onEdit && (
            <Button variant="outline" onClick={onEdit}>
              Edit Assignment
            </Button>
          )}
          
          {onUploadResource && (
            <Button variant="outline" onClick={onUploadResource}>
              Upload Resource
            </Button>
          )}
          
          {onDelete && (
            <Button variant="destructive" onClick={onDelete}>
              Delete Assignment
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Default header for assignments list
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground mt-1">Create and manage course assignments</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="Search assignments..."
            className="pl-10 pr-4 py-2 h-9 rounded-lg bg-secondary/60 border border-border/50 text-sm subtle-ring-focus"
          />
        </div>
        
        <Button 
          className="gap-2" 
          onClick={onCreateAssignment}
        >
          <PlusCircle className="h-4 w-4" />
          Create Assignment
        </Button>
      </div>
    </div>
  );
};

export default AssignmentHeader;
