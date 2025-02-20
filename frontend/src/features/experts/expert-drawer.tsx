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
    await update(item);
  };

  const handleAdd = async (item: Expert) => {
    await create(item);
  };

  const handleDelete = async () => {
    await remove(data!.id);
  };

  const handleConfirm = (formData: Expert) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isOpen} title="Expert" onHide={handleHide}>
      <ExpertForm onCancel={handleHide} onConfirm={handleConfirm} data={data} isProcessing={false} onDelete={handleDelete} />
    </BaseDrawer>
  );
};
