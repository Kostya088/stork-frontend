import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/diary", "/journey"];
const publicRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  let refreshedCookies: string[] = [];

  if (!accessToken && refreshToken) {
    try {
      const res = await checkSession();
      if (res.status === 200) {
        const setCookie = res.headers["set-cookie"];
        if (setCookie) {
          refreshedCookies = Array.isArray(setCookie) ? setCookie : [setCookie];
        }
        accessToken = "refreshed";
      }
    } catch {}
  }

  const isLoggedIn = !!accessToken;

  // if (isPrivateRoute && !isLoggedIn) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  if (isPublicRoute && isLoggedIn) {
    const response = NextResponse.redirect(new URL("/", request.url));
    for (const cookie of refreshedCookies) {
      response.headers.append("set-cookie", cookie);
    }
    return response;
  }

  const response = NextResponse.next();
  for (const cookie of refreshedCookies) {
    response.headers.append("set-cookie", cookie);
  }
  return response;
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/diary/:path*",
    "/journey/:path*",
    "/login",
    "/register",
  ],
};
