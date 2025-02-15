import { useSearchParams } from "react-router-dom";
import { getFormattedDate } from "shared/utils/time-utils";
export const useRouter = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "day";
  const date = searchParams.get("date") || getFormattedDate(new Date());

  return {
    view,
    date,
  };
};
