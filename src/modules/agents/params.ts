import { DEFAULT_PAGE } from "@/constants";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const filterSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(filterSearchParams);

//this is to avoid the unauthorized error, as data passed in queryOptions has to match the initial load -- 06:38:00
// const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters})); -- agent-view client, agent page server component 
