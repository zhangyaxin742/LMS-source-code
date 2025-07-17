
import { Assignment } from "@/components/assignments/types";
import { useToast } from "@/components/ui/use-toast";

export const useAssignmentActions = (
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>
) => {
  const { toast } = useToast();

  // Handlers for assignment actions
  const handleSaveAssignment = (newAssignment: Assignment) => {
    // Make sure new assignments have the ongoing status
    const assignmentWithStatus = {
      ...newAssignment,
      id: `a${Date.now()}`,
      status: "ongoing" as const
    };
    
    setAssignments(prev => [...prev, assignmentWithStatus]);
    toast({
      title: "Success",
      description: "Assignment created successfully",
    });
  };

  const handleUpdateAssignment = (updatedAssignment: Assignment) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment
      )
    );
    toast({
      title: "Success",
      description: "Assignment updated successfully",
    });
  };

  const markAssignmentAsCompleted = (assignment: Assignment) => {
    const updatedAssignment = { ...assignment, status: "completed" as const };
    setAssignments(prev => 
      prev.map(a => a.id === assignment.id ? updatedAssignment : a)
    );
    toast({
      title: "Assignment Completed",
      description: "The assignment has been marked as completed",
    });
  };

  return {
    handleSaveAssignment,
    handleUpdateAssignment,
    markAssignmentAsCompleted
  };
};
