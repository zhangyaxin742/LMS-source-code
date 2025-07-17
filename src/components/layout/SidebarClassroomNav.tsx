
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  ChevronLeft,
  FileText, 
  Presentation,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarClassroomNavProps {
  isOpen: boolean;
  classroomId: string;
}

const SidebarClassroomNav: React.FC<SidebarClassroomNavProps> = ({ isOpen, classroomId }) => {
  const classroomNavItems = [
    { name: "Overview", icon: <FileText size={20} />, path: `/classroom/${classroomId}` },
    { name: "Feed", icon: <Presentation size={20} />, path: `/classroom-feed/${classroomId}` },
    { name: "Manage", icon: <ClipboardList size={20} />, path: `/classroom-management/${classroomId}` },
  ];

  return (
    <div className="px-3 mb-2">
      <h2 className={`text-xs font-semibold text-muted-foreground mb-2 ${!isOpen ? 'hidden' : ''}`}>
        Classroom Navigation
      </h2>
      
      {/* Back to classrooms link */}
      <div className="mb-3">
        <NavLink
          to="/classrooms"
          className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-secondary text-foreground/80 hover:text-foreground"
        >
          <span className="flex items-center justify-center">
            <ChevronLeft size={16} />
          </span>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-3 whitespace-nowrap"
              >
                Back to Classrooms
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
      </div>
      
      <ul className="space-y-1">
        {classroomNavItems.map((item) => (
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

export default SidebarClassroomNav;
