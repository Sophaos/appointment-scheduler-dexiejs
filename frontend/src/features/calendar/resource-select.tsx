import { useDispatch, useSelector } from "react-redux";
import { selectResources, setResources } from "./calendar-slice";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useExpertQuery } from "features/experts/expert-query-hook";

export const ResourceSelect = () => {
  const dispatch = useDispatch();
  const { items: resourcesOptions } = useExpertQuery();

  const resources = useSelector(selectResources);

  const handleChange = (event: MultiSelectChangeEvent) => {
    dispatch(setResources(event.target.value));
  };
  return <MultiSelect value={resources} onChange={handleChange} optionLabel="nickname" placeholder="Resource(s)" options={resourcesOptions} />;
};
