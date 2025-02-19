import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { Appointment } from "./appointment";

interface AppointmentQueryProps {
  view: string;
  date: string;
}

export const useAppointmentQuery = ({ view, date }: AppointmentQueryProps) => {
  const data = useLiveQuery(() => schedulerDatabase.appointments?.toArray(), [view, date]);

  const update = async (item: Appointment) => {
    try {
      await schedulerDatabase.appointments.update(item.id, item);
    } catch (error) {
      console.error(error);
    }
  };

  const create = async (item: Appointment) => {
    try {
      await schedulerDatabase.appointments.add({ ...item, id: undefined });
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.appointments.delete(id);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    data,
    update,
    create,
    remove,
  };
};
