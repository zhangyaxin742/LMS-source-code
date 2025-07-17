
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface AssignmentDescriptionProps {
  description: string;
  attachments: Attachment[];
}

const AssignmentDescription: React.FC<AssignmentDescriptionProps> = ({ 
  description, 
  attachments 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        
        {attachments.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Attachments</h3>
            <div className="space-y-2">
              {attachments.map(attachment => (
                <div 
                  key={attachment.id}
                  className="flex items-center justify-between p-2 bg-secondary/20 rounded-md"
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>{attachment.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({attachment.size})</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignmentDescription;
