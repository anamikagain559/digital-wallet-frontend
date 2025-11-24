// WithdrawMoney.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAgentCashOutMutation } from "@/redux/features/agent/agentApi";

interface WithdrawMoneyProps {
  agentId: string;
  userId: string;
  balance?: number; // make optional in case it's undefined initially
}

const WithdrawMoney: React.FC<WithdrawMoneyProps> = ({
  agentId,
  userId,
  balance = 0, // default to 0 if undefined
}) => {
  const [amount, setAmount] = useState<number | "">("");

  const [agentCashOut, { isLoading }] = useAgentCashOutMutation();

  const handleWithdraw = async () => {
    if (amount === "" || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (amount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      await agentCashOut({ agentId, userId, amount: Number(amount) }).unwrap();
      toast.success(`Successfully withdrawn $${amount}`);
      setAmount("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Withdraw Money</h2>
      <p>Available Balance: ${balance.toFixed(2)}</p>
      <Input
        type="number"
        placeholder="Enter amount"
        value={amount === "" ? "" : amount}
        onChange={(e) => {
          const value = e.target.value;
          setAmount(value === "" ? "" : Number(value));
        }}
        disabled={isLoading}
      />
      <Button onClick={handleWithdraw} className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Withdraw"}
      </Button>
    </div>
  );
};

export default WithdrawMoney;
