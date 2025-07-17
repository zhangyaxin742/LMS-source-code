
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  FileText, 
  Users, 
  Calendar, 
  Clock, 
  BarChart2, 
  BellRing, 
  Users2,
  Plus,
  Search,
  CheckSquare,
  X,
  DownloadCloud,
  Upload,
  MessageSquare,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import ClassroomCard from "@/components/classroom/ClassroomCard";

// Define types
interface Classroom {
  id: string;
  title: string;
  program: string;
  students: Student[];
  startDate: string;
  materials: Material[];
  announcements: Announcement[];
  attendanceRecords: AttendanceRecord[];
  group?: string;
  upcoming?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  attendance: string;
  avatar?: string;
}

interface Material {
  id: string;
  title: string;
  type: string;
  size: string;
  date: string;
  url?: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  author: string;
}

interface AttendanceRecord {
  id: string;
  date: string;
  students: { studentId: string; status: 'present' | 'absent' | 'late' }[];
}

interface Group {
  id: string;
  name: string;
  studentIds: string[];
}

const Classroom = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
  const [isCreatingClassroom, setIsCreatingClassroom] = useState(false);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [newAttendance, setNewAttendance] = useState<{
    date: string;
    students: { studentId: string; status: 'present' | 'absent' | 'late' }[];
  }>({
    date: new Date().toISOString().split('T')[0],
    students: []
  });
  
  const [newClassroom, setNewClassroom] = useState({
    title: "",
    program: "",
    startDate: new Date().toISOString().split('T')[0]
  });
  
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: ""
  });
  
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    type: "PDF",
    size: "",
    url: ""
  });
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: ""
  });
  
  const [newGroup, setNewGroup] = useState({
    name: "",
    studentIds: [] as string[]
  });
  
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: "classroom1",
      title: "UI/UX Design Fundamentals",
      program: "UI/UX Design",
      startDate: "Sept 15, 2023",
      students: [
        { 
          id: "student1", 
          name: "Alex Johnson", 
          email: "alex.johnson@example.com", 
          progress: 80, 
          attendance: "90%" 
        },
        { 
          id: "student2", 
          name: "Maria Garcia", 
          email: "maria.garcia@example.com", 
          progress: 95, 
          attendance: "100%" 
        },
        { 
          id: "student3", 
          name: "Emma Thompson", 
          email: "emma.thompson@example.com", 
          progress: 65, 
          attendance: "85%" 
        },
      ],
      materials: [
        { 
          id: "material1", 
          title: "Lecture Slides – UI/UX Basics", 
          type: "PDF", 
          size: "2.4 MB", 
          date: "Oct 1, 2023" 
        },
        { 
          id: "material2", 
          title: "Visual Design Principles", 
          type: "PDF", 
          size: "3.1 MB", 
          date: "Oct 3, 2023" 
        },
        { 
          id: "material3", 
          title: "Wireframing Examples", 
          type: "ZIP", 
          size: "15.2 MB", 
          date: "Oct 5, 2023" 
        },
      ],
      announcements: [
        {
          id: "announcement1",
          title: "Welcome to UI/UX Design Fundamentals",
          message: "Welcome to the class! I'm excited to have you all in this course. We'll be covering the fundamentals of UI/UX design over the next few weeks.",
          date: "Sept 15, 2023",
          author: "Thomas Anderson"
        }
      ],
      attendanceRecords: [
        {
          id: "attendance1",
          date: "Sept 16, 2023",
          students: [
            { studentId: "student1", status: "present" },
            { studentId: "student2", status: "present" },
            { studentId: "student3", status: "present" }
          ]
        },
        {
          id: "attendance2",
          date: "Sept 23, 2023",
          students: [
            { studentId: "student1", status: "present" },
            { studentId: "student2", status: "present" },
            { studentId: "student3", status: "absent" }
          ]
        }
      ],
      upcoming: "Oct 15, 2023"
    },
    {
      id: "classroom2",
      title: "Advanced UI Patterns",
      program: "UI/UX Design",
      startDate: "Oct 3, 2023",
      students: [
        { 
          id: "student4", 
          name: "James Wilson", 
          email: "james.wilson@example.com", 
          progress: 75, 
          attendance: "95%" 
        },
        { 
          id: "student5", 
          name: "Sophia Martinez", 
          email: "sophia.martinez@example.com", 
          progress: 88, 
          attendance: "92%" 
        }
      ],
      materials: [
        { 
          id: "material4", 
          title: "Advanced UI Patterns Guide", 
          type: "PDF", 
          size: "4.7 MB", 
          date: "Oct 5, 2023" 
        }
      ],
      announcements: [],
      attendanceRecords: [
        {
          id: "attendance3",
          date: "Oct 4, 2023",
          students: [
            { studentId: "student4", status: "present" },
            { studentId: "student5", status: "present" }
          ]
        }
      ],
      upcoming: "Oct 17, 2023"
    }
  ]);

  const handleClassroomSelect = (classroomId: string) => {
    setSelectedClassroom(classroomId);
    setActiveTab("students");
  };

  const handleCreateClassroom = () => {
    if (!newClassroom.title.trim() || !newClassroom.program.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and program for the new classroom.",
        variant: "destructive"
      });
      return;
    }

    const newClassroomItem: Classroom = {
      id: `classroom${Date.now()}`,
      title: newClassroom.title,
      program: newClassroom.program,
      startDate: newClassroom.startDate,
      students: [],
      materials: [],
      announcements: [],
      attendanceRecords: []
    };

    setClassrooms(prev => [...prev, newClassroomItem]);
    setNewClassroom({
      title: "",
      program: "",
      startDate: new Date().toISOString().split('T')[0]
    });
    setIsCreatingClassroom(false);

    toast({
      title: "Classroom Created",
      description: `"${newClassroomItem.title}" has been successfully created.`
    });
  };

  const handleAddStudent = () => {
    if (!selectedClassroom || !newStudent.name.trim() || !newStudent.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and email for the new student.",
        variant: "destructive"
      });
      return;
    }

    const newStudentItem: Student = {
      id: `student${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      progress: 0,
      attendance: "0%"
    };

    setClassrooms(prev => prev.map(classroom => {
      if (classroom.id === selectedClassroom) {
        return {
          ...classroom,
          students: [...classroom.students, newStudentItem]
        };
      }
      return classroom;
    }));

    setNewStudent({
      name: "",
      email: ""
    });
    setIsAddingStudent(false);

    toast({
      title: "Student Added",
      description: `${newStudentItem.name} has been added to the classroom.`
    });
  };

  const handleRemoveStudent = (studentId: string) => {
    if (!selectedClassroom) return;

    setClassrooms(prev => prev.map(classroom => {
      if (classroom.id === selectedClassroom) {
        return {
          ...classroom,
          students: classroom.students.filter(student => student.id !== studentId)
        };
      }
      return classroom;
    }));

    toast({
      title: "Student Removed",
      description: "Student has been removed from the classroom."
    });
  };

  const handleAddMaterial = () => {
    if (!selectedClassroom || !newMaterial.title.trim() || !newMaterial.type) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and type for the new material.",
        variant: "destructive"
      });
      return;
    }

    const newMaterialItem: Material = {
      id: `material${Date.now()}`,
      title: newMaterial.title,
      type: newMaterial.type,
      size: newMaterial.size || "N/A",
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      url: newMaterial.url
    };

    setClassrooms(prev => prev.map(classroom => {
      if (classroom.id === selectedClassroom) {
        return {
          ...classroom,
          materials: [...classroom.materials, newMaterialItem]
        };
      }
      return classroom;
    }));

    setNewMaterial({
      title: "",
      type: "PDF",
      size: "",
      url: ""
    });
    setIsAddingMaterial(false);

    toast({
      title: "Material Added",
      description: `"${newMaterialItem.title}" has been added to the classroom.`
    });
  };

  const handleCreateAnnouncement = () => {
    if (!selectedClassroom || !newAnnouncement.title.trim() || !newAnnouncement.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and message for the announcement.",
        variant: "destructive"
      });
      return;
    }

    const newAnnouncementItem: Announcement = {
      id: `announcement${Date.now()}`,
      title: newAnnouncement.title,
      message: newAnnouncement.message,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      author: "Thomas Anderson"
    };

    setClassrooms(prev => prev.map(classroom => {
      if (classroom.id === selectedClassroom) {
        return {
          ...classroom,
          announcements: [...classroom.announcements, newAnnouncementItem]
        };
      }
      return classroom;
    }));

    setNewAnnouncement({
      title: "",
      message: ""
    });
    setIsCreatingAnnouncement(false);

    toast({
      title: "Announcement Created",
      description: `"${newAnnouncementItem.title}" has been posted to the classroom.`
    });
  };

  const handleCreateGroup = () => {
    if (!selectedClassroom || !newGroup.name.trim() || newGroup.studentIds.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and select students for the group.",
        variant: "destructive"
      });
      return;
    }

    const newGroupItem: Group = {
      id: `group${Date.now()}`,
      name: newGroup.name,
      studentIds: newGroup.studentIds
    };

    // Store group information (in a real app, you would save this to your database)
    console.log("Created group:", newGroupItem);

    setNewGroup({
      name: "",
      studentIds: []
    });
    setIsCreatingGroup(false);

    toast({
      title: "Group Created",
      description: `"${newGroupItem.name}" has been created with ${newGroupItem.studentIds.length} students.`
    });
  };

  const handleTakeAttendance = () => {
    if (!selectedClassroom || newAttendance.students.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please mark attendance for all students.",
        variant: "destructive"
      });
      return;
    }

    const selectedClassroomData = classrooms.find(c => c.id === selectedClassroom);
    if (!selectedClassroomData) return;

    const newAttendanceRecord: AttendanceRecord = {
      id: `attendance${Date.now()}`,
      date: newAttendance.date,
      students: newAttendance.students
    };

    setClassrooms(prev => prev.map(classroom => {
      if (classroom.id === selectedClassroom) {
        return {
          ...classroom,
          attendanceRecords: [...classroom.attendanceRecords, newAttendanceRecord]
        };
      }
      return classroom;
    }));

    setIsTakingAttendance(false);
    setNewAttendance({
      date: new Date().toISOString().split('T')[0],
      students: []
    });

    toast({
      title: "Attendance Recorded",
      description: `Attendance for ${newAttendanceRecord.date} has been recorded.`
    });
  };

  // Initialize attendance when opening the dialog
  const initializeAttendance = () => {
    if (!selectedClassroom) return;
    
    const selectedClassroomData = classrooms.find(c => c.id === selectedClassroom);
    if (!selectedClassroomData) return;
    
    setNewAttendance({
      date: new Date().toISOString().split('T')[0],
      students: selectedClassroomData.students.map(student => ({
        studentId: student.id,
        status: 'present' as const
      }))
    });
    
    setIsTakingAttendance(true);
  };

  // Helper function to toggle student selection for groups
  const toggleStudentSelection = (studentId: string) => {
    setNewGroup(prev => {
      const isSelected = prev.studentIds.includes(studentId);
      
      if (isSelected) {
        return {
          ...prev,
          studentIds: prev.studentIds.filter(id => id !== studentId)
        };
      } else {
        return {
          ...prev,
          studentIds: [...prev.studentIds, studentId]
        };
      }
    });
  };

  // Compute attendance percentage for a student
  const calculateAttendancePercentage = (studentId: string, classroomId: string) => {
    const classroom = classrooms.find(c => c.id === classroomId);
    if (!classroom) return "0%";
    
    const studentAttendance = classroom.attendanceRecords
      .flatMap(record => record.students)
      .filter(record => record.studentId === studentId);
    
    if (studentAttendance.length === 0) return "0%";
    
    const presentCount = studentAttendance.filter(record => record.status === "present").length;
    const percentage = Math.round((presentCount / studentAttendance.length) * 100);
    
    return `${percentage}%`;
  };

  // Filter classrooms based on search query
  const filteredClassrooms = classrooms.filter(classroom => 
    classroom.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classroom.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClassroomData = selectedClassroom 
    ? classrooms.find(c => c.id === selectedClassroom)
    : null;

  return (
    <div className="container mx-auto space-y-8 pb-6">
      {selectedClassroom ? (
        // Classroom management view
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {selectedClassroomData?.title}
              </h1>
              <p className="text-muted-foreground mt-1">
                {selectedClassroomData?.program} · Started: {selectedClassroomData?.startDate} · 
                {selectedClassroomData?.students.length} Students
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedClassroom(null);
                  setActiveTab("dashboard");
                }}
              >
                Back to Classrooms
              </Button>
            </div>
          </div>

          <div className="glass-panel">
            <Tabs defaultValue="students" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6 pt-6 overflow-x-auto">
                <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-2 bg-transparent h-auto p-0">
                  {[
                    { id: "students", label: "Students", icon: <Users size={16} /> },
                    { id: "materials", label: "Materials", icon: <FileText size={16} /> },
                    { id: "assignments", label: "Assignments", icon: <CheckCircle size={16} /> },
                    { id: "attendance", label: "Attendance", icon: <Calendar size={16} /> },
                    { id: "roster", label: "Roster", icon: <Clock size={16} /> },
                    { id: "progress", label: "Progress", icon: <BarChart2 size={16} /> },
                    { id: "announcements", label: "Announcements", icon: <BellRing size={16} /> },
                    { id: "groups", label: "Groups", icon: <Users2 size={16} /> },
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center justify-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4 gap-2 text-sm font-medium rounded-lg data-[state=inactive]:bg-secondary/50 data-[state=inactive]:hover:bg-secondary/80"
                    >
                      {tab.icon}
                      <span className="hidden md:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="students" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Student List</h3>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="search"
                          placeholder="Search students..."
                          className="pl-10 bg-secondary/60 border border-border/50 rounded-lg p-2 text-sm w-full"
                        />
                      </div>
                      <Button onClick={() => setIsAddingStudent(true)}>
                        <Plus size={16} className="mr-2" />
                        Add Student
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-border/50">
                    <table className="w-full bg-white/70 backdrop-blur-sm">
                      <thead>
                        <tr className="border-b border-border/50 bg-secondary/30">
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Progress</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Attendance</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {selectedClassroomData && selectedClassroomData.students.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                              No students in this classroom. Add some students to get started.
                            </td>
                          </tr>
                        ) : (
                          selectedClassroomData?.students.map((student, index) => (
                            <motion.tr 
                              key={student.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * index }}
                              className="hover:bg-secondary/40"
                            >
                              <td className="px-4 py-3 text-sm">{student.name}</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{student.email}</td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center">
                                  <div className="w-full max-w-[100px] bg-secondary rounded-full h-2 mr-3">
                                    <div 
                                      className="bg-primary h-2 rounded-full" 
                                      style={{ width: `${student.progress}%` }}
                                    ></div>
                                  </div>
                                  <span>{student.progress}%</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {calculateAttendancePercentage(student.id, selectedClassroom)}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-primary h-8"
                                  >
                                    View Profile
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-primary h-8"
                                  >
                                    Message
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-destructive"
                                    onClick={() => handleRemoveStudent(student.id)}
                                  >
                                    <X size={16} />
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

                <TabsContent value="materials" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Course Materials</h3>
                    <Button onClick={() => setIsAddingMaterial(true)}>
                      <Upload size={16} className="mr-2" />
                      Upload Material
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedClassroomData && selectedClassroomData.materials.length === 0 ? (
                      <div className="col-span-full p-8 text-center text-muted-foreground bg-white/70 backdrop-blur-sm rounded-xl border border-border/50">
                        No materials uploaded for this classroom. Upload some materials to get started.
                      </div>
                    ) : (
                      selectedClassroomData?.materials.map((material, index) => (
                        <motion.div
                          key={material.id}
                          className="glass-card p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="p-3 bg-secondary/70 rounded-lg">
                              <FileText size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium truncate" title={material.title}>
                                {material.title}
                              </h4>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span>{material.type}</span>
                                <span className="mx-2">•</span>
                                <span>{material.size}</span>
                                <span className="mx-2">•</span>
                                <span>{material.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-3 space-x-2">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <DownloadCloud size={14} className="mr-1" />
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="assignments" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Assignments</h3>
                    <Button>
                      <Plus size={16} className="mr-2" />
                      Create Assignment
                    </Button>
                  </div>

                  <div className="glass-card p-8 text-center items-center justify-center flex flex-col">
                    <CheckSquare size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Assignments Yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Create your first assignment for this classroom to help students practice and demonstrate their understanding of the course material.
                    </p>
                    <Button>
                      <Plus size={16} className="mr-2" />
                      Create Assignment
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="attendance" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Attendance Records</h3>
                    <Button onClick={initializeAttendance}>
                      <CheckSquare size={16} className="mr-2" />
                      Take Attendance
                    </Button>
                  </div>

                  {selectedClassroomData && selectedClassroomData.attendanceRecords.length === 0 ? (
                    <div className="glass-card p-8 text-center items-center justify-center flex flex-col">
                      <Calendar size={48} className="text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Attendance Records</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Start tracking attendance for this classroom. Regular attendance tracking helps monitor student engagement and participation.
                      </p>
                      <Button onClick={initializeAttendance}>
                        <CheckSquare size={16} className="mr-2" />
                        Take First Attendance
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="overflow-hidden rounded-xl border border-border/50">
                        <table className="w-full bg-white/70 backdrop-blur-sm">
                          <thead>
                            <tr className="border-b border-border/50 bg-secondary/30">
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Present</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Absent</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/50">
                            {selectedClassroomData?.attendanceRecords.map((record, index) => {
                              const presentCount = record.students.filter(s => s.status === 'present').length;
                              const absentCount = record.students.filter(s => s.status === 'absent').length;
                              
                              return (
                                <tr key={record.id} className="hover:bg-secondary/40">
                                  <td className="px-4 py-3 text-sm font-medium">{record.date}</td>
                                  <td className="px-4 py-3 text-sm text-green-600">{presentCount} students</td>
                                  <td className="px-4 py-3 text-sm text-red-600">{absentCount} students</td>
                                  <td className="px-4 py-3 text-sm">
                                    <Button variant="ghost" size="sm" className="text-primary h-8">
                                      View Details
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="glass-card p-6">
                        <h4 className="text-lg font-medium mb-4">Student Attendance Summary</h4>
                        <div className="overflow-hidden rounded-lg border border-border/50">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b bg-secondary/30">
                                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Student</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Attendance Rate</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Present</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Absent</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {selectedClassroomData?.students.map(student => {
                                // Calculate attendance statistics
                                const studentRecords = selectedClassroomData.attendanceRecords
                                  .flatMap(record => record.students)
                                  .filter(record => record.studentId === student.id);
                                
                                const presentCount = studentRecords.filter(r => r.status === 'present').length;
                                const absentCount = studentRecords.filter(r => r.status === 'absent').length;
                                const totalCount = studentRecords.length;
                                const attendanceRate = totalCount > 0 
                                  ? `${Math.round((presentCount / totalCount) * 100)}%` 
                                  : '0%';
                                
                                return (
                                  <tr key={student.id} className="hover:bg-secondary/20">
                                    <td className="px-4 py-2 text-sm font-medium">{student.name}</td>
                                    <td className="px-4 py-2 text-sm">
                                      <div className="flex items-center">
                                        <div className="w-full max-w-[100px] bg-secondary rounded-full h-2 mr-3">
                                          <div 
                                            className="bg-primary h-2 rounded-full" 
                                            style={{ width: attendanceRate }}
                                          ></div>
                                        </div>
                                        <span>{attendanceRate}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-green-600">{presentCount}</td>
                                    <td className="px-4 py-2 text-sm text-red-600">{absentCount}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="announcements" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Classroom Announcements</h3>
                    <Button onClick={() => setIsCreatingAnnouncement(true)}>
                      <BellRing size={16} className="mr-2" />
                      Create Announcement
                    </Button>
                  </div>

                  {selectedClassroomData && selectedClassroomData.announcements.length === 0 ? (
                    <div className="glass-card p-8 text-center items-center justify-center flex flex-col">
                      <BellRing size={48} className="text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Announcements</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Keep your students informed by posting announcements about assignments, upcoming events, or changes to the course schedule.
                      </p>
                      <Button onClick={() => setIsCreatingAnnouncement(true)}>
                        <Plus size={16} className="mr-2" />
                        Create Announcement
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedClassroomData?.announcements.map((announcement, index) => (
                        <motion.div
                          key={announcement.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="glass-card p-6"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-medium">{announcement.title}</h4>
                              <div className="text-sm text-muted-foreground mt-1">
                                Posted by {announcement.author} on {announcement.date}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 text-muted-foreground">
                            {announcement.message}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="progress" className="mt-0 space-y-4">
                  <h3 className="text-lg font-medium">Student Progress</h3>
                  
                  {selectedClassroomData && selectedClassroomData.students.length === 0 ? (
                    <div className="glass-card p-8 text-center items-center justify-center flex flex-col">
                      <BarChart2 size={48} className="text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Students to Track</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Add students to this classroom to start tracking their progress and performance.
                      </p>
                      <Button onClick={() => setIsAddingStudent(true)}>
                        <Plus size={16} className="mr-2" />
                        Add Students
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedClassroomData?.students.map((student, index) => (
                        <motion.div
                          key={student.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="glass-card p-6"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h4 className="text-lg font-medium">{student.name}</h4>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button variant="outline" size="sm">View Detailed Report</Button>
                              <Button size="sm">
                                <MessageSquare size={16} className="mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Overall Progress</h5>
                              <div className="flex items-center">
                                <div className="w-full bg-secondary rounded-full h-3 mr-3">
                                  <div 
                                    className="bg-primary h-3 rounded-full" 
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                                <span className="font-medium">{student.progress}%</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Attendance Rate</h5>
                              <div className="flex items-center">
                                {(() => {
                                  const attendanceRate = parseInt(calculateAttendancePercentage(student.id, selectedClassroom));
                                  return (
                                    <>
                                      <div className="w-full bg-secondary rounded-full h-3 mr-3">
                                        <div 
                                          className={`h-3 rounded-full ${
                                            attendanceRate >= 90 ? 'bg-green-500' : 
                                            attendanceRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                          }`}
                                          style={{ width: `${attendanceRate}%` }}
                                        ></div>
                                      </div>
                                      <span className="font-medium">{calculateAttendancePercentage(student.id, selectedClassroom)}</span>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Assignment Completion</h5>
                              <div className="flex items-center">
                                <div className="w-full bg-secondary rounded-full h-3 mr-3">
                                  <div 
                                    className="bg-blue-500 h-3 rounded-full" 
                                    style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                                  ></div>
                                </div>
                                <span className="font-medium">{Math.floor(Math.random() * 3) + 3}/5</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="groups" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Student Groups</h3>
                    <Button onClick={() => setIsCreatingGroup(true)}>
                      <Users2 size={16} className="mr-2" />
                      Create Group
                    </Button>
                  </div>

                  <div className="glass-card p-8 text-center items-center justify-center flex flex-col">
                    <Users2 size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Groups Created</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Create groups to organize students for collaborative projects, discussions, or specific activities.
                    </p>
                    <Button onClick={() => setIsCreatingGroup(true)}>
                      <Plus size={16} className="mr-2" />
                      Create First Group
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="roster" className="mt-0 space-y-4">
                  <h3 className="text-lg font-medium">Class Roster</h3>

                  <div className="glass-card p-6">
                    <div className="space-y-6">
                      <div className="overflow-hidden rounded-lg border border-border/50">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-secondary/30">
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {selectedClassroomData?.students.map(student => (
                              <tr key={student.id} className="hover:bg-secondary/20">
                                <td className="px-4 py-3 text-sm font-medium">{student.name}</td>
                                <td className="px-4 py-3 text-sm text-muted-foreground">{student.email}</td>
                                <td className="px-4 py-3 text-sm">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-muted-foreground">Today</td>
                                <td className="px-4 py-3 text-sm">
                                  <Button variant="ghost" size="sm" className="text-primary">
                                    <MessageSquare size={16} className="mr-2" />
                                    Message
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </>
      ) : (
        // Classroom list view
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Classroom</h1>
              <p className="text-muted-foreground mt-1">Manage your classrooms, students, and materials</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  type="search" 
                  placeholder="Search classrooms..." 
                  className="pl-10 bg-secondary/60 border border-border/50 rounded-lg p-2 text-sm w-full md:w-auto" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button onClick={() => setIsCreatingClassroom(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Classroom
              </Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>All Classrooms</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>Active Classes</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="archived" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Archived</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4">
              {filteredClassrooms.length === 0 ? (
                <div className="glass-panel p-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Users size={64} className="text-muted-foreground mb-6" />
                    <h3 className="text-2xl font-medium mb-2">No Classrooms Found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      {searchQuery 
                        ? `No classrooms match "${searchQuery}". Try a different search term.` 
                        : "You haven't created any classrooms yet. Create your first classroom to get started."}
                    </p>
                    <Button onClick={() => setIsCreatingClassroom(true)}>
                      <Plus size={16} className="mr-2" />
                      Create Your First Classroom
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClassrooms.map((classroom, index) => (
                    <ClassroomCard
                      key={classroom.id}
                      id={classroom.id}
                      title={classroom.title}
                      program={classroom.program}
                      students={classroom.students.length}
                      startDate={classroom.startDate}
                      materials={classroom.materials.length}
                      upcoming={classroom.upcoming}
                      onClick={handleClassroomSelect}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="favorites">
              <div className="glass-panel p-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <CheckCircle size={64} className="text-muted-foreground mb-6" />
                  <h3 className="text-2xl font-medium mb-2">Active Classes</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    This section will show your currently active classes that are in progress.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="archived">
              <div className="glass-panel p-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Clock size={64} className="text-muted-foreground mb-6" />
                  <h3 className="text-2xl font-medium mb-2">Archived Classrooms</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Past classrooms that have been completed and archived will appear here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Create Classroom Dialog */}
      <Dialog open={isCreatingClassroom} onOpenChange={setIsCreatingClassroom}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Classroom</DialogTitle>
            <DialogDescription>
              Set up a new classroom for your teaching activities.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="classroom-title">Classroom Title</Label>
              <Input
                id="classroom-title"
                placeholder="Enter classroom title"
                value={newClassroom.title}
                onChange={(e) => setNewClassroom(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classroom-program">Program</Label>
              <Input
                id="classroom-program"
                placeholder="e.g. UI/UX Design"
                value={newClassroom.program}
                onChange={(e) => setNewClassroom(prev => ({ ...prev, program: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classroom-date">Start Date</Label>
              <Input
                id="classroom-date"
                type="date"
                value={newClassroom.startDate}
                onChange={(e) => setNewClassroom(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingClassroom(false)}>Cancel</Button>
            <Button onClick={handleCreateClassroom}>
              <Plus size={16} className="mr-2" />
              Create Classroom
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Add a student to this classroom.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name</Label>
              <Input
                id="student-name"
                placeholder="Enter student name"
                value={newStudent.name}
                onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-email">Email Address</Label>
              <Input
                id="student-email"
                type="email"
                placeholder="Enter student email"
                value={newStudent.email}
                onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingStudent(false)}>Cancel</Button>
            <Button onClick={handleAddStudent}>
              <Plus size={16} className="mr-2" />
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Material Dialog */}
      <Dialog open={isAddingMaterial} onOpenChange={setIsAddingMaterial}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Course Material</DialogTitle>
            <DialogDescription>
              Add learning materials for students in this classroom.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="material-title">Material Title</Label>
              <Input
                id="material-title"
                placeholder="Enter material title"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="material-type">Material Type</Label>
              <Select 
                value={newMaterial.type}
                onValueChange={(value) => setNewMaterial(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger id="material-type">
                  <SelectValue placeholder="Select material type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF Document</SelectItem>
                  <SelectItem value="PPTX">Presentation</SelectItem>
                  <SelectItem value="DOCX">Word Document</SelectItem>
                  <SelectItem value="ZIP">Archive/ZIP</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="LINK">External Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="material-url">URL (Optional)</Label>
              <Input
                id="material-url"
                placeholder="Enter URL if this is an external resource"
                value={newMaterial.url}
                onChange={(e) => setNewMaterial(prev => ({ ...prev, url: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="material-size">File Size (Optional)</Label>
              <Input
                id="material-size"
                placeholder="e.g. 2.4 MB"
                value={newMaterial.size}
                onChange={(e) => setNewMaterial(prev => ({ ...prev, size: e.target.value }))}
              />
            </div>
            <div className="border-2 border-dashed border-border/70 rounded-lg p-8 flex flex-col items-center justify-center">
              <FileText size={48} className="text-muted-foreground mb-4" />
              <p className="text-center text-sm text-muted-foreground mb-2">
                Drag and drop your file here or click to browse
              </p>
              <Button variant="outline" size="sm">Browse Files</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingMaterial(false)}>Cancel</Button>
            <Button onClick={handleAddMaterial}>
              <Upload size={16} className="mr-2" />
              Upload Material
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Announcement Dialog */}
      <Dialog open={isCreatingAnnouncement} onOpenChange={setIsCreatingAnnouncement}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>
              Post an announcement to all students in this classroom.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="announcement-title">Announcement Title</Label>
              <Input
                id="announcement-title"
                placeholder="Enter announcement title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="announcement-message">Message</Label>
              <Textarea
                id="announcement-message"
                placeholder="Enter your announcement message"
                className="min-h-[150px]"
                value={newAnnouncement.message}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="notify-students" />
              <Label htmlFor="notify-students">Notify students via email</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingAnnouncement(false)}>Cancel</Button>
            <Button onClick={handleCreateAnnouncement}>
              <BellRing size={16} className="mr-2" />
              Post Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={isCreatingGroup} onOpenChange={setIsCreatingGroup}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Student Group</DialogTitle>
            <DialogDescription>
              Create a group of students for collaborative work.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                placeholder="Enter group name"
                value={newGroup.name}
                onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Select Students</Label>
              <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                {selectedClassroomData?.students.map(student => (
                  <div key={student.id} className="flex items-center space-x-2 py-2">
                    <Checkbox 
                      id={`student-${student.id}`}
                      checked={newGroup.studentIds.includes(student.id)}
                      onCheckedChange={() => toggleStudentSelection(student.id)}
                    />
                    <Label htmlFor={`student-${student.id}`}>{student.name}</Label>
                  </div>
                ))}
                
                {selectedClassroomData?.students.length === 0 && (
                  <p className="text-muted-foreground py-2">No students in this classroom to add to groups.</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between px-2">
              <span className="text-sm text-muted-foreground">
                Selected: {newGroup.studentIds.length} students
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setNewGroup(prev => ({ ...prev, studentIds: [] }))}
                disabled={newGroup.studentIds.length === 0}
              >
                Clear Selection
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingGroup(false)}>Cancel</Button>
            <Button onClick={handleCreateGroup}>
              <Users2 size={16} className="mr-2" />
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Take Attendance Dialog */}
      <Dialog open={isTakingAttendance} onOpenChange={setIsTakingAttendance}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Take Attendance</DialogTitle>
            <DialogDescription>
              Record attendance for today's session.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="attendance-date">Date</Label>
              <Input
                id="attendance-date"
                type="date"
                value={newAttendance.date}
                onChange={(e) => setNewAttendance(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Students</Label>
              <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
                {selectedClassroomData?.students.map(student => (
                  <div key={student.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <span className="font-medium">{student.name}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`present-${student.id}`}
                          name={`attendance-${student.id}`}
                          value="present"
                          checked={
                            newAttendance.students.find(s => s.studentId === student.id)?.status === 'present'
                          }
                          onChange={() => {
                            setNewAttendance(prev => {
                              const existing = prev.students.findIndex(s => s.studentId === student.id);
                              if (existing >= 0) {
                                const updated = [...prev.students];
                                updated[existing] = { studentId: student.id, status: 'present' };
                                return { ...prev, students: updated };
                              } else {
                                return {
                                  ...prev,
                                  students: [...prev.students, { studentId: student.id, status: 'present' }]
                                };
                              }
                            });
                          }}
                          className="text-primary focus:ring-primary"
                        />
                        <Label htmlFor={`present-${student.id}`} className="text-sm">Present</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`absent-${student.id}`}
                          name={`attendance-${student.id}`}
                          value="absent"
                          checked={
                            newAttendance.students.find(s => s.studentId === student.id)?.status === 'absent'
                          }
                          onChange={() => {
                            setNewAttendance(prev => {
                              const existing = prev.students.findIndex(s => s.studentId === student.id);
                              if (existing >= 0) {
                                const updated = [...prev.students];
                                updated[existing] = { studentId: student.id, status: 'absent' };
                                return { ...prev, students: updated };
                              } else {
                                return {
                                  ...prev,
                                  students: [...prev.students, { studentId: student.id, status: 'absent' }]
                                };
                              }
                            });
                          }}
                          className="text-destructive focus:ring-destructive"
                        />
                        <Label htmlFor={`absent-${student.id}`} className="text-sm">Absent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`late-${student.id}`}
                          name={`attendance-${student.id}`}
                          value="late"
                          checked={
                            newAttendance.students.find(s => s.studentId === student.id)?.status === 'late'
                          }
                          onChange={() => {
                            setNewAttendance(prev => {
                              const existing = prev.students.findIndex(s => s.studentId === student.id);
                              if (existing >= 0) {
                                const updated = [...prev.students];
                                updated[existing] = { studentId: student.id, status: 'late' };
                                return { ...prev, students: updated };
                              } else {
                                return {
                                  ...prev,
                                  students: [...prev.students, { studentId: student.id, status: 'late' }]
                                };
                              }
                            });
                          }}
                          className="text-yellow-500 focus:ring-yellow-500"
                        />
                        <Label htmlFor={`late-${student.id}`} className="text-sm">Late</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTakingAttendance(false)}>Cancel</Button>
            <Button onClick={handleTakeAttendance}>
              <CheckSquare size={16} className="mr-2" />
              Save Attendance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Classroom;
