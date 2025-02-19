import { Service } from "features/services/service";
import { useServiceQuery } from "features/services/service-query-hook";
import { useServiceStore } from "features/services/service-store";
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

  return <BaseTable onEdit={handleEdit} data={items} columns={columns} />;
};
