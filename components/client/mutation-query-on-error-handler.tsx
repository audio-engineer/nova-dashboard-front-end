"use client";

import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import { useNotifications } from "@toolpad/core/useNotifications";

interface QueryErrorHandlerProps {
  readonly error: unknown;
  readonly setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

interface SpringRestErrorResponse {
  readonly message: string;
}

const MutationQueryOnErrorHandler = ({
  error,
  setIsLoading,
}: QueryErrorHandlerProps): null => {
  const notifications = useNotifications();

  if (axios.isAxiosError<SpringRestErrorResponse>(error)) {
    if (undefined === error.response?.data.message) {
      notifications.show("The server message could not be displayed.", {
        severity: "error",
        autoHideDuration: 3000,
      });

      if (setIsLoading) {
        setIsLoading(false);
      }

      return null;
    }

    notifications.show(error.response.data.message, {
      severity: "error",
      autoHideDuration: 3000,
    });

    if (setIsLoading) {
      setIsLoading(false);
    }

    return null;
  }

  if (error instanceof Error) {
    if (setIsLoading) {
      setIsLoading(false);
    }

    notifications.show(error.message, {
      severity: "error",
      autoHideDuration: 3000,
    });
  }

  return null;
};

export default MutationQueryOnErrorHandler;
