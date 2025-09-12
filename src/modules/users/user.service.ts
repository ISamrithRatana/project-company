import { UserRepository } from "@/modules/users/user.repository";
import { CreateUserDto, UpdateUserDto, UserDto } from "@/modules/users/user.types";

const repo = new UserRepository();

export class UserService {
  
  async getUsers(): Promise<UserDto[]> {
    return repo.findAll();
  }

  async getUser(id: number): Promise<UserDto> {
    const user = await repo.findOne(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async getUsername(name: string): Promise<UserDto>{
    const user = await repo.findUsername(name);
        if (!user) {
      throw new Error(`User with id ${name} not found`);
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    return repo.create(data);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UserDto> {
    // Ensure user exists before updating
    await this.getUser(id);
    return repo.update(id, data);
  }

  async deleteUser(id: number): Promise<UserDto> {
    // Ensure user exists before deleting
    await this.getUser(id);
    return repo.delete(id);
  }
}
