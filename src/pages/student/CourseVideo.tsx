
import React from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmitAssignmentModal from "@/components/student/assignments/SubmitAssignmentModal";
import VideoPlayer from "@/components/student/course-video/VideoPlayer";
import VideoHeader from "@/components/student/course-video/VideoHeader";
import VideoControls from "@/components/student/course-video/VideoControls";
import ResourcesTab from "@/components/student/course-video/tabs/ResourcesTab";
import DiscussionsTab from "@/components/student/course-video/tabs/DiscussionsTab";
import NotesTab from "@/components/student/course-video/tabs/NotesTab";
import AssignmentTab from "@/components/student/course-video/tabs/AssignmentTab";
import TranscriptTab from "@/components/student/course-video/tabs/TranscriptTab";
import { useCourseVideo } from "@/components/student/course-video/useCourseVideo";

const CourseVideo = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const {
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
  } = useCourseVideo(topicId);
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <VideoHeader 
        title={topic.title}
        description={topic.description}
        instructor={topic.instructor}
        duration={topic.duration}
        handleBack={handleBack}
      />
      
      <VideoPlayer 
        videoUrl={topic.videoUrl} 
        title={topic.title} 
      />
      
      <VideoControls 
        completed={completed}
        hasAssignment={!!topic.assignment}
        handleComplete={handleComplete}
        handleAssignment={handleAssignment}
      />
      
      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources">
          <ResourcesTab 
            attachments={topic.attachments}
            handleDownload={handleDownload}
          />
        </TabsContent>

        <TabsContent value="discussions">
          <DiscussionsTab 
            discussions={topic.discussions}
            onCommentSubmit={handleCommentSubmit}
          />
        </TabsContent>
        
        <TabsContent value="notes">
          <NotesTab 
            textContent={textContent}
            onTextChange={handleTextChange}
          />
        </TabsContent>
        
        <TabsContent value="assignment">
          <AssignmentTab 
            assignment={topic.assignment}
            handleAssignment={handleAssignment}
          />
        </TabsContent>
        
        <TabsContent value="transcript">
          <TranscriptTab />
        </TabsContent>
      </Tabs>
      
      {topic.assignment && (
        <SubmitAssignmentModal
          isOpen={isSubmitModalOpen}
          onClose={handleCloseModal}
          assignmentId={topic.assignment.id}
          assignmentTitle={topic.assignment.title}
          submissionType="file_upload"
        />
      )}
    </div>
  );
};

export default CourseVideo;
