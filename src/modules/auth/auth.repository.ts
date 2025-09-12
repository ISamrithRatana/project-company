import { prisma } from "@/lib/prisma";
import { RegisterDto } from "@/modules/auth/auth.types";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: RegisterDto & { passwordHash: string }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.passwordHash, // store hashed password
      },
    });
  }
}
