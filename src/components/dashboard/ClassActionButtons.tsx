
import React from "react";
import { Button } from "@/components/ui/button";

interface ClassActionButtonsProps {
  onStart?: () => void;
  onView?: () => void;
  onReschedule?: () => void;
  hasMeetingLink?: boolean;
}

const ClassActionButtons: React.FC<ClassActionButtonsProps> = ({
  onStart,
  onView,
  onReschedule,
  hasMeetingLink = false,
}) => {
  return (
    <div className="flex space-x-3">
      <Button 
        className="flex-1"
        onClick={onStart}
      >
        {hasMeetingLink ? "Join Meeting" : "Start Session"}
      </Button>
      <Button 
        className="flex-1"
        variant="secondary"
        onClick={onView}
      >
        View Details
      </Button>
      <Button 
        className="flex-none"
        variant="outline"
        onClick={onReschedule}
      >
        Reschedule
      </Button>
    </div>
  );
};

export default ClassActionButtons;
