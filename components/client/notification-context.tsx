"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { FC, PropsWithChildren } from "react";
import AppNotification from "@/components/client/app-notification";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  readonly message: string;
  readonly type: NotificationType;
}

interface NotificationContextType {
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: () => void;
  notification: Notification | null;
  notificationDefaultUptime: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider: FC<Readonly<PropsWithChildren>> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const notificationDefaultUptime = 6000;

  const removeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const addNotification = useCallback(
    (message: string, type: NotificationType) => {
      setNotification({ message, type });
      setTimeout(() => {
        removeNotification();
      }, notificationDefaultUptime);
    },
    [removeNotification],
  );

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        removeNotification,
        notification,
        notificationDefaultUptime,
      }}
    >
      {children}
      <AppNotification />
    </NotificationContext.Provider>
  );
};
