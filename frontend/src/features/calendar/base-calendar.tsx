/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, View, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useMemo } from "react";
import { BaseEvent } from "./base-event";
import { MonthEvent } from "./month-event";
import { AgendaEvent } from "./agenda-event";
import { ResourceHeader } from "./resource-header";
import { CalendarToolbar } from "./calendar-toolbar";
import { FormattedAppointment } from "features/appointments/appointment";
import { Expert } from "features/experts/expert";
import { useSearchParams } from "react-router-dom";
import { useCalendarGetter } from "./calendar-getter-hook";
import { useCalendarFormats } from "./calendar-formats-hook";
import { useCalendarEvent } from "./calendar-event-hook";

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export interface BaseCalendarProps {
  events: FormattedAppointment[];
  resources?: Expert[];
}

export const BaseCalendar = ({ events, resources }: BaseCalendarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formats } = useCalendarFormats();
  const { handleNavigate, handleSelectEvent, handleSelectSlot, handleEventDrop, handleEventResize } = useCalendarEvent(setSearchParams);
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
