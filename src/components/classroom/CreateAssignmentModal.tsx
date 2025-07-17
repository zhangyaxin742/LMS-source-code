
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
import AssignmentForm from "../assignments/AssignmentForm";
import { Assignment } from "../assignments/types";

interface Module {
  id: string;
  name: string;
  overview: string;
  topics: {
    id: string;
    name: string;
    moduleId: string;
  }[];
}

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assignment: Assignment) => void;
  modules: Module[];
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  modules,
}) => {
  const handleSave = (newAssignment: Assignment) => {
    onSave(newAssignment);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Assignment</DialogTitle>
          <DialogDescription>
            Create a new assignment for your classroom.
          </DialogDescription>
        </DialogHeader>
        
        <AssignmentForm
          onSave={handleSave}
          onCancel={onClose}
          modules={modules}
        />
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              // Trigger form submission via custom event
              document.dispatchEvent(new Event('assignment-submit'));
            }}
          >
            Create Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentModal;
