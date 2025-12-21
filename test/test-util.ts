import { prisma } from "../src/application/database.js";

export class UserTest {
  static async delete() {
    await prisma.user.deleteMany({
      where: {
        email: "user@test.com",
      },
    });
  }
}
