export type UserRole = "citizen" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
