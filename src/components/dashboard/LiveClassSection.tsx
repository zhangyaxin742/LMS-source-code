
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import LiveClassCard from "./LiveClassCard";
import { LiveClass } from "@/types/liveClass";
import RescheduleClassDialog from "@/components/live-classes/RescheduleClassDialog";
import { Module } from "@/components/classrooms/tabs/modules/types";
import { toast } from "sonner";

const LiveClassSection = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
  // Mock data
  const [modules] = useState<Module[]>([
    {
      id: "mod-1",
      title: "UI Design Fundamentals",
      description: "Learn the basics of UI design",
      topics: [
        {
          id: "topic-1",
          title: "Design Principles",
          description: "Basic principles of effective UI design",
          duration: "45 mins",
          isCompleted: false,
        },
        {
          id: "topic-2",
          title: "Color Theory",
          description: "Understanding color usage in interfaces",
          duration: "30 mins",
          isCompleted: false,
        }
      ],
      isCompleted: false
    }
  ]);

  const [upcomingClass, setUpcomingClass] = useState<LiveClass>({
    id: "class-1",
    title: "Introduction to User-Centered Design",
    date: "October 15, 2023",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    classroom: "UX Design Studio",
    classroomId: "uxd-001",
    description: "Learn the fundamentals of user-centered design and how to apply design thinking to your projects.",
    status: "scheduled",
    attendees: 7,
    totalStudents: 28,
    materials: [],
    chat: [],
    moduleId: "mod-1",
    topicId: "topic-1",
    meetingLink: "https://meet.google.com/abc-defg-hij"
  });

  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  
  const handleViewAllClasses = () => {
    console.log("Navigating to All Live Classes");
    navigate("/live-classes");
  };

  const handleStartSession = () => {
    console.log("Starting live session");
    
    if (upcomingClass.meetingLink) {
      // Open the meeting link in a new tab
      window.open(upcomingClass.meetingLink, "_blank");
    } else {
      // If no meeting link is available
      uiToast({
        title: "No Meeting Link",
        description: "This session doesn't have a meeting link assigned.",
      });
    }
  };

  const handleViewSessionDetails = () => {
    console.log("Viewing session details");
    navigate("/live-classes");
  };

  const handleRescheduleSession = () => {
    console.log("Opening reschedule dialog");
    setShowRescheduleDialog(true);
  };

  const handleRescheduleClass = (classData: Partial<LiveClass>) => {
    if (!classData.id) return;
    
    setUpcomingClass(prev => ({ ...prev, ...classData }));
    setShowRescheduleDialog(false);
    toast.success("Live class rescheduled successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Upcoming Live Classes</h2>
        <button 
          className="text-sm text-primary font-medium hover:underline"
          onClick={handleViewAllClasses}
        >
          View All Classes
        </button>
      </div>
      
      <LiveClassCard
        title={upcomingClass.title}
        date={upcomingClass.date}
        classroom={upcomingClass.classroom}
        registered={upcomingClass.attendees || 0}
        total={upcomingClass.totalStudents || 0}
        meetingLink={upcomingClass.meetingLink}
        onStart={handleStartSession}
        onView={handleViewSessionDetails}
        onReschedule={handleRescheduleSession}
      />

      <RescheduleClassDialog 
        open={showRescheduleDialog} 
        onOpenChange={setShowRescheduleDialog} 
        onReschedule={handleRescheduleClass}
        liveClass={upcomingClass}
        modules={modules}
      />
    </div>
  );
};

export default LiveClassSection;
