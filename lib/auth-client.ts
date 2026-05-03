import { createAuthClient } from "better-auth/react";

// used for client side authentication/authorisation
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});
