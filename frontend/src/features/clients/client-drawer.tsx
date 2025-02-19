import { BaseDrawer } from "shared/ui/base-drawer";
import { ClientForm } from "./client-form";
import { Client } from "./client";
import { useClientQuery } from "./client-query-hook";
import { useClientStore } from "./client-store";

export const ClientDrawer = () => {
  const { item: data, update, create, remove } = useClientQuery();
  const isOpen = useClientStore((state) => state.isClientDrawerVisible);
  const handleHide = useClientStore((state) => state.toggleClientDrawerVisibility);

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
