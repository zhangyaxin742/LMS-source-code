
import React from "react";
import { motion } from "framer-motion";
import { Video, BookOpen, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const QuickActionsCard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    switch (action) {
      case "Create Live Class":
        navigate("/live-classes");
        break;
      case "Create Assignment":
        navigate("/assignments");
        break;
      case "View Progress":
        navigate("/student-progress");
        break;
      case "Upload Materials":
        navigate("/courses");
        break;
      default:
        toast({
          title: action,
          description: "Feature coming soon",
        });
    }
  };

  const actions = [
    { title: "Create Live Class", icon: <Video size={16} /> },
    { title: "Create Assignment", icon: <BookOpen size={16} /> },
    { title: "View Progress", icon: <Users size={16} /> },
    { title: "Upload Materials", icon: <CheckCircle size={16} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            className="glass-card flex flex-col items-center justify-center p-4 hover:bg-white/90"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.4 + index * 0.1,
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
            onClick={() => handleQuickAction(action.title)}
          >
            <div className="bg-secondary/70 w-8 h-8 rounded-full flex items-center justify-center mb-2">
              {action.icon}
            </div>
            <span className="text-xs font-medium">{action.title}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActionsCard;
