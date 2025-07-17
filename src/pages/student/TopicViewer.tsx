
import React from "react";
import { useParams } from "react-router-dom";
import TopicViewer from "@/components/student/classroom/TopicViewer";

const StudentTopicViewerPage = () => {
  const { classroomId, topicId } = useParams<{ classroomId: string; topicId: string }>();
  
  if (!classroomId || !topicId) {
    return <div>Invalid classroom or topic ID</div>;
  }
  
  return <TopicViewer classroomId={classroomId} topicId={topicId} />;
};

export default StudentTopicViewerPage;
