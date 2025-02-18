import { FormattedAppointment } from "features/appointments/appointment";
import { useAppointmentQuery } from "features/appointments/appointment-query-hook";
import { BaseCalendar } from "features/calendar/base-calendar";
import { AddSpeedDial } from "layout/add-speed-dial";
import { useRouter } from "hooks/router-hook";
import { useMemo } from "react";
import { getEndtime } from "shared/utils/time-utils";

export const AppointmentsPage = () => {
  const { view, date } = useRouter();
  const { data: appointmentsData } = useAppointmentQuery({ view, date });

  // const displayedResources = useSelector(selectDisplayedResources);

  const formatedAppointments: FormattedAppointment[] = useMemo(
    () =>
      appointmentsData?.map((a) => ({
        ...a,
        start: new Date(a.startTime),
        end: getEndtime(a.startTime, a.duration),
      })) ?? [],
    [appointmentsData]
  );

  return (
    <>
      <BaseCalendar data={appointmentsData ?? []} events={formatedAppointments} resources={undefined} />
      <AddSpeedDial />
    </>
  );
};
