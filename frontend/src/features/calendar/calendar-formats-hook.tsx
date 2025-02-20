/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { Culture, DateLocalizer } from "react-big-calendar";

export const useCalendarFormats = () => {
  const formats: any = useMemo(
    () => ({
      dayHeaderFormat: (date: Date, culture: Culture, localizer: DateLocalizer): string => localizer.format(date, "dddd D MMM, YYYY", culture),
      timeGutterFormat: (date: Date, culture: Culture, localizer: DateLocalizer): string => localizer.format(date, "HH:mm", culture),
      eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }, culture: Culture, localizer: DateLocalizer): string =>
        `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(end, "HH:mm", culture)}`,
      agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }, culture: Culture, localizer: DateLocalizer): string =>
        `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(end, "HH:mm", culture)}`,
    }),
    []
  );

  return {
    formats,
  };
};
