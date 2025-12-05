import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetAdminOverviewQuery } from "@/redux/features/user/user.api";

export default function AdminOverview() {
  const { data, isLoading } = useGetAdminOverviewQuery({});

  if (isLoading) return <p>Loading...</p>;

  const overviewItems = [
    { title: "Users", value: data?.data.totalUsers },
    { title: "Agents", value: data?.data.totalAgents },
    { title: "Transactions", value: data?.data.totalTransactions },
    { title: "Volume", value: data?.data.totalVolume },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewItems.map((item) => (
        <Card key={item.title} className="border border-gray-200 shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
