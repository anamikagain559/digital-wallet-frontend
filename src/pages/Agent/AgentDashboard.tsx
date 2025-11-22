import { useState } from "react";
import { NavLink } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, User, Menu, LogOut, BarChart, History } from "lucide-react";

export default function AgentDashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex w-full min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className={`${open ? "w-64" : "w-20"} h-screen bg-white dark:bg-zinc-800 shadow-lg p-4 transition-all duration-300 sticky top-0`}> 
        <button className="mb-6" onClick={() => setOpen(!open)}>
          <Menu />
        </button>
        <nav className="space-y-3">
          <NavLink className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700" to="/agent/dashboard">
            <BarChart /> {open && "Dashboard"}
          </NavLink>
          <NavLink className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700" to="/agent/add-money">
            <DollarSign /> {open && "Add Money"}
          </NavLink>
          <NavLink className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700" to="/agent/withdraw">
            <History /> {open && "Withdraw"}
          </NavLink>
          <NavLink className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700" to="/agent/transactions">
            <History /> {open && "Transactions"}
          </NavLink>
          <NavLink className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700" to="/agent/profile">
            <User /> {open && "Profile"}
          </NavLink>
        </nav>
        <div className="absolute bottom-6 left-4">
          <Button variant="destructive" className="flex items-center gap-2"><LogOut /> {open && "Logout"}</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Stats */}
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
