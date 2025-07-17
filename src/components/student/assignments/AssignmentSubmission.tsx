
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "./utils";

interface Submission {
  id: string;
  name: string;
  date: string;
  size: string;
}

interface AssignmentSubmissionProps {
  status: string;
  submissionDate?: string;
  submissions: Submission[];
  onSubmit: () => void;
}

const AssignmentSubmission: React.FC<AssignmentSubmissionProps> = ({
  status,
  submissionDate,
  submissions,
  onSubmit
}) => {
  if (status === 'submitted' || status === 'graded') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Submission</CardTitle>
          {submissionDate && (
            <CardDescription>
              Submitted on {formatDate(submissionDate)} at {formatTime(submissionDate)}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {submissions.map(submission => (
              <div 
                key={submission.id}
                className="flex items-center justify-between p-2 bg-secondary/20 rounded-md"
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>{submission.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({submission.size})</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        
        {status !== 'graded' && (
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onSubmit}
            >
              Re-submit Assignment
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Assignment</CardTitle>
        <CardDescription>
          Upload your completed work before the deadline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className="p-8 border-2 border-dashed border-primary/20 rounded-md text-center cursor-pointer"
          onClick={onSubmit}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Drag and drop files here, or click to browse</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={onSubmit}
        >
          Submit Assignment
          <Upload className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentSubmission;
