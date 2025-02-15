import { configureStore } from "@reduxjs/toolkit";
import { appointmentSlice } from "features/appointments/appointment-slice";
import { calendarSlice } from "features/calendar/calendar-slice";
import { drawerSlice } from "layout/drawer-slice";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    drawer: drawerSlice.reducer,
    appointment: appointmentSlice.reducer,
  },
});
