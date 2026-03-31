import { type NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/supabase/middleware";

const protectedPaths = ["/bookings", "/profile", "/post", "/wallet", "/messages"];

export async function middleware(request: NextRequest) {
  const { authenticated, response } = await getAuthContext(request);

  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isProtected && !authenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/stripe/webhook).*)",
  ],
};
