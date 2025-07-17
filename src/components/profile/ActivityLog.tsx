
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, BookOpen, Users, Camera, MessageSquare } from "lucide-react";

const ActivityLog: React.FC = () => {
  // Mock data for activities (would come from API in a real app)
  const allActivities = [
    {
      id: "a1",
      action: "Uploaded video to UI/UX Design Fundamentals",
      date: "Mar 24, 2025",
      time: "2:30 PM",
      icon: <Camera size={16} />,
    },
    {
      id: "a2",
      action: "Scheduled live class: Introduction to User-Centered Design",
      date: "Mar 23, 2025",
      time: "10:15 AM",
      icon: <Calendar size={16} />,
    },
    {
      id: "a3",
      action: "Graded assignment for Alex Johnson",
      date: "Mar 22, 2025",
      time: "4:45 PM",
      icon: <BookOpen size={16} />,
    },
    {
      id: "a4",
      action: "Added Maria Garcia to UI/UX Design class",
      date: "Mar 21, 2025",
      time: "11:30 AM",
      icon: <Users size={16} />,
    },
    {
      id: "a5",
      action: "Replied to discussion thread on Design Principles",
      date: "Mar 20, 2025",
      time: "9:20 AM",
      icon: <MessageSquare size={16} />,
    },
    {
      id: "a6",
      action: "Created new assignment: User Interview Practice",
      date: "Mar 19, 2025",
      time: "3:15 PM",
      icon: <BookOpen size={16} />,
    },
    {
      id: "a7",
      action: "Updated course materials for Prototyping Techniques",
      date: "Mar 18, 2025",
      time: "1:45 PM",
      icon: <BookOpen size={16} />,
    },
    {
      id: "a8",
      action: "Conducted live class: Advanced Figma Techniques",
      date: "Mar 17, 2025",
      time: "10:00 AM",
      icon: <Calendar size={16} />,
    },
    {
      id: "a9",
      action: "Provided feedback on Sarah Chen's project submission",
      date: "Mar 16, 2025",
      time: "5:30 PM",
      icon: <MessageSquare size={16} />,
    },
    {
      id: "a10",
      action: "Updated profile information",
      date: "Mar 15, 2025",
      time: "8:45 AM",
      icon: <Users size={16} />,
    },
    {
      id: "a11",
      action: "Created new module: User Testing Methods",
      date: "Mar 14, 2025",
      time: "2:00 PM",
      icon: <BookOpen size={16} />,
    },
    {
      id: "a12",
      action: "Uploaded reference materials for Web Design Fundamentals",
      date: "Mar 13, 2025",
      time: "11:20 AM",
      icon: <Camera size={16} />,
    },
  ];

  const [visibleActivities, setVisibleActivities] = useState(10);

  const handleLoadMore = () => {
    setVisibleActivities(prev => Math.min(prev + 10, allActivities.length));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allActivities.slice(0, visibleActivities).map((activity, index) => (
            <React.Fragment key={activity.id}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-muted-foreground">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.date} at {activity.time}
                  </p>
                </div>
              </div>
              {index < visibleActivities - 1 && index < allActivities.length - 1 && (
                <Separator className="my-2" />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {visibleActivities < allActivities.length && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="w-full sm:w-auto"
            >
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
