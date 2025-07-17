
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { ToastProvider } from "@/hooks/use-toast";

import Layout from "./components/layout/Layout";
import StudentLayout from "./components/layout/StudentLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Classroom from "./pages/Classroom";
import Classrooms from "./pages/Classrooms";
import ClassroomDetailPage from "./pages/ClassroomDetail";
import Assignments from "./pages/Assignments";
import LiveClasses from "./pages/LiveClasses";
import TutorStudentProgress from "./pages/StudentProgress";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import ClassroomFeedPage from "./pages/ClassroomFeed";
import ClassroomManagementPage from "./pages/ClassroomManagement";
import AssignmentDetails from "./pages/AssignmentDetails";
import ProfilePage from "./pages/ProfilePage";
import Resources from "./pages/Resources";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import StudentDashboard from "./pages/student/Dashboard";
import StudentCourses from "./pages/student/Courses";
import StudentClassrooms from "./pages/student/Classrooms";
import StudentAssignments from "./pages/student/Assignments";
import StudentLiveClasses from "./pages/student/LiveClasses";
import StudentProgress from "./pages/student/Progress";

import AdminUsers from "./pages/admin/Users";
import AdminPrograms from "./pages/admin/Programs";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminPayments from "./pages/admin/Payments";
import AdminSystemSettings from "./pages/admin/SystemSettings";

import CourseVideo from "./pages/student/CourseVideo";
import StudentClassroomEntryPage from "./pages/student/ClassroomEntry";
import StudentTopicViewerPage from "./pages/student/TopicViewer";
import StudentAssignmentDetails from "./pages/student/AssignmentDetails";

const queryClient = new QueryClient();

const ClassroomDetailRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/classroom/${id}`} replace />;
};

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ToastProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><Dashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/assignments" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><Assignments /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/assignments/:id" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><AssignmentDetails /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/classrooms" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><Classrooms /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/classroom/:id" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><ClassroomDetailPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/classroom-detail/:id" element={<ClassroomDetailRedirect />} />
              <Route path="/classroom-feed/:id" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><ClassroomFeedPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/classroom-management/:id" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><ClassroomManagementPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/courses" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><Courses /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/live-classes" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><LiveClasses /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student-progress" element={
                <ProtectedRoute allowedRoles={["tutor", "admin"]}>
                  <Layout><TutorStudentProgress /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute allowedRoles={["tutor", "admin", "student"]}>
                  <Layout><ProfilePage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute allowedRoles={["tutor", "admin", "student"]}>
                  <Layout><Resources /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute allowedRoles={["tutor", "admin", "student"]}>
                  <Layout><Notifications /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute allowedRoles={["tutor", "admin", "student"]}>
                  <Layout><Settings /></Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/users" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Layout><AdminUsers /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/programs" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Layout><AdminPrograms /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Layout><AdminAnalytics /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/payments" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Layout><AdminPayments /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/system-settings" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Layout><AdminSystemSettings /></Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/student-dashboard" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentDashboard /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-courses" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentCourses /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-courses/video/:topicId" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><CourseVideo /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-classrooms" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentClassrooms /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-classroom/:id" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentClassroomEntryPage /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-classroom/:classroomId/topic/:topicId" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentTopicViewerPage /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-assignments" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentAssignments /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-live-classes" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentLiveClasses /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-progress" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentProgress /></StudentLayout>
                </ProtectedRoute>
              } />
              <Route path="/student-achievements" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><div>Student Achievements Coming Soon</div></StudentLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/student/assignment/:id" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout><StudentAssignmentDetails /></StudentLayout>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </ToastProvider>
        </UserProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
