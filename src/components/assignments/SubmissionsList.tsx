
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Filter, Users, Send } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import StatusBadge from "./StatusBadge";
import { Submission } from "./types";

interface SubmissionsListProps {
  submissions: Submission[];
  onGradeSubmission: (submission: Submission) => void;
  onViewSubmission: (submission: Submission) => void;
  onSendReminders: () => void;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({
  submissions,
  onGradeSubmission,
  onViewSubmission,
  onSendReminders
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter submissions based on search and status
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Users size={16} />
              </div>
            </div>
            
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center">
                    <Filter size={16} className="mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="not_submitted">Not Submitted</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Submitted</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Grade</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredSubmissions.slice(0, 10).map((submission, index) => (
                <motion.tr 
                  key={submission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-muted/20"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center text-xs font-medium">
                          {submission.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                      </Avatar>
                      <span className="font-medium">{submission.studentName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {submission.status === "not_submitted" ? "—" : submission.date}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <StatusBadge status={submission.status} />
                  </td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell">
                    {submission.grade || '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {submission.status !== "not_submitted" && (
                        <Button 
                          variant={submission.status === "graded" ? "outline" : "default"}
                          size="sm"
                          onClick={() => onGradeSubmission(submission)}
                        >
                          {submission.status === "graded" ? "Edit Grade" : "Grade"}
                        </Button>
                      )}
                      
                      {submission.status !== "not_submitted" && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onViewSubmission(submission)}
                        >
                          View
                        </Button>
                      )}
                      
                      {submission.status === "not_submitted" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={onSendReminders}
                        >
                          <Send size={14} className="mr-1" />
                          Remind
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionsList;
