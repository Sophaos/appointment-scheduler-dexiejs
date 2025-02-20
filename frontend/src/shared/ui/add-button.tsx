import { Button } from "primereact/button";

interface AddButtonProps {
  onAdd: () => void;
}

export const AddButton = ({ onAdd }: AddButtonProps) => {
  return <Button onClick={onAdd} icon="pi pi-plus" label="Add" />;
};
