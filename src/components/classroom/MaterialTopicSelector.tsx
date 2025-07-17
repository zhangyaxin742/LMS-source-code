
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Module, Topic } from "./types/material";

interface MaterialTopicSelectorProps {
  modules: Module[];
  moduleId: string;
  topicId: string;
  setModuleId: (value: string) => void;
  setTopicId: (value: string) => void;
}

const MaterialTopicSelector: React.FC<MaterialTopicSelectorProps> = ({ 
  modules, 
  moduleId, 
  topicId, 
  setModuleId, 
  setTopicId 
}) => {
  const selectedModule = modules.find(m => m.id === moduleId);
  
  // Reset topic when module changes
  useEffect(() => {
    if (moduleId && selectedModule?.topics?.length > 0) {
      // If we change module and there's no topic selected or the selected topic doesn't belong to this module
      const topicBelongsToModule = selectedModule.topics.some(t => t.id === topicId);
      if (!topicId || !topicBelongsToModule) {
        // Auto-select the first topic
        setTopicId(selectedModule.topics[0].id);
      }
    } else {
      // Clear topic selection if no module is selected
      setTopicId("");
    }
  }, [moduleId, selectedModule, setTopicId, topicId]);
  
  return (
    <>
      <div className="grid gap-2">
        <Label>Link to Module/Topic (Optional)</Label>
        <Select value={moduleId} onValueChange={setModuleId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a module" />
          </SelectTrigger>
          <SelectContent>
            {modules.map((module) => (
              <SelectItem key={module.id} value={module.id}>
                {module.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {moduleId && selectedModule?.topics?.length > 0 && (
        <div className="grid gap-2">
          <Label>Topic</Label>
          <Select value={topicId} onValueChange={setTopicId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {selectedModule.topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default MaterialTopicSelector;
