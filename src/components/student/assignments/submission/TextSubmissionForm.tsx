
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextSubmissionFormProps {
  textContent: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextSubmissionForm: React.FC<TextSubmissionFormProps> = ({
  textContent,
  onTextChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="text-input">Your Submission</Label>
      <Textarea
        id="text-input"
        placeholder="Enter your submission content here..."
        className="min-h-[200px]"
        value={textContent}
        onChange={onTextChange}
      />
    </div>
  );
};

export default TextSubmissionForm;
