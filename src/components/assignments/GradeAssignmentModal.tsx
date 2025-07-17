
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Check,
  FileText,
  User,
  Calendar,
  AlertCircle,
  Download,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GradeAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: {
    id: string;
    assignmentId: string;
    assignmentName: string;
    studentName: string;
    submittedAt?: string;
    date?: string; // For compatibility with both formats
    dueDate: string;
    totalPoints: number;
    status: "submitted" | "late" | "not_submitted" | "graded";
    attachments?: { name: string; url?: string; type: string; size?: string }[];
    content?: string;
    grade?: number | string;
    feedback?: string;
  };
}

const GradeAssignmentModal: React.FC<GradeAssignmentModalProps> = ({
  isOpen,
  onClose,
  submission,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("submission");
  const [gradeType, setGradeType] = useState<"points" | "pass_fail">("points");
  const [pointsGrade, setPointsGrade] = useState<number>(
    typeof submission.grade === "number" 
      ? submission.grade 
      : typeof submission.grade === "string" && submission.grade.includes("/")
        ? parseInt(submission.grade.split("/")[0]) 
        : 0
  );
  const [passFail, setPassFail] = useState<"pass" | "fail">("pass");
  const [feedback, setFeedback] = useState<string>(submission.feedback || "");
  
  const submissionDate = submission.submittedAt || submission.date || "Unknown date";
  
  const handleSaveGrade = () => {
    // In a real app, this would make an API call to save the grade and feedback
    toast({
      title: "Assignment graded",
      description: `Grade saved for ${submission.studentName}'s submission`,
    });
    onClose();
  };
  
  const handleRequestResubmission = () => {
    toast({
      title: "Resubmission requested",
      description: `${submission.studentName} will be notified to resubmit their work.`,
    });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Grade Assignment
          </DialogTitle>
          <DialogDescription>
            Review and grade {submission.studentName}'s submission for {submission.assignmentName}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="submission">Submission</TabsTrigger>
            <TabsTrigger value="grading">Grading & Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submission" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="flex items-center gap-4 mb-4">
              <Badge 
                variant={
                  submission.status === "late" 
                    ? "destructive" 
                    : submission.status === "graded" 
                      ? "default" 
                      : "secondary"
                }
              >
                {submission.status === "late" 
                  ? "Submitted Late" 
                  : submission.status === "graded" 
                    ? "Graded" 
                    : "On Time"}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {submissionDate}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 mr-1" />
                {submission.studentName}
              </div>
            </div>
            
            <ScrollArea className="flex-1 border rounded-lg p-4 bg-secondary/30">
              <h3 className="text-lg font-medium mb-4">{submission.assignmentName}</h3>
              
              {submission.content && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Submission Content</h4>
                  <div className="p-4 bg-white/70 rounded-md">
                    <p className="whitespace-pre-line">{submission.content}</p>
                  </div>
                </div>
              )}
              
              {submission.attachments && submission.attachments.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Attachments</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {submission.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-md border bg-white/80">
                        <div className="p-2 bg-primary/10 rounded">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.type} {attachment.size ? `• ${attachment.size}` : ''}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {(!submission.content && (!submission.attachments || submission.attachments.length === 0)) && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No submission content available.</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="grading" className="flex-1 overflow-hidden flex flex-col mt-4">
            <ScrollArea className="flex-1">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Grading Type</Label>
                    <RadioGroup 
                      value={gradeType} 
                      onValueChange={(value) => setGradeType(value as "points" | "pass_fail")}
                      className="flex flex-col space-y-1 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="points" id="points-grading" />
                        <Label htmlFor="points-grading">Points-based grading</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pass_fail" id="pass-fail-grading" />
                        <Label htmlFor="pass-fail-grading">Pass/Fail grading</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {gradeType === "points" ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="grade">
                          Grade ({pointsGrade}/{submission.totalPoints})
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((pointsGrade / submission.totalPoints) * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Slider 
                          id="grade"
                          value={[pointsGrade]} 
                          max={submission.totalPoints} 
                          step={1}
                          onValueChange={(values) => setPointsGrade(values[0])}
                          className="flex-1"
                        />
                        <Input 
                          type="number"
                          value={pointsGrade}
                          onChange={(e) => setPointsGrade(Number(e.target.value))}
                          min={0}
                          max={submission.totalPoints}
                          className="w-20"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>Pass/Fail Grade</Label>
                      <RadioGroup 
                        value={passFail} 
                        onValueChange={(value) => setPassFail(value as "pass" | "fail")}
                        className="flex space-x-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pass" id="pass-grade" />
                          <Label htmlFor="pass-grade" className="text-emerald-600 font-medium">Pass</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fail" id="fail-grade" />
                          <Label htmlFor="fail-grade" className="text-rose-600 font-medium">Fail</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea 
                    id="feedback" 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide feedback to the student..."
                    className="min-h-[200px] resize-none"
                  />
                </div>
                
                <div className="rounded-md bg-amber-50 p-3 border border-amber-200 text-amber-800 text-sm">
                  <div className="flex gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Important</p>
                      <p className="mt-1">Once you save the grade, the student will be notified and can see your feedback.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={handleRequestResubmission}
          >
            <RotateCcw className="h-4 w-4" />
            Request Resubmission
          </Button>
          
          <Button onClick={handleSaveGrade} className="gap-2">
            <Check className="h-4 w-4" />
            Submit Grade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GradeAssignmentModal;
