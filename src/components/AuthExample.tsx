"use client";

import { useLogout } from "@/hooks/useLogout";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/authSlice";
import { Button } from "@/components/ui/button";

/**
 * Example component showing how to use authentication hooks
 * You can use this as a reference for implementing auth in your components
 */
export function AuthExample() {
  const user = useAppSelector(selectCurrentUser);
  const { logout } = useLogout();

  if (!user) {
    return (
      <div className="p-4">
        <p>Not logged in</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Welcome, {user.full_name}!</h2>
        <p className="text-sm text-gray-600">{user.email_address}</p>
        <p className="text-sm text-gray-600">Role: {user.role}</p>
      </div>

      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}
