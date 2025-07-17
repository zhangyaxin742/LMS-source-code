
import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";
import RoleSwitcher from "./RoleSwitcher";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();
  const { userName, userInitials } = useUser();

  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-secondary/80 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-foreground/80" />
          </button>
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 h-9 w-full rounded-full bg-secondary/80 border-transparent focus:border-ring focus:ring-0 text-sm subtle-ring-focus dark:bg-slate-800/90 dark:border-slate-700 dark:placeholder:text-slate-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <RoleSwitcher />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-secondary/80 dark:hover:bg-slate-800 relative subtle-ring-focus"
            onClick={() => navigate("/notifications")}
            aria-label="View notifications"
          >
            <Bell size={18} className="text-foreground/80" />
            {unreadCount > 0 && (
              <Badge 
                variant="default" 
                className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-4 h-4 flex items-center justify-center text-[10px] font-semibold"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </motion.button>
          
          <div className="h-9 w-px bg-border/50 hidden md:block"></div>
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/profile")}>
            <span className="text-sm font-medium hidden md:block">{userName}</span>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <span className="text-xs font-medium">{userInitials}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
