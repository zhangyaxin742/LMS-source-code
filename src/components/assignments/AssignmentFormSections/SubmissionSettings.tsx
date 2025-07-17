
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SubmissionSettingsProps {
  submissionType: "file_upload" | "link" | "text_input";
  setSubmissionType: (value: "file_upload" | "link" | "text_input") => void;
}

const SubmissionSettings: React.FC<SubmissionSettingsProps> = ({
  submissionType,
  setSubmissionType,
}) => {
  return (
    <div>
      <Label className="text-base">Submission Format</Label>
      <RadioGroup 
        value={submissionType} 
        onValueChange={(value) => setSubmissionType(value as "file_upload" | "link" | "text_input")}
        className="flex flex-col space-y-2 mt-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="file_upload" id="file-upload" />
          <Label htmlFor="file-upload">File Upload</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="link" id="link-submission" />
          <Label htmlFor="link-submission">External Link</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="text_input" id="text-input" />
          <Label htmlFor="text-input">Text Input</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SubmissionSettings;
