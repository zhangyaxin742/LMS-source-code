
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  UserRound, 
  Calendar, 
  BookOpen, 
  Clock, 
  Users,
  Bell
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for student classrooms
const classrooms = [
  {
    id: 1,
    title: "UI/UX Design Workshop",
    instructorName: "Thomas Anderson",
    studentsCount: 28,
    moduleCount: 6,
    completedModules: 4,
    nextSession: "Tomorrow, 3:00 PM",
    assignments: 3,
    completedAssignments: 1
  },
  {
    id: 2,
    title: "Design Systems Fundamentals",
    instructorName: "Emily Chen",
    studentsCount: 22,
    moduleCount: 8,
    completedModules: 2,
    nextSession: "Thursday, 5:00 PM",
    assignments: 4,
    completedAssignments: 1
  },
];

// Mock data for upcoming classrooms
const upcomingClassrooms = [
  {
    id: 3,
    title: "Advanced Prototyping Techniques",
    instructorName: "Michael Rodriguez",
    studentsCount: 18,
    startDate: "September 15, 2023",
    duration: "8 weeks"
  },
  {
    id: 4,
    title: "User Research Methods",
    instructorName: "Sophia Williams",
    studentsCount: 24,
    startDate: "October 5, 2023",
    duration: "6 weeks"
  },
];

const StudentClassrooms = () => {
  const navigate = useNavigate();

  const handleEnterClassroom = (classroomId: number) => {
    navigate(`/student-classroom/${classroomId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Classrooms</h1>
        <p className="text-muted-foreground">Explore your current classrooms and join upcoming ones</p>
      </div>

      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="enrolled">My Classrooms</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Classrooms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <Card key={classroom.id} className="hover:shadow-md transition-shadow flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle>{classroom.title}</CardTitle>
                  <CardDescription>Instructor: {classroom.instructorName}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(classroom.completedModules / classroom.moduleCount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>{classroom.completedModules}/{classroom.moduleCount} modules</span>
                      <span>{Math.round((classroom.completedModules / classroom.moduleCount) * 100)}% complete</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="flex items-center gap-2">
                      <UserRound size={16} className="text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">Students</p>
                        <p className="text-muted-foreground">{classroom.studentsCount} enrolled</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">Next Session</p>
                        <p className="text-muted-foreground">{classroom.nextSession}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">Assignments</p>
                        <p className="text-muted-foreground">
                          {classroom.completedAssignments}/{classroom.assignments} completed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button 
                    className="w-full bg-primary text-primary-foreground"
                    onClick={() => handleEnterClassroom(classroom.id)}
                  >
                    Enter Classroom
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingClassrooms.map((classroom) => (
              <Card key={classroom.id} className="hover:shadow-md transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{classroom.title}</CardTitle>
                      <CardDescription>Instructor: {classroom.instructorName}</CardDescription>
                    </div>
                    <Badge>
                      Upcoming
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      <span className="text-sm">{classroom.studentsCount} students enrolled</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span className="text-sm">Starts: {classroom.startDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span className="text-sm">Duration: {classroom.duration}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full">
                    Join Classroom
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentClassrooms;
