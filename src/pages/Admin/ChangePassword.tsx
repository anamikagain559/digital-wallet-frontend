import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [resetPassword, { isLoading }] = useChangePasswordMutation();

  const getErrorMessage = (err: unknown) => {
    if (typeof err === "string") return err;
    if (err && typeof err === "object") {
      const e = err as Record<string, unknown>;
      const data = e.data as Record<string, unknown> | undefined;
      if (data && typeof data.message === "string") return data.message;
      if (typeof e.message === "string") return e.message;
    }
    return "Failed to change password";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      await resetPassword({ oldPassword, newPassword }).unwrap();

      toast.success("Password changed successfully!");
      navigate("/admin/profile");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Change Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Old Password</Label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
              />
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <Button className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
