"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ServicingInformationFormData,
  servicingInformationSchema,
} from "@/schemas/booking.schema";

interface ServicingInformationStepProps {
  data: ServicingInformationFormData;
  onNext: (data: ServicingInformationFormData) => void;
  onBack: () => void;
}

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function ServicingInformationStep({
  data,
  onNext,
  onBack,
}: ServicingInformationStepProps) {
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

  const selectedState = watch("state");

  const onSubmit = (formData: ServicingInformationFormData) => {
    onNext(formData);
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
            <Select
              value={selectedState}
              onValueChange={(value) => setValue("state", value)}
            >
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="Select state..." />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button type="button" variant="outline" onClick={onBack}>
          Previous
        </Button>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">You&apos;re 15% complete</p>
          <Button type="submit" size="lg">
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
