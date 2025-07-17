
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "./types";

interface StudentsTabProps {
  assignedStudents: string[];
  toggleUser: (userId: string, role: "student" | "tutor") => void;
  users: User[];
}

const StudentsTab: React.FC<StudentsTabProps> = ({
  assignedStudents,
  toggleUser,
  users
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Assign Students</h3>
        <Badge variant="outline">{assignedStudents.length} selected</Badge>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[80px] text-right">Assign</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .filter(user => user.role === "student")
              .map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={assignedStudents.includes(student.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleUser(student.id, "student")}
                    >
                      {assignedStudents.includes(student.id) ? "Assigned" : "Assign"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {users.filter(user => user.role === "student").length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No students available to assign
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentsTab;
