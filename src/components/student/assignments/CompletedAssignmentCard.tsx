
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle } from "lucide-react";
import { formatDate } from "./utils";

interface CompletedAssignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  submittedDate: string;
  status: string;
  grade: string;
  feedback: string;
}

interface CompletedAssignmentCardProps {
  assignment: CompletedAssignment;
  onViewDetails: (id: number) => void;
}

const CompletedAssignmentCard: React.FC<CompletedAssignmentCardProps> = ({
  assignment,
  onViewDetails,
}) => {
  return (
    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
          <div>
            <CardTitle>{assignment.title}</CardTitle>
            <CardDescription>{assignment.course}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="font-medium">Grade: {assignment.grade}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="p-3 bg-secondary/50 rounded-md">
            <p className="text-sm font-medium mb-1">Instructor Feedback:</p>
            <p className="text-sm">{assignment.feedback}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-muted-foreground" />
              <span>Due: {formatDate(assignment.dueDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle size={14} className="text-green-500" />
              <span>Submitted: {formatDate(assignment.submittedDate)}</span>
            </div>
          </div>

          <Button 
            variant="outline"
            onClick={() => onViewDetails(assignment.id)}
          >
            View Submission
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedAssignmentCard;
