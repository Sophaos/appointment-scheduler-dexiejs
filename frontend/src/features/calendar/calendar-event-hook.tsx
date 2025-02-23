/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppointmentStore } from "features/appointments/appointment-store";
import { useExpertStore } from "features/experts/expert-store";
import { useCallback } from "react";
import { NavigateAction, SlotInfo, View } from "react-big-calendar";
import { SetURLSearchParams } from "react-router-dom";
import { getFormattedDate, getMinutesDifferences } from "shared/utils/time-utils";

const OUT_OF_BOUND_DURATION = 1440;

export const useCalendarEvent = (setSearchParams: SetURLSearchParams) => {
  const setId = useAppointmentStore((state) => state.setId);
  const toggleAppointmentDrawerVisibility = useAppointmentStore((state) => state.toggleAppointmentDrawerVisibility);
  const setAppointmentTime = useAppointmentStore((state) => state.setAppointmentTime);
  const setResourceId = useExpertStore((state) => state.setResourceId);

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

  return {
    handleNavigate,
    handleSelectEvent,
    handleSelectSlot,
    handleEventDrop,
    handleEventResize,
  };
};
