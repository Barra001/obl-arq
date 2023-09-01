import { EncryptionServiceInterface } from "./service/encryption.interface";
import { EncryptionService } from "./service/encryption.service";

export class EncryptionFactory {
    static create(): EncryptionServiceInterface {
        return new EncryptionService();
    }
}