
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentSearch from "./students/StudentSearch";
import ProgressFilter from "./students/ProgressFilter";
import StudentsTable from "./students/StudentsTable";
import StudentProfileModal from "./StudentProfileModal";
import { useStudentData } from "./students/useStudentData";
import { ProgramStudent } from "@/types/programStudent";

const StudentsTab: React.FC = () => {
  const [isStudentProfileOpen, setIsStudentProfileOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<ProgramStudent | null>(null);
  
  const { 
    filteredStudents,
    progressFilter,
    setProgressFilter,
    searchTerm,
    setSearchTerm
  } = useStudentData();
  
  // View student profile
  const handleViewStudentProfile = (student: ProgramStudent) => {
    setSelectedStudent(student);
    setIsStudentProfileOpen(true);
  };
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Program Students (UI/UX Design)</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <StudentSearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
            
            <ProgressFilter 
              progressFilter={progressFilter} 
              setProgressFilter={setProgressFilter} 
            />
          </div>
        </CardHeader>
        <CardContent>
          <StudentsTable 
            students={filteredStudents} 
            onViewProfile={handleViewStudentProfile} 
          />
        </CardContent>
      </Card>
      
      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isStudentProfileOpen}
        onClose={() => setIsStudentProfileOpen(false)}
        student={selectedStudent}
      />
    </>
  );
};

export default StudentsTab;
