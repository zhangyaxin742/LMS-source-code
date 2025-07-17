
import React from "react";
import { motion } from "framer-motion";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

interface ProgressChartsProps {
  courseProgressData: Array<{
    name: string;
    completion: number;
  }>;
  assignmentCompletionData: Array<{
    name: string;
    completed: number;
    total: number;
  }>;
  studentActivityData: Array<{
    day: string;
    views: number;
    submissions: number;
  }>;
}

const ProgressCharts: React.FC<ProgressChartsProps> = ({
  courseProgressData,
  assignmentCompletionData,
  studentActivityData,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="glass-panel p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Course Progress</h2>
            <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-medium">
              Overall: 81%
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courseProgressData}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis unit="%" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }} 
                  formatter={(value) => [`${value}%`, "Completion"]}
                />
                <Bar dataKey="completion" radius={[4, 4, 0, 0]}>
                  {courseProgressData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={courseProgressData[index].completion >= 90 ? "#0ea5e9" : "#94a3b8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div
          className="glass-panel p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Assignment Completion</h2>
            <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-medium">
              Average: 74%
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={assignmentCompletionData}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }} 
                  formatter={(value, name) => [value, name === "completed" ? "Completed" : "Total"]}
                />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#e2e8f0" fill="#e2e8f0" />
                <Area type="monotone" dataKey="completed" stackId="2" stroke="#0284c7" fill="#0ea5e9" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="glass-panel p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Weekly Student Activity</h2>
          <select className="h-9 rounded-lg bg-secondary/60 border border-border/50 text-sm subtle-ring-focus">
            <option>This Week</option>
            <option>Last Week</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={studentActivityData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }} 
                formatter={(value, name) => [value, name === "views" ? "Content Views" : "Assignment Submissions"]}
              />
              <Legend iconType="circle" />
              <Line type="monotone" dataKey="views" stroke="#0ea5e9" activeDot={{ r: 6 }} strokeWidth={2} />
              <Line type="monotone" dataKey="submissions" stroke="#8b5cf6" activeDot={{ r: 6 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </>
  );
};

export default ProgressCharts;
