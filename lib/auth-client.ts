import { createAuthClient } from "better-auth/react";

// used for client side authentication/authorisation
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

const signUp = await authClient.signUp.email({
  name: "Jane Doe",
  email: "jane@example.com",
  password: "securepassword123",
  callbackURL: "/dashboard", // where to go after successful sign up
});
