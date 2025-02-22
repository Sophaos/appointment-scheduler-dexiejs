import { Expert } from "features/experts/expert";
import { useExpertQuery } from "features/experts/expert-query-hook";
import { useExpertStore } from "features/experts/expert-store";
import { TableLayout } from "layout/table-layout";
import { AddButton } from "shared/ui/add-button";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";
import { GenerateButton } from "shared/ui/generate-button";
import { HeaderItems } from "shared/ui/header-items";

export const ExpertsPage = () => {
  const { items, setId, createBatch } = useExpertQuery();
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

  const handleGenerate = () => {
    createBatch(10);
  };

  return (
    <TableLayout
      title="Experts"
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
