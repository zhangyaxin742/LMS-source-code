
import React from "react";
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Video, 
  Award,
  FileText,
  Users
} from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import { useLocation } from "react-router-dom";

interface StudentSidebarNavProps {
  isOpen: boolean;
}

const StudentSidebarNav: React.FC<StudentSidebarNavProps> = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { name: "Dashboard", path: "/student-dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "My Courses", path: "/student-courses", icon: <BookOpen size={20} /> },
    { name: "Classrooms", path: "/student-classrooms", icon: <Users size={20} /> },
    { name: "Assignments", path: "/student-assignments", icon: <FileText size={20} /> },
    { name: "Live Classes", path: "/student-live-classes", icon: <Video size={20} /> },
    { name: "Progress", path: "/student-progress", icon: <GraduationCap size={20} /> },
    { name: "Achievements", path: "/student-achievements", icon: <Award size={20} /> },
  ];

  return (
    <div className="px-3 mb-2">
      <h2 className={`text-xs font-semibold text-muted-foreground mb-2 ${!isOpen ? 'hidden' : ''}`}>
        Student Navigation
      </h2>
      <ul className="space-y-1">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.name}
            name={item.name}
            path={item.path}
            icon={item.icon}
            isOpen={isOpen}
            isActive={currentPath === item.path || currentPath.startsWith(`${item.path}/`)}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentSidebarNav;
