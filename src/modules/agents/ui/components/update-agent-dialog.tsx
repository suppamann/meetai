import { ResponsiveDialouge } from "@/components/resposive-dialogue";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean;
  initialValues : AgentGetOne;
  onOpenChange: (open: boolean) => void;
}

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues  }: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialouge
      title="Edit Agent"
      description="Edit agent details"
      open={open}
      openChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialouge>
  );
};
