
import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  name: string;
  path: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isActive?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  name,
  path,
  icon,
  isOpen,
  isActive,
}) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive: routeIsActive }) =>
          cn(
            "flex items-center px-3 py-2 rounded-lg transition-colors duration-200",
            routeIsActive || isActive
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-foreground/80 hover:text-foreground"
          )
        }
      >
        <span className="flex items-center justify-center">{icon}</span>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-3 whitespace-nowrap"
            >
              {name}
            </motion.span>
          )}
        </AnimatePresence>
      </NavLink>
    </li>
  );
};

export default SidebarNavItem;
