"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
// import { LoadingState } from "@/components/loading-state";
// import { ErrorState } from "@/components/error-state";

export const AgentsView = () => {
  const trpc = useTRPC();

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
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return (
    <div>
      <div>
        {data.map((e, idx) => {
          return (
            <div key={idx} className="flex flex-row gap-x-8 justify-between px-8 mb-3.5">
              <h1 className="font-extrabold text-primary">{e.name}</h1>
              <h2>{e.instructions}</h2>
              <h2 className="text-muted-foreground">{new Date(e.updatedAt).toLocaleDateString("en-IN")}</h2>
            </div>
          );
        })}
        <div>{JSON.stringify(data, null, 2)}</div>
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
