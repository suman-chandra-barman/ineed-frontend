"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";

/**
 * Hook to restore authentication state from localStorage on app initialization
 * This solves the issue of Redux store being reset on page refresh
 */
export function useAuthRestore() {
  const dispatch = useAppDispatch();
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const restoreAuth = () => {
      try {
        // Check if we're in the browser
        if (typeof window === "undefined") {
          setIsRestoring(false);
          return;
        }

        // Get stored auth data from localStorage
        const storedUser = localStorage.getItem("user");
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        // If we have all required data, restore the auth state
        if (storedUser && storedAccessToken && storedRefreshToken) {
          const user = JSON.parse(storedUser);

          dispatch(
            setCredentials({
              user,
              tokens: {
                access: storedAccessToken,
                refresh: storedRefreshToken,
              },
            }),
          );
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error);
        // Clear corrupted data
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setIsRestoring(false);
      }
    };

    restoreAuth();
  }, [dispatch]);

  return { isRestoring };
}
