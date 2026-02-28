/**
 * Centralized exports for all authentication hooks
 * Import from this file to access auth functionality throughout the app
 *
 * @example
 * import { useAuthRestore, useLogout } from "@/hooks/auth";
 */

export { useAuthRestore } from "./useAuthRestore";
export { useLogout } from "./useLogout";

// Re-export Redux hooks for convenience
export { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Re-export auth selectors
export {
  selectCurrentUser,
  selectCurrentToken,
  setCredentials,
  logout,
  updateUser,
} from "@/redux/features/auth/authSlice";
