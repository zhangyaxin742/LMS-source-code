
import React from "react";
import { User, FileText, Settings, Sun, Moon } from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import { useUser } from "@/contexts/UserContext";

interface SidebarUtilityNavProps {
  isOpen: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SidebarUtilityNav: React.FC<SidebarUtilityNavProps> = ({ 
  isOpen, 
  darkMode, 
  toggleDarkMode 
}) => {
  const { userRole } = useUser();
  
  // Different utility items based on user role
  const utilityItems = userRole === "student" 
    ? [
        { name: "Profile", path: "/profile", icon: <User size={20} /> },
      ]
    : [
        { name: "Profile", path: "/profile", icon: <User size={20} /> },
        { name: "Resources", path: "/resources", icon: <FileText size={20} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
      ];

  return (
    <div className="px-3">
      <h2 className={`text-xs font-semibold text-muted-foreground mb-2 ${!isOpen ? 'hidden' : ''}`}>
        Tools & Settings
      </h2>
      <ul className="space-y-1">
        {utilityItems.map((item) => (
          <SidebarNavItem
            key={item.name}
            name={item.name}
            path={item.path}
            icon={item.icon}
            isOpen={isOpen}
          />
        ))}
        <li>
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-secondary dark:hover:bg-slate-700 text-foreground/80 hover:text-foreground"
          >
            <span className="flex items-center justify-center">
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </span>
            {isOpen && (
              <span className="ml-3 whitespace-nowrap">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarUtilityNav;
