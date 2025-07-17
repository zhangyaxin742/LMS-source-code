
import React from "react";
import { LogOut } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface SidebarUserProfileProps {
  isOpen: boolean;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ isOpen }) => {
  const { userName, userPosition, userInitials, logout } = useUser();
  
  return (
    <div className="p-4 border-t border-border/50 dark:border-slate-700/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span className="text-xs font-medium">{userInitials}</span>
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userPosition}</p>
            </div>
          )}
        </div>
        
        {isOpen && (
          <button 
            onClick={logout}
            className="p-2 rounded-full hover:bg-secondary/80 dark:hover:bg-slate-700 transition-colors"
            aria-label="Logout"
          >
            <LogOut size={18} className="text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarUserProfile;
