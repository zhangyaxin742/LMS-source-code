
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

interface AssignmentTabProps {
  assignment?: Assignment;
  handleAssignment: () => void;
}

const AssignmentTab: React.FC<AssignmentTabProps> = ({ assignment, handleAssignment }) => {
  if (!assignment) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">No assignment for this video.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-3">{assignment.title}</h3>
        <p className="text-sm mb-4">{assignment.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
            Due: {assignment.dueDate}
          </span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            assignment.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
            assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
            'bg-green-100 text-green-800'
          }`}>
            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
          </span>
        </div>
        <Button 
          className="w-full sm:w-auto" 
          onClick={handleAssignment}
        >
          <Upload className="mr-2 h-4 w-4" />
          Submit Assignment
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssignmentTab;
