import type { Dayjs } from "dayjs";
import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export interface DateRange {
  readonly from: Readonly<Dayjs> | null;
  readonly to: Readonly<Dayjs> | null;
}

export interface FormattedDateRange {
  readonly from: string | null;
  readonly to: string | null;
}

export interface DateRangeContextProps {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
  formattedDateRange: FormattedDateRange;
}

const DateRangeContext = createContext<DateRangeContextProps | null>(null);

export default DateRangeContext;
