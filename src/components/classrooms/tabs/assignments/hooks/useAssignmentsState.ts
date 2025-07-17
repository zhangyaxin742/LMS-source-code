
import { useState } from "react";
import { Assignment, Submission } from "@/components/assignments/types";

export const useAssignmentsState = (classroomId: string) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  return {
    assignments,
    submissions,
    selectedSubmission,
    selectedAssignment,
    searchTerm,
    statusFilter,
    setAssignments,
    setSubmissions,
    setSelectedSubmission,
    setSelectedAssignment,
    setSearchTerm,
    setStatusFilter,
  };
};
