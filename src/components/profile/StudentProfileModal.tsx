
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import StudentProfileHeader from "./StudentProfileHeader";
import { ProgramStudent } from "@/types/programStudent";

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ProgramStudent | null;
}

const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const { toast } = useToast();

  if (!student) return null;

  // Mock data that would come from API in a real app
  const studentDetails = {
    assignments: {
      submitted: 12,
      total: 15,
      averageScore: 88,
    },
    attendance: {
      present: 18,
      total: 20,
      percentage: 90,
    },
    enrollmentDate: "2023-05-15",
    expectedCompletionDate: student.completionStatus === "completed" 
      ? "2023-11-30" 
      : "2024-01-15",
  };

  const handleContactStudent = () => {
    // In a real app, this would open a chat with the student
    toast({
      title: "Chat initiated",
      description: `Chat with ${student.name} has been opened in a new window.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
          <DialogDescription>
            View {student.name}'s detailed program information
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <StudentProfileHeader 
            name={student.name}
            email={student.email}
            profileImage={student.profileImage}
          />

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Program</div>
                <div className="font-medium">{student.program}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="font-medium flex items-center gap-2">
                  <Badge variant={student.completionStatus === "completed" ? "success" : "default"}>
                    {student.completionStatus === "completed" ? "Completed" : "Ongoing"}
                  </Badge>
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Enrollment Date</div>
                <div className="font-medium">{studentDetails.enrollmentDate}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">
                  {student.completionStatus === "completed" ? "Completion Date" : "Expected Completion"}
                </div>
                <div className="font-medium">{studentDetails.expectedCompletionDate}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Assigned Classrooms</h4>
              <div className="flex flex-wrap gap-2">
                {student.assignedClassrooms.map((classroom, index) => (
                  <Badge key={index} variant="outline">
                    {classroom}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="font-medium">{student.progress}%</div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full ${student.progress === 100 ? 'bg-green-500' : student.progress > 70 ? 'bg-green-500' : student.progress > 40 ? 'bg-amber-500' : 'bg-red-500'}`} 
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Assignments</div>
                <div className="font-medium">{studentDetails.assignments.submitted}/{studentDetails.assignments.total}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Avg. Score: {studentDetails.assignments.averageScore}%
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Attendance</div>
                <div className="font-medium">{studentDetails.attendance.percentage}%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {studentDetails.attendance.present}/{studentDetails.attendance.total} sessions
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={handleContactStudent}
            className="flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Contact Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileModal;
