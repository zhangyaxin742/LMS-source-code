
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileText, Link } from "lucide-react";

interface SubmissionTypeSelectorProps {
  selectedType: "file_upload" | "link" | "text_input";
  onTypeChange: (value: "file_upload" | "link" | "text_input") => void;
}

const SubmissionTypeSelector: React.FC<SubmissionTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  return (
    <div className="space-y-2">
      <Label>Submission Type</Label>
      <RadioGroup 
        value={selectedType}
        onValueChange={(value) => onTypeChange(value as any)}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="file_upload" id="file_upload" />
          <Label htmlFor="file_upload" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            File Upload
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="link" id="link" />
          <Label htmlFor="link" className="flex items-center">
            <Link className="h-4 w-4 mr-2" />
            External Link
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="text_input" id="text_input" />
          <Label htmlFor="text_input" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Text Input
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SubmissionTypeSelector;
