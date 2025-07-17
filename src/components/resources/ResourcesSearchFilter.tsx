
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResourceCategory } from "./types";

interface ResourcesSearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: ResourceCategory | null;
  onCategoryChange: (category: ResourceCategory | null) => void;
}

const ResourcesSearchFilter: React.FC<ResourcesSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  const categories: ResourceCategory[] = [
    "PDF",
    "Presentation", 
    "Document", 
    "Video", 
    "Link", 
    "Other"
  ];

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div>
        <div className="text-sm mb-2 font-medium">Filter by type:</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
            >
              {category}
            </Badge>
          ))}
          {selectedCategory && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onCategoryChange(null)}
              className="text-xs"
            >
              Clear filter
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesSearchFilter;
