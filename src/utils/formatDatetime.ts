import dayjs from "dayjs";

export function formatDatetime(date: Date, format: string) {
  if (!date || !format.trim()) {
    return "";
  }

  return dayjs(date).format(format);
}
