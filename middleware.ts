import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken")?.value;
  console.log(jwtToken);

  if (!jwtToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|api|_next|favicon.ico).*)"],
};
