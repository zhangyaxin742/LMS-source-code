
import { useEffect } from "react";
import { useAssignmentsState } from "./useAssignmentsState";
import { useModulesData } from "./useModulesData";
import { useMockData } from "./useMockData";
import { useAssignmentFilters } from "./useAssignmentFilters";
import { useAssignmentActions } from "./useAssignmentActions";

export const useAssignments = (classroomId: string) => {
  const { 
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
    setStatusFilter 
  } = useAssignmentsState(classroomId);
  
  const { modules } = useModulesData();
  const { mockAssignments, mockSubmissions } = useMockData();
  
  const { 
    handleSaveAssignment, 
    handleUpdateAssignment, 
    markAssignmentAsCompleted 
  } = useAssignmentActions(setAssignments);

  // Initialize with demo data
  useEffect(() => {
    setAssignments(mockAssignments);
    setSubmissions(mockSubmissions);
  }, [classroomId, setAssignments, setSubmissions]);

  const { 
    filteredSubmissions, 
    ongoingAssignments, 
    completedAssignments 
  } = useAssignmentFilters(assignments, submissions, searchTerm, statusFilter);

  return {
    assignments,
    submissions,
    selectedSubmission,
    selectedAssignment,
    ongoingAssignments,
    completedAssignments,
    filteredSubmissions,
    searchTerm,
    statusFilter,
    modules,
    setSearchTerm,
    setStatusFilter,
    setSelectedSubmission,
    setSelectedAssignment,
    setAssignments,
    setSubmissions,
    handleSaveAssignment,
    handleUpdateAssignment,
    markAssignmentAsCompleted
  };
};
