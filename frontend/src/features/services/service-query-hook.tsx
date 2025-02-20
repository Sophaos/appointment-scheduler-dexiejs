import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { DEFAULT_SERVICE, Service } from "./service";
import { useServiceStore } from "./service-store";

export const useServiceQuery = () => {
  const id = useServiceStore((state) => state.id);
  const setId = useServiceStore((state) => state.setId);
  const toggleDrawer = useServiceStore((state) => state.toggleServiceDrawerVisibility);

  const items = useLiveQuery(() => schedulerDatabase.services?.toArray()) ?? [];
  const item = id ? items?.find((i) => i.id === id) : DEFAULT_SERVICE;

  const update = async (item: Service) => {
    try {
      await schedulerDatabase.services.update(item.id, item);
    } catch (error) {
      console.error(error);
    } finally {
      toggleDrawer();
    }
  };

  const create = async (item: Service) => {
    try {
      await schedulerDatabase.services.add({ ...item, id: undefined });
    } catch (error) {
      console.error(error);
    } finally {
      toggleDrawer();
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.services.delete(id);
    } catch (error) {
      console.error(error);
    } finally {
      toggleDrawer();
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
