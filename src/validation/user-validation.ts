import { z } from "zod";

export class UserValidation {
  static readonly REGISTER = z.object({
    email: z.email(),
    name: z.string().min(1).max(100),
    role: z.enum(["admin", "staff", "viewer"]).default("viewer"),
    password: z.string().min(6).max(100),
  });
}
