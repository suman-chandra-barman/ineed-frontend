import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
import { onboardingStep5Schema } from "@/schemas/auth.schema";

interface Step5ConfirmationProps {
  form: UseFormReturn<z.infer<typeof onboardingStep5Schema>>;
}

export function Step5Confirmation({ form }: Step5ConfirmationProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-3xl flex items-center justify-center">
          <Check className="w-12 h-12 md:w-16 md:h-16 text-white" />
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-6 space-y-3">
        <p className="text-slate-700 leading-relaxed">
          By completing your registration, you agree to the{" "}
          <Link
            href="/provider-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Provider Policy
          </Link>
          .
        </p>
        <p className="text-slate-700 leading-relaxed">
          You acknowledge that you are an independent contractor, not an
          employee of iNeed, and are responsible for your own taxes, insurance,
          licenses, and business expenses.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Please review the full agreement before proceeding.
        </p>
      </div>

      <div className="flex items-center space-x-3 ">
        <Checkbox
          id="acknowledged"
          checked={form.watch("acknowledged")}
          onCheckedChange={(checked) =>
            form.setValue("acknowledged", checked as boolean, {
              shouldValidate: true,
            })
          }
        />
        <label
          htmlFor="acknowledged"
          className="text-sm font-medium text-slate-700 cursor-pointer"
        >
          I have read and agree to the Provider Independent Contractor Agreement
        </label>
      </div>
      {form.formState.errors.acknowledged && (
        <p className="text-red-500 text-sm text-center">
          {form.formState.errors.acknowledged.message}
        </p>
      )}
    </div>
  );
}
