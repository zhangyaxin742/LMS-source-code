import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, Users, Edit } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  submissions: string;
  totalPoints: number;
  linkedModule: string;
  status: string;
}

interface AssignmentListProps {
  assignments: Assignment[];
  status: "ongoing" | "upcoming" | "completed";
}

const AssignmentList: React.FC<AssignmentListProps> = ({ assignments, status }) => {
  const navigate = useNavigate();
  
  const handleViewAssignment = (id: string) => {
    navigate(`/assignments/${id}`);
  };
  
  if (assignments.length === 0) {
    return (
      <Card className="bg-white/90">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="p-4 bg-secondary/30 rounded-full mb-4">
            {status === "completed" ? (
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            ) : status === "ongoing" ? (
              <Clock className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Calendar className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-lg font-medium mb-2">No {status} assignments</h3>
          <p className="text-muted-foreground text-center max-w-md">
            {status === "completed" 
              ? "Completed assignments will appear here." 
              : status === "ongoing" 
                ? "There are no ongoing assignments at the moment." 
                : "You don't have any upcoming assignments scheduled yet."}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assignments.map((assignment, index) => (
        <motion.div
          key={assignment.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 * index }}
        >
          <Card className="h-full bg-white/90 hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col h-full">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div 
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      status === "completed" 
                        ? "bg-emerald-100 text-emerald-800" 
                        : status === "ongoing" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {status === "completed" 
                      ? "Completed" 
                      : status === "ongoing" 
                        ? "Ongoing" 
                        : "Upcoming"}
                  </div>
                  <span className="text-sm font-medium">{assignment.totalPoints} pts</span>
                </div>
                <h3 className="text-base font-medium mt-3">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{assignment.linkedModule}</p>
              </div>
              
              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2 text-muted-foreground" />
                    <span className={status === "completed" ? "line-through text-muted-foreground" : ""}>
                      {assignment.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-2 text-muted-foreground" />
                    <span>{assignment.submissions}</span>
                  </div>
                </div>
                
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => handleViewAssignment(assignment.id)}
                  >
                    View Details
                  </Button>
                  
                  {status === "ongoing" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleViewAssignment(assignment.id)}
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AssignmentList;
