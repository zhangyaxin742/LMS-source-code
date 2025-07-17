
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import StudentProgressCard from "./StudentProgressCard";

interface TopStudentsSectionProps {
  students: Array<{
    name: string;
    courseCompleted: number;
    assignmentsSubmitted: number;
    attendanceRate: number;
    rank: number;
  }>;
}

const TopStudentsSection: React.FC<TopStudentsSectionProps> = ({ students }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewAllStudents = () => {
    console.log("Navigating to All Students");
    navigate("/student-progress");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Top Performing Students</h2>
        <button 
          className="text-sm text-primary font-medium hover:underline"
          onClick={handleViewAllStudents}
        >
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {students.map((student) => (
          <StudentProgressCard 
            key={student.name}
            name={student.name}
            courseCompleted={student.courseCompleted}
            assignmentsSubmitted={student.assignmentsSubmitted}
            attendanceRate={student.attendanceRate}
            rank={student.rank}
            onClick={() => {
              console.log(`Viewing student profile: ${student.name}`);
              toast({
                title: "Student Profile",
                description: `Opening ${student.name}'s profile`,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TopStudentsSection;
