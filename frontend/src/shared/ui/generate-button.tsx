import { Button } from "primereact/button";

interface GenerateButtonProps {
  onGenerate: () => void;
}

export const GenerateButton = ({ onGenerate }: GenerateButtonProps) => {
  return <Button onClick={onGenerate} icon="pi pi-database" label="Generate Data" />;
};
