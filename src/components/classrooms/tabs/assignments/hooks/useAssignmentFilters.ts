
import { Assignment, Submission } from "@/components/assignments/types";

export const useAssignmentFilters = (
  assignments: Assignment[],
  submissions: Submission[],
  searchTerm: string,
  statusFilter: string | null
) => {
  // Filter submissions based on search and status filter
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          submission.assignmentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Categorize assignments based on status
  const ongoingAssignments = assignments.filter(assignment => 
    assignment.status === "ongoing"
  );

  const completedAssignments = assignments.filter(assignment => 
    assignment.status === "completed"
  );

  return {
    filteredSubmissions,
    ongoingAssignments,
    completedAssignments
  };
};
