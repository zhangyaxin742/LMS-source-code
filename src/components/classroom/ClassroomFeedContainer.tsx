
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Image, File, Smile, Paperclip } from "lucide-react";
import ClassroomFeedComponent from "@/components/classroom/ClassroomFeed";

const ClassroomFeedContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState("");
  
  // Mock data for a specific classroom
  const classroom = {
    id: id || "classroom1",
    title: "Design Beginners",
    program: "UI/UX Design",
    image: "/placeholder.svg",
    description: "This is a beginner's course in UI/UX design principles and practices."
  };
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to the server
    console.log("Sending message:", messageText);
    setMessageText("");
  };
  
  return (
    <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6 max-w-4xl">
      <div className="flex items-center mb-4 sm:mb-6 gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="pl-0 text-muted-foreground"
          onClick={() => navigate(`/classroom-management/${id}`)}
        >
          <ArrowLeft size={16} className="mr-1" />
          <span className="hidden sm:inline">Back to Classroom</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>
      
      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-muted/10">
          <Avatar className="h-12 w-12">
            <img src={classroom.image} alt={classroom.title} />
          </Avatar>
          
          <div>
            <CardTitle className="text-xl">{classroom.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{classroom.program}</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 sm:p-6 border-b">
            <p className="text-muted-foreground mb-6">{classroom.description}</p>
          </div>
          
          <div className="border-t">
            <ClassroomFeedComponent classroomId={id} classroomName={classroom.title} />
            
            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 hidden sm:flex">
                  <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-sm font-medium">
                    TA
                  </div>
                </Avatar>
                
                <div className="relative flex-grow">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="pr-24"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
                      <Image size={18} className="text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
                      <File size={18} className="text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:hidden">
                      <Paperclip size={18} className="text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile size={18} className="text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                
                <Button size="sm" onClick={handleSendMessage} disabled={!messageText.trim()}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassroomFeedContainer;
