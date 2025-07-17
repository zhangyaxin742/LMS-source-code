
import React, { useState } from "react";
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
import { Clock } from "lucide-react";

interface AddTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (topic: { title: string; description: string; duration: string }) => void;
  moduleId: string;
}

const AddTopicModal: React.FC<AddTopicModalProps> = ({
  isOpen,
  onClose,
  onSave,
  moduleId,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("30 mins");

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title,
      description,
      duration,
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setDuration("30 mins");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Topic</DialogTitle>
          <DialogDescription>
            Add a new topic to this module. Topics help organize your course content.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="required">Topic Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Introduction to Color Theory"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief description of this topic"
              className="h-20"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="duration" className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> Duration
            </Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 30 mins"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            Add Topic
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicModal;
