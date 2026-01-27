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
import { onboardingStep1Schema } from "@/schemas/auth.schema";

interface Step1PersonalInfoProps {
  form: UseFormReturn<z.infer<typeof onboardingStep1Schema>>;
}

export function Step1PersonalInfo({ form }: Step1PersonalInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label
          htmlFor="fullName"
          className="text-slate-700 font-medium mb-2 block"
        >
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          {...form.register("fullName")}
          className="bg-white"
        />
        {form.formState.errors.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.fullName.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="email"
            className="text-slate-700 font-medium mb-2 block"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="namexxx@gmail.com"
            {...form.register("email")}
            className="bg-white"
            disabled
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="contactNumber"
            className="text-slate-700 font-medium mb-2 block"
          >
            Contact Number
          </Label>
          <Input
            id="contactNumber"
            placeholder="Enter your phone number"
            {...form.register("contactNumber")}
            className="bg-white"
          />
          {form.formState.errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.contactNumber.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="streetAddress"
            className="text-slate-700 font-medium mb-2 block"
          >
            Street Address
          </Label>
          <Input
            id="streetAddress"
            placeholder="Enter street address"
            {...form.register("streetAddress")}
            className="bg-white"
          />
          {form.formState.errors.streetAddress && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.streetAddress.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="city"
            className="text-slate-700 font-medium mb-2 block"
          >
            City
          </Label>
          <Input
            id="city"
            placeholder="Enter city"
            {...form.register("city")}
            className="bg-white"
          />
          {form.formState.errors.city && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.city.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="state"
            className="text-slate-700 font-medium mb-2 block"
          >
            State
          </Label>
          <Select
            value={form.watch("state")}
            onValueChange={(value) =>
              form.setValue("state", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select state..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="ca">California</SelectItem>
              <SelectItem value="tx">Texas</SelectItem>
              <SelectItem value="fl">Florida</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.state && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.state.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="zipCode"
            className="text-slate-700 font-medium mb-2 block"
          >
            Zip Code
          </Label>
          <Input
            id="zipCode"
            placeholder="Enter ZIP code..."
            {...form.register("zipCode")}
            className="bg-white"
          />
          {form.formState.errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.zipCode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
