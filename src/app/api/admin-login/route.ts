// app/api/admin-login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "admin_session",
      value: process.env.ADMIN_PASSWORD!,
      path: "/",
      httpOnly: true, // secure cookie
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.json({ success: false });
}
