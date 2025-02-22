import { Service } from "features/services/service";
import { useServiceQuery } from "features/services/service-query-hook";
import { useServiceStore } from "features/services/service-store";
import { TableLayout } from "layout/table-layout";
import { AddButton } from "shared/ui/add-button";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";
import { GenerateButton } from "shared/ui/generate-button";
import { HeaderItems } from "shared/ui/header-items";

export const ServicesPage = () => {
  const { items, setId, createBatch } = useServiceQuery();
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

  const handleGenerate = () => {
    createBatch(10);
  };

  return (
    <TableLayout
      title="Services"
      headerContent={
        <HeaderItems>
          <GenerateButton onGenerate={handleGenerate} />
          <AddButton onAdd={openDrawer} />
        </HeaderItems>
      }
    >
      <BaseTable onEdit={handleEdit} data={items} columns={columns} />
    </TableLayout>
  );
};
