
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface Attachment {
  id: string;
  name: string;
  type: string;
}

interface ResourcesTabProps {
  attachments: Attachment[];
  handleDownload: (attachmentId: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ attachments, handleDownload }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-3">Attachments</h3>
        <div className="space-y-2">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>{attachment.name}</span>
                <span className="text-xs uppercase text-muted-foreground">({attachment.type})</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDownload(attachment.id)}
              >
                <Download size={16} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;
