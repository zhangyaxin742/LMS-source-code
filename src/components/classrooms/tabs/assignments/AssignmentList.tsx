
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Edit, CheckCircle, Eye } from "lucide-react";
import { Assignment } from "@/components/assignments/types";
import { useLocation } from "react-router-dom";

interface AssignmentListProps {
  title: string;
  status: "ongoing" | "completed";
  assignments: Assignment[];
  onEdit?: (assignment: Assignment) => void;
  onView?: (assignment: Assignment) => void;
  onMarkAsCompleted?: (assignment: Assignment) => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({ 
  title, 
  status, 
  assignments, 
  onEdit, 
  onView,
  onMarkAsCompleted
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getStatusIcon = () => {
    switch (status) {
      case "ongoing":
        return <Clock className="h-4 w-4 mr-2 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />;
      default:
        return <Clock className="h-4 w-4 mr-2" />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base font-medium">
          {getStatusIcon()}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="py-3 hover:bg-muted/10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{assignment.title}</h4>
                <div className="flex space-x-2">
                  {status === "ongoing" && onMarkAsCompleted && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onMarkAsCompleted(assignment)}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Mark Completed
                    </Button>
                  )}
                  
                  {onView && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Pass the current path as state when viewing the assignment
                        if (onView) onView(assignment);
                      }}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                  )}
                  
                  {onEdit && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEdit(assignment)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {assignment.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <div>
                    <span>Points: {assignment.totalPoints}</span>
                  </div>
                  {assignment.linkedTopic && (
                    <div>
                      <span>Topic: {assignment.linkedTopic.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentList;
