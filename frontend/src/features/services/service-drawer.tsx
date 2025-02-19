import { BaseDrawer } from "shared/ui/base-drawer";
import { ServiceForm } from "./service-form";
import { Service } from "./service";
import { EntityDrawerProps } from "shared/types/entity-drawer-props";
import { useServiceQuery } from "./service-query-hook";

export const ServiceDrawer = ({ handleHide, isOpen }: EntityDrawerProps<Service>) => {
  const { item: data, update, create, remove } = useServiceQuery();

  const handleUpdate = async (item: Service) => {
    try {
      await update(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Service) => {
    try {
      await create(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await remove(data!.id);
    } catch (error) {
      console.error(error);
    }
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
