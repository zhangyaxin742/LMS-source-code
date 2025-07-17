
import React, { useState } from "react";

// Import refactored components
import SearchAndFilterBar from "@/components/student-progress/SearchAndFilterBar";
import ClassroomOverviewPanel from "@/components/student-progress/ClassroomOverviewPanel";
import StudentListTable from "@/components/student-progress/StudentListTable";
import ProgressCharts from "@/components/student-progress/ProgressCharts";
import StatisticsCards from "@/components/student-progress/StatisticsCards";

const StudentProgress = () => {
  const [activeClassroom, setActiveClassroom] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedClassrooms, setExpandedClassrooms] = useState<string[]>([]);

  const classrooms = [
    {
      id: "class-1",
      name: "UI/UX Design Fundamentals",
      students: [
        {
          name: "Emma Thompson",
          overallScore: 96,
          modulesCompleted: "4/5",
          assignments: "18/20",
          attendance: "100%",
          activityData: [75, 85, 90, 95, 96],
        },
        {
          name: "Alex Johnson",
          overallScore: 88,
          modulesCompleted: "4/5",
          assignments: "16/20",
          attendance: "90%",
          activityData: [70, 80, 85, 90, 88],
        }
      ],
      averageProgress: 92,
      totalStudents: 2
    },
    {
      id: "class-2",
      name: "Web Design Fundamentals",
      students: [
        {
          name: "Maria Garcia",
          overallScore: 94,
          modulesCompleted: "4/5",
          assignments: "19/20",
          attendance: "95%",
          activityData: [80, 85, 90, 92, 94],
        },
        {
          name: "James Wilson",
          overallScore: 78,
          modulesCompleted: "3/5",
          assignments: "14/20",
          attendance: "85%",
          activityData: [65, 70, 75, 78, 78],
        }
      ],
      averageProgress: 86,
      totalStudents: 2
    }
  ];

  const students = [
    {
      name: "Emma Thompson",
      overallScore: 96,
      modulesCompleted: "4/5",
      assignments: "18/20",
      attendance: "100%",
      activityData: [75, 85, 90, 95, 96],
    },
    {
      name: "Alex Johnson",
      overallScore: 88,
      modulesCompleted: "4/5",
      assignments: "16/20",
      attendance: "90%",
      activityData: [70, 80, 85, 90, 88],
    },
    {
      name: "Maria Garcia",
      overallScore: 94,
      modulesCompleted: "4/5",
      assignments: "19/20",
      attendance: "95%",
      activityData: [80, 85, 90, 92, 94],
    },
    {
      name: "James Wilson",
      overallScore: 78,
      modulesCompleted: "3/5",
      assignments: "14/20",
      attendance: "85%",
      activityData: [65, 70, 75, 78, 78],
    }
  ];

  const courseProgressData = [
    { name: "Module 1", completion: 100 },
    { name: "Module 2", completion: 100 },
    { name: "Module 3", completion: 100 },
    { name: "Module 4", completion: 85 },
    { name: "Module 5", completion: 20 },
  ];

  const assignmentCompletionData = [
    { name: "Assignment 1", completed: 28, total: 28 },
    { name: "Assignment 2", completed: 27, total: 28 },
    { name: "Assignment 3", completed: 25, total: 28 },
    { name: "Assignment 4", completed: 18, total: 28 },
    { name: "Assignment 5", completed: 5, total: 28 },
  ];

  const studentActivityData = [
    { day: "Mon", views: 45, submissions: 10 },
    { day: "Tue", views: 55, submissions: 12 },
    { day: "Wed", views: 75, submissions: 15 },
    { day: "Thu", views: 40, submissions: 8 },
    { day: "Fri", views: 65, submissions: 14 },
    { day: "Sat", views: 30, submissions: 5 },
    { day: "Sun", views: 20, submissions: 3 },
  ];

  const topPerformer = {
    name: "Emma Thompson",
    score: 96,
    info: "Completed 18/20 assignments with perfect attendance"
  };

  const recentActivities = [
    { time: "2 hours ago", text: "Maria Garcia submitted Assignment 5" },
    { time: "4 hours ago", text: "Alex Johnson accessed Module 4" },
    { time: "Yesterday", text: "Emma Thompson completed Module 4 quiz" },
  ];

  const toggleClassroomExpand = (classroomId: string) => {
    setExpandedClassrooms(prev => 
      prev.includes(classroomId) 
        ? prev.filter(id => id !== classroomId)
        : [...prev, classroomId]
    );
  };

  return (
    <div className="container mx-auto space-y-8 pb-6">
      <SearchAndFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeClassroom={activeClassroom}
        setActiveClassroom={setActiveClassroom}
        classrooms={classrooms}
      />

      <ClassroomOverviewPanel 
        classrooms={classrooms}
        activeClassroom={activeClassroom}
        expandedClassrooms={expandedClassrooms}
        toggleClassroomExpand={toggleClassroomExpand}
        setActiveClassroom={setActiveClassroom}
      />

      <StudentListTable 
        students={students}
        searchTerm={searchTerm}
        activeClassroom={activeClassroom}
        classrooms={classrooms}
      />
      
      <ProgressCharts 
        courseProgressData={courseProgressData}
        assignmentCompletionData={assignmentCompletionData}
        studentActivityData={studentActivityData}
      />
      
      <StatisticsCards 
        topPerformer={topPerformer}
        recentActivities={recentActivities}
      />
    </div>
  );
};

export default StudentProgress;
