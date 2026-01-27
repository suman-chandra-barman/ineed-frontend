import { loginformSchema, signupformSchema } from "@/schemas/auth.schema";
import * as z from "zod";

export type LoginFormValues = z.infer<typeof loginformSchema>;
export type SignupFormValues = z.infer<typeof signupformSchema>;
