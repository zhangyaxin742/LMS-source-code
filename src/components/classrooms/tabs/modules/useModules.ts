
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Module, Topic } from "./types";

export const useModules = (classroomId: string) => {
  const { toast } = useToast();
  
  // Mock modules data
  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      title: "Introduction to UI Design",
      description: "Learn the fundamentals of user interface design",
      isCompleted: false,
      topics: [
        {
          id: "1-1",
          title: "Design Principles",
          description: "Basic principles of effective UI design",
          duration: "45 mins",
          isCompleted: false,
        },
        {
          id: "1-2",
          title: "Color Theory",
          description: "Understanding color usage in interfaces",
          duration: "30 mins",
          isCompleted: false,
        },
      ],
    },
    {
      id: "2",
      title: "Wireframing and Prototyping",
      description: "Create wireframes and interactive prototypes",
      isCompleted: false,
      topics: [
        {
          id: "2-1",
          title: "Wireframing Basics",
          description: "Learn to create effective wireframes",
          duration: "60 mins",
          isCompleted: false,
        },
        {
          id: "2-2",
          title: "Prototyping with Figma",
          description: "Create interactive prototypes using Figma",
          duration: "90 mins",
          isCompleted: false,
        },
      ],
    },
  ]);

  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [newModule, setNewModule] = useState({
    title: "",
    description: "",
  });

  const handleCreateModule = () => {
    if (!newModule.title) return;

    const module: Module = {
      id: Date.now().toString(),
      title: newModule.title,
      description: newModule.description,
      topics: [],
      isCompleted: false,
    };

    setModules([...modules, module]);
    setNewModule({ title: "", description: "" });
    setIsCreateModuleOpen(false);

    toast({
      title: "Module created",
      description: `${module.title} has been added to the classroom.`,
    });
  };

  const handleDeleteModule = (id: string) => {
    const module = modules.find((m) => m.id === id);
    setModules(modules.filter((m) => m.id !== id));

    toast({
      title: "Module deleted",
      description: `${module?.title} has been removed from the classroom.`,
    });
  };

  const handleTopicCompletion = (moduleId: string, topicId: string, isCompleted: boolean) => {
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        const updatedTopics = module.topics.map(topic => 
          topic.id === topicId ? { ...topic, isCompleted } : topic
        );
        
        const allTopicsCompleted = updatedTopics.every(topic => topic.isCompleted);
        
        return { 
          ...module, 
          topics: updatedTopics,
          isCompleted: allTopicsCompleted
        };
      }
      return module;
    });
    
    setModules(updatedModules);
    
    const module = modules.find(m => m.id === moduleId);
    const topic = module?.topics.find(t => t.id === topicId);
    
    toast({
      title: isCompleted ? "Topic completed" : "Topic marked as incomplete",
      description: `${topic?.title} has been updated.`,
    });
    
    const updatedModule = updatedModules.find(m => m.id === moduleId);
    if (updatedModule?.isCompleted && !modules.find(m => m.id === moduleId)?.isCompleted) {
      toast({
        title: "Module completed",
        description: `All topics in ${updatedModule.title} have been completed!`,
      });
    }
  };

  const handleModuleCompletion = (moduleId: string, isCompleted: boolean) => {
    const updatedModules = modules.map(module => 
      module.id === moduleId 
        ? { 
            ...module, 
            isCompleted,
            topics: module.topics.map(topic => ({ ...topic, isCompleted }))
          }
        : module
    );
    
    setModules(updatedModules);
    
    const module = modules.find(m => m.id === moduleId);
    
    toast({
      title: isCompleted ? "Module completed" : "Module marked as incomplete",
      description: `${module?.title} has been updated.`,
    });
  };

  const handleAddTopic = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setIsAddTopicOpen(true);
  };

  const handleSaveTopic = (topicData: { title: string; description: string; duration: string }) => {
    if (!activeModuleId) return;
    
    const newTopic: Topic = {
      id: `${activeModuleId}-${Date.now()}`,
      title: topicData.title,
      description: topicData.description,
      duration: topicData.duration,
      isCompleted: false,
    };
    
    const updatedModules = modules.map(module => 
      module.id === activeModuleId
        ? { ...module, topics: [...module.topics, newTopic] }
        : module
    );
    
    setModules(updatedModules);
    
    toast({
      title: "Topic added",
      description: `${topicData.title} has been added to the module.`,
    });
  };

  return {
    modules,
    isCreateModuleOpen,
    setIsCreateModuleOpen,
    isAddTopicOpen,
    setIsAddTopicOpen,
    activeModuleId,
    setActiveModuleId,
    newModule,
    setNewModule,
    handleCreateModule,
    handleDeleteModule,
    handleTopicCompletion,
    handleModuleCompletion,
    handleAddTopic,
    handleSaveTopic,
  };
};
