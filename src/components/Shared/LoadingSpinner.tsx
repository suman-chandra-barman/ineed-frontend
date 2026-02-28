import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({
  message = "Loading...",
  fullPage = false,
}: LoadingSpinnerProps) {
  const containerClasses = fullPage
    ? "min-h-screen flex items-center justify-center bg-gray-50"
    : "py-12 flex items-center justify-center";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        {message && <p className="text-gray-600 text-sm">{message}</p>}
      </div>
    </div>
  );
}
