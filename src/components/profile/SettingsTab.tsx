
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const SettingsTab: React.FC = () => {
  const { toast } = useToast();
  
  // Settings (mock, would come from API)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    inAppNotifications: true,
    notifyAssignments: true,
    notifyLiveClasses: true,
    notifyStudentSubmissions: true,
    profileVisibility: true,
    showEmailToStudents: false
  });
  
  // Save settings
  const handleSaveSettings = () => {
    // In a real app, this would be an API call to save settings
    toast({
      title: "Settings saved",
      description: "Your profile settings have been updated successfully",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Preferences</h3>
          
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for important updates
                </p>
              </div>
              <Switch 
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications within the application
                </p>
              </div>
              <Switch 
                id="in-app-notifications"
                checked={settings.inAppNotifications}
                onCheckedChange={(checked) => setSettings({...settings, inAppNotifications: checked})}
              />
            </div>
            
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="text-sm font-medium">Notify me about:</h4>
              
              <div className="grid gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="notify-assignments"
                    checked={settings.notifyAssignments}
                    onCheckedChange={(checked) => setSettings({...settings, notifyAssignments: checked === true})}
                  />
                  <Label htmlFor="notify-assignments">New Assignments</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="notify-live-classes"
                    checked={settings.notifyLiveClasses}
                    onCheckedChange={(checked) => setSettings({...settings, notifyLiveClasses: checked === true})}
                  />
                  <Label htmlFor="notify-live-classes">Live Classes</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="notify-submissions"
                    checked={settings.notifyStudentSubmissions}
                    onCheckedChange={(checked) => setSettings({...settings, notifyStudentSubmissions: checked === true})}
                  />
                  <Label htmlFor="notify-submissions">Student Submissions</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Visibility</h3>
          
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Make your profile visible to students
                </p>
              </div>
              <Switch 
                id="profile-visibility"
                checked={settings.profileVisibility}
                onCheckedChange={(checked) => setSettings({...settings, profileVisibility: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-email">Show Email to Students</Label>
                <p className="text-sm text-muted-foreground">
                  Allow students to see your email address
                </p>
              </div>
              <Switch 
                id="show-email"
                checked={settings.showEmailToStudents}
                onCheckedChange={(checked) => setSettings({...settings, showEmailToStudents: checked})}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
