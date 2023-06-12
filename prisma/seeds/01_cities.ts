import { PrismaClient } from '@prisma/client';
import data from './01_cities.json';

const prismaClient = new PrismaClient();
const exec = async (prisma: PrismaClient) => {
    await prisma.provinceCity.createMany({
        data: data,
    });
}

exec(prismaClient);