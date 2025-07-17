
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SubmissionTypeSelector from "./submission/SubmissionTypeSelector";
import FileUploadForm from "./submission/FileUploadForm";
import LinkSubmissionForm from "./submission/LinkSubmissionForm";
import TextSubmissionForm from "./submission/TextSubmissionForm";

interface SubmitAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentId: string;
  assignmentTitle: string;
  submissionType?: "file_upload" | "link" | "text_input";
}

const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  isOpen,
  onClose,
  assignmentId,
  assignmentTitle,
  submissionType = "file_upload"
}) => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<"file_upload" | "link" | "text_input">(submissionType);
  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate submission based on selected type
    if (selectedType === "file_upload" && !file) {
      toast({
        title: "File required",
        description: "Please upload a file to submit.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (selectedType === "link" && !linkUrl) {
      toast({
        title: "Link required",
        description: "Please provide a link to your submission.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (selectedType === "text_input" && !textContent) {
      toast({
        title: "Text required",
        description: "Please provide content for your submission.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Submit logic would go here in a real application
    // For now, simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Assignment Submitted",
        description: "Your assignment has been submitted successfully.",
      });
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Assignment</DialogTitle>
          <DialogDescription>
            {assignmentTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <SubmissionTypeSelector 
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
          
          {selectedType === "file_upload" && (
            <FileUploadForm
              file={file}
              onFileChange={handleFileChange}
              onFileRemove={() => setFile(null)}
            />
          )}
          
          {selectedType === "link" && (
            <LinkSubmissionForm
              linkUrl={linkUrl}
              onLinkChange={(e) => setLinkUrl(e.target.value)}
            />
          )}
          
          {selectedType === "text_input" && (
            <TextSubmissionForm
              textContent={textContent}
              onTextChange={(e) => setTextContent(e.target.value)}
            />
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitAssignmentModal;
