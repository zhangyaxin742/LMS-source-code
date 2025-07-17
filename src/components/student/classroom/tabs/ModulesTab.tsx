
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Video, FileText, ClipboardList, ExternalLink } from "lucide-react";

interface ModuleData {
  id: string;
  title: string;
  topics: {
    id: string;
    title: string;
    completed: boolean;
    type: string;
  }[];
  progress: number;
}

interface ModulesTabProps {
  modules: ModuleData[];
  onViewTopic: (topicId: string) => void;
}

const ModulesTab: React.FC<ModulesTabProps> = ({ modules, onViewTopic }) => {
  const getMaterialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "presentation":
        return <ClipboardList className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "link":
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {modules.map((module) => (
        <Card key={module.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.topics.length} topics</CardDescription>
              </div>
              <Badge variant="outline" className={module.progress === 100 ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"}>
                {module.progress}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Progress value={module.progress} className="h-2" />
            </div>
            <div className="space-y-3">
              {module.topics.map((topic) => (
                <div 
                  key={topic.id} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${topic.completed ? 'bg-green-100 text-green-600' : 'bg-secondary'}`}>
                      {topic.completed ? <CheckCircle size={16} /> : getMaterialIcon(topic.type)}
                    </div>
                    <div>
                      <p className="font-medium">{topic.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{topic.type}</p>
                    </div>
                  </div>
                  <Button 
                    variant={topic.completed ? "outline" : "default"}
                    size="sm"
                    onClick={() => onViewTopic(topic.id)}
                  >
                    {topic.completed ? "Review" : "Start"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModulesTab;
