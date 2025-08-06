"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AgentIdViewHeader } from "./agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        // TODO Invalidate free tier usage
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingCount} associated meetings`
  );

  const handleRemovAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 flex flex-col py-4  px-4 md:px-8 gap-y-4">
        <AgentIdViewHeader
          agentId={data.id}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemovAgent}
        />
        <div className=" bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                seed={data.name}
                variant="botttsNeutral"
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <Video className="text-blue-700" /> {data.meetingCount}{" "}
                {data.meetingCount === 1 ? "meeting" : "meetings"}
              </Badge>
            </div>
            <div className="flex flex-col px-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className=" text-neutral-600 text-justify mt-2 ">
                {data.instructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a few seconds..."
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error loading agent"
      description="Something went wrong"
    />
  );
};
