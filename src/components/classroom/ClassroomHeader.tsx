
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ClassroomHeaderProps {
  onCreateClick: () => void;
}

const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Classrooms</h1>
      <Button onClick={onCreateClick}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create New Classroom
      </Button>
    </div>
  );
};

export default ClassroomHeader;
