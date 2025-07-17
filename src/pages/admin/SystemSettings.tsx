
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Settings } from "lucide-react";

const AdminSystemSettings = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and preferences</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Manage platform configuration and customization</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Settings size={64} className="text-muted-foreground" />
          <h3 className="text-lg font-medium mt-4">System Settings Coming Soon</h3>
          <p className="text-muted-foreground max-w-md text-center mt-2">
            This section is under development. Soon you'll be able to configure platform settings, manage roles and permissions, and customize the user experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemSettings;
