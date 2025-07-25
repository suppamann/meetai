"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
// import { LoadingState } from "@/components/loading-state";
// import { ErrorState } from "@/components/error-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentsFilter();

  /* using a fetch method and rendering based on the response
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions()
    );
    
    if (isLoading) {
      return (
        <LoadingState
        title="Loading Agents"
        description="This may take a few seconds..."
      />
    );
  }
  if (isError) {
    return (
      <ErrorState
        title="Error loading agents"
        description="Something went wrong"
        />
        );
        }
        */

  // hydrated from the server so data is never undefined as it was with useQuery()
  // also make sure to use prefetch in parent component when using useSuspenseQuery
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div>
      <div>
        <div className="flex flex-1 flex-col pb-4 px-4 md:px-8 gap-y-4">
          <DataTable data={data.items} columns={columns} />
          <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })}
          />
          {data.items.length === 0 ? (
            <EmptyState
              title="Create your first Agent"
              description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds..."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Something went wrong"
    />
  );
};
