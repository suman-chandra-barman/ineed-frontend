interface ApiError {
  data?: {
    message?: string;
    detail?: string;
  };
}

const AUTH_CREDENTIALS_MISSING_MESSAGE =
  "Authentication credentials were not provided.";

export const getErrorMessage = (error: unknown, fallback: string): string => {
  const apiError = error as ApiError;
  return apiError?.data?.message || apiError?.data?.detail || fallback;
};

export const redirectToSigninOnAuthError = (
  error: unknown,
  onRedirect: () => void,
): boolean => {
  const apiError = error as ApiError;

  if (apiError?.data?.message === AUTH_CREDENTIALS_MISSING_MESSAGE) {
    onRedirect();
    return true;
  }

  return false;
};
