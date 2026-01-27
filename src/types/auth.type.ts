import { loginformSchema } from "@/schemas/auth.schema";
import * as z from "zod";

export type LoginFormValues = z.infer<typeof loginformSchema>;