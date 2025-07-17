
import React from "react";
import { useParams } from "react-router-dom";
import ClassroomEntry from "@/components/student/classroom/ClassroomEntry";

const StudentClassroomEntryPage = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Invalid classroom ID</div>;
  }
  
  return <ClassroomEntry classroomId={id} />;
};

export default StudentClassroomEntryPage;
