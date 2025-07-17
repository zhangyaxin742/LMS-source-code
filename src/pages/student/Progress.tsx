
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, TrendingUp, BarChart2, Award, Clock, Calendar, CheckCircle
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// Mock data for student progress
const overallProgress = {
  programCompletion: 58,
  assignmentsCompleted: 24,
  totalAssignments: 32,
  averageGrade: "B+",
  attendanceRate: 92,
  skillsAcquired: 14,
  totalSkills: 20,
  programWeeks: 12,
  completedWeeks: 7,
};

const courseProgress = [
  {
    id: 1,
    name: "UI/UX Design Fundamentals",
    progress: 72,
    modules: 8,
    completedModules: 6,
    assignments: 18,
    completedAssignments: 15,
  },
  {
    id: 2,
    name: "Design Systems",
    progress: 45,
    modules: 6,
    completedModules: 3,
    assignments: 14,
    completedAssignments: 9,
  },
];

const weeklyActivityData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.0 },
  { day: "Fri", hours: 2.7 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 0.8 },
];

const monthlyProgressData = [
  { month: "Jun", progress: 30 },
  { month: "Jul", progress: 45 },
  { month: "Aug", progress: 52 },
  { month: "Sep", progress: 58 },
];

const skillsData = [
  { name: "UI Design", value: 80 },
  { name: "UX Research", value: 65 },
  { name: "Prototyping", value: 70 },
  { name: "Design Systems", value: 50 },
];

const SKILL_COLORS = ["#4f46e5", "#8b5cf6", "#ec4899", "#f43f5e"];

const StudentProgress = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and achievements</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <TrendingUp size={24} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Program Completion</p>
              <h3 className="text-2xl font-bold mt-1">{overallProgress.programCompletion}%</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <CheckCircle size={24} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Assignments Completed</p>
              <h3 className="text-2xl font-bold mt-1">
                {overallProgress.assignmentsCompleted}/{overallProgress.totalAssignments}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Award size={24} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
              <h3 className="text-2xl font-bold mt-1">{overallProgress.averageGrade}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Calendar size={24} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
              <h3 className="text-2xl font-bold mt-1">{overallProgress.attendanceRate}%</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Hours spent on learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Program completion by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="progress" 
                        stroke="#4f46e5" 
                        strokeWidth={2}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Program Timeline</CardTitle>
              <CardDescription>
                {overallProgress.completedWeeks} of {overallProgress.programWeeks} weeks completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <Progress 
                  value={(overallProgress.completedWeeks / overallProgress.programWeeks) * 100} 
                  className="h-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Program Length</p>
                    <p className="text-muted-foreground">{overallProgress.programWeeks} weeks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Completed</p>
                    <p className="text-muted-foreground">{overallProgress.completedWeeks} weeks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium">Estimated Completion</p>
                    <p className="text-muted-foreground">November 15, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-6">
          {courseProgress.map((course) => (
            <Card key={course.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>
                      {course.completedModules} of {course.modules} modules completed
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {course.progress}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Progress value={course.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">Modules Progress</p>
                      <p className="text-muted-foreground">
                        {course.completedModules}/{course.modules} modules
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Assignments</p>
                      <p className="text-muted-foreground">
                        {course.completedAssignments}/{course.assignments} completed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-muted-foreground">
                        {course.progress >= 70 ? "On Track" : "Needs Attention"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Skills Breakdown</CardTitle>
                  <CardDescription>Your proficiency in key skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={skillsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {skillsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={SKILL_COLORS[index % SKILL_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <Badge className="bg-primary text-primary-foreground">
                      {overallProgress.skillsAcquired}/{overallProgress.totalSkills} Skills Acquired
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Skills Assessment</CardTitle>
                  <CardDescription>Your current skill proficiency levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillsData.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm font-medium">{skill.value}%</span>
                        </div>
                        <Progress 
                          value={skill.value} 
                          className="h-2"
                          style={{ backgroundColor: SKILL_COLORS[index % SKILL_COLORS.length] }}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {skill.value < 50 
                            ? "Beginner" 
                            : skill.value < 70 
                              ? "Intermediate" 
                              : "Advanced"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProgress;
