
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Video, X } from "lucide-react";
import { LiveClass } from "@/types/liveClass";
import ClassMaterials from "./ClassMaterials";
import ClassChat from "./ClassChat";
import ClassInfoItem from "@/components/dashboard/ClassInfoItem";

interface ClassDetailsProps {
  liveClass: LiveClass;
  onClose: () => void;
  onJoin: (id: string) => void;
  onWatchRecording: (recordingUrl: string) => void;
}

const ClassDetails: React.FC<ClassDetailsProps> = ({
  liveClass,
  onClose,
  onJoin,
  onWatchRecording,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  const getStatusBadgeClass = (status: LiveClass["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "live":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="glass-panel p-6 space-y-6 relative">
      <button 
        onClick={onClose}
        className="absolute right-6 top-6 text-muted-foreground hover:text-foreground"
      >
        <X size={24} />
      </button>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{liveClass.title}</h2>
        
        <div className="flex flex-wrap gap-2 items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(liveClass.status)}`}>
            {liveClass.status.charAt(0).toUpperCase() + liveClass.status.slice(1)}
          </span>
          
          {liveClass.status === "scheduled" && (
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onJoin(liveClass.id)}
            >
              Join Class
            </Button>
          )}
          
          {liveClass.status === "live" && (
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onJoin(liveClass.id)}
            >
              Join Now
            </Button>
          )}
          
          {liveClass.status === "completed" && liveClass.recordings && liveClass.recordings.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onWatchRecording(liveClass.recordings![0])}
            >
              <Video size={16} className="mr-2" />
              Watch Recording
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6 pt-4">
          <p className="text-muted-foreground">{liveClass.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <ClassInfoItem icon={Calendar} text={liveClass.date} />
            <ClassInfoItem icon={MapPin} text={`Classroom: ${liveClass.classroom}`} />
            <ClassInfoItem 
              icon={Clock} 
              text={`${liveClass.startTime} - ${liveClass.endTime}`} 
            />
            <ClassInfoItem 
              icon={Users} 
              text={`${liveClass.attendees || 0}/${liveClass.totalStudents || 0} Students`}
            />
          </div>
          
          {liveClass.meetingLink && (
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Meeting Link</h3>
              <div className="bg-secondary/30 p-3 rounded-md text-sm break-all">
                <a 
                  href={liveClass.meetingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {liveClass.meetingLink}
                </a>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="materials" className="pt-4">
          <ClassMaterials 
            materials={liveClass.materials || []} 
            classId={liveClass.id}
            isEditable={liveClass.status !== "completed"}
          />
        </TabsContent>
        
        <TabsContent value="chat" className="pt-4">
          <ClassChat 
            messages={liveClass.chat || []} 
            classId={liveClass.id}
            isLive={liveClass.status === "live"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassDetails;
