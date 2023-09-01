export interface EncryptionServiceInterface {
  hashPassword(password: string): Promise<string>;
  comparePassowrd(password: string, hash: string): Promise<boolean>;
}
