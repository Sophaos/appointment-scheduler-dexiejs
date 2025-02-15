import { Expert } from "features/experts/expert";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { useExpertQuery } from "features/experts/expert-query-hook";
import { useModal } from "hooks/drawer-hook";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ExpertsPage = () => {
  const { items, item, setId } = useExpertQuery();
  const { open: openExpertDrawer, toggleModal: toggleExpertModal } = useModal();
  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickanme" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = (row: Expert) => {
    setId(row.id);
  };

  return (
    <>
      <BaseTable onEdit={handleEdit} data={items} columns={columns} />;
      <ExpertDrawer data={item} isOpen={openExpertDrawer} handleHide={toggleExpertModal} />
    </>
  );
};
