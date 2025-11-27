import { useState } from "react";
import {
  useGetAllTransactionsQuery,
  useDeleteTransactionMutation,
} from "@/redux/features/transaction/transaction.api";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";

import { DeleteConfirmation } from "@/components/DeleteConfirmation";

export default function AllTransactionsTable() {
  // Filters & pagination
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [type, setType] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
const [search, setSearch] = useState<string>("");
const toast: { success: (msg: string) => void; error: (msg: string) => void } = {
  success: (msg: string) => {
    // fallback: log to console (replace with real toast library if available)
    console.log("Success:", msg);
  },
  error: (msg: string) => {
    console.error("Error:", msg);
  },
};

// API Calls
  const { data, isLoading, isFetching } = useGetAllTransactionsQuery({
    page,
    limit,
    type,
    status,
    search,
  });

  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();

  const transactions = data?.data || [];
  const pagination = data?.pagination;

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id).unwrap();
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction!");
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search transaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          onValueChange={(value) =>
            setType(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>Type</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="CASH_IN">Cash In</SelectItem>
            <SelectItem value="CASH_OUT">Cash Out</SelectItem>
            <SelectItem value="DEPOSIT">Deposit Money</SelectItem>
            <SelectItem value="WITHDRAW">Withdraw Money</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setStatus(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>Status</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="secondary"
          onClick={() => {
            setType(undefined);
            setStatus(undefined);
            setSearch("");
          }}
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableCaption>All Transactions</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading || isFetching ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Loader2 className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx._id}>
                  <TableCell>{tx._id.slice(-6).toUpperCase()}</TableCell>
                  <TableCell className="capitalize">{tx.type}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.fee}</TableCell>
                  <TableCell className="capitalize">{tx.status}</TableCell>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Delete Action */}
                  <TableCell>
                    <DeleteConfirmation onConfirm={() => handleDelete(tx._id)}>
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Trash size={16} />
                        )}
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          <p>
            Page {pagination.page} of{" "}
            {Math.ceil(pagination.total / pagination.limit)}
          </p>

          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={transactions.length < limit}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
