export const dependencies = {
  // Drizzle
  "drizzle-kit": "^0.20.13",
  "drizzle-orm": "^0.29.3",
  postgres: "^3.4.3",
  dotenv: "^16.4.1",
  "@auth/core": "^0.24.0",

  // NextAuth
  "next-auth": "^4.24.6",
  "@auth/drizzle-adapter": "^0.4.0",

  // tRPC
  "@tanstack/react-query": "^4.35.3",
  "@trpc/client": "^10.45.0",
  "@trpc/next": "^10.45.0",
  "@trpc/react-query": "^10.45.0",
  "@trpc/server": "^10.45.0",
  superjson: "^2.2.1",

  // ShadCN/ui
  "@radix-ui/react-slot": "^1.0.2",
  "class-variance-authority": "^0.7.0",
  clsx: "^2.1.0",
  "lucide-react": "^0.316.0",
  "tailwind-merge": "^2.2.1",
  "tailwindcss-animate": "^1.0.7",

  // Uploadthing
  uploadthing: "^6.4.1",
  "@uploadthing/react": "^6.2.4",
};

export type Dependency = keyof typeof dependencies;
