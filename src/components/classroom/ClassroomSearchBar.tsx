
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, List } from "lucide-react";

interface ClassroomSearchBarProps {
  searchQuery: string;
  viewMode: "grid" | "list";
  onSearchChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
}

const ClassroomSearchBar: React.FC<ClassroomSearchBarProps> = ({
  searchQuery,
  viewMode,
  onSearchChange,
  onViewModeChange,
}) => {
  return (
    <div className="flex items-center justify-between space-x-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search classrooms..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="flex border rounded-md overflow-hidden">
        <Button 
          variant={viewMode === "grid" ? "default" : "ghost"} 
          size="sm" 
          onClick={() => onViewModeChange("grid")}
          className="rounded-none"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button 
          variant={viewMode === "list" ? "default" : "ghost"} 
          size="sm" 
          onClick={() => onViewModeChange("list")}
          className="rounded-none"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ClassroomSearchBar;
