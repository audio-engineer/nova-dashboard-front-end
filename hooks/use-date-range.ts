import { useContext } from "react";
import type { DateRangeContextProps } from "@/contexts/date-range";
import DateRangeContext from "@/contexts/date-range";

export const useDateRange = (): DateRangeContextProps => {
  const context = useContext(DateRangeContext);

  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }

  return context;
};
