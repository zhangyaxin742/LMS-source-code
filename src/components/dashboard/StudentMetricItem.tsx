
import React from "react";

interface StudentMetricItemProps {
  value: React.ReactNode;
  label: string;
}

const StudentMetricItem: React.FC<StudentMetricItemProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default StudentMetricItem;
