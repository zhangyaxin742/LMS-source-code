
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ClassroomForm from "./ClassroomForm";
import { Classroom } from "@/types/classroom";

interface CreateClassroomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateClassroom: (classroom: Omit<Classroom, "id" | "studentCount" | "moduleCount" | "course">) => void;
}

const CreateClassroomDialog: React.FC<CreateClassroomDialogProps> = ({
  open,
  onOpenChange,
  onCreateClassroom,
}) => {
  const handleSubmit = (classroomData: Omit<Classroom, "id" | "studentCount" | "moduleCount" | "course">) => {
    onCreateClassroom(classroomData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Classroom</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new classroom.
          </DialogDescription>
        </DialogHeader>

        <ClassroomForm 
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassroomDialog;
