import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  toUserResponse,
  type CreateUserRequest,
  type UserResponse,
} from "../model/user-model.js";
import { UserValidation } from "../validation/user-validation.js";
import { Validation } from "../validation/validation.js";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate<CreateUserRequest>(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameEmail = await prisma.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameEmail !== 0) {
      throw new ResponseError(400, "User already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
    const user = await prisma.user.create({
      data: registerRequest,
    });
    console.log("register request", user);
    return toUserResponse(user);
  }
}
