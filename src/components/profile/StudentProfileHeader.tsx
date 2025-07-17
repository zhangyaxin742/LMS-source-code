
import React from "react";
import { Avatar } from "@/components/ui/avatar";

interface StudentProfileHeaderProps {
  name: string;
  email: string;
  profileImage: string;
}

const StudentProfileHeader: React.FC<StudentProfileHeaderProps> = ({
  name,
  email,
  profileImage,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <img src={profileImage} alt={name} />
      </Avatar>
      <div>
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};

export default StudentProfileHeader;
