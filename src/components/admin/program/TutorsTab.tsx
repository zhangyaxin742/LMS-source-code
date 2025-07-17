
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "./types";

interface TutorsTabProps {
  assignedTutors: string[];
  toggleUser: (userId: string, role: "student" | "tutor") => void;
  users: User[];
}

const TutorsTab: React.FC<TutorsTabProps> = ({
  assignedTutors,
  toggleUser,
  users
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Assign Tutors</h3>
        <Badge variant="outline">{assignedTutors.length} selected</Badge>
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
              .filter(user => user.role === "tutor")
              .map(tutor => (
                <TableRow key={tutor.id}>
                  <TableCell>{tutor.name}</TableCell>
                  <TableCell>{tutor.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={assignedTutors.includes(tutor.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleUser(tutor.id, "tutor")}
                    >
                      {assignedTutors.includes(tutor.id) ? "Assigned" : "Assign"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {users.filter(user => user.role === "tutor").length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No tutors available to assign
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TutorsTab;
