
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatDate, formatTime } from "./utils";
import { Button } from "@/components/ui/button";

interface RubricItem {
  name: string;
  score: number;
  maxScore: number;
}

interface AssignmentDetailsSidebarProps {
  dueDate: string;
  progress: number;
  status: string;
  grade?: string;
  earnedPoints?: number;
  maxPoints?: number;
  feedback?: string;
  rubric?: RubricItem[];
  onSubmit?: () => void;
}

const AssignmentDetailsSidebar: React.FC<AssignmentDetailsSidebarProps> = ({
  dueDate,
  progress,
  status,
  grade,
  earnedPoints,
  maxPoints,
  feedback,
  rubric,
  onSubmit
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">Due Date</span>
            </div>
            <span>{formatDate(dueDate)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">Time</span>
            </div>
            <span>{formatTime(dueDate)}</span>
          </div>

          {/* Progress bar only shown when needed (for in-progress assignments) */}
          {status === 'in-progress' && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {/* Status indicator */}
          <div className="flex justify-between items-center">
            <span className="text-sm">Status</span>
            <span className={`text-sm font-medium ${
              status === 'pending' ? 'text-amber-500' : 
              status === 'submitted' ? 'text-blue-500' :
              status === 'graded' ? 'text-green-500' : ''
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </CardContent>
      </Card>

      {status === 'graded' && (
        <Card>
          <CardHeader>
            <CardTitle>Feedback & Grade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{grade}</div>
                  <div className="text-xs text-green-600">{earnedPoints}/{maxPoints}</div>
                </div>
              </div>
            </div>
            
            {rubric && rubric.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Rubric</h3>
                {rubric.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>{item.score}/{item.maxScore}</span>
                    </div>
                    <div className="w-full bg-secondary h-1.5 rounded-full">
                      <div 
                        className="bg-primary h-1.5 rounded-full" 
                        style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {feedback && (
              <div className="mt-4 p-3 bg-secondary/30 rounded-md">
                <h3 className="font-medium mb-2">Instructor Comments</h3>
                <p className="text-sm">{feedback}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {status === 'pending' && onSubmit && (
        <Button 
          className="w-full"
          onClick={onSubmit}
        >
          Submit Assignment
          <Upload className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default AssignmentDetailsSidebar;
