
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StudentSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
      <Input
        placeholder="Search by name or email..."
        className="pl-9 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default StudentSearch;
