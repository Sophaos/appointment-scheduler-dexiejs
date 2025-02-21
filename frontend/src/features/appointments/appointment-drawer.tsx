import { BaseDrawer } from "shared/ui/base-drawer";
import { AppointmentForm } from "./appointment-form";
import { Appointment, DEFAULT_APPOINTMENT, FormattedAppointment } from "./appointment";
import { useAppointmentQuery } from "./appointment-query-hook";
import { useAppointmentStore } from "./appointment-store";

export const AppointmentDrawer = () => {
  const isAppointmentDrawerVisible = useAppointmentStore((state) => state.isAppointmentDrawerVisible);
  const handleHide = useAppointmentStore((state) => state.toggleAppointmentDrawerVisibility);
  const setId = useAppointmentStore((state) => state.setId);
  const { item: data } = useAppointmentQuery();
  // const isMoving = useAppointmentStore((state) => state.isMoving);

  // const handleHide = () => {
  //   dispatch(setAppointmentDrawerVisibility(false));
  //   dispatch(setIsMoving(false));
  //   dispatch(setAppointmentData(DEFAULT_APPOINTMENT));
  // };

  const { update, create, remove } = useAppointmentQuery();

  const formattedData: FormattedAppointment = data ? { ...data, start: new Date(data.startTime) } : { ...DEFAULT_APPOINTMENT, start: new Date(DEFAULT_APPOINTMENT.startTime) };

  const handleUpdate = async (item: Appointment) => {
    try {
      await update(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Appointment) => {
    try {
      await create(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await remove(data!.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = (formData: FormattedAppointment) => {
    const item: Appointment = { ...data, ...formData, startTime: formData.start.toISOString() };
    item?.id ? handleUpdate(item) : handleAdd(item);
    setId(0);
  };

  return (
    <BaseDrawer isOpen={isAppointmentDrawerVisible} title="Appointment" onHide={handleHide}>
      <AppointmentForm onCancel={handleHide} onConfirm={handleConfirm} data={formattedData} isProcessing={false} isEnabled={true} onDelete={handleDelete} />
    </BaseDrawer>
  );
};
