import { useState } from "react";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function AllTransactionsTable() {
  // Filters & pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [type, setType] = useState();
  const [status, setStatus] = useState();
  const [search, setSearch] = useState("");

  // Fetch all transactions from RTK Query
  const { data, isLoading, isFetching } = useGetAllTransactionsQuery({
    page,
    limit,
    type,
    status,
    search,
  });

  const transactions = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="p-6 space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search transaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
{/* 
        <Select onValueChange={(value) => setType(value === "all" ? undefined : value)}>
          <SelectTrigger>Type</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="cash-in">Cash In</SelectItem>
            <SelectItem value="cash-out">Cash Out</SelectItem>
            <SelectItem value="send-money">Send Money</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setStatus(value === "all" ? undefined : value)}>
          <SelectTrigger>Status</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select> */}

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
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading || isFetching ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
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
                  <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
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
            Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
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
