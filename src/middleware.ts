import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  return await Promise.resolve(
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  );
}
