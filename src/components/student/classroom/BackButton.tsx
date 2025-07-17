
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label = "Back to Classrooms" }) => {
  return (
    <div className="flex items-center mb-6 space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="pl-0"
        onClick={onClick}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </div>
  );
};

export default BackButton;
