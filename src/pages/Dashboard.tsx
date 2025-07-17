
import React from "react";
import StatsSection from "../components/dashboard/StatsSection";
import CourseSection from "../components/dashboard/CourseSection";
import LiveClassSection from "../components/dashboard/LiveClassSection";
import AssignmentsSection from "../components/dashboard/AssignmentsSection";
import TopStudentsSection from "../components/dashboard/TopStudentsSection";
import QuickActionsCard from "../components/dashboard/QuickActionsCard";

const Dashboard = () => {
  // Top students data
  const topStudents = [
    {
      name: "Emily Johnson",
      courseCompleted: 92,
      assignmentsSubmitted: 15,
      attendanceRate: 98,
      rank: 1
    },
    {
      name: "Michael Chen",
      courseCompleted: 89,
      assignmentsSubmitted: 14,
      attendanceRate: 95,
      rank: 2
    },
    {
      name: "Sara Williams",
      courseCompleted: 86,
      assignmentsSubmitted: 13,
      attendanceRate: 92,
      rank: 3
    }
  ];

  return (
    <div className="container mx-auto space-y-8 pb-6">
      <StatsSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CourseSection />
          <AssignmentsSection />
          <LiveClassSection />
        </div>
        
        <div className="space-y-6">
          <TopStudentsSection students={topStudents} />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
