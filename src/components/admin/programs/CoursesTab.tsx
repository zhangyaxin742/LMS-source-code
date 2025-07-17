
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen } from "lucide-react";
import { Course } from "./types";

interface CoursesTabProps {
  courses: Course[];
}

const CoursesTab: React.FC<CoursesTabProps> = ({ courses }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <div className="flex justify-center items-center mb-3">
          <BookOpen size={48} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Modules</TableHead>
            <TableHead>Students</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{course.program}</Badge>
              </TableCell>
              <TableCell>{course.branch}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>{course.modules}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-primary" />
                  {course.students}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesTab;
