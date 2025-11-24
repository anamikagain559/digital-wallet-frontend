import { useState } from "react";
import { useGetAgentTransactionsQuery } from "@/redux/features/agent/agentApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Transactions() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    q: "",
    type: "",
  });

  const { data, isLoading } = useGetAgentTransactionsQuery(filters);

  return (
    <div className="w-full max-w-7xl mx-auto px-5 my-8">
      <h1 className="text-xl font-semibold mb-4">All Transactions</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search by user..."
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          className="w-60"
        />

        <Select onValueChange={(v) => setFilters({ ...filters, type: v })}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="cashin">Cash In</SelectItem>
            <SelectItem value="cashout">Cash Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.transactions?.map((tx: any) => (
              <TableRow key={tx._id}>
                <TableCell>{tx.userName}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.amount}৳</TableCell>
                <TableCell>{tx.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
