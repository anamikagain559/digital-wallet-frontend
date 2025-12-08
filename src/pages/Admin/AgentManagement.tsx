import {
  useGetAllUserQuery,
} from "@/redux/features/user/user.api";
import { useApproveAgentMutation, useSuspendAgentMutation } from "@/redux/features/user/user.api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

  const AgentManagement = () => {
  
    const { data: usersData, isLoading } = useGetAllUserQuery(undefined);

  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [suspendingId, setSuspendingId] = useState<string | null>(null);

  // Filter agents only
  type User = {
    _id: string;
    name: string;
    email: string;
    role?: string;
    status?: string;
  };

  const agents = (usersData?.users as User[] | undefined)?.filter((u: User) => u.role === "AGENT") || [];

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    try {
      await approveAgent(id).unwrap();
      toast.success("Agent Approved Successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve");
    } finally {
      setApprovingId(null);
    }
  };

  const handleSuspend = async (id: string) => {
    setSuspendingId(id);
    try {
      await suspendAgent(id).unwrap();
      toast.success("Agent Suspended Successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to suspend");
    } finally {
      setSuspendingId(null);
    }
  };
 

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Manage Agents</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {agents.map((agent: any) => (
    <TableRow key={agent._id}>
      
      <TableCell>{agent.name}</TableCell>
      <TableCell>{agent.email}</TableCell>

      {/* Status */}
      <TableCell className="capitalize">
        {agent.isVerified ? "verified" : "pending"}
      </TableCell>

    <TableCell className="text-right space-x-2">

  {/* APPROVE BUTTON */}
  {agent.isVerified ? (
    <Button variant="default" size="sm" disabled>
      Approved
    </Button>
  ) : (
    <Button
      variant="default"
      size="sm"
      disabled={approvingId === agent._id}
      onClick={() => handleApprove(agent._id)}
    >
      {approvingId === agent._id ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        "Approve"
      )}
    </Button>
  )}

  {/* SUSPEND BUTTON */}
  {agent.isSuspended ? (
    <Button variant="destructive" size="sm" disabled>
      Suspended
    </Button>
  ) : (
    <Button
      variant="destructive"
      size="sm"
      disabled={suspendingId === agent._id}
      onClick={() => handleSuspend(agent._id)}
    >
      {suspendingId === agent._id ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        "Suspend"
      )}
    </Button>
  )}

</TableCell>

    </TableRow>
  ))}
</TableBody>

      </Table>

      {agents.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No agents found.</p>
      )}
    </div>
  );
};

export default AgentManagement;
