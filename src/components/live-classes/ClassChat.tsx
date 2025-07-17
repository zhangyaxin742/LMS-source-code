
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { ChatMessage } from "@/types/liveClass";

interface ClassChatProps {
  messages: ChatMessage[];
  classId: string;
  isLive: boolean;
}

const ClassChat: React.FC<ClassChatProps> = ({ messages, classId, isLive }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(messages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      sender: {
        id: "current-user-id",
        name: "Instructor",
        role: "instructor",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date().toISOString(),
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage("");
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[500px] max-h-[500px]">
      {!isLive && chatMessages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-muted/20 rounded-md">
          <h3 className="text-lg font-medium">Chat is unavailable</h3>
          <p className="text-muted-foreground">
            {isLive 
              ? "Chat will be enabled once the class starts."
              : "Chat history will be available during and after live sessions."}
          </p>
        </div>
      )}

      {(isLive || chatMessages.length > 0) && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10 rounded-t-md">
            {chatMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            ) : (
              chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-start gap-3 ${
                    message.sender.role === "instructor" 
                      ? "justify-start" 
                      : "justify-start"
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <img 
                      src={message.sender.avatar || "/placeholder.svg"} 
                      alt={message.sender.name} 
                    />
                  </Avatar>
                  
                  <div className="space-y-1 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {message.sender.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    
                    <div 
                      className={`p-3 rounded-md text-sm ${
                        message.sender.role === "instructor"
                          ? "bg-primary/10"
                          : "bg-secondary/30"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form 
            onSubmit={handleSendMessage} 
            className="flex gap-2 p-2 border-t"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isLive ? "Type your message..." : "Chat is disabled"}
              disabled={!isLive}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!isLive || !newMessage.trim()}
            >
              <Send size={16} />
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ClassChat;
