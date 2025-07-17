
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Upload } from "lucide-react";

interface VideoControlsProps {
  completed: boolean;
  hasAssignment: boolean;
  handleComplete: () => void;
  handleAssignment: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ 
  completed, 
  hasAssignment, 
  handleComplete, 
  handleAssignment 
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        {completed ? (
          <div className="flex items-center text-green-500">
            <CheckCircle size={20} className="mr-1" />
            Completed
          </div>
        ) : (
          <Button onClick={handleComplete}>Mark as Completed</Button>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {hasAssignment && (
          <Button onClick={handleAssignment}>
            <Upload size={16} className="mr-2" />
            Submit Assignment
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoControls;
