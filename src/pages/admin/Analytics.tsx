
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

const AdminAnalytics = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">View and analyze platform metrics</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>View platform performance and user statistics</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart2 size={64} className="text-muted-foreground" />
          <h3 className="text-lg font-medium mt-4">Analytics Dashboard Coming Soon</h3>
          <p className="text-muted-foreground max-w-md text-center mt-2">
            This section is under development. Soon you'll be able to view detailed analytics and reports for your educational platform.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
