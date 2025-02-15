import { BaseDrawer } from "shared/ui/base-drawer";
import { AppointmentForm } from "./appointment-form";
import { Appointment, DEFAULT_APPOINTMENT, FormattedAppointment } from "./appointment";
import { useAppointmentQuery } from "./appointment-query-hook";
import { useRouter } from "hooks/router-hook";
import { EntityDrawerProps } from "shared/types/entity-drawer-props";

export const AppointmentDrawer = ({ data, handleHide, isOpen }: EntityDrawerProps<Appointment>) => {
  // const dispatch = useDispatch();
  const { view, date } = useRouter();
  // const isDrawerVisible = useSelector(selectIsAppointmentDrawerVisible);
  // const isMoving = useSelector(selectIsMoving);
  // const data = useSelector(selectAppointmentData);

  // const handleHide = () => {
  //   dispatch(setAppointmentDrawerVisibility(false));
  //   dispatch(setIsMoving(false));
  //   dispatch(setAppointmentData(DEFAULT_APPOINTMENT));
  // };

  const { update, create, remove } = useAppointmentQuery({ view, date });

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
    // dispatch(setAppointmentData(DEFAULT_APPOINTMENT));
  };

  return (
    <BaseDrawer isOpen={isOpen} title="Appointment" onHide={handleHide}>
      <AppointmentForm onCancel={handleHide} onConfirm={handleConfirm} data={formattedData} isProcessing={false} isEnabled={true} onDelete={handleDelete} />
    </BaseDrawer>
  );
};
