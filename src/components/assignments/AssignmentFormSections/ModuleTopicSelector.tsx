
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Module } from "@/components/assignments/types";

interface ModuleTopicSelectorProps {
  modules: Module[];
  moduleId: string;
  setModuleId: (value: string) => void;
  topicId: string;
  setTopicId: (value: string) => void;
}

const ModuleTopicSelector: React.FC<ModuleTopicSelectorProps> = ({
  modules,
  moduleId,
  setModuleId,
  topicId,
  setTopicId
}) => {
  // Find the selected module
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
    <div className="space-y-4">
      <div>
        <Label className="text-base required">Link to Module/Topic</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Select the module and topic this assignment belongs to
        </p>
        <Select value={moduleId} onValueChange={setModuleId}>
          <SelectTrigger className="mt-1.5">
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
        <div>
          <Label className="text-base required">Topic</Label>
          <Select value={topicId} onValueChange={setTopicId}>
            <SelectTrigger className="mt-1.5">
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
    </div>
  );
};

export default ModuleTopicSelector;
