
import React from "react";
import { Badge } from "@/components/ui/badge";

interface StudentProfileDetailsProps {
  program: string;
  enrolledCourses: string[];
  progress: number;
  studentDetails: {
    assignments: {
      submitted: number;
      total: number;
      averageScore: number;
    };
    attendance: {
      present: number;
      total: number;
      percentage: number;
    };
  };
}

const StudentProfileDetails: React.FC<StudentProfileDetailsProps> = ({
  program,
  enrolledCourses,
  progress,
  studentDetails,
}) => {
  return (
    <div className="grid gap-3">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">Program</h4>
        <p>{program}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">Enrolled Courses</h4>
        <div className="flex flex-wrap gap-2 mt-1">
          {enrolledCourses.map((course, index) => (
            <Badge key={index} variant="outline">
              {course}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">Progress</h4>
        <div className="flex items-center gap-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${
                progress > 70
                  ? "bg-green-500"
                  : progress > 40
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm whitespace-nowrap">{progress}% Complete</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">Assignments</h4>
        <p className="text-sm">
          {studentDetails.assignments.submitted}/{studentDetails.assignments.total} Submitted,
          Average Score: {studentDetails.assignments.averageScore}%
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">Attendance</h4>
        <p className="text-sm">
          {studentDetails.attendance.percentage}% ({studentDetails.attendance.present}/
          {studentDetails.attendance.total} sessions)
        </p>
      </div>
    </div>
  );
};

export default StudentProfileDetails;
