"use server";

import { authClient } from "@/lib/auth-client";

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string,
) {
  try {
    const response = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "https://example.com/callback",
    });
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sign up failed");
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const response = await authClient.signIn.email({
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sign in failed");
  }
}

export async function signOut() {
  try {
    await authClient.signOut();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sign out failed");
  }
}

export async function getSession() {
  try {
    const session = await authClient.getSession();
    return session;
  } catch {
    return null;
  }
}
