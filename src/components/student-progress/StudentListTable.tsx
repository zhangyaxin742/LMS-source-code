
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import StudentProgressDetailsModal from "./StudentProgressDetailsModal";

interface Student {
  name: string;
  overallScore: number;
  modulesCompleted: string;
  assignments: string;
  attendance: string;
  activityData: number[];
}

interface StudentListTableProps {
  students: Student[];
  searchTerm: string;
  activeClassroom: string | null;
  classrooms: {
    id: string;
    name: string;
    students: Student[];
    averageProgress: number;
    totalStudents: number;
  }[];
}

const StudentListTable: React.FC<StudentListTableProps> = ({
  students,
  searchTerm,
  activeClassroom,
  classrooms,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const getFilteredStudents = () => {
    let filteredStudents = [...students];
    
    if (activeClassroom) {
      const classroom = classrooms.find(c => c.id === activeClassroom);
      if (classroom) {
        filteredStudents = [...classroom.students];
      }
    }
    
    if (searchTerm) {
      filteredStudents = filteredStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredStudents;
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setDetailsModalOpen(true);
  };

  return (
    <div className="glass-panel p-6 space-y-6">
      <h2 className="text-xl font-semibold">Student List</h2>
      
      <div className="overflow-hidden rounded-xl border border-border/50">
        <table className="w-full bg-white/70 backdrop-blur-sm">
          <thead>
            <tr className="border-b border-border/50 bg-secondary/30">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Overall Score</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Modules</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Assignments</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Attendance</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Progress</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {getFilteredStudents().map((student, index) => (
              <motion.tr 
                key={student.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="hover:bg-secondary/40"
              >
                <td className="px-4 py-3 text-sm font-medium">{student.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div 
                      className={`w-2 h-2 rounded-full mr-2 ${
                        student.overallScore >= 90 
                          ? "bg-emerald-500" 
                          : student.overallScore >= 80 
                            ? "bg-blue-500" 
                            : student.overallScore >= 70
                              ? "bg-amber-500"
                              : "bg-rose-500"
                      }`}
                    ></div>
                    <span className="text-sm">{student.overallScore}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <BookOpen size={14} className="mr-2 text-muted-foreground" />
                    {student.modulesCompleted}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{student.assignments}</td>
                <td className="px-4 py-3 text-sm">{student.attendance}</td>
                <td className="px-4 py-3">
                  <div className="w-32">
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${student.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <button 
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                      onClick={() => handleViewDetails(student)}
                    >
                      Details
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {getFilteredStudents().length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No students match your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <StudentProgressDetailsModal 
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default StudentListTable;
