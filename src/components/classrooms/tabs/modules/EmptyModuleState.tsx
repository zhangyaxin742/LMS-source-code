
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle } from "lucide-react";

interface EmptyModuleStateProps {
  onCreateModule: () => void;
}

const EmptyModuleState: React.FC<EmptyModuleStateProps> = ({ onCreateModule }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-md">
      <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
      <h3 className="text-lg font-medium">No modules yet</h3>
      <p className="text-muted-foreground mb-4">
        Create your first module to organize your course content
      </p>
      <Button onClick={onCreateModule}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Module
      </Button>
    </div>
  );
};

export default EmptyModuleState;
