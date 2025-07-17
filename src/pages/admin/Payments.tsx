
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const AdminPayments = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
        <p className="text-muted-foreground">Manage payments, revenue, and financial reports</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>View and manage payment transactions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <DollarSign size={64} className="text-muted-foreground" />
          <h3 className="text-lg font-medium mt-4">Payment Management Coming Soon</h3>
          <p className="text-muted-foreground max-w-md text-center mt-2">
            This section is under development. Soon you'll be able to manage payments, track revenue, and generate financial reports.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
