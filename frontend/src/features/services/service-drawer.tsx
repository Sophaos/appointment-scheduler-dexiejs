import { BaseDrawer } from "shared/ui/base-drawer";
import { ServiceForm } from "./service-form";
import { Service } from "./service";
import { useServiceQuery } from "./service-query-hook";
import { useServiceStore } from "./service-store";

export const ServiceDrawer = () => {
  const { item: data, update, create, remove } = useServiceQuery();
  const isOpen = useServiceStore((state) => state.isServiceDrawerVisible);
  const handleHide = useServiceStore((state) => state.toggleServiceDrawerVisibility);

  const handleUpdate = async (item: Service) => {
    await update(item);
  };

  const handleAdd = async (item: Service) => {
    await create(item);
  };

  const handleDelete = async () => {
    await remove(data!.id);
  };

  const handleConfirm = (formData: Service) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isOpen} title="Service" onHide={handleHide}>
      <ServiceForm onCancel={handleHide} onConfirm={handleConfirm} data={data} isProcessing={false} onDelete={handleDelete} />
    </BaseDrawer>
  );
};
