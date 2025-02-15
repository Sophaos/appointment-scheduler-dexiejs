import { Tag } from "primereact/tag";
export const ResourceHeader = ({ resource }) => {
  return (
    <div className="my-1">
      <Tag style={{ background: `#${resource?.color}`, color: "white" }} value={resource?.nickname} />
    </div>
  );
};
