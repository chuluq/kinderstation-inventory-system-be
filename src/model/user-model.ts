import { z } from "zod";
import type { UserValidation } from "../validation/user-validation.js";
import type { User } from "../generated/prisma/client.js";

export type UserResponse = {
  email: string;
  name: string;
  role: string;
};

export type CreateUserRequest = z.infer<typeof UserValidation.REGISTER>;

export function toUserResponse(user: User): UserResponse {
  return {
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
