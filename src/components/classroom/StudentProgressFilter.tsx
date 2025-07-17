
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";

interface StudentProgressFilterProps {
  progressFilter: string | null;
  setProgressFilter: (progress: string | null) => void;
}

const StudentProgressFilter: React.FC<StudentProgressFilterProps> = ({
  progressFilter,
  setProgressFilter,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={progressFilter === null ? "default" : "outline"}
        size="sm"
        onClick={() => setProgressFilter(null)}
        className="h-9"
      >
        All
      </Button>
      <Button
        variant={progressFilter === "high" ? "default" : "outline"}
        size="sm"
        onClick={() => setProgressFilter("high")}
        className="h-9"
      >
        <BarChart2 className="h-4 w-4 mr-1" /> High
      </Button>
      <Button
        variant={progressFilter === "medium" ? "default" : "outline"}
        size="sm"
        onClick={() => setProgressFilter("medium")}
        className="h-9"
      >
        <BarChart2 className="h-4 w-4 mr-1" /> Medium
      </Button>
      <Button
        variant={progressFilter === "low" ? "default" : "outline"}
        size="sm"
        onClick={() => setProgressFilter("low")}
        className="h-9"
      >
        <BarChart2 className="h-4 w-4 mr-1" /> Low
      </Button>
    </div>
  );
};

export default StudentProgressFilter;
