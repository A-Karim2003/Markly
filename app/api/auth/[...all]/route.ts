import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Better Auth API route bridge
 *
 * This file mounts Better Auth onto Next.js API routes.
 *
 * Route:
 * /api/auth/[...all]
 *
 * The `[...all]` catch-all segment means any request matching:
 * - /api/auth/sign-in
 * - /api/auth/sign-up
 * - /api/auth/sign-out
 * - /api/auth/get-session
 * - /api/auth/callback/microsoft
 * etc.
 * will be handled here.
 *
 * Flow:
 * 1. Frontend calls authClient methods (e.g. signIn, signUp, signOut)
 * 2. authClient sends HTTP request to /api/auth/*
 * 3. Next.js matches request to this catch-all route
 * 4. Next.js checks HTTP method (GET or POST)
 * 5. Runs corresponding route handler exported below
 * 6. Route handler forwards request to Better Auth
 * 7. Better Auth performs auth logic:
 *    - validates credentials
 *    - creates/deletes sessions
 *    - handles OAuth callbacks
 *    - reads/writes auth tables
 * 8. Response returned to browser (often with session cookie)
 *
 * Why `toNextJsHandler`?
 * Better Auth is framework-agnostic: it knows auth logic,
 * but not Next.js request/response format.
 *
 * `toNextJsHandler(auth)` adapts Better Auth into
 * Next.js-compatible GET/POST route handlers.
 *
 * Result:
 * We can export GET and POST handlers that Next.js understands,
 * while delegating all auth logic to Better Auth.
 */

export const { GET, POST } = toNextJsHandler(auth);
