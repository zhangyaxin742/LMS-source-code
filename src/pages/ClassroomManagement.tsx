
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Settings,
  Users,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ClassroomStatus } from "@/types/classroom";
import TutorsList from "@/components/classroom/TutorsList";
import StudentsTab from "@/components/classrooms/tabs/StudentsTab";

const ClassroomManagementPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = React.useState(false);

  // Mock classroom data - would be fetched from API
  const classroom = {
    id: id || "1",
    name: "UI Design Fundamentals",
    program: "UX/UI Design",
    course: "Design Basics",
    description: "A comprehensive introduction to UI design principles and practices.",
    studentCount: 24,
    moduleCount: 6,
    status: "active" as ClassroomStatus,
    startDate: "2023-08-15",
    endDate: "2023-12-15",
  };

  const handleStatusChange = (checked: boolean) => {
    setIsCompleted(checked);
    
    toast({
      title: checked ? "Classroom marked as completed" : "Classroom marked as active",
      description: `${classroom.name} has been updated.`,
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="pl-0"
          onClick={() => navigate(`/classroom/${id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Classroom
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Manage: {classroom.name}</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              {classroom.program} • {classroom.course}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground mr-2">
              Mark as Completed
            </span>
            <Switch checked={isCompleted} onCheckedChange={handleStatusChange} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{classroom.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-muted/20 p-4 rounded-md">
              <div className="font-medium">Admin</div>
              <div>Thomas Anderson</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-md">
              <div className="font-medium">Created On</div>
              <div>2023-07-01</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-md">
              <div className="font-medium">Modified On</div>
              <div>2023-08-05</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-md">
              <div className="font-medium">Status</div>
              <div className="capitalize">{classroom.status}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="settings">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Classroom Settings
          </TabsTrigger>
          <TabsTrigger value="tutors" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Tutors
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Students
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Manage your classroom settings including name, description, and enrollment options.</p>
              
              {/* Classroom settings form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="class-name" className="text-sm font-medium">Classroom Name</label>
                    <input
                      id="class-name"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={classroom.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="class-program" className="text-sm font-medium">Program</label>
                    <input
                      id="class-program"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={classroom.program}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="class-course" className="text-sm font-medium">Course</label>
                    <input
                      id="class-course"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={classroom.course}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="class-status" className="text-sm font-medium">Status</label>
                    <select
                      id="class-status"
                      className="w-full p-2 border rounded-md"
                      defaultValue={classroom.status}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
                    <input
                      id="start-date"
                      type="date"
                      className="w-full p-2 border rounded-md"
                      defaultValue={classroom.startDate}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="end-date" className="text-sm font-medium">End Date</label>
                    <input
                      id="end-date"
                      type="date"
                      className="w-full p-2 border rounded-md"
                      defaultValue={classroom.endDate}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea
                      id="description"
                      rows={3}
                      className="w-full p-2 border rounded-md"
                      defaultValue={classroom.description}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutors">
          <TutorsList classroomId={id || ""} />
        </TabsContent>

        <TabsContent value="students">
          <StudentsTab classroomId={id || ""} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomManagementPage;
