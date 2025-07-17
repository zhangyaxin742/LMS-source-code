
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LinkSubmissionFormProps {
  linkUrl: string;
  onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LinkSubmissionForm: React.FC<LinkSubmissionFormProps> = ({
  linkUrl,
  onLinkChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="url-input">External Link</Label>
      <Input
        id="url-input"
        placeholder="https://..."
        value={linkUrl}
        onChange={onLinkChange}
      />
      <p className="text-xs text-muted-foreground">
        Provide a link to your external work (e.g., GitHub, Figma, Google Docs)
      </p>
    </div>
  );
};

export default LinkSubmissionForm;
