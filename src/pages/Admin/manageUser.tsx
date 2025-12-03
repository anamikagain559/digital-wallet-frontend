import { useState } from "react";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} from "@/redux/features/user/user.api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";


export default function ManageUser() {
  const { data: users, isLoading } = useGetAllUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editingUser, setEditingUser] = useState<any>(null);

  const handleAction = async (id: string, payload: any) => {
    try {
      await updateUser({ id, data: payload }).unwrap();
      toast.success("Updated Successfully");
    } catch {
      toast.error("Update Failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };


const [open, setOpen] = useState(false);
const [editData, setEditData] = useState<any>(null);

const openEditModal = (user: any) => {
  setEditData({ ...user });
  setOpen(true);
};

const handleSave = async () => {
  try {
    await updateUser({ id: editData._id, data: editData }).unwrap();
    toast.success("User updated successfully");
    setOpen(false);
  } catch {
    toast.error("Update failed");
  }
};
  const filteredUsers = users?.users?.filter(u => u.role === "USER") ?? [];
  const filteredAgents = users?.users?.filter(u => u.role === "AGENT") ?? [];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* USERS TABLE */}
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
                {filteredUsers.map((user: any) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {editingUser?._id === user._id ? (
                        <input
                          className="border p-1 rounded"
                          value={editingUser.name}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, name: e.target.value })
                          }
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>

                    <TableCell>
                      {editingUser?._id === user._id ? (
                        <input
                          className="border p-1 rounded"
                          value={editingUser.email}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, email: e.target.value })
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </TableCell>

                    <TableCell>{user.isActive}</TableCell>

                    <TableCell className="flex gap-2">
                      {/* Block / Unblock */}
                      {user.isActive === "ACTIVE" ? (
                        <Button
                          variant="destructive"
                          onClick={() => handleAction(user._id, { isActive: "BLOCKED" })}
                        >
                          Block
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAction(user._id, { isActive: "ACTIVE" })}
                        >
                          Unblock
                        </Button>
                      )}

              <Button onClick={() => openEditModal(user)}>Edit</Button>
                      {/* Delete */}
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* AGENTS TABLE */}
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
                {filteredAgents.map((agent: any) => (
                  <TableRow key={agent._id}>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.isActive}</TableCell>

                    <TableCell className="flex gap-2">
                      {agent.isActive === "ACTIVE" ? (
                        <Button
                          variant="destructive"
                          onClick={() =>
                            handleAction(agent._id, { isActive: "SUSPENDED" })
                          }
                        >
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleAction(agent._id, { isActive: "ACTIVE" })
                          }
                        >
                          Approve
                        </Button>
                      )}

                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(agent._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {/* EDIT MODAL */}
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>Edit User</DialogTitle>
    </DialogHeader>

    {editData && (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="w-full border p-2 rounded"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="w-full border p-2 rounded"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="w-full border p-2 rounded"
            value={editData.isActive}
            onChange={(e) => setEditData({ ...editData, isActive: e.target.value })}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="BLOCKED">BLOCKED</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            className="w-full border p-2 rounded"
            value={editData.role}
            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
          >
            <option value="USER">USER</option>
            <option value="AGENT">AGENT</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>

    </div>
  );
}
