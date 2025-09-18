import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUserQuery } from "@/redux/features/user/user.api";
import { Trash2 } from "lucide-react";

function ManageUser() {
  const { data, isLoading, error } = useGetAllUserQuery(undefined);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load users.</p>;
  }
  const handleDeleteUser = (userId: string) => {
    console.log("Deleting user:", userId);
    // call your delete API here (mutation)
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Manage Users</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { _id: string; name: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell className="text-right">
                  <DeleteConfirmation onConfirm={() => handleDeleteUser(item?._id)}>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  </DeleteConfirmation>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ManageUser;
