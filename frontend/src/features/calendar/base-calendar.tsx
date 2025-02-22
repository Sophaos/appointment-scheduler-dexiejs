/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, NavigateAction, SlotInfo, View, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useMemo } from "react";
import { BaseEvent } from "./base-event";
import { MonthEvent } from "./month-event";
import { AgendaEvent } from "./agenda-event";
import { ResourceHeader } from "./resource-header";
import { CalendarToolbar } from "./calendar-toolbar";
import { FormattedAppointment } from "features/appointments/appointment";
import { Expert } from "features/experts/expert";
import { getFormattedDate, getMinutesDifferences } from "shared/utils/time-utils";
import { useSearchParams } from "react-router-dom";
import { useCalendarGetter } from "./calendar-getter-hook";
import { useCalendarFormats } from "./calendar-formats-hook";
import { useAppointmentStore } from "features/appointments/appointment-store";
import { useExpertStore } from "features/experts/expert-store";

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const OUT_OF_BOUND_DURATION = 1440;

export interface BaseCalendarProps {
  events: FormattedAppointment[];
  resources?: Expert[];
}

export const BaseCalendar = ({ events, resources }: BaseCalendarProps) => {
  const setId = useAppointmentStore((state) => state.setId);
  const toggleAppointmentDrawerVisibility = useAppointmentStore((state) => state.toggleAppointmentDrawerVisibility);
  const setAppointmentTime = useAppointmentStore((state) => state.setAppointmentTime);
  const setResourceId = useExpertStore((state) => state.setResourceId);

  const [searchParams, setSearchParams] = useSearchParams();
  const { formats } = useCalendarFormats();
  const { dayPropGetter, slotPropGetter, eventPropGetter, slotGroupPropGetter } = useCalendarGetter();

  const view = (searchParams.get("view") || "day") as View;

  const components = useMemo(
    () => ({
      resourceHeader: ResourceHeader,
      toolbar: CalendarToolbar,
      agenda: {
        event: AgendaEvent,
      },
      day: {
        event: BaseEvent,
      },
      week: {
        event: BaseEvent,
      },
      month: {
        event: MonthEvent,
      },
    }),
    []
  );

  const handleNavigate = useCallback(
    (newDate: Date, view: View, action: NavigateAction) => {
      if (action === "DATE") {
        setSearchParams({ view: "day", date: getFormattedDate(newDate) });
      } else {
        setSearchParams({ view, date: getFormattedDate(newDate) });
      }
    },
    [setSearchParams]
  );

  const handleEventResize = useCallback(
    (event: any) => {
      setId(event.event.id);
      toggleAppointmentDrawerVisibility();
      setAppointmentTime(event.start, event.end);
    },
    [setAppointmentTime, setId, toggleAppointmentDrawerVisibility]
  );

  const handleEventDrop = useCallback(
    (e: any) => {
      const { start, end, event, resourceId } = e;
      setId(event.id);
      toggleAppointmentDrawerVisibility();
      setAppointmentTime(start, end);
      setResourceId(resourceId);
    },
    [setAppointmentTime, setId, setResourceId, toggleAppointmentDrawerVisibility]
  );

  const handleSelectSlot = useCallback(
    (event: SlotInfo) => {
      const { start, end, resourceId } = event;
      setResourceId(Number(resourceId));
      toggleAppointmentDrawerVisibility();
      const duration = getMinutesDifferences(start, end);
      if (duration === OUT_OF_BOUND_DURATION) {
        start.setHours(10);
        setAppointmentTime(start, end);
      } else {
        setAppointmentTime(start, end);
      }
    },
    [setAppointmentTime, setResourceId, toggleAppointmentDrawerVisibility]
  );

  const handleSelectEvent = useCallback(
    (event: any) => {
      setId(event.id);
      setAppointmentTime(event.start, event.end);
      toggleAppointmentDrawerVisibility();
    },
    [setAppointmentTime, setId, toggleAppointmentDrawerVisibility]
  );

  const min = useMemo(() => new Date(1972, 0, 1, 9, 0, 0, 0), []);
  const max = useMemo(() => new Date(1972, 0, 1, 20, 0, 0, 0), []);

  return (
    <div className="myCustomHeight">
      <DnDCalendar
        defaultView={view}
        formats={formats}
        components={components}
        dayLayoutAlgorithm="no-overlap"
        step={15}
        timeslots={1}
        selectable
        length={1}
        draggableAccessor={() => true}
        localizer={localizer}
        min={min}
        max={max}
        events={events}
        popup
        dayPropGetter={dayPropGetter}
        slotPropGetter={slotPropGetter}
        eventPropGetter={eventPropGetter}
        slotGroupPropGetter={slotGroupPropGetter}
        resourceAccessor={(e: any) => e?.expert?.id}
        resources={resources}
        resourceIdAccessor={(e: any) => e?.id}
        resourceTitleAccessor={(e: any) => e?.nickname}
        onNavigate={handleNavigate}
        views={["day", "agenda", "week", "month"]}
        style={{ height: "93vh" }}
        onSelectSlot={handleSelectSlot}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};
