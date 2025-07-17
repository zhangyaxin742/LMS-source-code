
import { useParams } from "react-router-dom";
import { useAssignmentsData } from "./useAssignmentsData";
import { useAssignmentState } from "./useAssignmentState";
import { useFetchAssignmentData } from "./useFetchAssignmentData";
import { useAssignmentNavigation } from "./useAssignmentNavigation";
import { useAssignmentActions } from "./useAssignmentActions";

export const useAssignmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { assignments, modules } = useAssignmentsData();
  
  const {
    activeTab,
    setActiveTab,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isGradeModalOpen,
    setIsGradeModalOpen,
    isViewSubmissionModalOpen,
    setIsViewSubmissionModalOpen,
    selectedSubmission,
    setSelectedSubmission,
    assignment,
    setAssignment,
    submissions,
    setSubmissions,
  } = useAssignmentState();
  
  // Fetch assignment data
  useFetchAssignmentData(id, assignments, setAssignment, setSubmissions);
  
  // Handle navigation
  const {
    location,
    navigate,
    handleBackToAssignments,
    handleCreateAssignment
  } = useAssignmentNavigation(isEditModalOpen, setIsEditModalOpen);
  
  // Handle actions
  const {
    handleSendReminders,
    handleUploadResource,
    handleViewSubmission,
    handleGradeSubmission,
    handleEditAssignment,
    handleUpdateAssignment,
    handleCloseGradeModal,
    handleDeleteAssignment,
    handleCloseSubmissions,
    handleMarkAsCompleted
  } = useAssignmentActions(
    assignment,
    setAssignment,
    selectedSubmission,
    setSelectedSubmission,
    setIsViewSubmissionModalOpen,
    setIsGradeModalOpen,
    setIsEditModalOpen,
    setIsDeleteDialogOpen,
    navigate
  );

  return {
    id,
    modules,
    activeTab,
    setActiveTab,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isGradeModalOpen,
    setIsGradeModalOpen,
    isViewSubmissionModalOpen,
    setIsViewSubmissionModalOpen,
    selectedSubmission,
    assignment,
    submissions,
    handleSendReminders,
    handleUploadResource,
    handleViewSubmission,
    handleGradeSubmission,
    handleEditAssignment,
    handleUpdateAssignment,
    handleCloseGradeModal,
    handleDeleteAssignment,
    handleCloseSubmissions,
    handleMarkAsCompleted,
    handleBackToAssignments,
    handleCreateAssignment,
    location,
    navigate
  };
};
