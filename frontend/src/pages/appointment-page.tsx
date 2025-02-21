import { FormattedAppointment } from "features/appointments/appointment";
import { useAppointmentQuery } from "features/appointments/appointment-query-hook";
import { BaseCalendar } from "features/calendar/base-calendar";
import { useMemo } from "react";
import { getEndtime } from "shared/utils/time-utils";
import { useCalendarStore } from "store/calendar-store";

export const AppointmentsPage = () => {
  const { items: appointmentsData } = useAppointmentQuery();
  const resources = useCalendarStore((state) => state.resources) ?? [];
  const displayedResources = resources?.length > 0 ? resources : undefined;
  const formatedAppointments: FormattedAppointment[] = useMemo(
    () =>
      appointmentsData?.map((a) => ({
        ...a,
        start: new Date(a.startTime),
        end: getEndtime(a.startTime, a.duration),
      })) ?? [],
    [appointmentsData]
  );

  return <BaseCalendar events={formatedAppointments} resources={displayedResources} />;
};
