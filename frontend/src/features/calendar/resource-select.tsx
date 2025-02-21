import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useExpertQuery } from "features/experts/expert-query-hook";
import { useCalendarStore } from "store/calendar-store";

export const ResourceSelect = () => {
  const { items: resourcesOptions } = useExpertQuery();
  const resources = useCalendarStore((state) => state.resources);
  const setResources = useCalendarStore((state) => state.setResources);

  const handleChange = (event: MultiSelectChangeEvent) => {
    setResources(event.target.value);
  };
  return <MultiSelect value={resources} onChange={handleChange} optionLabel="nickname" placeholder="Resource(s)" options={resourcesOptions} />;
};
