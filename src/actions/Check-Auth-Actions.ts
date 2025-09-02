"use server";

import fs from "fs/promises";
import path from "path";
interface User {
  id: number;
  username: string;
  password: string;
}

const userFile = path.join(process.cwd(), "src/storage/data/tbl_user.json");

async function readUsers(): Promise<User[]> {
  try {
    const content = await fs.readFile(userFile, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(userFile, JSON.stringify(users, null, 2), "utf-8");
}

// Add new user
export async function addUser(username: string, password: string): Promise<User> {
  const users = await readUsers();
  const newId = users.length ? users[users.length - 1].id + 1 : 1;

  const newUser: User = { id: newId, username, password };
  users.push(newUser);

  await writeUsers(users);
  return newUser;
}

// Check credentials
export async function checkUserCredentials(username: string, password: string): Promise<boolean> {
  const users = await readUsers();
  return users.some((u) => u.username === username && u.password === password);
}
