import { useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";
import { useClientStore } from "features/clients/client-store";
import { useAppointmentStore } from "features/appointments/appointment-store";
import { useExpertStore } from "features/experts/expert-store";
import { useServiceStore } from "features/services/service-store";

export const AddSpeedDial = () => {
  const setClientDrawerVisibility = useClientStore((state) => state.setClientDrawerVisibility);
  const setAppointmentDrawerVisibility = useAppointmentStore((state) => state.setAppointmentDrawerVisibility);
  const setExpertDrawerVisibility = useExpertStore((state) => state.setExpertDrawerVisibility);
  const setServiceDrawerVisibility = useServiceStore((state) => state.setServiceDrawerVisibility);

  const toast = useRef<Toast>(null);
  const items: MenuItem[] = [
    {
      label: "Add Appointment",
      icon: "pi pi-calendar-plus",
      command: () => {
        setAppointmentDrawerVisibility(true);
      },
    },
    {
      label: "Add Client",
      icon: "pi pi-users",
      command: () => {
        setClientDrawerVisibility(true);
      },
    },
    {
      label: "Add Service",
      icon: "pi pi-sparkles",
      command: () => {
        setServiceDrawerVisibility(true);
      },
    },
    {
      label: "Add Expert",
      icon: "pi pi-briefcase",
      command: () => {
        setExpertDrawerVisibility(true);
      },
    },
  ];

  return (
    <div className="fixed bottom-1 right-3">
      <Toast ref={toast} />
      <Tooltip target=".speeddial-bottom-right .p-speeddial-action" position="left" />
      <SpeedDial model={items} direction="up" className="speeddial-bottom-right right-5 bottom-5" buttonClassName="p-button-danger" />
    </div>
  );
};
