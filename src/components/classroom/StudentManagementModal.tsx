
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, UserCheck, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import StudentProgressFilter from "./StudentProgressFilter";
import StudentSearchInput from "./StudentSearchInput";
import StudentList from "./StudentList";

interface Student {
  id: string;
  name: string;
  email: string;
  progress: "high" | "medium" | "low";
  enrolled: boolean;
}

interface StudentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroomId: string;
  classroomName: string;
}

const StudentManagementModal: React.FC<StudentManagementModalProps> = ({
  isOpen,
  onClose,
  classroomId,
  classroomName,
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [progressFilter, setProgressFilter] = useState<string | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const [students, setStudents] = useState<Student[]>([
    { id: "s1", name: "Jane Smith", email: "jane.smith@example.com", progress: "high", enrolled: true },
    { id: "s2", name: "John Doe", email: "john.doe@example.com", progress: "medium", enrolled: true },
    { id: "s3", name: "Alex Johnson", email: "alex.johnson@example.com", progress: "low", enrolled: true },
    { id: "s4", name: "Sarah Wilson", email: "sarah.wilson@example.com", progress: "high", enrolled: false },
    { id: "s5", name: "Michael Brown", email: "michael.brown@example.com", progress: "medium", enrolled: false },
    { id: "s6", name: "Emily Davis", email: "emily.davis@example.com", progress: "low", enrolled: false },
    { id: "s7", name: "Robert Miller", email: "robert.miller@example.com", progress: "high", enrolled: false },
    { id: "s8", name: "Jennifer Garcia", email: "jennifer.garcia@example.com", progress: "medium", enrolled: false },
  ]);

  const handleToggleEnrollment = (studentId: string) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, enrolled: !student.enrolled }
          : student
      )
    );
  };

  const handleSaveChanges = () => {
    // In a real app, this would make an API call to update enrollments
    toast({
      title: "Changes saved",
      description: `Updated student enrollments for ${classroomName}`,
    });
    onClose();
  };

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "high":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Students</DialogTitle>
          <DialogDescription>
            Add or remove students from {classroomName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between mb-4 mt-2 gap-2">
          <StudentSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <StudentProgressFilter progressFilter={progressFilter} setProgressFilter={setProgressFilter} />
        </div>
        
        <Tabs defaultValue="enrolled" className="flex-1 flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="enrolled" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Enrolled Students
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Available Students
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrolled" className="flex-1 overflow-auto">
            <StudentList
              students={students}
              isEnrolled={true}
              searchTerm={searchTerm}
              progressFilter={progressFilter}
              handleToggleEnrollment={handleToggleEnrollment}
              getProgressColor={getProgressColor}
            />
          </TabsContent>
          
          <TabsContent value="available" className="flex-1 overflow-auto">
            <StudentList
              students={students}
              isEnrolled={false}
              searchTerm={searchTerm}
              progressFilter={progressFilter}
              handleToggleEnrollment={handleToggleEnrollment}
              getProgressColor={getProgressColor}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} className="gap-2">
            <Check className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentManagementModal;
