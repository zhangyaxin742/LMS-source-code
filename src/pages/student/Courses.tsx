
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Calendar, BookOpen, Video, FileText, ChevronRight, Search, FileImage, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for student courses
const enrolledCourses = [
  {
    id: 1,
    title: "UI/UX Design Fundamentals",
    progress: 65,
    moduleCount: 8,
    completedModules: 5,
    instructor: "Thomas Anderson",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    modules: [
      {
        id: "module-1",
        title: "Introduction to UI/UX",
        progress: 100,
        topics: [
          { id: "topic-1", title: "UI vs UX", type: "video", completed: true, duration: "15 min" },
          { id: "topic-2", title: "Design Thinking", type: "video", completed: true, duration: "20 min" },
          { id: "topic-3", title: "User-Centered Design", type: "video", completed: true, duration: "18 min" }
        ]
      },
      {
        id: "module-2",
        title: "User Research",
        progress: 50,
        topics: [
          { id: "topic-4", title: "Research Methods", type: "video", completed: true, duration: "25 min" },
          { id: "topic-5", title: "User Personas", type: "pdf", completed: false, duration: "18 min" },
          { id: "topic-6", title: "User Journey Mapping", type: "presentation", completed: false, duration: "22 min" }
        ]
      }
    ],
    assignments: [
      { id: "assign-1", title: "Design Analysis", dueDate: "Oct 15", status: "pending" },
      { id: "assign-2", title: "User Research Plan", dueDate: "Oct 22", status: "pending" }
    ]
  },
  {
    id: 2,
    title: "Design Systems",
    progress: 30,
    moduleCount: 6,
    completedModules: 2,
    instructor: "Emily Chen",
    thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    modules: [
      {
        id: "module-3",
        title: "Design System Basics",
        progress: 100,
        topics: [
          { id: "topic-7", title: "What is a Design System", type: "video", completed: true, duration: "15 min" },
          { id: "topic-8", title: "Benefits of Design Systems", type: "document", completed: true, duration: "12 min" }
        ]
      },
      {
        id: "module-4",
        title: "Component Libraries",
        progress: 25,
        topics: [
          { id: "topic-9", title: "Atomic Design", type: "video", completed: true, duration: "20 min" },
          { id: "topic-10", title: "Building Components", type: "video", completed: false, duration: "25 min" },
          { id: "topic-11", title: "Documentation", type: "link", completed: false, duration: "18 min" },
          { id: "topic-12", title: "Implementation", type: "video", completed: false, duration: "22 min" }
        ]
      }
    ],
    assignments: [
      { id: "assign-3", title: "Component Library Draft", dueDate: "Oct 18", status: "pending" },
      { id: "assign-4", title: "Style Guide Creation", dueDate: "Oct 29", status: "pending" }
    ]
  }
];

const StudentCourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("curriculum");
  
  const handleCourseSelect = (courseId: number) => {
    setSelectedCourse(courseId === selectedCourse ? null : courseId);
    setExpandedModule(null);
  };
  
  const handleModuleToggle = (moduleId: string) => {
    setExpandedModule(moduleId === expandedModule ? null : moduleId);
  };
  
  const handleViewContent = (courseId: number, topicId: string) => {
    console.log(`View content: Course ${courseId}, Topic ${topicId}`);
    // Updated to use the video route instead of content route
    navigate(`/student-courses/video/${topicId}`);
  };

  const handleViewAssignment = (assignmentId: string) => {
    console.log(`View assignment: ${assignmentId}`);
    navigate(`/student/assignment/${assignmentId}`);
  };
  
  const filteredEnrolledCourses = enrolledCourses.filter(
    course => course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getCurrentCourse = () => {
    return enrolledCourses.find(course => course.id === selectedCourse) || null;
  };
  
  const currentCourse = getCurrentCourse();

  const getMaterialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "presentation":
        return <FileImage className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "link":
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Courses</h1>
        <p className="text-muted-foreground">Access your course curriculum and track your progress</p>
      </div>

      <div className="relative flex-grow mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {selectedCourse === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrolledCourses.map((course) => (
            <Card 
              key={course.id} 
              className="hover:shadow-md transition-shadow overflow-hidden"
              onClick={() => handleCourseSelect(course.id)}
            >
              <div className="h-40 bg-gradient-to-r from-primary/30 to-primary/10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-none">
                    {course.progress}% Complete
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                <CardDescription>Instructor: {course.instructor}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>{course.completedModules}/{course.moduleCount} modules</span>
                    <span>{course.progress}% complete</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} className="text-primary" />
                    <span>{course.moduleCount} Modules</span>
                  </div>
                  
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : currentCourse ? (
        <div className="space-y-6">
          <Card>
            <div className="md:flex">
              <div className="md:w-64 h-40 md:h-auto bg-gradient-to-r from-primary/30 to-primary/10 relative"></div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mb-2 -ml-2" 
                      onClick={() => setSelectedCourse(null)}
                    >
                      <ChevronRight size={16} className="rotate-180 mr-1" />
                      Back to Courses
                    </Button>
                    <h2 className="text-2xl font-bold">{currentCourse.title}</h2>
                    <p className="text-muted-foreground">Instructor: {currentCourse.instructor}</p>
                  </div>
                  
                  <Badge variant="outline" className="bg-primary/10 text-primary w-fit">
                    {currentCourse.progress}% Complete
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${currentCourse.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                    <span>{currentCourse.completedModules}/{currentCourse.moduleCount} modules completed</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeTab === "curriculum" ? "default" : "outline"}
                onClick={() => setActiveTab("curriculum")}
              >
                Curriculum
              </Button>
              <Button 
                variant={activeTab === "assignments" ? "default" : "outline"}
                onClick={() => setActiveTab("assignments")}
              >
                Assignments ({currentCourse.assignments.length})
              </Button>
            </div>
            
            {activeTab === "curriculum" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Course Curriculum</h3>
                
                {currentCourse.modules.map((module) => (
                  <Card key={module.id} className="overflow-hidden">
                    <CardHeader 
                      className="pb-2 cursor-pointer hover:bg-secondary/20 transition-colors"
                      onClick={() => handleModuleToggle(module.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription>{module.topics.length} topics</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={module.progress === 100 ? "bg-green-100 text-green-600" : ""}>
                            {module.progress}% Complete
                          </Badge>
                          <ChevronRight 
                            size={18} 
                            className={`transition-transform ${expandedModule === module.id ? 'rotate-90' : ''}`} 
                          />
                        </div>
                      </div>
                    </CardHeader>
                    
                    {expandedModule === module.id && (
                      <CardContent>
                        <div className="space-y-3 pt-2 border-t mt-2">
                          {module.topics.map((topic) => (
                            <div 
                              key={topic.id} 
                              className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${topic.completed ? 'bg-green-100 text-green-600' : 'bg-secondary'}`}>
                                  {getMaterialIcon(topic.type)}
                                </div>
                                <div>
                                  <p className="font-medium">{topic.title}</p>
                                  <p className="text-xs text-muted-foreground capitalize">{topic.type} • {topic.duration}</p>
                                </div>
                              </div>
                              <Button 
                                variant={topic.completed ? "outline" : "default"}
                                size="sm"
                                onClick={() => handleViewContent(currentCourse.id, topic.id)}
                              >
                                {topic.completed ? "Review" : "Start"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
            
            {activeTab === "assignments" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Course Assignments</h3>
                
                <div className="space-y-4">
                  {currentCourse.assignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:bg-secondary/5 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <Badge 
                            variant={assignment.status === "completed" ? "outline" : "default"}
                            className={assignment.status === "completed" ? "bg-green-100 text-green-600" : ""}
                          >
                            {assignment.status === "completed" ? "Completed" : "Due " + assignment.dueDate}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex justify-end">
                          <Button 
                            onClick={() => handleViewAssignment(assignment.id)}
                          >
                            View Assignment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StudentCourses;
