import { createContext } from "react";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  readonly message: string;
  readonly type: NotificationType;
}

export interface NotificationContextProps {
  readonly pushNotification: (message: string, type: NotificationType) => void;
  readonly removeNotification: () => void;
  readonly notification: Notification | null;
  readonly notificationDefaultUptime: number;
}

const NotificationContext = createContext<NotificationContextProps | null>(
  null,
);

export default NotificationContext;
