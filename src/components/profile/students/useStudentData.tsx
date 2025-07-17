
import { useState } from "react";
import { ProgramStudent } from "@/types/programStudent";

export const useStudentData = () => {
  // Student data (mock, would come from API)
  const students: ProgramStudent[] = [
    {
      id: "s1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      program: "UI/UX Design",
      completionStatus: "completed",
      assignedClassrooms: ["UI/UX Design Fundamentals", "Advanced UI Design"],
      progress: 100,
      profileImage: "https://i.pravatar.cc/300?img=33"
    },
    {
      id: "s2",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      program: "UI/UX Design",
      completionStatus: "ongoing",
      assignedClassrooms: ["UI/UX Design Fundamentals", "User Research Methods"],
      progress: 72,
      profileImage: "https://i.pravatar.cc/300?img=16"
    },
    {
      id: "s3",
      name: "James Wilson",
      email: "james.wilson@example.com",
      program: "UI/UX Design",
      completionStatus: "ongoing",
      assignedClassrooms: ["UI/UX Design Fundamentals"],
      progress: 45,
      profileImage: "https://i.pravatar.cc/300?img=54"
    },
    {
      id: "s4",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      program: "UI/UX Design",
      completionStatus: "ongoing",
      assignedClassrooms: ["UI/UX Design Fundamentals", "Prototyping Techniques"],
      progress: 83,
      profileImage: "https://i.pravatar.cc/300?img=47"
    },
    {
      id: "s5",
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      program: "UI/UX Design",
      completionStatus: "completed",
      assignedClassrooms: ["UI/UX Design Fundamentals", "Advanced UI Design"],
      progress: 100,
      profileImage: "https://i.pravatar.cc/300?img=18"
    }
  ];

  const [progressFilter, setProgressFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students
  const filteredStudents = students.filter((student) => {
    return (
      (progressFilter === "all" || 
        (progressFilter === "completed" && student.completionStatus === "completed") ||
        (progressFilter === "ongoing" && student.completionStatus === "ongoing")) &&
      (searchTerm === "" || 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return {
    students,
    filteredStudents,
    progressFilter,
    setProgressFilter,
    searchTerm,
    setSearchTerm
  };
};
