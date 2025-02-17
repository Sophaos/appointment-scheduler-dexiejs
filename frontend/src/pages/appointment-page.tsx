import { FormattedAppointment } from "features/appointments/appointment";
import { AppointmentDrawer } from "features/appointments/appointment-drawer";
import { useAppointmentQuery } from "features/appointments/appointment-query-hook";
import { BaseCalendar } from "features/calendar/base-calendar";
import { CalendarSpeedDial } from "features/calendar/calendar-speed-dial";
import { ClientDrawer } from "features/clients/client-drawer";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { ServiceDrawer } from "features/services/service-drawer";
import { useModal } from "hooks/drawer-hook";
import { useRouter } from "hooks/router-hook";
import { useMemo } from "react";
import { getEndtime } from "shared/utils/time-utils";

export const AppointmentsPage = () => {
  const { view, date } = useRouter();
  const { data: appointmentsData } = useAppointmentQuery({ view, date });
  const { open: openClientDrawer, toggleModal: toggleClientModal } = useModal();
  const { open: openServiceDrawer, toggleModal: toggleServiceModal } = useModal();
  const { open: openExpertDrawer, toggleModal: toggleExpertModal } = useModal();
  const { open: openAppointmentDrawer, toggleModal: toggleAppointmentModal } = useModal();

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
      <AppointmentDrawer isOpen={openAppointmentDrawer} handleHide={toggleAppointmentModal} />
      <ClientDrawer isOpen={openClientDrawer} handleHide={toggleClientModal} />
      <ServiceDrawer isOpen={openServiceDrawer} handleHide={toggleServiceModal} />
      <ExpertDrawer isOpen={openExpertDrawer} handleHide={toggleExpertModal} />
      <CalendarSpeedDial />
    </>
  );
};
