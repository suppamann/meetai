import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

// generating the type from what the procedure API returns
export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];