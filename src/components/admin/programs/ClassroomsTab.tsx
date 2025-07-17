
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
import { Users, GraduationCap } from "lucide-react";
import { Classroom } from "./types";

interface ClassroomsTabProps {
  classrooms: Classroom[];
  formatDate: (dateString: string) => string;
}

const ClassroomsTab: React.FC<ClassroomsTabProps> = ({ classrooms, formatDate }) => {
  if (classrooms.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <div className="flex justify-center items-center mb-3">
          <Users size={48} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No classrooms found</h3>
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
            <TableHead>Classroom Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Tutors</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classrooms.map((classroom) => (
            <TableRow key={classroom.id}>
              <TableCell className="font-medium">{classroom.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{classroom.program}</Badge>
              </TableCell>
              <TableCell>{formatDate(classroom.startDate)}</TableCell>
              <TableCell>{formatDate(classroom.endDate)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-primary" />
                  {classroom.students}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <GraduationCap size={14} className="text-primary" />
                  {classroom.tutors}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClassroomsTab;
