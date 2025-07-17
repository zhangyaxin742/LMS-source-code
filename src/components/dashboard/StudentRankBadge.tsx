
import React from "react";
import { Award } from "lucide-react";

interface StudentRankBadgeProps {
  rank: number;
}

const StudentRankBadge: React.FC<StudentRankBadgeProps> = ({ rank }) => {
  return (
    <div className="flex items-center text-xs text-muted-foreground">
      <Award size={12} className="mr-1" />
      <span>Rank #{rank}</span>
    </div>
  );
};

export default StudentRankBadge;
