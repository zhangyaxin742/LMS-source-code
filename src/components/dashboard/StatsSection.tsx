
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, CheckCircle, Video, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import StatsCard from "./StatsCard";

const StatsSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const stats = [
    { 
      title: "Active Courses", 
      value: 2, 
      icon: <BookOpen size={20} className="text-emerald-600" />, 
      color: "bg-emerald-50",
      onClick: () => navigate("/courses")
    },
    { 
      title: "Total Students", 
      value: 77, 
      icon: <Users size={20} className="text-blue-600" />, 
      color: "bg-blue-50",
      onClick: () => navigate("/student-progress")
    },
    { 
      title: "Assignments Completed", 
      value: "94%", 
      icon: <CheckCircle size={20} className="text-violet-600" />, 
      color: "bg-violet-50",
      onClick: () => navigate("/assignments")
    },
    { 
      title: "Live Sessions", 
      value: 5, 
      icon: <Video size={20} className="text-amber-600" />, 
      color: "bg-amber-50",
      onClick: () => navigate("/live-classes")
    },
    { 
      title: "Pending Actions", 
      value: 3, 
      icon: <Bell size={20} className="text-rose-600" />, 
      color: "bg-rose-50",
      onClick: () => {
        toast({
          title: "Pending Actions",
          description: "You have 3 pending actions to complete",
        });
      }
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome Back, Thomas</h1>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Tuesday, October 15</span> · UI/UX Design Program
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            delay={index}
            onClick={stat.onClick}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StatsSection;
