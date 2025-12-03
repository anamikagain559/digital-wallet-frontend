import { useState } from "react";
import {
  useGetAllUserQuery,
  useBlockOrUnblockUserMutation,
} from "@/redux/features/user/user.api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ManageUser() {
  const { data: users, isLoading } = useGetAllUserQuery(undefined);
const [blockOrUnblockUser] = useBlockOrUnblockUserMutation();

  const [viewUser, setViewUser] = useState<any>(null);
  const [confirmAction, setConfirmAction] = useState<any>(null);

  const filteredUsers =
    users?.users?.filter((u: any) => u.role === "USER") ?? [];

 const handleStatusChange = async (user) => {
  const newStatus = user.isActive === "ACTIVE" ? "BLOCKED" : "ACTIVE";

  try {
    await blockOrUnblockUser({ id: user._id, status: newStatus }).unwrap();
    toast.success("Status updated");
  } catch {
    toast.error("Failed to update status");
  }
};

  return (
    <div className="p-4 md:p-6 max-w-[1300px] mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Users</CardTitle>
        </CardHeader>

        {/* Enables horizontal scroll for small screens */}
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <Table className="min-w-[700px] md:min-w-[1200px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px] md:w-[250px]">Name</TableHead>
                  <TableHead className="min-w-[200px] md:w-[280px]">Email</TableHead>
                  <TableHead className="min-w-[120px] md:w-[150px]">Status</TableHead>
                  <TableHead className="min-w-[220px] md:w-[250px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map((user: any) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isActive}</TableCell>

                    <TableCell>
                      {/* Buttons become vertical on small screens */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Button
                          variant="secondary"
                          onClick={() => setViewUser(user)}
                        >
                          View
                        </Button>

                        <Button
  variant={user.isActive === "ACTIVE" ? "destructive" : "default"}
  onClick={() => handleStatusChange(user)}
>
  {user.isActive === "ACTIVE" ? "Block" : "Unblock"}
</Button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View User Modal */}
      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent className="sm:max-w-md w-[90%]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>

          {viewUser && (
            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {viewUser.name}
              </p>
              <p>
                <strong>Email:</strong> {viewUser.email}
              </p>
              <p>
                <strong>Status:</strong> {viewUser.isActive}
              </p>
              <p>
                <strong>Role:</strong> {viewUser.role}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Action Modal */}
      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent className="sm:max-w-sm w-[90%]">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>

          {confirmAction && (
            <div className="space-y-4">
              <p>{confirmAction.message}</p>

              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setConfirmAction(null)}
                >
                  Cancel
                </Button>

                <Button onClick={handleStatusChange}>Yes, Confirm</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
