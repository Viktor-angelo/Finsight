import { PrismaClient } from "./src/generated/client.js";

const prisma = new PrismaClient();

const run = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
};

run();
