import { useState } from "react";
import { useDepositMutation } from "@/redux/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const MIN_TOPUP_AMOUNT = 100; // Make sure this matches your backend constant

export default function WalletPage() {
  const { data: userInfo, isLoading: userLoading } = useUserInfoQuery(undefined);
  const [deposit] = useDepositMutation();
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    const numAmount = Number(amount);
    if (!userInfo?.data?._id) {
      alert("User not found");
      return;
    }
    if (numAmount < MIN_TOPUP_AMOUNT) {
      alert(`Minimum deposit is ${MIN_TOPUP_AMOUNT}`);
      return;
    }

    try {
      await deposit({ amount: numAmount }).unwrap();
      alert("Deposit successful ✅");
      setAmount("");
    } catch (error: any) {
      alert(error?.data?.message || "Deposit failed ❌");
    }
  };

  if (userLoading) return <p>Loading user...</p>;

  return (
    <div className="max-w-md mx-auto p-5 space-y-4">
      <h1 className="text-xl font-bold">Wallet Deposit</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={`Enter amount (min ${MIN_TOPUP_AMOUNT})`}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleDeposit}
        className={`px-4 py-2 rounded text-white ${
          Number(amount) < MIN_TOPUP_AMOUNT
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={Number(amount) < MIN_TOPUP_AMOUNT}
      >
        Deposit
      </button>
    </div>
  );
}
