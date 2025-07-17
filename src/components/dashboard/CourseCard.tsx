
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, BarChart2, Eye } from "lucide-react";

interface CourseCardProps {
  title: string;
  program: string;
  branch: string;
  students: number;
  modules: number;
  views: number;
  mostWatchedTitle: string;
  mostWatchedViews: number;
  delay?: number;
  onManage?: () => void;
  onView?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  program,
  branch,
  students,
  modules,
  views,
  mostWatchedTitle,
  mostWatchedViews,
  delay = 0,
  onManage,
  onView,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + delay * 0.1 }}
      className="glass-card p-6 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center">
              <BookOpen size={14} className="mr-1" /> 
              Program: {program}
            </span>
            <span className="inline-flex items-center ml-4">
              Branch: {branch || "N/A"}
            </span>
          </div>
        </div>
        <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-medium">
          {students} Students
        </div>
      </div>
      
      <div className="flex justify-between text-sm mb-4">
        <div className="flex flex-col">
          <span className="text-muted-foreground">Modules</span>
          <span className="font-medium mt-1">{modules}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Total Views</span>
          <div className="flex items-center font-medium mt-1">
            <Eye size={14} className="mr-1" />
            {views}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Most Watched</span>
          <span className="font-medium mt-1 max-w-[150px] truncate" title={mostWatchedTitle}>
            {mostWatchedTitle}
          </span>
        </div>
      </div>
      
      <div className="bg-secondary/30 rounded-lg p-3 mt-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BarChart2 size={16} className="text-primary/70 mr-2" />
            <span className="text-sm font-medium">Highest Engagement</span>
          </div>
          <div className="flex items-center text-sm font-medium">
            <Eye size={14} className="mr-1" />
            {mostWatchedViews} views
          </div>
        </div>
      </div>
      
      <div className="flex mt-4 space-x-3">
        <button 
          className="flex-1 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-primary/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onClick={onManage}
        >
          Manage
        </button>
        <button 
          className="flex-1 bg-secondary/70 text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-secondary/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onClick={onView}
        >
          View Course
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
