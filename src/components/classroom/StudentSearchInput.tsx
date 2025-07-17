
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface StudentSearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const StudentSearchInput: React.FC<StudentSearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by name or email..."
        className="pl-9"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default StudentSearchInput;
