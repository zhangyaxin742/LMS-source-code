
import React from "react";
import { Button } from "@/components/ui/button";
import { Submission } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Clock, CalendarDays } from "lucide-react";

interface SubmissionViewProps {
  submission: Submission;
  onGrade: () => void;
}

export interface SubmissionViewFooterProps {
  onClose: () => void;
  onGrade: () => void;
  status: "submitted" | "late" | "not_submitted" | "graded";
}

export const SubmissionViewFooter: React.FC<SubmissionViewFooterProps> = ({
  onClose,
  onGrade,
  status
}) => {
  return (
    <>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
      {status !== "graded" && (
        <Button onClick={onGrade}>
          Grade Submission
        </Button>
      )}
    </>
  );
};

const SubmissionView: React.FC<SubmissionViewProps> = ({
  submission,
  onGrade
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-green-500">Submitted</Badge>;
      case "late":
        return <Badge className="bg-amber-500">Late</Badge>;
      case "not_submitted":
        return <Badge className="bg-red-500">Not Submitted</Badge>;
      case "graded":
        return <Badge className="bg-blue-500">Graded</Badge>;
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-6 p-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{submission.assignmentName}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>Due: {formatDate(submission.dueDate)}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {getStatusBadge(submission.status)}
            {submission.grade && (
              <div className="mt-2 text-sm font-semibold">
                Grade: {submission.grade}/{submission.totalPoints}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Submitted: {formatDate(submission.submittedAt)}</span>
        </div>

        <div className="border p-4 rounded-md bg-muted/30">
          <h4 className="font-medium mb-2">Student Response</h4>
          {submission.content ? (
            <div className="whitespace-pre-wrap text-sm">{submission.content}</div>
          ) : (
            <div className="text-sm text-muted-foreground">No text response provided.</div>
          )}
        </div>

        {submission.attachments && submission.attachments.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Attachments</h4>
            <div className="space-y-2">
              {submission.attachments.map((file, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {submission.feedback && (
          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-2">Instructor Feedback</h4>
            <div className="bg-muted/30 p-3 rounded-md whitespace-pre-wrap text-sm">
              {submission.feedback}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default SubmissionView;
