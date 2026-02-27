/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ServicingInformationFormData,
  servicingInformationSchema,
} from "@/schemas/booking.schema";
import { useUpdateServicingInfoMutation } from "@/redux/features/booking/bookingApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ServicingInformationStepProps {
  bookingId: number;
  data: ServicingInformationFormData;
  onNext: (data: ServicingInformationFormData) => void;
  onBack: () => void;
}

export default function ServicingInformationStep({
  bookingId,
  data,
  onNext,
  onBack,
}: ServicingInformationStepProps) {
  const [updateServicingInfo, { isLoading }] = useUpdateServicingInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServicingInformationFormData>({
    resolver: zodResolver(servicingInformationSchema),
    defaultValues: data,
  });

  const onSubmit = async (formData: ServicingInformationFormData) => {
    try {
      await updateServicingInfo({
        bookingId,
        full_name: formData.fullName,
        email: formData.email,
        contact_number: formData.contactNumber,
        state: formData.state,
        zip_code: formData.zipCode,
        notes: formData.notes || "",
        bedrooms: parseInt(formData.numberOfBedrooms) || 0,
        square_footage: parseInt(formData.approximateSquareFootage) || 0,
      }).unwrap();

      toast.success("Service information saved successfully");
      onNext(formData);
    } catch (error: any) {
      console.error("Failed to update servicing info:", error);
      toast.error(error?.data?.message || "Failed to save service information");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Service Location & Notes
        </h2>
        <p className="text-gray-600">
          Enter the address where the cleaning service will be performed.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            {...register("fullName")}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email and Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="Enter contact number"
              {...register("contactNumber")}
              className={errors.contactNumber ? "border-red-500" : ""}
            />
            {errors.contactNumber && (
              <p className="text-sm text-red-500 mt-1">
                {errors.contactNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* State and Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="Enter state..."
              {...register("state")}
              className={errors.state ? "border-red-500" : ""}
            />
            {errors.state && (
              <p className="text-sm text-red-500 mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              placeholder="Enter ZIP code..."
              {...register("zipCode")}
              className={errors.zipCode ? "border-red-500" : ""}
            />
            {errors.zipCode && (
              <p className="text-sm text-red-500 mt-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add any special requests"
            rows={3}
            {...register("notes")}
          />
          {errors.notes && (
            <p className="text-sm text-red-500 mt-1">{errors.notes.message}</p>
          )}
        </div>

        {/* Number of Bedrooms and Square Footage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="numberOfBedrooms">Number of Bedrooms</Label>
            <Input
              id="numberOfBedrooms"
              placeholder="Enter number of bedrooms"
              {...register("numberOfBedrooms")}
            />
            {errors.numberOfBedrooms && (
              <p className="text-sm text-red-500 mt-1">
                {errors.numberOfBedrooms.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="approximateSquareFootage">
              Approximate Square Footage
            </Label>
            <Input
              id="approximateSquareFootage"
              placeholder="enter square footage"
              {...register("approximateSquareFootage")}
            />
            {errors.approximateSquareFootage && (
              <p className="text-sm text-red-500 mt-1">
                {errors.approximateSquareFootage.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button type="button" variant="outline" onClick={onBack}>
          Previous
        </Button>
        <div className="flex items-center gap-4">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
