import { Service } from "features/services/service";
import { useServiceQuery } from "features/services/service-query-hook";
import { useServiceStore } from "features/services/service-store";
import { TableLayout } from "layout/table-layout";
import { AddButton } from "shared/ui/add-button";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ServicesPage = () => {
  const { items, setId } = useServiceQuery();
  const toggleServiceDrawerVisibility = useServiceStore((state) => state.toggleServiceDrawerVisibility);

  const columns: TableColumnProp[] = [
    { field: "name", header: "Name" },
    { field: "duration", header: "Duration" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = (row: Service) => {
    setId(row.id);
    toggleServiceDrawerVisibility();
  };

  const openDrawer = () => {
    setId(0);
    toggleServiceDrawerVisibility();
  };

  return (
    <TableLayout title="Services" headerContent={<AddButton onAdd={openDrawer} />}>
      <BaseTable onEdit={handleEdit} data={items} columns={columns} />
    </TableLayout>
  );
};
