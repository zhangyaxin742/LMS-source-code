
import React from "react";
import AssignmentHeader from "@/components/assignments/AssignmentHeader";
import AssignmentTabs from "@/components/assignments/AssignmentTabs";
import AssignmentTemplates from "@/components/assignments/AssignmentTemplates";
import CreateAssignmentModal from "@/components/classroom/CreateAssignmentModal";
import { useAssignmentsData } from "@/components/assignments/hooks/useAssignmentsData";

const Assignments = () => {
  const {
    isCreateModalOpen,
    activeTab,
    setActiveTab,
    modules,
    templates,
    ongoingAssignments,
    completedAssignments,
    handleCreateAssignment,
    handleCloseCreateModal,
    handleSaveAssignment,
    handleMarkAsCompleted,
    handleViewAssignment,
    handleEditAssignment
  } = useAssignmentsData();

  return (
    <div className="container mx-auto space-y-8 pb-6">
      <AssignmentHeader onCreateAssignment={handleCreateAssignment} />

      <AssignmentTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ongoingAssignments={ongoingAssignments}
        completedAssignments={completedAssignments}
        onCreateAssignment={handleCreateAssignment}
        onMarkAsCompleted={handleMarkAsCompleted}
        onView={handleViewAssignment}
        onEdit={handleEditAssignment}
      />
      
      <AssignmentTemplates templates={templates} />

      <CreateAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSave={handleSaveAssignment}
        modules={modules}
      />
    </div>
  );
};

export default Assignments;
