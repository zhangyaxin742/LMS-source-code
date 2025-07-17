
import React from "react";
import { LucideIcon } from "lucide-react";

interface ClassInfoItemProps {
  icon: LucideIcon;
  text: string;
}

const ClassInfoItem: React.FC<ClassInfoItemProps> = ({ icon: Icon, text }) => {
  return (
    <div className="flex items-center text-sm">
      <Icon size={16} className="text-muted-foreground mr-2" />
      <span>{text}</span>
    </div>
  );
};

export default ClassInfoItem;
