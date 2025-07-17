
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AssignmentSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const AssignmentSearch: React.FC<AssignmentSearchProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search assignments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default AssignmentSearch;
