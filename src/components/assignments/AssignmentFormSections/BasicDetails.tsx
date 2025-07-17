
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";

interface BasicDetailsProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  totalPoints: number;
  setTotalPoints: (value: number) => void;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  totalPoints,
  setTotalPoints,
}) => {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="title" className="text-base">Assignment Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Wireframing Exercise"
          className="w-full mt-1.5"
        />
      </div>
      
      <div>
        <Label htmlFor="description" className="text-base">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide detailed instructions for the assignment"
          className="h-24 mt-1.5"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="due-date" className="text-base">Due Date</Label>
          <div className="relative mt-1.5">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="points" className="text-base">Total Points</Label>
          <Input
            id="points"
            type="number"
            value={totalPoints}
            onChange={(e) => setTotalPoints(Number(e.target.value))}
            min={1}
            className="mt-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
