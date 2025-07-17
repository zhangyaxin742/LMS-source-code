
import React from "react";
import { Classroom } from "@/types/classroom";
import ClassroomCard from "./ClassroomCard";
import ClassroomEmptyState from "./ClassroomEmptyState";

interface ClassroomGridProps {
  classrooms: Classroom[];
  onClassroomClick: (id: string) => void;
}

const ClassroomGrid: React.FC<ClassroomGridProps> = ({ classrooms, onClassroomClick }) => {
  if (classrooms.length === 0) {
    return <ClassroomEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classrooms.map((classroom, index) => (
        <ClassroomCard
          key={classroom.id}
          id={classroom.id}
          title={classroom.name}
          program={classroom.program}
          students={classroom.studentCount}
          startDate={classroom.status === "upcoming" ? "Starting soon" : "Started 3 months ago"}
          materials={classroom.moduleCount}
          upcoming={classroom.status === "active" ? "Tomorrow, 2:00 PM" : undefined}
          onClick={onClassroomClick}
          index={index}
        />
      ))}
    </div>
  );
};

export default ClassroomGrid;
