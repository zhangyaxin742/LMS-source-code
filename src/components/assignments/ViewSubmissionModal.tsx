
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Submission } from "./types";
import SubmissionView, { SubmissionViewFooter } from "./SubmissionView";

interface ViewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission;
  onGrade: () => void;
}

const ViewSubmissionModal: React.FC<ViewSubmissionModalProps> = ({
  isOpen,
  onClose,
  submission,
  onGrade
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Student Submission</DialogTitle>
        </DialogHeader>
        
        <SubmissionView 
          submission={submission} 
          onGrade={onGrade} 
        />
        
        <DialogFooter className="mt-6 gap-2">
          <SubmissionViewFooter 
            onClose={onClose} 
            onGrade={onGrade} 
            status={submission.status} 
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubmissionModal;
