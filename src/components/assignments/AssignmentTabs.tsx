
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AssignmentList from "@/components/classrooms/tabs/assignments/AssignmentList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Assignment } from "@/components/assignments/types";

interface AssignmentTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  ongoingAssignments: Assignment[];
  completedAssignments: Assignment[];
  onCreateAssignment: () => void;
  onMarkAsCompleted: (assignment: Assignment) => void;
  onView: (assignment: Assignment) => void;
  onEdit: (assignment: Assignment) => void;
}

const AssignmentTabs: React.FC<AssignmentTabsProps> = ({
  activeTab,
  setActiveTab,
  ongoingAssignments,
  completedAssignments,
  onCreateAssignment,
  onMarkAsCompleted,
  onView,
  onEdit
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-secondary/60 grid grid-cols-2 w-full md:w-auto">
        <TabsTrigger value="ongoing" className="relative">
          Ongoing
          {ongoingAssignments.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {ongoingAssignments.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="completed" className="relative">
          Completed
          {completedAssignments.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {completedAssignments.length}
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ongoing" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Ongoing Assignments</h2>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={onCreateAssignment}
          >
            <PlusCircle className="h-4 w-4" />
            New Assignment
          </Button>
        </div>
        <AssignmentList 
          title="Ongoing Assignments"
          assignments={ongoingAssignments} 
          status="ongoing"
          onMarkAsCompleted={onMarkAsCompleted}
          onView={onView}
          onEdit={onEdit}
        />
      </TabsContent>

      <TabsContent value="completed" className="space-y-4">
        <h2 className="text-xl font-semibold">Completed Assignments</h2>
        <AssignmentList 
          title="Completed Assignments"
          assignments={completedAssignments} 
          status="completed"
          onView={onView}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AssignmentTabs;
