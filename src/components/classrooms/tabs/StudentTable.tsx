
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, UserX, Eye, User } from "lucide-react";
import { Student } from "@/types/student";

interface StudentTableProps {
  filteredStudents: Student[];
  handleViewProfile: (student: Student) => void;
  handleRemoveStudent: (id: string) => void;
  getProgressColor: (progress: number) => string;
}

const StudentTable: React.FC<StudentTableProps> = ({
  filteredStudents,
  handleViewProfile,
  handleRemoveStudent,
  getProgressColor,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-muted/50 p-2">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {student.progress}%
                    </div>
                    <Progress
                      value={student.progress}
                      className={getProgressColor(student.progress)}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={student.status === "active" ? "default" : "outline"}
                  >
                    {student.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{student.lastActive}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewProfile(student)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleRemoveStudent(student.id)}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Remove</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex flex-col items-center">
                  <User className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No students found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or add students to the classroom
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
