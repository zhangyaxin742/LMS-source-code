
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Student } from "@/types/student";
import StudentSearchHeader from "./StudentSearchHeader";
import StudentTable from "./StudentTable";
import StudentManagementModal from "@/components/classroom/StudentManagementModal";
import StudentProfileModal from "@/components/profile/StudentProfileModal";
import { ProgramStudent } from "@/types/programStudent";

interface StudentsTabProps {
  classroomId: string;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ classroomId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [studentManagementOpen, setStudentManagementOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { toast } = useToast();

  // Mock students data
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      progress: 75,
      status: "active",
      lastActive: "Today, 2:30 PM",
      profileImage: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: "2",
      name: "Jamie Smith",
      email: "jamie.smith@example.com",
      progress: 45,
      status: "active",
      lastActive: "Yesterday, 10:15 AM",
      profileImage: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: "3",
      name: "Taylor Brown",
      email: "taylor.brown@example.com",
      progress: 90,
      status: "active",
      lastActive: "Today, 9:45 AM",
      profileImage: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: "4",
      name: "Morgan Lee",
      email: "morgan.lee@example.com",
      progress: 20,
      status: "inactive",
      lastActive: "3 days ago",
      profileImage: "https://i.pravatar.cc/150?img=4"
    },
  ]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents(students.filter((s) => s.id !== id));

    toast({
      title: "Student removed",
      description: `${student?.name} has been removed from the classroom.`,
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-green-500";
    if (progress >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setProfileModalOpen(true);
  };

  const handleStudentUpdates = (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
    toast({
      title: "Students updated",
      description: "The student roster has been updated successfully.",
    });
  };

  // Convert Student to ProgramStudent for the profile modal
  const getStudentForProfile = (student: Student | null): ProgramStudent | null => {
    if (!student) return null;
    
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      program: "UX/UI Design",
      completionStatus: student.progress === 100 ? "completed" : "ongoing",
      assignedClassrooms: ["UI Design Fundamentals", "Design Systems"],
      progress: student.progress,
      profileImage: student.profileImage || "https://i.pravatar.cc/150?img=1"
    };
  };

  return (
    <div>
      <StudentSearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddStudentClick={() => setStudentManagementOpen(true)}
        studentCount={students.length}
      />

      <StudentTable 
        filteredStudents={filteredStudents}
        handleViewProfile={handleViewProfile}
        handleRemoveStudent={handleRemoveStudent}
        getProgressColor={getProgressColor}
      />

      {/* Student Management Modal for adding students */}
      <StudentManagementModal
        isOpen={studentManagementOpen}
        onClose={() => setStudentManagementOpen(false)}
        classroomId={classroomId}
        classroomName="UI Design Fundamentals"
      />

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        student={getStudentForProfile(selectedStudent)}
      />
    </div>
  );
};

export default StudentsTab;
