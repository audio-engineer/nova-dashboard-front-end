"use client";

import type { FC, ReactElement } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNotification } from "@/components/client/notification-context";

const AppNotification: FC = (): ReactElement | null => {
  const { notification, notificationDefaultUptime } = useNotification();

  if (!notification) {
    return null;
  }

  return (
    <>
      <Snackbar
        open
        autoHideDuration={notificationDefaultUptime}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={notification.type}>{notification.message}</Alert>
      </Snackbar>
    </>
  );
};

export default AppNotification;
