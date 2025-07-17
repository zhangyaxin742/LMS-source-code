
import React from "react";
import BackButton from "./BackButton";
import ClassroomHeader from "./ClassroomHeader";
import ClassroomTabs from "./ClassroomTabs";
import { useClassroomState } from "./hooks/useClassroomState";

interface ClassroomEntryProps {
  classroomId: string;
}

const ClassroomEntry: React.FC<ClassroomEntryProps> = ({ classroomId }) => {
  const {
    activeTab,
    setActiveTab,
    newPost,
    setNewPost,
    classroom,
    handleViewTopic,
    handlePostSubmit,
    handleLike,
    handleBackToClassrooms
  } = useClassroomState(classroomId);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <BackButton onClick={handleBackToClassrooms} />
      
      <ClassroomHeader classroom={classroom} />

      <ClassroomTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        classroom={classroom}
        newPost={newPost}
        setNewPost={setNewPost}
        handlePostSubmit={handlePostSubmit}
        handleLike={handleLike}
        handleViewTopic={handleViewTopic}
      />
    </div>
  );
};

export default ClassroomEntry;
