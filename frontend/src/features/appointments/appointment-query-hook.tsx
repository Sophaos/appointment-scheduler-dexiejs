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
      await Promise.all(generatedExperts.map((e) => schedulerDatabase.experts.add({ ...e, id: undefined })));

      const generatedClients = generateClients(count);
      await Promise.all(generatedClients.map((c) => schedulerDatabase.clients.add({ ...c, id: undefined })));

      const generatedServices = generateServices(count);
      await Promise.all(generatedServices.map((s) => schedulerDatabase.services.add({ ...s, id: undefined })));

      // Fetch newly inserted data
      const experts = await schedulerDatabase.experts.toArray();
      const clients = await schedulerDatabase.clients.toArray();
      const services = await schedulerDatabase.services.toArray();

      const appointments = generateAppointments(count, clients, services, experts);
      await Promise.all(appointments.map((a) => schedulerDatabase.appointments.add({ ...a, id: undefined })));
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
