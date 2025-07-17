
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const PrivacySettings: React.FC = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessageRequests: true,
    activityVisibility: "connections",
    dataCollection: true,
    analyticsConsent: true
  });
  
  const handleSelectChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };
  
  const handleSave = () => {
    toast({
      title: "Privacy Settings Saved",
      description: "Your privacy preferences have been updated."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="profile-visibility">Profile Visibility</Label>
            <Select 
              value={settings.profileVisibility} 
              onValueChange={(value) => handleSelectChange('profileVisibility', value)}
            >
              <SelectTrigger id="profile-visibility">
                <SelectValue placeholder="Who can see your profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (Everyone)</SelectItem>
                <SelectItem value="students">Students Only</SelectItem>
                <SelectItem value="connections">Connections Only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Contact Information</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-email">Show Email Address</Label>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your email address
                </p>
              </div>
              <Switch 
                id="show-email"
                checked={settings.showEmail}
                onCheckedChange={() => handleToggle('showEmail')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-phone">Show Phone Number</Label>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your phone number
                </p>
              </div>
              <Switch 
                id="show-phone"
                checked={settings.showPhone}
                onCheckedChange={() => handleToggle('showPhone')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Messaging Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="message-requests">Allow Message Requests</Label>
              <p className="text-sm text-muted-foreground">
                Allow students to send you message requests
              </p>
            </div>
            <Switch 
              id="message-requests"
              checked={settings.allowMessageRequests}
              onCheckedChange={() => handleToggle('allowMessageRequests')}
            />
          </div>
          
          <div className="mt-6 space-y-3">
            <Label htmlFor="activity-visibility">Activity Visibility</Label>
            <Select 
              value={settings.activityVisibility}
              onValueChange={(value) => handleSelectChange('activityVisibility', value)}
            >
              <SelectTrigger id="activity-visibility">
                <SelectValue placeholder="Who can see your activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Everyone</SelectItem>
                <SelectItem value="students">Students Only</SelectItem>
                <SelectItem value="connections">Connections Only</SelectItem>
                <SelectItem value="private">No One</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-collection">Data Collection</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to collect data to improve your experience
              </p>
            </div>
            <Switch 
              id="data-collection"
              checked={settings.dataCollection}
              onCheckedChange={() => handleToggle('dataCollection')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics">Analytics Consent</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to analyze your usage for analytics purposes
              </p>
            </div>
            <Switch 
              id="analytics"
              checked={settings.analyticsConsent}
              onCheckedChange={() => handleToggle('analyticsConsent')}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Privacy Settings</Button>
      </div>
    </div>
  );
};

export default PrivacySettings;
