"use client";

import {
  useState,
  useEffect,
  useSyncExternalStore,
  useLayoutEffect,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  onboardingStep1Schema,
  onboardingStep2Schema,
  onboardingStep3Schema,
  onboardingStep4Schema,
  onboardingStep5Schema,
} from "@/schemas/auth.schema";
import { Check, ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import * as z from "zod";
import { Step1PersonalInfo } from "@/components/onboarding/Step1PersonalInfo";
import { Step2ServiceInfo } from "@/components/onboarding/Step2ServiceInfo";
import { Step3Availability } from "@/components/onboarding/Step3Availability";
import { Step4LegalInfo } from "@/components/onboarding/Step4LegalInfo";
import { Step5Confirmation } from "@/components/onboarding/Step5Confirmation";
import { useRouter } from "next/navigation";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetServiceOptionsQuery,
  useCreateServiceInfoMutation,
  useCreateAvailabilityMutation,
  useCreateW9InfoMutation,
  useSubmitOnboardingMutation,
} from "@/redux/features/onbording/onbordingApi";

type Step = 1 | 2 | 3 | 4 | 5;

// Helper functions for step persistence
const ONBOARDING_STORAGE_KEY = "onboarding_current_step";

const getSavedStep = (): Step => {
  if (typeof window === "undefined") return 1;
  const saved = sessionStorage.getItem(ONBOARDING_STORAGE_KEY);
  if (saved) {
    const step = parseInt(saved, 10);
    if (step >= 1 && step <= 5) return step as Step;
  }
  return 1;
};

const saveStep = (step: Step) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ONBOARDING_STORAGE_KEY, step.toString());
};

const clearSavedStep = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ONBOARDING_STORAGE_KEY);
};

// For detecting client-side rendering
const emptySubscribe = () => () => {};

interface FormData {
  // Step 1: Personal Information
  fullName: string;
  email: string;
  contactNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;

  // Step 2: Service Information
  services: {
    serviceType: string;
    experienceLevel: string;
    shortDescription: string;
  }[];

  // Step 3: Availability
  availableDays: string[];
  availableTimes: string[];

  // Step 4: Legal W-9 Information
  legalName: string;
  businessName: string;
  taxType: string;
  taxId: string;
  w9StreetAddress: string;
  w9City: string;
  w9State: string;
  w9ZipCode: string;

  // Step 5: Confirmation
  acknowledged: boolean;
}

function OnboardingPage() {
  const router = useRouter();

  // Use useSyncExternalStore to safely detect client-side mounting
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Initialize with saved step
  const [currentStep, setCurrentStep] = useState<Step>(() =>
    mounted ? getSavedStep() : 1,
  );

  // Restore step from sessionStorage after hydration
  useLayoutEffect(() => {
    if (mounted) {
      const savedStep = getSavedStep();
      if (savedStep > 1) {
        setCurrentStep((prev) => {
          if (prev !== savedStep) {
            return savedStep;
          }
          return prev;
        });
      }
    }
  }, [mounted]);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    contactNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    services: [
      {
        serviceType: "",
        experienceLevel: "",
        shortDescription: "",
      },
    ],
    availableDays: [],
    availableTimes: [],
    legalName: "",
    businessName: "",
    taxType: "",
    taxId: "",
    w9StreetAddress: "",
    w9City: "",
    w9State: "",
    w9ZipCode: "",
    acknowledged: false,
  });

  // API Hooks
  const { data: profileData } = useGetProfileQuery();
  const { data: serviceOptions } = useGetServiceOptionsQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [createServiceInfo, { isLoading: isCreatingService }] =
    useCreateServiceInfoMutation();
  const [createAvailability, { isLoading: isCreatingAvailability }] =
    useCreateAvailabilityMutation();
  const [createW9Info, { isLoading: isCreatingW9 }] = useCreateW9InfoMutation();
  const [submitOnboarding, { isLoading: isSubmitting }] =
    useSubmitOnboardingMutation();

  // Step 1 Form
  const step1Form = useForm<z.infer<typeof onboardingStep1Schema>>({
    resolver: zodResolver(onboardingStep1Schema),
    mode: "onChange",
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      streetAddress: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    },
  });

  // Step 2 Form
  const step2Form = useForm<z.infer<typeof onboardingStep2Schema>>({
    resolver: zodResolver(onboardingStep2Schema),
    mode: "onChange",
    defaultValues: {
      services: formData.services,
    },
  });

  // Step 3 Form
  const step3Form = useForm<z.infer<typeof onboardingStep3Schema>>({
    resolver: zodResolver(onboardingStep3Schema),
    mode: "onChange",
    defaultValues: {
      availableDays: formData.availableDays,
      availableTimes: formData.availableTimes,
    },
  });

  // Step 4 Form
  const step4Form = useForm<z.infer<typeof onboardingStep4Schema>>({
    resolver: zodResolver(onboardingStep4Schema),
    mode: "onChange",
    defaultValues: {
      legalName: formData.legalName,
      businessName: formData.businessName,
      taxType: formData.taxType,
      taxId: formData.taxId,
      w9StreetAddress: formData.w9StreetAddress,
      w9City: formData.w9City,
      w9State: formData.w9State,
      w9ZipCode: formData.w9ZipCode,
    },
  });

  // Step 5 Form
  const step5Form = useForm<z.infer<typeof onboardingStep5Schema>>({
    resolver: zodResolver(onboardingStep5Schema),
    mode: "onChange",
    defaultValues: {
      acknowledged: formData.acknowledged,
    },
  });

  // Load profile data on mount
  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data;

      // Reset step 1 form with loaded data
      step1Form.reset({
        fullName: profile.full_name || "",
        email: profile.email_address || "",
        contactNumber: profile.contact_number || "",
        streetAddress: profile.street_address || "",
        city: profile.city || "",
        state: profile.state || "",
        zipCode: profile.zip_code || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const getCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return step1Form;
      case 2:
        return step2Form;
      case 3:
        return step3Form;
      case 4:
        return step4Form;
      case 5:
        return step5Form;
      default:
        return step1Form;
    }
  };

  const toggleArrayItem = (
    field: "availableDays" | "availableTimes",
    value: string,
  ) => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    step3Form.setValue(field, newValues, { shouldValidate: true });
    setFormData((prev) => ({
      ...prev,
      [field]: newValues,
    }));
  };

  const handleContinue = async () => {
    const currentForm = getCurrentForm();
    const isValid = await currentForm.trigger();

    if (!isValid) {
      return; // Stop if validation fails
    }

    // Save current step data to formData
    const stepData = currentForm.getValues();
    setFormData((prev) => ({ ...prev, ...stepData }));

    try {
      // Handle API calls based on current step
      if (currentStep === 1) {
        // Step 1: Update profile
        const step1Data = stepData as z.infer<typeof onboardingStep1Schema>;
        await updateProfile({
          full_name: step1Data.fullName,
          contact_number: step1Data.contactNumber,
          street_address: step1Data.streetAddress,
          city: step1Data.city,
          state: step1Data.state,
          zip_code: step1Data.zipCode,
        }).unwrap();

        const nextStep = 2;
        saveStep(nextStep);
        setCurrentStep(nextStep);
      } else if (currentStep === 2) {
        // Step 2: Create service information
        const step2Data = stepData as z.infer<typeof onboardingStep2Schema>;
        const services = step2Data.services.map((service) => ({
          service_id: Number(service.serviceType),
          experience_level: service.experienceLevel,
          short_description: service.shortDescription,
        }));

        await createServiceInfo({ services }).unwrap();

        const nextStep = 3;
        saveStep(nextStep);
        setCurrentStep(nextStep);
      } else if (currentStep === 3) {
        // Step 3: Create availability
        const step3Data = stepData as z.infer<typeof onboardingStep3Schema>;
        const dayMap: { [key: string]: number } = {
          Sunday: 0,
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
        };

        const days = step3Data.availableDays.map((day: string) => ({
          day_of_week: dayMap[day],
          is_active: true,
        }));

        const timeSlotMap: {
          [key: string]: {
            slot_type: string;
            from_time: string;
            to_time: string;
          };
        } = {
          morning: {
            slot_type: "morning",
            from_time: "08:00:00",
            to_time: "12:00:00",
          },
          afternoon: {
            slot_type: "afternoon",
            from_time: "12:00:00",
            to_time: "16:00:00",
          },
          evening: {
            slot_type: "evening",
            from_time: "16:00:00",
            to_time: "23:59:59",
          },
        };

        const slots = step3Data.availableDays.flatMap((day: string) =>
          step3Data.availableTimes.map((time: string) => ({
            day_of_week: dayMap[day],
            ...timeSlotMap[time],
            is_active: true,
          })),
        );

        await createAvailability({ days, slots }).unwrap();

        const nextStep = 4;
        saveStep(nextStep);
        setCurrentStep(nextStep);
      } else if (currentStep === 4) {
        // Step 4: Create W-9 information
        const step4Data = stepData as z.infer<typeof onboardingStep4Schema>;
        await createW9Info({
          legal_name: step4Data.legalName,
          business_name: step4Data.businessName || "",
          tax_type: step4Data.taxType,
          ssn_or_ein: step4Data.taxId,
          street_address: step4Data.w9StreetAddress,
          city: step4Data.w9City,
          state: step4Data.w9State,
          zip_code: step4Data.w9ZipCode,
        }).unwrap();

        const nextStep = 5 as Step;
        saveStep(nextStep);
        setCurrentStep(nextStep);
      } else if (currentStep === 5) {
        // Step 5: Submit onboarding
        const step5Data = stepData as z.infer<typeof onboardingStep5Schema>;
        await submitOnboarding({
          is_agreed: step5Data.acknowledged,
        }).unwrap();

        // Clear saved step when onboarding is completed
        clearSavedStep();

        // Navigate to home page after successful submission
        router.push("/");
      }
    } catch (error: unknown) {
      console.error("Onboarding error:", error);
      const apiError = error as { data?: { message?: string } };
      alert(apiError?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Personal Information";
      case 2:
        return "Service Information";
      case 3:
        return "Availability";
      case 4:
        return "Provider Payment Setup";
      case 5:
        return "Review & Confirmation";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Tell us a little about yourself so we can set up your provider profile.";
      case 2:
        return "Add one or more services so clients can match you with the right jobs.";
      case 3:
        return "Let us know when you're available so we can assign suitable jobs.";
      case 4:
        return "To receive payments through iNeed, providers are asked to complete a brief payment setup, including standard tax information required for independent contractors. This information is securely stored and used only for reporting and payout purposes.";
      case 5:
        return "Please review your information before submitting.";
      default:
        return "";
    }
  };

  return (
    <main className="min-h-screen lg:h-screen flex flex-col lg:flex-row p-4 gap-4 lg:overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 lg:shrink-0 bg-primary/15 p-6 lg:p-8 flex flex-col rounded-2xl lg:fixed lg:left-4 lg:top-4 lg:bottom-4 lg:overflow-y-auto">
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="iNeed Logo" />
          </div>
        </div>

        {/* Steps */}
        <nav className="flex-1 space-y-0">
          {[
            { number: 1, title: "Personal Information" },
            { number: 2, title: "Service Information" },
            { number: 3, title: "Availability" },
            { number: 4, title: "Legal W-9 Information" },
            {
              number: 5,
              title:
                currentStep === 5 ? "Confirmation" : "Review & Confirmation",
            },
          ].map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isAccessible = step.number <= currentStep;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => {
                  if (isAccessible) {
                    setCurrentStep(step.number as Step);
                  }
                }}
                disabled={!isAccessible}
                className="flex items-start w-full text-left transition-opacity hover:opacity-80 disabled:cursor-not-allowed"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold text-sm lg:text-base transition-colors ${
                      isCompleted
                        ? "bg-primary text-white"
                        : isCurrent
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-primary/20 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < 4 && (
                    <div
                      className={`w-0.5 h-12 lg:h-16 my-1 ${
                        isCompleted ? "bg-primary" : "bg-primary/20"
                      }`}
                    />
                  )}
                </div>
                <div className="ml-3 lg:ml-4 mt-2">
                  <p
                    className={`font-medium text-xs lg:text-sm ${
                      isAccessible ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center p-4 lg:p-12 lg:ml-88 lg:overflow-y-auto lg:h-[calc(100vh-2rem)]">
        <div className="w-full max-w-2xl">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-sm lg:text-base text-slate-600">
              {getStepDescription()}
            </p>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && <Step1PersonalInfo form={step1Form} />}

          {/* Step 2: Service Information */}
          {currentStep === 2 && (
            <Step2ServiceInfo
              form={step2Form}
              serviceOptions={serviceOptions}
            />
          )}

          {/* Step 3: Availability */}
          {currentStep === 3 && (
            <Step3Availability
              form={step3Form}
              toggleArrayItem={toggleArrayItem}
            />
          )}

          {/* Step 4: Legal W-9 Information */}
          {currentStep === 4 && <Step4LegalInfo form={step4Form} />}

          {/* Step 5: Review & Confirmation */}
          {currentStep === 5 && <Step5Confirmation form={step5Form} />}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 lg:mt-12">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={
                currentStep === 1 ||
                isUpdatingProfile ||
                isCreatingService ||
                isCreatingAvailability ||
                isCreatingW9 ||
                isSubmitting
              }
              className="px-6 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleContinue}
              disabled={
                !getCurrentForm().formState.isValid ||
                isUpdatingProfile ||
                isCreatingService ||
                isCreatingAvailability ||
                isCreatingW9 ||
                isSubmitting
              }
              className="px-8 w-full sm:w-auto"
            >
              {isUpdatingProfile ||
              isCreatingService ||
              isCreatingAvailability ||
              isCreatingW9 ||
              isSubmitting ? (
                "Loading..."
              ) : (
                <>
                  {currentStep === 5 ? "Submit" : "Continue"}
                  {currentStep < 5 && <ChevronRight className="w-4 h-4 ml-2" />}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OnboardingPage;
