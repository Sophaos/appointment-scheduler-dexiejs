import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { DEFAULT_EXPERT, Expert } from "./expert";
import { useState } from "react";
export const useExpertQuery = () => {
  const [id, setId] = useState(0);
  const items = useLiveQuery(() => schedulerDatabase.experts.toArray()) ?? [];
  const item = id ? items?.find((i) => i.id === id) : DEFAULT_EXPERT;

  const update = async (item: Expert) => {
    try {
      await schedulerDatabase.experts.update(item.id, item);
    } catch (error) {
      console.error(error);
    }
  };

  const create = async (item: Expert) => {
    try {
      await schedulerDatabase.experts.add(item);
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
