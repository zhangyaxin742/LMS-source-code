
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, ClipboardList, Users, MessageSquare, Megaphone } from "lucide-react";
import ModulesTab from "./tabs/ModulesTab";
import AssignmentsTab from "./tabs/AssignmentsTab";
import StudentsTab from "./tabs/StudentsTab";
import FeedTab from "./tabs/FeedTab";
import AnnouncementsTab from "./tabs/AnnouncementsTab";

interface ClassroomTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  classroom: any;
  newPost: string;
  setNewPost: (post: string) => void;
  handlePostSubmit: () => void;
  handleLike: (postId: string) => void;
  handleViewTopic: (topicId: string) => void;
}

const ClassroomTabs: React.FC<ClassroomTabsProps> = ({
  activeTab,
  setActiveTab,
  classroom,
  newPost,
  setNewPost,
  handlePostSubmit,
  handleLike,
  handleViewTopic
}) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="modules" className="flex items-center">
          <BookOpen className="mr-2 h-4 w-4" />
          Modules
        </TabsTrigger>
        <TabsTrigger value="assignments" className="flex items-center">
          <ClipboardList className="mr-2 h-4 w-4" />
          Assignments
        </TabsTrigger>
        <TabsTrigger value="students" className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Students
        </TabsTrigger>
        <TabsTrigger value="feed" className="flex items-center">
          <MessageSquare className="mr-2 h-4 w-4" />
          Class Feed
        </TabsTrigger>
        <TabsTrigger value="announcements" className="flex items-center">
          <Megaphone className="mr-2 h-4 w-4" />
          Announcements
        </TabsTrigger>
      </TabsList>

      <TabsContent value="modules" className="space-y-6">
        <ModulesTab 
          modules={classroom.modules} 
          onViewTopic={handleViewTopic} 
        />
      </TabsContent>

      <TabsContent value="assignments" className="space-y-6">
        <AssignmentsTab assignments={classroom.assignments} />
      </TabsContent>

      <TabsContent value="students" className="space-y-6">
        <StudentsTab students={classroom.students} />
      </TabsContent>

      <TabsContent value="feed" className="space-y-6">
        <FeedTab 
          feeds={classroom.feeds}
          handlePostSubmit={handlePostSubmit}
          handleLike={handleLike}
          newPost={newPost}
          setNewPost={setNewPost}
        />
      </TabsContent>

      <TabsContent value="announcements" className="space-y-6">
        <AnnouncementsTab announcements={classroom.announcements} />
      </TabsContent>
    </Tabs>
  );
};

export default ClassroomTabs;
