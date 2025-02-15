import { Service } from "features/services/service";
import { ServiceDrawer } from "features/services/service-drawer";
import { useServiceQuery } from "features/services/service-query-hook";
import { useModal } from "hooks/drawer-hook";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ServicesPage = () => {
  const { items, item, setId } = useServiceQuery();
  const { open: openServiceDrawer, toggleModal: toggleServiceModal } = useModal();

  const columns: TableColumnProp[] = [
    { field: "name", header: "Name" },
    { field: "duration", header: "Duration" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = (row: Service) => {
    setId(row.id);
  };

  return (
    <>
      <BaseTable onEdit={handleEdit} data={items} columns={columns} />;
      <ServiceDrawer data={item} isOpen={openServiceDrawer} handleHide={toggleServiceModal} />
    </>
  );
};
