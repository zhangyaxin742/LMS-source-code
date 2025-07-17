
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Megaphone } from "lucide-react";

interface AnnouncementsTabProps {
  classroomId: string;
}

const AnnouncementsTab: React.FC<AnnouncementsTabProps> = ({ classroomId }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-md">
        <Megaphone className="h-8 w-8 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">No announcements yet</h3>
        <p className="text-muted-foreground mb-4">
          Create announcements to communicate with your students
        </p>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementsTab;
