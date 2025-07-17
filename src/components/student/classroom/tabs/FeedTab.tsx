
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Heart, MessageSquare, Share, Calendar } from "lucide-react";

interface FeedPostData {
  id: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  type: string;
  likes: number;
  comments: number;
}

interface FeedTabProps {
  feeds: FeedPostData[];
  handlePostSubmit: () => void;
  handleLike: (postId: string) => void;
  newPost: string;
  setNewPost: (post: string) => void;
}

const FeedTab: React.FC<FeedTabProps> = ({ 
  feeds, 
  handlePostSubmit, 
  handleLike, 
  newPost, 
  setNewPost 
}) => {
  return (
    <div className="space-y-6">
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
            placeholder="Post something to your class..."
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
        {feeds.map((post) => (
          <Card key={post.id} className="overflow-hidden transition-colors duration-200 border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-2 border-primary/10">
                  <User className="h-6 w-6" />
                </Avatar>
                <div>
                  <p className="font-medium leading-none">{post.author}</p>
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
                  <span>{post.date}</span>
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
        ))}
      </div>
    </div>
  );
};

export default FeedTab;
