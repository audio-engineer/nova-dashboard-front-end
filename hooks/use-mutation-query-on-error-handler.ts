import type { Dispatch, SetStateAction } from "react";
import { useNotifications } from "@toolpad/core/useNotifications";
import axios from "axios";

interface SpringRestErrorResponse {
  readonly message: string;
}

export const useMutationQueryOnErrorHandler = (): {
  onErrorHandler: (
    error: unknown,
    setIsLoading?: Dispatch<SetStateAction<boolean>>,
  ) => void;
} => {
  const notifications = useNotifications();

  const onErrorHandler = (
    error: unknown,
    setIsLoading?: Dispatch<SetStateAction<boolean>>,
  ): void => {
    let errorMessage = "The server message could not be displayed.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (
      axios.isAxiosError<SpringRestErrorResponse>(error) &&
      undefined !== error.response?.data.message
    ) {
      errorMessage = error.response.data.message;
    }

    notifications.show(errorMessage, {
      severity: "error",
      autoHideDuration: 3000,
    });

    setIsLoading?.(false);
  };

  return {
    onErrorHandler,
  };
};
