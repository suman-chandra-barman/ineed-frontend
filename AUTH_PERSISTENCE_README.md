# Authentication Persistence Solution

This solution restores Redux authentication state on page load, preventing users from being logged out when they refresh the page.

## Files Created

1. **`hooks/useAuthRestore.ts`** - Hook that restores auth state from localStorage
2. **`components/AuthProvider.tsx`** - Component that uses the hook and wraps the app

## How It Works

1. When a user logs in, the `setCredentials` action in `authSlice.ts` now automatically saves:
   - User data
   - Access token
   - Refresh token

   to localStorage.

2. When the app loads, the `useAuthRestore` hook:
   - Reads the stored data from localStorage
   - Dispatches `setCredentials` to restore the Redux state
   - Handles errors gracefully by clearing corrupted data

3. When a user logs out, the `logout` action automatically clears all data from localStorage.

## Usage

The `AuthProvider` is already integrated in your `app/layout.tsx`:

```tsx
<StoreProvider>
  <AuthProvider>{children}</AuthProvider>
</StoreProvider>
```

## Alternative: Without Loading Screen

If you don't want the brief loading screen, modify `components/AuthProvider.tsx`:

```tsx
export function AuthProvider({ children }: AuthProviderProps) {
  useAuthRestore(); // Just call the hook, don't use the isRestoring return value
  return <>{children}</>;
}
```

## Using the Hook Directly

You can also use the hook directly in any component:

```tsx
import { useAuthRestore } from "@/hooks/useAuthRestore";

function MyComponent() {
  const { isRestoring } = useAuthRestore();

  if (isRestoring) {
    return <LoadingSpinner />;
  }

  return <div>Your content</div>;
}
```

## Security Considerations

- Tokens are stored in localStorage (accessible via JavaScript)
- For production apps, consider using httpOnly cookies for better security
- Implement token refresh logic to handle expired tokens
- Add token expiration checks before API calls

## Token Refresh (Recommended Enhancement)

To add automatic token refresh, create a new hook in `hooks/useTokenRefresh.ts`:

```tsx
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setCredentials, logout } from "@/redux/features/authSlice";

export function useTokenRefresh() {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);

  useEffect(() => {
    if (!refreshToken) return;

    // Refresh token before it expires (e.g., every 14 minutes if token expires in 15 minutes)
    const interval = setInterval(
      async () => {
        try {
          const response = await fetch("/api/auth/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          const data = await response.json();

          if (data.access) {
            // Update only the access token
            dispatch(
              setCredentials({
                user: data.user,
                tokens: {
                  access: data.access,
                  refresh: refreshToken,
                },
              }),
            );
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          dispatch(logout());
        }
      },
      14 * 60 * 1000,
    ); // 14 minutes

    return () => clearInterval(interval);
  }, [refreshToken, dispatch]);
}
```

## Logout Implementation

To implement logout in any component:

```tsx
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/au";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout()); // This will clear Redux state and localStorage
    router.push("/signin");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```
