
import { useState } from "react";
import { toast } from "sonner";

export type NotificationType = "message" | "assignment" | "announcement" | "classroom" | "schedule" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "New message from Emily Johnson",
      description: "Hello! I had a question about the assignment due next week...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      actionUrl: "/classroom-feed/1"
    },
    {
      id: "2",
      type: "assignment",
      title: "Assignment deadline approaching",
      description: "UI Principles project is due in 2 days",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: false,
      actionUrl: "/assignments/2"
    },
    {
      id: "3",
      type: "announcement",
      title: "Important course update",
      description: "The schedule for next week's design workshop has been updated",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      actionUrl: "/classroom-management/1"
    },
    {
      id: "4",
      type: "classroom",
      title: "New student joined your class",
      description: "Michael Chen has joined UI Design Fundamentals",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      actionUrl: "/classroom-management/1?tab=students"
    },
    {
      id: "5",
      type: "schedule",
      title: "Upcoming live class",
      description: "You have a Design Critique session scheduled in 2 hours",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
      actionUrl: "/live-classes"
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead
  };
};

