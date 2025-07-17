
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import ClassInfoItem from "./ClassInfoItem";
import ClassActionButtons from "./ClassActionButtons";
import ClassAttendanceBadge from "./ClassAttendanceBadge";

interface LiveClassCardProps {
  title: string;
  date: string;
  classroom: string;
  registered: number;
  total: number;
  delay?: number;
  meetingLink?: string;
  onStart?: () => void;
  onView?: () => void;
  onReschedule?: () => void;
}

const LiveClassCard: React.FC<LiveClassCardProps> = ({
  title,
  date,
  classroom,
  registered,
  total,
  delay = 0,
  meetingLink,
  onStart,
  onView,
  onReschedule,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + delay * 0.1 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <ClassAttendanceBadge registered={registered} total={total} />
      </div>
      
      <div className="space-y-3 mb-6">
        <ClassInfoItem icon={Calendar} text={date} />
        <ClassInfoItem icon={Clock} text="60 minutes" />
        <ClassInfoItem icon={MapPin} text={`Classroom: ${classroom}`} />
        {meetingLink && (
          <div className="text-xs text-muted-foreground">
            Meeting link available
          </div>
        )}
      </div>
      
      <ClassActionButtons 
        onStart={onStart}
        onView={onView}
        onReschedule={onReschedule}
        hasMeetingLink={!!meetingLink}
      />
    </motion.div>
  );
};

export default LiveClassCard;
