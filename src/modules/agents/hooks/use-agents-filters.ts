import { DEFAULT_PAGE } from "@/constants";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

export const useAgentsFilter = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};


//dont add pageSize as user might break the app by putting pageSize =1000000000000000