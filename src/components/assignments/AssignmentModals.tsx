
import React from "react";
import EditAssignmentModal from "@/components/assignments/EditAssignment";
import DeleteAssignmentDialog from "@/components/assignments/DeleteAssignmentDialog";
import GradeAssignmentModal from "@/components/assignments/GradeAssignmentModal";
import ViewSubmissionModal from "@/components/assignments/ViewSubmissionModal";
import { Assignment, Module, Submission } from "./types";

interface AssignmentModalsProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isGradeModalOpen: boolean;
  setIsGradeModalOpen: (open: boolean) => void;
  isViewSubmissionModalOpen: boolean;
  setIsViewSubmissionModalOpen: (open: boolean) => void;
  selectedSubmission: Submission | null;
  assignment: Assignment | null;
  modules: Module[];
  id?: string;
  handleUpdateAssignment: (updatedAssignment: Assignment) => void;
  handleDeleteAssignment: () => void;
  handleCloseSubmissions: () => void;
  handleCloseGradeModal: () => void;
  location: any;
  navigate: (path: string, options?: any) => void;
}

const AssignmentModals: React.FC<AssignmentModalsProps> = ({
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
  modules,
  id,
  handleUpdateAssignment,
  handleDeleteAssignment,
  handleCloseSubmissions,
  handleCloseGradeModal,
  location,
  navigate
}) => {
  return (
    <>
      <DeleteAssignmentDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteAssignment}
        onCloseSubmissions={handleCloseSubmissions}
      />
      
      {assignment && (
        <EditAssignmentModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            // Remove edit=true from URL if it exists
            if (location.search && location.search.includes('edit=true')) {
              navigate(`/assignments/${id}`);
            }
          }}
          onSave={handleUpdateAssignment}
          modules={modules}
          assignment={{
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            totalPoints: assignment.totalPoints,
            submissionType: assignment.submissionType,
            allowLateSubmission: assignment.allowLateSubmission,
            assignTo: assignment.assignTo || "all",
            linkedTopic: assignment.linkedTopic,
            attachments: assignment.resources
          }}
        />
      )}
      
      {selectedSubmission && (
        <>
          <ViewSubmissionModal
            isOpen={isViewSubmissionModalOpen}
            onClose={() => setIsViewSubmissionModalOpen(false)}
            submission={selectedSubmission}
            onGrade={() => {
              setIsViewSubmissionModalOpen(false);
              setIsGradeModalOpen(true);
            }}
          />
          
          <GradeAssignmentModal
            isOpen={isGradeModalOpen}
            onClose={handleCloseGradeModal}
            submission={selectedSubmission}
          />
        </>
      )}
    </>
  );
};

export default AssignmentModals;
