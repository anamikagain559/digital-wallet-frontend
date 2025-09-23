import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function Profile() {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-[300px] h-[200px] rounded-xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  const user = data?.data;

  return (
    <div className="flex justify-center p-6">
      <Card className="w-[400px]">
        <CardHeader>
          <div className="flex items-center gap-4">
           
            <CardTitle>{user?.name ?? "Unnamed User"}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user?.role}
          </p>
          <p>
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
