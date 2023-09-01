import { AuthPayload, Role } from "./../entities/auth.payload";
import {
  ExternalAuthApiError,
  NoTokenPresentException,
  UndefinedRoleException,
  UndefinedUserException,
  UserNotExistsException,
} from "./../auth.exceptions";
import { Request } from "express";
import { AuthServiceInterface } from "./auth.service.interface";
import { User } from "./../entities/auth.entity";
import dotenv from "dotenv";
import { AppException } from "./../../exception_filter/app.exception";
import axios from "axios";
import { AuthRepositoryInterface } from "../repository/auth.repository.ineterface";
import { EncryptionServiceInterface } from "../../encryption/service/encryption.interface";

export class AuthService implements AuthServiceInterface {
  private apiUrl: string;

  constructor(
    private readonly authRepository: AuthRepositoryInterface,
    private readonly encryptionService: EncryptionServiceInterface
  ) {
    dotenv.config();
    this.apiUrl = process.env.AUTH_API_URL;
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
    const url = `${this.apiUrl}/sessions/${role}`;
    let result;
    let message;
    let statusCode;
    await axios
      .post(url, user)
      .then(function (response) {
        const { token } = response.data;
        if (!token) {
          message = response.data.message;
          statusCode = response.data.statusCode;
        } else {
          result = token;
        }
      })
      .catch(function () {
        throw new ExternalAuthApiError();
      });
    if (!result) {
      throw new AppException(statusCode, message);
    }
    return result;
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
    const url = `${this.apiUrl}/sessions`;
    let result;
    let message;
    let statusCode;
    await axios
      .post(url, { roles: rolesPermitted }, { headers: { token: token } })
      .then(function (response) {
        const { payload } = response.data;
        if (!payload) {
          message = response.data.message;
          statusCode = response.data.statusCode;
        } else {
          result = payload;
        }
      })
      .catch(function () {
        throw new ExternalAuthApiError();
      });
    if (!result) {
      throw new AppException(statusCode, message);
    }
    return result;
  }
}
