import { NextResponse, NextRequest } from "next/server";
import { checkUserCredentials } from "@/actions/Check-Auth-Actions";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const valid = await checkUserCredentials(username, password);

  if (valid) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", "1", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  }

  return NextResponse.json({ success: false });
}
