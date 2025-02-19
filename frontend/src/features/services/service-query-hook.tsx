import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { DEFAULT_SERVICE, Service } from "./service";
import { useState } from "react";
export const useServiceQuery = () => {
  const [id, setId] = useState(0);
  const items = useLiveQuery(() => schedulerDatabase.services?.toArray()) ?? [];
  const item = id ? items?.find((i) => i.id === id) : DEFAULT_SERVICE;
  const update = async (item: Service) => {
    try {
      await schedulerDatabase.services.update(item.id, item);
    } catch (error) {
      console.error(error);
    }
  };

  const create = async (item: Service) => {
    try {
      await schedulerDatabase.services.add({ ...item, id: undefined });
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
    items,
    item,
    setId,
    update,
    create,
    remove,
  };
};
