import { useTransferMutation } from "@/redux/features/wallet/wallet.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

// ✅ validation schema
const transferSchema = z.object({
  toUserId: z.string().min(1, "Receiver ID is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
});

type TransferFormValues = z.infer<typeof transferSchema>;

export default function Send() {
  const [transfer] = useTransferMutation();

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { toUserId: "", amount: 0 },
  });

  const onSubmit = async (values: TransferFormValues) => {
    try {
      await transfer(values).unwrap();
      toast.success("Money sent successfully ✅");
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send money ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 space-y-4">
      <h1 className="text-xl font-bold">Send Money</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="toUserId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver User ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter receiver's user ID" {...field} />
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
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send Money
          </Button>
        </form>
      </Form>
    </div>
  );
}
