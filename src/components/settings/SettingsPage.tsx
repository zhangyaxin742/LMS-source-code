
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Globe, Shield, Palette } from "lucide-react";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import AppearanceSettings from "./AppearanceSettings";
import PrivacySettings from "./PrivacySettings";
import IntegrationSettings from "./IntegrationSettings";

const SettingsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Settings</h1>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User size={16} />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette size={16} />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield size={16} />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Globe size={16} />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>
        
        <TabsContent value="privacy">
          <PrivacySettings />
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SettingsPage;
