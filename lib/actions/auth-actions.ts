"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string,
) {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sign up failed");
  }
}

export async function signInWithEmail(
  email: string,
  password: string,
  remember: boolean | undefined,
) {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: remember,
      },
      headers: await headers(),
    });

    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sign in failed");
  }
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sign out failed");
  }

  redirect("/sign-in");
}

export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>;

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session;
  } catch {
    return null;
  }
}
