import { AuthPayload, Role } from "../entities/auth.payload";
import { User } from "../entities/auth.entity";

export interface AuthServiceInterface {
  logInUser(user: User, role: Role): Promise<string>;
  verifyRequestForRoles(
    req: Request,
    rolesPermitted: [Role]
  ): Promise<AuthPayload>;
}
