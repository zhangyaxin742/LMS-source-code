
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CourseFilterProps {
  courseFilter: string;
  setCourseFilter: (value: string) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ 
  courseFilter, 
  setCourseFilter 
}) => {
  return (
    <Select value={courseFilter} onValueChange={setCourseFilter}>
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder="Filter by course" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Courses</SelectItem>
        <SelectItem value="UI/UX Design Fundamentals">UI/UX Design Fundamentals</SelectItem>
        <SelectItem value="Design Systems">Design Systems</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CourseFilter;
