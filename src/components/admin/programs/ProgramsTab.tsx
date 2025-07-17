
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Users, GraduationCap, BookOpen } from "lucide-react";
import { Program } from "./types";

interface ProgramsTabProps {
  programs: Program[];
  formatCurrency: (amount: number) => string;
  handleEditProgram: (program: Program) => void;
  handleDeleteProgram: (programId: string) => void;
}

const ProgramsTab: React.FC<ProgramsTabProps> = ({
  programs,
  formatCurrency,
  handleEditProgram,
  handleDeleteProgram
}) => {
  if (programs.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <div className="flex justify-center items-center mb-3">
          <BookOpen size={48} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No programs found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or add a new program.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Program Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Branches</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Tutors</TableHead>
            <TableHead>Students</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.map((program) => (
            <TableRow key={program.id}>
              <TableCell className="font-medium">{program.name}</TableCell>
              <TableCell className="max-w-[200px] truncate">{program.description}</TableCell>
              <TableCell>{formatCurrency(program.price)}</TableCell>
              <TableCell>{program.duration}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {program.branches.map((branch, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {branch}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <BookOpen size={14} className="text-primary" />
                  {program.courses}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <GraduationCap size={14} className="text-primary" />
                  {program.tutors}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-primary" />
                  {program.students}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditProgram(program)}>
                    <Edit size={16} className="text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteProgram(program.id)}>
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProgramsTab;
