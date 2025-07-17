
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface AssignmentOptionsProps {
  allowLateSubmission: boolean;
  setAllowLateSubmission: (value: boolean) => void;
  assignTo: "all" | "specific";
  setAssignTo: (value: "all" | "specific") => void;
}

const AssignmentOptions: React.FC<AssignmentOptionsProps> = ({
  allowLateSubmission,
  setAllowLateSubmission,
  assignTo,
  setAssignTo,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base">Allow Late Submissions</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Students can submit after the due date
          </p>
        </div>
        <Switch 
          checked={allowLateSubmission} 
          onCheckedChange={setAllowLateSubmission} 
        />
      </div>
      
      <div>
        <Label className="text-base">Assign To</Label>
        <RadioGroup 
          value={assignTo} 
          onValueChange={(value) => setAssignTo(value as "all" | "specific")}
          className="flex flex-col space-y-2 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="assign-all" />
            <Label htmlFor="assign-all">All Students</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specific" id="assign-specific" />
            <Label htmlFor="assign-specific">Specific Students</Label>
          </div>
        </RadioGroup>
        
        {assignTo === "specific" && (
          <div className="mt-3 p-3 border rounded-md bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Student selection would appear here. This is a mock interface.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentOptions;
