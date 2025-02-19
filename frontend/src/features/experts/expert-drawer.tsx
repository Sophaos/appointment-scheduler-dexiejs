import { BaseDrawer } from "shared/ui/base-drawer";
import { ExpertForm } from "./expert-form";
import { Expert } from "./expert";
import { useExpertQuery } from "./expert-query-hook";
import { useExpertStore } from "./expert-store";

export const ExpertDrawer = () => {
  const { item: data, update, create, remove } = useExpertQuery();
  const isOpen = useExpertStore((state) => state.isExpertDrawerVisible);
  const handleHide = useExpertStore((state) => state.toggleExpertDrawerVisibility);

  const handleUpdate = async (item: Expert) => {
    try {
      await update(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Expert) => {
    try {
      await create(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = (formData: Expert) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  const handleDelete = async () => {
    try {
      await remove(data!.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseDrawer isOpen={isOpen} title="Expert" onHide={handleHide}>
      <ExpertForm onCancel={handleHide} onConfirm={handleConfirm} data={data} isProcessing={false} onDelete={handleDelete} />
    </BaseDrawer>
  );
};
