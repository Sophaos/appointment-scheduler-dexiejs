import { Service } from "features/services/service";
import { useServiceQuery } from "features/services/service-query-hook";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";
import { useDrawerStore } from "store/drawer-store";
import { useShallow } from "zustand/shallow";

export const ServicesPage = () => {
  const { items, setId } = useServiceQuery();
  const { toggleServiceDrawerVisibility } = useDrawerStore(
    useShallow((state) => ({
      toggleServiceDrawerVisibility: state.toggleServiceDrawerVisibility,
    }))
  );

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
