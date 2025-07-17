
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Classroom {
  id: string;
  name: string;
  averageProgress: number;
  totalStudents: number;
  students: {
    name: string;
    overallScore: number;
    modulesCompleted: string;
    assignments: string;
    attendance: string;
    activityData: number[];
  }[];
}

interface ClassroomOverviewPanelProps {
  classrooms: Classroom[];
  activeClassroom: string | null;
  expandedClassrooms: string[];
  toggleClassroomExpand: (classroomId: string) => void;
  setActiveClassroom: (id: string | null) => void;
}

const ClassroomOverviewPanel: React.FC<ClassroomOverviewPanelProps> = ({
  classrooms,
  activeClassroom,
  expandedClassrooms,
  toggleClassroomExpand,
  setActiveClassroom,
}) => {
  return (
    <div className="glass-panel p-6 space-y-6">
      <h2 className="text-xl font-semibold">Classrooms Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {classrooms.map(classroom => (
          <Card key={classroom.id} className={`${activeClassroom === classroom.id ? 'ring-2 ring-primary/50' : ''}`}>
            <div className="p-6">
              <div className="flex items-center justify-between pb-2">
                <div className="text-base font-semibold">{classroom.name}</div>
                <Badge variant="outline">{classroom.totalStudents} Students</Badge>
              </div>
            
              <div className="mb-2">
                <div className="text-sm text-muted-foreground mb-1">Average Progress</div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${classroom.averageProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{classroom.averageProgress}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveClassroom(classroom.id)}
                >
                  View Details
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => toggleClassroomExpand(classroom.id)}
                  className="flex items-center gap-1"
                >
                  {expandedClassrooms.includes(classroom.id) ? 
                    <>Hide Students <ChevronUp size={14} /></> : 
                    <>Show Students <ChevronDown size={14} /></>
                  }
                </Button>
              </div>
              
              {expandedClassrooms.includes(classroom.id) && (
                <div className="mt-4 border-t pt-4 space-y-3">
                  {classroom.students.map((student, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="font-medium text-sm">{student.name}</div>
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            student.overallScore >= 90 
                              ? "bg-emerald-500" 
                              : student.overallScore >= 80 
                                ? "bg-blue-500" 
                                : student.overallScore >= 70
                                  ? "bg-amber-500"
                                  : "bg-rose-500"
                          }`}
                        ></div>
                        <span className="text-sm">{student.overallScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassroomOverviewPanel;
