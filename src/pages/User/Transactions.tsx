import { useState, useEffect } from "react";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { Transaction } from "@/redux/features/transaction/transaction.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export default function Transactions() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const { data, isLoading } = useGetMyTransactionsQuery({
    page,
    limit,
    type: typeFilter,
    startDate,
    endDate,
  });

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [typeFilter, startDate, endDate, search]);

  if (isLoading) return <p>Loading...</p>;
  if (!data || !data.data.length) return <p>No transactions found</p>;

  const total = data.pagination.total;
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  // Client-side search filter
  let filtered = data.data;
  if (search) {
    filtered = filtered.filter((t) =>
      t.description?.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex gap-2">
        <Input
          placeholder="Search description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deposit">Deposit</SelectItem>
            <SelectItem value="withdraw">Withdraw</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start date"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End date"
        />
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Fee</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t: Transaction) => (
            <tr key={t._id}>
              <td className="p-2 border">{t.type}</td>
              <td className="p-2 border">{t.amount}</td>
              <td className="p-2 border">{t.fee}</td>
              <td className="p-2 border">{t.status}</td>
              <td className="p-2 border">{t.description || "-"}</td>
              <td className="p-2 border">
                {format(new Date(t.createdAt), "PPpp")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <p>
          Page {page} of {totalPages}
        </p>
        <Button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
