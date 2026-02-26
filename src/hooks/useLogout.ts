"use client";

import { useAppDispatch } from "@/redux/hooks";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook to handle user logout
 * Clears Redux state, localStorage, and redirects to signin page
 */
export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = useCallback(
    (redirectTo: string = "/signin") => {
      // Clear Redux state and localStorage
      dispatch(logoutAction());

      // Redirect to signin or specified page
      router.push(redirectTo);
    },
    [dispatch, router],
  );

  return { logout };
}
