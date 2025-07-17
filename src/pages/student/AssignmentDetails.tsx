
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubmitAssignmentModal from "@/components/student/assignments/SubmitAssignmentModal";
import AssignmentStatusBadge from "@/components/student/assignments/AssignmentStatusBadge";
import AssignmentDescription from "@/components/student/assignments/AssignmentDescription";
import AssignmentSubmission from "@/components/student/assignments/AssignmentSubmission";
import AssignmentDetailsSidebar from "@/components/student/assignments/AssignmentDetailsSidebar";

const StudentAssignmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Mock data for assignment details - in a real app, this would be fetched from an API
  const assignment = {
    id: id || "1",
    title: "Design Principles Analysis",
    course: "UI/UX Design Fundamentals",
    classroom: "UI Design Workshop",
    description: "Analyze the design principles used in three different mobile applications and prepare a detailed report on your findings. Your analysis should include examples of how each principle is applied, and your assessment of its effectiveness.",
    dueDate: "2023-10-15T23:59:59",
    submissionDate: "2023-10-10T14:35:00",
    status: "pending", // changed from 'submitted' to 'pending' to show submit button
    grade: "A",
    maxPoints: 100,
    earnedPoints: 92,
    progress: 100,
    feedback: "Excellent analysis of design principles. Your understanding of visual hierarchy and color theory is impressive. Consider exploring more on consistency and accessibility in future assignments.",
    attachments: [
      { id: "att1", name: "Assignment Guidelines.pdf", size: "1.2 MB", type: "pdf" },
      { id: "att2", name: "Example Report.docx", size: "850 KB", type: "docx" },
    ],
    submissions: [
      { id: "sub1", name: "My Submission.pdf", date: "2023-10-10T14:35:00", size: "3.4 MB" },
    ],
    rubric: [
      { name: "Analysis Depth", score: 25, maxScore: 25 },
      { name: "Examples Provided", score: 24, maxScore: 25 },
      { name: "Writing Quality", score: 22, maxScore: 25 },
      { name: "Visual Presentation", score: 21, maxScore: 25 },
    ],
    // Added to show the source of the assignment
    source: "Course Video" 
  };

  const handleOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="pl-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{assignment.title}</h1>
          <p className="text-muted-foreground">{assignment.course} • {assignment.classroom}</p>
          
          {/* Added source indicator */}
          {assignment.source && (
            <div className="mt-2">
              <span className="text-sm bg-secondary/50 px-2 py-1 rounded-full">
                From: {assignment.source}
              </span>
            </div>
          )}
        </div>
        <AssignmentStatusBadge status={assignment.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AssignmentDescription 
            description={assignment.description}
            attachments={assignment.attachments}
          />

          <AssignmentSubmission 
            status={assignment.status}
            submissionDate={assignment.submissionDate}
            submissions={assignment.submissions}
            onSubmit={handleOpenSubmitModal}
          />
          
          {/* Added submit button at the bottom for easier access */}
          {assignment.status === 'pending' && (
            <div className="flex justify-end">
              <Button onClick={handleOpenSubmitModal}>
                <Upload className="mr-2 h-4 w-4" />
                Submit Assignment
              </Button>
            </div>
          )}
        </div>

        <div>
          <AssignmentDetailsSidebar 
            dueDate={assignment.dueDate}
            progress={assignment.progress}
            status={assignment.status}
            grade={assignment.grade}
            earnedPoints={assignment.earnedPoints}
            maxPoints={assignment.maxPoints}
            feedback={assignment.feedback}
            rubric={assignment.rubric}
            onSubmit={handleOpenSubmitModal}
          />
        </div>
      </div>

      <SubmitAssignmentModal
        isOpen={isSubmitModalOpen}
        onClose={handleCloseSubmitModal}
        assignmentId={assignment.id.toString()}
        assignmentTitle={assignment.title}
        submissionType="file_upload"
      />
    </div>
  );
};

export default StudentAssignmentDetails;
