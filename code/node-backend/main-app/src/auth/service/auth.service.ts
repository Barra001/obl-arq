import { AuthPayload, Role } from "./../entities/auth.payload";
import {
  InvalidTokenException,
  NoTokenPresentException,
  NotEnoughPrivilegesException,
  UndefinedRoleException,
  UndefinedUserException,
  UserNotExistsException,
} from "./../auth.exceptions";
import { Request } from "express";
import { AuthServiceInterface } from "./auth.service.interface";
import { User } from "./../entities/auth.entity";
import { AuthRepositoryInterface } from "../repository/auth.repository.ineterface";
import { EncryptionServiceInterface } from "../../encryption/service/encryption.interface";
import { sign, verify } from "jsonwebtoken";
import { readFileSync } from "fs";

const privateKey = readFileSync("./private.key");
const publicKey = readFileSync("./public.key");
export class AuthService implements AuthServiceInterface {

  constructor(
    private readonly authRepository: AuthRepositoryInterface,
    private readonly encryptionService: EncryptionServiceInterface
  ) {
  }
  private static tokenOptions = { expiresIn: "1h", algorithm: "RS256" };

  private async generateToken(payload: AuthPayload): Promise<string> {
    const token = await sign(payload, privateKey, AuthService.tokenOptions);
    return token;
  }


  async logInUser(user: User, role: Role): Promise<string> {
    if (!user) {
      throw new UndefinedUserException();
    }
    if (!role) {
      throw new UndefinedRoleException();
    }
    const userInDb = await this.authRepository.getUser(user, role);
    if (!userInDb) {
      throw new UserNotExistsException();
    }
    const userMatches = await this.encryptionService.comparePassowrd(
      user.password,
      userInDb.password
    );
    if (!userMatches) {
      throw new UserNotExistsException();
    }
    const payload: AuthPayload = {
      username: user.username,
      password: user.password,
      role: role,
    };
    const token = await this.generateToken(payload);
    return token;
  }

  async verifyRequestForRoles(
    req: Request,
    rolesPermitted: [Role]
  ): Promise<AuthPayload> {
    const authorization = req.header("Authorization");
    const token = authorization ? authorization.replace("Bearer ", "") : null;
    if (!token) {
      throw new NoTokenPresentException();
    }
    let payload: AuthPayload;
    try {
      payload = await verify(token, publicKey);
    } catch (error) {
      throw new InvalidTokenException();
    }
    if (!rolesPermitted.includes(payload.role)) {
      throw new NotEnoughPrivilegesException();
    }
    return payload;
  }
}
