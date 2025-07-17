
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, Check, X } from "lucide-react";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  onToggle: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  title, 
  description, 
  icon, 
  connected, 
  onToggle 
}) => {
  return (
    <div className="flex items-start justify-between p-4 rounded-lg border border-border/50">
      <div className="flex space-x-4">
        <div className="bg-secondary rounded-lg p-3 w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-medium flex items-center gap-2">
            {title}
            {connected && <Check size={16} className="text-green-500" />}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button 
        variant={connected ? "outline" : "default"} 
        size="sm" 
        onClick={onToggle}
        className="ml-4"
      >
        {connected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
};

const IntegrationSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = useState({
    googleCalendar: true,
    microsoftTeams: false,
    zoom: true,
    slack: false,
    github: false,
    drive: true
  });
  
  const handleToggleIntegration = (key: string) => {
    setIntegrations(prev => {
      const newState = { ...prev, [key]: !prev[key as keyof typeof prev] };
      
      toast({
        title: `${key} ${newState[key as keyof typeof prev] ? "Connected" : "Disconnected"}`,
        description: `Successfully ${newState[key as keyof typeof prev] ? "connected to" : "disconnected from"} ${key}.`
      });
      
      return newState;
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendar Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <IntegrationCard
            title="Google Calendar"
            description="Sync your classes and events with Google Calendar"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-blue-500"><path fill="currentColor" d="M19.5 19h-15V8H19.5V19ZM8.7 17.2H10.975V13.384H8.7V17.2ZM19.5 3A1.5 1.5 0 0 1 21 4.5V19.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5V4.5A1.5 1.5 0 0 1 4.5 3h15ZM6 6.75A1.25 1.25 0 1 0 6 4.25A1.25 1.25 0 0 0 6 6.75Zm12 0A1.25 1.25 0 1 0 18 4.25A1.25 1.25 0 0 0 18 6.75Z"/></svg>}
            connected={integrations.googleCalendar}
            onToggle={() => handleToggleIntegration('googleCalendar')}
          />
          
          <IntegrationCard
            title="Microsoft Teams"
            description="Connect with Microsoft Teams for scheduling and meetings"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-indigo-500"><path fill="currentColor" d="M17.746 11c1.141 0 2.11-.394 2.911-1.194c.8-.8 1.194-1.77 1.194-2.91s-.394-2.11-1.194-2.911c-.8-.8-1.77-1.194-2.91-1.194s-2.11.394-2.911 1.194c-.8.8-1.194 1.77-1.194 2.91s.394 2.11 1.194 2.911c.8.8 1.77 1.194 2.91 1.194m-1.5 1l-1-1H6.415A2.417 2.417 0 0 0 4 13.415v6.17A2.417 2.417 0 0 0 6.415 22h11.17A2.417 2.417 0 0 0 20 19.585V14l-3.754-2Z"/></svg>}
            connected={integrations.microsoftTeams}
            onToggle={() => handleToggleIntegration('microsoftTeams')}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Video Conferencing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <IntegrationCard
            title="Zoom"
            description="Integrate with Zoom for virtual live classes"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-blue-600"><path fill="currentColor" d="M24 12c0 6.629-5.371 12-12 12S0 18.629 0 12S5.371 0 12 0s12 5.371 12 12Zm-13.928 2.16v-4.438l-3.673.017c-.66.004-1.195.541-1.195 1.201v3.356c0 .663.538 1.2 1.2 1.2h2.472c.663 0 1.196-.537 1.196-1.336Zm4.157 1.174h2.56c.663 0 1.2-.538 1.2-1.2V10.78c0-.662-.537-1.199-1.196-1.2l-3.672-.017V14.337c0 .55.445.997.993.997h.115Z"/></svg>}
            connected={integrations.zoom}
            onToggle={() => handleToggleIntegration('zoom')}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Collaboration Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <IntegrationCard
            title="Slack"
            description="Connect with Slack for team communication"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-emerald-600"><path fill="currentColor" d="M6 15a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2h2v2m1 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-5m2-8a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2v2H9m0 1a2 2 0 0 1 2 2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2a2 2 0 0 1 2-2h5m8 2a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-2v-2m-1 0a2 2 0 0 1-2 2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v6m-2 8a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-2h2m0-1a2 2 0 0 1-2-2a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-5Z"/></svg>}
            connected={integrations.slack}
            onToggle={() => handleToggleIntegration('slack')}
          />
          
          <IntegrationCard
            title="GitHub"
            description="Connect with GitHub for code assignments"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>}
            connected={integrations.github}
            onToggle={() => handleToggleIntegration('github')}
          />
          
          <IntegrationCard
            title="Google Drive"
            description="Integrate with Google Drive for document sharing"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m4.5 22l3.5-6h13V4H7v9l-2.5 9ZM7 1h10a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H9l-5 5V4a3 3 0 0 1 3-3Z"/></svg>}
            connected={integrations.drive}
            onToggle={() => handleToggleIntegration('drive')}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Third-Party API Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border/50 p-4">
            <h3 className="font-medium">Developer API Access</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Generate API keys to access the platform programmatically
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Manage API Keys
              </Button>
              <Button variant="outline" size="sm">View Documentation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
