
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StudentAvatar from "./StudentAvatar";
import StudentRankBadge from "./StudentRankBadge";
import StudentMetricItem from "./StudentMetricItem";

interface StudentProgressCardProps {
  name: string;
  avatar?: string;
  courseCompleted: number;
  assignmentsSubmitted: number;
  attendanceRate: number;
  rank: number;
  onClick?: () => void;
}

const StudentProgressCard: React.FC<StudentProgressCardProps> = ({
  name,
  avatar,
  courseCompleted,
  assignmentsSubmitted,
  attendanceRate,
  rank,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      <Card className="overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <StudentAvatar avatar={avatar} name={name} />
              <div>
                <p className="font-medium text-sm">{name}</p>
                <StudentRankBadge rank={rank} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-3 gap-2 mt-1">
            <StudentMetricItem value={`${courseCompleted}%`} label="Course" />
            <StudentMetricItem value={assignmentsSubmitted} label="Assignments" />
            <StudentMetricItem value={`${attendanceRate}%`} label="Attendance" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentProgressCard;
