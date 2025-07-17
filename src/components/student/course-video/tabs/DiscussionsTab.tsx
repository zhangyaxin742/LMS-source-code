
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface Discussion {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies: number;
}

interface DiscussionsTabProps {
  discussions: Discussion[];
  onCommentSubmit: (comment: string) => void;
}

const DiscussionsTab: React.FC<DiscussionsTabProps> = ({ 
  discussions, 
  onCommentSubmit 
}) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (commentText.trim()) {
      onCommentSubmit(commentText);
      setCommentText("");
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-3">Class Discussions</h3>
        <div className="space-y-4 mb-6">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{discussion.author}</span>
                <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
              </div>
              <p className="text-sm mb-2">{discussion.content}</p>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="text-xs">
                  <MessageSquare size={14} className="mr-1" />
                  {discussion.replies} {discussion.replies === 1 ? 'Reply' : 'Replies'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Add to the discussion</h4>
          <textarea 
            className="w-full min-h-[100px] p-3 border rounded-md mb-2"
            placeholder="Share your thoughts or questions with the class..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={!commentText.trim()}
            >
              Post Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionsTab;
