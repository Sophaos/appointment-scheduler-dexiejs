import { createSlice } from "@reduxjs/toolkit";
import { Appointment, DEFAULT_APPOINTMENT } from "./appointment";

interface AppointmentState {
  appointmentData: Appointment;
}
const initialState: AppointmentState = {
  appointmentData: DEFAULT_APPOINTMENT,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointmentData(state, action) {
      state.appointmentData = action.payload;
    },
  },
  selectors: {
    selectAppointmentData: (state) => state.appointmentData,
  },
});

export const { setAppointmentData } = appointmentSlice.actions;
export const { selectAppointmentData } = appointmentSlice.selectors;
