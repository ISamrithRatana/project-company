import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/modules/auth/auth.service";
import { cookies } from "next/headers";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {

    const {name, email, password } = await req.json(); 
    const { user, token } = await authService.register({name, email, password });

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Return user info (do not return password!)
    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Invalid credentials" },
      { status: 401 }
    );
  }
}

