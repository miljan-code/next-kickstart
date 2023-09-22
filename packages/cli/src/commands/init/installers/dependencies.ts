export const dependencies = {
  // Drizzle
  "drizzle-kit": "^0.19.13",
  "drizzle-orm": "^0.28.5",
  postgres: "^3.3.5",
  dotenv: "^16.3.1",
  "@types/pg": "^8.10.2",
  pg: "^8.11.3",
  "@auth/core": "^0.12.0",

  // NextAuth
  "next-auth": "^4.23.1",
  "@auth/drizzle-adapter": "^0.3.2",

  // tRPC
  "@tanstack/react-query": "^4.33.0",
  "@trpc/client": "^10.38.0",
  "@trpc/next": "^10.38.0",
  "@trpc/react-query": "^10.38.0",
  "@trpc/server": "^10.38.0",
  superjson: "^1.13.1",
};

export type Dependency = keyof typeof dependencies;
