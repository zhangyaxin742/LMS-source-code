
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Program } from "./types";

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedProgram: string;
  setSelectedProgram: (program: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  programs: Program[];
  activeTab: string;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedProgram,
  setSelectedProgram,
  selectedBranch,
  setSelectedBranch,
  programs,
  activeTab
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-[200px]">
        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
          <SelectTrigger>
            <SelectValue placeholder="Select program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            {programs.map(program => (
              <SelectItem key={program.id} value={program.name}>
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {activeTab === "courses" && (
        <div className="w-[200px]">
          <Select 
            value={selectedBranch} 
            onValueChange={setSelectedBranch}
            disabled={selectedProgram === "all"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {selectedProgram !== "all" && programs
                .find(p => p.name === selectedProgram)?.branches
                .map((branch, index) => (
                  <SelectItem key={index} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
