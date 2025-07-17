
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface AssignmentData {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  grade?: string;
  feedback?: string;
  submissionLink?: string;
}

interface AssignmentsTabProps {
  assignments: AssignmentData[];
}

const AssignmentsTab: React.FC<AssignmentsTabProps> = ({ assignments }) => {
  return (
    <div className="space-y-6">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
                <CardDescription>Due: {assignment.dueDate}</CardDescription>
              </div>
              <Badge 
                variant={assignment.status === 'submitted' ? 'outline' : 'default'}
                className={
                  assignment.status === 'submitted' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-amber-100 text-amber-600'
                }
              >
                {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {assignment.status === 'submitted' ? (
              <div className="space-y-4">
                <div className="bg-muted/20 p-4 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Grade</p>
                      <p className="text-2xl font-bold">{assignment.grade}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Feedback</p>
                      <p className="text-sm">{assignment.feedback}</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Submission
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm">
                  Complete this assignment and submit it before the due date.
                </p>
                {/* Single submit button */}
                <Button 
                  className="w-full" 
                  onClick={() => assignment.submissionLink && window.open(assignment.submissionLink, '_blank')}
                >
                  Submit Assignment
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssignmentsTab;
