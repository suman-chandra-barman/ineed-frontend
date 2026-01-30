"use client";

import { useState } from "react";
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
import { Step1PersonalInfo } from "@/components/Onboarding/Step1PersonalInfo";
import { Step2ServiceInfo } from "@/components/Onboarding/Step2ServiceInfo";
import { Step3Availability } from "@/components/Onboarding/Step3Availability";
import { Step4LegalInfo } from "@/components/Onboarding/Step4LegalInfo";
import { Step5Confirmation } from "@/components/Onboarding/Step5Confirmation";

type Step = 1 | 2 | 3 | 4 | 5;

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
  serviceType: string;
  experienceLevel: string;
  shortDescription: string;

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
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    contactNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    serviceType: "",
    experienceLevel: "",
    shortDescription: "",
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
      serviceType: formData.serviceType,
      experienceLevel: formData.experienceLevel,
      shortDescription: formData.shortDescription,
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

    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step);
    } else {
      // Handle final submission
      console.log("Form submitted:", { ...formData, ...stepData });
      // Add your submission logic here
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
        return "Confirm your service details to receive cleaning jobs through our platform.";
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
    <main className="min-h-screen flex flex-col lg:flex-row p-4 gap-4">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-primary/15 p-6 lg:p-8 flex flex-col rounded-2xl">
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
          ].map((step, index) => (
            <div key={step.number} className="flex items-start">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold text-sm lg:text-base transition-colors ${
                    currentStep > step.number
                      ? "bg-primary text-white"
                      : currentStep === step.number
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-primary/20 text-slate-400"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < 4 && (
                  <div
                    className={`w-0.5 h-12 lg:h-16 my-1 ${
                      currentStep > step.number ? "bg-primary" : "bg-primary/20"
                    }`}
                  />
                )}
              </div>
              <div className="ml-3 lg:ml-4 mt-2">
                <p
                  className={`font-medium text-xs lg:text-sm ${
                    currentStep >= step.number
                      ? "text-slate-700"
                      : "text-slate-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
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
          {currentStep === 2 && <Step2ServiceInfo form={step2Form} />}

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
              disabled={currentStep === 1}
              className="px-6 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!getCurrentForm().formState.isValid}
              className="px-8 w-full sm:w-auto"
            >
              {currentStep === 5 ? "Submit" : "Continue"}
              {currentStep < 5 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OnboardingPage;
