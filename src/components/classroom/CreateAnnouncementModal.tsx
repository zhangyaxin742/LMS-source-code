
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
import { Bell } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  date: string;
  message: string;
}

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (announcement: Announcement) => void;
}

const CreateAnnouncementModal: React.FC<CreateAnnouncementModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  
  const resetForm = () => {
    setTitle("");
    setMessage("");
  };
  
  const handleSave = () => {
    const getFormattedDate = () => {
      const date = new Date();
      const month = date.toLocaleString('default', { month: 'short' });
      return `${month} ${date.getDate()}, ${date.getFullYear()}`;
    };
    
    const newAnnouncement: Announcement = {
      id: `an${Date.now()}`,
      title,
      date: getFormattedDate(),
      message
    };
    
    onSave(newAnnouncement);
    resetForm();
    onClose();
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
          <DialogDescription>
            Create a new announcement for your students.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Announcement Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., New Assignment Added"
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write the announcement message here"
              className="h-32"
            />
          </div>
          
          <div className="bg-secondary/30 p-4 rounded-md">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Send Notification</p>
                <p className="text-xs text-muted-foreground">
                  This announcement will be sent to all students in the classroom and will appear in their notification feed.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title || !message}>
            Send Announcement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementModal;
