import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Folder, 
  FileVideo, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  BookOpen,
  Upload,
  BarChart,
  Check
} from "lucide-react";

import CourseModuleManagement from "@/components/courses/CourseModuleManagement";
import CourseVideoManagement from "@/components/courses/CourseVideoManagement";

interface Course {
  id: string;
  title: string;
  program: string;
  branch: string;
  description: string;
  students: number;
  modules: Module[];
  completion: string;
  views: number;
  mostWatched: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  assignments: string[];
}

interface Video {
  id: string;
  title: string;
  duration: string;
  moduleId: string;
  url: string;
  description: string;
  views: number;
  completions: number;
}

const Courses = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    program: "",
    branch: "",
    description: ""
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
  const [courseList, setCourseList] = useState<Course[]>([
    {
      id: "course1",
      title: "UI/UX Design Fundamentals",
      program: "UI/UX Design",
      branch: "N/A",
      description: "A comprehensive introduction to the fundamental principles of UI/UX design.",
      students: 42,
      modules: [
        {
          id: "module1",
          title: "Introduction to UI/UX Principles",
          description: "Learn the foundational principles of user-centered design.",
          videos: [
            {
              id: "video1",
              title: "Introduction to UI/UX Principles",
              moduleId: "module1",
              duration: "25:30",
              url: "https://example.com/videos/intro-uiux",
              description: "An overview of the key principles of UI/UX design.",
              views: 85,
              completions: 70
            },
            {
              id: "video2",
              title: "Understanding User-Centered Design",
              moduleId: "module1",
              duration: "18:45",
              url: "https://example.com/videos/user-centered",
              description: "A deep dive into user-centered design approaches.",
              views: 75,
              completions: 65
            }
          ],
          assignments: ["Assignment 1: Persona Creation"]
        },
        {
          id: "module2",
          title: "User Research Methods",
          description: "Explore various methods for gathering user insights.",
          videos: [
            {
              id: "video3",
              title: "User Research Fundamentals",
              moduleId: "module2",
              duration: "22:15",
              url: "https://example.com/videos/user-research",
              description: "Learn the fundamentals of user research.",
              views: 62,
              completions: 55
            }
          ],
          assignments: ["Assignment 2: Conduct User Interviews"]
        }
      ],
      completion: "120/210",
      views: 320,
      mostWatched: "Introduction to UI/UX Principles"
    },
    {
      id: "course2",
      title: "Advanced UI Patterns",
      program: "UI/UX Design",
      branch: "Interface Design",
      description: "Advanced exploration of modern UI patterns and their implementation.",
      students: 35,
      modules: [
        {
          id: "module3",
          title: "Responsive Design Techniques",
          description: "Master responsive design patterns for modern interfaces.",
          videos: [
            {
              id: "video4",
              title: "Responsive Design Fundamentals",
              moduleId: "module3",
              duration: "28:10",
              url: "https://example.com/videos/responsive-design",
              description: "An introduction to responsive design techniques.",
              views: 70,
              completions: 60
            }
          ],
          assignments: ["Assignment 3: Create a Responsive Layout"]
        }
      ],
      completion: "95/140",
      views: 278,
      mostWatched: "Responsive Design Techniques"
    }
  ]);

  useEffect(() => {
    if (location.state) {
      if (location.state.activeTab) {
        setActiveTab(location.state.activeTab);
      }
      if (location.state.selectedCourse) {
        setSelectedCourse(location.state.selectedCourse);
      }
    }
  }, [location.state]);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    setActiveTab("manage");
  };

  const handleCreateCourse = () => {
    if (!newCourse.title.trim() || !newCourse.program.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and program for the new course.",
        variant: "destructive"
      });
      return;
    }

    const newCourseItem: Course = {
      id: `course${Date.now()}`,
      title: newCourse.title,
      program: newCourse.program,
      branch: newCourse.branch || "N/A",
      description: newCourse.description,
      students: 0,
      modules: [],
      completion: "0/0",
      views: 0,
      mostWatched: "N/A"
    };

    setCourseList(prev => [...prev, newCourseItem]);
    setNewCourse({ title: "", program: "", branch: "", description: "" });
    setIsCreatingCourse(false);

    toast({
      title: "Course Created",
      description: `"${newCourseItem.title}" has been successfully created.`
    });
  };

  const handleEditCourse = () => {
    if (!editingCourse) return;

    if (!editingCourse.title.trim() || !editingCourse.program.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and program for the course.",
        variant: "destructive"
      });
      return;
    }

    setCourseList(prev => 
      prev.map(course => course.id === editingCourse.id ? editingCourse : course)
    );
    setEditingCourse(null);
    setIsEditingCourse(false);

    toast({
      title: "Course Updated",
      description: `"${editingCourse.title}" has been successfully updated.`
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourseList(prev => prev.filter(course => course.id !== courseId));
    setConfirmDelete(null);
    
    if (selectedCourse === courseId) {
      setSelectedCourse(null);
      setActiveTab("courses");
    }

    toast({
      title: "Course Deleted",
      description: "The course has been successfully deleted."
    });
  };

  const handleAddModule = (courseId: string, newModuleData: Omit<Module, 'id'>) => {
    const newModule: Module = {
      id: `module${Date.now()}`,
      ...newModuleData,
      videos: [],
      assignments: []
    };

    setCourseList(prev => 
      prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: [...course.modules, newModule]
          };
        }
        return course;
      })
    );
  };

  const handleEditModule = (courseId: string, updatedModule: Module) => {
    setCourseList(prev => 
      prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map(module => 
              module.id === updatedModule.id ? updatedModule : module
            )
          };
        }
        return course;
      })
    );
  };

  const handleDeleteModule = (courseId: string, moduleId: string) => {
    setCourseList(prev => 
      prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.filter(module => module.id !== moduleId)
          };
        }
        return course;
      })
    );
  };

  const handleAddVideo = (courseId: string, moduleId: string, newVideoData: Omit<Video, 'id'>) => {
    const newVideo: Video = {
      id: `video${Date.now()}`,
      ...newVideoData
    };

    setCourseList(prev => 
      prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map(module => {
              if (module.id === moduleId) {
                return {
                  ...module,
                  videos: [...module.videos, newVideo]
                };
              }
              return module;
            })
          };
        }
        return course;
      })
    );
  };

  const handleEditVideo = (courseId: string, updatedVideo: Video) => {
    setCourseList(prev => 
      prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map(module => {
              if (module.id === updatedVideo.moduleId) {
                return {
                  ...module,
                  videos: module.videos.map(video => 
                    video.id === updatedVideo.id ? updatedVideo : video
                  )
                };
              }
              return module;
            })
          };
        }
        return course;
      })
    );
  };

  const handleDeleteVideo = (courseId: string, videoId: string) => {
    setCourseList(prev => 
      prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map(module => ({
              ...module,
              videos: module.videos.filter(video => video.id !== videoId)
            }))
          };
        }
        return course;
      })
    );
  };

  const getVideosForCourse = (courseId: string): Video[] => {
    const course = courseList.find(c => c.id === courseId);
    if (!course) return [];
    
    return course.modules.flatMap(module => module.videos);
  };

  const selectedCourseData = selectedCourse ? courseList.find(c => c.id === selectedCourse) : null;

  return (
    <div className="container mx-auto space-y-8 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Pre-Recorded Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your courses, modules, videos and assignments</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Search courses..." 
              className="pl-10 bg-secondary/60 border border-border/50 rounded-lg p-2 text-sm w-full md:w-auto" 
            />
          </div>
          
          <Button onClick={() => setIsCreatingCourse(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Button>
        </div>
      </div>

      <div className="glass-panel">
        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid grid-cols-3 gap-2 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="courses" 
                className="flex items-center justify-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4 gap-2 text-sm font-medium rounded-lg data-[state=inactive]:bg-secondary/50 data-[state=inactive]:hover:bg-secondary/80"
              >
                <Folder size={16} />
                <span>All Courses</span>
              </TabsTrigger>
              <TabsTrigger 
                value="manage" 
                disabled={!selectedCourse}
                className="flex items-center justify-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4 gap-2 text-sm font-medium rounded-lg data-[state=inactive]:bg-secondary/50 data-[state=inactive]:hover:bg-secondary/80"
              >
                <FileVideo size={16} />
                <span>Course Details</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                disabled={!selectedCourse}
                className="flex items-center justify-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4 gap-2 text-sm font-medium rounded-lg data-[state=inactive]:bg-secondary/50 data-[state=inactive]:hover:bg-secondary/80"
              >
                <BarChart size={16} />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="courses" className="mt-0 space-y-4">
              <div className="overflow-hidden rounded-xl border border-border/50">
                <table className="w-full bg-white/70 backdrop-blur-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-secondary/30">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Course Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Program</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Branch</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Students</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Modules</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Completion</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Views</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {courseList.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                          No courses found. Create a new course to get started.
                        </td>
                      </tr>
                    ) : (
                      courseList.map((course, index) => (
                        <motion.tr 
                          key={course.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="hover:bg-secondary/40"
                        >
                          <td className="px-4 py-3 text-sm font-medium">{course.title}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{course.program}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{course.branch}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{course.students}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{course.modules.length}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{course.completion}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{course.views}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 text-primary"
                                onClick={() => handleCourseSelect(course.id)}
                              >
                                Manage
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground"
                                onClick={() => {
                                  setEditingCourse(course);
                                  setIsEditingCourse(true);
                                }}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive"
                                onClick={() => setConfirmDelete(course.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="manage" className="mt-0 space-y-6">
              {selectedCourseData && (
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/50">
                    <div>
                      <h3 className="text-xl font-medium">
                        {selectedCourseData.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Program: {selectedCourseData.program} · 
                        Branch: {selectedCourseData.branch} ·
                        Students: {selectedCourseData.students} ·
                        Total Views: {selectedCourseData.views}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("courses")}>
                        Back to Courses
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => {
                          setEditingCourse(selectedCourseData);
                          setIsEditingCourse(true);
                        }}
                      >
                        <Edit size={16} className="mr-2" />
                        Edit Course
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Course Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {selectedCourseData.description || "No description provided for this course."}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <CourseModuleManagement 
                      courseId={selectedCourseData.id}
                      modules={selectedCourseData.modules}
                      onModuleAdd={(newModule) => handleAddModule(selectedCourseData.id, newModule)}
                      onModuleEdit={(module) => handleEditModule(selectedCourseData.id, module)}
                      onModuleDelete={(moduleId) => handleDeleteModule(selectedCourseData.id, moduleId)}
                      onVideoAdd={(video, moduleId) => handleAddVideo(selectedCourseData.id, moduleId, video)}
                    />
                    
                    <CourseVideoManagement 
                      courseId={selectedCourseData.id}
                      videos={getVideosForCourse(selectedCourseData.id)}
                      modules={selectedCourseData.modules.map(m => ({ id: m.id, title: m.title }))}
                      onVideoEdit={(video) => handleEditVideo(selectedCourseData.id, video)}
                      onVideoDelete={(videoId) => handleDeleteVideo(selectedCourseData.id, videoId)}
                    />
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="mt-0 space-y-6">
              {selectedCourseData && (
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/50">
                    <div>
                      <h3 className="text-xl font-medium">
                        {selectedCourseData.title} - Analytics
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        View detailed analytics for this course
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Select defaultValue="last30days">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last7days">Last 7 days</SelectItem>
                          <SelectItem value="last30days">Last 30 days</SelectItem>
                          <SelectItem value="last90days">Last 90 days</SelectItem>
                          <SelectItem value="lifetime">Lifetime</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("manage")}>
                        Back to Course Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Total Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">{selectedCourseData.views}</span>
                          <span className="text-sm text-green-500">+14% vs last period</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Completion Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">78%</span>
                          <span className="text-sm text-green-500">+5% vs last period</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Avg. Engagement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">12m 30s</span>
                          <span className="text-sm text-red-500">-2% vs last period</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Popular Videos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-lg border border-border/50">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-secondary/30">
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Video</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Duration</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Views</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Completions</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Avg. Watch Time</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {getVideosForCourse(selectedCourseData.id)
                              .sort((a, b) => b.views - a.views)
                              .slice(0, 5)
                              .map((video, index) => (
                                <tr key={video.id} className="hover:bg-secondary/20">
                                  <td className="px-4 py-3 text-sm">{video.title}</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{video.duration}</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">{video.views}</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{video.completions}</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                                    {Math.floor(Math.random() * 20) + 5}m {Math.floor(Math.random() * 60)}s
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <Dialog open={isCreatingCourse} onOpenChange={setIsCreatingCourse}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Add a new pre-recorded course to your teaching portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="course-title">Course Title</Label>
              <Input
                id="course-title"
                placeholder="Enter course title"
                value={newCourse.title}
                onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-program">Program</Label>
                <Input
                  id="course-program"
                  placeholder="e.g. UI/UX Design"
                  value={newCourse.program}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, program: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-branch">Branch (Optional)</Label>
                <Input
                  id="course-branch"
                  placeholder="e.g. Interface Design"
                  value={newCourse.branch}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, branch: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                placeholder="Enter course description"
                value={newCourse.description}
                onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingCourse(false)}>Cancel</Button>
            <Button onClick={handleCreateCourse}>
              <Plus size={16} className="mr-2" />
              Create Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditingCourse} onOpenChange={setIsEditingCourse}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update course information and settings.
            </DialogDescription>
          </DialogHeader>
          {editingCourse && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-course-title">Course Title</Label>
                <Input
                  id="edit-course-title"
                  placeholder="Enter course title"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-course-program">Program</Label>
                  <Input
                    id="edit-course-program"
                    placeholder="e.g. UI/UX Design"
                    value={editingCourse.program}
                    onChange={(e) => setEditingCourse(prev => prev ? { ...prev, program: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-course-branch">Branch</Label>
                  <Input
                    id="edit-course-branch"
                    placeholder="e.g. Interface Design"
                    value={editingCourse.branch}
                    onChange={(e) => setEditingCourse(prev => prev ? { ...prev, branch: e.target.value } : null)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-course-description">Description</Label>
                <Textarea
                  id="edit-course-description"
                  placeholder="Enter course description"
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingCourse(false)}>Cancel</Button>
            <Button onClick={handleEditCourse}>
              <Check size={16} className="mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone and will remove all modules and videos associated with this course.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={() => confirmDelete && handleDeleteCourse(confirmDelete)}
            >
              <Trash2 size={16} className="mr-2" />
              Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Courses;
