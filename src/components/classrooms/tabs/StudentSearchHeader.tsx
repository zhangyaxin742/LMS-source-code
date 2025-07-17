
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";

interface StudentSearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddStudentClick: () => void;
  studentCount: number;
}

const StudentSearchHeader: React.FC<StudentSearchHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onAddStudentClick,
  studentCount,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Students ({studentCount})</h2>
        <Button onClick={onAddStudentClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
    </>
  );
};

export default StudentSearchHeader;
