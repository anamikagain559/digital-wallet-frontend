import { useAgentCashOutMutation } from "@/redux/features/agent/agentApi";
import { useGetWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { useForm, Controller } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";

const MIN_CASHIN_AMOUNT = 50;

export default function CashOut({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { data } = useUserInfoQuery(undefined);

  const currentUserId = data?.data?._id;
  console.log("Current User ID:", currentUserId);
  const { data: walletData, isLoading: walletLoading, refetch } = useGetWalletQuery(undefined);
  const balance = walletData?.data?.balance || 0;

  const [agentCashOut] = useAgentCashOutMutation();

  const form = useForm({
    defaultValues: {
      userId: "",
      amount: "",
      agentId: currentUserId || "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const amount = Number(values.amount);
    const userId = values.userId || "";

    if (!userId) {
      toast.error("Please enter a User ID");
      return;
    }

    if (amount < MIN_CASHIN_AMOUNT) {
      toast.error(`Minimum cash-in is ${MIN_CASHIN_AMOUNT}`);
      return;
    }

    try {
      await agentCashOut({ amount, userId ,agentId: currentUserId,}).unwrap();
      toast.success("Cash out successful ✅");
      form.reset();
      refetch(); 
    } catch (err: any) {
      toast.error(err?.data?.message || "Cash out failed ❌");
    }
  };

  return (
    <div className={cn("max-w-md mx-auto p-5 space-y-6", className)}>
      {/* Sonner Toaster */}
      <Toaster position="top-right" />

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Agent Cash In</h1>
        {walletLoading ? (
          <p>Loading balance...</p>
        ) : (
          <p className="text-sm text-muted-foreground">Available Balance: ${balance.toFixed(2)}</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Controller
                    name="userId"
                    control={form.control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter User ID" />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`Minimum ${MIN_CASHIN_AMOUNT}`}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={Number(form.watch("amount")) < MIN_CASHIN_AMOUNT || !form.watch("userId")}
          >
            Cash In
          </Button>
        </form>
      </Form>
    </div>
  );
}

