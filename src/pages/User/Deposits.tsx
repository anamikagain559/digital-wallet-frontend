import { useDepositMutation } from "@/redux/features/wallet/wallet.api";
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
import { toast } from "react-hot-toast";
import {  useForm } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";

const MIN_TOPUP_AMOUNT = 100; // make sure it matches your backend

export default function Deposit({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { data: userInfo, isLoading: userLoading } = useUserInfoQuery(undefined);
  const [deposit] = useDepositMutation();

  const form = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const amount = Number(values.amount);
    if (!userInfo?.data?._id) {
      toast.error("User not found");
      return;
    }
    if (amount < MIN_TOPUP_AMOUNT) {
      toast.error(`Minimum deposit is ${MIN_TOPUP_AMOUNT}`);
      return;
    }

    try {
      await deposit({ amount }).unwrap();
      toast.success("Deposit successful ✅");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Deposit failed ❌");
    }
  };

  if (userLoading) return <p>Loading user...</p>;

  return (
    <div className={cn("max-w-md mx-auto p-5 space-y-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Wallet Deposit</h1>
        <p className="text-sm text-muted-foreground">
          Enter the amount you want to deposit
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`Minimum ${MIN_TOPUP_AMOUNT}`}
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
            disabled={Number(form.watch("amount")) < MIN_TOPUP_AMOUNT}
          >
            Deposit
          </Button>
        </form>
      </Form>
    </div>
  );
}
