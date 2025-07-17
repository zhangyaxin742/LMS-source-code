
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, AlertCircle, FileText } from "lucide-react";
import { Submission } from "@/components/assignments/types";

interface SubmissionsListProps {
  submissions: Submission[];
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onGrade: (submission: Submission) => void;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({
  submissions,
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onGrade
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="secondary">Submitted</Badge>;
      case "late":
        return <Badge variant="destructive">Late</Badge>;
      case "graded":
        return <Badge variant="default">Graded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Submissions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Review and grade student submissions
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search students..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All submissions</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="graded">Graded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {submissions.length === 0 ? (
          <div className="text-center py-10">
            <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No submissions found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your filters" 
                : "Students haven't submitted any assignments yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 text-sm text-muted-foreground">
                  <th className="py-3 px-4 text-left font-medium">Student</th>
                  <th className="py-3 px-4 text-left font-medium">Assignment</th>
                  <th className="py-3 px-4 text-left font-medium">Submitted</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-muted/10">
                    <td className="py-3 px-4 text-sm">{submission.studentName}</td>
                    <td className="py-3 px-4 text-sm">{submission.assignmentName || "Pending Assignment"}</td>
                    <td className="py-3 px-4 text-sm">{submission.submittedAt}</td>
                    <td className="py-3 px-4 text-sm">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Button 
                        variant={submission.status === "graded" ? "outline" : "default"}
                        size="sm" 
                        className="text-primary"
                        onClick={() => onGrade(submission)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        {submission.status === "graded" ? "Review" : "Grade"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionsList;
