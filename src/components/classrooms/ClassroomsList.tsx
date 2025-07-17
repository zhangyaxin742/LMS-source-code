
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Archive } from "lucide-react";
import { Classroom, ClassroomStatus } from "@/types/classroom";

interface ClassroomsListProps {
  classrooms: Classroom[];
  onArchive: (id: string) => void;
}

const getStatusColor = (status: ClassroomStatus) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "completed":
      return "bg-blue-500";
    case "upcoming":
      return "bg-amber-500";
    default:
      return "bg-gray-500";
  }
};

const ClassroomsList: React.FC<ClassroomsListProps> = ({ classrooms, onArchive }) => {
  const navigate = useNavigate();

  if (classrooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-md">
        <h3 className="text-xl font-medium text-gray-500 mb-2">No classrooms found</h3>
        <p className="text-gray-400">Create a new classroom to get started</p>
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
            <TableHead>Course</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Modules</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classrooms.map((classroom) => (
            <TableRow key={classroom.id}>
              <TableCell className="font-medium">{classroom.name}</TableCell>
              <TableCell>{classroom.program}</TableCell>
              <TableCell>{classroom.course}</TableCell>
              <TableCell>{classroom.studentCount}</TableCell>
              <TableCell>{classroom.moduleCount}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(classroom.status)} hover:${getStatusColor(classroom.status)}`}>
                  {classroom.status.charAt(0).toUpperCase() + classroom.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/classroom-detail/${classroom.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/classroom-management/${classroom.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onArchive(classroom.id)}
                  >
                    <Archive className="h-4 w-4" />
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

export default ClassroomsList;
