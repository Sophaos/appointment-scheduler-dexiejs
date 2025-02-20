import { Client } from "features/clients/client";
import { useClientQuery } from "features/clients/client-query-hook";
import { useClientStore } from "features/clients/client-store";
import { TableLayout } from "layout/table-layout";
import { AddButton } from "shared/ui/add-button";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ClientsPage = () => {
  const { items, setId } = useClientQuery();
  const toggleClientDrawerVisibility = useClientStore((state) => state.toggleClientDrawerVisibility);

  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickname" },
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "phoneNumber", header: "Phone Number" },
    { field: "note", header: "Note" },
  ];

  const handleEdit = (row: Client) => {
    setId(row.id);
    toggleClientDrawerVisibility();
  };

  const openDrawer = () => {
    setId(0);
    toggleClientDrawerVisibility();
  };

  return (
    <TableLayout title="Clients" headerContent={<AddButton onAdd={openDrawer} />}>
      <BaseTable onEdit={handleEdit} data={items} columns={columns} />
    </TableLayout>
  );
};
