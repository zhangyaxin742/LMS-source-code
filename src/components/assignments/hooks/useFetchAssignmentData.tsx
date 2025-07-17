
import { useEffect } from "react";
import { assignmentData, generateMockSubmissions } from "@/components/assignments/AssignmentData";
import { Assignment, Submission } from "@/components/assignments/types";

export const useFetchAssignmentData = (
  id: string | undefined,
  assignments: Assignment[],
  setAssignment: (assignment: Assignment) => void,
  setSubmissions: (submissions: Submission[]) => void
) => {
  useEffect(() => {
    if (!id) return;
    
    console.log("Looking for assignment with ID:", id);
    console.log("Available assignments:", assignments);
    console.log("Assignment data from static source:", assignmentData);

    // First check our assignments data from useAssignmentsData
    const foundAssignment = assignments.find(a => a.id === id);
    
    if (foundAssignment) {
      console.log("Found assignment in assignments array:", foundAssignment);
      setAssignment(foundAssignment);
      
      // Generate mock submissions data
      const mockSubmissions = generateMockSubmissions(
        foundAssignment.id, 
        foundAssignment.title, 
        foundAssignment.dueDate, 
        foundAssignment.totalPoints
      );
      setSubmissions(mockSubmissions as Submission[]);
    } 
    // Fallback to assignmentData if not found in assignments
    else if (assignmentData && assignmentData[id]) {
      const currentAssignment = assignmentData[id];
      console.log("Found assignment in static data:", currentAssignment);
      setAssignment(currentAssignment);
      
      // Generate mock submissions data
      const mockSubmissions = generateMockSubmissions(
        currentAssignment.id, 
        currentAssignment.title, 
        currentAssignment.dueDate, 
        currentAssignment.totalPoints
      );
      setSubmissions(mockSubmissions as Submission[]);
    } else {
      console.error(`Assignment with id ${id} not found`);
      
      // If we couldn't find the assignment, check if we've loaded the assignments correctly
      if (assignments.length === 0) {
        console.log("No assignments loaded yet, waiting for data...");
      }
    }
  }, [id, assignments, setAssignment, setSubmissions]);
};
