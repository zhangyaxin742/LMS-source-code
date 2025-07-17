
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Clock } from "lucide-react";

interface DeleteAssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onCloseSubmissions: () => void;
}

const DeleteAssignmentDialog: React.FC<DeleteAssignmentDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  onCloseSubmissions
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assignment Actions</DialogTitle>
          <DialogDescription>
            Choose an action for this assignment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button 
            variant="destructive" 
            className="w-full justify-start" 
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Assignment
            <span className="ml-auto text-xs opacity-70">Permanent Action</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onCloseSubmissions}
          >
            <Clock className="mr-2 h-4 w-4" />
            Close Submissions
            <span className="ml-auto text-xs opacity-70">Can be reopened</span>
          </Button>
        </div>
        
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAssignmentDialog;
