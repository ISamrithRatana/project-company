import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthPayload } from "@/modules/auth/auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "secret_demo"; // ⚠️ use a strong secret in prod
const TOKEN_EXPIRY = "7d";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: AuthPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}
