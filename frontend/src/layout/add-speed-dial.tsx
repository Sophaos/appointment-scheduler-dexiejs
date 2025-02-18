import { useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";
import { useDrawerStore } from "store/drawer-store";
import { useShallow } from "zustand/shallow";

export const AddSpeedDial = () => {
  const { setClientDrawerVisibility, setAppointmentDrawerVisibility, setExpertDrawerVisibility, setServiceDrawerVisibility } = useDrawerStore(
    useShallow((state) => ({
      setClientDrawerVisibility: state.setClientDrawerVisibility,
      setAppointmentDrawerVisibility: state.setAppointmentDrawerVisibility,
      setExpertDrawerVisibility: state.setExpertDrawerVisibility,
      setServiceDrawerVisibility: state.setServiceDrawerVisibility,
    }))
  );

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
    <div className="fixed bottom-5 right-5">
      <Toast ref={toast} />
      <Tooltip target=".speeddial-bottom-right .p-speeddial-action" position="left" />
      <SpeedDial model={items} direction="up" className="speeddial-bottom-right right-5 bottom-5" buttonClassName="p-button-danger" />
    </div>
  );
};
