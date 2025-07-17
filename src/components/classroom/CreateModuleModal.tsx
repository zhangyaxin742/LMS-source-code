
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  moduleId: string;
}

interface Module {
  id: string;
  name: string;
  overview: string;
  topics: Topic[];
}

interface CreateModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (module: Module) => void;
  editingModule: Module | null;
}

const CreateModuleModal: React.FC<CreateModuleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingModule,
}) => {
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const [topics, setTopics] = useState<string[]>([""]);
  
  useEffect(() => {
    if (editingModule) {
      setName(editingModule.name);
      setOverview(editingModule.overview);
      setTopics(editingModule.topics.map(topic => topic.name));
    } else {
      resetForm();
    }
  }, [editingModule, isOpen]);
  
  const resetForm = () => {
    setName("");
    setOverview("");
    setTopics([""]);
  };
  
  const handleSave = () => {
    const filteredTopics = topics.filter(topic => topic.trim() !== "");
    
    const moduleId = editingModule ? editingModule.id : `m${Date.now()}`;
    
    const newModule: Module = {
      id: moduleId,
      name,
      overview,
      topics: filteredTopics.map((topicName, index) => ({
        id: editingModule && index < editingModule.topics.length ? 
          editingModule.topics[index].id : 
          `t${Date.now()}-${index}`,
        name: topicName,
        moduleId
      }))
    };
    
    onSave(newModule);
    resetForm();
    onClose();
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const addTopic = () => {
    setTopics([...topics, ""]);
  };
  
  const removeTopic = (index: number) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };
  
  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingModule ? "Edit Module" : "Create Module"}</DialogTitle>
          <DialogDescription>
            {editingModule ? "Update the module details and topics." : "Add a new module with topics to your classroom."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Module Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Week 1: Foundations of UX and UI Design"
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea
              id="overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Provide a brief overview of this module"
              className="h-24"
            />
          </div>
          
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label>Topics</Label>
              <Button type="button" variant="ghost" size="sm" onClick={addTopic}>
                <Plus size={16} className="mr-1" /> Add Topic
              </Button>
            </div>
            
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={topic}
                    onChange={(e) => handleTopicChange(index, e.target.value)}
                    placeholder={`Topic ${index + 1}`}
                    className="flex-grow"
                  />
                  {topics.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeTopic(index)}>
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name || topics.every(t => t.trim() === "")}>
            {editingModule ? "Update Module" : "Create Module"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModuleModal;
