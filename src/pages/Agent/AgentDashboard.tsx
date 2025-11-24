// AgentOverview.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentOverviewQuery } from "@/redux/features/agent/agentApi"; // RTK Query API slice
import { Skeleton } from "@/components/ui/skeleton"; // optional skeleton for loading

const AgentDashboard: React.FC = () => {
  const { data, isLoading, isError, error } = useGetAgentOverviewQuery(undefined);

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
    return <p className="text-red-500 text-center">Error loading overview: {(error as any)?.data?.message || "Unknown error"}</p>;
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
    </div>
  );
};

export default AgentDashboard;
