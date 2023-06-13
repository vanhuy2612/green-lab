import { PrismaClient } from "@prisma/client";
import data from "./03_villages.json";

const prismaClient = new PrismaClient();
const exec = async (prisma: PrismaClient) => {
  await prisma.village.createMany({
    data: data,
  });
};

exec(prismaClient);
