
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMockClassroomData } from "../classroomData";

export const useClassroomState = (classroomId: string) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("modules");
  const [newPost, setNewPost] = useState("");

  // Get classroom data
  const classroom = getMockClassroomData(classroomId);

  const handleViewTopic = (topicId: string) => {
    navigate(`/student-classroom/${classroomId}/topic/${topicId}`);
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    // In a real app, this would send the post to an API
    setNewPost("");
  };

  const handleLike = (postId: string) => {
    // In a real app, this would update likes via an API
    console.log(`Liked post: ${postId}`);
  };

  const handleBackToClassrooms = () => {
    navigate("/student-classrooms");
  };

  return {
    activeTab,
    setActiveTab,
    newPost,
    setNewPost,
    classroom,
    handleViewTopic,
    handlePostSubmit,
    handleLike,
    handleBackToClassrooms
  };
};
