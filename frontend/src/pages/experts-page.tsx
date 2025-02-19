import { Expert } from "features/experts/expert";
import { useExpertQuery } from "features/experts/expert-query-hook";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";
import { useDrawerStore } from "store/drawer-store";
import { useShallow } from "zustand/shallow";

export const ExpertsPage = () => {
  const { items, setId } = useExpertQuery();
  const { toggleExpertDrawerVisibility } = useDrawerStore(
    useShallow((state) => ({
      toggleExpertDrawerVisibility: state.toggleExpertDrawerVisibility,
    }))
  );

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
