import { Role } from "./Role";

export interface User {
  id: string;
  displayName: string;
  email: string;
  roles: Role[];
}
