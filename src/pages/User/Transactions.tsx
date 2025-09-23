
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

export default function Transactions() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  const { data, isLoading } = useGetMyTransactionsQuery({ page, limit: 5, type, startDate, endDate });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Transaction History</h1>

      {/* Filters */}
      <div className="flex gap-2">
   <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a transaction type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deposit">Deposit</SelectItem>
          <SelectItem value="withdraw">Withdraw</SelectItem>
          <SelectItem value="transfer">Transfer</SelectItem>
        </SelectContent>
      </Select>
        <Input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
        <Button onClick={() => setPage(1)}>Filter</Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((tx) => (
            <TableRow key={tx._id}>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.fee}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
        <span>
          Page {data?.page} of {Math.ceil((data?.total ?? 0) / (data?.limit ?? 5))}
        </span>
        <Button disabled={page * (data?.limit || 5) >= (data?.total || 0)} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
