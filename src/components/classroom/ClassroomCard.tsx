
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, Calendar, BookOpen, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ClassroomCardProps {
  id: string;
  title: string;
  program: string;
  students: number;
  startDate: string;
  materials: number;
  upcoming?: string;
  onClick: (id: string) => void;
  index: number;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({
  id,
  title,
  program,
  students,
  startDate,
  materials,
  upcoming,
  onClick,
  index
}) => {
  const navigate = useNavigate();
  
  const handleViewFeed = () => {
    navigate(`/classroom-feed/${id}`, { 
      state: { classroomName: title } 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full transition-all hover:shadow-md hover:scale-[1.01]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{program}</p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Users size={16} className="mr-2 text-primary" />
              <span>{students} Students</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-2 text-primary" />
              <span>Started: {startDate}</span>
            </div>
            <div className="flex items-center text-sm">
              <BookOpen size={16} className="mr-2 text-primary" />
              <span>{materials} Learning Materials</span>
            </div>
            {upcoming && (
              <div className="flex items-center text-sm">
                <Clock size={16} className="mr-2 text-primary" />
                <span>Next Class: {upcoming}</span>
              </div>
            )}
            <div className="flex items-center text-sm">
              <MessageSquare size={16} className="mr-2 text-primary" />
              <span>Class Feed</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex w-full flex-col space-y-2">
            <Button 
              className="w-full"
              onClick={() => onClick(id)}
            >
              Manage Classroom
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleViewFeed}
            >
              View Class Feed
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClassroomCard;
