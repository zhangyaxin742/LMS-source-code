
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

import BasicDetails from "./AssignmentFormSections/BasicDetails";
import SubmissionSettings from "./AssignmentFormSections/SubmissionSettings";
import AttachmentManager from "./AssignmentFormSections/AttachmentManager";
import AssignmentOptions from "./AssignmentFormSections/AssignmentOptions";
import ModuleTopicSelector from "./AssignmentFormSections/ModuleTopicSelector";
import { Module, Assignment } from "./types";

interface AssignmentFormProps {
  onSave: (assignment: Assignment) => void;
  onCancel: () => void;
  modules: Module[];
  initialValues?: Assignment;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({
  onSave,
  onCancel,
  modules,
  initialValues,
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [dueDate, setDueDate] = useState(initialValues?.dueDate || "");
  const [totalPoints, setTotalPoints] = useState(initialValues?.totalPoints || 100);
  const [moduleId, setModuleId] = useState(initialValues?.linkedTopic?.moduleId || "");
  const [topicId, setTopicId] = useState(initialValues?.linkedTopic?.id || "");
  const [submissionType, setSubmissionType] = useState<"file_upload" | "link" | "text_input">(
    initialValues?.submissionType || "file_upload"
  );
  const [allowLateSubmission, setAllowLateSubmission] = useState(
    initialValues?.allowLateSubmission || false
  );
  const [assignTo, setAssignTo] = useState<"all" | "specific">(
    initialValues?.assignTo || "all"
  );
  const [attachments, setAttachments] = useState<{ name: string; type: string; size: string }[]>(
    initialValues?.attachments || []
  );
  
  useEffect(() => {
    // Listen for the submit event from the parent component
    const handleSubmitEvent = () => {
      handleSubmit();
    };
    
    document.addEventListener('assignment-submit', handleSubmitEvent);
    
    return () => {
      document.removeEventListener('assignment-submit', handleSubmitEvent);
    };
  }, [title, description, dueDate, totalPoints, moduleId, topicId, 
      submissionType, allowLateSubmission, assignTo, attachments]);
  
  const handleAddAttachment = () => {
    const mockTypes = ["PDF", "DOCX", "PPTX", "ZIP"];
    const newAttachment = {
      name: `Resource ${attachments.length + 1}.${mockTypes[Math.floor(Math.random() * mockTypes.length)].toLowerCase()}`,
      type: mockTypes[Math.floor(Math.random() * mockTypes.length)],
      size: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9) + 1} MB`
    };
    setAttachments([...attachments, newAttachment]);
  };

  const handleRemoveAttachment = (index: number) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };
  
  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for this assignment.",
        variant: "destructive"
      });
      return;
    }
    
    if (!moduleId || !topicId) {
      toast({
        title: "Module and Topic Required",
        description: "Please select a module and topic for this assignment.",
        variant: "destructive"
      });
      return;
    }
    
    // Find the selected module and topic to get their names
    const selectedModule = modules.find(m => m.id === moduleId);
    const selectedTopic = selectedModule?.topics.find(t => t.id === topicId);
    
    if (!selectedModule || !selectedTopic) {
      toast({
        title: "Invalid Selection",
        description: "The selected module or topic is invalid.",
        variant: "destructive"
      });
      return;
    }
    
    const assignmentData: Assignment = {
      id: initialValues?.id || `a${Date.now()}`,
      title,
      description,
      dueDate,
      totalPoints,
      submissionType,
      allowLateSubmission,
      assignTo,
      attachments: attachments.length > 0 ? attachments : undefined,
      linkedTopic: {
        id: selectedTopic.id,
        name: selectedTopic.name,
        moduleId: selectedModule.id
      },
      status: initialValues?.status || "ongoing"
    };
    
    onSave(assignmentData);
  };
  
  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="space-y-5 py-4">
        <BasicDetails 
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          dueDate={dueDate}
          setDueDate={setDueDate}
          totalPoints={totalPoints}
          setTotalPoints={setTotalPoints}
        />

        <Separator />
        
        <ModuleTopicSelector 
          modules={modules}
          moduleId={moduleId}
          setModuleId={setModuleId}
          topicId={topicId}
          setTopicId={setTopicId}
        />

        <Separator />
        
        <SubmissionSettings 
          submissionType={submissionType}
          setSubmissionType={setSubmissionType}
        />

        <AttachmentManager 
          attachments={attachments}
          onAddAttachment={handleAddAttachment}
          onRemoveAttachment={handleRemoveAttachment}
        />

        <Separator />

        <AssignmentOptions 
          allowLateSubmission={allowLateSubmission}
          setAllowLateSubmission={setAllowLateSubmission}
          assignTo={assignTo}
          setAssignTo={setAssignTo}
        />
      </div>
    </ScrollArea>
  );
};

export default AssignmentForm;
