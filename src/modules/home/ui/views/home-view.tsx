"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.hello.queryOptions({ text: "Achu❤️🌏" })
  );

  return (
    <div className="flex flex-col p-4 gap-y-4 bg-slate-500 min-h-svh">
      <p className="text-2xl text-center">{data?.greeting}</p>
    </div>
  );
};