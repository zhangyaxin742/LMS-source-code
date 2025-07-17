
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, BookOpen, Clock, Video, CheckCircle, Award } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { userName } = useUser();
  const navigate = useNavigate();

  // Mock data - in a real app this would come from API
  const enrolledCourses = [
    {
      id: "1",
      title: "UI/UX Design Fundamentals",
      progress: 65,
      totalModules: 8,
      completedModules: 5,
      nextTopic: {
        id: "topic-1",
        title: "Design Thinking Process"
      }
    },
    {
      id: "2",
      title: "Design Systems Workshop",
      progress: 30,
      totalModules: 6,
      completedModules: 2,
      nextTopic: {
        id: "topic-2",
        title: "Component Libraries"
      }
    }
  ];

  const upcomingClasses = [
    {
      id: "1",
      title: "Design Critique Session",
      date: "Today, 2:00 PM",
      tutor: "Thomas Anderson"
    },
    {
      id: "2",
      title: "Portfolio Review",
      date: "Tomorrow, 10:00 AM",
      tutor: "Emily Johnson"
    }
  ];

  const assignments = [
    {
      id: "1",
      title: "Create a Mobile App Wireframe",
      dueDate: "May 15, 2023",
      status: "pending"
    },
    {
      id: "2",
      title: "Design System Documentation",
      dueDate: "May 18, 2023",
      status: "pending"
    }
  ];

  // Student progress data for the progress chart
  const progressData = {
    coursesCompleted: 2,
    totalCourses: 4,
    assignmentsCompleted: 12,
    totalAssignments: 15,
    averageGrade: "A-",
    attendanceRate: "92%"
  };

  const handleContinueLearning = (courseId: string, topicId: string) => {
    navigate(`/student-courses/video/${topicId}`);
  };

  const handleStartAssignment = (assignmentId: string) => {
    navigate(`/student/assignment/${assignmentId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
        <p className="text-muted-foreground">Here's an overview of your courses and upcoming activities</p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen size={20} className="text-blue-500" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">65%</div>
            <Progress value={65} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-2">5 of 8 modules completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" />
              Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-muted-foreground mt-2">Due this week</p>
            <div className="mt-3">
              <Progress value={progressData.assignmentsCompleted / progressData.totalAssignments * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {progressData.assignmentsCompleted} of {progressData.totalAssignments} completed overall
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award size={20} className="text-amber-500" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progressData.averageGrade}</div>
            <p className="text-sm text-muted-foreground mt-2">Average Grade</p>
            <div className="mt-2 flex items-center">
              <span className="text-sm">Attendance:</span>
              <Badge variant="outline" className="ml-2">{progressData.attendanceRate}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map(course => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>
                  {course.completedModules} of {course.totalModules} modules completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={course.progress} className="mb-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress: {course.progress}%</span>
                  <span>
                    {course.completedModules}/{course.totalModules} modules
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm mb-2">Next up: <span className="font-medium">{course.nextTopic.title}</span></p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContinueLearning(course.id, course.nextTopic.id)}
                  >
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Classes and Assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {upcomingClasses.map(cls => (
                  <li key={cls.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{cls.title}</h3>
                        <p className="text-sm text-muted-foreground">Tutor: {cls.tutor}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm bg-secondary px-2 py-1 rounded-full">
                        <CalendarDays size={14} />
                        <span>{cls.date}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Video size={14} className="mr-1" /> Join Class
                      </Button>
                      <Button size="sm" variant="ghost">Add to Calendar</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Assignments</h2>
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {assignments.map(assignment => (
                  <li key={assignment.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <div className="flex items-center gap-1 text-sm bg-secondary px-2 py-1 rounded-full">
                        <Clock size={14} />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      {/* Only one submit button */}
                      <Button 
                        size="sm"
                        onClick={() => handleStartAssignment(assignment.id)}
                      >
                        Submit Assignment
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
