import { BaseToolbar } from "./base-toolbar";
import { AppointmentDrawer } from "features/appointments/appointment-drawer";
import { ClientDrawer } from "features/clients/client-drawer";
import { ServiceDrawer } from "features/services/service-drawer";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { AddSpeedDial } from "layout/add-speed-dial";
import { ReactNode } from "react";
interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <BaseToolbar />
      {children}
      <AppointmentDrawer />
      <ClientDrawer />
      <ServiceDrawer />
      <ExpertDrawer />
      <AddSpeedDial />
    </>
  );
};
