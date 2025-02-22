import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { Appointment, DEFAULT_APPOINTMENT } from "./appointment";
import { toast } from "react-toastify";
import { useAppointmentStore } from "./appointment-store";
import { useRouter } from "hooks/router-hook";
import { useMemo } from "react";
import { generateAppointments } from "./appointment-seeder";

export const useAppointmentQuery = () => {
  const { view, date } = useRouter();
  const id = useAppointmentStore((state) => state.id);
  const items = useLiveQuery(() => schedulerDatabase.appointments?.toArray(), [view, date]);
  const experts = useLiveQuery(() => schedulerDatabase.experts?.toArray()) ?? [];
  const clients = useLiveQuery(() => schedulerDatabase.clients?.toArray()) ?? [];
  const services = useLiveQuery(() => schedulerDatabase.services?.toArray()) ?? [];

  const item = useMemo(() => (id ? items?.find((i) => i.id === id) : DEFAULT_APPOINTMENT), [id, items]);

  const update = async (item: Appointment) => {
    try {
      await schedulerDatabase.appointments.update(item.id, item);
      toast.success("An appointment has been updated.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const create = async (item: Appointment) => {
    try {
      await schedulerDatabase.appointments.add({ ...item, id: undefined });
      toast.success("An appointment has been updated.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.appointments.delete(id);
      toast.success("An appointment has been updated.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const createBatch = async (count: number = 10) => {
    try {
      const appointments = generateAppointments(count, clients, services, experts);
      console.log(appointments);
      appointments.forEach(async (e) => {
        await schedulerDatabase.appointments.add({ ...e, id: undefined });
      });
      toast.success("A list of appointments has been generated.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  return {
    id,
    items,
    item,
    update,
    create,
    remove,
    createBatch,
  };
};
