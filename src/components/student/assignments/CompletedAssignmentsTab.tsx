
import React from "react";
import CompletedAssignmentCard from "./CompletedAssignmentCard";
import EmptyAssignmentState from "./EmptyAssignmentState";

interface CompletedAssignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  submittedDate: string;
  status: string;
  grade: string;
  feedback: string;
}

interface CompletedAssignmentsTabProps {
  assignments: CompletedAssignment[];
  searchTerm: string;
  courseFilter: string;
  onViewDetails: (id: number) => void;
}

const CompletedAssignmentsTab: React.FC<CompletedAssignmentsTabProps> = ({
  assignments,
  searchTerm,
  courseFilter,
  onViewDetails,
}) => {
  return (
    <div className="space-y-6">
      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <CompletedAssignmentCard
            key={assignment.id}
            assignment={assignment}
            onViewDetails={onViewDetails}
          />
        ))
      ) : (
        <EmptyAssignmentState 
          searchTerm={searchTerm} 
          courseFilter={courseFilter} 
          type="completed" 
        />
      )}
    </div>
  );
};

export default CompletedAssignmentsTab;
