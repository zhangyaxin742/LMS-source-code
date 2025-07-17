
import React from "react";
import { motion } from "framer-motion";
import { BarChart2, Check, Clock } from "lucide-react";

interface StatisticsCardsProps {
  topPerformer: {
    name: string;
    score: number;
    info: string;
  };
  recentActivities: Array<{
    time: string;
    text: string;
  }>;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  topPerformer,
  recentActivities,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        className="glass-panel p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 rounded-full">
            <BarChart2 size={20} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold">Top Performer</h2>
        </div>
        
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{topPerformer.name}</span>
            <span className="text-sm">{topPerformer.score}%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${topPerformer.score}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">
            {topPerformer.info}
          </p>
        </div>
      </motion.div>
      
      <motion.div
        className="glass-panel p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 rounded-full">
            <Check size={20} className="text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold">Course Completion</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center h-24">
          <div className="text-4xl font-bold">81%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Average progress across all students
          </p>
        </div>
      </motion.div>
      
      <motion.div
        className="glass-panel p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-50 rounded-full">
            <Clock size={20} className="text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        
        <div className="space-y-3 pt-2">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm font-medium">{activity.text}</span>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsCards;
