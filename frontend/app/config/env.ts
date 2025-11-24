export const Env = {
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_APP_ENV ?? ("http://localhost:4000" as string),
} as const;
