import {Knock} from "@knocklabs/node";
import {env} from "@/env";

type WorkflowKey =
  "biddy-user-placed-bid";

const knock = new Knock(env.KNOCK_SECRET_API_KEY);

export async function knockWorkflowTrigger({
  workflowKey,
  session,
  recipients,
  data
}: {
  workflowKey: WorkflowKey
  session: any,
  recipients: any[],
  data: any
}) {
  await knock.workflows.trigger(workflowKey, {
    actor: {
      id: session.user.id,
      name: session.user.name ?? "Anonymous",
      email: session.user.email,
      collection: "users"
    },
    recipients,
    data
  });
}