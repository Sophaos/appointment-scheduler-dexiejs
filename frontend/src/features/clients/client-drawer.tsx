import { BaseDrawer } from "shared/ui/base-drawer";
import { ClientForm } from "./client-form";
import { EntityDrawerProps } from "shared/types/entity-drawer-props";
import { Client } from "./client";
import { useClientQuery } from "./client-query-hook";

export const ClientDrawer = ({ handleHide, isOpen }: EntityDrawerProps<Client>) => {
  const { item: data, update, create, remove } = useClientQuery();

  const handleUpdate = async (item: Client) => {
    try {
      await update(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Client) => {
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

  const handleConfirm = (formData: Client) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isOpen} title="Client" onHide={handleHide} icon={"pi pi-user-plus"}>
      <ClientForm onCancel={handleHide} onConfirm={handleConfirm} data={data} isProcessing={false} onDelete={handleDelete} />
    </BaseDrawer>
  );
};
