
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { NotificationsList } from "@/components/notifications/NotificationsList";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationsPage = () => {
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button 
          variant="outline" 
          onClick={markAllAsRead} 
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            {notifications.length > 0 && (
              <span className="ml-2 bg-muted rounded-full px-2 py-0.5 text-xs">
                {notifications.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <NotificationsList 
            notifications={notifications} 
            onNotificationClick={markAsRead} 
          />
        </TabsContent>

        <TabsContent value="unread">
          <NotificationsList 
            notifications={notifications}
            showUnreadOnly={true}
            onNotificationClick={markAsRead}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;

