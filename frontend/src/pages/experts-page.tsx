import { Expert } from "features/experts/expert";
import { useExpertQuery } from "features/experts/expert-query-hook";
import { useExpertStore } from "features/experts/expert-store";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ExpertsPage = () => {
  const { items, setId } = useExpertQuery();
  const toggleExpertDrawerVisibility = useExpertStore((state) => state.toggleExpertDrawerVisibility);

  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickanme" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = (row: Expert) => {
    setId(row.id);
    toggleExpertDrawerVisibility();
  };

  return <BaseTable onEdit={handleEdit} data={items} columns={columns} />;
};
