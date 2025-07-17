
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextSubmissionForm } from "@/components/student/assignments/submission/TextSubmissionForm";

interface NotesTabProps {
  textContent: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ textContent, onTextChange }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-3">Your Notes</h3>
        <TextSubmissionForm 
          textContent={textContent}
          onTextChange={onTextChange}
        />
        <div className="flex justify-end mt-4">
          <Button>Save Notes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesTab;
