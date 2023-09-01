import { EncryptionServiceInterface } from "../encryption/service/encryption.interface";
import { AuthRepository } from "./repository/auth.repository";
import { AuthService } from "./service/auth.service";
import { AuthServiceInterface } from "./service/auth.service.interface";

export class AuthFactory {
  static create(
    encryptionService: EncryptionServiceInterface
  ): AuthServiceInterface {
    const authRepository = new AuthRepository();
    const authService = new AuthService(authRepository, encryptionService);
    return authService;
  }
}
