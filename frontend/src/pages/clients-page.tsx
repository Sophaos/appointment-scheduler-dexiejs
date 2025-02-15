import { Client } from "features/clients/client";
import { ClientDrawer } from "features/clients/client-drawer";
import { useClientQuery } from "features/clients/client-query-hook";
import { useModal } from "hooks/drawer-hook";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ClientsPage = () => {
  const { items, item, setId } = useClientQuery();
  const { open: openClientDrawer, toggleModal: toggleClientModal } = useModal();

  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickname" },
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "phoneNumber", header: "Phone Number" },
    { field: "note", header: "Note" },
  ];

  const handleEdit = (row: Client) => {
    setId(row.id);
  };

  return (
    <>
      <BaseTable onEdit={handleEdit} data={items} columns={columns} />;
      <ClientDrawer data={item} isOpen={openClientDrawer} handleHide={toggleClientModal} />
    </>
  );
};
