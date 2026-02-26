import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

export function ErrorDisplay({
  title = "Something went wrong",
  message = "Failed to load data. Please try again.",
  onRetry,
  fullPage = false,
}: ErrorDisplayProps) {
  const containerClasses = fullPage
    ? "min-h-screen flex items-center justify-center bg-gray-50"
    : "py-12";

  return (
    <div className={containerClasses}>
      <div className="text-center max-w-md mx-auto px-4">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-100 p-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No results found",
  message = "We couldn't find any items matching your criteria.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 max-w-md mx-auto px-4">
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
