import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
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
        <p className="text-slate-700 text-center leading-relaxed">
          I confirm that the information provided is accurate to the best of my
          knowledge and is submitted for payment and reporting purposes.
        </p>
        <p className="text-slate-700 text-center leading-relaxed">
          I understand that this information is required for independent
          contractors receiving payments through iNeed and does not constitute
          employment or tax withholding by the platform.
        </p>
      </div>

      <div className="flex items-center space-x-3 justify-center">
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
          className="text-sm font-medium text-slate-700 cursor-pointer underline"
        >
          I acknowledge and agree
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
