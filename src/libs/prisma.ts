import { PrismaClient } from '../generated/prisma/client';
import { neonConfig, type PoolConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Configure WebSocket for local development
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  // Get DATABASE_URL
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  // Create Neon PoolConfig
  const poolConfig: PoolConfig = { connectionString: databaseUrl };

  // Create Prisma Neon Adapter
  const adapter = new PrismaNeon(poolConfig);

  // Return PrismaClient with adapter
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'test'
        ? []
        : process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
  });
};

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
