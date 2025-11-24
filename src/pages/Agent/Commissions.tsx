
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommissionRecord {
  id: string;
  date: string;
  amount: number;
  source: string;
}

const mockData: CommissionRecord[] = [
  { id: "1", date: "2025-02-10", amount: 500, source: "Cash Out" },
  { id: "2", date: "2025-02-12", amount: 300, source: "Send Money" },
  { id: "3", date: "2025-02-15", amount: 700, source: "Mobile Recharge" },
];

export default function Commission() {
  return (
    <div className="p-6">
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Commission History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-4 font-semibold py-2 border-b">
            <span>Date</span>
            <span>Source</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Action</span>
          </div>

          {mockData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 py-3 border-b text-sm items-center"
            >
              <span>{item.date}</span>
              <span>{item.source}</span>
              <span className="text-right">৳{item.amount}</span>
              <span className="text-right text-blue-600 cursor-pointer hover:underline">View</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
