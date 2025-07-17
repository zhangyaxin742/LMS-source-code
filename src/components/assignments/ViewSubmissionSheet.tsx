
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { Submission } from "./types";
import SubmissionView, { SubmissionViewFooter } from "./SubmissionView";

interface ViewSubmissionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission;
  onGrade: () => void;
}

const ViewSubmissionSheet: React.FC<ViewSubmissionSheetProps> = ({
  isOpen,
  onClose,
  submission,
  onGrade
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[650px] max-h-[90vh] overflow-hidden flex flex-col">
        <SheetHeader>
          <SheetTitle>Student Submission</SheetTitle>
        </SheetHeader>
        
        <SubmissionView 
          submission={submission} 
          onGrade={onGrade} 
        />
        
        <SheetFooter className="mt-6 gap-2">
          <SubmissionViewFooter 
            onClose={onClose} 
            onGrade={onGrade} 
            status={submission.status} 
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ViewSubmissionSheet;
