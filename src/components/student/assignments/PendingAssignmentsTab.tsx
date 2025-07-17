
import React from "react";
import PendingAssignmentCard from "./PendingAssignmentCard";
import EmptyAssignmentState from "./EmptyAssignmentState";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  progress: number;
}

interface PendingAssignmentsTabProps {
  assignments: Assignment[];
  searchTerm: string;
  courseFilter: string;
  getDaysRemaining: (dueDate: string) => string;
  getStatusColor: (dueDate: string) => string;
  onViewDetails: (id: number) => void;
  onSubmit: (assignment: Assignment) => void;
}

const PendingAssignmentsTab: React.FC<PendingAssignmentsTabProps> = ({
  assignments,
  searchTerm,
  courseFilter,
  getDaysRemaining,
  getStatusColor,
  onViewDetails,
  onSubmit,
}) => {
  return (
    <div className="space-y-6">
      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <PendingAssignmentCard
            key={assignment.id}
            assignment={assignment}
            getDaysRemaining={getDaysRemaining}
            getStatusColor={getStatusColor}
            onViewDetails={onViewDetails}
            onSubmit={onSubmit}
          />
        ))
      ) : (
        <EmptyAssignmentState 
          searchTerm={searchTerm} 
          courseFilter={courseFilter} 
          type="pending" 
        />
      )}
    </div>
  );
};

export default PendingAssignmentsTab;
