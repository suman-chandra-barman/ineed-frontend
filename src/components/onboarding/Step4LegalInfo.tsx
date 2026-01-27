import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { onboardingStep4Schema } from "@/schemas/auth.schema";

interface Step4LegalInfoProps {
  form: UseFormReturn<z.infer<typeof onboardingStep4Schema>>;
}

const TAX_TYPES = [
  { value: "individual", label: "Individual / Sole Proprietor" },
  { value: "single-llc", label: "Single-Member LLC" },
  { value: "partnership", label: "Partnership" },
  { value: "c-corp", label: "C Corporation" },
  { value: "s-corp", label: "S Corporation" },
];

export function Step4LegalInfo({ form }: Step4LegalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="legalName"
            className="text-slate-700 font-medium mb-2 block"
          >
            Legal Name
          </Label>
          <Input
            id="legalName"
            placeholder="Enter your legal name"
            {...form.register("legalName")}
            className="bg-white"
          />
          {form.formState.errors.legalName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.legalName.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="businessName"
            className="text-slate-700 font-medium mb-2 block"
          >
            Business Name (Optional)
          </Label>
          <Input
            id="businessName"
            placeholder="Enter your business name"
            {...form.register("businessName")}
            className="bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="taxType"
            className="text-slate-700 font-medium mb-2 block"
          >
            Tax Type
          </Label>
          <Select
            value={form.watch("taxType")}
            onValueChange={(value) =>
              form.setValue("taxType", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select tax type..." />
            </SelectTrigger>
            <SelectContent>
              {TAX_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.taxType && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.taxType.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="taxId"
            className="text-slate-700 font-medium mb-2 block"
          >
            Tax ID (SSN / EIN)
          </Label>
          <Input
            id="taxId"
            placeholder="Enter your tax identification number"
            {...form.register("taxId")}
            className="bg-white"
          />
          {form.formState.errors.taxId && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.taxId.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="w9StreetAddress"
            className="text-slate-700 font-medium mb-2 block"
          >
            Street Address
          </Label>
          <Input
            id="w9StreetAddress"
            placeholder="245 Maple Street"
            {...form.register("w9StreetAddress")}
            className="bg-white"
          />
          {form.formState.errors.w9StreetAddress && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.w9StreetAddress.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="w9City"
            className="text-slate-700 font-medium mb-2 block"
          >
            City
          </Label>
          <Input
            id="w9City"
            placeholder="Brooklyn"
            {...form.register("w9City")}
            className="bg-white"
          />
          {form.formState.errors.w9City && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.w9City.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="w9State"
            className="text-slate-700 font-medium mb-2 block"
          >
            State
          </Label>
          <Select
            value={form.watch("w9State")}
            onValueChange={(value) =>
              form.setValue("w9State", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="United States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="ca">California</SelectItem>
              <SelectItem value="tx">Texas</SelectItem>
              <SelectItem value="fl">Florida</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.w9State && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.w9State.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="w9ZipCode"
            className="text-slate-700 font-medium mb-2 block"
          >
            Zip Code
          </Label>
          <Input
            id="w9ZipCode"
            placeholder="11215"
            {...form.register("w9ZipCode")}
            className="bg-white"
          />
          {form.formState.errors.w9ZipCode && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.w9ZipCode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
