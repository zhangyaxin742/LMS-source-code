
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Plus, Search, Video, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LiveClass } from "@/types/liveClass";
import ClassDetails from "@/components/live-classes/ClassDetails";
import CreateClassDialog from "@/components/live-classes/CreateClassDialog";
import RescheduleClassDialog from "@/components/live-classes/RescheduleClassDialog";
import { toast } from "sonner";
import { Module } from "@/components/classrooms/tabs/modules/types";

const LiveClasses = () => {
  // Mock modules data
  const [modules, setModules] = useState<Module[]>([
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
    },
    {
      id: "mod-2",
      title: "UX Research Methods",
      description: "Explore different methods of UX research",
      topics: [
        {
          id: "topic-3",
          title: "User Interviews",
          description: "Learn to conduct effective user interviews",
          duration: "60 mins",
          isCompleted: false,
        },
        {
          id: "topic-4",
          title: "Usability Testing",
          description: "Methods for conducting usability tests",
          duration: "90 mins",
          isCompleted: false,
        }
      ],
      isCompleted: false
    }
  ]);

  const [upcomingClasses, setUpcomingClasses] = useState<LiveClass[]>([
    {
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
      topicId: "topic-1"
    },
    {
      id: "class-2",
      title: "Usability Testing Methods",
      date: "October 22, 2023",
      startTime: "2:00 PM",
      endTime: "3:30 PM",
      classroom: "Virtual Lab",
      classroomId: "vlab-002",
      description: "Explore different methods for conducting usability tests and learn how to analyze the results.",
      status: "scheduled",
      attendees: 15,
      totalStudents: 28,
      materials: [],
      chat: [],
    },
    {
      id: "class-3",
      title: "Interactive Prototyping Workshop",
      date: "October 29, 2023",
      startTime: "11:00 AM",
      endTime: "1:00 PM",
      classroom: "Design Workshop",
      classroomId: "dw-003",
      description: "Hands-on workshop on creating interactive prototypes using popular design tools.",
      status: "scheduled",
      attendees: 23,
      totalStudents: 28,
      materials: [
        {
          id: "mat-1",
          name: "Prototyping Tools Guide",
          url: "https://example.com/prototyping-guide.pdf",
          type: "document",
          createdAt: "2023-10-20T14:30:00Z",
        }
      ],
      chat: [],
      moduleId: "mod-2",
      topicId: "topic-4"
    },
  ]);

  const [pastClasses, setPastClasses] = useState<LiveClass[]>([
    {
      id: "class-past-1",
      title: "Intro to Wireframing",
      date: "October 8, 2023",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      classroom: "UX Design Studio",
      classroomId: "uxd-001",
      description: "Introduction to wireframing techniques and best practices.",
      status: "completed",
      attendees: 24,
      totalStudents: 28,
      recordings: ["https://example.com/recordings/wireframing-intro"],
      materials: [],
      chat: [],
    },
    {
      id: "class-past-2",
      title: "Color Theory in UI Design",
      date: "October 1, 2023",
      startTime: "2:00 PM",
      endTime: "3:15 PM",
      classroom: "Virtual Lab",
      classroomId: "vlab-002",
      description: "Understanding color theory and its application in UI design.",
      status: "completed",
      attendees: 26,
      totalStudents: 28,
      recordings: ["https://example.com/recordings/color-theory"],
      materials: [],
      chat: [],
    },
  ]);

  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<LiveClass | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [classToReschedule, setClassToReschedule] = useState<LiveClass | null>(null);

  const filteredUpcomingClasses = upcomingClasses.filter((liveClass) =>
    liveClass.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPastClasses = pastClasses.filter((liveClass) =>
    liveClass.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClass = (classData: Partial<LiveClass>) => {
    const newClass: LiveClass = {
      id: `class-${Date.now()}`,
      ...classData,
      status: "scheduled",
      attendees: 0,
      materials: [],
      chat: [],
    } as LiveClass;

    setUpcomingClasses([newClass, ...upcomingClasses]);
    setShowCreateDialog(false);
    toast.success("Live class scheduled successfully");
  };

  const handleRescheduleClass = (classData: Partial<LiveClass>) => {
    if (!classData.id) return;

    const updatedClasses = upcomingClasses.map(liveClass => 
      liveClass.id === classData.id 
        ? { ...liveClass, ...classData } 
        : liveClass
    );

    setUpcomingClasses(updatedClasses);
    setShowRescheduleDialog(false);
    toast.success("Live class rescheduled successfully");
  };

  const handleOpenReschedule = (liveClass: LiveClass) => {
    setClassToReschedule(liveClass);
    setShowRescheduleDialog(true);
  };

  const handleJoinClass = (classId: string) => {
    const classToJoin = [...upcomingClasses, ...pastClasses].find(
      (c) => c.id === classId
    );

    if (classToJoin?.meetingLink) {
      window.open(classToJoin.meetingLink, "_blank");
    } else {
      toast.info("Meeting link will be available when the class starts");
    }
  };

  const handleWatchRecording = (recordingUrl: string) => {
    window.open(recordingUrl, "_blank");
  };

  const getModuleTopicNames = (liveClass: LiveClass) => {
    if (!liveClass.moduleId) return null;
    
    const module = modules.find(m => m.id === liveClass.moduleId);
    if (!module) return null;
    
    let result = `Module: ${module.title}`;
    
    if (liveClass.topicId) {
      const topic = module.topics.find(t => t.id === liveClass.topicId);
      if (topic) {
        result += ` | Topic: ${topic.title}`;
      }
    }
    
    return result;
  };

  return (
    <div className="container mx-auto space-y-8 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Live Classes</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage your live class sessions</p>
        </div>
        
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus size={16} className="mr-2" />
          Schedule Live Class
        </Button>
      </div>

      {selectedClass ? (
        <ClassDetails 
          liveClass={selectedClass} 
          onClose={() => setSelectedClass(null)} 
          onJoin={handleJoinClass}
          onWatchRecording={handleWatchRecording}
        />
      ) : (
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
              <TabsTrigger value="past">Past Classes</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="upcoming" className="space-y-4">
            {filteredUpcomingClasses.length === 0 ? (
              <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No upcoming classes</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {searchQuery 
                    ? "No classes match your search criteria. Try a different search term." 
                    : "You don't have any upcoming classes scheduled. Create a new live class to get started."}
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus size={16} className="mr-2" />
                  Schedule Live Class
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUpcomingClasses.map((liveClass, index) => (
                  <motion.div
                    key={liveClass.id}
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-xl">
                        <span className="text-2xl font-bold">
                          {liveClass.date.split(" ")[1].replace(",", "")}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {liveClass.date.split(" ")[0]}
                        </span>
                      </div>
                      
                      <div className="flex-grow space-y-3">
                        <h3 className="text-lg font-semibold">{liveClass.title}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                          <div className="flex items-center text-sm">
                            <Clock size={16} className="text-muted-foreground mr-2" />
                            <span>{liveClass.startTime} - {liveClass.endTime}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin size={16} className="text-muted-foreground mr-2" />
                            <span>Classroom: {liveClass.classroom}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar size={16} className="text-muted-foreground mr-2" />
                            <span>{liveClass.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users size={16} className="text-muted-foreground mr-2" />
                            <span>{liveClass.attendees}/{liveClass.totalStudents} Students</span>
                          </div>
                        </div>
                        
                        {getModuleTopicNames(liveClass) && (
                          <div className="text-sm text-muted-foreground">
                            {getModuleTopicNames(liveClass)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-shrink-0 flex md:flex-col gap-3 w-full md:w-auto">
                        <Button 
                          className="flex-1 md:w-full"
                          onClick={() => handleJoinClass(liveClass.id)}
                        >
                          Start Session
                        </Button>
                        <Button 
                          className="flex-1 md:w-full"
                          variant="secondary"
                          onClick={() => setSelectedClass(liveClass)}
                        >
                          View Details
                        </Button>
                        <Button 
                          className="flex-1 md:w-full"
                          variant="outline"
                          onClick={() => handleOpenReschedule(liveClass)}
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {filteredPastClasses.length === 0 ? (
              <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No past classes</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {searchQuery 
                    ? "No classes match your search criteria. Try a different search term." 
                    : "You don't have any past classes. Once you complete a live class, it will appear here."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPastClasses.map((liveClass, index) => (
                  <motion.div
                    key={liveClass.id}
                    className="glass-card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <div className="space-y-1 flex-grow">
                      <h3 className="text-lg font-medium">{liveClass.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{liveClass.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{liveClass.startTime} - {liveClass.endTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          <span>{liveClass.attendees}/{liveClass.totalStudents} attended</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedClass(liveClass)}
                      >
                        View Details
                      </Button>
                      
                      {liveClass.recordings && liveClass.recordings.length > 0 && (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleWatchRecording(liveClass.recordings![0])}
                        >
                          <Video size={14} className="mr-2" />
                          Watch Recording
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="glass-panel p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold">Quick Tips</h2>
          
          <div className="space-y-3">
            {[
              {
                title: "Prepare Your Equipment",
                description: "Test your camera and microphone before starting the session.",
                icon: <Video size={16} className="text-primary" />,
              },
              {
                title: "Take Attendance",
                description: "Remember to mark attendance during or after the session.",
                icon: <Users size={16} className="text-primary" />,
              },
              {
                title: "Record Your Sessions",
                description: "Enable recording for students who couldn't attend live.",
                icon: <Video size={16} className="text-primary" />,
              },
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                className="glass-card p-4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + 0.1 * index }}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{tip.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          className="glass-panel p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold">Class Statistics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">{upcomingClasses.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming Classes</div>
            </div>
            <div className="glass-card p-4 flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">{pastClasses.length}</div>
              <div className="text-sm text-muted-foreground">Completed Classes</div>
            </div>
            <div className="glass-card p-4 flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">
                {Math.round(
                  pastClasses.reduce((acc, curr) => {
                    return acc + ((curr.attendees || 0) / (curr.totalStudents || 1));
                  }, 0) / Math.max(pastClasses.length, 1) * 100
                )}%
              </div>
              <div className="text-sm text-muted-foreground">Avg. Attendance</div>
            </div>
            <div className="glass-card p-4 flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">
                {pastClasses.reduce((acc, curr) => {
                  return acc + (curr.recordings?.length || 0);
                }, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Recordings</div>
            </div>
          </div>
        </motion.div>
      </div>

      <CreateClassDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
        onCreateClass={handleCreateClass}
        modules={modules}
      />

      {classToReschedule && (
        <RescheduleClassDialog 
          open={showRescheduleDialog} 
          onOpenChange={setShowRescheduleDialog} 
          onReschedule={handleRescheduleClass}
          liveClass={classToReschedule}
          modules={modules}
        />
      )}
    </div>
  );
};

export default LiveClasses;
