import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const legacyLocales = ["ua", "en", "ru"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  if (legacyLocales.includes(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${firstSegment}`, "") || "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|.*\\..*).*)"],
};
