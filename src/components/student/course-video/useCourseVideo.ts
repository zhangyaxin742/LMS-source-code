
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TopicAttachment {
  id: string;
  name: string;
  type: string;
}

interface TopicAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

interface TopicDiscussion {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies: number;
}

interface Topic {
  id: string | undefined;
  title: string;
  description: string;
  videoUrl: string;
  instructor: string;
  duration: string;
  attachments: TopicAttachment[];
  assignment?: TopicAssignment;
  discussions: TopicDiscussion[];
}

export const useCourseVideo = (topicId: string | undefined) => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [textContent, setTextContent] = useState("");
  
  // Mock topic data
  const topic: Topic = {
    id: topicId,
    title: "UI vs UX: Understanding the Difference",
    description: "Learn about user interface design vs user experience design and how they work together.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Using a real embed URL
    instructor: "Thomas Anderson",
    duration: "15 min",
    attachments: [
      { id: "att-1", name: "UI/UX Cheat Sheet", type: "pdf" },
      { id: "att-2", name: "Example Projects", type: "zip" }
    ],
    assignment: {
      id: "assignment-1",
      title: "Compare UI and UX in an Existing Product",
      description: "Analyze and document the UI and UX elements of a digital product of your choice.",
      dueDate: "2023-09-10",
      status: "pending" // Added status
    },
    discussions: [
      { 
        id: "disc-1", 
        author: "Emily Johnson", 
        content: "I found the distinction between affordances and signifiers particularly interesting!", 
        timestamp: "2 days ago",
        replies: 3
      },
      {
        id: "disc-2",
        author: "Michael Chen",
        content: "Does anyone have examples of good UI but poor UX in modern applications?",
        timestamp: "1 day ago",
        replies: 5
      }
    ]
  };
  
  const handleComplete = () => {
    setCompleted(true);
    // In a real app, you would save this to the backend
  };
  
  const handleBack = () => {
    navigate(`/student-courses`);
  };
  
  const handleDownload = (attachmentId: string) => {
    console.log("Downloading attachment:", attachmentId);
  };
  
  const handleAssignment = () => {
    // Open submit modal instead of navigating
    setIsSubmitModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsSubmitModalOpen(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  const handleCommentSubmit = (commentText: string) => {
    if (commentText.trim()) {
      console.log("Submitting comment:", commentText);
    }
  };

  return {
    topic,
    completed,
    isSubmitModalOpen,
    textContent,
    handleComplete,
    handleBack,
    handleDownload,
    handleAssignment,
    handleCloseModal,
    handleTextChange,
    handleCommentSubmit
  };
};
