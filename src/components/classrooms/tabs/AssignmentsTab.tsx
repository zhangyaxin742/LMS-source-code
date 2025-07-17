
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CreateAssignmentModal from "@/components/classroom/CreateAssignmentModal";
import EditAssignmentModal from "@/components/assignments/EditAssignment"; 
import GradeAssignmentModal from "@/components/assignments/GradeAssignmentModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AssignmentList from "./assignments/AssignmentList";
import SubmissionsList from "./assignments/SubmissionsList";
import EmptyState from "./assignments/EmptyState";
import { useAssignments } from "./assignments/hooks/useAssignments";

interface AssignmentsTabProps {
  classroomId: string;
}

const AssignmentsTab: React.FC<AssignmentsTabProps> = ({ classroomId }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("assignments");
  
  const { 
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
  } = useAssignments(classroomId);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setIsEditModalOpen(true);
  };

  const handleOpenGradeModal = (submission) => {
    setSelectedSubmission(submission);
    setIsGradeModalOpen(true);
  };

  const handleCloseGradeModal = () => {
    setSelectedSubmission(null);
    setIsGradeModalOpen(false);
  };

  const handleViewAssignment = (assignment) => {
    // Navigate to assignment details with the current path as state
    navigate(`/assignments/${assignment.id}`, { 
      state: { from: location.pathname } 
    });
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>
          <Button onClick={handleOpenCreateModal}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>

        <TabsContent value="assignments">
          {assignments.length === 0 ? (
            <EmptyState onCreateClick={handleOpenCreateModal} />
          ) : (
            <div className="space-y-6">
              {ongoingAssignments.length > 0 && (
                <AssignmentList 
                  title="Ongoing Assignments"
                  status="ongoing"
                  assignments={ongoingAssignments}
                  onEdit={handleEditAssignment}
                  onView={handleViewAssignment}
                  onMarkAsCompleted={markAssignmentAsCompleted}
                />
              )}
              
              {completedAssignments.length > 0 && (
                <AssignmentList 
                  title="Completed Assignments"
                  status="completed"
                  assignments={completedAssignments}
                  onEdit={handleEditAssignment}
                  onView={handleViewAssignment}
                />
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="submissions">
          <SubmissionsList 
            submissions={filteredSubmissions}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            onGrade={handleOpenGradeModal}
          />
        </TabsContent>
      </Tabs>

      <CreateAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSave={handleSaveAssignment}
        modules={modules}
      />
      
      {selectedAssignment && (
        <EditAssignmentModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateAssignment}
          modules={modules}
          assignment={selectedAssignment}
        />
      )}

      {selectedSubmission && (
        <GradeAssignmentModal
          isOpen={isGradeModalOpen}
          onClose={handleCloseGradeModal}
          submission={selectedSubmission}
        />
      )}
    </div>
  );
};

export default AssignmentsTab;
