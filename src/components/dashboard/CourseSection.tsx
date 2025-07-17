
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CourseCard from "./CourseCard";

const CourseSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleViewAllCourses = () => {
    console.log("Navigating to All Courses");
    navigate("/student-courses");
  };

  const handleManageCourse = () => {
    console.log("Managing course");
    // Navigate to course video page
    navigate("/student-courses/video/topic-1");
  };

  const handleViewCourse = () => {
    console.log("Viewing course");
    // Fix to use the correct route for viewing courses
    navigate("/student-courses/video/topic-1");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">My Courses</h2>
        <button 
          className="text-sm text-primary font-medium hover:underline"
          onClick={handleViewAllCourses}
        >
          View All Courses
        </button>
      </div>
      
      <CourseCard
        title="UI/UX Design Fundamentals"
        program="UI/UX Design"
        branch="N/A"
        students={42}
        modules={5}
        views={320}
        mostWatchedTitle="Introduction to UI/UX Principles"
        mostWatchedViews={85}
        onManage={handleManageCourse}
        onView={handleViewCourse}
      />
    </div>
  );
};

export default CourseSection;
