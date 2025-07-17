
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgramStudent } from "@/types/programStudent";

interface StudentsTableProps {
  students: ProgramStudent[];
  onViewProfile: (student: ProgramStudent) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({ students, onViewProfile }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Classrooms</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length > 0 ? (
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <img src={student.profileImage} alt={student.name} />
                    </Avatar>
                    {student.name}
                  </div>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Badge variant={student.completionStatus === "completed" ? "success" : "default"}>
                    {student.completionStatus === "completed" ? "Completed" : "Ongoing"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {student.assignedClassrooms.map((classroom, index) => (
                      <Badge key={index} variant="outline" className="text-xs whitespace-nowrap">
                        {classroom}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${student.progress === 100 ? 'bg-green-500' : student.progress > 70 ? 'bg-green-500' : student.progress > 40 ? 'bg-amber-500' : 'bg-red-500'}`} 
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-sm">{student.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => onViewProfile(student)}
                  >
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No students match your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;
