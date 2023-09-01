import { hash, compare } from "bcrypt";
import { EncryptionServiceInterface } from "./encryption.interface";

export class EncryptionService implements EncryptionServiceInterface {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }
  async comparePassowrd(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
