# Zero setup. Edge ready.

Opinionated NextJS 13.4 (App Router) template that contains everything you need for developing a full-stack applications.

## Features

- TypeScript
- tRPC
- Drizzle ORM
- Supabase
- NextAuth
- T3 Env
- ESLint
- TailwindCSS
- ShadCN/ui
- Zod
- Prettier

## Usage

Create new app

```bash
yarn create-next-app@latest my-app -e https://github.com/miljan-code/next-trpc-drizzle-starter
# or
npx create-next-app@latest my-app -e https://github.com/miljan-code/next-trpc-drizzle-starter
# or
pnpm dlx create-next-app@latest my-app -e https://github.com/miljan-code/next-trpc-drizzle-starter
```

Add environment variables

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

DATABASE_URL="postgresql://[username]:[password]@host/postgres" - Supabase

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Happy hacking!
