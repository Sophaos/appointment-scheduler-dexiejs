import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { Client, DEFAULT_CLIENT } from "./client";
import { useClientStore } from "./client-store";
export const useClientQuery = () => {
  const id = useClientStore((state) => state.id);
  const setId = useClientStore((state) => state.setId);
  const toggleDrawer = useClientStore((state) => state.toggleClientDrawerVisibility);

  const items = useLiveQuery(() => schedulerDatabase.clients?.toArray()) ?? [];
  const item = id ? items?.find((i) => i.id === id) : DEFAULT_CLIENT;

  const update = async (item: Client) => {
    try {
      await schedulerDatabase.clients.update(item.id, item);
    } catch (error) {
      console.error(error);
    } finally {
      toggleDrawer();
    }
  };

  const create = async (item: Client) => {
    try {
      await schedulerDatabase.clients.add({ ...item, id: undefined });
    } catch (error) {
      console.error(error);
    } finally {
      toggleDrawer();
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.clients.delete(id);
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
