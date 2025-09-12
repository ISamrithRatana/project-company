import { cookies } from "next/headers";
import { verifyToken } from "@/modules/auth/auth.utils";
import { prisma } from "@/lib/prisma";

export async function getAuthUser() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  // Fetch full user with cloud relation
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: { cloud: true },
  });

  return user;
}