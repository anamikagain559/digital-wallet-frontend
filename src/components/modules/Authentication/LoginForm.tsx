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
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "super@gmail.com",
      password: "12345678",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err) {
      console.error(err);

      type ApiError = { data?: { message?: string }; message?: string };
      const error = err as ApiError;
      const message = error.data?.message ?? error.message ?? String(err);

      if (message === "Password does not match") {
        toast.error("Invalid credentials");
      }

      if (message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.email });
      }
    }
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-6",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Welcome Back</h1>
        <p className="text-sm text-gray-600">
          Login to access your PocketBD wallet
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    className="h-11 rounded-lg border-gray-300 
                    focus:ring-2 focus:ring-blue-500"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    className="h-11 rounded-lg border-gray-300 
                    focus:ring-2 focus:ring-blue-500"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 rounded-lg text-base bg-blue-600 
            hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative my-2 text-center">
        <span className="relative z-10 bg-white px-3 text-sm text-gray-600">
          Or continue with
        </span>
        <div className="absolute inset-0 top-1/2 border-t border-gray-300"></div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 font-medium hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
