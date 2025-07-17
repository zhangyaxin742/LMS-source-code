
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface VideoHeaderProps {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  handleBack: () => void;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ 
  title, 
  description, 
  instructor, 
  duration, 
  handleBack 
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Course
        </Button>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <span>Instructor: {instructor}</span>
          <span>•</span>
          <span>{duration}</span>
          <span>•</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">Student Content</span>
        </div>
      </div>
    </>
  );
};

export default VideoHeader;
