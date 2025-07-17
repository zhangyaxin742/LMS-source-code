
import React, { useState } from "react";
import { Search, FileText, Video, Link, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockResources } from "@/components/resources/mockData";
import { Resource } from "@/components/resources/types";

interface ExistingResourceSelectorProps {
  onResourceSelect: (resourceId: string, resourceTitle: string, resourceType: string) => void;
}

const ExistingResourceSelector: React.FC<ExistingResourceSelectorProps> = ({ 
  onResourceSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  
  // In a real app, this would come from an API
  const resources = mockResources;
  
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleResourceSelect = (resource: Resource) => {
    setSelectedResource(resource.id);
    onResourceSelect(resource.id, resource.title, resource.type);
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "Link":
        return <Link className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-red-500" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="border rounded-md overflow-hidden max-h-60 overflow-y-auto">
        {filteredResources.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No resources found
          </div>
        ) : (
          <ul className="divide-y">
            {filteredResources.map((resource) => (
              <li 
                key={resource.id}
                className={`p-3 hover:bg-secondary/50 cursor-pointer flex items-center ${
                  selectedResource === resource.id ? 'bg-secondary' : ''
                }`}
                onClick={() => handleResourceSelect(resource)}
              >
                <div className="mr-3">{getIcon(resource.type)}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{resource.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {resource.type} • {resource.uploadDate}
                  </div>
                </div>
                {selectedResource === resource.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExistingResourceSelector;
