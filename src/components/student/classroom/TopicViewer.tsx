
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  ExternalLink, 
  Clock,
  CheckCircle,
  ClipboardList
} from "lucide-react";

interface TopicViewerProps {
  classroomId: string;
  topicId: string;
}

const TopicViewer: React.FC<TopicViewerProps> = ({ classroomId, topicId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");

  // Mock data for the topic
  const topic = {
    id: topicId,
    title: "Design Principles",
    moduleTitle: "Introduction to UI Design",
    description: "Learn about the fundamental principles of design that guide UI development.",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample embed URL
    content: `
      <div>
        <h2>Core Design Principles</h2>
        <p>The following principles form the foundation of good UI design:</p>
        <ul>
          <li><strong>Balance:</strong> Distribution of visual weight</li>
          <li><strong>Contrast:</strong> Differentiation between elements</li>
          <li><strong>Consistency:</strong> Unified design language</li>
          <li><strong>Alignment:</strong> Organized layout structure</li>
          <li><strong>Proximity:</strong> Grouping related elements</li>
        </ul>
        <p>Understanding and applying these principles will help you create intuitive and visually appealing interfaces.</p>
      </div>
    `,
    duration: "18 minutes",
    completed: false,
    materials: [
      { name: "Design Principles Cheat Sheet", url: "#", type: "pdf" },
      { name: "UI Examples Gallery", url: "#", type: "link" }
    ],
    assignment: {
      id: "assign-1",
      title: "Design Principles Analysis",
      description: "Analyze a website of your choice using the design principles discussed in this topic.",
      dueDate: "October 10, 2023",
      status: "pending",
      submissionLink: "https://forms.example.com/submit"
    }
  };

  const handleCompleteContent = () => {
    // In a real app, this would update the completion status in the backend
    console.log(`Marking topic ${topicId} as complete`);
    // show success message or update UI
  };

  const handleBackToClassroom = () => {
    navigate(`/student-classroom/${classroomId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="pl-0"
          onClick={handleBackToClassroom}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Classroom
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{topic.title}</CardTitle>
              <CardDescription className="mt-1">
                Module: {topic.moduleTitle}
              </CardDescription>
              <div className="flex items-center mt-2 gap-2">
                <Badge variant="outline">{topic.type === "video" ? "Video" : "Document"}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {topic.duration}
                </div>
              </div>
            </div>
            <Badge className={topic.completed ? "bg-green-100 text-green-600" : ""}>
              {topic.completed ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="content" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Materials
          </TabsTrigger>
          <TabsTrigger value="assignment" className="flex items-center">
            <ClipboardList className="mr-2 h-4 w-4" />
            Assignment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              {topic.type === "video" ? (
                <div className="aspect-video mb-6">
                  <iframe
                    src={topic.videoUrl}
                    className="w-full h-full rounded-md"
                    title={topic.title}
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null}
              
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: topic.content }}></div>
              
              {!topic.completed && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleCompleteContent}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Complete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Learning Materials</CardTitle>
              <CardDescription>
                Resources to help you understand this topic better
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topic.materials.map((material, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded-md bg-muted/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        {material.type === "pdf" ? (
                          <FileText size={16} />
                        ) : (
                          <ExternalLink size={16} />
                        )}
                      </div>
                      <span className="font-medium">{material.name}</span>
                    </div>
                    
                    <Button size="sm" variant="outline" asChild>
                      <a href={material.url} target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignment" className="space-y-6">
          {topic.assignment ? (
            <Card>
              <CardHeader>
                <CardTitle>{topic.assignment.title}</CardTitle>
                <CardDescription>Due: {topic.assignment.dueDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">{topic.assignment.description}</p>
                <Badge 
                  className={
                    topic.assignment.status === 'submitted' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-amber-100 text-amber-600'
                  }
                >
                  {topic.assignment.status === 'submitted' ? 'Submitted' : 'Pending Submission'}
                </Badge>
              </CardContent>
              <CardFooter>
                {topic.assignment.status !== 'submitted' && (
                  <Button className="w-full sm:w-auto" onClick={() => window.open(topic.assignment?.submissionLink, '_blank')}>
                    Submit Assignment
                    <ExternalLink size={14} className="ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground">No assignment for this topic.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TopicViewer;
