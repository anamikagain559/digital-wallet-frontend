

import { Card, CardContent } from "@/components/ui/card";

export default function AgentDashboard() {


  return (
    <div className="flex w-full min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white">
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-2xl shadow">
            <CardContent className="p-4 text-center">
              <h2 className="text-xl font-semibold">Total Cash In</h2>
              <p className="text-3xl font-bold mt-2">৳ 85,000</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow">
            <CardContent className="p-4 text-center">
              <h2 className="text-xl font-semibold">Total Cash Out</h2>
              <p className="text-3xl font-bold mt-2">৳ 40,000</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow">
            <CardContent className="p-4 text-center">
              <h2 className="text-xl font-semibold">Commission Earned</h2>
              <p className="text-3xl font-bold mt-2">৳ 12,500</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="rounded-2xl shadow">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-300 dark:border-zinc-700 text-sm text-gray-600 dark:text-gray-300">
                  <th className="py-2">User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800">
                  <td className="py-3">Rahim</td>
                  <td>Cash In</td>
                  <td>৳ 2,000</td>
                  <td>2025-11-13</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800">
                  <td className="py-3">Karim</td>
                  <td>Withdraw</td>
                  <td>৳ 500</td>
                  <td>2025-11-10</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
