
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Plus, X } from "lucide-react";

interface Attachment {
  name: string;
  type: string;
  size: string;
}

interface AttachmentManagerProps {
  attachments: Attachment[];
  onAddAttachment: () => void;
  onRemoveAttachment: (index: number) => void;
}

const AttachmentManager: React.FC<AttachmentManagerProps> = ({
  attachments,
  onAddAttachment,
  onRemoveAttachment,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Label className="text-base">Assignment Files</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onAddAttachment}
        >
          <Upload className="h-4 w-4 mr-1" />
          Add File
        </Button>
      </div>
      
      <div className="mt-3 space-y-2">
        {attachments.length === 0 ? (
          <div className="text-center py-6 border border-dashed rounded-md text-muted-foreground">
            <p>No files attached</p>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="mt-2"
              onClick={onAddAttachment}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add File
            </Button>
          </div>
        ) : (
          attachments.map((file, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div className="flex items-center">
                <div className="text-sm">{file.name}</div>
                <div className="ml-2 text-xs text-muted-foreground">{file.size}</div>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => onRemoveAttachment(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttachmentManager;
