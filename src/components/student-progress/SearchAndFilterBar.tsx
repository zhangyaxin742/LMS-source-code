
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchAndFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeClassroom: string | null;
  setActiveClassroom: (id: string | null) => void;
  classrooms: {
    id: string;
    name: string;
  }[];
}

const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  activeClassroom,
  setActiveClassroom,
  classrooms,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Student Progress</h1>
        <p className="text-muted-foreground mt-1">Track and analyze student performance</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 h-9 rounded-lg bg-secondary/60 border border-border/50 text-sm subtle-ring-focus"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="h-9 rounded-lg bg-secondary/60 border border-border/50 text-sm subtle-ring-focus"
          value={activeClassroom || ""}
          onChange={(e) => setActiveClassroom(e.target.value || null)}
        >
          <option value="">All Classrooms</option>
          {classrooms.map(classroom => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
