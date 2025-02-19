import { Client } from "features/clients/client";
import { useClientQuery } from "features/clients/client-query-hook";
import { useClientStore } from "features/clients/client-store";
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

  return <BaseTable onEdit={handleEdit} data={items} columns={columns} />;
};
