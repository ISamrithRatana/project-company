"use server";

import { UserService } from "@/modules/users/user.service";
import { CreateUserDto, UpdateUserDto } from "@/modules/users/user.types";

const userService = new UserService();

export async function getUsersAction() {
  return userService.getUsers();
}

export async function getUserByIdAction(id: number) {
  return userService.getUser(id);
}

export async function getUserByNameAction(name: string){
  return userService.getUsername(name);
}

export async function createUserAction(data: CreateUserDto) {
  return userService.createUser(data);
}

export async function updateUserAction(id: number, data: UpdateUserDto) {
  return userService.updateUser(id, data);
}

export async function deleteUserAction(id: number) {
  return userService.deleteUser(id);
}
