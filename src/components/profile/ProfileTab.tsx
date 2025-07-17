
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import ProfileEditModal from "./ProfileEditModal";
import ActivityLog from "./ActivityLog";

const ProfileTab: React.FC = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  // Profile data (mock, would come from API)
  const tutorProfile = {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Tutor",
    bio: "Experienced UI/UX designer with 10 years in the industry",
    qualifications: "MSc in Design, Certified UX Professional",
    profileImage: "https://i.pravatar.cc/300?img=28",
    assignedPrograms: ["UI/UX Design", "Web Design Fundamentals"],
    assignedCourses: ["UI/UX Design Fundamentals", "User Research Methods", "Prototyping Techniques"]
  };
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32 border-2 border-primary/20">
              <img src={tutorProfile.profileImage} alt={tutorProfile.name} />
            </Avatar>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditProfileOpen(true)} 
              className="flex items-center gap-1"
            >
              <Edit size={14} />
              Edit Profile
            </Button>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{tutorProfile.name}</h2>
              <div className="text-muted-foreground">{tutorProfile.email}</div>
              <Badge variant="outline" className="mt-1">
                {tutorProfile.role}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Bio</h3>
              <p className="text-sm text-muted-foreground">{tutorProfile.bio}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Qualifications</h3>
              <p className="text-sm text-muted-foreground">{tutorProfile.qualifications}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Assigned Programs</h3>
                <div className="flex flex-wrap gap-2">
                  {tutorProfile.assignedPrograms.map((program) => (
                    <Badge key={program} variant="secondary" className="text-xs">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Assigned Courses</h3>
                <div className="flex flex-wrap gap-2">
                  {tutorProfile.assignedCourses.map((course) => (
                    <Badge key={course} variant="secondary" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ActivityLog />
      
      {/* Profile Edit Modal */}
      <ProfileEditModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)}
        profile={tutorProfile}
      />
    </>
  );
};

export default ProfileTab;
