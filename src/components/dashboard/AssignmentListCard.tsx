
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  submissions: string;
  status: "upcoming" | "active" | "completed";
}

interface AssignmentListCardProps {
  assignments: Assignment[];
  limit?: number;
  onViewAll?: () => void;
  onViewAssignment?: (id: string) => void;
}

const AssignmentListCard: React.FC<AssignmentListCardProps> = ({ 
  assignments, 
  limit = 3,
  onViewAll,
  onViewAssignment
}) => {
  const displayAssignments = assignments.slice(0, limit);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="overflow-hidden bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pending Assignments</h3>
            <button 
              className="text-sm text-primary font-medium hover:underline"
              onClick={onViewAll}
            >
              View All
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          {displayAssignments.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>No pending assignments</p>
            </div>
          ) : (
            displayAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center justify-between py-2 border-b border-border/40 last:border-0"
              >
                <div className="flex items-center">
                  <div 
                    className={`flex-shrink-0 w-2 h-2 rounded-full mr-3 ${
                      assignment.status === "completed" 
                        ? "bg-emerald-500" 
                        : assignment.status === "active" 
                          ? "bg-blue-500" 
                          : "bg-amber-500"
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium">{assignment.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Calendar size={12} className="mr-1" />
                      <span>{assignment.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-4 text-xs">
                    <CheckCircle size={12} className="mr-1 text-muted-foreground" />
                    <span>{assignment.submissions}</span>
                  </div>
                  <button 
                    className="text-xs text-primary font-medium hover:underline"
                    onClick={() => onViewAssignment && onViewAssignment(assignment.id)}
                  >
                    View
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AssignmentListCard;
