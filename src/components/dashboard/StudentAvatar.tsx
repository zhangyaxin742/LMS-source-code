
import React from "react";
import { User } from "lucide-react";

interface StudentAvatarProps {
  avatar?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const StudentAvatar: React.FC<StudentAvatarProps> = ({ 
  avatar, 
  name,
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className={`${sizeClasses[size]} bg-secondary rounded-full flex items-center justify-center text-secondary-foreground`}>
      {avatar ? (
        <img src={avatar} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        <User size={iconSizes[size]} />
      )}
    </div>
  );
};

export default StudentAvatar;
