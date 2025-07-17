
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

const AppearanceSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    theme: "system",
    animationsEnabled: true,
    highContrastMode: false,
    reducedMotion: false,
    fontScale: "medium",
    sidebarCollapsed: false
  });
  
  const handleThemeChange = (value: string) => {
    setSettings(prev => ({ ...prev, theme: value }));
  };
  
  const handleFontScaleChange = (value: string) => {
    setSettings(prev => ({ ...prev, fontScale: value }));
  };
  
  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };
  
  const handleSave = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Theme</h3>
            <RadioGroup 
              value={settings.theme}
              onValueChange={handleThemeChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">System Default</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Animations</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animations">Enable Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Show animations throughout the interface
                </p>
              </div>
              <Switch 
                id="animations"
                checked={settings.animationsEnabled}
                onCheckedChange={() => handleToggle('animationsEnabled')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch 
              id="high-contrast"
              checked={settings.highContrastMode}
              onCheckedChange={() => handleToggle('highContrastMode')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations for reduced motion sensitivity
              </p>
            </div>
            <Switch 
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={() => handleToggle('reducedMotion')}
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Font Size</h3>
            <RadioGroup 
              value={settings.fontScale}
              onValueChange={handleFontScaleChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Layout Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sidebar-collapsed">Collapsed Sidebar by Default</Label>
              <p className="text-sm text-muted-foreground">
                Start with a collapsed sidebar for more space
              </p>
            </div>
            <Switch 
              id="sidebar-collapsed"
              checked={settings.sidebarCollapsed}
              onCheckedChange={() => handleToggle('sidebarCollapsed')}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Appearance Settings</Button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
