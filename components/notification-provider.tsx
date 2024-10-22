"use client";

import { createContext, PropsWithChildren, ReactElement, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navigation from "@/components/server/navigation";


type NotificationType = "success" | "error" | "info";

interface Notification {
  message: string;
  type: NotificationType;
}

const DefaultNotification: Notification = {
  message: "Default notification",
  type: "info",
};




const NotificationContext = createContext(DefaultNotification);

export const useNotification = () => {
  return useContext(NotificationContext);
};


const NotificationProvider = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement | null => {

  return ();
};

export default NotificationProvider;
