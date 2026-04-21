import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.ts';
import { env } from './env.ts';
import debug from 'debug';

const log = debug(`${env.PROJECT_NAME}:config:prisma`);
log('Loading Prisma Connection');

export const connectPrisma = async () => {
  const connectionString = process.env.PGURL;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  // Prueba de que la conexión funciona correctamente
  try {
    await prisma.$connect();
    const [info] = (await prisma.$queryRaw`SELECT current_database()`) as {
      current_database: string;
    }[];
    log(`Connected successfully to the database ${info?.current_database}`);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }

  return prisma;
};
