import { ReactNode } from "react";
interface TableLayoutProps {
  title: string;
  children: ReactNode;
  headerContent?: ReactNode;
}

export const TableLayout = ({ title, children, headerContent }: TableLayoutProps) => {
  return (
    <div className="p-4">
      <div className="pb-3 flex justify-between">
        <h1 className="text-xl">{title}</h1>
        {headerContent}
        {/* add another children */}
      </div>
      {children}
    </div>
  );
};
