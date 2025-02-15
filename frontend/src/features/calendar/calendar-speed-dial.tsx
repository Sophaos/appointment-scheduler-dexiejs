import React, { useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";

export const CalendarSpeedDial = () => {
  const toast = useRef<Toast>(null);
  const items: MenuItem[] = [
    {
      label: "Add",
      icon: "pi pi-pencil",
      command: () => {
        // toast.current.show({ severity: "info", summary: "Add", detail: "Data Added" });
      },
    },
    {
      label: "Update",
      icon: "pi pi-refresh",
      command: () => {
        // toast.current.show({ severity: "success", summary: "Update", detail: "Data Updated" });
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        // toast.current.show({ severity: "error", summary: "Delete", detail: "Data Deleted" });
      },
    },
    {
      label: "Upload",
      icon: "pi pi-upload",
      command: () => {
        // router.push("/fileupload");
      },
    },
    {
      label: "React Website",
      icon: "pi pi-external-link",
      command: () => {
        // window.location.href = "https://react.dev/";
      },
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <Toast ref={toast} />
      <Tooltip target=".speeddial-bottom-right .p-speeddial-action" position="left" />
      <SpeedDial model={items} direction="up" className="speeddial-bottom-right right-5 bottom-5" buttonClassName="p-button-danger" />
    </div>
  );
};
