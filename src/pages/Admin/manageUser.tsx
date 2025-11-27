
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ManageUser() {
  const { data: users, isLoading } = useGetAllUserQuery();
  const [updateUser] = useUpdateUserMutation();
const handleAction = async (
  id: string | number,
  payload: { isActive: string }
): Promise<void> => {
  try {
    await updateUser({ id, data: payload }).unwrap();
    toast.success("Updated Successfully");
  } catch {
    toast.error("Update Failed");
  }
};

 const filteredUsers = users.users?.filter(u => u.role === "USER");
  const filteredAgents = users?.filter((u) => u.role === "AGENT");

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isActive}</TableCell>
                    <TableCell>
                      {user.isActive === "ACTIVE" ? (
                        <Button variant="destructive" onClick={() => handleAction(user._id, { isActive: "BLOCKED" })}>
                          Block
                        </Button>
                      ) : (
                        <Button onClick={() => handleAction(user._id, { isActive: "ACTIVE" })}>
                          Unblock
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Agents</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading agents...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredAgents?.map((agent) => (
                  <TableRow key={agent._id}>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.isActive}</TableCell>
                    <TableCell>
                      {agent.isActive === "ACTIVE" ? (
                        <Button variant="destructive" onClick={() => handleAction(agent._id, { isActive: "SUSPENDED" })}>
                          Suspend
                        </Button>
                      ) : (
                        <Button onClick={() => handleAction(agent._id, { isActive: "ACTIVE" })}>
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}