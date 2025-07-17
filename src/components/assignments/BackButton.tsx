
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  label = "Back to Assignments" 
}) => {
  return (
    <div className="flex items-center">
      <Button 
        variant="ghost" 
        onClick={onClick} 
        className="mr-2"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {label}
      </Button>
    </div>
  );
};

export default BackButton;
