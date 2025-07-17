
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProgramDetailsTab from "./ProgramDetailsTab";
import StudentsTab from "./StudentsTab";
import TutorsTab from "./TutorsTab";
import { ProgramSchema, ProgramFormValues, ProgramManagementModalProps, User } from "./types";

// Mock data for users that could be assigned to programs
const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "student" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "tutor" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com", role: "student" },
  { id: "4", name: "Bob Williams", email: "bob@example.com", role: "tutor" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "student" },
];

const ProgramManagementModal: React.FC<ProgramManagementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  program,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [branches, setBranches] = useState<string[]>([]);
  const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
  const [assignedTutors, setAssignedTutors] = useState<string[]>([]);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(ProgramSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: "",
      branches: [],
    },
  });

  // Set form values when editing a program
  useEffect(() => {
    if (program) {
      form.reset({
        name: program.name,
        description: program.description,
        price: program.price,
        duration: program.duration,
        branches: program.branches,
      });
      setBranches(program.branches || []);
      setAssignedStudents(program.assignedStudents || []);
      setAssignedTutors(program.assignedTutors || []);
    } else {
      form.reset({
        name: "",
        description: "",
        price: 0,
        duration: "",
        branches: [],
      });
      setBranches([]);
      setAssignedStudents([]);
      setAssignedTutors([]);
    }
  }, [program, form]);

  const toggleUser = (userId: string, role: "student" | "tutor") => {
    if (role === "student") {
      setAssignedStudents(prevState => 
        prevState.includes(userId) 
          ? prevState.filter(id => id !== userId)
          : [...prevState, userId]
      );
    } else if (role === "tutor") {
      setAssignedTutors(prevState => 
        prevState.includes(userId) 
          ? prevState.filter(id => id !== userId)
          : [...prevState, userId]
      );
    }
  };

  const onSubmit = (data: ProgramFormValues) => {
    // Make sure branches are included in the data
    data.branches = branches;
    
    // Include assigned users in the data
    const programData = {
      ...data,
      assignedStudents,
      assignedTutors
    };
    
    onSave(programData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{program ? "Edit Program" : "Add New Program"}</DialogTitle>
          <DialogDescription>
            {program
              ? "Update the program's information"
              : "Enter the details for the new educational program"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="details" className="flex-1">Program Details</TabsTrigger>
            <TabsTrigger value="students" className="flex-1">Students</TabsTrigger>
            <TabsTrigger value="tutors" className="flex-1">Tutors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Form {...form}>
              <ProgramDetailsTab 
                form={form}
                branches={branches}
                setBranches={setBranches}
              />
            </Form>
          </TabsContent>
          
          <TabsContent value="students">
            <StudentsTab 
              assignedStudents={assignedStudents}
              toggleUser={toggleUser}
              users={mockUsers}
            />
          </TabsContent>
          
          <TabsContent value="tutors">
            <TutorsTab 
              assignedTutors={assignedTutors}
              toggleUser={toggleUser}
              users={mockUsers}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            {program ? "Update Program" : "Add Program"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramManagementModal;
