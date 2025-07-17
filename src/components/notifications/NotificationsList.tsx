
import React from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NotificationItem } from "./NotificationItem";
import { type Notification } from "@/hooks/useNotifications";

interface NotificationsListProps {
  notifications: Notification[];
  showUnreadOnly?: boolean;
  onNotificationClick: (id: string) => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  showUnreadOnly = false,
  onNotificationClick
}) => {
  const filteredNotifications = showUnreadOnly 
    ? notifications.filter(n => !n.read) 
    : notifications;
  
  const isEmpty = filteredNotifications.length === 0;

  return (
    <Card className="border-border/50">
      <CardContent className="p-0">
        {!isEmpty ? (
          <div className="divide-y divide-border/50">
            {filteredNotifications.map((notification) => (
              <NotificationItem 
                key={notification.id}
                notification={notification}
                onClick={onNotificationClick}
              />
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
              {showUnreadOnly ? (
                <CheckCircle2 className="h-12 w-12 text-muted-foreground/60" />
              ) : (
                <Bell className="h-12 w-12 text-muted-foreground/60" />
              )}
            </div>
            <h3 className="font-medium mb-1">
              {showUnreadOnly ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {showUnreadOnly 
                ? "You've read all your notifications." 
                : "You're all caught up! There are no notifications to display."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
