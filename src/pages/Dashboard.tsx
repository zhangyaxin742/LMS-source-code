import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Trophy, Users, Play, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  duration_weeks: number;
  learners: number;
}

interface Enrollment {
  id: string;
  course_id: string;
  enrolled_at: string;
  course: Course;
}

interface LessonProgress {
  lesson_id: string;
  completed_at: string;
  time_spent_minutes: number;
}

export default function Dashboard() {
  const { profile } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressData, setProgressData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      fetchData();
    }
  }, [profile]);

  const fetchData = async () => {
    try {
      // Fetch all courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .order('created_at');

      setCourses(coursesData || []);

      // Fetch user enrollments
      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('user_id', profile!.id);

      setEnrollments(enrollmentsData || []);

      // Fetch progress data for each enrolled course
      const progressPromises = (enrollmentsData || []).map(async (enrollment) => {
        const { data: lessons } = await supabase
          .from('lessons')
          .select('id, title, duration_minutes')
          .eq('course_id', enrollment.course_id)
          .order('order_index');

        const { data: progress } = await supabase
          .from('lesson_progress')
          .select('lesson_id, completed_at, time_spent_minutes')
          .eq('user_id', profile!.id)
          .in('lesson_id', (lessons || []).map(l => l.id));

        const totalLessons = lessons?.length || 0;
        const completedLessons = progress?.filter(p => p.completed_at)?.length || 0;
        const totalTimeSpent = progress?.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0) || 0;

        return {
          courseId: enrollment.course_id,
          totalLessons,
          completedLessons,
          progressPercentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
          totalTimeSpent,
          lessons: lessons || [],
          progress: progress || []
        };
      });

      const progressResults = await Promise.all(progressPromises);
      const progressMap = progressResults.reduce((acc, result) => {
        acc[result.courseId] = result;
        return acc;
      }, {} as Record<string, any>);

      setProgressData(progressMap);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollCourse = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: profile!.id,
          course_id: courseId
        });

      if (!error) {
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const handleStartLearning = (courseId: string) => {
    const progress = progressData[courseId];
    if (progress && progress.lessons.length > 0) {
      const firstIncompleteLesson = progress.lessons.find((lesson: any) => 
        !progress.progress.some((p: any) => p.lesson_id === lesson.id && p.completed_at)
      );
      
      if (firstIncompleteLesson) {
        navigate(`/lesson/${firstIncompleteLesson.id}`);
      } else {
        navigate(`/lesson/${progress.lessons[0].id}`);
      }
    }
  };

  const totalTimeSpent = Object.values(progressData).reduce((sum: number, data: any) => 
    sum + (data.totalTimeSpent || 0), 0
  );

  const totalCompletedLessons = Object.values(progressData).reduce((sum: number, data: any) => 
    sum + (data.completedLessons || 0), 0
  );

  const averageProgress = enrollments.length > 0 
    ? Math.round(Object.values(progressData).reduce((sum: number, data: any) => 
        sum + (data.progressPercentage || 0), 0
      ) / enrollments.length)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-foreground">57</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Project 57 Learning Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master financial literacy through engaging courses designed for teens and young adults
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollments.length}</div>
            <p className="text-xs text-muted-foreground">
              {courses.length - enrollments.length} more available
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletedLessons}</div>
            <p className="text-xs text-muted-foreground">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalTimeSpent / 60)}h</div>
            <p className="text-xs text-muted-foreground">
              {totalTimeSpent % 60}m additional
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enrolled Courses */}
      {enrollments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;
              const progress = progressData[course.id];
              
              return (
                <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="mt-2">{course.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {course.duration_weeks} weeks
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{progress?.progressPercentage || 0}%</span>
                      </div>
                      <Progress value={progress?.progressPercentage || 0} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{progress?.completedLessons || 0} / {progress?.totalLessons || 0} lessons</span>
                      <span>{Math.round((progress?.totalTimeSpent || 0) / 60)}h {(progress?.totalTimeSpent || 0) % 60}m</span>
                    </div>

                    <Button 
                      onClick={() => handleStartLearning(course.id)}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {progress?.progressPercentage > 0 ? 'Continue Learning' : 'Start Learning'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Available Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold">
          {enrollments.length > 0 ? 'Explore More Courses' : 'Available Courses'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses
            .filter(course => !enrollments.some(e => e.course_id === course.id))
            .map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-2">{course.description}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      {course.duration_weeks} weeks
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{course.learners.toLocaleString()} learners</span>
                  </div>

                  <Button 
                    onClick={() => handleEnrollCourse(course.id)}
                    className="w-full"
                    variant="outline"
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </motion.div>
    </div>
  );
}