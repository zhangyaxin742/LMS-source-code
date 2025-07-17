
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionItem,
} from "@/components/ui/accordion";
import { BookOpen, Edit, Trash2, Plus, Check, Clock } from "lucide-react";
import { Topic, Module } from "../modules/types";

interface ModuleCardProps {
  module: Module;
  onTopicCompletion: (moduleId: string, topicId: string, isCompleted: boolean) => void;
  onModuleCompletion: (moduleId: string, isCompleted: boolean) => void;
  onDeleteModule: (id: string) => void;
  onAddTopic: (moduleId: string) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onTopicCompletion,
  onModuleCompletion,
  onDeleteModule,
  onAddTopic,
}) => {
  const getTopicCompletionPercent = (module: Module) => {
    if (module.topics.length === 0) return 0;
    const completedCount = module.topics.filter(topic => topic.isCompleted).length;
    return Math.round((completedCount / module.topics.length) * 100);
  };

  return (
    <Card key={module.id} className={module.isCompleted ? "border-green-200" : ""}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start gap-4">
          <Checkbox 
            checked={module.isCompleted}
            onChange={(e) => {
              onModuleCompletion(module.id, e.target.checked);
            }}
            className="mt-1"
          />
          <div>
            <CardTitle className={`text-xl flex items-center ${module.isCompleted ? "text-muted-foreground line-through" : ""}`}>
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              {module.title}
            </CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteModule(module.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{module.topics.length} Topics</span>
          <span>
            {module.isCompleted ? (
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                <Check className="mr-1 h-3 w-3" /> Completed
              </Badge>
            ) : (
              <Badge variant="outline">
                <Clock className="mr-1 h-3 w-3" /> {getTopicCompletionPercent(module)}% Complete
              </Badge>
            )}
          </span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {module.topics.map((topic) => (
            <AccordionItem key={topic.id} value={topic.id} trigger={
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={topic.isCompleted}
                  onChange={(e) => {
                    onTopicCompletion(module.id, topic.id, e.target.checked);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className={topic.isCompleted ? "text-muted-foreground line-through" : ""}>
                  {topic.title}
                </span>
              </div>
            }>
              <div className="space-y-2 pl-8">
                <p>{topic.description}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Duration: {topic.duration}</span>
                  <span>{topic.isCompleted ? "Completed" : "Not completed"}</span>
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onAddTopic(module.id)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Topic
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
