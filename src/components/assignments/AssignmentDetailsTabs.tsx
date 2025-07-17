
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AssignmentOverview from "./AssignmentOverview";
import SubmissionsList from "./SubmissionsList";
import { Assignment, Submission } from "./types";

interface AssignmentDetailsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  assignment: Assignment;
  submissions: Submission[];
  onSendReminders: () => void;
  onGradeSubmission: (submission: Submission) => void;
  onViewSubmission: (submission: Submission) => void;
}

const AssignmentDetailsTabs: React.FC<AssignmentDetailsTabsProps> = ({
  activeTab,
  setActiveTab,
  assignment,
  submissions,
  onSendReminders,
  onGradeSubmission,
  onViewSubmission
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 w-full md:w-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="submissions">
          Submissions ({assignment.submissions.received}/{assignment.submissions.total})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6 mt-6">
        <AssignmentOverview 
          assignment={assignment}
          onSendReminders={onSendReminders}
        />
      </TabsContent>
      
      <TabsContent value="submissions" className="space-y-6 mt-6">
        <SubmissionsList 
          submissions={submissions}
          onGradeSubmission={onGradeSubmission}
          onViewSubmission={onViewSubmission}
          onSendReminders={onSendReminders}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AssignmentDetailsTabs;
