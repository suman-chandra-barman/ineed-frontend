import { z } from "zod";

export const servicingInformationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().min(4, "Zip code must be at least 4 characters"),
  notes: z.string().optional(),
  numberOfBedrooms: z.string().optional(),
  approximateSquareFootage: z.string().optional(),
});

export const dateTimeSchema = z.object({
  selectedDate: z.date({
    message: "Please select a date",
  }),
  selectedTime: z.string().min(1, "Please select a time slot"),
  isRecurring: z.boolean(),
  recurringType: z.enum(["weekly", "bi-weekly", "monthly"]).nullable(),
});

export type ServicingInformationFormData = z.infer<
  typeof servicingInformationSchema
>;
export type DateTimeFormData = z.infer<typeof dateTimeSchema>;
