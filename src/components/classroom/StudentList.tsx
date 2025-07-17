
import React from "react";
import { Button } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

interface Student {
  id: string;
  name: string;
  email: string;
  progress: "high" | "medium" | "low";
  enrolled: boolean;
}

interface StudentListProps {
  students: Student[];
  isEnrolled: boolean;
  searchTerm: string;
  progressFilter: string | null;
  handleToggleEnrollment: (studentId: string) => void;
  getProgressColor: (progress: string) => string;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  isEnrolled,
  searchTerm,
  progressFilter,
  handleToggleEnrollment,
  getProgressColor,
}) => {
  const getFilteredStudents = () => {
    return students
      .filter((student) => student.enrolled === isEnrolled)
      .filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (student) => progressFilter === null || student.progress === progressFilter
      );
  };

  const filteredStudents = getFilteredStudents();

  if (filteredStudents.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {searchTerm ? (
          <p>
            No {isEnrolled ? "enrolled" : "available"} students match your search
          </p>
        ) : (
          <p>
            {isEnrolled
              ? "No students enrolled in this classroom yet"
              : "No more students available to enroll"}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredStudents.map((student) => (
        <motion.div
          key={student.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 rounded-lg bg-white border border-border"
        >
          <div>
            <h4 className="font-medium">{student.name}</h4>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-2 py-1 text-xs rounded-full border ${getProgressColor(student.progress)}`}>
              {student.progress.charAt(0).toUpperCase() + student.progress.slice(1)} Progress
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleToggleEnrollment(student.id)}
              className={`h-8 w-8 ${
                student.enrolled
                  ? "text-destructive hover:text-destructive hover:bg-destructive/10"
                  : "text-primary hover:text-primary hover:bg-primary/10"
              }`}
            >
              {student.enrolled ? (
                <UserMinus className="h-4 w-4" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StudentList;
