
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ClassroomHeaderProps {
  classroom: {
    name: string;
    description: string;
    instructor: string;
    instructorRole: string;
    instructorImage: string;
    startDate: string;
    endDate: string;
    studentCount: number;
    moduleCount: number;
    completedModules: number;
    progress: number;
    nextSession: string;
  };
}

const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({ classroom }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <CardTitle className="text-2xl">{classroom.name}</CardTitle>
            <div className="text-muted-foreground mt-1">{classroom.description}</div>
            
            <div className="flex items-center mt-2">
              <Avatar className="h-8 w-8 mr-2">
                <img src={classroom.instructorImage} alt={classroom.instructor} />
              </Avatar>
              <div>
                <p className="text-sm font-medium">{classroom.instructor}</p>
                <p className="text-xs text-muted-foreground">{classroom.instructorRole}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Progress: {classroom.progress}%
            </Badge>
            <div className="text-sm text-muted-foreground">
              Next Session: {classroom.nextSession}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <Progress value={classroom.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-muted/20 p-4 rounded-md">
            <div className="font-medium">Start Date</div>
            <div>{classroom.startDate}</div>
          </div>
          <div className="bg-muted/20 p-4 rounded-md">
            <div className="font-medium">End Date</div>
            <div>{classroom.endDate}</div>
          </div>
          <div className="bg-muted/20 p-4 rounded-md">
            <div className="font-medium">Students</div>
            <div>{classroom.studentCount}</div>
          </div>
          <div className="bg-muted/20 p-4 rounded-md">
            <div className="font-medium">Modules</div>
            <div>{classroom.completedModules}/{classroom.moduleCount} Completed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassroomHeader;
