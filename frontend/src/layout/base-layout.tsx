import { BaseToolbar } from "./base-toolbar";
import { useModal } from "hooks/drawer-hook";
import { AppointmentDrawer } from "features/appointments/appointment-drawer";
import { ClientDrawer } from "features/clients/client-drawer";
import { ServiceDrawer } from "features/services/service-drawer";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { AddSpeedDial } from "layout/add-speed-dial";
import { useDrawerStore } from "store/drawer-store";
import { useShallow } from "zustand/shallow";

export const BaseLayout = ({ children }) => {
  const {
    isClientDrawerVisible,
    isAppointmentDrawerVisible,
    isExpertDrawerVisible,
    isServiceDrawerVisible,
    toggleAppointmentDrawerVisibility,
    toggleClientDrawerVisibility,
    toggleServiceDrawerVisibility,
    toggleExpertDrawerVisibility,
  } = useDrawerStore(
    useShallow((state) => ({
      isClientDrawerVisible: state.isClientDrawerVisible,
      isAppointmentDrawerVisible: state.isAppointmentDrawerVisible,
      isExpertDrawerVisible: state.isExpertDrawerVisible,
      isServiceDrawerVisible: state.isServiceDrawerVisible,
      toggleAppointmentDrawerVisibility: state.toggleAppointmentDrawerVisibility,
      toggleClientDrawerVisibility: state.toggleClientDrawerVisibility,
      toggleServiceDrawerVisibility: state.toggleServiceDrawerVisibility,
      toggleExpertDrawerVisibility: state.toggleExpertDrawerVisibility,
    }))
  );
  return (
    <>
      <BaseToolbar />
      {children}
      <AppointmentDrawer isOpen={isAppointmentDrawerVisible} handleHide={toggleAppointmentDrawerVisibility} />
      <ClientDrawer isOpen={isClientDrawerVisible} handleHide={toggleClientDrawerVisibility} />
      <ServiceDrawer isOpen={isServiceDrawerVisible} handleHide={toggleServiceDrawerVisibility} />
      <ExpertDrawer isOpen={isExpertDrawerVisible} handleHide={toggleExpertDrawerVisibility} />
      <AddSpeedDial />
    </>
  );
};
