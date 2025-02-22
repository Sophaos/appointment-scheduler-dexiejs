import { ReactNode } from "react";

interface HeaderItemsProps {
  children: ReactNode;
}
export const HeaderItems = ({ children }: HeaderItemsProps) => {
  return <div className="flex gap-1">{children}</div>;
};
