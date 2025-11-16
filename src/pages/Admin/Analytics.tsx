import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import axios from "axios";

export default function Analytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/user/admin-analytics");
      setData(res.data.data);
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 grid gap-6">
      <div className="grid grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Total Users</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{data.totalUsers}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Total Agents</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{data.totalAgents}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Transactions</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{data.totalTransactions}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Volume</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">৳ {data.totalVolume}</p></CardContent></Card>
      </div>

 
      <Card>
        <CardHeader><CardTitle>Transactions Over Time</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.transactionsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="volume" stroke="#8884d8" />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
