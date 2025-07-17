
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Video, Calendar, Clock, Users, Search, CalendarDays,
  CalendarClock, UserRound, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for live classes
const upcomingClasses = [
  {
    id: 1,
    title: "Advanced Wireframing Techniques",
    course: "UI/UX Design Fundamentals",
    startDate: "2023-09-15T15:00:00",
    duration: 60,
    instructor: "Thomas Anderson",
    participants: 18,
    status: "scheduled",
    description: "Learn advanced wireframing techniques that will help you create more detailed and interactive prototypes.",
    materialsPrepared: true
  },
  {
    id: 2,
    title: "Creating Component Libraries",
    course: "Design Systems",
    startDate: "2023-09-17T17:00:00",
    duration: 90,
    instructor: "Emily Chen",
    participants: 24,
    status: "scheduled",
    description: "Explore how to create and maintain component libraries for efficient design system implementation.",
    materialsPrepared: false
  },
];

const pastClasses = [
  {
    id: 3,
    title: "User Interface Principles",
    course: "UI/UX Design Fundamentals",
    date: "2023-09-08T14:00:00",
    duration: 60,
    instructor: "Thomas Anderson",
    participants: 22,
    status: "completed",
    recording: "https://example.com/recordings/user-interface-principles",
    materials: ["slides.pdf", "exercise-files.zip"]
  },
  {
    id: 4,
    title: "Design System Foundations",
    course: "Design Systems",
    date: "2023-09-03T16:00:00",
    duration: 75,
    instructor: "Emily Chen",
    participants: 19,
    status: "completed",
    recording: "https://example.com/recordings/design-system-foundations",
    materials: ["slides.pdf", "reference-guide.pdf"]
  },
];

const StudentLiveClasses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  
  const filterClasses = (classes: any[]) => {
    return classes.filter(classItem => 
      (classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       classItem.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
       classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (courseFilter === "all" || classItem.course === courseFilter)
    );
  };
  
  const filteredUpcoming = filterClasses(upcomingClasses);
  const filteredPast = filterClasses(pastClasses);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const getTimeRemaining = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = start.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return "Starting now";
    }
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Live Classes</h1>
        <p className="text-muted-foreground">Attend virtual classes and access recordings</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="UI/UX Design Fundamentals">UI/UX Design Fundamentals</SelectItem>
            <SelectItem value="Design Systems">Design Systems</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming ({filteredUpcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past Classes ({filteredPast.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-6">
          {filteredUpcoming.length > 0 ? (
            filteredUpcoming.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <CardTitle>{classItem.title}</CardTitle>
                      <CardDescription>{classItem.course}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      In {getTimeRemaining(classItem.startDate)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {classItem.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-muted-foreground" />
                      <div className="text-sm">
                        <p>{formatDate(classItem.startDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <div className="text-sm">
                        <p>{formatTime(classItem.startDate)}</p>
                        <p className="text-muted-foreground">{classItem.duration} minutes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <UserRound size={16} className="text-muted-foreground" />
                      <div className="text-sm">
                        <p>{classItem.instructor}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      <div className="text-sm">
                        <p>{classItem.participants} participants</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button variant="outline">Add to Calendar</Button>
                  <Button>
                    <Video className="mr-2 h-4 w-4" />
                    Join Class
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No upcoming classes found</h3>
              <p className="text-muted-foreground">
                {searchTerm || courseFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "There are no upcoming classes scheduled at this time."}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-6">
          {filteredPast.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPast.map((classItem) => (
                <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{classItem.title}</CardTitle>
                    <CardDescription>{classItem.course}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarClock size={16} className="text-muted-foreground" />
                          <span className="text-sm">{formatDate(classItem.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-muted-foreground" />
                          <span className="text-sm">{formatTime(classItem.date)} ({classItem.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserRound size={16} className="text-muted-foreground" />
                          <span className="text-sm">{classItem.instructor}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Materials:</p>
                        <div className="flex flex-wrap gap-2">
                          {classItem.materials.map((material, idx) => (
                            <Badge key={idx} variant="outline" className="py-1">
                              <BookOpen size={12} className="mr-1" />
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Download Materials
                    </Button>
                    <Button className="w-full sm:w-auto">
                      <Video className="mr-2 h-4 w-4" />
                      Watch Recording
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Video size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No past classes found</h3>
              <p className="text-muted-foreground">
                {searchTerm || courseFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "You haven't attended any classes yet."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentLiveClasses;
