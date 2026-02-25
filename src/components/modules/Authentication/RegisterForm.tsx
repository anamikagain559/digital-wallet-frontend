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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import {  toast } from "react-hot-toast";
const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name is too short",
      })
      .max(50),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("User created successfully");
     navigate("/verify", { state: userInfo.email });
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div
    className={cn(
      "w-full max-w-md mx-auto bg-white/70 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl p-8 space-y-8",
      className
    )}
    {...props}
  >
    {/* Header */}
    <div className="text-center space-y-1">
      <h1 className="text-3xl font-bold text-blue-900">Create Your PocketBD Account</h1>
      <p className="text-sm text-gray-600">
        Quick and secure — get started in less than a minute
      </p>
    </div>

    {/* Form */}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700">Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@example.com"
                  type="email"
                  className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                  {...field}
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
                <Password
                  className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700">Confirm Password</FormLabel>
              <FormControl>
                <Password
                  className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 rounded-lg text-base bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Create Account
        </Button>
      </form>
    </Form>

    {/* Divider */}
    <div className="relative my-2 text-center">
      <span className="relative z-10 bg-white/70 px-3 text-sm text-gray-600">
        Or continue with
      </span>
      <div className="absolute inset-0 top-1/2 border-t border-gray-300"></div>
    </div>

    {/* Google login placeholder */}
    <div className="flex justify-center">
      <Button
        variant="outline"
        className="w-full h-11 rounded-lg border-gray-300 hover:bg-gray-100"
      >
        Continue with Google
      </Button>
    </div>

    {/* Footer */}
    <div className="text-center text-sm">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-blue-600 font-medium hover:underline"
      >
        Login
      </Link>
    </div>
  </div>
);


}