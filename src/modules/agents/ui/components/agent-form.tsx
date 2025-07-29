// import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  /****************************USER ROUTER***************************************************/
  //   const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        // TODO invalidate free tier usage

        onSuccess?.(); //made onSuccess optional so that it would close the Agent form
      },
      onError: (error) => {
        //Toaster component added in Root layout
        toast.error(error.message);

        //TODO Check if error code in "FORBIDDEN", redirect to /upgrades
      },
    })
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);

        //TODO Check if error code in "FORBIDDEN", redirect to /upgrades
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;
  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id });
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center">
          <GeneratedAvatar
            seed={form.watch("name")}
            variant="botttsNeutral"
            className="border size-16"
          />
        </div>

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Research Assistant" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Your helpful scientific research assistant"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between mt-4">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
