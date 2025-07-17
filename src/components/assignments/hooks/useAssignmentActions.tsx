
import { useToast } from "@/components/ui/use-toast";
import { Assignment, Submission } from "@/components/assignments/types";

export const useAssignmentActions = (
  assignment: Assignment | null,
  setAssignment: (assignment: Assignment | null) => void,
  selectedSubmission: Submission | null,
  setSelectedSubmission: (submission: Submission | null) => void,
  setIsViewSubmissionModalOpen: (open: boolean) => void,
  setIsGradeModalOpen: (open: boolean) => void,
  setIsEditModalOpen: (open: boolean) => void,
  setIsDeleteDialogOpen: (open: boolean) => void,
  navigate: (path: string, options?: any) => void
) => {
  const { toast } = useToast();

  const handleSendReminders = () => {
    toast({
      title: "Reminders Sent",
      description: `Reminders have been sent to ${assignment?.studentsNotSubmitted?.length} students.`
    });
  };

  const handleUploadResource = () => {
    toast({
      title: "Upload Resource",
      description: "This functionality would allow uploading new resources for the assignment."
    });
  };

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsViewSubmissionModalOpen(true);
  };

  const handleGradeSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsGradeModalOpen(true);
    setIsViewSubmissionModalOpen(false);
  };

  const handleEditAssignment = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateAssignment = (updatedAssignment: Assignment) => {
    if (!assignment) return;
    
    // Preserve the original properties while updating the editable ones
    setAssignment({
      ...assignment,
      title: updatedAssignment.title,
      description: updatedAssignment.description,
      dueDate: updatedAssignment.dueDate,
      totalPoints: updatedAssignment.totalPoints,
      submissionType: updatedAssignment.submissionType,
      allowLateSubmission: updatedAssignment.allowLateSubmission,
      assignTo: updatedAssignment.assignTo || "all",
      linkedTopic: updatedAssignment.linkedTopic,
      resources: updatedAssignment.attachments ? [...updatedAssignment.attachments] : assignment.resources
    });
    
    toast({
      title: "Assignment Updated",
      description: "The assignment has been updated successfully."
    });
    
    // Remove the edit=true from URL if it exists
    if (location.search.includes('edit=true')) {
      navigate(`/assignments/${assignment.id}`, { replace: true });
    }
  };

  const handleCloseGradeModal = () => {
    setSelectedSubmission(null);
    setIsGradeModalOpen(false);
  };

  const handleDeleteAssignment = () => {
    toast({
      title: "Assignment Deleted",
      description: "The assignment has been deleted successfully."
    });
    setIsDeleteDialogOpen(false);
    navigate("/assignments");
  };

  const handleCloseSubmissions = () => {
    toast({
      title: "Submissions Closed",
      description: "No more submissions will be accepted for this assignment."
    });
    setIsDeleteDialogOpen(false);
  };
  
  const handleMarkAsCompleted = () => {
    if (!assignment) return;
    
    setAssignment({
      ...assignment,
      status: "completed"
    });
    
    toast({
      title: "Assignment Completed",
      description: "The assignment has been marked as completed."
    });
  };

  return {
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
  };
};
