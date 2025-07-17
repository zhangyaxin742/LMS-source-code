
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatDate, formatTime } from "./utils";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  progress: number;
}

interface PendingAssignmentCardProps {
  assignment: Assignment;
  getDaysRemaining: (dueDate: string) => string;
  getStatusColor: (dueDate: string) => string;
  onViewDetails: (id: number) => void;
  onSubmit: (assignment: Assignment) => void;
}

const PendingAssignmentCard: React.FC<PendingAssignmentCardProps> = ({
  assignment,
  getDaysRemaining,
  getStatusColor,
  onViewDetails,
  onSubmit,
}) => {
  return (
    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
          <div>
            <CardTitle>{assignment.title}</CardTitle>
            <CardDescription>{assignment.course}</CardDescription>
          </div>
          <Badge variant={getStatusColor(assignment.dueDate) as any}>
            {getDaysRemaining(assignment.dueDate)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Your progress</span>
            <span className="text-sm">{assignment.progress}%</span>
          </div>
          <Progress value={assignment.progress} className="h-2" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-muted-foreground" />
            <span>Due: {formatDate(assignment.dueDate)} at {formatTime(assignment.dueDate)}</span>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button 
              variant="outline" 
              className="w-full md:w-auto"
              onClick={() => onViewDetails(assignment.id)}
            >
              View Details
            </Button>
            <Button 
              className="w-full md:w-auto"
              onClick={() => onSubmit(assignment)}
            >
              Submit Assignment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingAssignmentCard;
