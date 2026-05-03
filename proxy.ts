import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes that don't need auth
  const publicRoutes = ["/sign-in", "/sign-up", "/"];

  const isPublicRoute = publicRoutes.includes(pathname);

  // If it's a public route, allow it
  if (isPublicRoute) return NextResponse.next();

  // Check session for protected routes
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user)
      return NextResponse.redirect(new URL("/sign-in", request.url));
  } catch {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/modules/:path*"],
};
