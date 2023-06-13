import { PrismaClient } from "@prisma/client";
import data from "./02_districts.json";

const prismaClient = new PrismaClient();
const exec = async (prisma: PrismaClient) => {
  await prisma.district.createMany({
    data: data,
  });
};

exec(prismaClient);
