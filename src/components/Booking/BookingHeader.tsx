import { ArrowLeft } from "lucide-react";

interface BookingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export default function BookingHeader({
  currentStep,
  totalSteps,
  onBack,
}: BookingHeaderProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
