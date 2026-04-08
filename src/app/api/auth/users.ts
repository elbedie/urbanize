import { User } from "@/types/user";
import { randomUUID } from "crypto";

let users: User[] = [
  { id: randomUUID(), name: "Gestor Demo", email: "gestor@urbanize.com", role: "manager" },
  { id: randomUUID(), name: "Cidadão Demo", email: "cidadao@urbanize.com", role: "citizen" },
];

export function getUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export function createUser(user: Omit<User, "id">) {
  const newUser: User = { ...user, id: randomUUID() };
  users = [...users, newUser];
  return newUser;
}

export function listUsers() {
  return users;
}
