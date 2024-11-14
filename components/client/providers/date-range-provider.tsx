import type { PropsWithChildren, ReactElement } from "react";
import { useMemo, useState } from "react";
import type { DateRange } from "@/contexts/date-range";
import DateRangeContext from "@/contexts/date-range";

export const DateRangeProvider = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });

  const formattedDateRange = useMemo(() => {
    const { from, to } = dateRange;

    if (!from || !to) {
      return {
        from: null,
        to: null,
      };
    }

    return {
      from: from.format("YYYY-MM-DD"),
      to: to.format("YYYY-MM-DD"),
    };
  }, [dateRange]);

  return (
    <DateRangeContext.Provider
      value={{ dateRange, setDateRange, formattedDateRange }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};
