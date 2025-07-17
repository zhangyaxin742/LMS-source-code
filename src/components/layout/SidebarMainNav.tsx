
import React from "react";
import { 
  LayoutDashboard, 
  Folder, 
  GraduationCap, 
  BookOpen, 
  Video, 
  BarChart2,
} from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarMainNavProps {
  isOpen: boolean;
}

const SidebarMainNav: React.FC<SidebarMainNavProps> = ({ isOpen }) => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Pre-Recorded Courses", path: "/courses", icon: <Folder size={20} /> },
    { name: "Classrooms", path: "/classrooms", icon: <GraduationCap size={20} /> },
    { name: "Assignments", path: "/assignments", icon: <BookOpen size={20} /> },
    { name: "Live Classes", path: "/live-classes", icon: <Video size={20} /> },
    { name: "Student Progress", path: "/student-progress", icon: <BarChart2 size={20} /> },
  ];

  return (
    <div className="px-3 mb-2">
      <h2 className={`text-xs font-semibold text-muted-foreground mb-2 ${!isOpen ? 'hidden' : ''}`}>
        Main Navigation
      </h2>
      <ul className="space-y-1">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.name}
            name={item.name}
            path={item.path}
            icon={item.icon}
            isOpen={isOpen}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarMainNav;
