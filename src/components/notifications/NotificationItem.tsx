
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Bell, MessageSquare, FileText, Users, Calendar, CheckCircle2 } from "lucide-react";
import { type Notification, type NotificationType } from "@/hooks/useNotifications";

interface NotificationItemProps {
  notification: Notification;
  onClick: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick
}) => {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "assignment":
        return <FileText className="h-5 w-5 text-amber-500" />;
      case "announcement":
        return <Bell className="h-5 w-5 text-purple-500" />;
      case "classroom":
        return <Users className="h-5 w-5 text-green-500" />;
      case "schedule":
        return <Calendar className="h-5 w-5 text-red-500" />;
      case "system":
        return <CheckCircle2 className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div 
      className={`p-4 flex gap-3 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-muted/20' : ''}`}
      onClick={() => onClick(notification.id)}
    >
      <div className="mt-1">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
            {notification.title}
          </h3>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {notification.description}
        </p>
        {notification.actionUrl && (
          <a 
            href={notification.actionUrl}
            className="text-sm text-primary hover:underline mt-2 inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            View details
          </a>
        )}
      </div>
      {!notification.read && (
        <div className="flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-primary mt-2" />
        </div>
      )}
    </div>
  );
};

