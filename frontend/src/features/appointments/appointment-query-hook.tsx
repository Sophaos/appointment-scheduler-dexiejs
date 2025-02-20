import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { Appointment } from "./appointment";
import { toast } from "react-toastify";
import { useAppointmentStore } from "./appointment-store";

interface AppointmentQueryProps {
  view: string;
  date: string;
}

export const useAppointmentQuery = ({ view, date }: AppointmentQueryProps) => {
  const id = useAppointmentStore((state) => state.id);
  const data = useLiveQuery(() => schedulerDatabase.appointments?.toArray(), [view, date]);
  const toggleDrawer = useAppointmentStore((state) => state.toggleAppointmentDrawerVisibility);

  const update = async (item: Appointment) => {
    try {
      await schedulerDatabase.appointments.update(item.id, item);
      toast.success("An appointment has been updated.");
      toggleDrawer();
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const create = async (item: Appointment) => {
    try {
      await schedulerDatabase.appointments.add({ ...item, id: undefined });
      toast.success("An appointment has been updated.");
      toggleDrawer();
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.appointments.delete(id);
      toast.success("An appointment has been updated.");
      toggleDrawer();
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };
  return {
    id,
    data,
    update,
    create,
    remove,
  };
};
