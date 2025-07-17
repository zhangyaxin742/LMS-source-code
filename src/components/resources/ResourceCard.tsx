
import React from "react";
import { FileText, Video, Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import { Resource } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getIcon = () => {
    switch (resource.type) {
      case "Video":
        return <Video className="h-6 w-6 text-blue-500" />;
      case "PDF":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "Presentation":
        return <FileText className="h-6 w-6 text-orange-500" />;
      case "Document":
        return <FileText className="h-6 w-6 text-green-500" />;
      case "Link":
        return <LinkIcon className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card className="glass-card h-full flex flex-col transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="bg-secondary rounded-lg p-2">{getIcon()}</div>
          <div>
            <CardTitle className="text-lg font-medium">{resource.title}</CardTitle>
            {resource.linkedClassroom && (
              <span className="text-xs text-muted-foreground">
                {resource.linkedClassroom.name}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {resource.description}
        </p>
        
        {(resource.linkedModule || resource.linkedTopic) && (
          <div className="mt-2 flex flex-col gap-1">
            {resource.linkedModule && (
              <span className="text-xs text-muted-foreground">
                Module: {resource.linkedModule.name}
              </span>
            )}
            {resource.linkedTopic && (
              <span className="text-xs text-muted-foreground">
                Topic: {resource.linkedTopic.name}
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <div className="text-xs text-muted-foreground">{resource.uploadDate}</div>
        
        <div className="flex gap-2">
          {resource.type === "Link" ? (
            <Button size="sm" variant="outline" className="flex gap-1 items-center">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Visit</span>
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="flex gap-1 items-center">
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
