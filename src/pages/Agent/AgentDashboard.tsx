// AgentOverview.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentOverviewQuery } from "@/redux/features/agent/agentApi"; // RTK Query API slice
import { Skeleton } from "@/components/ui/skeleton"; // optional skeleton for loading
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
const AgentDashboard: React.FC = () => {
  const { data, isLoading, isError, error } = useGetAgentOverviewQuery(undefined);
  const { data: transactions, isLoading: loadingTx } = useGetMyTransactionsQuery({ page: 1, limit: 5 });
  if (isLoading) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
    );
  }

  if (isError) {
    type ApiError = { data?: { message?: string }; message?: string } | undefined;
    const errMsg = (error as ApiError)?.data?.message ?? (error as ApiError)?.message ?? "Unknown error";
    return <p className="text-red-500 text-center">Error loading overview: {errMsg}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold">${data?.walletBalance?.toFixed(2) ?? 0}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Cash In</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold">${data?.totalCashIn?.toFixed(2) ?? 0}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Cash Out</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold">${data?.totalCashOut?.toFixed(2) ?? 0}</p>
        </CardContent>
      </Card>

        <Card className="border rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingTx ? (
            <p>Loading...</p>
          ) : transactions?.data?.length ? (
            <div className="space-y-3">
              {transactions.data.slice(0, 5).map((tx) => (
                <div
                  key={tx._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      tx.type === "DEPOSIT" || tx.type === "AGENT_CASH_IN"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ৳ {tx.amount}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No transactions found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
