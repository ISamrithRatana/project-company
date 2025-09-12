"use server";

import { cookies } from "next/headers";
import { AuthService } from "@/modules/auth/auth.service";
import { LoginDto, RegisterDto } from "@/modules/auth/auth.types";

const authService = new AuthService();

/** Register a new user and set cookie */
export async function registerAction(data: RegisterDto) {
  const { user, token } = await authService.register(data);

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return user;
}

/** Login user and set cookie */
export async function loginAction(data: LoginDto) {
  const { user, token } = await authService.login(data);

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return user;
}

/** Logout user by deleting cookie */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
