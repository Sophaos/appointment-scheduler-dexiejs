import { useLiveQuery } from "dexie-react-hooks";
import { schedulerDatabase } from "db/db";
import { DEFAULT_EXPERT, Expert } from "./expert";
import { useExpertStore } from "./expert-store";
export const useExpertQuery = () => {
  const id = useExpertStore((state) => state.id);
  const setId = useExpertStore((state) => state.setId);
  const items = useLiveQuery(() => schedulerDatabase.experts?.toArray()) ?? [];
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
      await schedulerDatabase.experts.add({ ...item, id: undefined });
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (id: number) => {
    try {
      await schedulerDatabase.experts.delete(id);
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
