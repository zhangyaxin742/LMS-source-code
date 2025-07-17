
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart2, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface StudentProgressTabProps {
  classroomId: string;
}

const StudentProgressTab: React.FC<StudentProgressTabProps> = ({ classroomId }) => {
  const navigate = useNavigate();

  const handleViewDetailedProgress = () => {
    // Navigate to the student progress page with classroom filter
    navigate(`/student-progress?classroom=${classroomId}`);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold mb-2">Student Progress</h2>
          <p className="text-muted-foreground">
            Track overall class performance and individual student progress
          </p>
        </div>
        <Button onClick={handleViewDetailedProgress}>
          Detailed Progress
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Average Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">67%</div>
            <Progress value={67} className="mt-2 bg-green-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Assignments Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24/36</div>
            <Progress value={66} className="mt-2 bg-amber-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18/24</div>
            <Progress value={75} className="mt-2 bg-blue-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Emma Thompson", progress: 96 },
                { name: "Alex Johnson", progress: 88 },
                { name: "Maria Garcia", progress: 84 }
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-sm">{student.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-xs">{student.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "2 hours ago", text: "Maria Garcia submitted Assignment 5" },
                { time: "Yesterday", text: "Alex Johnson completed Module 4" },
                { time: "2 days ago", text: "Emma Thompson scored 95% on Quiz 3" },
              ].map((activity, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm font-medium">{activity.text}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Student Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <Button variant="outline" onClick={handleViewDetailedProgress}>
              View Full Student Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgressTab;
