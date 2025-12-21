import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { UserTest } from "./test-util.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject register user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      email: "",
      name: "",
      role: "",
      password: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should register user if request is valid", async () => {
    const response = await supertest(web).post("/api/users").send({
      email: "user@test.com",
      name: "test",
      password: "test123",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe("user@test.com");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.role).toBe("viewer");
  });
});
