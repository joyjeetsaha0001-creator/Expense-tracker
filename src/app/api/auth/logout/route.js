import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("next-auth.session-token", "", {
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("__Secure-next-auth.session-token", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}