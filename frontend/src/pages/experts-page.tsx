import { Expert } from "features/experts/expert";
import { useExpertQuery } from "features/experts/expert-query-hook";
import { useExpertStore } from "features/experts/expert-store";
import { TableLayout } from "layout/table-layout";
import { AddButton } from "shared/ui/add-button";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ExpertsPage = () => {
  const { items, setId } = useExpertQuery();
  const toggleExpertDrawerVisibility = useExpertStore((state) => state.toggleExpertDrawerVisibility);

  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickname" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = (row: Expert) => {
    setId(row.id);
    toggleExpertDrawerVisibility();
  };

  const openDrawer = () => {
    setId(0);
    toggleExpertDrawerVisibility();
  };

  return (
    <TableLayout title="Experts" headerContent={<AddButton onAdd={openDrawer} />}>
      <BaseTable onEdit={handleEdit} data={items} columns={columns} />
    </TableLayout>
  );
};
