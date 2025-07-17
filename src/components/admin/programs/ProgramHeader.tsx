
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ProgramHeaderProps {
  handleAddProgram: () => void;
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({ handleAddProgram }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Program Management</h1>
        <p className="text-muted-foreground">Create and manage educational programs, courses, and classrooms</p>
      </div>
      <Button onClick={handleAddProgram} className="flex items-center gap-2">
        <PlusCircle size={16} />
        Add Program
      </Button>
    </div>
  );
};

export default ProgramHeader;
