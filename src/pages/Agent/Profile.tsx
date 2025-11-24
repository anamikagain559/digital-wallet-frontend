import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentProfileQuery, useUpdateAgentProfileMutation } from "@/redux/features/agent/agentApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const { data, isLoading } = useGetAgentProfileQuery(undefined);
  const [updateProfile, { isLoading: updating }] = useUpdateAgentProfileMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: ""
    }
  });

  // 👉 Load previous data automatically
  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        phone: data?.phone,
        email: data?.email,
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: any) => {
    try {
      await updateProfile(values).unwrap();
      toast.success("Profile updated successfully");
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to update");
    }
  };

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Agent Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              {...register("name")}
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input
              {...register("phone")}
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              {...register("email")}
              disabled
              className="bg-gray-100"
            />
          </div>

          <Button disabled={updating} className="w-full mt-4">
            {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
