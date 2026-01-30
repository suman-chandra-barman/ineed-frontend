import { Check } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface Step {
  id: number;
  label: string;
}

interface BookingSidebarProps {
  serviceName: string;
  servicePrice: number;
  serviceImage: StaticImageData;
  currentStep: number;
  steps: Step[];
  onStepClick: (stepId: number) => void;
}

export default function BookingSidebar({
  serviceName,
  servicePrice,
  serviceImage,
  currentStep,
  steps,
  onStepClick,
}: BookingSidebarProps) {
  return (
    <div className="bg-white rounded-2xl p-4 col-span-1">
      {/* Service Card */}
      <div className="bg-white rounded-xl flex items-center justify-between shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            <Image
              src={serviceImage}
              alt={serviceName}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
              {serviceName}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              A reliable repair service...
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-3xl font-bold text-primary">
            ${servicePrice}
          </span>
          <span className="text-xs text-gray-500">Starting From</span>
        </div>
      </div>

      {/* Booking Checklist */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Booking Checklist
        </h3>
        <div className="space-y-3">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isLocked = step.id > currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (step.id <= currentStep) {
                    onStepClick(step.id);
                  }
                }}
                disabled={isLocked}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all text-left
                  ${
                    isCurrent
                      ? "border-primary bg-blue-50"
                      : isCompleted
                        ? "border-gray-300 bg-white hover:bg-gray-50 cursor-pointer"
                        : "border-gray-200 bg-white cursor-not-allowed"
                  }
                `}
              >
                <div
                  className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center shrink-0
                    ${
                      isCompleted || isCurrent
                        ? "bg-primary border-primary"
                        : "border-gray-300 bg-white"
                    }
                  `}
                >
                  {isCompleted && (
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium flex-1 ${
                    isLocked ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {step.label}
                </span>
                {isLocked && (
                  <svg
                    className="w-4 h-4 text-yellow-500 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking Access Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">
          Booking Access
        </h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          Enter your service location and cleaning details to continue with
          booking.
        </p>
      </div>
    </div>
  );
}
