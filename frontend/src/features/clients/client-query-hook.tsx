import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { Client, DEFAULT_CLIENT } from "./client";
import { useClientStore } from "./client-store";
import { toast } from "react-toastify";
import { generateClients } from "./client-seeder";
export const useClientQuery = () => {
  const id = useClientStore((state) => state.id);
  const setId = useClientStore((state) => state.setId);
  const toggleDrawer = useClientStore((state) => state.toggleClientDrawerVisibility);

  const items = useLiveQuery(() => schedulerDatabase.clients?.toArray()) ?? [];
  const item = id ? items?.find((i) => i.id === id) : DEFAULT_CLIENT;

  const update = async (item: Client) => {
    try {
      await schedulerDatabase.clients.update(item.id, item);
      toast.success("A client has been updated.");
      toggleDrawer();
    } catch (error) {
      console.error(error);
    }
  };

  const create = async (item: Client) => {
    try {
      await schedulerDatabase.clients.add({ ...item, id: undefined });
      toast.success("A client has been created.");
      toggleDrawer();
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.clients.delete(id);
      toast.success("A client has been removed.");
      toggleDrawer();
    } catch (error) {
      console.error(error);
    }
  };

  const createBatch = async (count: number = 10) => {
    try {
      const clients = generateClients(count);
      clients.forEach(async (e) => {
        await schedulerDatabase.clients.add({ ...e, id: undefined });
      });
      toast.success("A list of clients has been generated.");
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
    createBatch,
  };
};
