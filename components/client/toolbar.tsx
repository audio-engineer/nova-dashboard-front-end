"use client";

import type { ReactElement } from "react";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { PageContainerToolbar } from "@toolpad/core/PageContainer";
import { useDateRange } from "@/hooks/use-date-range";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useLocalStorage } from "usehooks-ts";
import Stack from "@mui/material/Stack";

const Toolbar = (): ReactElement => {
  const { dateRange, setDateRange } = useDateRange();
  const [localStorageDateFrom, setLocalStorageDateFrom] = useLocalStorage<
    string | null
  >("nova-dashboard-date-from", null);
  const [localStorageDateTo, setLocalStorageDateTo] = useLocalStorage<
    string | null
  >("nova-dashboard-date-to", null);

  const handleFromDateChange = (newValue: Readonly<Dayjs> | null): void => {
    setDateRange({ ...dateRange, from: newValue });

    setLocalStorageDateFrom(newValue?.format("YYYY-MM-DD") ?? null);
  };

  const handleToDateChange = (newValue: Readonly<Dayjs> | null): void => {
    setDateRange({ ...dateRange, to: newValue });

    setLocalStorageDateTo(newValue?.format("YYYY-MM-DD") ?? null);
  };

  useEffect(() => {
    let initialFromDate = null;
    let initialToDate = null;

    if (null !== localStorageDateFrom) {
      initialFromDate = dayjs(localStorageDateFrom);
    }

    if (null !== localStorageDateTo) {
      initialToDate = dayjs(localStorageDateTo);
    }

    setDateRange({ from: initialFromDate, to: initialToDate });
  }, [localStorageDateFrom, localStorageDateTo, setDateRange]);

  return (
    <PageContainerToolbar>
      <Stack flexDirection="row" alignItems="center">
        <DatePicker
          label="From"
          value={dateRange.from}
          onAccept={handleFromDateChange}
        />
        <DatePicker
          label="To"
          value={dateRange.to}
          onAccept={handleToDateChange}
        />
      </Stack>
    </PageContainerToolbar>
  );
};

export default Toolbar;
