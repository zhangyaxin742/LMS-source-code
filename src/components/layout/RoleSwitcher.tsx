
import React from "react";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { Shield, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const RoleSwitcher: React.FC = () => {
  const { userRole, switchRole } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-secondary/80 dark:hover:bg-slate-800 subtle-ring-focus"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={cn(
              "flex items-center justify-center p-1 rounded-full",
              userRole === "admin" 
                ? "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400" 
                : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
            )}
          >
            {userRole === "admin" ? (
              <Shield size={16} />
            ) : (
              <Bookmark size={16} />
            )}
          </motion.div>
          <span className="text-sm font-medium">
            {userRole === "admin" ? "Admin" : "Tutor"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem 
          onClick={() => switchRole("tutor")}
          className={cn(
            "flex items-center gap-2 cursor-pointer", 
            userRole === "tutor" && "bg-secondary dark:bg-slate-700"
          )}
        >
          <Bookmark size={16} className="text-blue-500" />
          <span>Tutor Dashboard</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => switchRole("admin")}
          className={cn(
            "flex items-center gap-2 cursor-pointer", 
            userRole === "admin" && "bg-secondary dark:bg-slate-700"
          )}
        >
          <Shield size={16} className="text-purple-500" />
          <span>Admin Dashboard</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
