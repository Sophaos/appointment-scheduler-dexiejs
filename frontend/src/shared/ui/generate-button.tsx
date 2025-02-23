import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

interface GenerateButtonProps {
  onGenerate: () => void;
}

export const GenerateButton = ({ onGenerate }: GenerateButtonProps) => {
  const confirm = () => {
    confirmDialog({
      message: "Do you want to genrate some random data  ?",
      header: "Generate Data Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: onGenerate,
    });
  };
  return (
    <>
      <ConfirmDialog />
      <Button onClick={confirm} icon="pi pi-database" label="Generate Data" />
    </>
  );
};
