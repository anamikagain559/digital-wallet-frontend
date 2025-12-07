import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useUserInfoQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/auth.api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();

  const {
    data,
    refetch,
    isLoading,
    isError,
  } = useUserInfoQuery(undefined);

  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const user = data?.data ?? null;

  // Local form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Populate form when data loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Handle update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error("User ID not found.");
      return;
    }

    try {
      await updateUser({
        id: user._id,
        data: {
          name,
          email,
        },
      }).unwrap();
console.log("Profile updated:", { name, email });
      // Fetch updated info
      await refetch();

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-[300px] h-[200px] rounded-xl" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Profile Details */}
          <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg border">
            <p>
              <span className="font-semibold">Name:</span> {user?.name}
            </p>

            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>

            <p>
              <span className="font-semibold">Role:</span> {user?.role}
            </p>

            <p>
              <span className="font-semibold">Joined:</span>{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Update your name"
              />
            </div>

            <div className="space-y-1">
              <Label>Emaill <span className="text-gray-500 text-xs"> (email - can not update)</span></Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Update your email"
              />
            </div>

            <Button className="w-full mt-2" disabled={updating}>
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </form>

          {/* Change Password */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/agent/change-password")}
          >
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
