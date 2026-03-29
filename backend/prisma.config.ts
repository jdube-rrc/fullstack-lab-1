import { defineConfig } from 'prisma';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    seed: 'tsx ./prisma/seed.ts',
  },
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL,
  },
});
