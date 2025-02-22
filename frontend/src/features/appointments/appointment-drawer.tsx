import { BaseDrawer } from "shared/ui/base-drawer";
import { AppointmentForm } from "./appointment-form";
import { Appointment, DEFAULT_APPOINTMENT, FormattedAppointment } from "./appointment";
import { useAppointmentQuery } from "./appointment-query-hook";
import { useAppointmentStore } from "./appointment-store";
import { useExpertQuery } from "features/experts/expert-query-hook";
import { useExpertStore } from "features/experts/expert-store";
import { useMemo } from "react";

export const AppointmentDrawer = () => {
  const isAppointmentDrawerVisible = useAppointmentStore((state) => state.isAppointmentDrawerVisible);
  const toggleAppointmentDrawerVisibility = useAppointmentStore((state) => state.toggleAppointmentDrawerVisibility);
  const setId = useAppointmentStore((state) => state.setId);
  const start = useAppointmentStore((state) => state.start);
  const duration = useAppointmentStore((state) => state.duration);
  const setResourceId = useExpertStore((state) => state.setResourceId);

  const { item: expert, resource } = useExpertQuery();
  const { item: data, update, create, remove } = useAppointmentQuery();

  const formattedData: FormattedAppointment = useMemo(
    () =>
      data
        ? {
            ...data,
            start: new Date(start),
            duration,
            expert: resource ?? data?.expert,
          }
        : {
            ...DEFAULT_APPOINTMENT,
            start: new Date(DEFAULT_APPOINTMENT.startTime),
            duration,
            expert: resource,
          },
    [data, duration, resource, start]
  );

  console.log(formattedData, expert);

  const handleHide = () => {
    toggleAppointmentDrawerVisibility();
    setId(0);
    setResourceId(0);
  };

  const handleUpdate = async (item: Appointment) => {
    try {
      await update(item);
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Appointment) => {
    try {
      await create(item);
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await remove(data!.id);
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = (formData: FormattedAppointment) => {
    const item: Appointment = { ...data, ...formData, startTime: formData.start.toISOString() };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isAppointmentDrawerVisible} title="Appointment" onHide={handleHide}>
      <AppointmentForm onCancel={handleHide} onConfirm={handleConfirm} data={formattedData} isProcessing={false} isEnabled={true} onDelete={handleDelete} />
    </BaseDrawer>
  );
};
