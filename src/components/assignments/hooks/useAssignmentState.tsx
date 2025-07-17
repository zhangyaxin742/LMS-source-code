
import { useState } from "react";
import { Assignment, Submission } from "@/components/assignments/types";

export const useAssignmentState = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isViewSubmissionModalOpen, setIsViewSubmissionModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  return {
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
  };
};
