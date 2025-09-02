"use server";

import fs from "fs/promises";
import path from "path";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const userFilePath = path.join(process.cwd(), "src/storage/data", "tbl_user.json");

// Read existing users
async function readUsers(): Promise<User[]> {
  try {
    const content = await fs.readFile(userFilePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

// Save users back to file
async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(userFilePath, JSON.stringify(users, null, 2), "utf-8");
}

// Add new user
export async function addUser(name: string, email: string, password: string) {
  const users = await readUsers();

  // Prevent duplicate email
  if (users.some((u) => u.email === email)) {
    throw new Error("Email is already registered.");
  }

  const newId = users.length ? users[users.length - 1].id + 1 : 1;
  const newUser: User = { id: newId, name, email, password };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
}

// Optional: Check login credentials
export async function checkUserCredentials(email: string, password: string): Promise<boolean> {
  const users = await readUsers();
  return users.some((u) => u.email === email && u.password === password);
}
