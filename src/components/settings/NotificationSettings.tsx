
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const NotificationSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    
    // For email notifications
    assignmentEmail: true,
    courseUpdateEmail: true,
    studentMessageEmail: true,
    reminderEmail: true,
    
    // For push notifications
    assignmentPush: true,
    courseUpdatePush: true,
    studentMessagePush: true,
    reminderPush: false,
    
    // Marketing preferences
    marketingEmails: false,
    newsletterSubscription: true,
    eventInvitations: true
  });
  
  const handleToggle = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };
  
  const handleSave = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch 
                id="email-notifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications on your devices
                </p>
              </div>
              <Switch 
                id="push-notifications"
                checked={notificationSettings.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important notifications via text message
                </p>
              </div>
              <Switch 
                id="sms-notifications"
                checked={notificationSettings.smsNotifications}
                onCheckedChange={() => handleToggle('smsNotifications')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Email Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="assignment-email"
                checked={notificationSettings.assignmentEmail}
                onCheckedChange={() => handleToggle('assignmentEmail')}
              />
              <label htmlFor="assignment-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Assignment updates
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="course-update-email"
                checked={notificationSettings.courseUpdateEmail}
                onCheckedChange={() => handleToggle('courseUpdateEmail')}
              />
              <label htmlFor="course-update-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Course content updates
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="student-message-email"
                checked={notificationSettings.studentMessageEmail}
                onCheckedChange={() => handleToggle('studentMessageEmail')}
              />
              <label htmlFor="student-message-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Messages from students
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="reminder-email"
                checked={notificationSettings.reminderEmail}
                onCheckedChange={() => handleToggle('reminderEmail')}
              />
              <label htmlFor="reminder-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Class reminders
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Push Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="assignment-push"
                checked={notificationSettings.assignmentPush}
                onCheckedChange={() => handleToggle('assignmentPush')}
              />
              <label htmlFor="assignment-push" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Assignment updates
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="course-update-push"
                checked={notificationSettings.courseUpdatePush}
                onCheckedChange={() => handleToggle('courseUpdatePush')}
              />
              <label htmlFor="course-update-push" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Course content updates
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="student-message-push"
                checked={notificationSettings.studentMessagePush}
                onCheckedChange={() => handleToggle('studentMessagePush')}
              />
              <label htmlFor="student-message-push" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Messages from students
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="reminder-push"
                checked={notificationSettings.reminderPush}
                onCheckedChange={() => handleToggle('reminderPush')}
              />
              <label htmlFor="reminder-push" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Class reminders
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Marketing Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="marketing-emails"
                checked={notificationSettings.marketingEmails}
                onCheckedChange={() => handleToggle('marketingEmails')}
              />
              <label htmlFor="marketing-emails" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Marketing emails
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newsletter"
                checked={notificationSettings.newsletterSubscription}
                onCheckedChange={() => handleToggle('newsletterSubscription')}
              />
              <label htmlFor="newsletter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Educational newsletter subscription
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="events"
                checked={notificationSettings.eventInvitations}
                onCheckedChange={() => handleToggle('eventInvitations')}
              />
              <label htmlFor="events" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Event invitations and webinars
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Notification Settings</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
