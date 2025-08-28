// app/api/admin-logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: "admin_session",
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // delete
  });
  return res;
}
