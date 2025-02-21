import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { DEFAULT_EXPERT, Expert } from "./expert";
import { useExpertStore } from "./expert-store";
import { toast } from "react-toastify";
export const useExpertQuery = () => {
  const id = useExpertStore((state) => state.id);
  const resourceId = useExpertStore((state) => state.resourceId);
  const setId = useExpertStore((state) => state.setId);
  const toggleDrawer = useExpertStore((state) => state.toggleExpertDrawerVisibility);

  const items = useLiveQuery(() => schedulerDatabase.experts?.toArray()) ?? [];
  const item = id ? items?.find((i) => i.id === id) : DEFAULT_EXPERT;
  const resource = resourceId ? items?.find((i) => i.id === resourceId) : undefined;

  const update = async (item: Expert) => {
    try {
      await schedulerDatabase.experts.update(item.id, item);
      toggleDrawer();
      toast.success("An expert has been updated.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const create = async (item: Expert) => {
    try {
      await schedulerDatabase.experts.add({ ...item, id: undefined });
      toggleDrawer();
      toast.success("An expert has been created.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.experts.delete(id);
      toggleDrawer();
      toast.success("An expert has been removed.");
    } catch (error) {
      console.error(error);
      toast.error("An error has occured.");
    }
  };

  return {
    items,
    item,
    resource,
    setId,
    update,
    create,
    remove,
  };
};
