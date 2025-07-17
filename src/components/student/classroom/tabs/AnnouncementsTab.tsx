
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnnouncementData {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

interface AnnouncementsTabProps {
  announcements: AnnouncementData[];
}

const AnnouncementsTab: React.FC<AnnouncementsTabProps> = ({ announcements }) => {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{announcement.title}</CardTitle>
              <span className="text-sm text-muted-foreground">{announcement.date}</span>
            </div>
            <CardDescription>by {announcement.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{announcement.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementsTab;
