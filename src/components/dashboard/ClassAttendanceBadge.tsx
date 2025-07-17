
import React from "react";
import { Users } from "lucide-react";

interface ClassAttendanceBadgeProps {
  registered: number;
  total: number;
}

const ClassAttendanceBadge: React.FC<ClassAttendanceBadgeProps> = ({
  registered,
  total,
}) => {
  return (
    <div className="bg-secondary/70 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center">
      <Users size={12} className="mr-1" />
      {registered}/{total}
    </div>
  );
};

export default ClassAttendanceBadge;
