import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { DEFAULT_SERVICE, Service } from "./service";
import { useServiceStore } from "./service-store";
import { toast } from "react-toastify";

export const useServiceQuery = () => {
  const id = useServiceStore((state) => state.id);
  const setId = useServiceStore((state) => state.setId);
  const toggleDrawer = useServiceStore((state) => state.toggleServiceDrawerVisibility);

  const items = useLiveQuery(() => schedulerDatabase.services?.toArray()) ?? [];
  const item = id ? items?.find((i) => i.id === id) : DEFAULT_SERVICE;

  const update = async (item: Service) => {
    try {
      await schedulerDatabase.services.update(item.id, item);
      toggleDrawer();
      toast.success("A service has been updated.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const create = async (item: Service) => {
    try {
      await schedulerDatabase.services.add({ ...item, id: undefined });
      toggleDrawer();
      toast.success("A service has been created.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.services.delete(id);
      toggleDrawer();
      toast.success("A service has been removed.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
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
