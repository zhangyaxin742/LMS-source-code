
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Heart, Share, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface Post {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

interface ClassroomFeedProps {
  classroomId?: string;
  classroomName?: string;
}

const ClassroomFeed: React.FC<ClassroomFeedProps> = ({ classroomId, classroomName = "Classroom" }) => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post1",
      authorName: "Sarah Johnson",
      authorRole: "Student",
      content: "Has anyone started working on the wireframing assignment? I'm looking for some inspiration!",
      timestamp: "Today at 10:23 AM",
      likes: 4,
      comments: 2
    },
    {
      id: "post2",
      authorName: "Prof. Michael Chen",
      authorRole: "Tutor",
      content: "Just a reminder that your UI mockups are due this Friday. Feel free to ask questions here or during office hours tomorrow.",
      timestamp: "Yesterday at 3:45 PM",
      likes: 12,
      comments: 5
    },
    {
      id: "post3",
      authorName: "Aisha Patel",
      authorRole: "Student",
      content: "I found this great resource on color theory that might help with our current project: https://example.com/color-theory",
      timestamp: "2 days ago",
      likes: 8,
      comments: 3
    }
  ]);

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: `post${Date.now()}`,
      authorName: "Current User", // This would typically come from authentication
      authorRole: "Tutor",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 } 
          : post
      )
    );
  };

  const formatTimestamp = (timestamp: string) => {
    if (timestamp === "Just now") return timestamp;
    return timestamp;
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">{classroomName} Feed</h2>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <User className="h-6 w-6" />
            </Avatar>
            <div>
              <p className="text-sm font-medium">Share with your class</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <Textarea
            placeholder="Announce something to your class..."
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>Post</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="overflow-hidden transition-colors duration-200 border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/10">
                    <User className="h-6 w-6" />
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">{post.authorName}</p>
                    <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm whitespace-pre-wrap">{post.content}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border/40 pt-3">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{formatTimestamp(post.timestamp)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-1 text-sm"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart size={14} className="text-muted-foreground" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-1 text-sm"
                  >
                    <MessageSquare size={14} className="text-muted-foreground" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-1 text-sm hidden sm:flex"
                  >
                    <Share size={14} className="text-muted-foreground" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomFeed;
