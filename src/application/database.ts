import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";
import { logger } from "./logging.js";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST as string,
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  logger.info(e);
});

prisma.$on("error", (e) => {
  logger.error(e);
});

prisma.$on("info", (e) => {
  logger.info(e);
});

prisma.$on("warn", (e) => {
  logger.warn(e);
});

export { prisma };
