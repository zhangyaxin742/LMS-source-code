
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Clock, FileText, Users, Send, BookOpen, Book } from "lucide-react";
import { Assignment } from "./types";

interface AssignmentOverviewProps {
  assignment: Assignment;
  onSendReminders: () => void;
}

const AssignmentOverview: React.FC<AssignmentOverviewProps> = ({ 
  assignment, 
  onSendReminders 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Assignment Details</CardTitle>
        <p className="text-sm text-muted-foreground">Key information about this assignment</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-2">Description</h3>
          <p className="text-muted-foreground">{assignment.description}</p>
        </div>
        
        {/* Module and Topic section */}
        {(assignment.linkedTopic || assignment.linkedModule) && (
          <div>
            <h3 className="text-base font-medium mb-2">Course Material</h3>
            <div className="space-y-2">
              {assignment.linkedModule && (
                <div className="flex items-center text-muted-foreground">
                  <BookOpen size={16} className="mr-2" />
                  <span>Module: {assignment.linkedModule}</span>
                </div>
              )}
              {assignment.linkedTopic && (
                <div className="flex items-center text-muted-foreground">
                  <Book size={16} className="mr-2" />
                  <span>Topic: {assignment.linkedTopic.name}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium mb-2">Due Date</h3>
            <div className="flex items-center text-muted-foreground">
              <Calendar size={16} className="mr-2" />
              <span>{assignment.dueDate}</span>
              {assignment.dueTime && (
                <>
                  <Clock size={16} className="ml-4 mr-2" />
                  <span>{assignment.dueTime}</span>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-2">Submission Format</h3>
            <div className="flex items-center text-muted-foreground">
              <FileText size={16} className="mr-2" />
              <span>
                {assignment.submissionType === "file_upload" 
                  ? "File Upload" 
                  : assignment.submissionType === "link" 
                    ? "External Link" 
                    : "Text Submission"}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground mt-2">
              <Clock size={16} className="mr-2" />
              <span>Late submissions: {assignment.allowLateSubmission ? "Allowed" : "Not allowed"}</span>
            </div>
          </div>
        </div>
        
        {assignment.submissionRequirements && (
          <div>
            <h3 className="text-base font-medium mb-2">Submission Requirements</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              {assignment.submissionRequirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Resources section with null check */}
        {(assignment.resources && assignment.resources.length > 0) && (
          <div>
            <h3 className="text-base font-medium mb-3">Resources</h3>
            <div className="space-y-2">
              {assignment.resources.map((resource, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/20"
                >
                  <div className="flex items-center">
                    <FileText size={18} className="mr-3 text-primary" />
                    <div>
                      <p className="font-medium">{resource.name}</p>
                      <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {assignment.submissions && (
          <div>
            <h3 className="text-base font-medium mb-3">Submission Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Submissions Received</span>
                <span className="font-medium">
                  {assignment.submissions.received} of {assignment.submissions.total}
                </span>
              </div>
              <Progress 
                value={(assignment.submissions.received / assignment.submissions.total) * 100} 
                className="h-2" 
              />
              
              {/* Students not submitted section with null check */}
              {(assignment.studentsNotSubmitted && assignment.studentsNotSubmitted.length > 0) && (
                <div className="mt-4">
                  <p className="text-sm mb-2 text-amber-600 flex items-center">
                    <Users size={16} className="mr-2" />
                    {assignment.studentsNotSubmitted.length} students haven't submitted yet
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {assignment.studentsNotSubmitted.map((student, index) => (
                      <div key={index} className="px-3 py-1 bg-secondary rounded-full text-xs">
                        {student}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="mt-3"
                    onClick={onSendReminders}
                  >
                    <Send size={14} className="mr-2" />
                    Send Reminders
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignmentOverview;
