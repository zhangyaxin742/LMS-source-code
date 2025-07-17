
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignmentSearch from "@/components/student/assignments/AssignmentSearch";
import CourseFilter from "@/components/student/assignments/CourseFilter";
import PendingAssignmentsTab from "@/components/student/assignments/PendingAssignmentsTab";
import CompletedAssignmentsTab from "@/components/student/assignments/CompletedAssignmentsTab";
import SubmitAssignmentModal from "@/components/student/assignments/SubmitAssignmentModal";
import { useAssignments } from "@/hooks/student/useAssignments";

const StudentAssignments = () => {
  const {
    searchTerm,
    setSearchTerm,
    courseFilter,
    setCourseFilter,
    filteredPending,
    filteredCompleted,
    isSubmitModalOpen,
    selectedAssignment,
    getDaysRemaining,
    getStatusColor,
    handleViewDetails,
    handleSubmitAssignment,
    handleCloseSubmitModal
  } = useAssignments();
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Assignments</h1>
        <p className="text-muted-foreground">View and manage your course assignments</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <AssignmentSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CourseFilter courseFilter={courseFilter} setCourseFilter={setCourseFilter} />
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending ({filteredPending.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filteredCompleted.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-6">
          <PendingAssignmentsTab
            assignments={filteredPending}
            searchTerm={searchTerm}
            courseFilter={courseFilter}
            getDaysRemaining={getDaysRemaining}
            getStatusColor={getStatusColor}
            onViewDetails={handleViewDetails}
            onSubmit={handleSubmitAssignment}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <CompletedAssignmentsTab
            assignments={filteredCompleted}
            searchTerm={searchTerm}
            courseFilter={courseFilter}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
      </Tabs>
      
      {selectedAssignment && (
        <SubmitAssignmentModal
          isOpen={isSubmitModalOpen}
          onClose={handleCloseSubmitModal}
          assignmentId={selectedAssignment.id.toString()}
          assignmentTitle={selectedAssignment.title}
          submissionType="file_upload"
        />
      )}
    </div>
  );
};

export default StudentAssignments;
