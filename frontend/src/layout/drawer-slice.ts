import { createSlice } from "@reduxjs/toolkit";

interface DrawerState {
  isClientDrawerVisible: boolean;
  isAppointmentDrawerVisible: boolean;
  isExpertDrawerVisible: boolean;
  isServiceDrawerVisible: boolean;
}
const initialState: DrawerState = {
  isClientDrawerVisible: false,
  isAppointmentDrawerVisible: false,
  isExpertDrawerVisible: false,
  isServiceDrawerVisible: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setClientDrawerVisibility(state, action) {
      state.isClientDrawerVisible = action.payload;
    },
    setAppointmentDrawerVisibility(state, action) {
      state.isAppointmentDrawerVisible = action.payload;
    },
    setExpertDrawerVisibility(state, action) {
      state.isExpertDrawerVisible = action.payload;
    },
    setServiceDrawerVisibility(state, action) {
      state.isServiceDrawerVisible = action.payload;
    },
  },
  selectors: {
    selectIsClientDrawerVisible: (state) => state.isClientDrawerVisible,
    selectIsAppointmentDrawerVisible: (state) => state.isAppointmentDrawerVisible,
    selectIsExpertDrawerVisible: (state) => state.isExpertDrawerVisible,
    selectIsServiceDrawerVisible: (state) => state.isServiceDrawerVisible,
  },
});

export const { setClientDrawerVisibility, setAppointmentDrawerVisibility, setExpertDrawerVisibility, setServiceDrawerVisibility } = drawerSlice.actions;
export const { selectIsClientDrawerVisible, selectIsAppointmentDrawerVisible, selectIsExpertDrawerVisible, selectIsServiceDrawerVisible } = drawerSlice.selectors;
