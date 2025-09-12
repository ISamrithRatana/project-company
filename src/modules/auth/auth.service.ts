import { AuthRepository } from "@/modules/auth/auth.repository";
import {
  hashPassword,
  comparePasswords,
  generateToken,
} from "@/modules/auth/auth.utils";
import { LoginDto, RegisterDto } from "@/modules/auth/auth.types";

const repo = new AuthRepository();

export class AuthService {
  async register(data: RegisterDto) {
    const existing = await repo.findUserByEmail(data.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const passwordHash = await hashPassword(data.password);
    const user = await repo.createUser({ ...data, passwordHash });

    const token = generateToken({ userId: user.id, email: user.email });
    return { user, token };
  }

  async login({ email, password }: LoginDto) {
    const user = await repo.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({ userId: user.id, email: user.email });
    return { user, token };
  }
}
