import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { Appointment, DEFAULT_APPOINTMENT } from "./appointment";
import { toast } from "react-toastify";
import { useAppointmentStore } from "./appointment-store";
import { useRouter } from "hooks/router-hook";
import { useMemo } from "react";
import { generateAppointments } from "./appointment-seeder";
import { generateExperts } from "features/experts/expert-seeder";
import { generateClients } from "features/clients/client-seeder";
import { generateServices } from "features/services/service-seeder";

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
      const generatedExperts = generateExperts(count);
      generatedExperts.forEach(async (e) => {
        await schedulerDatabase.experts.add({ ...e, id: undefined });
      });

      const generatedClients = generateClients(count);
      generatedClients.forEach(async (e) => {
        await schedulerDatabase.clients.add({ ...e, id: undefined });
      });

      const generatedServices = generateServices(count);
      generatedServices.forEach(async (e) => {
        await schedulerDatabase.services.add({ ...e, id: undefined });
      });

      const appointments = generateAppointments(count, generatedClients, generatedServices, generatedExperts);
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
