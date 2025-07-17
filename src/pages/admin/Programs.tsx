
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Import our new components
import ProgramHeader from "@/components/admin/programs/ProgramHeader";
import SearchAndFilters from "@/components/admin/programs/SearchAndFilters";
import ProgramsTab from "@/components/admin/programs/ProgramsTab";
import CoursesTab from "@/components/admin/programs/CoursesTab";
import ClassroomsTab from "@/components/admin/programs/ClassroomsTab";
import { formatCurrency, formatDate } from "@/components/admin/programs/utils";
import { mockPrograms, mockCourses, mockClassrooms } from "@/components/admin/programs/mockData";
import ProgramManagementModal from "@/components/admin/ProgramManagementModal";
import { Program } from "@/components/admin/programs/types";

const AdminPrograms = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState(mockPrograms);
  const [courses, setCourses] = useState(mockCourses);
  const [classrooms, setClassrooms] = useState(mockClassrooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [activeTab, setActiveTab] = useState("programs");

  // Get unique branches from all programs
  const allBranches = React.useMemo(() => {
    const branchSet = new Set<string>();
    programs.forEach(program => {
      program.branches.forEach(branch => branchSet.add(branch));
    });
    return Array.from(branchSet);
  }, [programs]);

  // Filter programs based on search term
  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter courses based on selected program, branch, and search term
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || course.program === selectedProgram;
    const matchesBranch = selectedBranch === "all" || course.branch === selectedBranch;
    return matchesSearch && matchesProgram && matchesBranch;
  });

  // Filter classrooms based on selected program and search term
  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || classroom.program === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  // Update available branches when selected program changes
  useEffect(() => {
    if (selectedProgram !== "all") {
      setSelectedBranch("all");
    }
  }, [selectedProgram]);

  const handleAddProgram = () => {
    setCurrentProgram(null);
    setModalOpen(true);
  };

  const handleEditProgram = (program: Program) => {
    setCurrentProgram(program);
    setModalOpen(true);
  };

  const handleDeleteProgram = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    setPrograms(programs.filter(p => p.id !== programId));

    toast({
      title: "Program deleted",
      description: `${program?.name} has been deleted.`,
    });
  };

  const handleSaveProgram = (programData: any) => {
    if (currentProgram) {
      // Update existing program
      setPrograms(programs.map(program =>
        program.id === currentProgram.id ? { ...program, ...programData } : program
      ));

      toast({
        title: "Program updated",
        description: `${programData.name} has been updated.`,
      });
    } else {
      // Add new program
      const newProgram = {
        id: (programs.length + 1).toString(),
        ...programData,
        tutors: programData.assignedTutors?.length || 0,
        students: programData.assignedStudents?.length || 0,
        courses: 0
      };

      setPrograms([...programs, newProgram]);

      toast({
        title: "Program added",
        description: `${programData.name} has been added.`,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <ProgramHeader handleAddProgram={handleAddProgram} />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Program Overview</CardTitle>
              <CardDescription>View and manage all educational content</CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="grid w-full sm:w-[400px] grid-cols-3">
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <SearchAndFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            programs={programs}
            activeTab={activeTab}
          />

          <TabsContent value="programs" className="m-0">
            <ProgramsTab 
              programs={filteredPrograms}
              formatCurrency={formatCurrency}
              handleEditProgram={handleEditProgram}
              handleDeleteProgram={handleDeleteProgram}
            />
          </TabsContent>

          <TabsContent value="courses" className="m-0">
            <CoursesTab courses={filteredCourses} />
          </TabsContent>

          <TabsContent value="classrooms" className="m-0">
            <ClassroomsTab 
              classrooms={filteredClassrooms} 
              formatDate={formatDate}
            />
          </TabsContent>
        </CardContent>
      </Card>

      <ProgramManagementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProgram}
        program={currentProgram}
      />
    </div>
  );
};

export default AdminPrograms;
