import { User } from "../entities/auth.entity";
import { Role } from "../entities/auth.payload";

export interface AuthRepositoryInterface {
  getUser(user: User, role: Role): Promise<User>;
}
