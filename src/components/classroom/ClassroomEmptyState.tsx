
import React from "react";

const ClassroomEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-md">
      <h3 className="text-xl font-medium text-gray-500 mb-2">No classrooms found</h3>
      <p className="text-gray-400">Create a new classroom to get started</p>
    </div>
  );
};

export default ClassroomEmptyState;
