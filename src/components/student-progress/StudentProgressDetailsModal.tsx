
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Video, Award, FileText } from "lucide-react";

interface StudentProgressDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    name: string;
    overallScore: number;
    modulesCompleted: string;
    assignments: string;
    attendance: string;
    activityData: number[];
  } | null;
}

const StudentProgressDetailsModal: React.FC<StudentProgressDetailsModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!student) return null;

  // Mock detailed data that would come from API in a real app
  const detailedProgress = {
    modules: {
      completed: parseInt(student.modulesCompleted.split('/')[0]),
      total: parseInt(student.modulesCompleted.split('/')[1]),
      list: [
        { name: "Introduction to UI Design", status: "completed", score: 95 },
        { name: "Color Theory", status: "completed", score: 90 },
        { name: "Typography Fundamentals", status: "completed", score: 88 },
        { name: "Layout Principles", status: "in-progress", score: 75 },
        { name: "Advanced Interactions", status: "not-started", score: 0 },
      ]
    },
    assignments: {
      completed: parseInt(student.assignments.split('/')[0]),
      total: parseInt(student.assignments.split('/')[1]),
      list: [
        { name: "Design System Analysis", status: "submitted", grade: "A", score: 95 },
        { name: "Color Palette Creation", status: "submitted", grade: "A-", score: 92 },
        { name: "Typography Pairing", status: "submitted", grade: "B+", score: 88 },
        { name: "Responsive Layout", status: "submitted", grade: "A", score: 94 },
        { name: "User Flow Diagram", status: "not-submitted", grade: "-", score: 0 },
      ]
    },
    videos: {
      watched: 12,
      total: 15,
      percentComplete: 80,
    },
    classRank: 2,
    totalStudents: 28,
    percentile: 93,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-500 hover:bg-amber-600">In Progress</Badge>;
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>;
      case "submitted":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Submitted</Badge>;
      case "not-submitted":
        return <Badge variant="outline">Not Submitted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{student.name}'s Progress</DialogTitle>
          <DialogDescription>
            Detailed progress report and analytics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Award className="text-amber-500" size={20} />
                <h3 className="text-sm font-medium">Class Rank</h3>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">#{detailedProgress.classRank}</div>
                <p className="text-xs text-muted-foreground">
                  Top {detailedProgress.percentile}th percentile
                </p>
              </div>
            </div>

            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <BookOpen className="text-blue-500" size={20} />
                <h3 className="text-sm font-medium">Modules</h3>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{student.modulesCompleted}</div>
                <Progress 
                  value={(detailedProgress.modules.completed / detailedProgress.modules.total) * 100} 
                  className="h-1 mt-2"
                />
              </div>
            </div>

            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <FileText className="text-purple-500" size={20} />
                <h3 className="text-sm font-medium">Assignments</h3>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{student.assignments}</div>
                <Progress 
                  value={(detailedProgress.assignments.completed / detailedProgress.assignments.total) * 100} 
                  className="h-1 mt-2"
                />
              </div>
            </div>

            <div className="bg-secondary/30 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Video className="text-green-500" size={20} />
                <h3 className="text-sm font-medium">Videos Watched</h3>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">
                  {detailedProgress.videos.watched}/{detailedProgress.videos.total}
                </div>
                <Progress 
                  value={detailedProgress.videos.percentComplete} 
                  className="h-1 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-white/70 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Overall Score</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                {student.overallScore}%
              </div>
              <div className="flex-1">
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${student.overallScore}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modules Section */}
          <div className="bg-white/70 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Module Progress</h2>
            <div className="space-y-4">
              {detailedProgress.modules.list.map((module, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      module.status === "completed" ? "bg-emerald-100 text-emerald-500" : 
                      module.status === "in-progress" ? "bg-amber-100 text-amber-500" : 
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {module.status === "completed" ? (
                        <CheckCircle size={16} />
                      ) : (
                        <BookOpen size={16} />
                      )}
                    </div>
                    <span className="font-medium">{module.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(module.status)}
                    {module.status !== "not-started" && (
                      <span className="text-sm font-medium">{module.score}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments Section */}
          <div className="bg-white/70 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Assignment Grades</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b text-sm text-muted-foreground">
                  <th className="pb-2 text-left">Assignment</th>
                  <th className="pb-2 text-left">Status</th>
                  <th className="pb-2 text-center">Grade</th>
                  <th className="pb-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {detailedProgress.assignments.list.map((assignment, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-3">{assignment.name}</td>
                    <td className="py-3">{getStatusBadge(assignment.status)}</td>
                    <td className="py-3 text-center font-medium">{assignment.grade}</td>
                    <td className="py-3 text-right">{assignment.score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProgressDetailsModal;
