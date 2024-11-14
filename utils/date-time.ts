import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/da";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("da-dk");

export const getLocalizedTime = (time: string): string => {
  return dayjs(time, "HH:mm:ss").utc(true).tz("Europe/Copenhagen").format("LT");
};

export const getLocalizedDate = (date: string): string => {
  return dayjs(date, "YYYY-MM-DD").format("L");
};
