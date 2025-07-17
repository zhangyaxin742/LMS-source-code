
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClassroomsList from "@/components/classrooms/ClassroomsList";
import CreateClassroomDialog from "@/components/classrooms/CreateClassroomDialog";
import { useToast } from "@/components/ui/use-toast";
import { Classroom, ClassroomStatus } from "@/types/classroom";
import ClassroomHeader from "./ClassroomHeader";
import ClassroomSearchBar from "./ClassroomSearchBar";
import ClassroomGrid from "./ClassroomGrid";

const ClassroomOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ClassroomStatus>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock classroom data
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: "1",
      name: "UI Design Fundamentals",
      program: "UX/UI Design",
      course: "Design Basics",
      studentCount: 24,
      moduleCount: 6,
      status: "active"
    },
    {
      id: "2",
      name: "Frontend Development 101",
      program: "Web Development",
      course: "JavaScript Essentials",
      studentCount: 18,
      moduleCount: 8,
      status: "active"
    },
    {
      id: "3",
      name: "Design Systems Workshop",
      program: "UX/UI Design",
      course: "Advanced Design",
      studentCount: 12,
      moduleCount: 4,
      status: "completed"
    },
    {
      id: "4",
      name: "React Advanced Patterns",
      program: "Web Development",
      course: "React Mastery",
      studentCount: 15,
      moduleCount: 6,
      status: "upcoming"
    }
  ]);

  const filteredClassrooms = classrooms
    .filter(classroom => 
      filter === "all" || classroom.status === filter
    )
    .filter(classroom => 
      classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classroom.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (classroom.course && classroom.course.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleCreateClassroom = (newClassroom: Omit<Classroom, "id" | "studentCount" | "moduleCount" | "course">) => {
    const createdClassroom = {
      ...newClassroom,
      id: Date.now().toString(),
      studentCount: 0,
      moduleCount: 0
    };
    
    setClassrooms([...classrooms, createdClassroom]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Classroom created",
      description: `${newClassroom.name} has been successfully created.`
    });
  };

  const handleArchiveClassroom = (id: string) => {
    setClassrooms(classrooms.filter(classroom => classroom.id !== id));
    
    toast({
      title: "Classroom archived",
      description: "The classroom has been successfully archived."
    });
  };

  const handleClassroomClick = (id: string) => {
    navigate(`/classroom-detail/${id}`);
  };

  return (
    <div className="container mx-auto py-6">
      <ClassroomHeader onCreateClick={() => setIsCreateDialogOpen(true)} />
      
      <ClassroomSearchBar 
        searchQuery={searchQuery}
        viewMode={viewMode}
        onSearchChange={setSearchQuery}
        onViewModeChange={setViewMode}
      />

      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Classrooms</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {viewMode === "grid" ? (
            <ClassroomGrid 
              classrooms={filteredClassrooms} 
              onClassroomClick={handleClassroomClick} 
            />
          ) : (
            <ClassroomsList 
              classrooms={filteredClassrooms} 
              onArchive={handleArchiveClassroom} 
            />
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          {viewMode === "grid" ? (
            <ClassroomGrid 
              classrooms={filteredClassrooms} 
              onClassroomClick={handleClassroomClick} 
            />
          ) : (
            <ClassroomsList 
              classrooms={filteredClassrooms} 
              onArchive={handleArchiveClassroom} 
            />
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          {viewMode === "grid" ? (
            <ClassroomGrid 
              classrooms={filteredClassrooms} 
              onClassroomClick={handleClassroomClick} 
            />
          ) : (
            <ClassroomsList 
              classrooms={filteredClassrooms} 
              onArchive={handleArchiveClassroom} 
            />
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {viewMode === "grid" ? (
            <ClassroomGrid 
              classrooms={filteredClassrooms} 
              onClassroomClick={handleClassroomClick} 
            />
          ) : (
            <ClassroomsList 
              classrooms={filteredClassrooms} 
              onArchive={handleArchiveClassroom} 
            />
          )}
        </TabsContent>
      </Tabs>

      <CreateClassroomDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onCreateClassroom={handleCreateClassroom}
      />
    </div>
  );
};

export default ClassroomOverview;
