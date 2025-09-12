import { prisma } from "@/lib/prisma";
import { CreateUserDto, UpdateUserDto, UserDto } from "@/modules/users/user.types";

export class UserRepository {
  findAll() {
    return prisma.user.findMany();
  }

  findOne(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  findUsername(name: string): Promise<UserDto | null> {
    return prisma.user.findUnique({ where: { name } });
  }

  create(data: CreateUserDto) {
    return prisma.user.create({ data });
  }

  update(id: number, data: UpdateUserDto) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}
