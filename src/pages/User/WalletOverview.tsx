import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { ArrowDown, ArrowUp, Send, Wallet, } from "lucide-react";
import { Link } from "react-router";
const WalletOverview = () => {
  const { data: overview, isLoading: loadingOverview } = useGetWalletQuery(undefined);
  const { data: transactions, isLoading: loadingTx } = useGetMyTransactionsQuery({ page: 1, limit: 5 });

  const wallet = overview?.data;

  return (
    <div className="space-y-6 p-4">
      
      {/* Wallet Balance */}
      <Card className="border rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Wallet /> Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingOverview ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h2 className="text-4xl font-bold">৳ {wallet?.balance || 0}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Status: {wallet?.status}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
    <Card className="border rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">

          <div className="flex flex-col items-center">
            <Link to="/user/deposits">
              <Button className="rounded-full p-4">
                <ArrowDown className="h-6 w-6" />
              </Button>
            </Link>
            <span className="text-sm mt-2">Deposits</span>
          </div>

          <div className="flex flex-col items-center">
            <Link to="/user/withdraw">
              <Button className="rounded-full p-4">
                <ArrowUp className="h-6 w-6" />
              </Button>
            </Link>
            <span className="text-sm mt-2">Withdraw</span>
          </div>

          <div className="flex flex-col items-center">
            <Link to="/user/send">
              <Button className="rounded-full p-4">
                <Send className="h-6 w-6" />
              </Button>
            </Link>
            <span className="text-sm mt-2">Send</span>
          </div>

        </div>
      </CardContent>
    </Card>

      {/* Recent Transactions */}
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

export default WalletOverview;
